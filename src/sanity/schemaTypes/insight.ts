import {defineField, defineType} from 'sanity';

export const insight = defineType({
  name: 'insight', title: 'Insights', type: 'document',
  fields: [
    defineField({name: 'title', type: 'string', validation: r => r.required()}),
    defineField({name: 'slug', type: 'slug', options: {source: 'title'}, validation: r => r.required()}),
    defineField({name: 'category', type: 'string', options: {list: ['Strategy', 'Operations', 'Research']}}),
    defineField({name: 'publishedAt', type: 'datetime', validation: r => r.required()}),
    defineField({name: 'excerpt', type: 'text', rows: 3, validation: r => r.required()}),
    defineField({name: 'coverImage', type: 'image', options: {hotspot: true}, fields: [defineField({name: 'alt', type: 'string'})]}),
    defineField({name: 'body', type: 'array', of: [{type: 'block'}]}),
    defineField({name: 'seoDescription', type: 'text', rows: 2}),
  ],
  preview: {select: {title: 'title', subtitle: 'category', media: 'coverImage'}}
});
