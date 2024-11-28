import React from 'react';
import { LineChart, Line, BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, Legend } from 'recharts';
import { Battery, Zap, Wrench, TrendingUp } from 'lucide-react';

const performanceData = [
  { month: 'Jan', efficiency: 85, maintenance: 12, cost: 45000 },
  { month: 'Feb', efficiency: 87, maintenance: 8, cost: 42000 },
  { month: 'Mar', efficiency: 86, maintenance: 15, cost: 48000 },
  { month: 'Apr', efficiency: 89, maintenance: 10, cost: 44000 },
  { month: 'May', efficiency: 84, maintenance: 14, cost: 46000 },
  { month: 'Jun', efficiency: 88, maintenance: 9, cost: 43000 }
];

const assetTypePerformance = [
  { type: 'Power Plants', avgEfficiency: 88, totalAssets: 3 },
  { type: 'Water Facilities', avgEfficiency: 85, totalAssets: 3 },
  { type: 'Industrial', avgEfficiency: 82, totalAssets: 3 }
];

const Analytics = () => {
  return (
    <div className="p-6">
      <div className="mb-6">
        <h2 className="text-xl font-semibold">Analytics Dashboard</h2>
        <p className="text-gray-600">Comprehensive analysis of infrastructure performance</p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4 mb-6">
        <div className="bg-white p-4 rounded-lg shadow">
          <div className="flex items-center gap-2 mb-2">
            <Battery className="text-blue-500" />
            <h3 className="font-medium">Average Health</h3>
          </div>
          <p className="text-2xl font-bold">87.5%</p>
          <p className="text-sm text-green-500">↑ 2.3% from last month</p>
        </div>

        <div className="bg-white p-4 rounded-lg shadow">
          <div className="flex items-center gap-2 mb-2">
            <Zap className="text-yellow-500" />
            <h3 className="font-medium">Energy Efficiency</h3>
          </div>
          <p className="text-2xl font-bold">85.2%</p>
          <p className="text-sm text-red-500">↓ 1.1% from last month</p>
        </div>

        <div className="bg-white p-4 rounded-lg shadow">
          <div className="flex items-center gap-2 mb-2">
            <Wrench className="text-gray-500" />
            <h3 className="font-medium">Maintenance Events</h3>
          </div>
          <p className="text-2xl font-bold">24</p>
          <p className="text-sm text-gray-500">Last 30 days</p>
        </div>

        <div className="bg-white p-4 rounded-lg shadow">
          <div className="flex items-center gap-2 mb-2">
            <TrendingUp className="text-green-500" />
            <h3 className="font-medium">Operating Costs</h3>
          </div>
          <p className="text-2xl font-bold">$44.6K</p>
          <p className="text-sm text-green-500">↓ 5.2% from last month</p>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <div className="bg-white p-4 rounded-lg shadow">
          <h3 className="font-semibold mb-4">Performance Trends</h3>
          <LineChart width={500} height={300} data={performanceData}
            margin={{ top: 20, right: 30, left: 20, bottom: 20 }}>
            <CartesianGrid strokeDasharray="3 3" />
            <XAxis dataKey="month" />
            <YAxis />
            <Tooltip />
            <Legend />
            <Line type="monotone" dataKey="efficiency" stroke="#3b82f6" name="Efficiency %" />
            <Line type="monotone" dataKey="maintenance" stroke="#ef4444" name="Maintenance Events" />
          </LineChart>
        </div>

        <div className="bg-white p-4 rounded-lg shadow">
          <h3 className="font-semibold mb-4">Asset Type Performance</h3>
          <BarChart width={500} height={300} data={assetTypePerformance}
            margin={{ top: 20, right: 30, left: 20, bottom: 20 }}>
            <CartesianGrid strokeDasharray="3 3" />
            <XAxis dataKey="type" />
            <YAxis />
            <Tooltip />
            <Legend />
            <Bar dataKey="avgEfficiency" fill="#3b82f6" name="Avg. Efficiency %" />
            <Bar dataKey="totalAssets" fill="#10b981" name="Total Assets" />
          </BarChart>
        </div>

        <div className="bg-white p-4 rounded-lg shadow">
          <h3 className="font-semibold mb-4">Monthly Operating Costs</h3>
          <LineChart width={500} height={300} data={performanceData}
            margin={{ top: 20, right: 30, left: 20, bottom: 20 }}>
            <CartesianGrid strokeDasharray="3 3" />
            <XAxis dataKey="month" />
            <YAxis />
            <Tooltip />
            <Line type="monotone" dataKey="cost" stroke="#6366f1" name="Cost ($)" />
          </LineChart>
        </div>

        <div className="bg-white p-4 rounded-lg shadow">
          <h3 className="font-semibold mb-4">Regional Performance</h3>
          <BarChart width={500} height={300} data={[
            { region: 'West', efficiency: 89 },
            { region: 'Midwest', efficiency: 86 },
            { region: 'South', efficiency: 84 },
            { region: 'Northeast', efficiency: 87 }
          ]} margin={{ top: 20, right: 30, left: 20, bottom: 20 }}>
            <CartesianGrid strokeDasharray="3 3" />
            <XAxis dataKey="region" />
            <YAxis />
            <Tooltip />
            <Bar dataKey="efficiency" fill="#8b5cf6" name="Efficiency %" />
          </BarChart>
        </div>
      </div>
    </div>
  );
};

export default Analytics;