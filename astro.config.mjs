import { defineConfig } from 'astro/config';
import react from '@astrojs/react';
import sitemap from '@astrojs/sitemap';
import sanity from '@sanity/astro';
import tailwindcss from '@tailwindcss/vite';
import { loadEnv } from 'vite';

// Both local .env files and GitHub Actions environment variables are supported.
const env = loadEnv(process.env.NODE_ENV || 'production', process.cwd(), '');
const projectId = env.PUBLIC_SANITY_PROJECT_ID || process.env.PUBLIC_SANITY_PROJECT_ID;
const dataset = env.PUBLIC_SANITY_DATASET || process.env.PUBLIC_SANITY_DATASET || 'production';
const githubPages = process.env.DEPLOY_TARGET === 'github-pages';
const repoName = process.env.GITHUB_PAGES_REPOSITORY || 'aerova-astro-sanity';

export default defineConfig({
  site: githubPages ? 'https://iprubakhin-blip.github.io' : 'https://aerova.example',
  base: githubPages ? `/${repoName}` : '/',
  output: 'static',
  trailingSlash: 'always',
  integrations: [
    react(),
    sitemap(),
    ...(projectId
      ? [sanity({projectId, dataset, useCdn: false, studioBasePath: '/studio'})]
      : []),
  ],
  vite: {plugins: [tailwindcss()]},
});
