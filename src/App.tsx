import { useState } from 'react';
import Login from './components/Login';
import Layout from './components/Layout';
import Dashboard from './components/Dashboard';
import BOMManager from './components/BOMManager';
import MRPEngine from './components/MRPEngine';
import WarrantySystem from './components/WarrantySystem';
import Inventory, { InventoryItem } from './components/Inventory';
import { BATTERY_MODELS, BatteryModel, Unit } from './constants';

const INITIAL_INVENTORY: InventoryItem[] = [
  { material: "Lead Alloy", stock: 12500, reserved: 0, unit: Unit.KG, minLevel: 2000 },
  { material: "Lead Oxide", stock: 5000, reserved: 0, unit: Unit.KG, minLevel: 1000 },
  { material: "Sulfuric Acid", stock: 800, reserved: 0, unit: Unit.LTR, minLevel: 500 },
  { material: "Battery Container", stock: 450, reserved: 0, unit: Unit.PCS, minLevel: 100 },
  { material: "Positive Plates", stock: 12000, reserved: 0, unit: Unit.PCS, minLevel: 2000 },
];

import ProductionManagement from './components/ProductionManagement';
import RMAManagement from './components/RMAManagement';
import SalesManager from './components/SalesManager';
import DealerManagement from './components/DealerManagement';
import RepairManagement from './components/RepairManagement';
import ReturnsManagement from './components/ReturnsManagement';
import Accounting from './components/Accounting';
import FinishedGoodsInventory from './components/FinishedGoodsInventory';
import Analytics from './components/Analytics';
import CustomerEngagement from './components/CustomerEngagement';

export interface WarrantyRegistration {
  id: string;
  model: string;
  dealer: string;
  date: string;
  status: 'Active' | 'In Repair' | 'Expired';
}

const INITIAL_REGISTRATIONS: WarrantyRegistration[] = [
  { id: 'SN-00921-A', model: 'INV-150', dealer: 'AutoPower Ltd', date: '2026-04-25', status: 'Active' },
  { id: 'SN-00922-A', model: 'AUTO-35', dealer: 'Bright Battery', date: '2026-04-26', status: 'Active' },
  { id: 'SN-00923-A', model: 'VRLA-100', dealer: 'Industrial UPS Corp', date: '2026-04-26', status: 'In Repair' },
  { id: 'SN-00924-A', model: 'INV-150', dealer: 'Energy Solutions', date: '2026-04-27', status: 'Active' },
];

export default function App() {
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [activeView, setActiveView] = useState('dashboard');
  const [batteryModels, setBatteryModels] = useState<BatteryModel[]>(BATTERY_MODELS);
  const [inventory, setInventory] = useState<InventoryItem[]>(INITIAL_INVENTORY);
  const [grnHistory, setGrnHistory] = useState<any[]>([
    { id: 'GRN-1001', material: 'Lead Alloy', qty: 5000, date: '2026-04-20' },
    { id: 'GRN-1002', material: 'Lead Oxide', qty: 2000, date: '2026-04-22' },
  ]);
  const [registrations, setRegistrations] = useState<WarrantyRegistration[]>(INITIAL_REGISTRATIONS);
  const [complaints, setComplaints] = useState<any[]>([
    { id: 'TKT-9012', serialNumber: 'SN-00923-A', customerName: 'Rajesh Kumar', issue: 'Back-up duration low', status: 'Inspection', date: '2026-04-26' },
    { id: 'TKT-9011', serialNumber: 'SN-00811-B', customerName: 'Apex Solutions', issue: 'Terminal corrosion', status: 'Replacement', date: '2026-04-25' },
  ]);

  const handleAddMaterial = (modelId: string, materialName: string, unit: Unit, qty: number, wastage: number) => {
    setBatteryModels(prev => prev.map(m => {
      if (m.id === modelId) {
        return {
          ...m,
          materials: [...m.materials, { material: materialName, unit, qtyPerUnit: qty, wastagePercent: wastage }]
        };
      }
      return m;
    }));
  };

  const handleAddRegistration = (reg: WarrantyRegistration) => {
    setRegistrations(prev => [reg, ...prev]);
  };

  const renderView = () => {
    switch (activeView) {
      case 'dashboard':
        return <Dashboard inventory={inventory} registrations={registrations} complaints={complaints} />;
      case 'bom':
        return <BOMManager models={batteryModels} onAddMaterial={handleAddMaterial} />;
      case 'mrp':
        return <MRPEngine models={batteryModels} inventory={inventory} setInventory={setInventory} />;
      case 'warranty':
        return (
          <WarrantySystem 
            registrations={registrations} 
            onRegister={handleAddRegistration} 
          />
        );
      case 'production':
        return <ProductionManagement />;
      case 'rma':
        return <RMAManagement complaints={complaints} setComplaints={setComplaints} />;
      case 'inventory':
        return <Inventory items={inventory} setItems={setInventory} grnHistory={grnHistory} setGrnHistory={setGrnHistory} />;
      case 'inventory_fg':
        return <FinishedGoodsInventory />;
      case 'returns':
        return <ReturnsManagement />;
      case 'sales':
        return <SalesManager />;
      case 'dealers':
        return <DealerManagement />;
      case 'repair':
        return <RepairManagement />;
      case 'accounting':
        return <Accounting />;
      case 'report_rm':
        return <Analytics type="rm" />;
      case 'report_prod':
        return <Analytics type="prod" />;
      case 'report_warranty':
        return <Analytics type="warranty" />;
      case 'report_dealers':
        return <Analytics type="dealers" />;
      case 'customer_app':
        return <CustomerEngagement />;
      default:
        return <Dashboard inventory={inventory} registrations={registrations} complaints={complaints} />;
    }
  };

  if (!isAuthenticated) {
    return <Login onLogin={() => setIsAuthenticated(true)} />;
  }

  return (
    <Layout 
      activeView={activeView} 
      onNavigate={setActiveView} 
      onLogout={() => setIsAuthenticated(false)}
    >
      {renderView()}
    </Layout>
  );
}
