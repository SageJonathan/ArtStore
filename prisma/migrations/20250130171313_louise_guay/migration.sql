-- CreateTable
CREATE TABLE "ArtPiece" (
    "id" SERIAL NOT NULL,
    "title" TEXT NOT NULL,
    "medium" TEXT NOT NULL,
    "price" DOUBLE PRECISION NOT NULL,
    "isVertical" BOOLEAN NOT NULL,
    "size" TEXT NOT NULL,
    "weight" TEXT NOT NULL,
    "shippingHeight" TEXT NOT NULL,
    "shippingLength" TEXT NOT NULL,
    "shippingWidth" TEXT NOT NULL,
    "shippingWeight" TEXT NOT NULL,
    "inStock" BOOLEAN NOT NULL DEFAULT true,
    "imageUrlFront" TEXT NOT NULL,
    "imageUrlBack" TEXT NOT NULL,
    "clientId" INTEGER,

    CONSTRAINT "ArtPiece_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "ClientData" (
    "id" SERIAL NOT NULL,
    "fullName" TEXT NOT NULL,
    "email" TEXT NOT NULL,
    "mobileNumber" TEXT,
    "city" TEXT NOT NULL,
    "country" TEXT NOT NULL,
    "line1" TEXT NOT NULL,
    "line2" TEXT,
    "postalCode" TEXT NOT NULL,
    "stateOrProvince" TEXT NOT NULL,

    CONSTRAINT "ClientData_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE UNIQUE INDEX "ClientData_email_key" ON "ClientData"("email");

-- AddForeignKey
ALTER TABLE "ArtPiece" ADD CONSTRAINT "ArtPiece_clientId_fkey" FOREIGN KEY ("clientId") REFERENCES "ClientData"("id") ON DELETE SET NULL ON UPDATE CASCADE;
