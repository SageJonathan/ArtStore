
import { NextRequest, NextResponse } from "next/server";
import Stripe from "stripe";
// const stripe = require("stripe")(process.env.STRIPE_SECRET_KEY);
const stripe = new Stripe(process.env.STRIPE_SECRET_KEY!, { apiVersion: "2024-12-18.acacia" }); 

export async function POST(request: NextRequest) {
  try {
    const { amount,shipping, email, id} = await request.json();

    const artId = id;

    const paymentIntent = await stripe.paymentIntents.create({
      amount: amount,
      currency: "cad",
      automatic_payment_methods: { enabled: true },
      shipping: shipping,
      receipt_email: email,
      metadata: { artId: artId }
    });

    return NextResponse.json({ clientSecret: paymentIntent.client_secret });
  } catch (error) {
    console.error("Internal Error:", error);
    // Handle other errors (e.g., network issues, parsing errors)
    return NextResponse.json(
      { error: `Internal Server Error: ${error}` },
      { status: 500 }
    );
  }
}
