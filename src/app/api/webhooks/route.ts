// // import { db } from "@/app/db";
// import { NextRequest, NextResponse } from "next/server";
// // import { NextApiRequest, NextApiResponse } from 'next';
// import Stripe from "stripe";

// const stripe = new Stripe(process.env.STRIPE_SECRET_KEY!, { apiVersion: "2024-12-18.acacia"});
// const endpointSecret = process.env.WEBHOOK_SECRET ;

// export const config = {
//     api: {
//       bodyParser: false,
//     },
//   };
  

// const updateArtStock = async () =>{
//     try {
// // update inStock to false
// // Add client ID 
//     }
//     catch {

//     }
// }

// const createClientData = async () => {
//     try {
// // Fill up scehma 
// // add art ID to cleint array 
//     }
//     catch {

//     }
// }

// const emailConfirmation = async () =>{
// try {
// //  With above info : 
// // 1) Email confirmation to Jess & Me & Client 
// }
// catch {

// }
// }

// const getShippingInfo = async () => {
//     try {
//  // API  CALL to Shippo for tag & tracking number
//  // Api in seperate endpoint
      
//     }
//     catch {

//     }
// }

// const shippingConfirmation = async () => {
//    // API CALL:  Tag emailed to Jess & Tracking number email to client
//    // Api in seperate endpoint
// }


// export default async function handler(req: NextApiRequest, res: NextApiResponse) {
//   if (req.method !== 'POST') {
//     res.setHeader('Allow', 'POST');
//     return res.status(405).end('Method Not Allowed');
//   }
 
//   let event;

//   // Capture the raw body for Stripe signature verification
//   const rawBody = await new Promise<Buffer>((resolve, reject) => {
//     let data = '';
//     req.on('data', (chunk) => (data += chunk));
//     req.on('end', () => resolve(Buffer.from(data)));
//     req.on('error', (err) => reject(err));
//   });

//   const sig = req.headers['stripe-signature'];

//   try {
//     // Verify the event using the Stripe library
//     event = stripe.webhooks.constructEvent(rawBody, sig!, endpointSecret!);
//   } catch (err: any) {
//     console.error('Webhook signature verification failed:', err.message);
//     return res.status(400).send(`Webhook Error: ${err.message}`);
//   }

//   // Handle the event based on type
//   switch (event.type) {
//     case 'payment_intent.succeeded': {
//       const paymentIntent = event.data.object; // Contains payment intent details
//       console.log(`PaymentIntent for ${paymentIntent.amount} was successful.`);
//       // Add asynchronous logic here to handle successful payment intents
//       break;
//     }
//     case 'payment_method.attached': {
//       const paymentMethod = event.data.object;
//       console.log(`PaymentMethod ${paymentMethod.id} was attached.`);
//       // Add asynchronous logic here to handle new payment methods
//       break;
//     }
//     default:
//       console.log(`Unhandled event type: ${event.type}`);
//   }

//   // Respond quickly to Stripe to avoid retries
//   res.status(200).json({ received: true });
// }








import { NextRequest, NextResponse } from 'next/server';
import Stripe from 'stripe';

// const stripe = new Stripe(process.env.STRIPE_SECRET_KEY!, { apiVersion: "2024-12-18.acacia" });
// const endpointSecret = process.env.WEBHOOK_SECRET;
const stripe = new Stripe("whsec_95c8c765eb6821e02a91b2da1f273ce23c0255dd428015e43dc93a3be5b85ea1", { apiVersion: "2024-12-18.acacia" });
const endpointSecret ="whsec_95c8c765eb6821e02a91b2da1f273ce23c0255dd428015e43dc93a3be5b85ea1";

export const config = {
  matcher: '/api/webhooks', // Ensure this middleware matches the correct route
};

export async function middleware(req: NextRequest) {
  if (req.method !== 'POST') {
    return NextResponse.json(
      { message: 'Method Not Allowed' },
      { status: 405, headers: { Allow: 'POST' } }
    );
  }

  const rawBody = await req.text(); // Get raw body content as a string

  const sig = req.headers.get('stripe-signature');

  if (!sig) {
    console.error('Missing Stripe signature');
    return NextResponse.json({ message: 'Missing Stripe signature' }, { status: 400 });
  }

  let event;

  try {
    // Verify the event using the Stripe library
    event = stripe.webhooks.constructEvent(rawBody, sig, endpointSecret!);
  } catch (err: any) {
    console.error('Webhook signature verification failed:', err.message);
    return NextResponse.json({ message: `Webhook Error: ${err.message}` }, { status: 400 });
  }

  // Handle the event based on type
  try {
    switch (event.type) {
      case 'payment_intent.succeeded': {
        const paymentIntent = event.data.object;
        console.log(`PaymentIntent for ${paymentIntent.amount} was successful.`);
        // Example: Update stock or send confirmation email
        // await updateArtStock();
        // await emailConfirmation();
        break;
      }
      case 'payment_method.attached': {
        const paymentMethod = event.data.object;
        console.log(`PaymentMethod ${paymentMethod.id} was attached.`);
        // Example: Update client data
        // await createClientData();
        break;
      }
      default:
        console.log(`Unhandled event type: ${event.type}`);
    }

    // Respond quickly to Stripe to avoid retries
    return NextResponse.json({ received: true }, { status: 200 });
  } catch (error) {
    console.error('Error handling the event:', error);
    return NextResponse.json({ message: 'Internal Server Error' }, { status: 500 });
  }
}



