import { 
  Battery, Package, Settings, ClipboardList, ShieldCheck, 
  Warehouse, PieChart, ShieldAlert, Box, RotateCcw, 
  FileText, Users, Wrench, Receipt, BarChart3, TrendingUp,
  Activity, Zap, Smartphone, QrCode
} from 'lucide-react';

export enum Unit {
  KG = "Kg",
  LTR = "Ltr",
  PCS = "Pcs"
}

export interface BOMItem {
  material: string;
  unit: Unit;
  qtyPerUnit: number;
  wastagePercent: number;
}

export interface BatteryModel {
  id: string;
  name: string;
  type: string;
  description: string;
  materials: BOMItem[];
}

export const BATTERY_MODELS: BatteryModel[] = [
  {
    id: "BAT-AUTO-35",
    name: "Automotive Battery (12V 35Ah)",
    type: "Flat Plate Battery (Low Complexity)",
    description: "Standard model for small vehicles and backup systems.",
    materials: [
      { material: "Lead Alloy", unit: Unit.KG, qtyPerUnit: 6.50, wastagePercent: 2 },
      { material: "Lead Oxide", unit: Unit.KG, qtyPerUnit: 2.20, wastagePercent: 2 },
      { material: "Sulfuric Acid", unit: Unit.LTR, qtyPerUnit: 1.80, wastagePercent: 1 },
      { material: "Separator (PE)", unit: Unit.PCS, qtyPerUnit: 12, wastagePercent: 1 },
      { material: "Positive Plates", unit: Unit.PCS, qtyPerUnit: 6, wastagePercent: 1 },
      { material: "Negative Plates", unit: Unit.PCS, qtyPerUnit: 6, wastagePercent: 1 },
      { material: "Battery Container", unit: Unit.PCS, qtyPerUnit: 1, wastagePercent: 0 },
      { material: "Battery Cover", unit: Unit.PCS, qtyPerUnit: 1, wastagePercent: 0 },
      { material: "Terminals", unit: Unit.PCS, qtyPerUnit: 2, wastagePercent: 0 },
      { material: "Vent Plugs", unit: Unit.PCS, qtyPerUnit: 6, wastagePercent: 1 },
      { material: "Intercell Connectors", unit: Unit.PCS, qtyPerUnit: 5, wastagePercent: 1 },
      { material: "Label/Sticker", unit: Unit.PCS, qtyPerUnit: 1, wastagePercent: 0 },
    ]
  },
  {
    id: "BAT-INV-150",
    name: "Inverter Battery (12V 150Ah)",
    type: "Tubular Battery (Medium Complexity)",
    description: "High-capacity tubular battery for home inverters.",
    materials: [
      { material: "Lead Alloy", unit: Unit.KG, qtyPerUnit: 18.00, wastagePercent: 2 },
      { material: "Lead Oxide", unit: Unit.KG, qtyPerUnit: 6.50, wastagePercent: 2 },
      { material: "Sulfuric Acid", unit: Unit.LTR, qtyPerUnit: 5.50, wastagePercent: 1 },
      { material: "Tubular Positive Plates", unit: Unit.PCS, qtyPerUnit: 6, wastagePercent: 1 },
      { material: "Negative Plates", unit: Unit.PCS, qtyPerUnit: 6, wastagePercent: 1 },
      { material: "Polyester Tubes", unit: Unit.PCS, qtyPerUnit: 6, wastagePercent: 1 },
      { material: "Separator", unit: Unit.PCS, qtyPerUnit: 14, wastagePercent: 1 },
      { material: "Container (Tall)", unit: Unit.PCS, qtyPerUnit: 1, wastagePercent: 0 },
      { material: "Cover", unit: Unit.PCS, qtyPerUnit: 1, wastagePercent: 0 },
      { material: "Terminals", unit: Unit.PCS, qtyPerUnit: 2, wastagePercent: 0 },
      { material: "Vent Plugs", unit: Unit.PCS, qtyPerUnit: 6, wastagePercent: 1 },
      { material: "Intercell Connectors", unit: Unit.PCS, qtyPerUnit: 5, wastagePercent: 1 },
      { material: "Electrolyte Additives", unit: Unit.LTR, qtyPerUnit: 0.20, wastagePercent: 2 },
      { material: "Distilled Water", unit: Unit.LTR, qtyPerUnit: 1.50, wastagePercent: 1 },
      { material: "Label/QR Sticker", unit: Unit.PCS, qtyPerUnit: 1, wastagePercent: 0 },
    ]
  },
  {
    id: "BAT-VRLA-100",
    name: "VRLA / SMF Battery (12V 100Ah)",
    type: "Sealed Maintenance-Free Battery (High Precision)",
    description: "Precision-engineered battery for UPS and industrial applications.",
    materials: [
      { material: "Lead Calcium Alloy", unit: Unit.KG, qtyPerUnit: 14.00, wastagePercent: 2 },
      { material: "Lead Oxide", unit: Unit.KG, qtyPerUnit: 5.00, wastagePercent: 2 },
      { material: "Sulfuric Acid", unit: Unit.LTR, qtyPerUnit: 4.20, wastagePercent: 1 },
      { material: "AGM Separator", unit: Unit.PCS, qtyPerUnit: 12, wastagePercent: 1 },
      { material: "Positive Plates", unit: Unit.PCS, qtyPerUnit: 6, wastagePercent: 1 },
      { material: "Negative Plates", unit: Unit.PCS, qtyPerUnit: 6, wastagePercent: 1 },
      { material: "Valve Regulated Caps", unit: Unit.PCS, qtyPerUnit: 6, wastagePercent: 1 },
      { material: "Container (Sealed)", unit: Unit.PCS, qtyPerUnit: 1, wastagePercent: 0 },
      { material: "Cover", unit: Unit.PCS, qtyPerUnit: 1, wastagePercent: 0 },
      { material: "Terminals", unit: Unit.PCS, qtyPerUnit: 2, wastagePercent: 0 },
      { material: "Safety Valves", unit: Unit.PCS, qtyPerUnit: 6, wastagePercent: 1 },
      { material: "Intercell Connectors", unit: Unit.PCS, qtyPerUnit: 5, wastagePercent: 1 },
      { material: "Electrolyte Gel", unit: Unit.LTR, qtyPerUnit: 0.80, wastagePercent: 2 },
      { material: "Adhesive Sealant", unit: Unit.KG, qtyPerUnit: 0.10, wastagePercent: 2 },
      { material: "Label/QR Code", unit: Unit.PCS, qtyPerUnit: 1, wastagePercent: 0 },
    ]
  }
];

