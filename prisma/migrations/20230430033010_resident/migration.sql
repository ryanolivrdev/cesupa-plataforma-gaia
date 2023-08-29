-- CreateTable
CREATE TABLE "Resident" (
    "id" TEXT NOT NULL PRIMARY KEY,
    "createdAt" DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" DATETIME NOT NULL,
    "name" TEXT NOT NULL,
    "cpf" TEXT NOT NULL,
    "rg" TEXT NOT NULL,
    "birthDate" DATETIME NOT NULL,
    "phone" TEXT NOT NULL,
    "status" TEXT NOT NULL DEFAULT 'active'
);
