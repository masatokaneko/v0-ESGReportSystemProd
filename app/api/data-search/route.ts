import { NextResponse } from "next/server"
import { prisma } from "@/lib/prisma"

export async function GET(request: Request) {
  try {
    const { searchParams } = new URL(request.url)
    const keyword = searchParams.get("keyword")
    const category = searchParams.get("category")
    const entityId = searchParams.get("entityId")
    const fiscalYear = searchParams.get("fiscalYear")
    const page = parseInt(searchParams.get("page") || "1")
    const limit = parseInt(searchParams.get("limit") || "10")
    const skip = (page - 1) * limit

    // 検索条件の構築
    const where: any = {
      deletedAt: null,
    }

    if (keyword) {
      where.OR = [
        { kpiDef: { name: { contains: keyword, mode: "insensitive" } } },
        { entity: { name: { contains: keyword, mode: "insensitive" } } },
      ]
    }

    if (category) {
      where.kpiDef = {
        ...where.kpiDef,
        categoryId: category,
      }
    }

    if (entityId) {
      where.entityId = entityId
    }

    if (fiscalYear) {
      where.fiscalYear = parseInt(fiscalYear)
    }

    // データの取得
    const [data, total] = await Promise.all([
      prisma.kpiData.findMany({
        where,
        include: {
          kpiDef: {
            include: {
              category: true,
            },
          },
          entity: true,
        },
        orderBy: { createdAt: "desc" },
        skip,
        take: limit,
      }),
      prisma.kpiData.count({ where }),
    ])

    // レスポンスの整形
    const formattedData = data.map((item) => ({
      id: item.id,
      title: `${item.entity.name} ${item.kpiDef.name}`,
      category: item.kpiDef.category.name,
      entityName: item.entity.name,
      kpiName: item.kpiDef.name,
      unit: item.kpiDef.unit,
      value: item.value.toString(),
      fiscalYear: item.fiscalYear,
      sourceType: item.sourceType,
      createdAt: item.createdAt,
    }))

    return NextResponse.json({
      data: formattedData,
      pagination: {
        total,
        page,
        limit,
        totalPages: Math.ceil(total / limit),
      },
    })
  } catch (error) {
    console.error("データ検索エラー:", error)
    return NextResponse.json(
      { error: "データの検索に失敗しました" },
      { status: 500 }
    )
  }
} 