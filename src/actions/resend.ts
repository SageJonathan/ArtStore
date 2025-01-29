'use server'

import { Resend } from 'resend';

const resend = new Resend(process.env.RESEND_API_KEY!); 

export async function sendOrderConfirmation({ email, name}: { email: string, name: string}) {

    const emailHtml = `
    <div style="font-family: Arial, sans-serif; padding: 20px; color: #333;">
      <h1>Hello ${name},</h1>
      <p>Your order is on its way! We'll send you another email with the tracking number once it's available.</p>
      <p>Thank you for supporting Louise Guay. We are thrilled to share her art with you.</p>
       <p style="margin-top: 20px;">Warm regards,<br />The Louise Guay Team</p>
      <img src="https://louiseguay/logo.png" alt="Order confirmation" style="width: 100%; max-width: 600px; display: block; margin-top: 20px;" />
    </div>
  `;

  const emails = [email, 'sagejonathan.tesol@gmail.com'];
  try {
    const { data, error } = await resend.emails.send({
      from: 'support@sagecodes.tech',  
      to: emails,
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

export async function sendTrackingNumber({ trackingNumber, trackingUrl, fullName, email }: { trackingNumber: string; trackingUrl: string; fullName :string; email: string;}){

  const emailHtml = `
   <div style="font-family: Arial, sans-serif; padding: 20px; color: #333;">
    <h1>Hello, ${fullName}!</h1>
    <p>Your order is on its way! You can track it using the tracking number below:</p>
    <p><strong>Tracking Number:</strong> ${trackingNumber}</p>
    <p><strong>Track your order here:</strong> <a href="${trackingUrl}" target="_blank">${trackingUrl}</a></p>
    <p>Thank you for supporting Louise Guay. We are thrilled to share her art with you.</p>
  <p style="margin-top: 20px;">Warm regards,<br />The Louise Guay Team</p>
    <img src="https://louiseguay/logo.png" alt="Order confirmation" style="width: 100%; max-width: 600px; display: block; margin-top: 20px;" />
  </div>
`;

try {
  const { data, error } = await resend.emails.send({
    from: 'support@sagecodes.tech',  
    to: email,
    subject: 'Art Order Tracking Number',
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

export async function sendShippingLabel (labelLink: { labelLink: string; }){


  const emailHtml = `
  <div style="font-family: Arial, sans-serif; padding: 20px; color: #333;">
    <h1>Hello,</h1>
    <p>Thank you for helping us deliver art to our valued customers!</p>
    <p>Please find the shipping label for the latest order at the link below:</p>
    <p>
      <a href="${labelLink.labelLink}" style="color: #007BFF; text-decoration: none; font-weight: bold;">
        Download Shipping Label
      </a>
    </p>
    <p>We appreciate your hard work and dedication to making Louise Guay's art reach its new home.</p>
    <p style="margin-top: 20px;">Warm regards,<br />The Louise Guay Team</p>
    <img src="https://louiseguay/logo.png" alt="Louise Guay Art" style="width: 100%; max-width: 600px; display: block; margin-top: 20px;" />
  </div>
`;
 
  try {
    const { data, error } = await resend.emails.send({
      from: 'support@sagecodes.tech',  
      to: 'jessica.sage@usherbrooke.ca',
      subject: 'Art Order Shipping Label',
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