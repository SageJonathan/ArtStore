'use server'

import { Resend } from 'resend';
// Dont forget to add confirmation for Jess & Jonathan gmail

const resend = new Resend(process.env.RESEND_API_KEY!); 

export async function sendOrderConfirmation({ email, name}: { email: string, name: string}) {

    const emailHtml = `
    <div style="font-family: Arial, sans-serif; padding: 20px; color: #333;">
      <h1>Hello ${name},</h1>
      <p>Your order is on its way! We'll send you another email with the tracking number once it's available.</p>
      <p>Thank you for supporting Louise Guay. We are thrilled to share her art with you.</p>
      <img src="/logo.png" alt="Order confirmation" style="width: 100%; max-width: 600px; display: block; margin-top: 20px;" />
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

// export async function sendTrackingNumber ({}){

// }

// export async function sendShippingLabel ({}){

// }