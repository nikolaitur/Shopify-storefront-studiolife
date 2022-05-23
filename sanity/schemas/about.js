/* eslint-disable import/no-anonymous-default-export */
// studio/schemas/about.js
export default {
  name: "about",
  title: "About",
  type: "document",

  // These actions define what users can do with this document.
  // Notice how "delete" is not available in this array.
  // This means, users can't delete this document
  // from within the studio
  __experimental_actions: ["update", "create", "publish"],

  fields: [
    {
      title: "Page Heading",
      description:
        "This heading will appeart at the top of the page",
      type: "string",
      name: "heading",
    },
    {
      title: "Subheading",
      description:
        "This subheading will appeart at the top of the page",
      type: "string",
      name: "subheading",
    },
    {
      name: 'description',
      type: 'text',
      title: 'Description'
    },
    {
      name: 'image1',
      title: 'First Image',
      type: 'image',
      options: {
        hotspot: true,
      },
    },
    {
      name: 'image2',
      title: 'Second Image',
      type: 'image',
      options: {
        hotspot: true,
      },
    },
    {
      name: 'textUnderImg2',
      type: 'text',
      title: 'Text under Second Image'
    },
  ],
};