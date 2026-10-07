# Evan Lubarsky — Mechanical Engineering Portfolio

Static copy of https://evanlubarsky.framer.website, published from the root of `main` at https://elub765.github.io.

## Pages

- `/`: introduction, selected projects, and current focus
- `/face-tracking-phone-mount/`: Tracy 1.0 project
- `/autonomous-over-terrain-vehicle/`: engineering design course project
- `/contact/`: contact details, résumé preview, and original PDF download link

The pages are ordinary HTML with one shared stylesheet and a small JavaScript file for the galleries and navigation. No build step, JavaScript framework, or Framer runtime is required. `.nojekyll` enables direct static serving on GitHub Pages. Pages deploys from `main`, `/ (root)`.

## Editing

Edit the appropriate `index.html` for text and `assets/styles.css` for the design. Fonts are stored locally in `assets/fonts/`. Links use the root path because this is the account's GitHub Pages repository. Navigation and stylesheet URLs have a version tag to bypass stale copies of the original placeholder page.

## Adding photos and CAD views

Upload images into `assets/images/`, then edit `assets/media.json` to enter each image path, title, caption, and optional alt text. Each project starts with two photo spaces and two CAD spaces. More entries can be added without editing the pages. The gallery includes thumbnail selection, previous/next controls, and left/right keyboard navigation. Blank image paths keep the styled placeholder; failed images fall back to it. The homepage portrait uses the same JSON file. Detailed steps and an example are in `assets/images/README.md`.

## Résumé

The original linked résumé was downloaded on October 7, 2026. `assets/documents/evan-lubarsky-resume.pdf` is the downloadable document. `assets/documents/resume-preview.webp` is its one-page preview, so the contact page works on mobile and does not depend on an embedded Google Docs viewer. Replace both files together when updating the résumé. The PDF's content is unchanged from the source document.

Desktop spacing, typography, colors, and project content follow the original. Smaller screens use stacked layouts. Projects opens a dropdown on hover on desktop and on tap/keyboard on all devices. Navigation links, project names, and the name in the header turn orange on hover or keyboard focus. Project-card motion and smooth anchor scrolling respect reduced-motion preferences.
