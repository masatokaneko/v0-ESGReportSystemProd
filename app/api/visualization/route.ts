import { NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";

export const dynamic = "force-dynamic";

export async function GET(request: Request) {
  try {
    const { searchParams } = new URL(request.url);
    const kpiId = searchParams.get("kpiId");
    const entityId = searchParams.get("entityId");
    const categoryId = searchParams.get("categoryId");
    const startYear = parseInt(searchParams.get("startYear") || "2022");
    const endYear = parseInt(searchParams.get("endYear") || "2023");

    // データの取得
    const data = await prisma.kpiData.findMany({
      where: {
        deletedAt: null,
        ...(kpiId && { kpiId }),
        ...(entityId && { entityId }),
        ...(categoryId && { kpiDef: { categoryId } }),
        fiscalYear: {
          gte: startYear,
          lte: endYear,
        },
      },
      include: {
        kpiDef: {
          include: {
            category: true,
          },
        },
        entity: true,
      },
      orderBy: [{ fiscalYear: "asc" }, { entity: { name: "asc" } }],
    });

    // データの整形
    const formattedData = data.reduce((acc: any, item) => {
      const key = `${item.entity.name}_${item.kpiDef.name}`;
      if (!acc[key]) {
        acc[key] = {
          name: `${item.entity.name} ${item.kpiDef.name}`,
          category: item.kpiDef.category.name,
          unit: item.kpiDef.unit,
          data: [],
        };
      }
      acc[key].data.push({
        year: item.fiscalYear,
        value: parseFloat(item.value.toString()),
      });
      return acc;
    }, {});

    return NextResponse.json({
      data: Object.values(formattedData),
    });
  } catch (error) {
    console.error("データ可視化エラー:", error);
    return NextResponse.json(
      { error: "データの取得に失敗しました" },
      { status: 500 }
    );
  }
}
