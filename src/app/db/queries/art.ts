import type { ArtPiece, ClientData } from '@prisma/client';
import { db } from '../../db';

export type ArtWithData = ArtPiece & {
  id: number;
  title: string;
  description: string;
  medium: string;
  price: number;
  isVertical: boolean;
  size: string;
  weight: string;
  inStock: boolean;
  imageUrlFront: string;
  imageUrlBack: string;
  clientId: number | null;
  client: ClientData | null;
};

export type DisplayArtData = Pick<
  ArtWithData,
  'imageUrlFront' | 'title' | 'size' | 'isVertical' | 'inStock'
>;

export function displayArt(): Promise<DisplayArtData[]> {
  return db.artPiece.findMany({
    select: {
      imageUrlFront: true,
      title: true,
      size: true,
      isVertical: true,
      inStock: true,
    },
  });
}
