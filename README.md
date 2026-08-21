# PosNew Hub

PosNew Hub is an independent logistics productivity portal created by Ikhsan Radiansyah. It provides a single directory for operational utilities, business automation tools, pricing calculators, tracking services, converters, and independent projects. The directory also includes a customer-facing Standard Parcel tariff calculator at `tarifppb.posnew.com`, a print-ready PDF shipping label generator at `label.posnew.com`, personalized Prangko Prisma ordering at `prisma.posnew.com`, and completed-passport home delivery registration at `paspor.posnew.com`.

## Project structure

```text
.
├── index.html                 # Main workspace directory
├── about-me.html              # Creator profile
├── 404.html                   # Custom not-found page
├── assets/
│   ├── styles.css             # Shared responsive design system
│   ├── app.js                 # Search, filters, theme and UI behavior
│   └── ikhsan-radiansyah.webp # Optimized profile image
├── functions/_middleware.js   # Redirects the old Pages domain to posnew.com
├── _headers                   # Security and caching headers for Cloudflare Pages
├── site.webmanifest           # Installable web-app metadata
├── sitemap.xml
├── robots.txt
└── favicon / social preview assets
```

## Deploying to Cloudflare Pages

1. Replace the repository contents with this project while keeping the existing Git history.
2. Commit and push the changes to the branch connected to Cloudflare Pages.
3. No build command is required. Use the repository root as the output directory.

## Editing the workspace directory

Workspace cards are defined directly in `index.html`. Each card has:

- `data-category` for category filters;
- `data-search` for search keywords;
- a destination URL;
- a title, description, tags, and Lucide icon.

The site uses static HTML, CSS, and JavaScript only.

> PosNew Hub is independently developed and is not an official corporate website of PT Pos Indonesia (Persero).
