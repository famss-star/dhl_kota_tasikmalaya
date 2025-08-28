-- CreateTable
CREATE TABLE "staff_members" (
    "id" TEXT NOT NULL PRIMARY KEY,
    "name" TEXT NOT NULL,
    "position" TEXT NOT NULL,
    "photo" TEXT,
    "type" TEXT NOT NULL,
    "isActive" BOOLEAN NOT NULL DEFAULT true,
    "createdAt" DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" DATETIME NOT NULL
);

-- CreateTable
CREATE TABLE "career_history" (
    "id" TEXT NOT NULL PRIMARY KEY,
    "position" TEXT NOT NULL,
    "institution" TEXT NOT NULL,
    "startDate" DATETIME NOT NULL,
    "endDate" DATETIME,
    "description" TEXT,
    "isActive" BOOLEAN NOT NULL DEFAULT false,
    "leaderId" TEXT,
    "staffMemberId" TEXT,
    "createdAt" DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" DATETIME NOT NULL,
    CONSTRAINT "career_history_leaderId_fkey" FOREIGN KEY ("leaderId") REFERENCES "leaders" ("id") ON DELETE CASCADE ON UPDATE CASCADE,
    CONSTRAINT "career_history_staffMemberId_fkey" FOREIGN KEY ("staffMemberId") REFERENCES "staff_members" ("id") ON DELETE CASCADE ON UPDATE CASCADE
);
