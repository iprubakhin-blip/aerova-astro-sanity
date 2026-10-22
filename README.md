# AEROVA — Astro + Sanity Portfolio Website

A polished, responsive marketing website for **AEROVA**, an explicitly fictional energy-intelligence brand. Built as a portfolio case study for design-to-code, high-performance frontends, structured CMS content, deployment, and QA. **This is not a real company or operational energy analytics service.** Dashboard figures and calculator outputs are illustrations.

## Stack

- **Astro** — static pages and component architecture
- **TypeScript + Tailwind CSS 4** — typed content model, responsive CSS and styling utilities
- **React 19** — interactive `SavingsSimulator` island, hydrated only when visible
- **Sanity** — configurable embedded Studio, schemas for homepage / insights / site settings, typed content queries using **GROQ**, optional seeded content
- **GitHub Actions + GitHub Pages** — automatic builds and static deployment on pushes to `main`
- **SEO / Accessibility** — descriptive titles, canonical/OG metadata, structured data, sitemap, 404, semantic HTML, keyboard navigation, skip link, reduced-motion handling

## First run

Prerequisites: Node.js **22.12+** and npm.

```sh
npm install
cp .env.example .env
npm run dev
```

Open the URL shown in the terminal. The website runs without a Sanity account using included, clearly labeled demonstration content.

### Connect a real Sanity project

1. Create a free Sanity project at https://www.sanity.io/manage and a dataset named `production` (set it to publicly readable if you plan to use tokenless static content queries).
2. Put the **real** project ID in `.env`:

   ```env
   PUBLIC_SANITY_PROJECT_ID=your_project_id
   PUBLIC_SANITY_DATASET=production
   ```

3. Restart the development server; `/studio/` will now contain the Sanity Studio. Log in with your Sanity account. Add `http://localhost:4321` to the project's CORS origins with credentials when prompted.
4. Optionally create a **write** API token in Sanity's dashboard (do not commit it). With `SANITY_API_TOKEN` in local `.env`, run:

   ```sh
   node scripts/seed-sanity.mjs
   ```

5. Edit the homepage and insights in Studio, publish changes, then run `npm run build`. Public pages are **statically generated** and reflect published CMS changes after the next build/redeploy.

The deployed Sanity Studio lives at `/aerova-astro-sanity/studio/` on GitHub Pages after configuration. If you publish on GitHub Pages, allow `https://iprubakhin-blip.github.io` in the Sanity project's CORS origins **with credentials** to log in to Studio. Never put an API write token into `PUBLIC_` environment variables or the repository.

Without `PUBLIC_SANITY_PROJECT_ID`, the site displays the demo content and Studio is not mounted. This is intentional so the repository works before CMS provisioning; do not present the demo fallback as a connected Sanity backend.

## Deployment to GitHub Pages

1. Create a **new public empty GitHub repository named `aerova-astro-sanity`** under `iprubakhin-blip`. Do not initialize it with README/gitignore, as the project already contains these.
2. From the project directory:

   ```sh
   git init
   git branch -M main
   git add .
   git commit -m "Launch AEROVA Astro portfolio concept"
   git remote add origin https://github.com/iprubakhin-blip/aerova-astro-sanity.git
   git push -u origin main
   ```

3. Go to repository **Settings → Pages → Build and deployment → Source: GitHub Actions**.
4. The included `.github/workflows/deploy.yml` builds and publishes the site. Check **Actions** for the actual successful deploy status.
5. Expected URL (only after confirmed deployment): `https://iprubakhin-blip.github.io/aerova-astro-sanity/`.
6. To connect Sanity to GitHub Actions, set **Settings → Secrets and variables → Actions → Variables**:
   `PUBLIC_SANITY_PROJECT_ID` and `PUBLIC_SANITY_DATASET`. Re-run the deploy workflow; visit Studio and confirm that it loads.

**Custom repository name:** the workflow auto-derives its base path from `${{ github.event.repository.name }}`. For a different owner, change the `site` option in `astro.config.mjs` and the CORS origin instructions.

## Deployment to Vercel / Netlify (optional)

A root-domain deployment uses `base: '/'` without `DEPLOY_TARGET=github-pages`. For Vercel, import this repo as a project, set the build command to `npm run build` and output directory to `dist`. The optional `vercel.json` defines proper **301** redirects for `/old-home` and `/old-insights`. Netlify supports `public/_redirects` with the same paths. **GitHub Pages does not support HTTP 301 redirects via these files**; using Pages proves static publishing but not production-grade redirect control.

## QA checklist

```sh
npm test
npm run check
npm run build
npm run preview
```

- Test at **360px, 768px, 1440px**; check navigation and card layouts.
- Keyboard navigate all links/buttons; test skip link and mobile menu.
- Confirm React calculator changes and that it clearly says **illustrative**.
- Test Sanity create/edit/publish article, reload after rebuild and verify content.
- Test `404`, `<title>`, description, canonical, OG, sitemap and accessibility labels.
- Run Lighthouse on the real deployed URL; record **actual results** rather than claiming any unmeasured score.
- Verify `.env`, tokens and CMS write privileges are not committed.

## Editorial / content notes

`src/lib/content.ts` provides fallback example articles. Once the public dataset contains published documents, GROQ queries fetch that content at build time:

```groq
*[_type == "insight" && defined(slug.current)] | order(publishedAt desc) {
  title, "slug": slug.current, category, publishedAt, excerpt, seoDescription, body
}
```

All images/diagrams on the homepage are original CSS/SVG compositions, with no third-party image dependency. Website copy and brand are fictional for demonstration.

## Known limitations

- No live Sanity connection until you create your own Sanity project and set its ID. The public fallback remains a working static showcase.
- GitHub Pages does not offer edge redirects. Netlify/Vercel can.
- No Figma source file was provided; the website demonstrates design implementation, **not a verified Figma-to-code handoff**.
- No real-world energy data or results. Charts and calculator are illustrative.
- Dependency install, production build, and real-world Lighthouse checks must be completed in a Node environment with npm registry access.
