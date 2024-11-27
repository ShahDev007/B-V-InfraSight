// Asset Types
export interface Asset {
    id: string;
    name: string;
    type: 'powerPlant' | 'waterFacility' | 'infrastructure';
    status: 'operational' | 'maintenance' | 'warning' | 'critical';
    location: string;
    metrics: AssetMetrics;
  }
  
  export interface AssetMetrics {
    powerUsage: number;
    efficiency: number;
    healthScore: number;
    lastMaintenance: Date;
    uptime: number;
  }
  
  // Alert Types
  export interface Alert {
    id: string;
    assetId: string;
    type: 'critical' | 'warning' | 'info';
    message: string;
    timestamp: Date;
    status: 'active' | 'acknowledged' | 'resolved';
  }
  
  // Dashboard Types
  export interface DashboardMetrics {
    totalAssets: number;
    activeAlerts: number;
    overallHealth: number;
    powerEfficiency: number;
  }