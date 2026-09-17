/**
 * Digital Wedding Invitation Web App Controller
 * Luxury Black + Burgundy + Champagne Gold Edition
 * Customized for Anu & Alan — Betrothal Celebration (October 19, 2026)
 */

document.addEventListener('DOMContentLoaded', () => {
  // 1. Bind Central Data
  initDataBinding();

  // 2. Setup Audio Player & Auto Play
  initAudioPlayer();

  // 3. Setup Dynamic Countdown Timer
  initCountdown();

  // 4. Setup Interactive Calendar Grid
  initCalendar();

  // 5. Setup Venue Tabs Switcher
  initVenueTabs();

  // 6. Setup RSVP Form & Local Storage State
  initRSVPForm();

  // 7. Setup Photo Gallery Lightbox & Keyboard Shortcuts
  initLightbox();

  // 8. Setup Fullscreen Menu & Navigation
  initNavigationMenu();

  // 9. Setup Scroll Reveal Intersection Observer
  initScrollReveal();

  // 10. Setup Floating Scroll To Top Button
  initScrollToTop();
});

/* ==========================================================================
   1. DATA BINDING ENGINE
   ========================================================================== */
function initDataBinding() {
  if (typeof weddingData === 'undefined') return;

  // Bind Groom & Bride Photos & Names
  const groomPhoto = document.getElementById('groom-photo');
  const bridePhoto = document.getElementById('bride-photo');
  const groomNameHeading = document.getElementById('groom-name-heading');
  const brideNameHeading = document.getElementById('bride-name-heading');
  const groomParentsText = document.getElementById('groom-parents-text');
  const brideParentsText = document.getElementById('bride-parents-text');

  if (groomPhoto) groomPhoto.src = weddingData.groom.image;
  if (bridePhoto) bridePhoto.src = weddingData.bride.image;
  if (groomNameHeading) groomNameHeading.textContent = weddingData.groom.name;
  if (brideNameHeading) brideNameHeading.textContent = weddingData.bride.name;
  if (groomParentsText) groomParentsText.textContent = weddingData.groom.parents;
  if (brideParentsText) brideParentsText.textContent = weddingData.bride.parents;

  // Bind Hero Photo & Cinematic Banner Photo
  const heroMainPhoto = document.getElementById('hero-main-photo');
  const cinematicBannerPhoto = document.getElementById('cinematic-banner-photo');
  const heroVideo = document.getElementById('hero-main-video');
  const heroVideoSource = document.getElementById('hero-video-source');
  const btnVideoToggle = document.getElementById('btn-hero-video-toggle');

  if (heroMainPhoto) heroMainPhoto.src = weddingData.hero.photo;
  if (cinematicBannerPhoto) cinematicBannerPhoto.src = weddingData.cinematicBanner.photo;

  if (heroVideo && weddingData.hero && weddingData.hero.video) {
    heroVideo.style.display = 'block';
    if (heroMainPhoto) heroMainPhoto.style.display = 'none';

    heroVideo.play().catch((err) => {
      console.log("Autoplay muted video:", err);
    });

    if (btnVideoToggle) {
      btnVideoToggle.addEventListener('click', (e) => {
        e.stopPropagation();
        heroVideo.style.display = 'block';
        if (heroMainPhoto) heroMainPhoto.style.display = 'none';

        if (heroVideo.paused) {
          heroVideo.play();
          heroVideo.muted = false;
          btnVideoToggle.classList.add('playing');
          btnVideoToggle.querySelector('span').textContent = 'AUDIO ON';
        } else if (!heroVideo.muted) {
          heroVideo.muted = true;
          btnVideoToggle.classList.remove('playing');
          btnVideoToggle.querySelector('span').textContent = 'WATCH VIDEO';
        } else {
          heroVideo.muted = false;
          btnVideoToggle.classList.add('playing');
          btnVideoToggle.querySelector('span').textContent = 'AUDIO ON';
        }
      });
    }
  } else {
    if (heroVideo) heroVideo.style.display = 'none';
    if (heroMainPhoto) heroMainPhoto.style.display = 'block';
  }

  // Render Gallery Grid
  renderGalleryGrid();
}

