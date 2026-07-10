# 🍲 FlavorVerse

A recipe discovery app for browsing, searching, and cooking along — built as a portfolio project to practice working with real API data, client-side routing, and interaction design from scratch.

**Live site:** [flavor-verse-nine.vercel.app](https://flavor-verse-nine.vercel.app/)

---

## What it does

- **Browse by category** — scroll through cuisines (Italian, Dessert, Vegan, and more) without knowing exactly what you want yet
- **Search by name** — look up a specific dish and get full ingredients and instructions
- **Today's Pick** — a random recipe spotlight on the homepage, with a shuffle button for a fresh pick
- **Cook Mode** — a step-by-step walkthrough on the recipe page, so you're not scrolling mid-stir
- **Recipe details** — ingredients, estimated time and calories, and full instructions per dish

## Built with

- **React** — component structure and state
- **React Router** — client-side navigation
- **Tailwind CSS** — styling
- **[TheMealDB API](https://www.themealdb.com/)** — recipe data
- **Vite** — build tooling
- **Vercel** — deployment

## Design

FlavorVerse uses a "kitchen journal" visual theme — warm parchment tones, a serif display font (Fraunces) paired with a monospace accent (IBM Plex Mono), and small tactile details like a tilted photo frame and a taped-corner accent, meant to feel like flipping through a handwritten recipe notebook rather than a generic food app template.

## A note on the data

FlavorVerse is powered by the free version of **TheMealDB API**. Since the API is intended for development use and has practical rate limits, requests may occasionally take a little longer depending on server load. All recipes, categories, and recipe details are fetched live from the API.

## Running it locally

```bash
git clone https://github.com/BanditaDas/FlavorVerse.git
cd FlavorVerse
npm install
```

Then start the dev server:

```bash
npm run dev
```

## Project structure

```text
src/
├── Routes/         # Application routing
├── components/     # Reusable UI components
├── pages/          # Route-level pages
├── App.jsx         # Root application component
├── main.jsx        # React entry point
└── index.css       # Global styles

public/             # Static assets
```

---

Built by Bandita 💗

## Connect

- 🌐 Portfolio: https://portfolio-six-theta-37.vercel.app/
- 💼 LinkedIn: https://www.linkedin.com/in/banditadas-dev/
- 🐙 GitHub: https://github.com/BanditaDas
