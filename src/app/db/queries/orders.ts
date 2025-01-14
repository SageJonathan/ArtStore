import { db } from "../../db";


export type shippingDetails={
  trackingNumber : string | undefined;
  trackingUrl: string | undefined;
  email: string | undefined;
  fullName: string | undefined;
  artId:  number | undefined;
}


// export async function storeNewShippingData(shippingData: shippingDetails){
//   const (trackingNumber, trackingUrl, email, fullname, artId) = shippingData;

//   return db.orderData.create
// }
