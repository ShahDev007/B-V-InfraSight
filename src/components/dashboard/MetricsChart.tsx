import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer } from 'recharts';

const mockData = [
  { time: '00:00', powerUsage: 340, efficiency: 85 },
  { time: '04:00', powerUsage: 280, efficiency: 88 },
  { time: '08:00', powerUsage: 420, efficiency: 82 },
  { time: '12:00', powerUsage: 520, efficiency: 75 },
  { time: '16:00', powerUsage: 450, efficiency: 80 },
  { time: '20:00', powerUsage: 380, efficiency: 84 },
];

const MetricsChart = () => {
  return (
    <div className="bg-white p-6 rounded-lg shadow">
      <h3 className="text-lg font-medium mb-4">Power Usage & Efficiency</h3>
      <div className="h-80">
        <ResponsiveContainer width="100%" height="100%">
          <LineChart data={mockData}>
            <CartesianGrid strokeDasharray="3 3" />
            <XAxis dataKey="time" />
            <YAxis yAxisId="left" />
            <YAxis yAxisId="right" orientation="right" />
            <Tooltip />
            <Legend />
            <Line
              yAxisId="left"
              type="monotone"
              dataKey="powerUsage"
              stroke="#2563eb"
              name="Power Usage (kW)"
            />
            <Line
              yAxisId="right"
              type="monotone"
              dataKey="efficiency"
              stroke="#16a34a"
              name="Efficiency (%)"
            />
          </LineChart>
        </ResponsiveContainer>
      </div>
    </div>
  );
};

export default MetricsChart;