/* ==========================================================================
   2. AUDIO PLAYER & AUTO PLAY ON LOAD
   ========================================================================== */
let audioElem = null;
let audioCtx = null;
let isPlaying = false;

function initAudioPlayer() {
  audioElem = document.getElementById('wedding-audio');
  if (audioElem && weddingData.music && weddingData.music.url) {
    audioElem.src = weddingData.music.url;
  }

  // Attempt immediate autoplay on link/page open
  playAudio();

  // Add global touch/click listeners to unblock autoplay policies instantly on first user gesture
  const unlockAudioOnGesture = () => {
    if (!isPlaying) {
      playAudio();
    }
    window.removeEventListener('click', unlockAudioOnGesture);
    window.removeEventListener('touchstart', unlockAudioOnGesture);
    window.removeEventListener('pointerdown', unlockAudioOnGesture);
  };

  window.addEventListener('click', unlockAudioOnGesture);
  window.addEventListener('touchstart', unlockAudioOnGesture);
  window.addEventListener('pointerdown', unlockAudioOnGesture);

  const btnOpen = document.getElementById('btn-open-invitation');
  const coverScreen = document.getElementById('cover-screen');
  const floatingMusicBtn = document.getElementById('floating-music-toggle');
  const navMusicBtn = document.getElementById('nav-music-btn');

  if (btnOpen && coverScreen) {
    btnOpen.addEventListener('click', () => {
      coverScreen.classList.add('opened');
      playAudio();
      const heroSec = document.getElementById('hero-section');
      if (heroSec) heroSec.scrollIntoView({ behavior: 'smooth' });
    });
  }

  if (floatingMusicBtn) {
    floatingMusicBtn.addEventListener('click', toggleAudio);
  }

  if (navMusicBtn) {
    navMusicBtn.addEventListener('click', openMusicModal);
  }
}

function playAudio() {
  if (!audioElem) return;
  audioElem.play().then(() => {
    isPlaying = true;
    updateMusicUI(true);
  }).catch(() => {
    startPianoSynthFallback();
    isPlaying = true;
    updateMusicUI(true);
  });
}

window.toggleAudio = function() {
  if (!audioElem) return;
  if (isPlaying) {
    audioElem.pause();
    if (audioCtx) audioCtx.suspend();
    isPlaying = false;
    updateMusicUI(false);
  } else {
    playAudio();
  }
};

function updateMusicUI(playing) {
  const floatBtn = document.getElementById('floating-music-toggle');
  const modalPlayBtn = document.getElementById('modal-play-btn');

  if (floatBtn) {
    floatBtn.classList.toggle('playing', playing);
  }

  if (modalPlayBtn) {
    modalPlayBtn.innerHTML = playing ? 
      `<svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><rect x="6" y="4" width="4" height="16"></rect><rect x="14" y="4" width="4" height="16"></rect></svg>` : 
      `<svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><polygon points="5 3 19 12 5 21 5 3"></polygon></svg>`;
  }
}

function startPianoSynthFallback() {
  try {
    const AudioContext = window.AudioContext || window.webkitAudioContext;
    audioCtx = new AudioContext();
    const notes = [261.63, 329.63, 392.00, 493.88, 523.25, 659.25];
    let noteIdx = 0;
    
    setInterval(() => {
      if (!isPlaying || audioCtx.state !== 'running') return;
      const osc = audioCtx.createOscillator();
      const gain = audioCtx.createGain();
      osc.type = 'sine';
      osc.frequency.setValueAtTime(notes[noteIdx % notes.length], audioCtx.currentTime);
      gain.gain.setValueAtTime(0.08, audioCtx.currentTime);
      gain.gain.exponentialRampToValueAtTime(0.001, audioCtx.currentTime + 1.8);
      osc.connect(gain);
      gain.connect(audioCtx.destination);
      osc.start();
      osc.stop(audioCtx.currentTime + 2);
      noteIdx++;
    }, 1200);
  } catch (e) {
    console.log("Web audio synth fallback", e);
  }
}

