/* Zeus Diş Kliniği - Gerçek Bildirim Sistemi */

// ============================================
// 🔧 AYAR PANELİ - BURAYA KENDİ BİLGİLERİNİZİ YAZIN
// ============================================
const CONFIG = {
  // Admin bilgileri
  ADMIN_EMAIL: 'ismailemreodabas@gmail.com',
  ADMIN_PHONE: '905510708862', // başında 90 olmalı, 0 olmadan
  ADMIN_NAME: 'İsmail Emre Odabaş',
  
  // EmailJS Ayarları (emailjs.com'dan alın)
  EMAILJS_PUBLIC_KEY: 'BURAYA_PUBLIC_KEY_YAZIN',  // örn: 'aBcDeFgH123'
  EMAILJS_SERVICE_ID: 'BURAYA_SERVICE_ID_YAZIN',  // örn: 'service_abc123'
  EMAILJS_TEMPLATE_ADMIN: 'BURAYA_TEMPLATE_ID_YAZIN', // admin'e gelen mail
  EMAILJS_TEMPLATE_PATIENT: 'BURAYA_TEMPLATE_ID_YAZIN', // hastaya gelen mail (opsiyonel - aynısını kullanabilirsiniz)
  
  // CallMeBot WhatsApp (callmebot.com'dan alın)
  WHATSAPP_API_KEY: 'BURAYA_WHATSAPP_KEY_YAZIN', // örn: '1234567'
  
  // Aktif/Pasif
  ENABLE_EMAIL: true,
  ENABLE_WHATSAPP: true,
};

// EmailJS SDK'sını yükle
(function loadEmailJS(){
  if (window.emailjs) return;
  const s = document.createElement('script');
  s.src = 'https://cdn.jsdelivr.net/npm/@emailjs/browser@4/dist/email.min.js';
  s.onload = () => {
    if (CONFIG.EMAILJS_PUBLIC_KEY && !CONFIG.EMAILJS_PUBLIC_KEY.includes('BURAYA')) {
      window.emailjs.init({ publicKey: CONFIG.EMAILJS_PUBLIC_KEY });
    }
  };
  document.head.appendChild(s);
})();

// ========= VERİ KATMANI =========
const DB = {
  get(key, def=[]) { try{return JSON.parse(localStorage.getItem('zeus_'+key))??def}catch(e){return def} },
  set(key, val) { localStorage.setItem('zeus_'+key, JSON.stringify(val)) },
  push(key, item) { const arr = this.get(key); arr.push(item); this.set(key,arr); return item }
};

function initDB() {
  if (!localStorage.getItem('zeus_init')) {
    DB.set('doctors', [
      {id:1, name:'Dr. Elif Yılmaz', branch:'İmplantoloji', phone:'+90 532 111 1111', email:'elif@zeus.com'},
      {id:2, name:'Dr. Ahmet Kara', branch:'Ortodonti', phone:'+90 532 222 2222', email:'ahmet@zeus.com'},
      {id:3, name:'Dr. Selin Demir', branch:'Estetik Diş Hekimliği', phone:'+90 532 333 3333', email:'selin@zeus.com'},
      {id:4, name:'Dr. Mert Aslan', branch:'Pedodonti', phone:'+90 532 444 4444', email:'mert@zeus.com'}
    ]);
    DB.set('staff', [
      {id:1, name:'İsmail Emre Odabaş', email:'ismailemreodabas@gmail.com', password:'admin123', role:'admin'},
      {id:2, name:'Ayşe Sekreter', email:'ayse@zeus.com', password:'1234', role:'staff'}
    ]);
    DB.set('services', [
      {name:'İmplant Tedavisi', price:15000, duration:60},
      {name:'Diş Beyazlatma', price:3500, duration:45},
      {name:'Porselen Kaplama', price:8000, duration:90},
      {name:'Ortodonti', price:25000, duration:30},
      {name:'Diş Eti Tedavisi', price:2500, duration:45},
      {name:'Çocuk Diş Hekimliği', price:1500, duration:30},
      {name:'Genel Muayene', price:500, duration:20}
    ]);
    DB.set('appointments', []);
    DB.set('notifications', []);
    DB.set('messages', []);
    localStorage.setItem('zeus_init','1');
  }
  // Migration: eski services formatı string ise çevir
  const svc = DB.get('services');
  if (svc.length && typeof svc[0] === 'string') {
    DB.set('services', svc.map(s => ({name:s, price:1000, duration:30})));
  }
}
initDB();

// ========= GERÇEK E-POSTA GÖNDERME =========
async function sendRealEmail(templateId, params) {
  if (!CONFIG.ENABLE_EMAIL || CONFIG.EMAILJS_PUBLIC_KEY.includes('BURAYA')) {
    console.warn('⚠️ EmailJS ayarlanmamış, e-posta gönderilmedi');
    logEmail(params.to_email, params.subject || 'Test', JSON.stringify(params), 'SIMULATED');
    return false;
  }
  if (!window.emailjs) {
    console.warn('⚠️ EmailJS yüklenmedi, 1 sn bekleniyor...');
    await new Promise(r => setTimeout(r, 1500));
  }
  try {
    const res = await window.emailjs.send(CONFIG.EMAILJS_SERVICE_ID, templateId, params);
    console.log('✅ E-posta gönderildi:', res);
    logEmail(params.to_email || CONFIG.ADMIN_EMAIL, params.subject || 'Bildirim', JSON.stringify(params), 'SENT');
    return true;
  } catch (err) {
    console.error('❌ E-posta hatası:', err);
    logEmail(params.to_email || CONFIG.ADMIN_EMAIL, params.subject || 'Bildirim', JSON.stringify(params), 'FAILED: '+err.text);
    return false;
  }
}

