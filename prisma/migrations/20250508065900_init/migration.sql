-- CreateTable
CREATE TABLE "Entity" (
    "id" TEXT NOT NULL PRIMARY KEY,
    "name" TEXT NOT NULL,
    "type" TEXT NOT NULL,
    "parentId" TEXT,
    "createdAt" DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" DATETIME NOT NULL,
    "deletedAt" DATETIME,
    CONSTRAINT "Entity_parentId_fkey" FOREIGN KEY ("parentId") REFERENCES "Entity" ("id") ON DELETE SET NULL ON UPDATE CASCADE
);

-- CreateTable
CREATE TABLE "KpiCategory" (
    "id" TEXT NOT NULL PRIMARY KEY,
    "code" TEXT NOT NULL,
    "name" TEXT NOT NULL,
    "description" TEXT,
    "createdAt" DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" DATETIME NOT NULL,
    "deletedAt" DATETIME
);

-- CreateTable
CREATE TABLE "KpiDef" (
    "id" TEXT NOT NULL PRIMARY KEY,
    "code" TEXT NOT NULL,
    "name" TEXT NOT NULL,
    "description" TEXT,
    "unit" TEXT NOT NULL,
    "categoryId" TEXT NOT NULL,
    "createdAt" DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" DATETIME NOT NULL,
    "deletedAt" DATETIME,
    CONSTRAINT "KpiDef_categoryId_fkey" FOREIGN KEY ("categoryId") REFERENCES "KpiCategory" ("id") ON DELETE RESTRICT ON UPDATE CASCADE
);

-- CreateTable
CREATE TABLE "KpiData" (
    "id" TEXT NOT NULL PRIMARY KEY,
    "kpiId" TEXT NOT NULL,
    "entityId" TEXT NOT NULL,
    "fiscalYear" INTEGER NOT NULL,
    "value" REAL NOT NULL,
    "sourceType" TEXT NOT NULL,
    "sourceId" TEXT,
    "createdAt" DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" DATETIME NOT NULL,
    "deletedAt" DATETIME,
    CONSTRAINT "KpiData_kpiId_fkey" FOREIGN KEY ("kpiId") REFERENCES "KpiDef" ("id") ON DELETE RESTRICT ON UPDATE CASCADE,
    CONSTRAINT "KpiData_entityId_fkey" FOREIGN KEY ("entityId") REFERENCES "Entity" ("id") ON DELETE RESTRICT ON UPDATE CASCADE
);

-- CreateTable
CREATE TABLE "AssuranceRecord" (
    "id" TEXT NOT NULL PRIMARY KEY,
    "reportType" TEXT NOT NULL,
    "status" TEXT NOT NULL,
    "fiscalYear" INTEGER NOT NULL,
    "entityId" TEXT NOT NULL,
    "assuredBy" TEXT,
    "assuredAt" DATETIME,
    "createdAt" DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" DATETIME NOT NULL,
    "deletedAt" DATETIME,
    CONSTRAINT "AssuranceRecord_entityId_fkey" FOREIGN KEY ("entityId") REFERENCES "Entity" ("id") ON DELETE RESTRICT ON UPDATE CASCADE
);

-- CreateTable
CREATE TABLE "User" (
    "id" TEXT NOT NULL PRIMARY KEY,
    "email" TEXT NOT NULL,
    "name" TEXT,
    "password" TEXT NOT NULL,
    "createdAt" DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" DATETIME NOT NULL,
    "deletedAt" DATETIME
);

-- CreateTable
CREATE TABLE "UserEntityAccess" (
    "id" TEXT NOT NULL PRIMARY KEY,
    "userId" TEXT NOT NULL,
    "entityId" TEXT NOT NULL,
    "role" TEXT NOT NULL,
    "createdAt" DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" DATETIME NOT NULL,
    "deletedAt" DATETIME,
    CONSTRAINT "UserEntityAccess_userId_fkey" FOREIGN KEY ("userId") REFERENCES "User" ("id") ON DELETE RESTRICT ON UPDATE CASCADE,
    CONSTRAINT "UserEntityAccess_entityId_fkey" FOREIGN KEY ("entityId") REFERENCES "Entity" ("id") ON DELETE RESTRICT ON UPDATE CASCADE
);

-- CreateIndex
CREATE INDEX "Entity_parentId_idx" ON "Entity"("parentId");

-- CreateIndex
CREATE UNIQUE INDEX "KpiCategory_code_key" ON "KpiCategory"("code");

-- CreateIndex
CREATE UNIQUE INDEX "KpiDef_code_key" ON "KpiDef"("code");

-- CreateIndex
CREATE INDEX "KpiDef_categoryId_idx" ON "KpiDef"("categoryId");

-- CreateIndex
CREATE INDEX "KpiData_fiscalYear_idx" ON "KpiData"("fiscalYear");

-- CreateIndex
CREATE INDEX "KpiData_entityId_idx" ON "KpiData"("entityId");

-- CreateIndex
CREATE UNIQUE INDEX "KpiData_kpiId_entityId_fiscalYear_key" ON "KpiData"("kpiId", "entityId", "fiscalYear");

-- CreateIndex
CREATE INDEX "AssuranceRecord_entityId_idx" ON "AssuranceRecord"("entityId");

-- CreateIndex
CREATE UNIQUE INDEX "User_email_key" ON "User"("email");

-- CreateIndex
CREATE INDEX "UserEntityAccess_userId_idx" ON "UserEntityAccess"("userId");

-- CreateIndex
CREATE INDEX "UserEntityAccess_entityId_idx" ON "UserEntityAccess"("entityId");

-- CreateIndex
CREATE UNIQUE INDEX "UserEntityAccess_userId_entityId_key" ON "UserEntityAccess"("userId", "entityId");
