/* eslint-disable import/no-anonymous-default-export */

import { m } from "framer-motion";

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
  groups: [
    {
      name: 'content',
      title: 'Content',
      default: true
    },
    {
      name: 'seo',
      title: 'SEO',
    }
  ],
  fields: [
    {
      name: 'largeText',
      title: 'Large Text',
      description: "Originally 'what if...'",
      group: 'content',
      type: 'string'
    },
    {
      name: 'secondText',
      title: 'Second Text',
      description: 'Text directly under Large Text',
      group: 'content',
      type: 'string'
    },
    {
      name: 'imageSection1',
      title: 'Image Section 1',
      group: 'content',
      type: 'object',
      fields: [
        {
          name: 'image',
          title: 'Image',
          type: 'image',
        },
        {
          name: 'imageAlt',
          title: 'Image Alt Text',
          type: 'string'
        },
        {
          name: 'heading',
          title: 'Heading',
          type: 'string'
        },
        {
          name: 'text',
          title: 'Text',
          type: 'string'
        },
        
      ],
    },
    {
      name: 'accentText',
      title: 'Accent Text',
      group: 'content',
      type: 'text'
    },
    {
      name: 'meet',
      title: 'Meet Brooke & Kristi',
      type: 'object',
      group: 'content',
      fields: [
        {
          name: 'image',
          title: 'Image',
          type: 'image'
        },
        {
          name: 'imageAlt',
          title: 'Image Alt Text',
          type: 'string'
        },
        {
          name: 'heading',
          title: 'Heading',
          type: 'string'
        },
        {
          name: 'text',
          title: 'Text',
          type: 'text'
        }
      ]
    },
    {
      name: 'shop',
      title: 'About The Shop',
      group: 'content',
      type: 'object',
      fields: [
        {
          name: 'image',
          title: 'Image',
          type: 'image'
        },
        {
          name: 'heading',
          title: 'Heading',
          type: 'string'
        },
        {
          name: 'text',
          type: 'text'
        },
        {
          name: 'buttons',
          type: 'object',
          fields: [
            {
              name: 'button1',
              type: 'object',
              fields: [{
                name: 'text',
                type: 'string'
              },{
                name: 'url',
                type: 'string'
              }]
            },
            {
              name: 'button2',
              type: 'object',
              fields: [{
                name: 'text',
                type: 'string'
              },{
                name: 'url',
                type: 'string'
              }]
            }
          ]
        }
      ]
    },
    {
      name: 'accentText2',
      title: 'Accent Text 2',
      group: 'content',
      type: 'text'
    },
    {
      name: 'story',
      type: 'object',
      group: 'content',
      fields: [
        {
          name: 'mainHeading',
          type: 'string'
        },
        {
          name: 'part1',
          type: 'object',
          fields: [
            {
              name: 'image',
              type: 'image'
            },
            {
              name: 'imageAlt',
              type: 'string'
            },
            {
              name: 'heading',
              type: 'string'
            },
            {
              name: 'text',
              type: 'text'
            }
          ]
        },
        {
          name: 'part2',
          type: 'object',
          fields: [
            {
              name: 'image',
              type: 'image'
            },
            {
              name: 'imageAlt',
              type: 'string'
            },
            {
              name: 'heading',
              type: 'string'
            },
            {
              name: 'text',
              type: 'text'
            }
          ]
        },
        {
          name: 'part3',
          type: 'object',
          fields: [
            {
              name: 'heading',
              type: 'string'
            },
            {
              name: 'text',
              type: 'text'
            }
          ]
        }
      ]
    }
  ],
};