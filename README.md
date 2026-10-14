# Portfolio OS — macOS-style desktop portfolio

A portfolio that looks and behaves like a customised macOS desktop (red/black web theme).
Pure HTML + CSS + vanilla JavaScript. No build step, no backend, no libraries.

```
portfolio/
├── index.html
├── style.css
├── script.js          <- all your personal info lives in PORTFOLIO_CONFIG at the top
├── README.md
└── assets/
    ├── wallpaper/     hero.png            (optional centre artwork, transparent PNG)
    ├── gallery/       profile.jpg, gallery-1.jpg … gallery-4.jpg
    ├── icons/         (spare — for your own icons)
    └── projects/      project1.png, project2.png, project3.png
```

## 1. Run it

Just double-click `index.html`, **or** (recommended, so geolocation/weather work reliably) serve it locally:

```bash
cd portfolio
python -m http.server 8000      # then open http://localhost:8000
```
(or use the VS Code "Live Server" extension). To publish: upload the folder to GitHub Pages / Netlify / Vercel.

## 2. Personalise (one place)

Open `script.js` and edit `PORTFOLIO_CONFIG` at the top:

| Field | What it does |
|---|---|
| `name`, `role`, `tagline`, `about`, `location` | Text across the desktop and Portfolio window |
| `email`, `instagram`, `github`, `linkedin`, `youtubeChannel` | Used by the **Dock icons (Instagram / GitHub / LinkedIn)**, Contact app and Spotlight |
| `projects`, `skills`, `experience`, `goals` | Portfolio / Projects / Skills windows |
| `gallery`, `profileImage`, `wallpaperImage` | Image paths (see below) |
| `quote` | Quote card (you can also edit it live with the ✎ button) |
| `stats` | Coding hours, level, starting visit count |
| `formEndpoint` | Optional Formspree-style URL for the contact form |

Any link still set to a placeholder (e.g. `YOUR INSTAGRAM URL`) shows a friendly message telling you where to set it, instead of a dead link.

## 3. Where to put images

* `assets/gallery/gallery-1.jpg … gallery-4.jpg` – gallery images (add more by extending `gallery` in the config).
* `assets/gallery/profile.jpg` – your photo (profile tile + Portfolio home).
* `assets/projects/project1.png …` – project screenshots (16:9 looks best).
* `assets/wallpaper/hero.png` – *optional*: a transparent PNG for centre artwork. No artwork is shown when this file is not configured.

Until real files exist, original generated placeholder artwork is shown. Use only images you own or have a licence for.

## 4. API keys (weather)

The weather widget works **without any key** using Open-Meteo.
To use OpenWeatherMap instead, create a free key at https://openweathermap.org/api and paste it into:

```js
weatherApiKey: "01148d7754a39e51c264ef2efa94c887"   // in PORTFOLIO_CONFIG, top of script.js
```
If the key fails, it automatically falls back to Open-Meteo. Location uses the browser's geolocation; if denied, use the 🔍 button in the widget to search any city.

## 5. Features

* Real-time menu-bar clock/date, clock widget (12/24h) → opens a full Clock app (analog + world clocks)
* Draggable, minimizable, maximizable, closable windows with focus/z-index handling
* Dock with magnification, tooltips, running indicators; **Instagram / GitHub / LinkedIn open directly from the dock**
* Spotlight search (click the magnifier or press **Ctrl/⌘ + K**)
* Settings app: dark/light, wallpaper, accent colour, 12/24h, reduce animations, °C/°F (saved in localStorage); Wallpapers 7 and 8 play `vid2.mp4` and `vid1.mp4` respectively, with a shared mute/unmute control and video loaded only while selected
* YouTube launcher with URL validation (opens in a new tab — it never fakes playback)
* Gallery with lazy-loading, lightbox (←/→/Esc, click to zoom)
* Visit counter stored in localStorage
* Mobile layout (≤700px): status bar, widgets, app grid, bottom dock, full-screen windows
* Keyboard accessible: focus rings, ARIA labels, Esc closes overlays

Reset everything from the **Trash** app (Empty Trash & reset).
# MacOs.portfolio
# MacOs.portfolio
# portfolio.SamOS
