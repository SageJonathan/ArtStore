// import { db } from "@/app/db";
import { NextRequest, NextResponse } from 'next/server';
import Stripe from "stripe";

const stripe = new Stripe(process.env.STRIPE_SECRET_KEY!, { apiVersion: "2024-12-18.acacia"});
const endpointSecret = process.env.WEBHOOK_SECRET ;

// Create db logic in db/queries THEN import to server action THEN import action to here and invoke them in aysnc fucntions 

// const createClientData = async () => {
//     try {
// // Fill up scehma 
// // add art ID to cleint array 
//     }
//     catch {

//     }
// }

// const updateArtStock = async () =>{
//     try {
// // update inStock to false
// // Add client ID 
//     }
//     catch {

//     }
// }

// This might be able to me hanfdles directly by stripe******
// const emailConfirmation = async () =>{
// try {
// //  With above info : 
// // 1) Email confirmation to Jess & Me & Client 
// }
// catch {

// }
// }



/// Write api logic in endpoints, here we relay the info tho them
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


export const config = {
  matcher: '/api/webhooks',
  api: {
    bodyParser: false, // Disable Next.js body parser for raw body handling
  },
};

export async function POST(request: NextRequest) {
  try {
    // Capture the raw body for Stripe signature verification
    const rawBody = await request.arrayBuffer(); // Get the raw body as ArrayBuffer
    const buffer = Buffer.from(rawBody); // Convert the ArrayBuffer to Node.js Buffer

    const sig = request.headers.get('stripe-signature'); // Get the Stripe signature from headers

    if (!sig) {
      console.error('Missing Stripe signature');
      return NextResponse.json({ error: 'Missing Stripe signature' }, { status: 400 });
    }

    // Verify the event using the Stripe library
    let event;
    try {
      event = stripe.webhooks.constructEvent(buffer, sig, endpointSecret!); // Pass raw body as Buffer
    } catch (err: any) {
      console.error('Webhook signature verification failed:', err.message);
      return NextResponse.json({ error: `Webhook Error: ${err.message}` }, { status: 400 });
    }

    // Handle the event based on its type
    switch (event.type) {
      case 'payment_intent.succeeded': {
        const paymentIntent = event.data.object;
        console.log(`PaymentIntent for ${paymentIntent.amount} was successful.`);
        const shipping = paymentIntent.shipping;
        console.log('Shipping Info:', shipping);
        const receiptEmail = paymentIntent.receipt_email;
        console.log('Receipt Email:', receiptEmail);
        const meta = paymentIntent.metadata;
        const artId = paymentIntent.metadata.artId;
        console.log(artId);
        console.log(meta);
        break;
      }
      case 'checkout.session.completed':{
        const completeCheckout = event.data.object;
        console.log(completeCheckout.shipping_address_collection)
      }
      case 'payment_method.attached': {
        const paymentMethod = event.data.object;
        console.log(`PaymentMethod ${paymentMethod.id} was attached.`);
        break;
      }
      default:
        console.log(`Unhandled event type: ${event.type}`);
    }

    // Respond quickly to Stripe to avoid retries
    return NextResponse.json({ received: true });
  } catch (error) {
    console.error('Internal Error:', error);
    return NextResponse.json(
      { error: `Internal Server Error: ${error}` },
      { status: 500 }
    );
  }
}