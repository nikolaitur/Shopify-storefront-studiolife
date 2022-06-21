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
        title: 'Page Title',
        type: 'string',
        group: 'seo'
      },
      {
        name: 'metaDescription',
        title: 'Meta Description',
        type: 'text',
        group: 'seo'
      },
      {
        name: 'hero',
        title: 'Hero Section',
        description: 'Main section on the homepage',
        type: 'object',
        group: 'content',
        fields: [
          {
            title: "Title",
            description:
              "This title will appear in the hero unit at the top of the page",
            type: "string",
            name: "title",
          },
          // {
          //   title: "Subtitle",
          //   description:
          //     "This subtitle will appear in the hero unit at the top of the page",
          //   type: "string",
          //   name: "subtitle",
          // },
          // {
          //   title: "Text",
          //   description:
          //     "This subtext appears below the subtitle, in the hero section.",
          //   type: "string",
          //   name: "text",
          // },
          {
            name: 'image',
            title: 'Hero Image',
            type: 'image',
            options: {
              hotspot: true,
            },
          },
        ]
      },
      {
        name: 'belowTheFold',
        title: 'Below The Fold',
        type: 'object',
        group: 'content',
        description: 'Section immediately following the hero section',
        fields: [{
          name: 'title',
          title: 'Title',
          type: 'string'
        }, {
          name: 'text',
          title: 'Text',
          type: 'text'
        },
        {
          name: 'live',
          title: 'Live Events',
          type: 'text'
        },
        {
          name: 'workshop',
          title: 'Recorded Workshops',
          type: 'text'
        },
        {
          name: 'private',
          title: 'Private Events',
          type: 'text'
        }
      ]
      },
      {
        name: 'about',
        title: 'About',
        type: 'object',
        description: '"we are StudioLife" section',
        group: 'content',
        fields: [
          {
            name: 'text',
            title: 'Text',
            type: 'text'
          },
          {
            name: 'image',
            title: 'Image',
            type: 'image',
            options: {
              hotspot: true,
            },
          },
        ]
      },
      {
        name: 'partner',
        title: 'Partner with StudioLife',
        group: 'content',
        type: 'object',
        fields: [
          {
            name: 'supertext',
            title: 'Supertext',
            type: 'text'
          },
          {
            name: 'text',
            title: 'Text',
            type: 'text'
          },
          
          {
            name: 'image',
            title: 'Image',
            type: 'image',
            options: {
              hotspot: true,
            },
          },
        ]
      },
      {
        name: 'private',
        title: 'Private Events',
        group: 'content',
        type: 'text'
      },
      {
        name: 'corporate',
        title: 'Corporate Events',
        group: 'content',
        type: 'text'
      }
    ],
};