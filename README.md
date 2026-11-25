# CV — Mónica Rocha (CRM edition)

Interactive CV presented as a CRM ("Mónica Rocha no seu pipeline"): React + Vite + Tailwind,
served by a Cloudflare Worker at https://monica-rocha-cv.mrocha.io

- `npm run dev`: Vite dev server (no /api)
- `npm run build && npx wrangler dev`: full local run with the Worker
- Push to `main` deploys automatically (Cloudflare Workers Builds)

The previous (classic) CV is preserved in the `cv-classico` branch.
