import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();
//size includes frames
// weight in lbs
async function main() {
  const artPiecesData = [
    {
      title: '?',
      description: '?',
      medium: 'oil',
      price: 150,
      isVertical: true,
      size: '6.5 x 10.5"',
      weight: '0.8',
      inStock: true,
      imageUrlFront: '/art1.png',
      imageUrlBack: '/artback1.png',
      clientId: null,
    },
    {
      title: 'Charme vieilot',
      description: '?',
      medium: 'oil',
      price: 350,
      isVertical: false,
      size: '18.5 x 22.5',
      weight: '4',
      inStock: true,
      imageUrlFront: '/art2.png',
      imageUrlBack: '/artback2.png',
      clientId: null,
    },
    {
      title: 'Féérie hivernale',
      description: '?',
      medium: 'oil',
      price: 275,
      isVertical: false,
      size: '14 x 18"',
      weight: '3.6',
      inStock: true,
      imageUrlFront: '/art3.png',
      imageUrlBack: '/artback3.png',
      clientId: null,
    },
    {
      title: 'Féérie hivernale',
      description: '?',
      medium: 'oil',
      price: 200,
      isVertical: false,
      size: '12x 17.5"',
      weight: '2.2',
      inStock: true,
      imageUrlFront: '/art4.png',
      imageUrlBack: '/artback4.png',
      clientId: null,
    },
    {
      title: 'Les rayons du soleil couchent',
      description: '?',
      medium: 'oil',
      price: 150,
      isVertical: false,
      size: '12 x 14"',
      weight: '1.8',
      inStock: true,
      imageUrlFront: '/art5.png',
      imageUrlBack: '/artback5.png',
      clientId: null,
    },
    {
      title: 'Détente ',
      description: '?',
      medium: 'oil',
      price: 300,
      isVertical: false,
      size: '15 x 20"',
      weight: '3',
      inStock: false,
      imageUrlFront: '/art6.png',
      imageUrlBack: '/artback6.png',
      clientId: null,
    },
    {
      title: 'Refuge',
      description: '?',
      medium: 'oil',
      price: 500,
      isVertical: false,
      size: '20 x 25"',
      weight: '4',
      inStock: false,
      imageUrlFront: '/art7.png',
      imageUrlBack: '/artback7.png',
      clientId: null,
    },
    {
      title: "Un regard vers l'avenir ",
      description: '?',
      medium: 'oil',
      price: 300,
      isVertical: false,
      size: '19 x 25"',
      weight: '4',
      inStock: true,
      imageUrlFront: '/art8.png',
      imageUrlBack: '/artback8.png',
      clientId: null,
    },
    {
      title: 'Luminosité',
      description: '?',
      medium: 'oil',
      price: 400,
      isVertical: false,
      size: '15 x 25"',
      weight: '3.4',
      inStock: true,
      imageUrlFront: '/art9.png',
      imageUrlBack: '/artback9.png',
      clientId: null,
    },
    {
      title: 'Éloge a la nature ',
      description: '?',
      medium: 'oil',
      price: 425,
      isVertical: false,
      size: '22.5 x 26.5"',
      weight: '5.2',
      inStock: true,
      imageUrlFront: '/art10.png',
      imageUrlBack: '/artback10.png',
      clientId: null,
    },
    {
      title: "L'écho d'automne qui résonne",
      description: '?',
      medium: 'oil',
      price: 450,
      isVertical: false,
      size: '25 x 29"',
      weight: '5.6',
      inStock: true,
      imageUrlFront: '/art11.png',
      imageUrlBack: '/artback11.png',
      clientId: null,
    },
    {
      title: 'Les merveilles de la nature',
      description: '?',
      medium: 'oil',
      price: 450,
      isVertical: false,
      size: '25 x 33"',
      weight: '7.8',
      inStock: true,
      imageUrlFront: '/art12.png',
      imageUrlBack: '/artback12.png',
      clientId: null,
    },
    {
      title: 'Ressource Chalevoix',
      description: '?',
      medium: 'oil',
      price: 450,
      isVertical: false,
      size: '22 x 28"',
      weight: '4.4',
      inStock: true,
      imageUrlFront: '/art13.png',
      imageUrlBack: '/artback13.png',
      clientId: null,
    },
    {
      title: 'Un souvenir de jeunesse',
      description: '?',
      medium: 'oil',
      price: 350,
      isVertical: true,
      size: '19 x 23"',
      weight: '4.2',
      inStock: true,
      imageUrlFront: '/art14.png',
      imageUrlBack: '/artback14.png',
      clientId: null,
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
    // process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });
