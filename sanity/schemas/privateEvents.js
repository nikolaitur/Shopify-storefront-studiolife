export default {
  name: "privateEvents",
  title: "Private Corporate Events",
  type: "document",
  groups: [
    {
      name: "content",
      default: true,
    },
    {
      name: "seo",
    },
  ],
  fields: [
    {
      name: "hero",
      type: "object",
      fields: [
        {
          name: "supertext",
          type: "string",
        },
        {
          name: "title",
          type: "string",
        },
        {
          name: "image",
          type: "image",
        },
        {
            name: "button",
            type: "object",
            fields: [
              {
                name: "text",
                type: "string",
              },
              {
                name: "link",
                type: "string",
              },
            ],
          },
      ],
    },
    {
      name: "features",
      type: "object",
      fields: [
        {
          name: "supertext",
          type: "string",
        },
        {
          name: "title",
          type: "string",
        },
      ],
    },
    {
      name: "corporateEvents",
      type: "object",
      fields: [
        {
          name: "title",
          type: "string",
        },
        {
          name: "text",
          type: "text",
        },
        {
          name: "button",
          type: "object",
          fields: [
            {
              name: "text",
              type: "string",
            },
            {
              name: "link",
              type: "string",
            },
          ],
        },
      ],
    },
    {
      name: "spaceRentals",
      type: "object",
      fields: [
        {
            name: 'image',
            type: 'image'
        },
        {
          name: "title",
          type: "string",
        },
        {
          name: "text",
          type: "text",
        },
        {
          name: "button",
          type: "object",
          fields: [
            {
              name: "text",
              type: "string",
            },
            {
              name: "link",
              type: "string",
            },
          ],
        },
      ],
    },
    {
        name: 'venueUseTitle',
        type: 'string'
    },
    {
        name: 'venueUses',
        type: 'array',
        of: [{type: 'reference', to: {type: 'eventType'}}]
    }
  ],
};
