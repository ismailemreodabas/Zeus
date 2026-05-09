/* Zeus Diş Kliniği - Ortak JS (Veri Yönetimi + Bildirimler) */

// ========= VERİ KATMANI (localStorage) =========
const DB = {
  get(key, def=[]) {
    try { return JSON.parse(localStorage.getItem('zeus_'+key)) ?? def; }
    catch(e){ return def; }
  },
  set(key, val) { localStorage.setItem('zeus_'+key, JSON.stringify(val)); },
  push(key, item) { const arr = this.get(key); arr.push(item); this.set(key,arr); return item; }
};

// Varsayılan veriler
function initDB() {
  if (!localStorage.getItem('zeus_init')) {
    DB.set('doctors', [
      {id:1, name:'Dr. Elif Yılmaz', branch:'İmplantoloji', phone:'+90 532 111 1111', email:'elif@zeus.com'},
      {id:2, name:'Dr. Ahmet Kara', branch:'Ortodonti', phone:'+90 532 222 2222', email:'ahmet@zeus.com'},
      {id:3, name:'Dr. Selin Demir', branch:'Estetik Diş Hekimliği', phone:'+90 532 333 3333', email:'selin@zeus.com'},
      {id:4, name:'Dr. Mert Aslan', branch:'Pedodonti', phone:'+90 532 444 4444', email:'mert@zeus.com'}
    ]);
    DB.set('staff', [
      {id:1, name:'Admin User', email:'admin@zeus.com', password:'admin123', role:'admin'},
      {id:2, name:'Ayşe Sekreter', email:'ayse@zeus.com', password:'1234', role:'staff'}
    ]);
    DB.set('services', [
      'İmplant Tedavisi','Diş Beyazlatma','Porselen Kaplama',
      'Ortodonti','Diş Eti Tedavisi','Çocuk Diş Hekimliği','Genel Muayene'
    ]);
    DB.set('appointments', []);
    DB.set('notifications', []);
    localStorage.setItem('zeus_init','1');
  }
}
initDB();

// ========= RANDEVU OLUŞTURMA =========
function createAppointment(data) {
  const app = {
    id: Date.now(),
    ...data,
    status: 'pending',
    createdAt: new Date().toISOString()
  };
  DB.push('appointments', app);
  
  // Çalışanlara bildirim
  DB.push('notifications', {
    id: Date.now(),
    type: 'new_appointment',
    title: 'Yeni Randevu Talebi',
    message: `${data.firstName} ${data.lastName} - ${data.service} (${data.date} ${data.time})`,
    appointmentId: app.id,
    read: false,
    createdAt: new Date().toISOString()
  });
  
  // Tarayıcı bildirimi (personel için)
  sendBrowserNotification('Yeni Randevu Talebi', 
    `${data.firstName} ${data.lastName} randevu oluşturdu - ${data.date} ${data.time}`);
  
  // "E-posta" simülasyonu — gerçek projede backend API çağrısı
  simulateEmail(data.email, 
    'Zeus Diş Kliniği - Randevu Onayı',
    `Sayın ${data.firstName},\n\n${data.date} tarihinde saat ${data.time}'da ${data.service} için randevu talebiniz alınmıştır. Onay için en kısa sürede tarafınızla iletişime geçeceğiz.\n\nZeus Diş Kliniği`);
  
  return app;
}

function simulateEmail(to, subject, body) {
  // Gerçek uygulamada: fetch('/api/send-email', {method:'POST', body: JSON.stringify({to,subject,body})})
  const emails = DB.get('email_log');
  emails.push({to, subject, body, sentAt: new Date().toISOString()});
  DB.set('email_log', emails);
  console.log('📧 E-posta gönderildi:', to, '|', subject);
}

// ========= BİLDİRİMLER =========
function sendBrowserNotification(title, body) {
  if (!('Notification' in window)) return;
  if (Notification.permission === 'granted') {
    new Notification(title, { body, icon: '' });
  } else if (Notification.permission !== 'denied') {
    Notification.requestPermission().then(p => {
      if (p === 'granted') new Notification(title, { body });
    });
  }
}

