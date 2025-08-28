-- CreateTable
CREATE TABLE "organization_layout" (
    "id" TEXT NOT NULL PRIMARY KEY,
    "positionId" TEXT NOT NULL,
    "staffId" TEXT,
    "row" INTEGER NOT NULL,
    "col" INTEGER NOT NULL,
    "colSpan" INTEGER NOT NULL,
    "level" INTEGER NOT NULL,
    "isActive" BOOLEAN NOT NULL DEFAULT true,
    "createdAt" DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" DATETIME NOT NULL,
    CONSTRAINT "organization_layout_staffId_fkey" FOREIGN KEY ("staffId") REFERENCES "staff_members" ("id") ON DELETE SET NULL ON UPDATE CASCADE
);

-- CreateIndex
CREATE UNIQUE INDEX "organization_layout_positionId_key" ON "organization_layout"("positionId");
