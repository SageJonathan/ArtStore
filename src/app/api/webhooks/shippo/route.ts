import { NextResponse } from "next/server";

export async function POST(request: Request) {
  try {
    const responseBody = await request.json(); 

    switch (responseBody.event) {
      case 'transaction_created':
        console.log('Transaction ID: ', responseBody.data.object_id);
        console.log('Tracking Status: ', responseBody.data.tracking_status);
        console.log('Tracking URL Provider: ', responseBody.data.tracking_url_provider);
        console.log('ETA: ', responseBody.data.eta);

        //Send trcacking number & url to cleint 

        // Send label to Jess & me

        
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