export const NAV_GROUPS = [
  {
    group: 'Core Operations',
    items: [
      { id: 'dashboard', label: 'Dashboard', icon: PieChart },
      { id: 'bom', label: 'BOM Master', icon: ClipboardList },
      { id: 'mrp', label: 'MRP Engine', icon: Settings },
      { id: 'production', label: 'Production Mgt', icon: Battery },
    ]
  },
  {
    group: 'Supply Chain',
    items: [
      { id: 'inventory', label: 'Inventory (Raw)', icon: Warehouse },
      { id: 'inventory_fg', label: 'Finished Goods', icon: Box },
      { id: 'returns', label: 'Returns Mgt', icon: RotateCcw },
    ]
  },
  {
    group: 'Sales & Network',
    items: [
      { id: 'sales', label: 'Sales & Billing', icon: FileText },
      { id: 'dealers', label: 'Dealer Network', icon: Users },
    ]
  },
  {
    group: 'Post-Sales Service',
    items: [
      { id: 'warranty', label: 'Warranty Portal', icon: ShieldCheck },
      { id: 'rma', label: 'Service/RMA', icon: ShieldAlert },
      { id: 'repair', label: 'Repair Center', icon: Wrench },
      { id: 'customer_app', label: 'Customer Engagement', icon: QrCode },
    ]
  },
  {
    group: 'REPORTS & ANALYTICS',
    items: [
      { id: 'report_rm', label: 'RM Consumption', icon: Activity },
      { id: 'report_prod', label: 'Prod Efficiency', icon: BarChart3 },
      { id: 'report_warranty', label: 'Warranty Fail Rate', icon: Zap },
      { id: 'report_dealers', label: 'Dealer Performance', icon: TrendingUp },
    ]
  },
  {
    group: 'Finance',
    items: [
      { id: 'accounting', label: 'Accounting/GST', icon: Receipt },
    ]
  }
];

export const NAV_ITEMS = NAV_GROUPS.flatMap(g => g.items);
