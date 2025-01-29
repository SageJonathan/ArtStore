import { NextResponse } from "next/server";
import * as actions from '@/actions';


async function emailClientTracking (trackingNumber:string, trackingUrl:string, fullName: string, email: string){
  await actions.sendTrackingNumber({
    trackingNumber,trackingUrl, email, fullName})
}

async function emailShipperLabel(labelLink:string) {
  await actions.sendShippingLabel({labelLink})
}


export async function POST(request: Request) {
  try {
    const responseBody = await request.json(); 

    switch (responseBody.event) {
      case 'transaction_created':

      const metadataObject = JSON.parse(responseBody.data.metadata);
  
        const email = metadataObject.email;
        const fullName = metadataObject.name;
        const labelLink = responseBody.data.label_url;
        const trackingNumber= responseBody.data.tracking_number;
        const trackingUrl= responseBody.data.tracking_url_provider;
        
        await emailClientTracking(trackingNumber,trackingUrl,fullName,email)
        await emailShipperLabel(labelLink)
        break;
      default:
        console.log('Default Response body', responseBody);
    }

    return NextResponse.json({ received: true });

  } catch (error) {
    console.error("Internal Error:", error);
    return new Response(
      JSON.stringify({ error: `Internal Server Error: ${error}` }),
      { status: 500, headers: { 'Content-Type': 'application/json' } }
    );
  }
}
