import { useState } from "react";
import { Activity, AlertTriangle, Battery, Zap } from "lucide-react";
import { DashboardMetrics, Alert } from "../types";
import AlertsList from "../components/shared/AlertsList";
import MetricsChart from "../components/dashboard/MetricsChart";

const mockDashboardData: DashboardMetrics = {
  totalAssets: 24,
  activeAlerts: 3,
  overallHealth: 92,
  powerEfficiency: 87,
};

const mockAlerts: Alert[] = [
  {
    id: "1",
    assetId: "asset1",
    type: "critical",
    message: "Power plant efficiency below threshold",
    timestamp: new Date(),
    status: "active",
  },
  {
    id: "2",
    assetId: "asset2",
    type: "warning",
    message: "Maintenance schedule pending",
    timestamp: new Date(),
    status: "active",
  },
];

const Dashboard = () => {
  const [metrics] = useState<DashboardMetrics>(mockDashboardData);
  const [alerts] = useState<Alert[]>(mockAlerts);
  const [selectedMetric, setSelectedMetric] = useState<
    keyof DashboardMetrics | null
  >(null);

  const handleAlertClick = (alert: Alert) => {
    console.log("Alert clicked:", alert);
    // Here we can add modal or navigation logic
  };

  const handleMetricCardClick = (metric: keyof DashboardMetrics) => {
    setSelectedMetric(metric === selectedMetric ? null : metric);
    // Here we can add detailed view logic
  };

  return (
    <div className="space-y-8">
      {/* Header */}
      <div>
        <h1 className="text-2xl font-semibold text-gray-900">Dashboard</h1>
        <p className="mt-2 text-gray-600">
          Monitor your infrastructure health and performance
        </p>
      </div>

      {/* Metrics Overview Cards */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
        <div
          className="bg-white rounded-lg shadow p-6 cursor-pointer transition hover:shadow-lg"
          onClick={() => handleMetricCardClick("overallHealth")}
        >
          <div className="flex items-center">
            <Battery className="h-6 w-6 text-blue-500" />
            <h3 className="ml-2 text-lg font-medium">System Health</h3>
          </div>
          <p className="mt-2 text-3xl font-bold">{metrics.overallHealth}%</p>
        </div>

        <div
          className="bg-white rounded-lg shadow p-6 cursor-pointer transition hover:shadow-lg"
          onClick={() => handleMetricCardClick("powerEfficiency")}
        >
          <div className="flex items-center">
            <Zap className="h-6 w-6 text-yellow-500" />
            <h3 className="ml-2 text-lg font-medium">Power Efficiency</h3>
          </div>
          <p className="mt-2 text-3xl font-bold">{metrics.powerEfficiency}%</p>
        </div>

        <div
          className="bg-white rounded-lg shadow p-6 cursor-pointer transition hover:shadow-lg"
          onClick={() => handleMetricCardClick("totalAssets")}
        >
          <div className="flex items-center">
            <Activity className="h-6 w-6 text-green-500" />
            <h3 className="ml-2 text-lg font-medium">Total Assets</h3>
          </div>
          <p className="mt-2 text-3xl font-bold">{metrics.totalAssets}</p>
        </div>

        <div
          className="bg-white rounded-lg shadow p-6 cursor-pointer transition hover:shadow-lg"
          onClick={() => handleMetricCardClick("activeAlerts")}
        >
          <div className="flex items-center">
            <AlertTriangle className="h-6 w-6 text-red-500" />
            <h3 className="ml-2 text-lg font-medium">Active Alerts</h3>
          </div>
          <p className="mt-2 text-3xl font-bold">{metrics.activeAlerts}</p>
        </div>
      </div>

      {/* Charts and Alerts Section */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <MetricsChart />
        <div className="bg-white p-6 rounded-lg shadow">
          <h3 className="text-lg font-medium mb-4">Recent Alerts</h3>
          <AlertsList alerts={alerts} onAlertClick={handleAlertClick} />
        </div>
      </div>

      {/* Detailed Metrics View (Conditional) */}
      
    </div>
  );
};

export default Dashboard;