function logEmail(to, subject, body, status) {
  const logs = DB.get('email_log');
  logs.push({to, subject, body, status, sentAt: new Date().toISOString()});
  DB.set('email_log', logs);
}

// ========= GERÇEK WHATSAPP GÖNDERME (CallMeBot) =========
async function sendWhatsApp(phone, message) {
  if (!CONFIG.ENABLE_WHATSAPP || CONFIG.WHATSAPP_API_KEY.includes('BURAYA')) {
    console.warn('⚠️ CallMeBot ayarlanmamış');
    logWhatsApp(phone, message, 'SIMULATED');
    return false;
  }
  const url = `https://api.callmebot.com/whatsapp.php?phone=${phone}&text=${encodeURIComponent(message)}&apikey=${CONFIG.WHATSAPP_API_KEY}`;
  try {
    // CallMeBot CORS hatası verebilir, o yüzden no-cors mod
    await fetch(url, { mode: 'no-cors' });
    console.log('✅ WhatsApp gönderildi:', phone);
    logWhatsApp(phone, message, 'SENT');
    return true;
  } catch (err) {
    console.error('❌ WhatsApp hatası:', err);
    logWhatsApp(phone, message, 'FAILED: '+err.message);
    return false;
  }
}

function logWhatsApp(to, message, status) {
  const logs = DB.get('whatsapp_log', []);
  logs.push({to, message, status, sentAt: new Date().toISOString()});
  DB.set('whatsapp_log', logs);
}

// ========= RANDEVU OLUŞTURMA + TÜM BİLDİRİMLER =========
async function createAppointment(data) {
  const app = {
    id: Date.now(),
    ...data,
    status: 'pending',
    createdAt: new Date().toISOString()
  };
  DB.push('appointments', app);
  
  // Panel bildirimi
  DB.push('notifications', {
    id: Date.now(),
    type: 'new_appointment',
    title: '🔔 Yeni Randevu Talebi',
    message: `${data.firstName} ${data.lastName} - ${data.service} (${data.date} ${data.time})`,
    appointmentId: app.id,
    read: false,
    createdAt: new Date().toISOString()
  });
  
  // Tarayıcı bildirimi
  sendBrowserNotification('🔔 Yeni Randevu Talebi', 
    `${data.firstName} ${data.lastName} - ${data.date} ${data.time}`);
  
  // 📧 ADMIN'E E-POSTA
  const adminEmailParams = {
    to_email: CONFIG.ADMIN_EMAIL,
    to_name: CONFIG.ADMIN_NAME,
    subject: `🦷 Yeni Randevu: ${data.firstName} ${data.lastName}`,
    patient_name: `${data.firstName} ${data.lastName}`,
    patient_phone: data.phone,
    patient_email: data.email,
    service: data.service,
    doctor: data.doctor || 'Belirtilmemiş',
    date: data.date,
    time: data.time,
    note: data.note || 'Not yok',
    created_at: new Date().toLocaleString('tr-TR')
  };
  sendRealEmail(CONFIG.EMAILJS_TEMPLATE_ADMIN, adminEmailParams);
  
  // 💬 ADMIN'E WHATSAPP
  const whatsappMsg = 
`🦷 *ZEUS - Yeni Randevu*

👤 *Hasta:* ${data.firstName} ${data.lastName}
📞 *Telefon:* ${data.phone}
✉️ *E-posta:* ${data.email}
💎 *Hizmet:* ${data.service}
🩺 *Doktor:* ${data.doctor || 'Farketmez'}
📅 *Tarih:* ${data.date} ${data.time}
📝 *Not:* ${data.note || '-'}

_Panel: admin.html_`;
  sendWhatsApp(CONFIG.ADMIN_PHONE, whatsappMsg);
  
  // 📧 HASTAYA ONAY E-POSTASI
  if (CONFIG.EMAILJS_TEMPLATE_PATIENT && !CONFIG.EMAILJS_TEMPLATE_PATIENT.includes('BURAYA')) {
    sendRealEmail(CONFIG.EMAILJS_TEMPLATE_PATIENT, {
      to_email: data.email,
      to_name: `${data.firstName} ${data.lastName}`,
      subject: 'Zeus Diş Kliniği - Randevu Talebiniz Alındı',
      patient_name: `${data.firstName} ${data.lastName}`,
      service: data.service,
      date: data.date,
      time: data.time,
      doctor: data.doctor || 'Atanacak',
      note: 'Randevunuz en kısa sürede onaylanacaktır.'
    });
  }
  
  return app;
}

