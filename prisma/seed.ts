import { PrismaClient, EntityType, SourceType } from "@prisma/client";
const prisma = new PrismaClient();

async function main() {
  // エンティティの作成
  const company = await prisma.entity.create({
    data: {
      name: "株式会社サステナブル",
      type: "COMPANY",
    },
  });

  const tokyoHQ = await prisma.entity.create({
    data: {
      name: "東京本社",
      type: "SITE",
      parentId: company.id,
    },
  });

  const osakaOffice = await prisma.entity.create({
    data: {
      name: "大阪支社",
      type: "SITE",
      parentId: company.id,
    },
  });

  const tokyoPlant = await prisma.entity.create({
    data: {
      name: "東京工場",
      type: "PLANT",
      parentId: tokyoHQ.id,
    },
  });

  const osakaPlant = await prisma.entity.create({
    data: {
      name: "大阪工場",
      type: "PLANT",
      parentId: osakaOffice.id,
    },
  });

  // KPIカテゴリの作成
  const environmentCategory = await prisma.kpiCategory.create({
    data: {
      code: "ENV",
      name: "環境",
      description: "環境関連の指標",
    },
  });

  const socialCategory = await prisma.kpiCategory.create({
    data: {
      code: "SOC",
      name: "社会",
      description: "社会関連の指標",
    },
  });

  const governanceCategory = await prisma.kpiCategory.create({
    data: {
      code: "GOV",
      name: "ガバナンス",
      description: "ガバナンス関連の指標",
    },
  });

  // KPI定義の作成
  const electricityKpi = await prisma.kpiDef.create({
    data: {
      code: "ENV_001",
      name: "電力使用量",
      description: "事業所における電力使用量",
      unit: "kWh",
      categoryId: environmentCategory.id,
    },
  });

  const waterKpi = await prisma.kpiDef.create({
    data: {
      code: "ENV_002",
      name: "水使用量",
      description: "事業所における水使用量",
      unit: "m³",
      categoryId: environmentCategory.id,
    },
  });

  const wasteKpi = await prisma.kpiDef.create({
    data: {
      code: "ENV_003",
      name: "廃棄物排出量",
      description: "事業所における廃棄物排出量",
      unit: "t",
      categoryId: environmentCategory.id,
    },
  });

  const employeeKpi = await prisma.kpiDef.create({
    data: {
      code: "SOC_001",
      name: "従業員数",
      description: "正社員数",
      unit: "人",
      categoryId: socialCategory.id,
    },
  });

  const trainingKpi = await prisma.kpiDef.create({
    data: {
      code: "SOC_002",
      name: "研修時間",
      description: "従業員一人あたりの年間研修時間",
      unit: "時間",
      categoryId: socialCategory.id,
    },
  });

  const complianceKpi = await prisma.kpiDef.create({
    data: {
      code: "GOV_001",
      name: "コンプライアンス研修実施率",
      description: "コンプライアンス研修の受講率",
      unit: "%",
      categoryId: governanceCategory.id,
    },
  });

  // KPIデータの作成（2022年度と2023年度のサンプルデータ）
  const entities = [company, tokyoHQ, osakaOffice, tokyoPlant, osakaPlant];
  const kpiDefs = [electricityKpi, waterKpi, wasteKpi, employeeKpi, trainingKpi, complianceKpi];
  const fiscalYears = [2022, 2023];

  for (const entity of entities) {
    for (const kpiDef of kpiDefs) {
      for (const year of fiscalYears) {
        await prisma.kpiData.create({
          data: {
            kpiId: kpiDef.id,
            entityId: entity.id,
            fiscalYear: year,
            value: Math.random() * 1000, // ランダムな値を生成
            sourceType: "MOCK",
          },
        });
      }
    }
  }

  // ユーザーの作成
  const admin = await prisma.user.create({
    data: {
      email: "admin@example.com",
      name: "管理者",
      password: "hashed_password_here", // 実際の実装では適切なハッシュ化が必要
    },
  });

  // ユーザーのエンティティアクセス権限設定
  await prisma.userEntityAccess.create({
    data: {
      userId: admin.id,
      entityId: company.id,
      role: "ADMIN",
    },
  });

  console.log("シードデータの投入が完了しました");
}

main()
  .catch((e) => {
    console.error(e);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  }); 