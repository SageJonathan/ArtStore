import * as action from "@/actions";
import { NextRequest, NextResponse } from "next/server";
import Stripe from "stripe";

const stripe = new Stripe(process.env.STRIPE_SECRET_KEY!, {
  apiVersion: "2024-12-18.acacia",
});
const endpointSecret = process.env.WEBHOOK_SECRET;

// Handle Client Database
async function handleClient(
  email: string,
  artId: string,
  shipping: Stripe.PaymentIntent.Shipping | null
) {
  const emailExists = await action.verifyClientData({ email });

  if (emailExists) {
    await action.updateClientData({
      email,
      artPieces: artId ? [{ id: parseInt(artId) }] : [],
    });
  } else {
    await action.handleClientData({
      fullName: shipping?.name || "",
      email: email,
      mobileNumber: shipping?.phone || null,
      city: shipping?.address?.city || "",
      country: shipping?.address?.country || "",
      line1: shipping?.address?.line1 || "",
      line2: shipping?.address?.line2 || null,
      postalCode: shipping?.address?.postal_code || "",
      stateOrProvince: shipping?.address?.state || "",
      artPieces: artId ? [{ id: parseInt(artId) }] : [],
    });
  }
}

// Handle Art Database
async function handleArt(email: string, artId: string) {
  await action.paintingsUpdate({
    email: email,
    artPieceId: parseInt(artId, 10),
  });
}

//Handle Order Confirmation Email
async function emailOrderConfirmation(email: string, name: string) {
  await action.sendOrderConfirmation({
    email: email,
    name: name,
  });
}

// Hande Shipping Label & Tracking Number
async function callShippoApi(
  email: string,
  artId: string,
  shipping: Stripe.PaymentIntent.Shipping | null
) {
  await action.createLabel({
    fullName: shipping?.name || "",
    email: email,
    mobileNumber: shipping?.phone || undefined,
    city: shipping?.address?.city || "",
    country: shipping?.address?.country || "",
    line1: shipping?.address?.line1 || "",
    line2: shipping?.address?.line2 || undefined,
    postalCode: shipping?.address?.postal_code || "",
    stateOrProvince: shipping?.address?.state || "",
    artId: parseInt(artId, 10),
  });
}

export const config = {
  // matcher: "/api/webhooks/stripe",
  api: {
    bodyParser: false, // Disable Next.js body parser for raw body handling
  },
};

export async function POST(request: NextRequest) {
  try {
    // Capture the raw body for Stripe signature verification
    const rawBody = await request.arrayBuffer(); // Get the raw body as ArrayBuffer
    const buffer = Buffer.from(rawBody); // Convert the ArrayBuffer to Node.js Buffer

    const sig = request.headers.get("stripe-signature"); // Get the Stripe signature from headers
    if (!sig) {
      console.error("Missing Stripe signature");
      return NextResponse.json(
        { error: "Missing Stripe signature" },
        { status: 400 }
      );
    }

    let event;
    try {
      event = stripe.webhooks.constructEvent(buffer, sig, endpointSecret!); // Pass raw body as Buffer
    } catch (err: unknown) {
      if (err instanceof Error) {
        console.error("Webhook signature verification failed:", err.message);
        return NextResponse.json(
          { error: `Webhook Error: ${err.message}` },
          { status: 400 }
        );
      } else {
        // If the error is not of type Error, handle it
        console.error("Unknown error:", err);
        return NextResponse.json(
          { error: "Unknown Webhook Error" },
          { status: 400 }
        );
      }
    }

    switch (event.type) {
      case "payment_intent.succeeded": {
        const paymentIntent = event.data.object;
        console.log(
          `PaymentIntent for ${paymentIntent.amount} was successful.`
        );
        const shipping = paymentIntent.shipping;
        const receiptEmail = paymentIntent.receipt_email;
        const artId = paymentIntent.metadata.artId;
        const name = paymentIntent.shipping?.name;

        await handleClient(receiptEmail || "", artId, shipping);
        await handleArt(receiptEmail || "", artId);
        await emailOrderConfirmation(receiptEmail || "", name || "");
        await callShippoApi(receiptEmail || "", artId, shipping);

        break;
      }
      case "checkout.session.completed": {
        const completeCheckout = event.data.object;
        console.log(completeCheckout.shipping_address_collection);
      }
      case "payment_method.attached": {
        const paymentMethod = event.data.object;
        console.log(`PaymentMethod ${paymentMethod.id} was attached.`);
        //add to db for refund?
        break;
      }
      default:
        console.log(`Unhandled event type: ${event.type}`);
    }

    // Respond quickly to Stripe to avoid retries
    return NextResponse.json({ received: true });
  } catch (error) {
    console.error("Internal Error:", error);
    return NextResponse.json(
      { error: `Internal Server Error: ${error}` },
      { status: 500 }
    );
  }
}
