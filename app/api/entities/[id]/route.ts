import { NextResponse } from "next/server"
import { prisma } from "@/lib/prisma"

interface RouteParams {
  params: {
    id: string
  }
}

// GET /api/entities/[id] - 個別エンティティ取得
export async function GET(request: Request, { params }: RouteParams) {
  try {
    const entity = await prisma.entity.findUnique({
      where: { id: params.id },
      include: {
        parent: true,
        children: true,
        kpiData: true,
      },
    })

    if (!entity || entity.deletedAt) {
      return NextResponse.json(
        { error: "エンティティが見つかりません" },
        { status: 404 }
      )
    }

    return NextResponse.json(entity)
  } catch (error) {
    return NextResponse.json(
      { error: "エンティティの取得に失敗しました" },
      { status: 500 }
    )
  }
}

// PUT /api/entities/[id] - エンティティ更新
export async function PUT(request: Request, { params }: RouteParams) {
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
      // 循環参照チェック
      if (parentId === params.id) {
        return NextResponse.json(
          { error: "自身を親エンティティに指定することはできません" },
          { status: 400 }
        )
      }
    }

    const entity = await prisma.entity.update({
      where: { id: params.id },
      data: { name, type, parentId },
    })

    return NextResponse.json(entity)
  } catch (error) {
    return NextResponse.json(
      { error: "エンティティの更新に失敗しました" },
      { status: 500 }
    )
  }
}

// DELETE /api/entities/[id] - エンティティ削除（ソフトデリート）
export async function DELETE(request: Request, { params }: RouteParams) {
  try {
    // 子エンティティの存在確認
    const children = await prisma.entity.findMany({
      where: { parentId: params.id, deletedAt: null },
    })
    if (children.length > 0) {
      return NextResponse.json(
        { error: "子エンティティが存在するため削除できません" },
        { status: 400 }
      )
    }

    // ソフトデリート
    const entity = await prisma.entity.update({
      where: { id: params.id },
      data: { deletedAt: new Date() },
    })

    return NextResponse.json(entity)
  } catch (error) {
    return NextResponse.json(
      { error: "エンティティの削除に失敗しました" },
      { status: 500 }
    )
  }
} 