import {createClient} from '@sanity/client';

export interface HomeContent {
  eyebrow: string; headline: string; subheadline: string;
  primaryCtaLabel: string; spotlightTitle: string; spotlightCopy: string;
  seoTitle: string; seoDescription: string;
}
export interface Insight {
  title: string; slug: string; category: string; publishedAt: string;
  excerpt: string; seoDescription?: string; body?: Array<{_type: string; children?: Array<{_type: string; text: string}>}>;
}

export const FALLBACK_HOME: HomeContent = {
  eyebrow: 'A NEW ERA OF ENERGY INTELLIGENCE',
  headline: 'See energy differently.',
  subheadline: 'Clarity for a changing grid. Make confident decisions with energy data that finally makes sense.',
  primaryCtaLabel: 'Explore our approach',
  spotlightTitle: 'Complex systems. Clear decisions.',
  spotlightCopy: 'From scattered signals to one coherent picture. An intuitive workspace for the people building a more resilient energy future.',
  seoTitle: 'AEROVA — Energy intelligence, made human',
  seoDescription: 'AEROVA is a fictional energy intelligence platform concept built with Astro, Sanity, React and Tailwind CSS.',
};

export const FALLBACK_INSIGHTS: Insight[] = [
  {
    title: 'What a clearer grid could look like', slug: 'clearer-grid', category: 'Strategy', publishedAt: '2026-09-17',
    excerpt: 'Energy teams do not need another dashboard. They need the right context, at the right moment, to move from signal to action.',
    body: [
      {_type:'block',children:[{_type:'span',text:'Today, energy teams work across fragmented sources, disconnected tools and constantly changing conditions. The challenge is not a lack of data; it is the difficulty of turning information into action.'}]},
      {_type:'block',children:[{_type:'span',text:'Good software makes the important things obvious, reduces the noise and supports better decisions without hiding the underlying complexity.'}]},
    ],
  },
  {
    title: 'Designing for the decisions that matter', slug: 'designing-decisions', category: 'Research', publishedAt: '2026-08-28',
    excerpt: 'A practical look at interfaces that help operators find patterns, ask better questions and act with confidence.',
    body: [
      {_type:'block',children:[{_type:'span',text:'An effective operational interface starts with a specific decision. What changed? Why does it matter? Which action is appropriate? Starting with these questions keeps the interface grounded in real work.'}]},
      {_type:'block',children:[{_type:'span',text:'Clear hierarchy, accessible colors, useful defaults and contextual detail matter more than decorative complexity.'}]},
    ],
  },
  {
    title: 'The case for thoughtful automation', slug: 'thoughtful-automation', category: 'Operations', publishedAt: '2026-08-04',
    excerpt: 'Why the best workflows preserve human judgment while making repetitive operational work lighter.',
    body: [
      {_type:'block',children:[{_type:'span',text:'Automation works best when it has a clear purpose, strong guardrails and explicit ownership. Faster processes are useful only when their outputs remain trustworthy.'}]},
      {_type:'block',children:[{_type:'span',text:'Start small, measure outcomes and build confidence with transparent audit trails and graceful failure handling.'}]},
    ],
  },
];

const projectId = import.meta.env.PUBLIC_SANITY_PROJECT_ID;
const dataset = import.meta.env.PUBLIC_SANITY_DATASET || 'production';
const client = projectId ? createClient({projectId,dataset,apiVersion:'2025-02-19',useCdn:false,perspective:'published'}) : null;

export async function getHomeContent(): Promise<HomeContent> {
  if (!client) return FALLBACK_HOME;
  try {
    const data = await client.fetch<Partial<HomeContent>|null>(`*[_type == "homePage"][0]{eyebrow, headline, subheadline, primaryCtaLabel, spotlightTitle, spotlightCopy, seoTitle, seoDescription}`);
    return {...FALLBACK_HOME,...Object.fromEntries(Object.entries(data ?? {}).filter(([,v])=>v != null))};
  } catch (error) {
    console.warn('Sanity home content unavailable; using portfolio fallback:', error);
    return FALLBACK_HOME;
  }
}

export async function getInsights(): Promise<Insight[]> {
  if (!client) return FALLBACK_INSIGHTS;
  try {
    const data = await client.fetch<Array<Insight> | null>(`*[_type == "insight" && defined(slug.current)] | order(publishedAt desc) {title, "slug": slug.current, category, publishedAt, excerpt, seoDescription, body}`);
    return data && data.length ? data : FALLBACK_INSIGHTS;
  } catch (error) {
    console.warn('Sanity insights unavailable; using portfolio fallback:', error);
    return FALLBACK_INSIGHTS;
  }
}
