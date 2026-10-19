# Yanik Kumar — B.Tech ECE Developer Portfolio

A modern, premium, highly interactive developer portfolio built with **React**, **Vite**, **Tailwind CSS**, and **Framer Motion**, tailored specifically for Yanik Kumar, a B.Tech Electronics & Communication Engineering (ECE) student passionate about software engineering, AI, automation, IoT, and embedded systems.

---

## ⚡ Quick Start

Follow these steps to run the portfolio locally:

### 1. Prerequisites
Ensure you have [Node.js](https://nodejs.org/) (v18 or higher) installed on your system.

### 2. Install Dependencies
Open your terminal inside this folder (`yanik-portfolio`):
```bash
npm install
```

### 3. Launch Development Server
```bash
npm run dev
```
Open your browser at `http://localhost:3000` (or the URL shown in your terminal).

### 4. Build for Production
To create an optimized production build:
```bash
npm run build
```
Preview the production build:
```bash
npm run preview
```

---

## 📁 Project Architecture

The codebase cleanly separates **data** from **UI components**, making customization effortless:

```text
yanik-portfolio/
├── index.html                  # HTML entry point with Google Fonts (Outfit, Plus Jakarta Sans, JetBrains Mono)
├── package.json                # Project dependencies and scripts
├── postcss.config.js           # PostCSS configuration
├── tailwind.config.js          # Custom theme, glows, keyframes, and typography
├── vite.config.js              # Vite server configuration (port 3000)
├── src/
│   ├── main.jsx                # React root mount
│   ├── App.jsx                 # App layout assembling all sections
│   ├── index.css               # Global styles, glassmorphism, scrollbars, and grid patterns
│   │
│   ├── data/                   # ✏️ EDIT YOUR INFORMATION HERE
│   │   ├── personal.js         # Name, bio, dynamic headline phrases, email, socials, status
│   │   ├── stats.js            # Projects Built, Techs, Hackathons, Years of Learning
│   │   ├── techStackFloating.js# Translucent floating icons on the home page (PyCharm, C, Blender, AutoCAD, etc.)
│   │   ├── about.js            # Bento card content (Who I am, What I work on, Approach, etc.)
│   │   ├── skills.js           # Categorized skills (Programming, Hardware, Tools, Design/Media)
│   │   └── projects.js         # Detailed projects with BOM, features, stats, and links
│   │
│   └── components/             # Reusable UI Components
│       ├── Navbar.jsx          # Translucent glass navbar with scroll spy & mobile drawer
│       ├── Hero.jsx            # Dynamic headline, greeting, CTA buttons & 1-click email copy
│       ├── TechStackFloating.jsx # Modern translucent floating tech stack dock
│       ├── About.jsx           # Bento cards & live statistics
│       ├── Skills.jsx          # Categorized skills with mastery progress bars & badges
│       ├── Projects.jsx        # Project gallery with category filters & hover effects
│       ├── ProjectModal.jsx    # Deep-dive modal with hardware BOM & system architecture
│       ├── Contact.jsx         # Interactive contact form & quick connect cards
│       ├── Footer.jsx          # Minimalist footer with back-to-top & copyright
│       ├── ParticleBackground.jsx # HTML5 Canvas circuit/node constellation background
│       └── CustomCursor.jsx    # Sleek desktop cursor follower
```

---

## 🎨 How to Customize

All personal details are completely decoupled from UI code:

1. **Your Name & Social Links**: Edit `src/data/personal.js`
2. **Key Metrics & Statistics**: Edit `src/data/stats.js`
3. **Home Page Floating Tools**: Edit `src/data/techStackFloating.js`
4. **Skills**: Edit `src/data/skills.js`
5. **Projects & Hardware BOM**: Edit `src/data/projects.js`
6. **About Section**: Edit `src/data/about.js`

---

## 🌟 Key Features

- **Dark-First Modern Developer Aesthetic**: Obsidian background (`#090b10`) with subtle cyan, blue, and emerald glowing accents.
- **Interactive Particle Background**: Lightweight 60 FPS HTML5 canvas rendering circuit nodes with mouse proximity links.
- **Translucent Floating Tech Stack**: Highlighting PyCharm, C programming, Blender, AutoCAD, BandLab, Photoshop, Filmora, and Git with asynchronous bobbing animations and hover tooltips.
- **Bento Grid About Section**: Modular breakdown of engineering mindset, interests, and current learning areas.
- **Interactive Project Deep Dives**: Modal windows showcasing full hardware bill of materials (BOM), system architecture, and telemetry stats.
- **Interactive Contact Form**: Instant feedback, validation, and 1-click email copy to clipboard.
- **Responsive Layout**: Designed and tested across mobile phones, tablets, laptops, and ultra-wide desktop monitors.
