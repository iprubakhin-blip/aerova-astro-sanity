import {defineConfig} from 'sanity';
import {structureTool} from 'sanity/structure';
import {visionTool} from '@sanity/vision';
import {schemaTypes} from './src/sanity/schemaTypes';

export default defineConfig({
  name: 'aerova', title: 'AEROVA Content Studio',
  projectId: import.meta.env.PUBLIC_SANITY_PROJECT_ID || 'replace-me',
  dataset: import.meta.env.PUBLIC_SANITY_DATASET || 'production',
  plugins: [structureTool(), visionTool()],
  schema: {types: schemaTypes}
});
