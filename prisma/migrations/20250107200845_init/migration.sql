-- CreateTable
CREATE TABLE "ArtPiece" (
    "id" INTEGER NOT NULL PRIMARY KEY AUTOINCREMENT,
    "title" TEXT NOT NULL,
    "description" TEXT NOT NULL,
    "medium" TEXT NOT NULL,
    "price" REAL NOT NULL,
    "isVertical" BOOLEAN NOT NULL,
    "size" TEXT NOT NULL,
    "weight" TEXT NOT NULL,
    "inStock" BOOLEAN NOT NULL DEFAULT true,
    "imageUrlFront" TEXT NOT NULL,
    "imageUrlBack" TEXT NOT NULL,
    "clientId" INTEGER,
    CONSTRAINT "ArtPiece_clientId_fkey" FOREIGN KEY ("clientId") REFERENCES "ClientData" ("id") ON DELETE SET NULL ON UPDATE CASCADE
);

-- CreateTable
CREATE TABLE "ClientData" (
    "id" INTEGER NOT NULL PRIMARY KEY AUTOINCREMENT,
    "firstName" TEXT NOT NULL,
    "lastName" TEXT NOT NULL,
    "email" TEXT NOT NULL,
    "mobileNumber" TEXT NOT NULL,
    "shippingAddress" TEXT NOT NULL,
    "paymentAddress" TEXT NOT NULL,
    "recurringClient" BOOLEAN NOT NULL DEFAULT false
);

-- CreateIndex
CREATE UNIQUE INDEX "ClientData_email_key" ON "ClientData"("email");