// ========= RANDEVU DURUM GÜNCELLEME + BİLDİRİM =========
async function updateAppointmentStatus(id, newStatus) {
  const apps = DB.get('appointments');
  const a = apps.find(x => x.id === id);
  if (!a) return;
  a.status = newStatus;
  DB.set('appointments', apps);
  
  const statusLabels = {confirmed:'onaylandı ✅', completed:'tamamlandı 🎉', cancelled:'iptal edildi ❌', pending:'bekleniyor ⏳'};
  
  // Hastaya e-posta
  if (CONFIG.EMAILJS_TEMPLATE_PATIENT && !CONFIG.EMAILJS_TEMPLATE_PATIENT.includes('BURAYA')) {
    sendRealEmail(CONFIG.EMAILJS_TEMPLATE_PATIENT, {
      to_email: a.email,
      to_name: `${a.firstName} ${a.lastName}`,
      subject: `Randevunuz ${statusLabels[newStatus]}`,
      patient_name: `${a.firstName} ${a.lastName}`,
      service: a.service,
      date: a.date,
      time: a.time,
      doctor: a.doctor || '-',
      note: `Randevunuzun durumu: ${statusLabels[newStatus]}`
    });
  }
  
  // Hastaya WhatsApp (telefon numarası varsa)
  if (a.phone) {
    const cleanPhone = a.phone.replace(/\D/g,'');
    const phoneWithCountry = cleanPhone.startsWith('9') ? cleanPhone : '9'+cleanPhone;
    // Hastaya WhatsApp - fakat CallMeBot sadece onay verilen numaralara gönderir!
    // Onun yerine wa.me link üreteceğiz (admin manuel tıklar)
    console.log('Hasta WhatsApp link:', `https://wa.me/${phoneWithCountry}`);
  }
  
  return a;
}

// ========= TARAYICI BİLDİRİMİ =========
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

// ========= HATIRLATMA KONTROLÜ =========
function checkUpcomingAppointments() {
  const apps = DB.get('appointments');
  const now = new Date();
  const reminded = DB.get('reminded', []);
  
  apps.forEach(app => {
    if (app.status === 'cancelled' || reminded.includes(app.id)) return;
    const appDate = new Date(`${app.date}T${app.time}`);
    const diffMin = (appDate - now) / 60000;
    
    if (diffMin > 0 && diffMin <= 30) {
      sendBrowserNotification('⏰ Randevu Hatırlatması',
        `${app.firstName} ${app.lastName} - 30 dk sonra!`);
      
      // Admin'e WhatsApp
      sendWhatsApp(CONFIG.ADMIN_PHONE,
        `⏰ *HATIRLATMA*\n${app.firstName} ${app.lastName} randevusu 30 dk sonra\n📅 ${app.date} ${app.time}\n💎 ${app.service}`);
      
      reminded.push(app.id);
      DB.set('reminded', reminded);
    }
  });
}
setInterval(checkUpcomingAppointments, 60000);

// ========= OTURUM =========
function login(email, password) {
  const staff = DB.get('staff').find(s => s.email===email && s.password===password);
  if (staff) { sessionStorage.setItem('zeus_session', JSON.stringify(staff)); return staff; }
  return null;
}
function currentUser() { try{return JSON.parse(sessionStorage.getItem('zeus_session'))}catch(e){return null} }
function logout() { sessionStorage.removeItem('zeus_session'); window.location.href='giris.html'; }
function requireAuth(role) {
  const u = currentUser();
  if (!u) { window.location.href='giris.html'; return null; }
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
  if ('Notification' in window && Notification.permission === 'default') {
    setTimeout(() => Notification.requestPermission(), 2000);
  }
});

// ========= FOOTER =========
function renderFooter() {
  return `
  <footer>
    <div class="footer-grid">
      <div>
        <div class="logo"><div class="logo-icon">⚡</div><div class="logo-text">ZEUS<br><small>Diş Kliniği</small></div></div>
        <p style="margin-top:1rem;font-size:.9rem">Sağlıklı ve güzel gülüşler için Zeus Diş Kliniği yanınızda.</p>
      </div>
      <div><h4>Hizmetler</h4><ul>
        <li><a href="hizmetler.html">İmplant</a></li><li><a href="hizmetler.html">Beyazlatma</a></li>
        <li><a href="hizmetler.html">Porselen</a></li><li><a href="hizmetler.html">Ortodonti</a></li>
      </ul></div>
      <div><h4>Hızlı Linkler</h4><ul>
        <li><a href="index.html">Anasayfa</a></li><li><a href="hakkimizda.html">Hakkımızda</a></li>
        <li><a href="randevu.html">Randevu Al</a></li><li><a href="iletisim.html">İletişim</a></li>
      </ul></div>
      <div><h4>İletişim</h4><ul>
        <li>📍 Kadıköy, İstanbul</li><li>📞 +90 212 555 00 00</li><li>✉️ info@zeusdis.com</li>
      </ul></div>
    </div>
    <div class="footer-bottom">© 2025 Zeus Diş Kliniği. Tüm hakları saklıdır.</div>
  </footer>`;
}
