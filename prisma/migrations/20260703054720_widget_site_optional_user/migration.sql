-- RedefineTables
PRAGMA defer_foreign_keys=ON;
PRAGMA foreign_keys=OFF;
CREATE TABLE "new_WidgetSite" (
    "id" TEXT NOT NULL PRIMARY KEY,
    "userId" TEXT,
    "siteKey" TEXT NOT NULL,
    "domain" TEXT NOT NULL,
    "sourceLang" TEXT NOT NULL DEFAULT 'ru',
    "targetLangs" TEXT NOT NULL,
    "createdAt" DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP,
    CONSTRAINT "WidgetSite_userId_fkey" FOREIGN KEY ("userId") REFERENCES "User" ("id") ON DELETE CASCADE ON UPDATE CASCADE
);
INSERT INTO "new_WidgetSite" ("createdAt", "domain", "id", "siteKey", "sourceLang", "targetLangs", "userId") SELECT "createdAt", "domain", "id", "siteKey", "sourceLang", "targetLangs", "userId" FROM "WidgetSite";
DROP TABLE "WidgetSite";
ALTER TABLE "new_WidgetSite" RENAME TO "WidgetSite";
CREATE UNIQUE INDEX "WidgetSite_siteKey_key" ON "WidgetSite"("siteKey");
PRAGMA foreign_keys=ON;
PRAGMA defer_foreign_keys=OFF;
