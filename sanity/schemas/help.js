/* eslint-disable import/no-anonymous-default-export */
// studio/schemas/about.js
export default {
    name: "help",
    title: "Help",
    type: "document",
  
    // These actions define what users can do with this document.
    // Notice how "delete" is not available in this array.
    // This means, users can't delete this document
    // from within the studio
    __experimental_actions: ["update", "create", "publish"],
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
        title: "Hero Heading",
        description:
          "This heading will appear at the top of the page.",
        type: "string",
        name: "heading",
        group: 'content'
      },
      {
        title: "Subheading",
        description:
          "This subheading will appeart at the top of the page. A great place to put a help phone number, email address, or other helpful contact info.",
        type: "text",
        name: "subheading",
        group: 'content'
      },
      {
        title: "Hero Button",
        name: "heroButton",
        group: 'content',
        type: "string",
        description: "Text for the button in the hero section. If no text is set, the button will be hidden."
      },
      {
        name: 'paragraphOne',
        type: 'text',
        group: 'content',
        title: 'First paragraph after the hero section.'
      },
      {
        name: 'faqs',
        title: 'Frequently Asked Questions',
        type: 'array',
        group: 'content',
        of: [{type: 'reference', to: {type: 'faq'}}],
      },
    ],
  };