import { db } from "../../db";


export type newClientData = {
    fullName: string;
    email: string;
    mobileNumber: string | null;
    city: string;
    country: string;
    line1: string;
    line2: string | null;
    postalCode: string;
    stateOrProvince: string;
    artPieces?: { id: number }[]; 
}

export async function createClient(clientData: newClientData): Promise<newClientData> {
    const {
        fullName,
        email,
        mobileNumber,
        city,
        country,
        line1,
        line2,
        postalCode,
        stateOrProvince,
        artPieces,
      } = clientData;
    
  return db.clientData.create({
    data: {
        fullName,
        email,
        mobileNumber,
        city,
        country,
        line1,
        line2,
        postalCode,
        stateOrProvince,
        artPieces: {
          connect: artPieces?.map((art) => ({ id: art.id })) || [],
        },
      },
      include: {
        artPieces: true,
      },
  });
}














// function for updateing current client purchase array

// export async function updateClientArtPieces(
//   clientId: number,
//   newArtPieces: { id: number }[]
// ) {
//   try {
//     const updatedClient = await db.clientData.update({
//       where: { id: clientId },
//       data: {
//         artPieces: {
//           connect: newArtPieces.map((art) => ({
//             id: art.id,
//           })),
//         },
//       },
//       include: {
//         artPieces: true,
//       },
//     });

//     console.log("Client art pieces updated successfully:", updatedClient);
//     return updatedClient;
//   } catch (error) {
//     console.error("Error updating client art pieces:", error);
//     throw error;
//   }
// }
