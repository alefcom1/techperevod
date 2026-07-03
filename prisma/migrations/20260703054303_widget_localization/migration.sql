-- CreateTable
CREATE TABLE "WidgetSite" (
    "id" TEXT NOT NULL PRIMARY KEY,
    "userId" TEXT NOT NULL,
    "siteKey" TEXT NOT NULL,
    "domain" TEXT NOT NULL,
    "sourceLang" TEXT NOT NULL DEFAULT 'ru',
    "targetLangs" TEXT NOT NULL,
    "createdAt" DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP,
    CONSTRAINT "WidgetSite_userId_fkey" FOREIGN KEY ("userId") REFERENCES "User" ("id") ON DELETE CASCADE ON UPDATE CASCADE
);

-- CreateTable
CREATE TABLE "WidgetTranslation" (
    "id" TEXT NOT NULL PRIMARY KEY,
    "siteId" TEXT NOT NULL,
    "pageUrl" TEXT NOT NULL,
    "targetLang" TEXT NOT NULL,
    "textHash" TEXT NOT NULL,
    "sourceText" TEXT NOT NULL,
    "translation" TEXT NOT NULL,
    "editedByUser" BOOLEAN NOT NULL DEFAULT false,
    "createdAt" DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" DATETIME NOT NULL,
    CONSTRAINT "WidgetTranslation_siteId_fkey" FOREIGN KEY ("siteId") REFERENCES "WidgetSite" ("id") ON DELETE CASCADE ON UPDATE CASCADE
);

-- CreateIndex
CREATE UNIQUE INDEX "WidgetSite_siteKey_key" ON "WidgetSite"("siteKey");

-- CreateIndex
CREATE INDEX "WidgetTranslation_siteId_pageUrl_idx" ON "WidgetTranslation"("siteId", "pageUrl");

-- CreateIndex
CREATE UNIQUE INDEX "WidgetTranslation_siteId_targetLang_textHash_key" ON "WidgetTranslation"("siteId", "targetLang", "textHash");
