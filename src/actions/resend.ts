'use server'

import { match } from 'assert';
import { Resend } from 'resend';
// Dont forget to add confirmation for Jess & Jonathan gmail

const resend = new Resend(process.env.RESEND_API_KEY!); 

export async function sendOrderConfirmation({ email, name}: { email: string, name: string}) {

    const emailHtml = `
    <div style="font-family: Arial, sans-serif; padding: 20px; color: #333;">
      <h1>Hello ${name},</h1>
      <p>Your order is on its way! We'll send you another email with the tracking number once it's available.</p>
      <p>Thank you for supporting Louise Guay. We are thrilled to share her art with you.</p>
      <img src="https://louiseguay/logo.png" alt="Order confirmation" style="width: 100%; max-width: 600px; display: block; margin-top: 20px;" />
    </div>
  `;
 
  try {
    const { data, error } = await resend.emails.send({
      from: 'dev@sagecodes.tech',  
      to: email,
      subject: 'Art Order Confirmation',
      // Add gmail & Jess mail for confirmation on our end
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

export async function sendTrackingNumber({ trackingNumber, trackingUrl }: { trackingNumber: string; trackingUrl: string }){
  // get email through db by cehcking for number and url match


  const email = "sagejonathan.teosl"
  // const emails = ['sagejonathan.tesol', email]
  const emailHtml = `
  <div style="font-family: Arial, sans-serif; padding: 20px; color: #333;">
    <h1>Hello,</h1>
    <p>Your order is on its way! We'll send you another email with the tracking number once it's available.</p>
    <p>Thank you for supporting Louise Guay. We are thrilled to share her art with you.</p>
    <img src="https://louiseguay/logo.png" alt="Order confirmation" style="width: 100%; max-width: 600px; display: block; margin-top: 20px;" />
  </div>
`;

try {
  const { data, error } = await resend.emails.send({
    from: 'dev@sagecodes.tech',  
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
  // const emails = ['jessica.sage@usherbrooke.ca','sagejonathan.tesol@gmail.com']
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
      from: 'dev@sagecodes.tech',  
      to: 'sagejonathan.tesol@gmail.com',
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