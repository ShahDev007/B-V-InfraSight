import React, { useState } from "react";
import { Power, Droplet, Factory, Eye, X } from "lucide-react";
import {
  LineChart,
  Line,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
} from "recharts";

interface Asset {
  id: string;
  name: string;
  type: "power" | "water" | "industrial";
  location: string;
  status: "operational" | "maintenance";
  metrics: {
    health: number;
    efficiency: number;
    uptime: number;
    lastMaintenance: string;
  };
  details: {
    performanceHistory: {
      date: string;
      efficiency: number;
      health: number;
    }[];
    specifications: {
      capacity: string;
      commissioning: string;
      lastInspection: string;
      nextMaintenance: string;
    };
  };
}

const mockAssets: Asset[] = [
  // Power Plants
  {
    id: "pp-001",
    name: "Power Plant Alpha",
    type: "power",
    location: "Kansas City, MO",
    status: "operational",
    metrics: {
      health: 92,
      efficiency: 87,
      uptime: 99.2,
      lastMaintenance: "2/14/2024",
    },
    details: {
      performanceHistory: [
        { date: "Jan", efficiency: 85, health: 90 },
        { date: "Feb", efficiency: 87, health: 92 },
        { date: "Mar", efficiency: 86, health: 92 },
      ],
      specifications: {
        capacity: "500 MW",
        commissioning: "2020",
        lastInspection: "2/14/2024",
        nextMaintenance: "5/14/2024",
      },
    },
  },
  {
    id: "pp-002",
    name: "Solar Farm Beta",
    type: "power",
    location: "Phoenix, AZ",
    status: "operational",
    metrics: {
      health: 95,
      efficiency: 89,
      uptime: 99.8,
      lastMaintenance: "2/20/2024",
    },
    details: {
      performanceHistory: [
        { date: "Jan", efficiency: 88, health: 94 },
        { date: "Feb", efficiency: 89, health: 95 },
        { date: "Mar", efficiency: 89, health: 95 },
      ],
      specifications: {
        capacity: "200 MW",
        commissioning: "2022",
        lastInspection: "2/20/2024",
        nextMaintenance: "5/20/2024",
      },
    },
  },

  // Water Treatment Facilities
  {
    id: "wt-001",
    name: "Water Treatment Facility",
    type: "water",
    location: "Orlando, FL",
    status: "maintenance",
    metrics: {
      health: 78,
      efficiency: 82,
      uptime: 95.5,
      lastMaintenance: "2/29/2024",
    },
    details: {
      performanceHistory: [
        { date: "Jan", efficiency: 80, health: 82 },
        { date: "Feb", efficiency: 81, health: 80 },
        { date: "Mar", efficiency: 82, health: 78 },
      ],
      specifications: {
        capacity: "50M gallons/day",
        commissioning: "2018",
        lastInspection: "2/29/2024",
        nextMaintenance: "3/15/2024",
      },
    },
  },
  {
    id: "wt-002",
    name: "Coastal Desalination Plant",
    type: "water",
    location: "San Diego, CA",
    status: "operational",
    metrics: {
      health: 88,
      efficiency: 85,
      uptime: 97.5,
      lastMaintenance: "2/10/2024",
    },
    details: {
      performanceHistory: [
        { date: "Jan", efficiency: 83, health: 87 },
        { date: "Feb", efficiency: 85, health: 88 },
        { date: "Mar", efficiency: 85, health: 88 },
      ],
      specifications: {
        capacity: "30M gallons/day",
        commissioning: "2021",
        lastInspection: "2/10/2024",
        nextMaintenance: "5/10/2024",
      },
    },
  },

  // Industrial Facilities
  {
    id: "ind-001",
    name: "Industrial Complex Beta",
    type: "industrial",
    location: "Houston, TX",
    status: "operational",
    metrics: {
      health: 95,
      efficiency: 91,
      uptime: 98.7,
      lastMaintenance: "2/27/2024",
    },
    details: {
      performanceHistory: [
        { date: "Jan", efficiency: 90, health: 94 },
        { date: "Feb", efficiency: 91, health: 95 },
        { date: "Mar", efficiency: 91, health: 95 },
      ],
      specifications: {
        capacity: "1000 tons/day",
        commissioning: "2019",
        lastInspection: "2/27/2024",
        nextMaintenance: "5/27/2024",
      },
    },
  },
  {
    id: "ind-002",
    name: "Manufacturing Plant Gamma",
    type: "industrial",
    location: "Detroit, MI",
    status: "maintenance",
    metrics: {
      health: 82,
      efficiency: 79,
      uptime: 94.3,
      lastMaintenance: "3/01/2024",
    },
    details: {
      performanceHistory: [
        { date: "Jan", efficiency: 85, health: 86 },
        { date: "Feb", efficiency: 82, health: 84 },
        { date: "Mar", efficiency: 79, health: 82 },
      ],
      specifications: {
        capacity: "750 units/day",
        commissioning: "2017",
        lastInspection: "3/01/2024",
        nextMaintenance: "3/15/2024",
      },
    },
  },
];

