import { 
  LayoutDashboard, 
  FileInput, 
  FileCheck, 
  Search, 
  FileText, 
  Settings,
  Calculator,
  Wand2,
  Leaf,
  Users,
  Building2,
  Banknote
} from "lucide-react"

export const NAV_ITEMS = [
  {
    title: "ダッシュボード",
    href: "/dashboard",
    icon: LayoutDashboard,
  },
  {
    title: "データ登録",
    href: "/data-upload",
    icon: FileInput,
    subItems: [
      {
        title: "APIコネクタ",
        href: "/data-upload/connectors/cloud",
      },
      {
        title: "オンプレミスエージェント",
        href: "/data-upload/connectors/agent",
      },
      {
        title: "ファイル/カメラOCR",
        href: "/data-upload/ocr",
      },
      {
        title: "CSVインポート",
        href: "/data-upload/csv",
      },
    ],
  },
  {
    title: "データ承認",
    href: "/data-approvals",
    icon: FileCheck,
  },
  {
    title: "データ検索",
    href: "/data-search",
    icon: Search,
  },
  {
    title: "レポート",
    href: "/reports",
    icon: FileText,
  },
  {
    title: "GHG関連指標",
    href: "/ghg",
    icon: Calculator,
    subItems: [
      {
        title: "GHG計算",
        href: "/ghg-calculator",
      },
      {
        title: "カテゴリ11ウィザード",
        href: "/ghg-calculator/category11",
      },
    ],
  },
  {
    title: "その他ESGデータ",
    href: "/esg",
    icon: Leaf,
    subItems: [
      {
        title: "環境データ",
        href: "/environment",
      },
      {
        title: "社会データ",
        href: "/social",
      },
      {
        title: "ガバナンスデータ",
        href: "/governance",
      },
      {
        title: "気候ファイナンス",
        href: "/climate",
      },
    ],
  },
  {
    title: "設定",
    href: "/settings",
    icon: Settings,
    subItems: [
      {
        title: "環境カテゴリ管理",
        href: "/settings/categories",
      },
      {
        title: "ユーザー管理",
        href: "/settings/users",
      },
      {
        title: "組織管理",
        href: "/settings/organizations",
      },
    ],
  },
]
