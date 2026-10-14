'use strict';
/* =========================================================================
   PORTFOLIO OS — edit this block to personalise everything
   ========================================================================= */
const PORTFOLIO_CONFIG = {
  name: "Shaikh Sams",
  role: "Student • Coder • Gamer • Business",
  tagline: "Quiet mind, Expensive dreams.",
  about: "[Hello! I am Sam Son of Shaikh Nafish]\n\nA dedicated programmer and web developer with a strong focus on my goals. I am working hard to crack the JEE and achieve my dream of becoming a CS Engineer from an IIT. Through consistent learning and hands-on coding, I am preparing for a bright future in tech.",
  location: "Purnea, Bihar",

  // ---- Contact / social links (replace the placeholders) ----
  email: "babulsams2@gmail.com",                       // e.g. "babulsams2@gmail.com"
  instagram: "https://www.instagram.com/lin.uxsam?stkn=ZTgyNTFkcDU4Nmg=",           // e.g. "https://instagram.com/yourname"
  github: "https://github.com/samsbabul",                 // e.g. "https://github.com/yourname"
  linkedin: "https://www.linkedin.com/in/shaikh-sam-2972a4423 ",             // e.g. "https://linkedin.com/in/yourname"
  youtubeChannel: "https://www.youtube.com/@shaikhsam71845",// optional, used by the YouTube app

  // ---- Weather ----
  // Leave as-is to use the free Open-Meteo API (no key needed).
  // Paste an OpenWeatherMap key (https://openweathermap.org/api) to use that instead.
  weatherApiKey: "01148d7754a39e51c264ef2efa94c887",

  // ---- Contact form ----
  // Optional: a Formspree/Getform style endpoint, e.g. "https://formspree.io/f/xxxxxx".
  // If empty, the form opens your email app (mailto:) instead.
  formEndpoint: "",

  // ---- Quote card ----
  quote: "Don't be afraid of being different.\nBe afraid of being the same as everyone else.",

  // ---- Images (put your files in these paths; placeholders show until you do) ----
  profileImage: "pic.jpg",
  wallpaperImage: "", // optional: transparent PNG shown in the centre

  stats: { visitsStart: 0, codingHours: "500+ HRS", level: "Lv. 1" },

  skills: [
    { name: "HTML", level: 90 },
    { name: "CSS", level: 85 },
    { name: "JavaScript", level: 80 },
    { name: "C++", level: 70 },
    { name: "Python", level: 70 },
    { name: "Git", level: 75 }
  ],

  projects: [
    { title: "Project 1", description: "Short description of your first project and what problem it solves.", tech: ["HTML", "CSS", "JavaScript"], image: "https://i.pinimg.com/1200x/3d/04/83/3d0483e26273b36916b82f4d4aef0e8c.jpg", github: "GITHUB_URL", demo: "LIVE_DEMO_URL" },
    { title: "Project 2", description: "Short description of your second project and what you learned building it.", tech: ["Python", "Flask"], image: "https://i.pinimg.com/1200x/8f/e4/bf/8fe4bfc7c63e50f75d6a1ce873336fac.jpg", github: "GITHUB_URL", demo: "LIVE_DEMO_URL" },
    { title: "Project 3", description: "Short description of your third project and the tools you used.", tech: ["C++", "STL"], image: "https://i.pinimg.com/736x/46/37/c0/4637c0a064de3876761fa89fc7ee404f.jpg", github: "GITHUB_URL", demo: "LIVE_DEMO_URL" }
  ],

  experience: [
    { when: "2025 — Present", title: "Student Developer", desc: "Describe what you are studying or building right now." },
    { when: "2024", title: "First Open-Source Contribution", desc: "Describe an achievement, internship, hackathon or course." }
  ],

  goals: [
    "Build and ship 10 real-world projects",
    "Learn data structures & algorithms deeply",
    "Contribute to open source",
    "Land an internship in software development"
  ],

  // Gallery: add your own images to assets/gallery/ and list them here.
  gallery: [
    { src: "gell1.jpeg", title: "Portfolio" },
    { src: "gell2.jpeg", title: "Certificate" },
    { src: "gell3.jpeg", title: "Pic1" },
    { src: "gell4.jpeg", title: "Pic2" },
    { src: "gell5.jpeg", title: "Pic3" },
    { src: "gell6.jpeg", title: "pic4" },
  ]
};

/* =========================================================================
   Helpers
   ========================================================================= */
