export default {
  name: "privateEvents",
  title: "Private Corporate Events",
  type: "document",
  groups: [
    {
      default: true,
      name: "content",
      title: "Content",
    },
    {
      name: "seo",
      title: "SEO",
    },
  ],
  fields: [
    {
      name: "pageTitle",
      type: "string",
      group: "seo",
    },
    {
      name: "metaDescription",
      type: "text",
      group: "seo",
    },
    {
      name: "hero",
      type: "object",
      group: "content",
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
      group: "content",
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
      group: "content",
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
      group: "content",
      fields: [
        {
          name: "image",
          type: "image",
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
      name: "venueUseTitle",
      type: "string",
      group: "content",
    },
    {
      name: "venueUses",
      type: "array",
      group: "content",
      of: [{ type: "reference", to: { type: "eventType" } }],
    },
  ],
};
