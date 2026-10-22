/** Seed real Sanity content, after creating a Sanity project and write token. Idempotent. */
import {createClient} from '@sanity/client';
import {readFileSync} from 'node:fs';
import {resolve} from 'node:path';
if(process.loadEnvFile){try{process.loadEnvFile(resolve('.env'));}catch{ /* optional */ }}
const projectId=process.env.PUBLIC_SANITY_PROJECT_ID;
const dataset=process.env.PUBLIC_SANITY_DATASET||'production';
const token=process.env.SANITY_API_TOKEN;
if(!projectId||!token){console.error('Missing PUBLIC_SANITY_PROJECT_ID or SANITY_API_TOKEN. See README.');process.exit(1);}
const client=createClient({projectId,dataset,apiVersion:'2025-02-19',token,useCdn:false});
const home={_id:'aerova-home',_type:'homePage',eyebrow:'A NEW ERA OF ENERGY INTELLIGENCE',headline:'See energy differently.',subheadline:'Clarity for a changing grid. Make confident decisions with energy data that finally makes sense.',primaryCtaLabel:'Explore our approach',spotlightTitle:'Complex systems. Clear decisions.',spotlightCopy:'From scattered signals to one coherent picture. An intuitive workspace for the people building a more resilient energy future.',seoTitle:'AEROVA — Energy intelligence, made human',seoDescription:'AEROVA is a fictional energy intelligence platform concept built with Astro, Sanity, React and Tailwind CSS.'};
const settings={_id:'aerova-settings',_type:'siteSettings',brandName:'AEROVA',siteDescription:home.seoDescription,contactEmail:'iprubakhin@gmail.com'};
const posts=[
 ['clearer-grid','What a clearer grid could look like','Strategy','2026-09-17T10:00:00Z','Energy teams do not need another dashboard. They need the right context, at the right moment, to move from signal to action.','Today, energy teams work across fragmented sources, disconnected tools and constantly changing conditions. The challenge is turning information into action.'],
 ['designing-decisions','Designing for the decisions that matter','Research','2026-08-28T10:00:00Z','A practical look at interfaces that help operators find patterns, ask better questions and act with confidence.','Start with a specific decision: What changed? Why does it matter? Which action is appropriate? These questions keep design grounded in real work.'],
 ['thoughtful-automation','The case for thoughtful automation','Operations','2026-08-04T10:00:00Z','Why the best workflows preserve human judgment while making repetitive operational work lighter.','Automation works best when it has a clear purpose, strong guardrails, and explicit ownership. Faster processes must produce trustworthy results.'],
].map(([slug,title,category,publishedAt,excerpt,paragraph])=>({
  _id:`aerova-insight-${slug}`,_type:'insight',title,slug:{_type:'slug',current:slug},category,publishedAt,excerpt,
  body:[{_type:'block',_key:'paragraph1',style:'normal',markDefs:[],children:[{_type:'span',_key:'span1',text:paragraph,marks:[]}]}]
}));
for(const doc of [settings,home,...posts]) {await client.createIfNotExists(doc);console.log('Seeded or existing:',doc._id);}
console.log('Done. Edit content at your deployed /studio/ route. Existing documents were not overwritten.');
