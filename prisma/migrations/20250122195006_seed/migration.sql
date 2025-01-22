-- CreateTable
CREATE TABLE "ArtPiece" (
    "id" INTEGER NOT NULL PRIMARY KEY AUTOINCREMENT,
    "title" TEXT NOT NULL,
    "medium" TEXT NOT NULL,
    "price" REAL NOT NULL,
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
    CONSTRAINT "ArtPiece_clientId_fkey" FOREIGN KEY ("clientId") REFERENCES "ClientData" ("id") ON DELETE SET NULL ON UPDATE CASCADE
);

-- CreateTable
CREATE TABLE "ClientData" (
    "id" INTEGER NOT NULL PRIMARY KEY AUTOINCREMENT,
    "fullName" TEXT NOT NULL,
    "email" TEXT NOT NULL,
    "mobileNumber" TEXT,
    "city" TEXT NOT NULL,
    "country" TEXT NOT NULL,
    "line1" TEXT NOT NULL,
    "line2" TEXT,
    "postalCode" TEXT NOT NULL,
    "stateOrProvince" TEXT NOT NULL
);

-- CreateIndex
CREATE UNIQUE INDEX "ClientData_email_key" ON "ClientData"("email");
