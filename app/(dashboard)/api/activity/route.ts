import { NextRequest, NextResponse } from "next/server";

// モックデータ
const mockActivities = [
  {
    id: 1,
    date: "2025-04-01",
    description: "電力使用量",
    amount: 1000,
    emissionFactorId: 1,
    emissionFactor: {
      id: 1,
      name: "電力",
      factor: 0.5,
      unit: "kWh",
    },
  },
  {
    id: 2,
    date: "2025-04-02",
    description: "ガス使用量",
    amount: 500,
    emissionFactorId: 2,
    emissionFactor: {
      id: 2,
      name: "ガス",
      factor: 2.3,
      unit: "m³",
    },
  },
];

// GET /api/activity
export async function GET() {
  return NextResponse.json(mockActivities);
}

// POST /api/activity
export async function POST(req: NextRequest) {
  const body = await req.json();
  // 実際のデータベース操作はせず、モックレスポンスを返す
  const created = {
    id: mockActivities.length + 1,
    ...body,
    emissionFactor: mockActivities.find(
      (a) => a.emissionFactorId === Number(body.emissionFactorId)
    )?.emissionFactor,
  };
  return NextResponse.json(created, { status: 201 });
}
