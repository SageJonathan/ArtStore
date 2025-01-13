'use server'

import { Resend } from 'resend';
//emailHtml will be writtin in a components file & imported

const resend = new Resend(process.env.RESEND_API_KEY!); 

export async function sendOrderConfirmation({ email, name}: { email: string, name: string}) {

  const emailHtml = `
    <h1>Hello ${name},</h1>
    <p>${name}, your order is on its way! We'll send you another email with the tracking number once it's available.</p>
    <p> Thank you for supporting Louise Guay<p>
  `;

  try {
    const { data, error } = await resend.emails.send({
      from: 'dev@sagecodes.tech',  
      to: email,
      subject: 'Art Order Confirmation',
      html: emailHtml,
    });

    if (error) {
      console.error({ error });
      throw new Error('Failed to send email');
    }

    return data;
  } catch (error) {
    console.error('Error sending email:', error);
    throw new Error('Error sending email');
  }
}
