import { db } from "../../db";

export type clientEmail = {
    email: string;
}

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
};

export type existingClientData = {
    email: string;
    artPieces?: { id: number }[];
}


export async function checkClient (client:clientEmail):Promise<boolean>{
    const { email } = client; 
    
      const clientCount = await db.clientData.count({
        where: {
            email: email,
          },
        });
        return clientCount > 0;
      
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

export async function updateClient (clientData: existingClientData): Promise<newClientData> {
    const {
        email,
        artPieces,
      } = clientData;

return db.clientData.update ({
    where: {
        email: email, 
      },
      data: {
        artPieces: {
          connect: artPieces?.map((art) => ({ id: art.id })),
        },
      },
      include: {
        artPieces: true, 
      },
})
}
 

