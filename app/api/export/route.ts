import { NextResponse } from "next/server"
import { prisma } from "@/lib/prisma"

export async function GET(request: Request) {
  try {
    const { searchParams } = new URL(request.url)
    const format = searchParams.get("format") || "csv"
    const category = searchParams.get("category")
    const entityId = searchParams.get("entityId")
    const fiscalYear = searchParams.get("fiscalYear")

    // 検索条件の構築
    const where: any = {
      deletedAt: null,
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
    const data = await prisma.kpiData.findMany({
      where,
      include: {
        kpiDef: {
          include: {
            category: true,
          },
        },
        entity: true,
      },
      orderBy: [
        { entity: { name: "asc" } },
        { kpiDef: { name: "asc" } },
        { fiscalYear: "asc" },
      ],
    })

    // データの整形
    const formattedData = data.map((item) => ({
      "エンティティ": item.entity.name,
      "KPI": item.kpiDef.name,
      "カテゴリ": item.kpiDef.category.name,
      "単位": item.kpiDef.unit,
      "値": item.value.toString(),
      "年度": item.fiscalYear,
      "データソース": item.sourceType,
      "作成日時": item.createdAt.toISOString(),
    }))

    if (format === "csv") {
      // CSVヘッダー
      const headers = Object.keys(formattedData[0])
      const csvContent = [
        headers.join(","),
        ...formattedData.map((row) =>
          headers.map((header) => `"${row[header]}"`).join(",")
        ),
      ].join("\n")

      return new NextResponse(csvContent, {
        headers: {
          "Content-Type": "text/csv;charset=utf-8",
          "Content-Disposition": `attachment; filename="esg_data_${new Date()
            .toISOString()
            .split("T")[0]}.csv"`,
        },
      })
    }

    // JSON形式で返す
    return NextResponse.json({
      data: formattedData,
    })
  } catch (error) {
    console.error("データエクスポートエラー:", error)
    return NextResponse.json(
      { error: "データのエクスポートに失敗しました" },
      { status: 500 }
    )
  }
} 