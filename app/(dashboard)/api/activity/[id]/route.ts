import { NextRequest, NextResponse } from "next/server";
import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();

// PATCH /api/activity/:id
export async function PATCH(
  req: NextRequest,
  { params }: { params: { id: string } }
) {
  const body = await req.json();
  const updated = await prisma.activityData.update({
    where: { id: Number(params.id) },
    data: body,
  });
  return NextResponse.json(updated);
}

// DELETE /api/activity/:id
export async function DELETE(
  _req: NextRequest,
  { params }: { params: { id: string } }
) {
  await prisma.activityData.delete({ where: { id: Number(params.id) } });
  return NextResponse.json({ ok: true });
} 