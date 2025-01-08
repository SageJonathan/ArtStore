import type { ArtPiece, ClientData } from '@prisma/client';
import { db } from '../../db';


export type ArtWithData = ArtPiece & {
  client: ClientData | null; 
};


export async function displayArt(): Promise<ArtWithData[]> {
  return db.artPiece.findMany({
    include: {
      client: true, 
    },
  });
}

