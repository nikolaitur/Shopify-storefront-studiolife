import { GiPartyFlags } from 'react-icons/gi'
// eslint-disable-next-line import/no-anonymous-default-export
export default {
  name: 'eventType',
  title: 'Rental Event Types',
  type: 'document',
  icon: GiPartyFlags,
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
        description: 'Only change this if you really have to. Changing the slug will break any bookmark a visitor has made.',
        options: {
          source: 'event',
          maxLength: 96,
        },
    }
  ],
}