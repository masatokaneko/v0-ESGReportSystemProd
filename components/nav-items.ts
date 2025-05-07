export const NAV_ITEMS = [
  { label: "ダッシュボード", icon: "LayoutDashboard", href: "/dashboard" },
  {
    label: "データ登録", icon: "UploadCloud", children: [
      { label: "APIコネクタ", icon: "Cloud", href: "/data-upload/connectors/cloud" },
      { label: "オンプレミスエージェント", icon: "Server", href: "/data-upload/connectors/agent" },
      { label: "ファイル/カメラOCR", icon: "Camera", href: "/data-upload/ocr" },
      { label: "CSVインポート", icon: "FileSpreadsheet", href: "/data-upload/csv" },
    ]
  },
  { label: "データ承認", icon: "CheckCircle", href: "/data-approvals" },
  { label: "データ検索", icon: "Search", href: "/data-search" },
  { label: "レポート", icon: "FileText", href: "/reports" },
  { label: "GHG計算", icon: "Calculator", href: "/ghg" },
  { label: "カテゴリ11ウィザード", icon: "ListNumbers", href: "/ghg-calculator/category11" },
  {
    label: "環境データ", icon: "Leaf", children: [
      { label: "大気質", icon: "Wind", href: "/environment/air" },
      { label: "水資源", icon: "Waves", href: "/environment/water" },
      { label: "廃棄物・石炭灰", icon: "Recycle", href: "/environment/waste" },
      { label: "非CO₂", icon: "CloudFog", href: "/environment/nonco2" },
      { label: "燃料構成", icon: "Fuel", href: "/environment/energymix" },
      { label: "土壌・化学物質", icon: "Beaker", href: "/environment/soil" },
    ]
  },
  {
    label: "社会データ", icon: "Users", children: [
      { label: "労働安全", icon: "HeartPulse", href: "/social/safety" },
      { label: "エネルギー・アフォーダビリティ", icon: "DollarSign", href: "/social/affordability" },
    ]
  },
  {
    label: "ガバナンスデータ", icon: "ShieldCheck", children: [
      { label: "原子力安全", icon: "Radiation", href: "/governance/nuclear" },
      { label: "グリッドレジリエンス", icon: "Activity", href: "/governance/grid" },
    ]
  },
  {
    label: "気候・ファイナンス", icon: "CloudSun", children: [
      { label: "シナリオ分析", icon: "BarChart3", href: "/climate/scenario" },
      { label: "気候リスク", icon: "AlertTriangle", href: "/climate/risk" },
    ]
  },
  {
    label: "設定", icon: "Settings", children: [
      { label: "拠点・組織", icon: "Building", href: "/settings/entities" },
      { label: "環境カテゴリ管理", icon: "List", href: "/settings/categories" },
    ]
  },
];
