import {defineField, defineType} from 'sanity';

export const siteSettings = defineType({
  name: 'siteSettings', title: 'Site Settings', type: 'document',
  fields: [
    defineField({name: 'brandName', title: 'Brand name', type: 'string', validation: r => r.required()}),
    defineField({name: 'siteDescription', title: 'Search description', type: 'text', rows: 3}),
    defineField({name: 'contactEmail', title: 'Contact email', type: 'string', validation: r => r.email()}),
  ]
});