const C = PORTFOLIO_CONFIG;
const $ = (s, r = document) => r.querySelector(s);
const $$ = (s, r = document) => [...r.querySelectorAll(s)];
const isMobile = () => window.matchMedia('(max-width:700px)').matches;
const esc = s => String(s ?? '').replace(/[&<>"']/g, c => ({ '&': '&amp;', '<': '&lt;', '>': '&gt;', '"': '&quot;', "'": '&#39;' }[c]));
const pad = n => String(n).padStart(2, '0');

const store = {
  get(k, d) { try { const v = localStorage.getItem(k); return v === null ? d : JSON.parse(v); } catch { return d; } },
  set(k, v) { try { localStorage.setItem(k, JSON.stringify(v)); } catch { /* storage unavailable */ } },
  clear() { try { Object.keys(localStorage).filter(k => k.startsWith('pf_')).forEach(k => localStorage.removeItem(k)); } catch { /* ignore */ } }
};

const isPlaceholder = v => !v || /^YOUR\b/i.test(String(v).trim()) || /_URL$/i.test(String(v).trim());

let toastTimer;
function toast(msg) {
  const t = $('#toast');
  t.textContent = msg;
  t.classList.add('show');
  clearTimeout(toastTimer);
  toastTimer = setTimeout(() => t.classList.remove('show'), 3400);
}
/* ---- Icons ---- */
const GLYPH = { 
  pin: '<path d="M12 21s7-6.2 7-11.5a7 7 0 0 0-14 0C5 14.8 12 21 12 21z"/><circle cx="12" cy="9.5" r="2.5"/>',
  search: '<circle cx="11" cy="11" r="6.5"/><path d="M16 16l4.5 4.5"/>',
  moon: '<path d="M20 14.5A8 8 0 0 1 9.5 4a8 8 0 1 0 10.5 10.5z"/>',
  wifi: '<path d="M2 9a15 15 0 0 1 20 0M5 12.5a10.5 10.5 0 0 1 14 0M8.5 16a5.5 5.5 0 0 1 7 0"/><circle cx="12" cy="19.5" r="1" fill="currentColor"/>',
  expand: '<path d="M4 9V4h5M20 9V4h-5M4 15v5h5M20 15v5h-5"/>',
  motion: '<circle cx="12" cy="12" r="3"/><path d="M12 3v3M12 18v3M3 12h3M18 12h3"/>'
};
const svgIcon = (n, cls = '') => `<svg class="${cls}" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.8" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true">${GLYPH[n] || ''}</svg>`;
const appIcon = (n, size = '') => `<span class="app-icon ic-${n} ${size}">${svgIcon(n)}</span>`;


/* ---- Generated placeholder artwork (used when a real image isn't found) ---- */
function art(seed = 0, label = '') {
  const hue = [0, 352, 8, 356, 14][seed % 5];
  const cx = 20 + ((seed * 37) % 60), cy = 25 + ((seed * 53) % 50);
  const X = cx * 4, Y = cy * 3;
  let lines = '', rings = '';
  for (let i = 0; i < 12; i++) { const a = i / 12 * Math.PI * 2; lines += `<line x1="${X}" y1="${Y}" x2="${(X + Math.cos(a) * 560).toFixed(0)}" y2="${(Y + Math.sin(a) * 560).toFixed(0)}"/>`; }
  for (let r = 1; r <= 7; r++) rings += `<circle cx="${X}" cy="${Y}" r="${r * 36}"/>`;
  const svg = `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 400 300"><defs><radialGradient id="g" cx="${cx}%" cy="${cy}%" r="85%"><stop offset="0" stop-color="hsl(${hue},78%,44%)"/><stop offset=".55" stop-color="hsl(${hue},70%,14%)"/><stop offset="1" stop-color="#060608"/></radialGradient></defs><rect width="400" height="300" fill="url(#g)"/><g stroke="rgba(255,255,255,.2)" fill="none" stroke-width="1">${lines}${rings}</g>${label ? `<text x="16" y="282" fill="rgba(255,255,255,.88)" font-family="sans-serif" font-size="16" font-weight="600">${esc(label)}</text>` : ''}</svg>`;
  return 'data:image/svg+xml;charset=utf-8,' + encodeURIComponent(svg);
}
const img = (src, seed, alt, label = '') => `<img src="${esc(src)}" alt="${esc(alt)}" loading="lazy" decoding="async" data-seed="${seed}" data-label="${esc(label)}">`;
document.addEventListener('error', e => {
  const t = e.target;
  if (t && t.tagName === 'IMG' && t.dataset.seed !== undefined && !t.dataset.fb) { t.dataset.fb = '1'; t.src = art(+t.dataset.seed, t.dataset.label || ''); }
}, true);

/* ---- External links ---- */
const LINK_LABELS = { email: 'Email', instagram: 'Instagram', github: 'GitHub', linkedin: 'LinkedIn', youtube: 'YouTube channel' };
function resolveLink(key) {
  const v = key === 'youtube' ? C.youtubeChannel : C[key];
  if (isPlaceholder(v)) return null;
  const s = String(v).trim();
  if (key === 'email') return s.startsWith('mailto:') ? s : 'mailto:' + s;
  return /^https?:\/\//i.test(s) ? s : 'https://' + s;
}
function openExternal(url, label, hint) {
  if (isPlaceholder(url)) { toast(`Add your ${label} link in script.js → ${hint}`); return; }
  const u = /^(https?:|mailto:)/i.test(url) ? url : 'https://' + url;
  if (u.startsWith('mailto:')) window.location.href = u; else window.open(u, '_blank', 'noopener,noreferrer');
}
function openLink(key) {
  const url = resolveLink(key);
  if (!url) { toast(`Add your ${LINK_LABELS[key]} link in script.js → PORTFOLIO_CONFIG.${key === 'youtube' ? 'youtubeChannel' : key}`); return; }
  openExternal(url, LINK_LABELS[key], `PORTFOLIO_CONFIG.${key}`);
}

/* =========================================================================
   Settings
   ========================================================================= */
const ACCENTS = [['#e23636', 'Red'], ['#ff6a3d', 'Orange'], ['#f5b82e', 'Gold'], ['#34c759', 'Green'], ['#0a84ff', 'Blue'], ['#bf5af2', 'Purple']];
const WALLS = [['wall1', 'Wallpaper 1'], ['wall2', 'Wallpaper 2'], ['wall3', 'Wallpaper 3'], ['wall4', 'Wallpaper 4'], ['wall5', 'Wallpaper 5'], ['wall6', 'Wallpaper 6'], ['wall7', 'Wallpaper 7'], ['wall8', 'Wallpaper 8']];
const DEFAULTS = { theme: 'dark', wallpaper: 'wall1', wallpaperSound: false, clock24: false, accent: '#e23636', reduce: window.matchMedia('(prefers-reduced-motion: reduce)').matches, unit: 'C' };
let settings = { ...DEFAULTS, ...store.get('pf_settings', {}) };
if (!WALLS.some(([value]) => value === settings.wallpaper)) settings.wallpaper = DEFAULTS.wallpaper;

function setSetting(k, v) {
  settings[k] = v;
  const startWallpaperWithSound = k === 'wallpaper' && v === 'wall8';
  if (startWallpaperWithSound) settings.wallpaperSound = true;
  store.set('pf_settings', settings);
  applySettings();
}
function syncWallpaperSoundButton() {
  const button = $('#wallpaperSound');
  const muted = $('#wallpaperVideo').muted;
  button.hidden = settings.wallpaper !== 'wall8';
  button.textContent = muted ? 'Sound on' : 'Mute sound';
  button.setAttribute('aria-label', muted ? 'Enable wallpaper sound' : 'Mute wallpaper sound');
  button.title = muted ? 'Enable wallpaper sound' : 'Mute wallpaper sound';
}
function applySettings() {
  document.documentElement.dataset.theme = settings.theme;
  document.documentElement.style.setProperty('--wall', `url('${settings.wallpaper}.jpg') center/cover no-repeat`);
  const video = $('#wallpaperVideo');
  const videoWallpaper = settings.wallpaper === 'wall8';
  video.hidden = !videoWallpaper;
  if (videoWallpaper) {
    video.muted = !settings.wallpaperSound;
    const play = video.play();
    if (play) play.catch(error => {
      video.muted = true;
      syncWallpaperSoundButton();
      if (error.name === 'NotAllowedError') {
        toast('Browser blocked wallpaper audio. Click Sound on in the top bar.');
      } else {
        toast('Wallpaper video could not start. Check that vid1.mp4 is available.');
      }
    });
  } else {
    video.pause();
    video.muted = true;
  }
  syncWallpaperSoundButton();
  document.documentElement.style.setProperty('--accent', settings.accent);
  document.body.classList.toggle('reduce-motion', !!settings.reduce);
  $('meta[name="theme-color"]').setAttribute('content', settings.theme === 'dark' ? '#0a0a0c' : '#e8e8ee');
  syncSettingsUI();
  syncCC();
  tick(true);
  if (WX.data) renderWeather();
}
const toggleTheme = () => setSetting('theme', settings.theme === 'dark' ? 'light' : 'dark');

/* =========================================================================
   Clock / date / calendar
   ========================================================================= */
function timeParts(d, tz) {
  const o = { hour: settings.clock24 ? '2-digit' : 'numeric', minute: '2-digit', second: '2-digit', ...(settings.clock24 ? { hourCycle: 'h23' } : { hour12: true }) };
  if (tz) o.timeZone = tz;
  const parts = new Intl.DateTimeFormat([], o).formatToParts(d);
  const g = t => (parts.find(p => p.type === t) || {}).value || '';
  return { h: g('hour'), m: g('minute'), s: g('second'), ap: g('dayPeriod') };
}
let lastDay = -1, tickTimer;
function tick(force) {
  const now = new Date();
  const p = timeParts(now);
  $('#mbDate').textContent = now.toLocaleDateString([], { weekday: 'short', month: 'short', day: 'numeric' });
  $('#mbTime').textContent = `${p.h}:${p.m}${p.ap ? ' ' + p.ap : ''}`;
  $('#wcHM').textContent = `${p.h}:${p.m}`;
  $('#wcSec').textContent = p.s;
  $('#wcAp').textContent = p.ap;
  $('#wcDate').textContent = now.toLocaleDateString([], { weekday: 'long', month: 'short', day: 'numeric' });
  if (now.getDate() !== lastDay || force) { lastDay = now.getDate(); renderCalendar(now); }
  tickClockWindow(now);
  updateWxTime();
  if (force !== true) { clearTimeout(tickTimer); tickTimer = setTimeout(tick, 1000 - (Date.now() % 1000) + 5); }
}
function renderCalendar(now) {
  const y = now.getFullYear(), m = now.getMonth(), today = now.getDate();
  const first = new Date(y, m, 1).getDay(), days = new Date(y, m + 1, 0).getDate();
  let cells = ['S', 'M', 'T', 'W', 'T', 'F', 'S'].map(d => `<b>${d}</b>`).join('');
  for (let i = 0; i < first; i++) cells += '<span></span>';
  for (let d = 1; d <= days; d++) cells += `<span class="${d === today ? 'today' : ''}">${d}</span>`;
  $('#calWidget').innerHTML = `<div class="cal-big"><span class="cal-dow">${esc(now.toLocaleDateString([], { weekday: 'long' }).toUpperCase())}</span><span class="cal-day">${today}</span><span class="cal-mon">${esc(now.toLocaleDateString([], { month: 'long', year: 'numeric' }))}</span></div><div class="cal-grid" aria-hidden="true">${cells}</div>`;
}
document.addEventListener('visibilitychange', () => { if (!document.hidden) tick(); });

/* =========================================================================
   Weather (Open-Meteo by default, OpenWeatherMap if key is provided)
   ========================================================================= */
const WX = { status: 'loading', data: null, message: '', formOpen: false, timer: null };
const wxEl = $('#weather');

function wmoKind(c, day) {
  if (c === 0) return day ? 'sun' : 'moon';
  if (c <= 2) return 'partly';
  if (c === 3) return 'cloud';
  if (c === 45 || c === 48) return 'fog';
  if ((c >= 51 && c <= 67) || (c >= 80 && c <= 82)) return 'rain';
  if ((c >= 71 && c <= 77) || c === 85 || c === 86) return 'snow';
  if (c >= 95) return 'storm';
  return 'cloud';
}
const WMO_TEXT = { 0: 'Clear', 1: 'Mostly clear', 2: 'Partly cloudy', 3: 'Overcast', 45: 'Fog', 48: 'Rime fog', 51: 'Light drizzle', 53: 'Drizzle', 55: 'Heavy drizzle', 56: 'Freezing drizzle', 57: 'Freezing drizzle', 61: 'Light rain', 63: 'Rain', 65: 'Heavy rain', 66: 'Freezing rain', 67: 'Freezing rain', 71: 'Light snow', 73: 'Snow', 75: 'Heavy snow', 77: 'Snow grains', 80: 'Rain showers', 81: 'Rain showers', 82: 'Violent showers', 85: 'Snow showers', 86: 'Snow showers', 95: 'Thunderstorm', 96: 'Thunderstorm, hail', 99: 'Thunderstorm, hail' };
function owKind(id, night) {
  if (id >= 200 && id < 300) return 'storm';
  if (id >= 300 && id < 600) return 'rain';
  if (id >= 600 && id < 700) return 'snow';
  if (id >= 700 && id < 800) return 'fog';
  if (id === 800) return night ? 'moon' : 'sun';
  if (id <= 802) return 'partly';
  return 'cloud';
}
function weatherIcon(kind) {
  const cloud = '<path d="M14 36h20a8 8 0 0 0 .6-16A11 11 0 0 0 13 23a6.5 6.5 0 0 0 1 13z" fill="#d7dbe3"/>';
  const sun = '<circle cx="24" cy="24" r="8" fill="#ffb02e"/><path d="M24 6v5M24 37v5M6 24h5M37 24h5M11.3 11.3l3.5 3.5M33.2 33.2l3.5 3.5M11.3 36.7l3.5-3.5M33.2 14.8l3.5-3.5" stroke="#ffb02e" stroke-width="3" stroke-linecap="round"/>';
  const up = `<g transform="translate(0 -6)">${cloud}</g>`;
  const k = {
    sun, moon: '<path d="M30 8a16 16 0 1 0 10 28A14 14 0 0 1 30 8z" fill="#e8e6d9"/>',
    partly: `<g transform="translate(-3 -5) scale(.78)">${sun}</g><g transform="translate(3 2)">${cloud}</g>`,
    cloud: `<g transform="translate(0 -2)">${cloud}</g>`,
    rain: up + '<path d="M16 34l-2 7M24 34l-2 7M32 34l-2 7" stroke="#5aa9ff" stroke-width="3" stroke-linecap="round"/>',
    snow: up + '<circle cx="16" cy="38" r="2" fill="#fff"/><circle cx="24" cy="42" r="2" fill="#fff"/><circle cx="32" cy="38" r="2" fill="#fff"/>',
    storm: up + '<path d="M25 29l-6 9h5l-2 7 8-11h-5z" fill="#ffd23f"/>',
    fog: '<path d="M8 18h32M12 26h28M8 34h32" stroke="#aeb4c0" stroke-width="3" stroke-linecap="round"/>'
  };
  return `<svg class="wx-ico" viewBox="0 0 48 48" aria-hidden="true">${k[kind] || k.cloud}</svg>`;
}

async function fetchOpenMeteo(lat, lon) {
  const url = `https://api.open-meteo.com/v1/forecast?latitude=${lat}&longitude=${lon}&current=temperature_2m,relative_humidity_2m,apparent_temperature,weather_code,wind_speed_10m,is_day&hourly=temperature_2m,weather_code,is_day&timezone=auto&forecast_days=2`;
  const r = await fetch(url);
  if (!r.ok) throw new Error('Weather service error');
  const j = await r.json();
  const cur = j.current, hs = j.hourly;
  let idx = hs.time.findIndex(t => t > cur.time);
  if (idx < 0) idx = 0;
  const hourly = [];
  for (let i = idx; i < Math.min(idx + 5, hs.time.length); i++) hourly.push({ hour: +hs.time[i].slice(11, 13), temp: hs.temperature_2m[i], kind: wmoKind(hs.weather_code[i], hs.is_day[i]) });
  return { temp: cur.temperature_2m, feels: cur.apparent_temperature, humidity: cur.relative_humidity_2m, wind: cur.wind_speed_10m, kind: wmoKind(cur.weather_code, cur.is_day), text: WMO_TEXT[cur.weather_code] || 'Weather', hourly, tz: j.timezone };
}
async function fetchOpenWeather(lat, lon, key) {
  const base = `https://api.openweathermap.org/data/2.5/`;
  const q = `lat=${lat}&lon=${lon}&units=metric&appid=${encodeURIComponent(key)}`;
  const [r1, r2] = await Promise.all([fetch(`${base}weather?${q}`), fetch(`${base}forecast?${q}&cnt=5`)]);
  if (!r1.ok || !r2.ok) throw new Error('OpenWeather error');
  const c = await r1.json(), f = await r2.json();
  const night = c.weather[0].icon.endsWith('n');
  const off = c.timezone || 0;
  return {
    temp: c.main.temp, feels: c.main.feels_like, humidity: c.main.humidity, wind: c.wind.speed * 3.6,
    kind: owKind(c.weather[0].id, night), text: c.weather[0].description.replace(/^./, s => s.toUpperCase()),
    hourly: f.list.map(i => ({ hour: new Date((i.dt + off) * 1000).getUTCHours(), temp: i.main.temp, kind: owKind(i.weather[0].id, i.weather[0].icon.endsWith('n')) })),
    offset: off
  };
}
async function loadWeather(lat, lon, place) {
  WX.status = 'loading'; renderWeather();
  try {
    let d;
    if (!isPlaceholder(C.weatherApiKey)) {
      try { d = await fetchOpenWeather(lat, lon, C.weatherApiKey); } catch { d = await fetchOpenMeteo(lat, lon); }
    } else d = await fetchOpenMeteo(lat, lon);
    d.place = place; WX.data = d; WX.status = 'ready'; WX.coords = { lat, lon, place };
    renderWeather();
    clearTimeout(WX.timer); WX.timer = setTimeout(() => loadWeather(lat, lon, place), 15 * 60 * 1000);
  } catch {
    WX.status = 'error'; WX.message = "Couldn't load weather. Check your connection and try again."; WX.formOpen = true; renderWeather();
  }
}
const locate = () => new Promise((res, rej) => navigator.geolocation ? navigator.geolocation.getCurrentPosition(p => res({ lat: p.coords.latitude, lon: p.coords.longitude }), rej, { timeout: 10000, maximumAge: 600000 }) : rej(new Error('Geolocation unsupported')));
async function reverseName(lat, lon) {
  try {
    const r = await fetch(`https://api.bigdatacloud.net/data/reverse-geocode-client?latitude=${lat}&longitude=${lon}&localityLanguage=en`);
    const j = await r.json();
    return j.city || j.locality || j.principalSubdivision || 'Your location';
  } catch { return 'Your location'; }
}
async function geocodeCity(name) {
  const r = await fetch(`https://geocoding-api.open-meteo.com/v1/search?name=${encodeURIComponent(name)}&count=1&language=en&format=json`);
  if (!r.ok) throw new Error('Geocoding failed');
  const j = await r.json();
  if (!j.results || !j.results.length) throw new Error('City not found');
  const g = j.results[0];
  return { lat: g.latitude, lon: g.longitude, name: [g.name, g.country_code].filter(Boolean).join(', ') };
}
async function useMyLocation() {
  WX.status = 'loading'; renderWeather();
  try {
    const p = await locate();
    const name = await reverseName(p.lat, p.lon);
    store.set('pf_loc', { ...p, name, manual: false });
    WX.formOpen = false;
    await loadWeather(p.lat, p.lon, name);
  } catch {
    WX.status = WX.data ? 'ready' : 'ask'; WX.message = 'Location permission was denied. Search for a city instead.'; WX.formOpen = true; renderWeather();
    toast('Location unavailable — search for a city instead');
  }
}
async function searchCity(name) {
  name = name.trim(); if (!name) return;
  WX.status = 'loading'; renderWeather();
  try {
    const g = await geocodeCity(name);
    store.set('pf_loc', { lat: g.lat, lon: g.lon, name: g.name, manual: true });
    WX.formOpen = false;
    await loadWeather(g.lat, g.lon, g.name);
  } catch (e) {
    WX.status = WX.data ? 'ready' : 'ask'; WX.message = e.message === 'City not found' ? `No city found for “${name}”. Try another name.` : "Couldn't search right now. Try again.";
    WX.formOpen = true; renderWeather();
  }
}
function localTimeAt(d) {
  const now = new Date();
  const o = { hour: 'numeric', minute: '2-digit', hour12: !settings.clock24 };
  if (d.tz) o.timeZone = d.tz;
  else if (typeof d.offset === 'number') { o.timeZone = 'UTC'; return new Date(now.getTime() + d.offset * 1000).toLocaleTimeString([], o); }
  return now.toLocaleTimeString([], o);
}
function updateWxTime() { const el = $('#wxTime'); if (el) el.textContent = WX.data && WX.status === 'ready' ? localTimeAt(WX.data) : 'Weather'; }
function renderWeather() {
  const d = WX.data, F = settings.unit === 'F';
  const T = c => Math.round(F ? c * 9 / 5 + 32 : c) + '°';
  const hourLabel = h => settings.clock24 ? pad(h) + ':00' : (h % 12 || 12) + (h < 12 ? 'AM' : 'PM');
  let body;
  if (WX.status === 'loading') body = '<p class="wx-msg">Fetching live weather…</p>';
  else if ((WX.status === 'ready') && d) {
    const wind = F ? `${Math.round(d.wind * 0.621371)} mph` : `${Math.round(d.wind)} km/h`;
    body = `<div class="wx-main"><div><div class="wx-loc">${esc(d.place)}</div><div class="wx-temp">${T(d.temp)}</div></div><div class="wx-cond">${weatherIcon(d.kind)}<span>${esc(d.text)}</span></div></div>
      <div class="wx-stats"><span>Feels ${T(d.feels)}</span><span>Humidity ${Math.round(d.humidity)}%</span><span>Wind ${wind}</span></div>
      <div class="wx-fc">${d.hourly.map(h => `<div><span>${hourLabel(h.hour)}</span>${weatherIcon(h.kind)}<b>${T(h.temp)}</b></div>`).join('')}</div>`;
  } else body = `<p class="wx-msg">${esc(WX.message || 'Allow location access or search a city to see live weather.')}</p>`;
  wxEl.innerHTML = `<div class="wx-head"><span id="wxTime">Weather</span><span class="wx-actions">
    <button type="button" id="wxUnit" aria-label="Switch temperature unit (currently °${settings.unit})">°${settings.unit}</button>
    <button type="button" id="wxLocate" aria-label="Use my location">${svgIcon('pin')}</button>
    <button type="button" id="wxToggle" aria-label="Search for a city" aria-expanded="${WX.formOpen}">${svgIcon('search')}</button></span></div>
    ${body}
    <form class="wx-form" id="wxForm" ${WX.formOpen ? '' : 'hidden'}><input id="wxCity" type="text" placeholder="Enter a city" aria-label="City name" autocomplete="off"><button class="btn primary" type="submit">Go</button></form>`;
  updateWxTime();
  if (WX.formOpen && WX.focusForm) { WX.focusForm = false; $('#wxCity').focus(); }
}
wxEl.addEventListener('click', e => {
  if (e.target.closest('#wxUnit')) setSetting('unit', settings.unit === 'C' ? 'F' : 'C');
  else if (e.target.closest('#wxLocate')) useMyLocation();
  else if (e.target.closest('#wxToggle')) { WX.formOpen = !WX.formOpen; WX.focusForm = true; renderWeather(); }
});
wxEl.addEventListener('submit', e => { e.preventDefault(); searchCity($('#wxCity').value); });
async function initWeather() {
  const saved = store.get('pf_loc', null);
  if (saved && saved.manual) { loadWeather(saved.lat, saved.lon, saved.name); return; }
  renderWeather();
  if (!navigator.geolocation) { if (saved) loadWeather(saved.lat, saved.lon, saved.name); else { WX.status = 'ask'; WX.formOpen = true; renderWeather(); } return; }
  try {
    const p = await locate();
    const name = await reverseName(p.lat, p.lon);
    store.set('pf_loc', { ...p, name, manual: false });
    loadWeather(p.lat, p.lon, name);
  } catch {
    if (saved) loadWeather(saved.lat, saved.lon, saved.name);
    else { WX.status = 'ask'; WX.message = 'Location is off. Search for a city to see live weather.'; WX.formOpen = true; renderWeather(); }
  }
}

/* =========================================================================
   YouTube launcher
   ========================================================================= */
function parseYouTube(raw) {
  let s = (raw || '').trim();
  if (!s) return null;
  if (!/^[a-z][a-z0-9+.-]*:\/\//i.test(s)) s = 'https://' + s;
  let u; try { u = new URL(s); } catch { return null; }
  if (!/^https?:$/.test(u.protocol)) return null;
  const host = u.hostname.toLowerCase().replace(/^(www\.|m\.|music\.)/, '');
  const p = u.pathname;
  if (host === 'youtu.be') return p.length > 1 ? u.href : null;
  if (host !== 'youtube.com' && host !== 'youtube-nocookie.com') return null;
  if (p === '/watch') return u.searchParams.get('v') ? u.href : null;
  if (p === '/playlist') return u.searchParams.get('list') ? u.href : null;
  if (p === '/results') return u.searchParams.get('search_query') ? u.href : null;
  if (/^\/(shorts|live|embed|channel|c|user)\/.+/.test(p) || /^\/@[^/]+/.test(p)) return u.href;
  return null;
}
function bindYouTube(form) {
  const input = $('input', form), err = form.parentElement.querySelector('.yt-err');
  form.addEventListener('submit', e => {
    e.preventDefault();
    const url = parseYouTube(input.value);
    if (!url) { err.textContent = 'Enter a valid YouTube video, playlist or channel link (youtube.com or youtu.be).'; input.setAttribute('aria-invalid', 'true'); input.focus(); return; }
    err.textContent = ''; input.removeAttribute('aria-invalid');
    window.open(url, '_blank', 'noopener,noreferrer');
    const recents = [url, ...store.get('pf_yt', []).filter(x => x !== url)].slice(0, 6);
    store.set('pf_yt', recents);
    refreshRecents();
    input.value = '';
    toast('Opening YouTube in a new tab…');
  });
  input.addEventListener('input', () => { err.textContent = ''; });
}
function refreshRecents() {
  const list = $('#ytRecents');
  if (!list) return;
  const r = store.get('pf_yt', []);
  list.innerHTML = r.length ? r.map(u => `<li><button data-yturl="${esc(u)}" title="${esc(u)}">${esc(u.replace(/^https?:\/\/(www\.)?/, ''))}</button></li>`).join('') : '<li class="note">No links opened yet.</li>';
}

/* =========================================================================
   Window manager
   ========================================================================= */
const wins = new Map();
let zTop = 10, cascade = 0;

const APPS = {
  finder: { title: 'Finder', w: 640, h: 420, build: buildFinder },
  portfolio: { title: 'Portfolio', w: 900, h: 600, build: buildPortfolio },
  projects: { title: 'Projects', w: 820, h: 560, build: buildProjects },
  skills: { title: 'Skills', w: 700, h: 500, build: buildSkills },
  gallery: { title: 'Gallery', w: 760, h: 520, build: buildGallery },
  contact: { title: 'Contact', w: 700, h: 580, build: buildContact },
  youtube: { title: 'YouTube', w: 560, h: 440, build: buildYouTube },
  settings: { title: 'Settings', w: 620, h: 560, build: buildSettings },
  clock: { title: 'Clock', w: 560, h: 520, build: buildClock },
  trash: { title: 'Trash', w: 480, h: 340, build: buildTrash }
};
const APP_KEYWORDS = {
  finder: 'files browse apps', portfolio: 'about me home experience goals resume', projects: 'work github demo code',
  skills: 'languages tech stack html css javascript python', gallery: 'photos images pictures spider', contact: 'email mail instagram github linkedin message form',
  youtube: 'video channel watch', settings: 'preferences theme wallpaper accent dark light', clock: 'time date timezone', trash: 'reset clear delete'
};

function openApp(id) {
  const app = APPS[id]; if (!app) return;
  closeMenus();
  let w = wins.get(id);
  if (w) { if (w.minimized) restoreWin(id); focusWin(id); return; }
  const el = document.createElement('section');
  el.className = 'window opening';
  el.setAttribute('role', 'dialog'); el.setAttribute('aria-label', app.title); el.dataset.app = id; el.tabIndex = -1;
  el.innerHTML = `<header class="titlebar"><div class="traffic">
      <button class="tl close" aria-label="Close ${app.title}"></button>
      <button class="tl min" aria-label="Minimize ${app.title}"></button>
      <button class="tl max" aria-label="Maximize ${app.title}"></button></div>
      <div class="t-title">${appIcon(id, 'sm')}<span>${app.title}</span></div></header><div class="win-body"></div>`;
  const width = Math.min(app.w, innerWidth - 24), height = Math.min(app.h, innerHeight - 140);
  const off = (cascade++ % 6) * 26;
  Object.assign(el.style, { width: width + 'px', height: height + 'px', left: Math.max(8, (innerWidth - width) / 2 - 70 + off) + 'px', top: (44 + off) + 'px' });
  $('#windows').appendChild(el);
  w = { el, minimized: false, maximized: false };
  wins.set(id, w);
  app.build($('.win-body', el), el);
  bindWindow(id, w);
  focusWin(id); updateDock();
  setTimeout(() => el.classList.remove('opening'), 300);
}
function bindWindow(id, w) {
  const el = w.el, tb = $('.titlebar', el);
  $('.tl.close', el).addEventListener('click', () => closeWin(id));
  $('.tl.min', el).addEventListener('click', () => minimizeWin(id));
  $('.tl.max', el).addEventListener('click', () => toggleMax(id));
  tb.addEventListener('dblclick', e => { if (!e.target.closest('.tl') && !isMobile()) toggleMax(id); });
  el.addEventListener('pointerdown', () => focusWin(id));
  tb.addEventListener('pointerdown', e => {
    if (e.target.closest('.tl') || w.maximized || isMobile() || e.button !== 0) return;
    const r = el.getBoundingClientRect(), dx = e.clientX - r.left, dy = e.clientY - r.top;
    el.classList.add('dragging');
    try { tb.setPointerCapture(e.pointerId); } catch { /* ignore */ }
    const move = ev => {
      el.style.left = Math.min(Math.max(ev.clientX - dx, -el.offsetWidth + 120), innerWidth - 120) + 'px';
      el.style.top = Math.min(Math.max(ev.clientY - dy, 28), innerHeight - 60) + 'px';
    };
    const up = ev => {
      el.classList.remove('dragging');
      try { tb.releasePointerCapture(ev.pointerId); } catch { /* ignore */ }
      tb.removeEventListener('pointermove', move); tb.removeEventListener('pointerup', up); tb.removeEventListener('pointercancel', up);
    };
    tb.addEventListener('pointermove', move); tb.addEventListener('pointerup', up); tb.addEventListener('pointercancel', up);
  });
}
function frontId() {
  let best = null, bz = -1;
  wins.forEach((w, id) => { if (!w.minimized && +w.el.style.zIndex > bz) { bz = +w.el.style.zIndex; best = id; } });
  return best;
}
function focusWin(id) {
  const w = wins.get(id); if (!w) return;
  w.el.style.zIndex = ++zTop;
  wins.forEach((x, k) => x.el.classList.toggle('focused', k === id));
  updateDock();
}
function closeWin(id) {
  const w = wins.get(id); if (!w) return;
  wins.delete(id);
  w.el.classList.add('closing');
  setTimeout(() => w.el.remove(), settings.reduce ? 0 : 220);
  const f = frontId(); if (f) focusWin(f);
  updateDock();
}
function minimizeWin(id) {
  const w = wins.get(id); if (!w || w.minimized) return;
  const item = $(`.dock-item[data-app="${id}"]`) || $('#dockInner');
  const dr = item.getBoundingClientRect(), er = w.el.getBoundingClientRect();
  w.el.style.transformOrigin = `${dr.left + dr.width / 2 - er.left}px ${dr.top - er.top}px`;
  w.minimized = true; w.el.classList.add('minimized'); w.el.classList.remove('focused');
  const f = frontId(); if (f) focusWin(f);
  updateDock();
}
function restoreWin(id) {
  const w = wins.get(id); if (!w) return;
  w.minimized = false; w.el.classList.remove('minimized');
  focusWin(id);
}
function toggleMax(id) {
  const w = wins.get(id); if (!w) return;
  w.maximized = !w.maximized;
  w.el.classList.toggle('maximized', w.maximized);
  $('.tl.max', w.el).setAttribute('aria-label', (w.maximized ? 'Restore ' : 'Maximize ') + APPS[id].title);
}
function updateDock() {
  const f = frontId();
  $$('.dock-item[data-app]').forEach(b => { b.classList.toggle('running', wins.has(b.dataset.app)); b.setAttribute('aria-pressed', String(f === b.dataset.app)); });
}
const closeFront = () => { const f = frontId(); if (f) closeWin(f); };
const minFront = () => { const f = frontId(); if (f) minimizeWin(f); };
const zoomFront = () => { const f = frontId(); if (f) toggleMax(f); };
const closeAll = () => [...wins.keys()].forEach(closeWin);

/* =========================================================================
   App content builders
   ========================================================================= */
const projectsHTML = () => `<div class="proj-grid">${C.projects.map((p, i) => `
  <article class="proj"><div class="proj-img">${img(p.image, i, p.title + ' preview', p.title)}</div>
  <div class="proj-body"><h3>${esc(p.title)}</h3><p>${esc(p.description)}</p>
  <div class="chips">${p.tech.map(t => `<span class="chip">${esc(t)}</span>`).join('')}</div>
  <div class="proj-actions"><button class="btn" data-proj="${i}" data-kind="github">${svgIcon('github')} GitHub</button><button class="btn primary" data-proj="${i}" data-kind="demo">Live Demo ↗</button></div></div></article>`).join('')}</div>`;
const skillsHTML = () => `<div class="skills-grid">${C.skills.map(s => `<div class="skill"><div class="skill-top"><span>${esc(s.name)}</span><span>${+s.level}%</span></div><div class="bar" role="progressbar" aria-label="${esc(s.name)} proficiency" aria-valuenow="${+s.level}" aria-valuemin="0" aria-valuemax="100"><i style="width:${+s.level}%"></i></div></div>`).join('')}</div>`;
const quickNavHTML = () => `<nav class="quicknav" aria-label="Quick navigation">${['portfolio', 'projects', 'skills', 'gallery', 'contact'].map(a => `<button data-open="${a}">${appIcon(a)}${APPS[a].title}</button>`).join('')}</nav>`;
const contactLinksHTML = () => `<div class="contact-grid">${['email', 'instagram', 'github', 'linkedin'].map(k => `<button data-link="${k}">${appIcon(k)}<span>${LINK_LABELS[k]}</span></button>`).join('')}</div>`;

function buildFinder(el) {
  el.innerHTML = `<div class="win-pad"><h2>Applications</h2><p class="sub">Everything on this desktop — click to open.</p><div class="finder-grid">${Object.keys(APPS).map(id => `<button data-open="${id}">${appIcon(id, 'md')}<span>${APPS[id].title}</span></button>`).join('')}${['instagram', 'github', 'linkedin'].map(k => `<button data-link="${k}">${appIcon(k, 'md')}<span>${LINK_LABELS[k]}</span></button>`).join('')}</div></div>`;
}

function buildPortfolio(el) {
  const sections = [['home', 'Home'], ['about', 'About Me'], ['skills', 'Skills'], ['projects', 'Projects'], ['experience', 'Experience'], ['goals', 'Goals'], ['contact', 'Contact']];
  el.innerHTML = `<div class="pf">
    <nav class="pf-nav" aria-label="Portfolio sections"><span class="nav-h">SECTIONS</span>${sections.map(([id, l], i) => `<button data-section="${id}" class="${i ? '' : 'on'}">${l}</button>`).join('')}</nav>
    <div class="pf-main">
      <section class="pf-sec" id="pf-home"><div class="home-hero"><div class="home-photo">${img(C.profileImage, 2, 'Profile photo', '')}</div>
        <div><h1>${esc(C.name)}</h1><p>${esc(C.role)}</p><div class="btn-row"><button class="btn primary" data-section="projects">View Projects</button><button class="btn" data-open="contact">Get in touch</button></div></div></div>
        <p class="about-text">${esc(C.tagline)}</p>${quickNavHTML()}</section>
      <section class="pf-sec" id="pf-about"><h2>About Me</h2><p class="about-text">${esc(C.about)}</p>
        <div class="facts"><div class="fact"><small>ROLE</small><b>${esc(C.role)}</b></div><div class="fact"><small>LOCATION</small><b>${esc(C.location)}</b></div><div class="fact"><small>CODING</small><b>${esc(C.stats.codingHours)}</b></div></div></section>
      <section class="pf-sec" id="pf-skills"><h2>Skills</h2>${skillsHTML()}</section>
      <section class="pf-sec" id="pf-projects"><h2>Projects</h2>${projectsHTML()}</section>
      <section class="pf-sec" id="pf-experience"><h2>Experience</h2><div class="timeline">${C.experience.map(x => `<div class="tl-item"><small>${esc(x.when)}</small><h3>${esc(x.title)}</h3><p>${esc(x.desc)}</p></div>`).join('')}</div></section>
      <section class="pf-sec" id="pf-goals"><h2>Goals</h2><ul class="goals">${C.goals.map(g => `<li>${esc(g)}</li>`).join('')}</ul></section>
      <section class="pf-sec" id="pf-contact"><h2>Contact</h2>${contactLinksHTML()}<button class="btn primary" data-open="contact">Open Contact app</button>${quickNavHTML()}</section>
    </div></div>`;
  const main = $('.pf-main', el), btns = $$('.pf-nav button', el);
  const go = id => { const s = $('#pf-' + id, el); if (s) main.scrollTo({ top: s.offsetTop - 14, behavior: settings.reduce ? 'auto' : 'smooth' }); };
  el.addEventListener('click', e => { const b = e.target.closest('[data-section]'); if (b) go(b.dataset.section); });
  main.addEventListener('scroll', () => {
    let cur = sections[0][0];
    sections.forEach(([id]) => { const s = $('#pf-' + id, el); if (s && s.offsetTop - 40 <= main.scrollTop) cur = id; });
    btns.forEach(b => b.classList.toggle('on', b.dataset.section === cur));
  }, { passive: true });
}
function buildProjects(el) { el.innerHTML = `<div class="win-pad"><h2>Projects</h2><p class="sub">Things I've built. Use the buttons to open the code or the live demo.</p>${projectsHTML()}</div>`; }
function buildSkills(el) { el.innerHTML = `<div class="win-pad"><h2>Skills</h2><p class="sub">Languages and tools I work with.</p>${skillsHTML()}</div>`; }
function buildGallery(el) {
  el.innerHTML = `<div class="win-pad"><h2>Gallery</h2><p class="sub">Click an image to view it full screen.</p><div class="gal-grid">${C.gallery.map((g, i) => `<button class="gal-card" data-lightbox="${i}" aria-label="View ${esc(g.title)}">${img(g.src, i, g.title, g.title)}<span>${esc(g.title)}</span></button>`).join('')}</div></div>`;
}
function buildContact(el) {
  el.innerHTML = `<div class="win-pad"><h2>Contact</h2><p class="sub">Say hi — links open in a new tab.</p>${contactLinksHTML()}
    <form id="contactForm"><div class="field"><label for="cfName">Your name</label><input id="cfName" required autocomplete="name" placeholder="Peter"></div>
    <div class="field"><label for="cfEmail">Your email</label><input id="cfEmail" type="email" required autocomplete="email" placeholder="you@example.com"></div>
    <div class="field"><label for="cfMsg">Message</label><textarea id="cfMsg" required placeholder="Write your message…"></textarea></div>
    <button class="btn primary" type="submit">Send message</button></form></div>`;
  $('#contactForm', el).addEventListener('submit', async e => {
    e.preventDefault();
    const name = $('#cfName', el).value.trim(), mail = $('#cfEmail', el).value.trim(), msg = $('#cfMsg', el).value.trim();
    if (!isPlaceholder(C.formEndpoint)) {
      try {
        const r = await fetch(C.formEndpoint, { method: 'POST', headers: { 'Content-Type': 'application/json', Accept: 'application/json' }, body: JSON.stringify({ name, email: mail, message: msg }) });
        if (!r.ok) throw new Error();
        e.target.reset(); toast('Message sent — thank you!');
      } catch { toast('Could not send the message. Please try again.'); }
      return;
    }
    const to = resolveLink('email');
    if (!to) { toast('Add your email in script.js → PORTFOLIO_CONFIG.email to enable the form'); return; }
    window.location.href = `${to}?subject=${encodeURIComponent('Portfolio message from ' + name)}&body=${encodeURIComponent(msg + '\n\n— ' + name + ' (' + mail + ')')}`;
  });
}
function buildYouTube(el) {
  el.innerHTML = `<div class="win-pad yt-app"><div class="yt-hero">${appIcon('youtube')}<div><h2>YouTube</h2><p class="sub" style="margin:0">Paste a video, playlist or channel link to open it on YouTube.</p></div></div>
    <div><form class="yt-form" id="ytForm2" novalidate><input type="text" inputmode="url" autocomplete="off" placeholder="https://www.youtube.com/watch?v=…" aria-label="YouTube URL"><button class="btn primary" type="submit">Open YouTube</button></form><p class="yt-err" role="alert" aria-live="polite"></p></div>
    <div class="btn-row"><button class="btn" data-link="youtube">${svgIcon('youtube')} My channel</button><a class="btn" href="https://www.youtube.com" target="_blank" rel="noopener noreferrer">youtube.com ↗</a></div>
    <div><h2 style="font-size:15px;margin-bottom:8px">Recently opened</h2><ul class="recent" id="ytRecents"></ul></div>
    <p class="note">Links open in a new tab — videos are not played inside this page.</p></div>`;
  bindYouTube($('#ytForm2', el)); refreshRecents();
}
function buildSettings(el) {
  el.innerHTML = `<div class="win-pad"><h2>Settings</h2><p class="sub">Saved automatically on this device.</p>
    <div class="set-group"><div class="set-row"><span>Appearance</span><span class="seg-wrap"><button class="seg" data-set="theme" data-val="dark">Dark</button><button class="seg" data-set="theme" data-val="light">Light</button></span></div>
    <div class="set-row" style="display:block"><span>Wallpaper</span><div class="walls">${WALLS.map(([v, l]) => `<button class="wall" style="background-image:url('${v}.jpg')" data-set="wallpaper" data-val="${v}" aria-label="${l}">${l}</button>`).join('')}</div></div></div>
    <div class="set-group"><div class="set-row"><span>Accent colour</span><span class="swatches">${ACCENTS.map(([c, n]) => `<button class="swatch" style="background:${c}" data-set="accent" data-val="${c}" aria-label="${n}"></button>`).join('')}</span></div></div>
    <div class="set-group"><div class="set-row"><label for="set24">24-hour clock</label><span class="switch"><input type="checkbox" id="set24" data-bool="clock24" role="switch"><span></span></span></div>
    <div class="set-row"><label for="setRM">Reduce animations</label><span class="switch"><input type="checkbox" id="setRM" data-bool="reduce" role="switch"><span></span></span></div>
    <div class="set-row"><span>Temperature unit</span><span class="seg-wrap"><button class="seg" data-set="unit" data-val="C">°C</button><button class="seg" data-set="unit" data-val="F">°F</button></span></div></div></div>`;
  el.addEventListener('click', e => { const b = e.target.closest('[data-set]'); if (b) setSetting(b.dataset.set, b.dataset.val); });
  el.addEventListener('change', e => { const i = e.target.closest('[data-bool]'); if (i) setSetting(i.dataset.bool, i.checked); });
  syncSettingsUI();
}
function syncSettingsUI() {
  const body = wins.get('settings') && $('.win-body', wins.get('settings').el);
  if (!body) return;
  $$('[data-set]', body).forEach(b => { const on = String(settings[b.dataset.set]) === b.dataset.val; b.classList.toggle('on', on); b.setAttribute('aria-pressed', String(on)); });
  $$('[data-bool]', body).forEach(i => { i.checked = !!settings[i.dataset.bool]; });
}
function buildTrash(el) {
  el.innerHTML = `<div class="win-pad"><h2>Trash</h2><p class="sub">Your saved preferences, visit counter, weather location and YouTube history live in this browser. Emptying the Trash resets all of it.</p>
    <button class="btn primary" id="emptyTrash">Empty Trash &amp; reset</button></div>`;
  $('#emptyTrash', el).addEventListener('click', () => {
    if (confirm('Reset all saved settings, visits, location and history on this device?')) { store.clear(); try { sessionStorage.clear(); } catch { /* ignore */ } location.reload(); }
  });
}
const ZONES = [['Local', undefined], ['UTC', 'UTC'], ['New York', 'America/New_York'], ['London', 'Europe/London'], ['Tokyo', 'Asia/Tokyo']];
function buildClock(el) {
  let ticks = '';
  for (let i = 0; i < 60; i++) { const a = i * 6 * Math.PI / 180, big = i % 5 === 0, r1 = big ? 84 : 89; ticks += `<line x1="${(100 + Math.sin(a) * r1).toFixed(1)}" y1="${(100 - Math.cos(a) * r1).toFixed(1)}" x2="${(100 + Math.sin(a) * 94).toFixed(1)}" y2="${(100 - Math.cos(a) * 94).toFixed(1)}" stroke-width="${big ? 2 : 1}" opacity="${big ? 1 : .45}"/>`; }
  el.innerHTML = `<div class="win-pad"><div class="clk">
    <svg class="analog" viewBox="0 0 200 200" role="img" aria-label="Analog clock"><circle cx="100" cy="100" r="98" fill="rgba(128,128,128,.12)" stroke="currentColor" stroke-opacity=".25"/><g stroke="currentColor">${ticks}</g>
      <line id="hH" x1="100" y1="100" x2="100" y2="58" stroke="currentColor" stroke-width="5" stroke-linecap="round"/><line id="hM" x1="100" y1="100" x2="100" y2="38" stroke="currentColor" stroke-width="3.5" stroke-linecap="round"/><line id="hS" x1="100" y1="112" x2="100" y2="30" stroke="var(--accent)" stroke-width="1.8" stroke-linecap="round"/><circle cx="100" cy="100" r="4.5" fill="var(--accent)"/></svg>
    <div><div class="clk-time" id="ckTime"></div><div class="clk-date" id="ckDate"></div></div>
    <div class="clk-zones">${ZONES.map(([n], i) => `<div class="zone"><small>${n === 'Local' ? 'Local · ' + esc(Intl.DateTimeFormat().resolvedOptions().timeZone) : n}</small><b id="zn${i}"></b></div>`).join('')}</div>
    <label class="set-row" style="gap:12px">24-hour clock <span class="switch"><input type="checkbox" id="ck24" role="switch" ${settings.clock24 ? 'checked' : ''}><span></span></span></label></div></div>`;
  $('#ck24', el).addEventListener('change', e => setSetting('clock24', e.target.checked));
  tickClockWindow(new Date());
}
function tickClockWindow(now) {
  const w = wins.get('clock'); if (!w) return;
  const el = w.el, t = $('#ckTime', el); if (!t) return;
  const p = timeParts(now);
  t.textContent = `${p.h}:${p.m}:${p.s}${p.ap ? ' ' + p.ap : ''}`;
  $('#ckDate', el).textContent = now.toLocaleDateString([], { weekday: 'long', year: 'numeric', month: 'long', day: 'numeric' });
  const s = now.getSeconds(), m = now.getMinutes() + s / 60, h = (now.getHours() % 12) + m / 60;
  $('#hS', el).setAttribute('transform', `rotate(${s * 6} 100 100)`);
  $('#hM', el).setAttribute('transform', `rotate(${m * 6} 100 100)`);
  $('#hH', el).setAttribute('transform', `rotate(${h * 30} 100 100)`);
  ZONES.forEach(([, tz], i) => { const q = timeParts(now, tz); const z = $('#zn' + i, el); if (z) z.textContent = `${q.h}:${q.m} ${q.ap}`.trim(); });
  const c = $('#ck24', el); if (c) c.checked = settings.clock24;
}

/* =========================================================================
   Dock, app grid, desktop widgets
   ========================================================================= */
const DOCK = [
  { app: 'finder', label: 'Finder', mh: 1 }, { app: 'portfolio', label: 'Portfolio' }, { app: 'projects', label: 'Projects' }, { app: 'skills', label: 'Skills', mh: 1 },
  { app: 'youtube', label: 'YouTube', mh: 1 }, { app: 'gallery', label: 'Gallery', mh: 1 }, { app: 'contact', label: 'Contact' }, { app: 'settings', label: 'Settings', mh: 1 },
  { sep: 1 },
  { link: 'instagram', label: 'Instagram' }, { link: 'github', label: 'GitHub' }, { link: 'linkedin', label: 'LinkedIn' },
  { sep: 1 },
  { app: 'trash', label: 'Trash', mh: 1 }
];
function buildDock() {
  $('#dockInner').innerHTML = DOCK.map(d => {
    if (d.sep) return '<span class="dock-sep" role="separator"></span>';
    const name = d.app || d.link;
    const attr = d.app ? `data-open="${d.app}" data-app="${d.app}"` : `data-link="${d.link}"`;
    return `<button class="dock-item${d.mh ? ' m-hide' : ''}" ${attr} data-label="${d.label}" aria-label="${d.app ? 'Open ' + d.label : d.label + ' (opens in a new tab)'}">${appIcon(name)}</button>`;
  }).join('');
  const dock = $('#dock'), items = () => $$('.dock-item', dock);
  let raf;
  const reset = () => items().forEach(i => i.style.setProperty('--s', 1));
  dock.addEventListener('pointermove', e => {
    if (e.pointerType === 'touch' || isMobile() || settings.reduce) return;
    cancelAnimationFrame(raf);
    raf = requestAnimationFrame(() => items().forEach(it => {
      const r = it.getBoundingClientRect(), d = Math.abs(e.clientX - (r.left + r.width / 2));
      it.style.setProperty('--s', (d < 120 ? 1 + 0.6 * Math.pow(Math.cos(d / 120 * Math.PI / 2), 2) : 1).toFixed(3));
    }));
  });
  dock.addEventListener('pointerleave', () => { cancelAnimationFrame(raf); reset(); });
}
function buildAppGrid() {
  const all = [...Object.keys(APPS).map(id => `<button data-open="${id}" aria-label="Open ${APPS[id].title}">${appIcon(id)}<span>${APPS[id].title}</span></button>`),
    ...['instagram', 'github', 'linkedin'].map(k => `<button data-link="${k}" aria-label="${LINK_LABELS[k]}">${appIcon(k)}<span>${LINK_LABELS[k]}</span></button>`)];
  $('#appGrid').innerHTML = all.join('');
}
function buildWidgets() {
  document.title = `${isPlaceholder(C.name) ? 'Portfolio' : C.name} — Portfolio OS`;
  $('#tagline').textContent = C.tagline;
  $('#ntName').textContent = C.name;
  const pi = $('#profileImg'); pi.src = C.profileImage; pi.dataset.seed = 2; pi.dataset.label = '';
  $('#ytIcon').innerHTML = appIcon('youtube');
  $('#stProjects').textContent = C.projects.length;
  $('#stCoding').textContent = C.stats.codingHours;
  $('#stLevel').textContent = C.stats.level;
  let v = +store.get('pf_visits', 0) || C.stats.visitsStart;
  try { if (!sessionStorage.getItem('pf_counted')) { v++; store.set('pf_visits', v); sessionStorage.setItem('pf_counted', '1'); } } catch { /* ignore */ }
  $('#stVisits').textContent = v.toLocaleString();
  renderQuote();
  const galleryStrip = $('#galleryStrip');
  if (galleryStrip) galleryStrip.hidden = true;
  $('#clockWidget').addEventListener('click', () => openApp('clock'));
  $('#ytWidget').addEventListener('click', e => { if (!e.target.closest('input,button,form,a')) openApp('youtube'); });
  $('#ytIcon').addEventListener('click', () => openApp('youtube'));
  bindYouTube($('#ytForm'));
  $('#quoteEdit').addEventListener('click', editQuote);
}
const renderQuote = () => { $('#quoteText').textContent = '“' + store.get('pf_quote', C.quote) + '”'; };
function editQuote() {
  const cur = store.get('pf_quote', C.quote);
  const v = prompt('Edit your quote (use a new line for line breaks):', cur);
  if (v !== null && v.trim()) { store.set('pf_quote', v.trim()); renderQuote(); toast('Quote updated'); }
}

/* ---- Hero ---- */
function buildHero() {
  const hero = $('#hero');
  if (C.wallpaperImage) {
    const probe = new Image();
    probe.onload = () => { hero.innerHTML = `<span class="hero-layer hero-glow"></span><img class="hero-layer hero-img" src="${esc(C.wallpaperImage)}" alt="" decoding="async">`; };
    probe.src = C.wallpaperImage;
  }
  let raf;
  window.addEventListener('pointermove', e => {
    if (isMobile() || settings.reduce || e.pointerType === 'touch') return;
    cancelAnimationFrame(raf);
    raf = requestAnimationFrame(() => {
      hero.style.setProperty('--px', ((e.clientX / innerWidth - .5) * 2).toFixed(3));
      hero.style.setProperty('--py', ((e.clientY / innerHeight - .5) * 2).toFixed(3));
    });
  }, { passive: true });
  hero.addEventListener('click', () => openApp('portfolio'));
}

/* =========================================================================
   Menu bar menus + Control Center
   ========================================================================= */
const goItems = () => Object.keys(APPS).map(id => ({ label: APPS[id].title, run: () => openApp(id) }));
const MENUS = {
  apple: () => [{ label: 'About This Portfolio', run: () => openApp('portfolio') }, { label: 'System Settings…', run: () => openApp('settings') }, { sep: 1 }, { label: 'Contact Me', run: () => openApp('contact') }],
  finder: () => [{ label: 'Open Finder', run: () => openApp('finder') }, { sep: 1 }, { label: 'Empty Trash…', run: () => openApp('trash') }],
  file: () => [{ label: 'New Finder Window', run: () => openApp('finder') }, { label: 'Close Window', run: closeFront }],
  edit: () => [{ label: 'Edit Quote…', run: editQuote }, { label: 'Reset Quote', run: () => { try { localStorage.removeItem('pf_quote'); } catch { /* ignore */ } renderQuote(); toast('Quote reset'); } },
    { sep: 1 }, { label: 'Change Weather City…', run: () => { WX.formOpen = true; WX.focusForm = true; renderWeather(); } }],
  view: () => [{ label: settings.theme === 'dark' ? 'Switch to Light Mode' : 'Switch to Dark Mode', run: toggleTheme },
    { label: settings.clock24 ? 'Use 12-hour Clock' : 'Use 24-hour Clock', run: () => setSetting('clock24', !settings.clock24) },
    { label: settings.reduce ? 'Turn Animations On' : 'Reduce Animations', run: () => setSetting('reduce', !settings.reduce) },
    { sep: 1 }, { label: document.fullscreenElement ? 'Exit Full Screen' : 'Enter Full Screen', run: toggleFullscreen }],
  go: goItems,
  window: () => [{ label: 'Minimize', run: minFront }, { label: 'Zoom', run: zoomFront }, { label: 'Close', run: closeFront }, { sep: 1 }, { label: 'Close All Windows', run: closeAll }],
  help: () => [{ label: 'Search…', kbd: 'Ctrl/⌘ K', run: openSpotlight }, { label: 'Keyboard Shortcuts', run: () => toast('Ctrl/⌘+K opens Spotlight · Esc closes overlays · ←/→ browse the gallery') }, { sep: 1 }, { label: 'Contact', run: () => openApp('contact') }]
};
function toggleFullscreen() {
  if (document.fullscreenElement) document.exitFullscreen?.();
  else document.documentElement.requestFullscreen?.().catch(() => toast('Full screen is not available here'));
}
const dd = $('#menuDropdown');
function closeMenus() {
  dd.hidden = true;
  $$('[data-menu]').forEach(b => b.setAttribute('aria-expanded', 'false'));
  const cc = $('#controlCenter'); if (!cc.hidden) { cc.hidden = true; $('#ccBtn').setAttribute('aria-expanded', 'false'); }
}
function openMenu(btn) {
  const was = btn.getAttribute('aria-expanded') === 'true';
  closeMenus(); if (was) return;
  const items = MENUS[btn.dataset.menu]();
  dd.innerHTML = items.map((it, i) => it.sep ? '<hr>' : `<button role="menuitem" data-mi="${i}">${esc(it.label)}${it.kbd ? `<span class="kbd">${esc(it.kbd)}</span>` : ''}</button>`).join('');
  dd.style.left = Math.min(btn.getBoundingClientRect().left, innerWidth - 240) + 'px';
  dd.hidden = false; btn.setAttribute('aria-expanded', 'true');
  dd._items = items;
  const first = $('button', dd); if (first) first.focus({ preventScroll: true });
}
dd.addEventListener('click', e => { const b = e.target.closest('[data-mi]'); if (!b) return; const it = dd._items[+b.dataset.mi]; closeMenus(); it.run(); });
dd.addEventListener('keydown', e => {
  const bs = $$('button', dd), i = bs.indexOf(document.activeElement);
  if (e.key === 'ArrowDown') { e.preventDefault(); bs[(i + 1) % bs.length].focus(); }
  if (e.key === 'ArrowUp') { e.preventDefault(); bs[(i - 1 + bs.length) % bs.length].focus(); }
});
$$('[data-menu]').forEach(b => b.addEventListener('click', e => { e.stopPropagation(); openMenu(b); }));

const cc = $('#controlCenter');
function syncCC() {
  if (cc.hidden && !cc._built) return;
  const online = navigator.onLine;
  cc.innerHTML = `
    <button class="cc-tile cc-wide ${online ? 'on' : ''}" data-cc="none" aria-live="polite"><span class="cc-dot">${svgIcon('wifi')}</span><span>Network<small>${online ? 'Online' : 'Offline'}</small></span></button>
    <button class="cc-tile ${settings.theme === 'dark' ? 'on' : ''}" data-cc="theme"><span class="cc-dot">${svgIcon('moon')}</span><span>Dark Mode<small>${settings.theme === 'dark' ? 'On' : 'Off'}</small></span></button>
    <button class="cc-tile ${settings.clock24 ? 'on' : ''}" data-cc="clock24"><span class="cc-dot">${svgIcon('clock')}</span><span>24-hour<small>${settings.clock24 ? 'On' : 'Off'}</small></span></button>
    <button class="cc-tile ${settings.reduce ? 'on' : ''}" data-cc="reduce"><span class="cc-dot">${svgIcon('motion')}</span><span>Reduce Motion<small>${settings.reduce ? 'On' : 'Off'}</small></span></button>
    <button class="cc-tile ${document.fullscreenElement ? 'on' : ''}" data-cc="full"><span class="cc-dot">${svgIcon('expand')}</span><span>Full Screen<small>${document.fullscreenElement ? 'On' : 'Off'}</small></span></button>
    <button class="cc-tile cc-wide" data-cc="search"><span class="cc-dot">${svgIcon('search')}</span><span>Spotlight Search<small>Ctrl/⌘ K</small></span></button>`;
  cc._built = true;
}
$('#ccBtn').addEventListener('click', e => {
  e.stopPropagation();
  const open = cc.hidden; closeMenus();
  if (open) { syncCC(); cc.hidden = false; $('#ccBtn').setAttribute('aria-expanded', 'true'); }
});
cc.addEventListener('click', e => {
  e.stopPropagation();
  const t = e.target.closest('[data-cc]'); if (!t) return;
  const a = t.dataset.cc;
  if (a === 'theme') toggleTheme(); else if (a === 'clock24') setSetting('clock24', !settings.clock24);
  else if (a === 'reduce') setSetting('reduce', !settings.reduce); else if (a === 'full') { toggleFullscreen(); setTimeout(syncCC, 250); }
  else if (a === 'search') { closeMenus(); openSpotlight(); }
});
document.addEventListener('fullscreenchange', syncCC);
document.addEventListener('click', e => { if (!e.target.closest('.dropdown,.cc,[data-menu],#ccBtn')) closeMenus(); });

/* ---- Wi-Fi / battery ---- */
function netStatus() { const on = navigator.onLine, w = $('#wifi'); w.classList.toggle('offline', !on); w.setAttribute('aria-label', on ? 'Network online' : 'Network offline'); w.title = on ? 'Online' : 'Offline'; syncCC(); }
window.addEventListener('online', netStatus); window.addEventListener('offline', netStatus);
if (navigator.getBattery) {
  navigator.getBattery().then(b => {
    const up = () => { const p = $('#batPct'); p.hidden = false; p.textContent = Math.round(b.level * 100) + '%'; $('#batFill').setAttribute('width', (13 * b.level).toFixed(1)); $('#battery').title = b.charging ? 'Charging' : 'Battery'; };
    up(); b.addEventListener('levelchange', up); b.addEventListener('chargingchange', up);
  }).catch(() => { /* battery API blocked */ });
}

/* =========================================================================
   Spotlight search
   ========================================================================= */
const sp = $('#spotlight'), spIn = $('#spInput'), spRes = $('#spResults');
let spItems = [], spSel = 0, spPrev = null;
function spotlightIndex() {
  const out = [];
  Object.keys(APPS).forEach(id => out.push({ title: APPS[id].title, sub: 'Application', icon: id, kw: APP_KEYWORDS[id] || '', run: () => openApp(id) }));
  C.projects.forEach(p => out.push({ title: p.title, sub: 'Project', icon: 'projects', kw: p.tech.join(' ') + ' ' + p.description, run: () => openApp('projects') }));
  C.skills.forEach(s => out.push({ title: s.name, sub: 'Skill', icon: 'skills', kw: 'skill language', run: () => openApp('skills') }));
  C.gallery.forEach((g, i) => out.push({ title: g.title, sub: 'Gallery image', icon: 'gallery', kw: 'photo picture', run: () => openLightbox(i) }));
  ['email', 'instagram', 'github', 'linkedin'].forEach(k => out.push({ title: LINK_LABELS[k], sub: 'Opens in a new tab', icon: k, kw: 'contact social link', run: () => openLink(k) }));
  out.push({ title: settings.theme === 'dark' ? 'Switch to Light Mode' : 'Switch to Dark Mode', sub: 'Setting', icon: 'settings', kw: 'theme appearance', run: toggleTheme });
  out.push({ title: 'Change weather city', sub: 'Weather', icon: 'pin', kw: 'location weather city', run: () => { WX.formOpen = true; WX.focusForm = true; renderWeather(); } });
  return out;
}
function renderSpotlight() {
  const q = spIn.value.trim().toLowerCase();
  const all = spotlightIndex();
  spItems = (q ? all.filter(i => (i.title + ' ' + i.sub + ' ' + i.kw).toLowerCase().includes(q)) : all.filter(i => i.sub === 'Application')).slice(0, 9);
  spSel = 0;
  spRes.innerHTML = spItems.length ? spItems.map((it, i) => `<li role="option" aria-selected="${i === 0}"><button data-sp="${i}" class="${i === 0 ? 'sel' : ''}">${appIcon(it.icon)}<span>${esc(it.title)}<small>${esc(it.sub)}</small></span></button></li>`).join('') : `<li class="sp-empty">No results for “${esc(spIn.value)}”</li>`;
}
function openSpotlight() { closeMenus(); spPrev = document.activeElement; sp.hidden = false; spIn.value = ''; renderSpotlight(); spIn.focus(); }
function closeSpotlight() { if (sp.hidden) return; sp.hidden = true; if (spPrev && spPrev.focus) spPrev.focus(); }
function spMove(d) {
  if (!spItems.length) return;
  spSel = (spSel + d + spItems.length) % spItems.length;
  $$('#spResults button').forEach((b, i) => { b.classList.toggle('sel', i === spSel); b.parentElement.setAttribute('aria-selected', String(i === spSel)); if (i === spSel) b.scrollIntoView({ block: 'nearest' }); });
}
function spRun(i) { const it = spItems[i]; if (!it) return; closeSpotlight(); it.run(); }
spIn.addEventListener('input', renderSpotlight);
spIn.addEventListener('keydown', e => {
  if (e.key === 'ArrowDown') { e.preventDefault(); spMove(1); }
  else if (e.key === 'ArrowUp') { e.preventDefault(); spMove(-1); }
  else if (e.key === 'Enter') { e.preventDefault(); spRun(spSel); }
});
spRes.addEventListener('click', e => { const b = e.target.closest('[data-sp]'); if (b) spRun(+b.dataset.sp); });
sp.addEventListener('click', e => { if (e.target.closest('[data-close="spotlight"]')) closeSpotlight(); });
$('#searchBtn').addEventListener('click', openSpotlight);

/* =========================================================================
   Lightbox
   ========================================================================= */
const lb = $('#lightbox'), lbImg = $('#lbImg');
let lbIdx = 0, lbPrev = null;
function showLb() {
  const g = C.gallery[lbIdx];
  lbImg.classList.remove('zoomed'); delete lbImg.dataset.fb;
  lbImg.dataset.seed = lbIdx; lbImg.dataset.label = g.title;
  lbImg.src = g.src; lbImg.alt = g.title; $('#lbCap').textContent = `${g.title} · ${lbIdx + 1}/${C.gallery.length}`;
}
function openLightbox(i) { if (!C.gallery.length) return; lbPrev = document.activeElement; lbIdx = ((i % C.gallery.length) + C.gallery.length) % C.gallery.length; showLb(); lb.hidden = false; $('#lbClose').focus(); }
function closeLightbox() { if (lb.hidden) return; lb.hidden = true; lbImg.removeAttribute('src'); if (lbPrev && lbPrev.focus) lbPrev.focus(); }
const lbStep = d => { lbIdx = (lbIdx + d + C.gallery.length) % C.gallery.length; showLb(); };
$('#lbClose').addEventListener('click', closeLightbox);
$('#lbPrev').addEventListener('click', () => lbStep(-1));
$('#lbNext').addEventListener('click', () => lbStep(1));
lbImg.addEventListener('click', () => lbImg.classList.toggle('zoomed'));
lb.addEventListener('click', e => { if (e.target === lb) closeLightbox(); });

/* =========================================================================
   Global event delegation + keyboard
   ========================================================================= */
document.addEventListener('click', e => {
  const t = e.target;
  const o = t.closest('[data-open]'); if (o) { openApp(o.dataset.open); return; }
  const l = t.closest('[data-link]'); if (l) { openLink(l.dataset.link); return; }
  const p = t.closest('[data-proj]');
  if (p) { const pr = C.projects[+p.dataset.proj], k = p.dataset.kind; openExternal(pr[k], `${pr.title} ${k === 'github' ? 'GitHub' : 'Live Demo'}`, `PORTFOLIO_CONFIG.projects[${p.dataset.proj}].${k}`); return; }
  const g = t.closest('[data-lightbox]'); if (g) { openLightbox(+g.dataset.lightbox); return; }
  const y = t.closest('[data-yturl]'); if (y) { window.open(y.dataset.yturl, '_blank', 'noopener,noreferrer'); }
});
document.addEventListener('keydown', e => {
  if ((e.ctrlKey || e.metaKey) && e.key.toLowerCase() === 'k') { e.preventDefault(); sp.hidden ? openSpotlight() : closeSpotlight(); return; }
  if (e.key === 'Escape') {
    if (!sp.hidden) closeSpotlight(); else if (!lb.hidden) closeLightbox(); else closeMenus();
    return;
  }
  if (!lb.hidden) { if (e.key === 'ArrowLeft') lbStep(-1); if (e.key === 'ArrowRight') lbStep(1); }
});
window.addEventListener('resize', () => { wins.forEach(w => { if (!isMobile() && !w.maximized) { const r = w.el.getBoundingClientRect(); if (r.right < 80) w.el.style.left = '20px'; if (r.top > innerHeight - 60) w.el.style.top = '44px'; } }); });

/* =========================================================================
   Boot
   ========================================================================= */
buildHero();
buildDock();
buildAppGrid();
buildWidgets();
initDockState();
function initDockState() { netStatus(); updateDock(); }
$('#wallpaperSound').addEventListener('click', () => {
  const video = $('#wallpaperVideo');
  video.muted = !video.muted;
  settings.wallpaperSound = !video.muted;
  store.set('pf_settings', settings);
  if (!video.muted) {
    const play = video.play();
    if (play) play.catch(() => {
      video.muted = true;
      syncWallpaperSoundButton();
      toast('Wallpaper sound could not be enabled. Please try again.');
    });
  }
  syncWallpaperSoundButton();
});
applySettings();
tick();
initWeather();
