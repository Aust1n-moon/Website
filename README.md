# Austin Moon

Personal website. Single-page React 19 + TypeScript app, built with Vite and deployed on Vercel.

## Development

```sh
npm install
npm run dev      # start the dev server
npm run build    # type-check and build to dist/
npm run lint     # run oxlint
npm run preview  # serve the production build
```

## Layout

- `src/`: the app (`App.tsx`, `App.css`, `index.css`, `main.tsx`)
- `public/`: static files: `images/`, `logos/`, resume PDFs, `stars.svg`, `favicon.png`
- `vercel.json`: rewrites extensionless paths to `index.html` for client-side routing

Vercel Analytics is enabled through `@vercel/analytics`.
