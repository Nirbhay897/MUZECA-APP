import {defineField, defineType} from 'sanity'

export default defineType({
    name: 'playlist',
    title: 'playlist',
    type: 'document',
    icon,
    fields: [
        defineField({
            name: 'title',
            title: 'title',
            type: 'string',
          }),
    defineField({
            name: 'playlist',
            title: 'playlist',
            type: 'array',
            of: [{type: 'playlist'}],
          }),
        ]
})