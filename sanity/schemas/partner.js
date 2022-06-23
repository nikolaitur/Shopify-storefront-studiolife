export default {
  name: "partner",
  title: "Partner With Us",
  type: "document",
  groups: [{
    default: true,
    name: 'content',
    title: 'Content'
  },{
    name: 'seo',
    title: 'SEO'
  }],
  fields: [
    {
      name: 'pageTitle',
      type: 'string',
      group: 'seo'
    },
    {
      name: 'metaDescription',
      type: 'text',
      group: 'seo'
    },
    {
      name: "hero",
      type: "object",
      group: 'content',
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
          ],
        },
      ],
    },
    {
      name: "belowTheFold",
      type: "object",
      group: 'content',
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
          name: "text",
          type: "text",
        },
      ],
    },
    {
      name: "features",
      type: "object",
      group: 'content',
      fields: [
        {
          name: "image",
          type: "image",
        },
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
      name: "pricingAndFee",
      type: "object",
      group: 'content',
      fields: [
        {
          name: "title",
          type: "string",
        },
        {
          name: "classPricing",
          type: "text",
        },
        {
          name: "studiolifeFee",
          type: "text",
        },
      ],
    },
  ],
};
