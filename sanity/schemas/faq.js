import { ImCheckmark } from "react-icons/im";

// eslint-disable-next-line import/no-anonymous-default-export
export default {
  name: 'faq',
  title: 'FAQs',
  type: 'document',
  icon: ImCheckmark,
  fields: [
    {
      name: 'question',
      title: 'Question',
      type: 'string',
    },
    {
      name: 'answer',
      title: 'Answer',
      type: 'text',
    },
  ],
}