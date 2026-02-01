# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## Project Overview

F15 Pentathlon score calculator for Swedish youth athletics (friidrott). Calculates points using World Athletics Combined Events Scoring Tables for girls aged 15 competing in pentathlon (femkamp).

## Architecture

Static web app (HTML/CSS/JS) with no build step. Can be served directly from any static file host.

- `index.html` - Main entry point
- `styles.css` - Mobile-first responsive styles
- `scoring.js` - Point calculation using World Athletics formulas
- `app.js` - UI logic and localStorage persistence

## Scoring System

Points are calculated using World Athletics formulas:
- **Track events**: `Points = A × (B - Performance)^C` (lower time = more points)
- **Field events**: `Points = A × (Performance - B)^C` (greater distance = more points)

Coefficients are defined in `scoring.js` for each event.

## Event Configurations

**Indoor (Inomhus)**:
- 60m häck (hurdles, 76.2cm)
- Höjd (high jump)
- Kula 3kg (shot put)
- Längd (long jump)
- 600m

**Outdoor (Utomhus)**:
- 80m häck (hurdles)
- Höjd (high jump)
- Spjut (javelin)
- Längd (long jump)
- 600m

## Local Development

Open `index.html` in a browser. No build or dependencies required.

For live reload during development:
```bash
npx serve .
```

## Deployment

Deploy as static files to GitHub Pages, Netlify, Vercel, or any static host.
