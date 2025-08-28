/*
  Warnings:

  - You are about to drop the column `namaBidang` on the `bidang` table. All the data in the column will be lost.
  - You are about to drop the column `order` on the `bidang` table. All the data in the column will be lost.
  - You are about to drop the column `status` on the `bidang` table. All the data in the column will be lost.
  - Added the required column `name` to the `bidang` table without a default value. This is not possible if the table is not empty.

*/
-- CreateTable
CREATE TABLE "employee_statistics" (
    "id" TEXT NOT NULL PRIMARY KEY,
    "category" TEXT NOT NULL,
    "subcategory" TEXT NOT NULL,
    "count" INTEGER NOT NULL,
    "description" TEXT,
    "order" INTEGER NOT NULL DEFAULT 0,
    "isActive" BOOLEAN NOT NULL DEFAULT true,
    "createdAt" DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" DATETIME NOT NULL
);

-- RedefineTables
PRAGMA defer_foreign_keys=ON;
PRAGMA foreign_keys=OFF;
CREATE TABLE "new_bidang" (
    "id" TEXT NOT NULL PRIMARY KEY,
    "slug" TEXT NOT NULL,
    "name" TEXT NOT NULL,
    "aboutTitle" TEXT NOT NULL,
    "aboutDescription" TEXT NOT NULL,
    "tugasPokokTitle" TEXT NOT NULL,
    "tugasPokok" TEXT NOT NULL,
    "fungsiTitle" TEXT NOT NULL,
    "fungsi" TEXT NOT NULL,
    "isActive" BOOLEAN NOT NULL DEFAULT true,
    "createdAt" DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" DATETIME NOT NULL
);
INSERT INTO "new_bidang" ("aboutDescription", "aboutTitle", "createdAt", "fungsi", "fungsiTitle", "id", "slug", "tugasPokok", "tugasPokokTitle", "updatedAt") SELECT "aboutDescription", "aboutTitle", "createdAt", "fungsi", "fungsiTitle", "id", "slug", "tugasPokok", "tugasPokokTitle", "updatedAt" FROM "bidang";
DROP TABLE "bidang";
ALTER TABLE "new_bidang" RENAME TO "bidang";
CREATE UNIQUE INDEX "bidang_slug_key" ON "bidang"("slug");
PRAGMA foreign_keys=ON;
PRAGMA defer_foreign_keys=OFF;

-- CreateIndex
CREATE UNIQUE INDEX "employee_statistics_category_subcategory_key" ON "employee_statistics"("category", "subcategory");
