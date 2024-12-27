-- CreateTable
CREATE TABLE "ArtPiece" (
    "id" INTEGER NOT NULL PRIMARY KEY AUTOINCREMENT,
    "title" TEXT NOT NULL,
    "description" TEXT,
    "price" REAL NOT NULL,
    "imageUrl" TEXT,
    "inStock" BOOLEAN NOT NULL DEFAULT true,
    "buyerName" TEXT,
    "buyerEmail" TEXT,
    "buyerAddress" TEXT
);

-- CreateIndex
CREATE UNIQUE INDEX "ArtPiece_buyerEmail_key" ON "ArtPiece"("buyerEmail");
