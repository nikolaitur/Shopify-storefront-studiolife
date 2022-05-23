// eslint-disable-next-line import/no-anonymous-default-export
export default {
  name: 'eventType',
  title: 'Event Type',
  type: 'document',
  fields: [
    {
      name: 'name',
      title: 'Event Type',
      type: 'string',
    },
    {
        name: 'heading',
        title: 'Heading',
        type: 'string'
    },
    {
        name: 'subheading',
        title: 'Subheading',
        type: 'text'
    },
    {
        name: 'image',
        title: 'Image',
        type: 'image'
    },
    {
        name: 'additional',
        title: 'Additional Considerations',
        type: 'blockContent'
    },{
        name: 'reviews',
        title: 'Reviews',
        type: 'array',
        of: [{type: 'reference', to: {type: 'review'}}],
    },
    {
        name: 'slug',
        title: 'Slug',
        type: 'slug',
        options: {
          source: 'event',
          maxLength: 96,
        },
    }
  ],
}