window.openMusicModal = function() {
  document.getElementById('music-modal')?.classList.add('active');
};

window.closeMusicModal = function() {
  document.getElementById('music-modal')?.classList.remove('active');
};

/* ==========================================================================
   3. DYNAMIC COUNTDOWN TIMER
   ========================================================================== */
function initCountdown() {
  const daysEl = document.getElementById('cd-days');
  const hoursEl = document.getElementById('cd-hours');
  const minsEl = document.getElementById('cd-minutes');
  const secsEl = document.getElementById('cd-seconds');
  const bannerEl = document.getElementById('cd-arrived-banner');

  if (!daysEl || !weddingData.weddingDate.isoDate) return;

  const targetDate = new Date(weddingData.weddingDate.isoDate).getTime();

  function update() {
    const now = new Date().getTime();
    const diff = targetDate - now;

    if (diff <= 0) {
      if (bannerEl) bannerEl.style.display = 'block';
      daysEl.textContent = '00';
      hoursEl.textContent = '00';
      minsEl.textContent = '00';
      secsEl.textContent = '00';
      return;
    }

    const d = Math.floor(diff / (1000 * 60 * 60 * 24));
    const h = Math.floor((diff % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
    const m = Math.floor((diff % (1000 * 60 * 60)) / (1000 * 60));
    const s = Math.floor((diff % (1000 * 60)) / 1000);

    daysEl.textContent = d < 10 ? '0' + d : d;
    hoursEl.textContent = h < 10 ? '0' + h : h;
    minsEl.textContent = m < 10 ? '0' + m : m;
    secsEl.textContent = s < 10 ? '0' + s : s;
  }

  update();
  setInterval(update, 1000);
}

/* ==========================================================================
   4. INTERACTIVE CALENDAR GRID — OCTOBER 2026
   ========================================================================== */
function initCalendar() {
  const container = document.getElementById('calendar-days-grid');
  if (!container) return;

  const year = weddingData.weddingDate.calendarYear || 2026;
  const month = weddingData.weddingDate.calendarMonth || 9; // Oct = 9
  const weddingDayNum = parseInt(weddingData.weddingDate.day, 10) || 19;

  const firstDayIndex = new Date(year, month, 1).getDay();
  const daysInMonth = new Date(year, month + 1, 0).getDate();

  container.innerHTML = '';

  for (let i = 0; i < firstDayIndex; i++) {
    const emptyDiv = document.createElement('div');
    emptyDiv.className = 'calendar-day empty';
    container.appendChild(emptyDiv);
  }

  for (let day = 1; day <= daysInMonth; day++) {
    const dayDiv = document.createElement('div');
    dayDiv.className = 'calendar-day';
    if (day === weddingDayNum) {
      dayDiv.classList.add('wedding-day-marker');
    }
    dayDiv.textContent = day;
    container.appendChild(dayDiv);
  }
}

/* ==========================================================================
   5. OUR CELEBRATIONS SECTION INITIALIZER
   ========================================================================== */
function initCelebrations() {
  // Static HTML is rendered in index.html for maximum SEO and reliability
}

/* ==========================================================================
   6. VENUE TABS & MAP SELECTOR
   ========================================================================== */
function initVenueTabs() {
  const tabCeremony = document.getElementById('venue-tab-ceremony');
  const tabReception = document.getElementById('venue-tab-reception');

  if (tabCeremony && tabReception) {
    tabCeremony.addEventListener('click', () => switchVenueTab('ceremony'));
    tabReception.addEventListener('click', () => switchVenueTab('reception'));
  }

  switchVenueTab('ceremony');
}

function switchVenueTab(eventId) {
  const eventData = weddingData.events.find(e => e.id === eventId) || weddingData.events[0];
  
  document.getElementById('venue-tab-ceremony')?.classList.toggle('active', eventId === 'ceremony');
  document.getElementById('venue-tab-reception')?.classList.toggle('active', eventId === 'reception');

  const titleEl = document.getElementById('venue-active-title');
  const addressEl = document.getElementById('venue-active-address');
  const mapImg = document.getElementById('venue-active-map');
  const btnMap = document.getElementById('btn-view-map');
  const btnDir = document.getElementById('btn-get-directions');

  if (titleEl) titleEl.textContent = eventData.venue;
  if (addressEl) addressEl.textContent = eventData.address;
  if (mapImg) mapImg.src = eventData.mapImage;
  if (btnMap) btnMap.href = eventData.googleMapsUrl;
  if (btnDir) btnDir.href = eventData.googleMapsUrl;
}

window.downloadICS = function(eventId) {
  const event = weddingData.events.find(e => e.id === eventId) || weddingData.events[0];
  const icsContent = 
`BEGIN:VCALENDAR
VERSION:2.0
PRODID:-//Anu and Alan Betrothal//EN
BEGIN:VEVENT
SUMMARY:${event.title} - Anu & Alan
DESCRIPTION:${event.description}
LOCATION:${event.venue}, ${event.address}
DTSTART:20261019T043000Z
DTEND:20261019T070000Z
END:VEVENT
END:VCALENDAR`;

  const blob = new Blob([icsContent], { type: 'text/calendar;charset=utf-8;' });
  const url = URL.createObjectURL(blob);
  const link = document.createElement('a');
  link.href = url;
  link.setAttribute('download', `${event.id}_anu_alan_betrothal.ics`);
  document.body.appendChild(link);
  link.click();
  document.body.removeChild(link);
};

/* ==========================================================================
   7. RSVP FORM & CONFETTI
   ========================================================================== */
function initRSVPForm() {
  const form = document.getElementById('rsvp-form');
  const successBox = document.getElementById('rsvp-success-box');
  const radioAccept = document.getElementById('radio-accept');
  const radioDecline = document.getElementById('radio-decline');
  const attendanceHidden = document.getElementById('rsvp-attendance');
  const btnBackHome = document.getElementById('btn-rsvp-back-home');

  if (!form) return;

  const savedRSVP = localStorage.getItem('anuweds_rsvp');
  if (savedRSVP) {
    if (form) form.style.display = 'none';
    if (successBox) successBox.style.display = 'block';
  }

  if (radioAccept && radioDecline) {
    radioAccept.addEventListener('click', () => {
      radioAccept.classList.add('selected');
      radioDecline.classList.remove('selected');
      if (attendanceHidden) attendanceHidden.value = 'accept';
    });
    radioDecline.addEventListener('click', () => {
      radioDecline.classList.add('selected');
      radioAccept.classList.remove('selected');
      if (attendanceHidden) attendanceHidden.value = 'decline';
    });
  }

  form.addEventListener('submit', (e) => {
    e.preventDefault();
    const name = document.getElementById('rsvp-name').value.trim();
    const guests = document.getElementById('rsvp-guests').value;
    const attendance = attendanceHidden ? attendanceHidden.value : 'accept';
    const message = document.getElementById('rsvp-message').value.trim();

    if (!name) {
      alert('Please enter your name.');
      return;
    }

    const data = { name, guests, attendance, message, timestamp: new Date().toISOString() };
    localStorage.setItem('anuweds_rsvp', JSON.stringify(data));

    form.style.display = 'none';
    successBox.style.display = 'block';
    triggerConfetti();
  });

  if (btnBackHome) {
    btnBackHome.addEventListener('click', () => {
      document.getElementById('hero-section')?.scrollIntoView({ behavior: 'smooth' });
    });
  }
}

function triggerConfetti() {
  const canvas = document.createElement('canvas');
  canvas.style.position = 'fixed';
  canvas.style.top = '0';
  canvas.style.left = '0';
  canvas.style.width = '100vw';
  canvas.style.height = '100vh';
  canvas.style.pointerEvents = 'none';
  canvas.style.zIndex = '99999';
  document.body.appendChild(canvas);

  const ctx = canvas.getContext('2d');
  canvas.width = window.innerWidth;
  canvas.height = window.innerHeight;

  const particles = [];
  const colors = ['#D4AF6A', '#5A0712', '#7D0B18', '#F4EBDD', '#A7192B'];

  for (let i = 0; i < 90; i++) {
    particles.push({
      x: canvas.width / 2,
      y: canvas.height / 2,
      vx: (Math.random() - 0.5) * 12,
      vy: (Math.random() - 0.8) * 14,
      size: Math.random() * 8 + 4,
      color: colors[Math.floor(Math.random() * colors.length)],
      opacity: 1
    });
  }

  function animate() {
    ctx.clearRect(0, 0, canvas.width, canvas.height);
    let active = false;

    particles.forEach(p => {
      p.x += p.vx;
      p.y += p.vy;
      p.vy += 0.35;
      p.opacity -= 0.015;

      if (p.opacity > 0) {
        active = true;
        ctx.globalAlpha = Math.max(0, p.opacity);
        ctx.fillStyle = p.color;
        ctx.fillRect(p.x, p.y, p.size, p.size);
      }
    });

    if (active) {
      requestAnimationFrame(animate);
    } else {
      document.body.removeChild(canvas);
    }
  }

  animate();
}

/* ==========================================================================
   8. MASONRY PHOTO GALLERY & LIGHTBOX
   ========================================================================== */
let currentLightboxIdx = 0;

function renderGalleryGrid() {
  const container = document.getElementById('gallery-masonry-container');
  if (!container || !weddingData.gallery) return;

  container.innerHTML = weddingData.gallery.map((item, idx) => `
    <div class="gallery-item ${item.class || ''} scroll-reveal" onclick="openLightbox(${idx})">
      <img src="${item.url}" alt="${item.caption}" class="gallery-img" loading="lazy" />
      <div class="gallery-caption-overlay">
        <span class="gallery-caption-text">${item.caption}</span>
      </div>
    </div>
  `).join('');
}

window.openLightbox = function(index) {
  currentLightboxIdx = index;
  const modal = document.getElementById('lightbox-modal');
  const img = document.getElementById('lightbox-img');
  const caption = document.getElementById('lightbox-caption');

  if (!modal || !weddingData.gallery[index]) return;

  img.src = weddingData.gallery[index].url;
  caption.textContent = weddingData.gallery[index].caption;
  modal.classList.add('active');
};

window.closeLightbox = function() {
  document.getElementById('lightbox-modal')?.classList.remove('active');
};

window.navLightbox = function(dir) {
  if (!weddingData.gallery || weddingData.gallery.length === 0) return;
  currentLightboxIdx = (currentLightboxIdx + dir + weddingData.gallery.length) % weddingData.gallery.length;
  openLightbox(currentLightboxIdx);
};

function initLightbox() {
  document.addEventListener('keydown', (e) => {
    const modal = document.getElementById('lightbox-modal');
    if (modal && modal.classList.contains('active')) {
      if (e.key === 'Escape') closeLightbox();
      if (e.key === 'ArrowLeft') navLightbox(-1);
      if (e.key === 'ArrowRight') navLightbox(1);
    }
  });
}

/* ==========================================================================
   9. FULLSCREEN MENU NAVIGATION
   ========================================================================== */
function initNavigationMenu() {
  const btnHamburger = document.getElementById('hamburger-menu-btn');
  if (btnHamburger) {
    btnHamburger.addEventListener('click', openFullscreenMenu);
  }
}

window.openFullscreenMenu = function() {
  document.getElementById('fullscreen-menu')?.classList.add('active');
};

window.closeFullscreenMenu = function() {
  document.getElementById('fullscreen-menu')?.classList.remove('active');
};

/* ==========================================================================
   10. SCROLL REVEAL & SCROLL TO TOP
   ========================================================================== */
function initScrollReveal() {
  const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        entry.target.classList.add('visible');
      }
    });
  }, { threshold: 0.15 });

  document.querySelectorAll('.scroll-reveal').forEach(el => observer.observe(el));
}

function initScrollToTop() {
  const btnTop = document.getElementById('btn-scroll-top');
  if (btnTop) {
    btnTop.addEventListener('click', () => {
      window.scrollTo({ top: 0, behavior: 'smooth' });
    });
  }
}
