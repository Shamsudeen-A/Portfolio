# Shamsudeen Data Analyst Portfolio

Modern portfolio website for Data Analyst roles in Dubai/UAE. Built with Next.js static export so it can run on GitHub Pages or Vercel.

## Tech Choice

Python is excellent for analytics projects, notebooks, automation, and dashboard backends, but it is not the best primary technology for GitHub Pages because GitHub Pages serves static HTML, CSS, and JavaScript. This portfolio uses Next.js because it supports static export, strong SEO metadata, reusable React components, and easy deployment to Vercel or GitHub Pages.

## Local Development

```bash
npm install
npm run dev
```

Open `http://localhost:3000`.

## Production Build

```bash
npm run build
```

The static site is generated in `out/`.

## Deploy to GitHub Pages

1. Push this repository to GitHub.
2. Go to `Settings -> Pages`.
3. Set source to `GitHub Actions`.
4. Push to `main`; the workflow in `.github/workflows/deploy.yml` publishes `out/`.

## Deploy to Vercel

1. Import the GitHub repository in Vercel.
2. Keep the framework preset as Next.js.
3. Deploy. Vercel will run the build automatically.
