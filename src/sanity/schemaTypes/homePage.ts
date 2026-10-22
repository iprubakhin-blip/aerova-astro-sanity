import {defineField, defineType} from 'sanity';

export const homePage = defineType({
  name: 'homePage', title: 'Home Page', type: 'document',
  fields: [
    defineField({name: 'eyebrow', title: 'Hero eyebrow', type: 'string'}),
    defineField({name: 'headline', title: 'Main headline', type: 'string', validation: r => r.required()}),
    defineField({name: 'subheadline', title: 'Hero description', type: 'text', rows: 3}),
    defineField({name: 'primaryCtaLabel', title: 'Primary CTA label', type: 'string'}),
    defineField({name: 'spotlightTitle', title: 'Spotlight section title', type: 'string'}),
    defineField({name: 'spotlightCopy', title: 'Spotlight section copy', type: 'text'}),
    defineField({name: 'seoTitle', title: 'SEO title', type: 'string'}),
    defineField({name: 'seoDescription', title: 'SEO description', type: 'text'}),
  ]
});