// Randevu saati yaklaşınca hatırlatma kontrolü
function checkUpcomingAppointments() {
  const apps = DB.get('appointments');
  const now = new Date();
  const reminded = DB.get('reminded', []);
  
  apps.forEach(app => {
    if (app.status === 'cancelled' || reminded.includes(app.id)) return;
    const appDate = new Date(`${app.date}T${app.time}`);
    const diffMin = (appDate - now) / 60000;
    
    // 30 dakika kala hatırlatma
    if (diffMin > 0 && diffMin <= 30) {
      sendBrowserNotification(
        '⏰ Randevu Hatırlatması',
        `${app.firstName} ${app.lastName} - ${app.service} randevusu 30 dk sonra!`
      );
      simulateEmail(app.email, 'Randevu Hatırlatması',
        `Sayın ${app.firstName}, yarım saat sonra ${app.service} randevunuz bulunmaktadır.`);
      reminded.push(app.id);
      DB.set('reminded', reminded);
    }
  });
}
setInterval(checkUpcomingAppointments, 60000); // Her dakika kontrol

// ========= OTURUM =========
function login(email, password) {
  const staff = DB.get('staff').find(s => s.email===email && s.password===password);
  if (staff) {
    sessionStorage.setItem('zeus_session', JSON.stringify(staff));
    return staff;
  }
  return null;
}
function currentUser() {
  try { return JSON.parse(sessionStorage.getItem('zeus_session')); }
  catch(e){ return null; }
}
function logout() {
  sessionStorage.removeItem('zeus_session');
  window.location.href = 'giris.html';
}
function requireAuth(role) {
  const u = currentUser();
  if (!u) { window.location.href = 'giris.html'; return null; }
  if (role && u.role !== role && u.role !== 'admin') { window.location.href='panel.html'; return null; }
  return u;
}

// ========= TOAST =========
function toast(msg, isError=false) {
  const t = document.createElement('div');
  t.className = 'toast' + (isError ? ' error' : '');
  t.innerHTML = (isError ? '❌ ' : '✅ ') + msg;
  document.body.appendChild(t);
  setTimeout(() => t.remove(), 3500);
}

// ========= MOBİL MENÜ =========
document.addEventListener('DOMContentLoaded', () => {
  const toggle = document.querySelector('.menu-toggle');
  const links = document.querySelector('.nav-links');
  if (toggle && links) toggle.onclick = () => links.classList.toggle('open');
  
  // Bildirim izni iste
  if ('Notification' in window && Notification.permission === 'default') {
    setTimeout(() => Notification.requestPermission(), 2000);
  }
});

// ========= FOOTER HTML =========
function renderFooter() {
  return `
  <footer>
    <div class="footer-grid">
      <div>
        <div class="logo"><div class="logo-icon">⚡</div><div class="logo-text">ZEUS<br><small>Diş Kliniği</small></div></div>
        <p style="margin-top:1rem;font-size:.9rem">Sağlıklı ve güzel gülüşler için Zeus Diş Kliniği yanınızda.</p>
      </div>
      <div><h4>Hizmetler</h4><ul>
        <li><a href="hizmetler.html">İmplant</a></li>
        <li><a href="hizmetler.html">Beyazlatma</a></li>
        <li><a href="hizmetler.html">Porselen Kaplama</a></li>
        <li><a href="hizmetler.html">Ortodonti</a></li>
      </ul></div>
      <div><h4>Hızlı Linkler</h4><ul>
        <li><a href="index.html">Anasayfa</a></li>
        <li><a href="hakkimizda.html">Hakkımızda</a></li>
        <li><a href="randevu.html">Randevu Al</a></li>
        <li><a href="iletisim.html">İletişim</a></li>
      </ul></div>
      <div><h4>İletişim</h4><ul>
        <li>📍 Kadıköy, İstanbul</li>
        <li>📞 +90 212 555 00 00</li>
        <li>✉️ info@zeusdis.com</li>
      </ul></div>
    </div>
    <div class="footer-bottom">© 2025 Zeus Diş Kliniği. Tüm hakları saklıdır.</div>
  </footer>`;
}
