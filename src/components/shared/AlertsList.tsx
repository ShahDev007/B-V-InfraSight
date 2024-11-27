import { Alert } from '../../types';

interface AlertsListProps {
  alerts: Alert[];
  onAlertClick?: (alert: Alert) => void;
}

const AlertsList = ({ alerts, onAlertClick }: AlertsListProps) => {
  return (
    <div className="bg-white rounded-lg shadow">
      {alerts.map((alert) => (
        <div
          key={alert.id}
          className="p-4 border-b last:border-b-0 hover:bg-gray-50 cursor-pointer"
          onClick={() => onAlertClick?.(alert)}
        >
          <div className="flex items-center">
            <span
              className={`w-2 h-2 rounded-full ${
                alert.type === 'critical' ? 'bg-red-500' :
                alert.type === 'warning' ? 'bg-yellow-500' : 'bg-blue-500'
              }`}
            />
            <div className="ml-3 flex-1">
              <p className="text-gray-800">{alert.message}</p>
              <p className="text-sm text-gray-500">Asset ID: {alert.assetId}</p>
            </div>
            <div className="ml-auto text-right">
              <span className={`px-2 py-1 rounded-full text-xs ${
                alert.status === 'active' ? 'bg-red-100 text-red-800' :
                alert.status === 'acknowledged' ? 'bg-yellow-100 text-yellow-800' :
                'bg-green-100 text-green-800'
              }`}>
                {alert.status}
              </span>
              <p className="mt-1 text-sm text-gray-500">
                {alert.timestamp.toLocaleTimeString()}
              </p>
            </div>
          </div>
        </div>
      ))}
    </div>
  );
};

export default AlertsList;