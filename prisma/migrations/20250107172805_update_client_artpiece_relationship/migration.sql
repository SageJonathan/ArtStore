-- RedefineTables
PRAGMA defer_foreign_keys=ON;
PRAGMA foreign_keys=OFF;
CREATE TABLE "new_ArtPiece" (
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
INSERT INTO "new_ArtPiece" ("clientId", "description", "id", "imageUrlBack", "imageUrlFront", "inStock", "isVertical", "medium", "price", "size", "title", "weight") SELECT "clientId", "description", "id", "imageUrlBack", "imageUrlFront", "inStock", "isVertical", "medium", "price", "size", "title", "weight" FROM "ArtPiece";
DROP TABLE "ArtPiece";
ALTER TABLE "new_ArtPiece" RENAME TO "ArtPiece";
PRAGMA foreign_keys=ON;
PRAGMA defer_foreign_keys=OFF;
