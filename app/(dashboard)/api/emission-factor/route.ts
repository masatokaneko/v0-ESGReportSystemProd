import { NextResponse } from "next/server";
import { PrismaClient } from "@prisma/client";
const prisma = new PrismaClient();

export async function GET() {
  const data = await prisma.emissionFactor.findMany();
  return NextResponse.json(data);
} 