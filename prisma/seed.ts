import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();
// weight in lbs
// size in inches
                                // ***** Update shipping W/W/H/L to actual units******
async function main() {
  const artPiecesData = [
    {
      title: 'Charme vieilot',
      medium: 'oil',
      price: 350,
      isVertical: false,
      size: '18.5 x 22.5"',  
      weight: '4',
      inStock: true,
      imageUrlFront: '/art2.webp',
      imageUrlBack: '/artback2.webp', 
      clientId: null,
      shippingHeight: '19.5',
      shippingLength: '23.5',
      shippingWidth: '3',
      shippingWeight: '7',
    },
    {
      title: 'Féérie hivernale (G)',
      medium: 'oil',
      price: 275,
      isVertical: false,
      size: '14 x 18"', 
      weight: '3.6',
      inStock: true,
      imageUrlFront: '/art3.webp',
      imageUrlBack: '/artback3.webp',  
      clientId: null,
      shippingHeight: '15',
      shippingLength: '19',
      shippingWidth: '3',
      shippingWeight: '6.6',
    },
    {
      title: 'Féérie hivernale (P)',
      medium: 'oil',
      price: 200,
      isVertical: false,
      size: '12 x 17.5"', 
      weight: '2.2',
      inStock: true,
      imageUrlFront: '/art4.webp',
      imageUrlBack: '/artback4.webp',
      clientId: null,
      shippingHeight: '13',
      shippingLength: '18.5',
      shippingWidth: '3',
      shippingWeight: '5.2',
    },
    {
      title: 'Les rayons du soleil',
      medium: 'oil',
      price: 150,
      isVertical: false,              
      size: '12 x 14"', 
      weight: '1.8',
      inStock: true,
      imageUrlFront: '/art5.webp',
      imageUrlBack: '/artback5.webp',
      clientId: null,
      shippingHeight: '13',
      shippingLength: '15',
      shippingWidth: '3',
      shippingWeight: '4.8',
    },
    {
      title: 'Détente ',
      medium: 'oil',
      price: 1,
      isVertical: false,
      size: '15 x 20"', 
      weight: '3',
      inStock: true,
      imageUrlFront: '/art6.webp',
      imageUrlBack: '/artback6.webp',
      clientId: null,
      shippingHeight: '1',
      shippingLength: '1',
      shippingWidth: '1',
      shippingWeight: '0.5',
    },
    {
      title: 'Refuge',
      medium: 'oil',
      price: 500,
      isVertical: false,
      size: '20 x 25"', 
      weight: '4',
      inStock: false,
      imageUrlFront: '/art7.webp',
      imageUrlBack: '/artback7.webp',  
      clientId: null,
      shippingHeight: '21',
      shippingLength: '26',
      shippingWidth: '3',
      shippingWeight: '7',
    },
    {
      title: "Un regard vers l'avenir ",
      medium: 'oil',
      price: 260,
      isVertical: false,
      size: '19 x 25"', 
      weight: '4',
      inStock: true,
      imageUrlFront: '/art8.webp',
      imageUrlBack: '/artback8.webp',  
      clientId: null,
      shippingHeight: '20',
      shippingLength: '26',
      shippingWidth: '3',
      shippingWeight: '7',
    },
    {
      title: 'Luminosité',
      medium: 'oil',
      price: 400,
      isVertical: false,
      size: '15 x 25"',  
      weight: '3.4',
      inStock: true,
      imageUrlFront: '/art9.webp',
      imageUrlBack: '/artback9.webp', 
      clientId: null,
      shippingHeight: '16',
      shippingLength: '26',
      shippingWidth: '3',
      shippingWeight: '6.4',
    },
    {
      title: 'Éloge à la nature',
      medium: 'oil',
      price: 425,
      isVertical: false,
      size: '22.5 x 26.5"', 
      weight: '5.2',
      inStock: true,
      imageUrlFront: '/art10.webp',
      imageUrlBack: '/artback10.webp', 
      clientId: null,
      shippingHeight: '23.5',
      shippingLength: '27.5',
      shippingWidth: '3',
      shippingWeight: '8.2',
    },
    {
      title: "L'écho d'automne",
      medium: 'oil',
      price: 450,
      isVertical: false,
      size: '25 x 29"',  
      weight: '5.6',
      inStock: true,
      imageUrlFront: '/art11.webp',
      imageUrlBack: '/artback11.webp',  
      clientId: null,
      shippingHeight: '26',
      shippingLength: '30',
      shippingWidth: '3',
      shippingWeight: '8.6',
    },
    {
      title: 'Les merveilles',
      medium: 'oil',
      price: 450,
      isVertical: false,
      size: '25 x 33"', 
      weight: '7.8',
      inStock: true,
      imageUrlFront: '/art12.webp',
      imageUrlBack: '/artback12.webp',  
      clientId: null,
      shippingHeight: '26',
      shippingLength: '34',
      shippingWidth: '3',
      shippingWeight: '10.8',
    },
    {
      title: 'Ressource Chalevoix',
      medium: 'oil',
      price: 450,
      isVertical: false,
      size: '22 x 28"',
      weight: '4.4',
      inStock: true,
      imageUrlFront: '/art13.webp',
      imageUrlBack: '/artback13.webp',  
      clientId: null,
      shippingHeight: '23',
      shippingLength: '29',
      shippingWidth: '3',
      shippingWeight: '7.4', 
    },
    {
      title: 'Fleur des Îles',
      medium: 'oil',
      price: 150,
      isVertical: true,
      size: '6.5 x 10.5"',  
      weight: '0.8',
      inStock: true,
      imageUrlFront: '/art1.webp',
      imageUrlBack: '/artback1.webp', 
      clientId: null,
      shippingHeight: '7.5',
      shippingLength: '11.5',
      shippingWidth: '3',
      shippingWeight: '3.8', 
    },
    {
      title: 'Un souvenir de jeunesse',
      medium: 'oil',
      price: 350,
      isVertical: true,
      size: '19 x 23"',  
      weight: '4.2',
      inStock: true,
      imageUrlFront: '/art14.webp',
      imageUrlBack: '/artback14.webp',  
      clientId: null,
      shippingHeight: '20',
      shippingLength: '24',
      shippingWidth: '3',
      shippingWeight: '7.2', 
    },
  ];
  

  for (const artPieceData of artPiecesData) {
    await prisma.artPiece.create({
      data: artPieceData,
    });
  }

  console.log(`Seeded ${artPiecesData.length} art pieces`);
}

main()
.then(async () => {
  await prisma.$disconnect()
})
  .catch((e) => {
    console.error(e);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });
