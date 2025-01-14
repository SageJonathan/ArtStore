import type { ArtPiece, ClientData } from '@prisma/client';
import { db } from '../../db';


export type ArtWithData = ArtPiece & {
  client: ClientData | null; 
};

export type ArtSold = {
  artPieceId: number;
  email: string;
};

export async function displayArt(): Promise<ArtWithData[]> {
  return db.artPiece.findMany({
    include: {
      client: true, 
    },
  });
}

export async function updateInventory(artSold: ArtSold) {
  const { artPieceId, email } = artSold;

  const client = await db.clientData.findUnique({
    where: { email },
  });

  if (!client) {
    throw new Error(`Client with email ${email} does not exist.`);
  }

  const clientId = client.id;

  const artPiece = await db.artPiece.findUnique({
    where: { id: artPieceId },
  });

  if (!artPiece) {
    throw new Error(`Art piece with ID ${artPieceId} does not exist.`);
  }

  if (!artPiece.inStock) {
    throw new Error(`Art piece with ID ${artPieceId} is already sold.`);
  }

  return await db.artPiece.update({
    where: {
      id: artPieceId,
    },
    data: {
      inStock: false,
      clientId: clientId,
    },
  });
}

export async function getArtShippingData(artSold: ArtSold) {
  const { artPieceId, email } = artSold;
// Include some verification 
  const [artPiece, client] = await Promise.all([
    db.artPiece.findUnique({ where: { id: artPieceId } }),
    db.clientData.findUnique({ where: { email }, include: { artPieces: true } })
  ]);
  return artPiece && client?.artPieces.some((art) => art.id === artPieceId) ? artPiece : null;
}




