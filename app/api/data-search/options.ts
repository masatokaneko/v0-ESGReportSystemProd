import { NextResponse } from "next/server"
import { prisma } from "@/lib/prisma"

export async function GET() {
  const categories = await prisma.kpiCategory.findMany({
    where: { deletedAt: null },
    select: { id: true, code: true, name: true },
    orderBy: { code: "asc" },
  })
  const entities = await prisma.entity.findMany({
    where: { deletedAt: null },
    select: { id: true, name: true },
    orderBy: { name: "asc" },
  })
  // 年度はKpiDataからdistinctで取得
  const years = await prisma.kpiData.findMany({
    where: { deletedAt: null },
    select: { fiscalYear: true },
    distinct: ["fiscalYear"],
    orderBy: { fiscalYear: "desc" },
  })
  return NextResponse.json({
    categories,
    entities,
    years: years.map(y => y.fiscalYear),
  })
} 