import { NextResponse } from "next/server"
import { prisma } from "@/lib/prisma"

// GET /api/entities - エンティティ一覧取得
export async function GET() {
  try {
    const entities = await prisma.entity.findMany({
      where: { deletedAt: null },
      orderBy: { createdAt: "desc" },
    })
    return NextResponse.json(entities)
  } catch (error) {
    return NextResponse.json({ error: "エンティティの取得に失敗しました" }, { status: 500 })
  }
}

// POST /api/entities - 新規エンティティ作成
export async function POST(request: Request) {
  try {
    const body = await request.json()
    const { name, type, parentId } = body

    // バリデーション
    if (!name || !type) {
      return NextResponse.json(
        { error: "名前とタイプは必須です" },
        { status: 400 }
      )
    }

    // 親エンティティの存在確認
    if (parentId) {
      const parent = await prisma.entity.findUnique({
        where: { id: parentId },
      })
      if (!parent) {
        return NextResponse.json(
          { error: "指定された親エンティティが存在しません" },
          { status: 400 }
        )
      }
    }

    const entity = await prisma.entity.create({
      data: { name, type, parentId },
    })

    return NextResponse.json(entity)
  } catch (error) {
    return NextResponse.json(
      { error: "エンティティの作成に失敗しました" },
      { status: 500 }
    )
  }
} 