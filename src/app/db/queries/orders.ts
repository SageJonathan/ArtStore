import { db } from "../../db";

export type shippingDetails={
    trackingNumber : string ;
    trackingUrl: string ;
    email: string ;
    fullName: string ;
    artId:  number ;
  }
  
// export type orderData ={
//     trackingNumber: string;
//     trackingUrl: string;
//   }


// export async function storeNewShippingData(shippingData: shippingDetails) {
//     const { trackingNumber, trackingUrl, email, fullName, artId } = shippingData;

//     console.log('DB_______________________________________________________________')
//     console.log({
//         trackingNumber,
//         trackingUrl,
//         email,
//         fullName,
//         artId
//     });  
  
//     if (!trackingNumber || !trackingUrl || !email || !fullName || artId === undefined) {
//       throw new Error("Missing required shipping data fields");
//     }  

//     return db.orderData.create({
//       data: {
//         trackingNumber,
//         trackingUrl,
//         email,
//         fullName,
//         artId,
//       },
//     });
//   }


export async function storeNewShippingData(shippingData: shippingDetails) {
    const { trackingNumber, trackingUrl, email, fullName, artId } = shippingData;

    console.log('DB_______________________________________________________________');
    console.log({
      trackingNumber,
      trackingUrl,
      email,
      fullName,
      artId
    });
  
    // Ensure that all required fields are provided
    if (!trackingNumber || !trackingUrl || !email || !fullName || artId === undefined) {
      throw new Error("Missing required shipping data fields");
    }
  
    try {
    //   Create the new order entry
      return db.orderData.create({
        data: {
          trackingNumber,
          trackingUrl,
          email,
          fullName,
          artId, 
        },
      });
    } catch (error) {
      console.error("Error storing shipping data:", error);
      throw error;
    }
  }

// export async function getClientFromOrder(orderData: orderData): Promise<{ name: string, email: string } | null> {
//     const { trackingNumber, trackingUrl } = orderData;


//     //Update to find unique when db is changed to unqiue 
//     const order = await db.orderData.findFirst({
//         where: {
//             trackingNumber,
//             trackingUrl,
//         },
//     });

//     if (!order) {
//         return null; 
//     }

//     return { 
//         name: order.fullName,  
//         email: order.email  
//     };
// }
