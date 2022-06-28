import mail from '@sendgrid/mail';
import type { NextApiRequest, NextApiResponse } from 'next';

import { getEmailTemplateBySlug } from '@/cms';

import { ContactUsFormData } from '@/types/types';

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  const body = JSON.parse(req.body) as ContactUsFormData;

  const { template, toEmail } = await getEmailTemplateBySlug(
    'contact-us',
    'contact-us-to-email'
  );

  if (!template) {
    // eslint-disable-next-line no-console
    console.error('No email template found');
    return res.status(400).json({ status: 'ERROR' });
  }

  if (!toEmail) {
    // eslint-disable-next-line no-console
    console.error('To email not found');
    return res.status(400).json({ status: 'ERROR' });
  }

  const { name, phone, email, message } = body;
  const msg = {
    to: toEmail,
    from: toEmail,
    subject: `Church website contact us form, from: ${name}`,
    text: `Church website contact us form, from: ${name}`,
    html: template
      .replace(/_NAME_/g, name)
      .replace(/_PHONE_/g, phone)
      .replace(/_EMAIL_/g, email)
      .replace(/_MESSAGE_/g, message),
  };

  mail.setApiKey(process.env.SENDGRID_API_KEY || '');
  try {
    await mail.send(msg);
    res.status(200).json({ status: 'OK' });
    // res.status(500).json({ status: 'ERROR' });
  } catch (error: unknown) {
    // eslint-disable-next-line no-console
    console.error(JSON.stringify(error, null, 2));
    res.status(400).json({ status: 'ERROR' });
  }
}
