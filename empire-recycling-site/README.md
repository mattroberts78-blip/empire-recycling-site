# Empire Recycling of Alabama — Portal (Next.js + Tailwind)

Minimal, production-ready front-end scaffold with the approved homepage design.

## Local dev

```bash
npm i
npm run dev
```

## Build

```bash
npm run build
npm start
```

## Deploy to Vercel

1. Push this folder to a new GitHub repo (e.g., `empire-recycling-site`).
2. In Vercel, **New Project → Import Git Repository**.
3. Framework preset: **Next.js**. No extra build settings needed.
4. Environment variables: none required yet.
5. Deploy.

## Brand assets

- `/public/logo.png` – transparent full logo
- Favicons in `/public` (optional)
- Brushed metal background is implemented via CSS (no heavy image).

## Routes (placeholders)

- `/admin` – Admin portal placeholder
- `/login` – User Login placeholder
- `/register` – New User Registration placeholder
- Footer pages also stubbed

## Notes

- Tailwind is configured. Modify theme colors in `tailwind.config.js`.
- Uses Next.js App Router.