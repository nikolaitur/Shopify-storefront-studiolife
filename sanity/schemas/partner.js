export default {
  name: "partner",
  title: "Partner With Us",
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
          ],
        },
      ],
    },
    {
      name: "belowTheFold",
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
          name: "text",
          type: "text",
        },
      ],
    },
    {
      name: "features",
      type: "object",
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
