# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## Project Overview

LGIF (Linköping Friidrott) Mångkamp score calculator for Swedish athletics. Calculates points using official IAAF/World Athletics Combined Events Scoring Tables with Swedish youth supplementary tables. Supports multiple age groups, genders, and competition types (Femkamp, Sjukamp, Tiokamp).

## Architecture

Static web app (HTML/CSS/JS) with no build step. Hosted on GitHub Pages.

```
├── index.html      # Main entry, category selectors, event container
├── styles.css      # LGIF-branded mobile-first styles (CSS variables)
├── scoring.js      # Scoring coefficients and calculation functions
├── app.js          # UI logic, event rendering, localStorage persistence
├── LGIF.jpg        # Club logo header image
└── CLAUDE.md       # This file
```

## Scoring System

Points calculated using IAAF formulas (rounded DOWN to integer):

| Type | Formula | Unit |
|------|---------|------|
| Track | `A × (B - T)^C` | T in seconds |
| Jumps | `A × (M - B)^C` | M in centimeters |
| Throws | `A × (D - B)^C` | D in meters |

### Coefficient Structure (scoring.js)

```javascript
MEN_COEFFICIENTS = { ... }    // Used when gender = 'P'
WOMEN_COEFFICIENTS = { ... }  // Used when gender = 'F'
```

Key events: `60m`, `100m`, `200m`, `400m`, `600m`, `800m`, `1000m`, `1500m`, `60mH`, `80mH`, `100mH`, `110mH`, `highJump`, `longJump`, `poleVault`, `shotPut`, `discus`, `javelin`

Swedish supplementary: `600m` (A=0.264892, B=176.6, C=1.85)

## Event Configurations (app.js)

`EVENT_CONFIGS` object maps category keys to event arrays:
- Key format: `{gender}-{age}-{mode}` (e.g., `F-14-15-indoor`)
- Gender: `F` (Flickor), `P` (Pojkar)
- Age: `12-13`, `14-15`, `16-17`, `senior`
- Mode: `indoor`, `outdoor`

### Competition Types by Category

| Category | Indoor | Outdoor |
|----------|--------|---------|
| F/P 12-13 | Femkamp (5) | Femkamp (5) |
| F/P 14-15 | Femkamp (5) | Femkamp (5) |
| F 16-17 | Femkamp (5) | Sjukamp (7) |
| P 16-17 | Sjukamp (7) | Tiokamp (10) |
| F Senior | Femkamp (5) | Sjukamp (7) |
| P Senior | Sjukamp (7) | Tiokamp (10) |

## Data Flow

1. User selects gender, age, mode → `getConfigKey()` builds key
2. `getCurrentEvents()` returns event array from `EVENT_CONFIGS`
3. `renderEvents()` creates input cards for each event
4. Input change → `calculatePoints(eventId, performance)` → updates display
5. Save → prompts for name → stores to `localStorage` key `lgif-results`

## Styling (styles.css)

CSS variables define LGIF brand colors:
```css
--lgif-red: #d64541;
--lgif-red-dark: #b83532;
--bg-dark: #2a1a1a;
--bg-card: #3d2222;
```

## Local Development

```bash
# Simple - just open in browser
open index.html

# With live reload
npx serve .
```

## Deployment

Hosted on GitHub Pages at: https://niklassvenzen.github.io/TrackAndField

Push to `master` branch triggers automatic deployment.