interface DetailModalProps {
  asset: Asset;
  onClose: () => void;
}

const DetailModal: React.FC<DetailModalProps> = ({ asset, onClose }) => {
  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
      <div className="bg-white rounded-lg max-w-4xl w-full mx-4 max-h-[90vh] overflow-y-auto">
        <div className="p-6">
          <div className="flex justify-between items-start mb-6">
            <div>
              <h2 className="text-2xl font-semibold">{asset.name}</h2>
              <p className="text-gray-600">{asset.location}</p>
            </div>
            <button
              onClick={onClose}
              className="p-2 hover:bg-gray-100 rounded-full"
            >
              <X className="w-5 h-5" />
            </button>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 mb-6">
            <div className="bg-gray-50 p-6 rounded-lg">
              <h3 className="text-lg font-semibold mb-6">
                Performance History
              </h3>
              <LineChart
                width={350}
                height={300}
                data={asset.details.performanceHistory}
                margin={{ top: 20, bottom: 20 }} // Added proper margins
              >
                <CartesianGrid strokeDasharray="3 3" />
                <XAxis
                  dataKey="date"
                  padding={{ left: 30, right: 30 }} // Added padding
                />
                <YAxis
                  domain={[0, 100]} // Fixed Y-axis scale
                  ticks={[0, 25, 50, 75, 100]} // Explicit ticks
                />
                <Tooltip />
                <Line
                  type="monotone"
                  dataKey="efficiency"
                  stroke="#3b82f6"
                  name="Efficiency"
                  dot={{ r: 4 }} // Made dots more visible
                />
                <Line
                  type="monotone"
                  dataKey="health"
                  stroke="#10b981"
                  name="Health"
                  dot={{ r: 4 }}
                />
              </LineChart>
            </div>
            <div className="bg-gray-50 p-4 rounded-lg">
              <h3 className="text-lg font-semibold mb-4">Specifications</h3>
              <div className="space-y-4">
                <div>
                  <p className="text-gray-600">Capacity</p>
                  <p className="text-lg font-medium">
                    {asset.details.specifications.capacity}
                  </p>
                </div>
                <div>
                  <p className="text-gray-600">Commissioning Year</p>
                  <p className="text-lg font-medium">
                    {asset.details.specifications.commissioning}
                  </p>
                </div>
                <div>
                  <p className="text-gray-600">Last Inspection</p>
                  <p className="text-lg font-medium">
                    {asset.details.specifications.lastInspection}
                  </p>
                </div>
                <div>
                  <p className="text-gray-600">Next Scheduled Maintenance</p>
                  <p className="text-lg font-medium">
                    {asset.details.specifications.nextMaintenance}
                  </p>
                </div>
              </div>
            </div>
          </div>

          <div className="bg-gray-50 p-4 rounded-lg">
            <h3 className="text-lg font-semibold mb-4">Current Metrics</h3>
            <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
              <div>
                <p className="text-gray-600">Health Status</p>
                <div className="mt-2">
                  <div className="w-full bg-gray-200 rounded-full h-2">
                    <div
                      className="bg-green-500 rounded-full h-2"
                      style={{ width: `${asset.metrics.health}%` }}
                    ></div>
                  </div>
                  <p className="mt-1 font-medium">{asset.metrics.health}%</p>
                </div>
              </div>
              <div>
                <p className="text-gray-600">Efficiency Rate</p>
                <div className="mt-2">
                  <div className="w-full bg-gray-200 rounded-full h-2">
                    <div
                      className="bg-blue-500 rounded-full h-2"
                      style={{ width: `${asset.metrics.efficiency}%` }}
                    ></div>
                  </div>
                  <p className="mt-1 font-medium">
                    {asset.metrics.efficiency}%
                  </p>
                </div>
              </div>
              <div>
                <p className="text-gray-600">Uptime</p>
                <div className="mt-2">
                  <div className="w-full bg-gray-200 rounded-full h-2">
                    <div
                      className="bg-purple-500 rounded-full h-2"
                      style={{ width: `${asset.metrics.uptime}%` }}
                    ></div>
                  </div>
                  <p className="mt-1 font-medium">{asset.metrics.uptime}%</p>
                </div>
              </div>
              <div>
                <p className="text-gray-600">Operation Status</p>
                <p
                  className={`mt-2 font-medium ${
                    asset.status === "operational"
                      ? "text-green-500"
                      : "text-yellow-500"
                  }`}
                >
                  {asset.status.charAt(0).toUpperCase() + asset.status.slice(1)}
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

const Assets = () => {
  const [searchTerm, setSearchTerm] = useState("");
  const [selectedType, setSelectedType] = useState("All Types");
  const [selectedAsset, setSelectedAsset] = useState<Asset | null>(null);

  const filteredAssets = mockAssets.filter((asset) => {
    const matchesSearch =
      asset.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
      asset.location.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesType =
      selectedType === "All Types" ||
      asset.type === selectedType.toLowerCase().split(" ")[0];
    return matchesSearch && matchesType;
  });

  return (
    <div className="p-6">
      <div className="flex justify-between items-center mb-6">
        <div>
          <h2 className="text-xl font-semibold">Infrastructure Assets</h2>
          <p className="text-gray-600">
            Monitor and manage all infrastructure assets
          </p>
        </div>
        <div className="flex items-center gap-4">
          <input
            type="text"
            placeholder="Search assets..."
            className="pl-3 pr-10 py-2 border rounded-lg text-sm"
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
          />
          <select
            className="border rounded-lg px-3 py-2 text-sm"
            value={selectedType}
            onChange={(e) => setSelectedType(e.target.value)}
          >
            <option>All Types</option>
            <option>Power Plants</option>
            <option>Water Facilities</option>
            <option>Industrial</option>
          </select>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {filteredAssets.map((asset) => (
          <div key={asset.id} className="bg-white rounded-lg p-6">
            <div className="flex items-start justify-between mb-6">
              <div className="flex items-center gap-3">
                <span className="p-2 bg-gray-100 rounded-lg">
                  {asset.type === "power" ? (
                    <Power className="w-5 h-5" />
                  ) : asset.type === "water" ? (
                    <Droplet className="w-5 h-5" />
                  ) : (
                    <Factory className="w-5 h-5" />
                  )}
                </span>
                <div>
                  <h3 className="font-medium">{asset.name}</h3>
                  <p className="text-sm text-gray-500">{asset.location}</p>
                </div>
              </div>
              <span
                className={`${
                  asset.status === "operational"
                    ? "text-green-500"
                    : "text-yellow-500"
                }`}
              >
                {asset.status}
              </span>
            </div>

            <div className="grid grid-cols-2 gap-x-12 gap-y-4 mb-6">
              <div>
                <p className="text-gray-500 text-sm">Health</p>
                <p className="text-xl font-semibold">{asset.metrics.health}%</p>
              </div>
              <div>
                <p className="text-gray-500 text-sm">Efficiency</p>
                <p className="text-xl font-semibold">
                  {asset.metrics.efficiency}%
                </p>
              </div>
              <div>
                <p className="text-gray-500 text-sm">Uptime</p>
                <p className="text-xl font-semibold">{asset.metrics.uptime}%</p>
              </div>
              <div>
                <p className="text-gray-500 text-sm">Last Maintenance</p>
                <p className="text-xl font-semibold">
                  {asset.metrics.lastMaintenance}
                </p>
              </div>
            </div>

            <button
              className="flex items-center gap-2 text-blue-600 hover:text-blue-700"
              onClick={() => setSelectedAsset(asset)}
            >
              <Eye className="w-4 h-4" />
              View Details
            </button>
          </div>
        ))}
      </div>

      {selectedAsset && (
        <DetailModal
          asset={selectedAsset}
          onClose={() => setSelectedAsset(null)}
        />
      )}
    </div>
  );
};

export default Assets;
