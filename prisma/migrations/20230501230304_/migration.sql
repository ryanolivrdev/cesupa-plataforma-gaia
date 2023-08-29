-- RedefineTables
PRAGMA foreign_keys=OFF;
CREATE TABLE "new_Resident" (
    "id" TEXT NOT NULL PRIMARY KEY,
    "createdAt" DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" DATETIME NOT NULL,
    "name" TEXT NOT NULL,
    "cpf" TEXT,
    "rg" TEXT,
    "birthDate" DATETIME NOT NULL,
    "phone" TEXT,
    "status" TEXT NOT NULL DEFAULT 'active'
);
INSERT INTO "new_Resident" ("birthDate", "cpf", "createdAt", "id", "name", "phone", "rg", "status", "updatedAt") SELECT "birthDate", "cpf", "createdAt", "id", "name", "phone", "rg", "status", "updatedAt" FROM "Resident";
DROP TABLE "Resident";
ALTER TABLE "new_Resident" RENAME TO "Resident";
PRAGMA foreign_key_check;
PRAGMA foreign_keys=ON;
