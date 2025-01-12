// import type { ArtPiece, ClientData } from '@prisma/client';
// import { db } from '../../db';

// // Define the type for the data being passed
// export type ClientInputData = {
//   fullName: string;
//   email: string;
//   mobileNumber: string;
//   shippingAddress: string;
//   artPieces?: { id: number }[];  // Expecting an array of art piece IDs
// };

// export async function createClient(clientData: ClientInputData) {
//   try {
//     const newClient = await db.clientData.create({
//       data: {
//         firstName: clientData.firstName,
//         lastName: clientData.lastName,
//         email: clientData.email,
//         mobileNumber: clientData.mobileNumber,
//         shippingAddress: clientData.shippingAddress,
//         // Link existing art pieces by ID
//         artPieces: {
//           connect: clientData.artPieces?.map((art) => ({
//             id: art.id,
//           })) || [],
//         },
//
//       },
//       include: {
//         artPieces: true, // Include related art pieces
//        
//       },
//     });

//     console.log('Client created successfully:', newClient);
//     return newClient; // Return the created client including the related data
//   } catch (error) {
//     console.error('Error creating client:', error);
//     throw error; // Rethrow error if any issue
//   }
// }


// // function for updateing current client purchase array 