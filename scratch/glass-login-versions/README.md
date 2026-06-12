# Glassmorphism Login UI

Three matching versions of the same responsive login design:

- `angular/` - Angular 15+ standalone component using TailwindCSS and `ngx-lottie`
- `react/` - React 18 functional component using TailwindCSS, Framer Motion, and `lottie-react`
- `html/` - Pure HTML + TailwindCSS CDN + `<lottie-player>`

All versions include:

- Light/dark mode with system preference and in-card toggle
- Glassmorphism login card
- Logo at the top of the card
- Lottie illustration on the left, hidden below `md`
- Floating particles, animated SVG waves, and button glow
- Username, password, remember me, and password visibility toggle

Logo placeholder:

```text
https://via.placeholder.com/180x60?text=LOGO
```

Suggested dependencies:

```bash
# Angular
npm install ngx-lottie lottie-web

# React
npm install framer-motion lottie-react
```

