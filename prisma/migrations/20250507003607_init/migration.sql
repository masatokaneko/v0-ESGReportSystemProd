-- CreateEnum
CREATE TYPE "EntityType" AS ENUM ('COMPANY', 'SITE', 'PLANT');

-- CreateEnum
CREATE TYPE "SourceType" AS ENUM ('API', 'CSV', 'OCR', 'AGENT', 'MOCK');

-- CreateEnum
CREATE TYPE "ReportStatus" AS ENUM ('DRAFT', 'IN_REVIEW', 'ASSURED');

-- CreateEnum
CREATE TYPE "ReportType" AS ENUM ('PDF', 'XBRL');

-- CreateTable
CREATE TABLE "Entity" (
    "id" TEXT NOT NULL,
    "name" TEXT NOT NULL,
    "type" "EntityType" NOT NULL,
    "parentId" TEXT,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,
    "deletedAt" TIMESTAMP(3),

    CONSTRAINT "Entity_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "KpiCategory" (
    "id" TEXT NOT NULL,
    "code" TEXT NOT NULL,
    "name" TEXT NOT NULL,
    "description" TEXT,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,
    "deletedAt" TIMESTAMP(3),

    CONSTRAINT "KpiCategory_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "KpiDef" (
    "id" TEXT NOT NULL,
    "code" TEXT NOT NULL,
    "name" TEXT NOT NULL,
    "description" TEXT,
    "unit" TEXT NOT NULL,
    "categoryId" TEXT NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,
    "deletedAt" TIMESTAMP(3),

    CONSTRAINT "KpiDef_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "KpiData" (
    "id" TEXT NOT NULL,
    "kpiId" TEXT NOT NULL,
    "entityId" TEXT NOT NULL,
    "fiscalYear" INTEGER NOT NULL,
    "value" DECIMAL(20,6) NOT NULL,
    "sourceType" "SourceType" NOT NULL,
    "sourceId" TEXT,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,
    "deletedAt" TIMESTAMP(3),

    CONSTRAINT "KpiData_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "AssuranceRecord" (
    "id" TEXT NOT NULL,
    "reportType" "ReportType" NOT NULL,
    "status" "ReportStatus" NOT NULL,
    "fiscalYear" INTEGER NOT NULL,
    "entityId" TEXT NOT NULL,
    "assuredBy" TEXT,
    "assuredAt" TIMESTAMP(3),
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,
    "deletedAt" TIMESTAMP(3),

    CONSTRAINT "AssuranceRecord_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "User" (
    "id" TEXT NOT NULL,
    "email" TEXT NOT NULL,
    "name" TEXT,
    "password" TEXT NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,
    "deletedAt" TIMESTAMP(3),

    CONSTRAINT "User_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "UserEntityAccess" (
    "id" TEXT NOT NULL,
    "userId" TEXT NOT NULL,
    "entityId" TEXT NOT NULL,
    "role" TEXT NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,
    "deletedAt" TIMESTAMP(3),

    CONSTRAINT "UserEntityAccess_pkey" PRIMARY KEY ("id")
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

-- AddForeignKey
ALTER TABLE "Entity" ADD CONSTRAINT "Entity_parentId_fkey" FOREIGN KEY ("parentId") REFERENCES "Entity"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "KpiDef" ADD CONSTRAINT "KpiDef_categoryId_fkey" FOREIGN KEY ("categoryId") REFERENCES "KpiCategory"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "KpiData" ADD CONSTRAINT "KpiData_kpiId_fkey" FOREIGN KEY ("kpiId") REFERENCES "KpiDef"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "KpiData" ADD CONSTRAINT "KpiData_entityId_fkey" FOREIGN KEY ("entityId") REFERENCES "Entity"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "AssuranceRecord" ADD CONSTRAINT "AssuranceRecord_entityId_fkey" FOREIGN KEY ("entityId") REFERENCES "Entity"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "UserEntityAccess" ADD CONSTRAINT "UserEntityAccess_userId_fkey" FOREIGN KEY ("userId") REFERENCES "User"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "UserEntityAccess" ADD CONSTRAINT "UserEntityAccess_entityId_fkey" FOREIGN KEY ("entityId") REFERENCES "Entity"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
