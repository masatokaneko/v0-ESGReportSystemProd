import { NextResponse } from "next/server";

// モックデータ
const mockEmissionFactors = [
  {
    id: 1,
    name: "電力",
    factor: 0.5,
    unit: "kWh",
  },
  {
    id: 2,
    name: "ガス",
    factor: 2.3,
    unit: "m³",
  },
  {
    id: 3,
    name: "ガソリン",
    factor: 2.32,
    unit: "L",
  },
  {
    id: 4,
    name: "軽油",
    factor: 2.58,
    unit: "L",
  },
];

export async function GET() {
  return NextResponse.json(mockEmissionFactors);
}
