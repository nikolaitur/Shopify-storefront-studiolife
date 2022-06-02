/* eslint-disable import/no-anonymous-default-export */
// studio/schemas/homepage.js
export default {
    name: "homepage",
    title: "Homepage",
    type: "document",
  
    // These actions define what users can do with this document.
    // Notice how "delete" is not available in this array.
    // This means, users can't delete this document
    // from within the studio
    // __experimental_actions: ["update", "create", "publish"],
  
    fields: [
      {
        name: 'metaDescription',
        title: 'SEO: Meta Description',
        type: 'text'
      },
      {
        title: "Hero Title",
        description:
          "This title will appear in the hero unit at the top of the page",
        type: "string",
        name: "heroTitle",
      },
      {
        title: "Hero Subtitle",
        description:
          "This subtitle will appear in the hero unit at the top of the page",
        type: "string",
        name: "heroSubtitle",
      },
      {
        title: "Hero Subtext",
        description:
          "This subtext appears below the subtitle, in the hero section.",
        type: "string",
        name: "heroSubtext",
      },
      {
        name: 'heroImage',
        title: 'Hero Image',
        type: 'image',
        options: {
          hotspot: true,
        },
      },
      {
        name: 'aboutHeading',
        title: 'About Heading',
        type: 'string'
      },
      {
        name: 'aboutSubtext',
        title: 'About Subtext',
        type: 'text'
      },
      {
        name: 'aboutImage',
        title: 'About Image',
        type: 'image',
        options: {
          hotspot: true,
        },
      },
    ],
};