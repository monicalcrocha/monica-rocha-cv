# CV — Mónica Rocha

Interactive CV (React + Vite + Tailwind), migrated from Base44.
Hosted on Cloudflare Workers (static assets) at https://monica-rocha-cv.mrocha.io

- `npm run dev` — local dev server
- `npm run build` — build to `dist/`
- `npm run deploy` — build and deploy with Wrangler

The contact and feedback forms POST to `/api/contact` and `/api/feedback`,
handled by `worker/index.js`, which emails the owner via Cloudflare Email Routing.
