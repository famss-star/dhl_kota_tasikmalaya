/*
  Warnings:

  - Added the required column `education` to the `staff_members` table without a default value. This is not possible if the table is not empty.
  - Added the required column `employmentStatus` to the `staff_members` table without a default value. This is not possible if the table is not empty.

*/
-- RedefineTables
PRAGMA defer_foreign_keys=ON;
PRAGMA foreign_keys=OFF;
CREATE TABLE "new_staff_members" (
    "id" TEXT NOT NULL PRIMARY KEY,
    "name" TEXT NOT NULL,
    "position" TEXT NOT NULL,
    "photo" TEXT,
    "type" TEXT NOT NULL,
    "employmentStatus" TEXT NOT NULL,
    "education" TEXT NOT NULL,
    "rank" TEXT,
    "birthDate" DATETIME,
    "isActive" BOOLEAN NOT NULL DEFAULT true,
    "isPublished" BOOLEAN NOT NULL DEFAULT true,
    "createdAt" DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" DATETIME NOT NULL
);
INSERT INTO "new_staff_members" ("createdAt", "id", "isActive", "isPublished", "name", "photo", "position", "type", "updatedAt") SELECT "createdAt", "id", "isActive", "isPublished", "name", "photo", "position", "type", "updatedAt" FROM "staff_members";
DROP TABLE "staff_members";
ALTER TABLE "new_staff_members" RENAME TO "staff_members";
PRAGMA foreign_keys=ON;
PRAGMA defer_foreign_keys=OFF;
