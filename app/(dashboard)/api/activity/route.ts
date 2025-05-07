import { NextRequest, NextResponse } from "next/server";
import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();

// GET /api/activity
export async function GET() {
  const data = await prisma.activityData.findMany({
    include: { emissionFactor: true },
    orderBy: { date: "desc" },
  });
  return NextResponse.json(data);
}

// POST /api/activity
export async function POST(req: NextRequest) {
  const body = await req.json();
  const created = await prisma.activityData.create({ data: body });
  return NextResponse.json(created, { status: 201 });
} 