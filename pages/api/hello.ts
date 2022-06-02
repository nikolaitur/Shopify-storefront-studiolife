// Next.js API route support: https://nextjs.org/docs/api-routes/introduction
import type { NextApiRequest, NextApiResponse } from 'next';
const Recipient = require('mailersend').Recipient;
const EmailParams = require('mailersend').EmailParams;
const MailerSend = require('mailersend');

type Data = {
  response?: string;
  error?: string;
};

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse<Data>
) {

  const data = JSON.parse(req.body);

  const emailText = `You got an email from ${data.name}!
  ---
  Form: Contact Us form
  Name: ${data.name}
  Phone: ${data.phone}
  Email: ${data.email}
  ---
  Message: ${data.message}`;

  const mailersend = new MailerSend({
    api_key: process.env.MAILERSEND_TOKEN,
  });

  console.log(emailText);

  const recipients =
    process.env.NODE_ENV === 'development'
      ? [new Recipient('devin@webprism.co', 'WEBPRISM Team')]
      : [
          new Recipient('devin@webprism.co', 'WEBPRISM Team'),
          new Recipient('hello@studiolifeseattle.com', 'StudioLife Team'),
        ];

  const emailParams = new EmailParams()
    .setFrom('websiteforms@webprism.co')
    .setFromName('StudioLife Website: Contact Us Page')
    .setRecipients(recipients)
    .setSubject('🎉 New Form Submission on studiolifeseattle.com! 🚀')
    .setText(emailText);

    mailersend
      .send(emailParams)
      .then((result: any) => {
        if (result.status === 202)
          res.status(200).json({ response: "We sent the email" });
      })
      .catch((error: any) => {
        if (error)
          res.status(500).json({ error: "there was an error, check the logs." });
      });

  //testing
//   res.status(200).json({ response: 'We sent the email' });
}
