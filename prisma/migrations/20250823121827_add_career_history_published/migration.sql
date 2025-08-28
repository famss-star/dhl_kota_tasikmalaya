-- RedefineTables
PRAGMA defer_foreign_keys=ON;
PRAGMA foreign_keys=OFF;
CREATE TABLE "new_career_history" (
    "id" TEXT NOT NULL PRIMARY KEY,
    "position" TEXT NOT NULL,
    "institution" TEXT NOT NULL,
    "startDate" DATETIME NOT NULL,
    "endDate" DATETIME,
    "description" TEXT,
    "isActive" BOOLEAN NOT NULL DEFAULT false,
    "isPublished" BOOLEAN NOT NULL DEFAULT false,
    "leaderId" TEXT,
    "staffMemberId" TEXT,
    "createdAt" DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" DATETIME NOT NULL,
    CONSTRAINT "career_history_leaderId_fkey" FOREIGN KEY ("leaderId") REFERENCES "leaders" ("id") ON DELETE CASCADE ON UPDATE CASCADE,
    CONSTRAINT "career_history_staffMemberId_fkey" FOREIGN KEY ("staffMemberId") REFERENCES "staff_members" ("id") ON DELETE CASCADE ON UPDATE CASCADE
);
INSERT INTO "new_career_history" ("createdAt", "description", "endDate", "id", "institution", "isActive", "leaderId", "position", "staffMemberId", "startDate", "updatedAt") SELECT "createdAt", "description", "endDate", "id", "institution", "isActive", "leaderId", "position", "staffMemberId", "startDate", "updatedAt" FROM "career_history";
DROP TABLE "career_history";
ALTER TABLE "new_career_history" RENAME TO "career_history";
PRAGMA foreign_keys=ON;
PRAGMA defer_foreign_keys=OFF;
