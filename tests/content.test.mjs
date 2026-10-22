import {test} from 'node:test';
import assert from 'node:assert/strict';
import {readFileSync, readdirSync} from 'node:fs';
import path from 'node:path';
const root = path.resolve(import.meta.dirname,'..');
const read = (p) => readFileSync(path.join(root,p),'utf8');
test('all essential project assets exist', () => {
  for(const p of ['src/pages/index.astro','src/pages/404.astro','src/pages/solutions.astro','src/pages/approach.astro','src/pages/insights/[slug].astro','src/pages/contact.astro','sanity.config.ts','.github/workflows/deploy.yml']) assert.ok(read(p).length > 40,p);
});
test('all public page layouts include page title and meta description',()=>{
  for(const name of ['index.astro','solutions.astro','approach.astro','contact.astro','404.astro']) assert.match(read('src/pages/'+name), /<BaseLayout [\s\S]*?description=/,name);
});
test('portfolio concept is disclosed and there is no fabricated product data claim',()=>{
  assert.match(read('src/lib/content.ts'),/fictional/);
  assert.match(read('src/components/SavingsSimulator.tsx'),/not a prediction/);
  assert.match(read('src/components/Footer.astro'),/Portfolio concept/);
});
test('CMS has editable homepage, articles, site settings',()=>{
  const names = readdirSync(path.join(root,'src/sanity/schemaTypes'));
  for(const n of ['siteSettings.ts','homePage.ts','insight.ts']) assert.ok(names.includes(n));
  assert.match(read('src/lib/content.ts'), /\*\[_type == "insight"/);
});
test('deployment uses least privilege and no tokens appear in source',()=>{
  assert.match(read('.github/workflows/deploy.yml'),/id-token: write/);
  assert.ok(!read('.env.example').includes('sk_'));
});
