import React, { useState, useEffect } from 'react';
import { LineChart, Line, BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer, Area, AreaChart } from 'recharts';
import { Battery, Zap, Clock, DollarSign, Activity } from 'lucide-react';

const EVChargingPlatform = () => {
  const [activeTab, setActiveTab] = useState('dashboard');
  const [timeRange, setTimeRange] = useState('24h');
  
  // Simulated real-time data (in production, this would come from Tesla Fleet API)
  const [utilizationData, setUtilizationData] = useState([]);
  const [realtimeMetrics, setRealtimeMetrics] = useState({
    activeChargers: 12,
    totalChargers: 20,
    currentLoad: 145.3,
    peakLoad: 180.0,
    avgSessionTime: 2.4,
    revenue: 1247.50
  });

  // Generate sample utilization data
  useEffect(() => {
    const generateData = () => {
      const hours = timeRange === '24h' ? 24 : timeRange === '7d' ? 168 : 720;
      const data = [];
      const now = new Date();
      
      for (let i = hours; i >= 0; i--) {
        const time = new Date(now - i * 3600000);
        const hour = time.getHours();
        
        // Simulate realistic charging patterns (peak during morning and evening)
        let baseUtilization = 30;
        if (hour >= 7 && hour <= 9) baseUtilization = 75;
        else if (hour >= 17 && hour <= 20) baseUtilization = 85;
        else if (hour >= 22 || hour <= 5) baseUtilization = 20;
        
        const utilization = baseUtilization + Math.random() * 15;
        const power = (utilization / 100) * 200 + Math.random() * 20;
        
        data.push({
          time: timeRange === '24h' ? `${hour}:00` : time.toLocaleDateString(),
          utilization: Math.round(utilization),
          power: Math.round(power * 10) / 10,
          sessions: Math.floor((utilization / 100) * 20),
          revenue: Math.round(power * 0.35 * 100) / 100
        });
      }
      return data;
    };
    
    setUtilizationData(generateData());
    
    // Simulate real-time updates
    const interval = setInterval(() => {
      setRealtimeMetrics(prev => ({
        ...prev,
        activeChargers: Math.max(1, prev.activeChargers + Math.floor(Math.random() * 3) - 1),
        currentLoad: Math.max(0, prev.currentLoad + (Math.random() - 0.5) * 10),
        revenue: prev.revenue + Math.random() * 5
      }));
    }, 3000);
    
    return () => clearInterval(interval);
  }, [timeRange]);

  // Charger status data
  const chargerStatus = [
    { id: 'CH-001', status: 'active', power: 7.2, vehicle: 'Model 3', soc: 67, timeRemaining: 45 },
    { id: 'CH-002', status: 'active', power: 11.5, vehicle: 'Model Y', soc: 45, timeRemaining: 78 },
    { id: 'CH-003', status: 'idle', power: 0, vehicle: '-', soc: 0, timeRemaining: 0 },
    { id: 'CH-004', status: 'active', power: 7.2, vehicle: 'Model S', soc: 89, timeRemaining: 12 },
    { id: 'CH-005', status: 'idle', power: 0, vehicle: '-', soc: 0, timeRemaining: 0 },
    { id: 'CH-006', status: 'active', power: 22.0, vehicle: 'Model X', soc: 34, timeRemaining: 92 },
  ];

  // Peak demand analysis
  const peakDemandData = [
    { hour: '00:00', demand: 25, baseline: 30 },
    { hour: '03:00', demand: 18, baseline: 30 },
    { hour: '06:00', demand: 45, baseline: 30 },
    { hour: '09:00', demand: 88, baseline: 30 },
    { hour: '12:00', demand: 62, baseline: 30 },
    { hour: '15:00', demand: 55, baseline: 30 },
    { hour: '18:00', demand: 95, baseline: 30 },
    { hour: '21:00', demand: 72, baseline: 30 }
  ];

  const MetricCard = ({ icon: Icon, title, value, subtitle, trend }) => (
    <div className="bg-white rounded-lg shadow p-6 border border-gray-200">
      <div className="flex items-start justify-between">
        <div>
          <p className="text-sm text-gray-600 mb-1">{title}</p>
          <p className="text-3xl font-bold text-gray-900">{value}</p>
          <p className="text-sm text-gray-500 mt-1">{subtitle}</p>
        </div>
        <div className={`p-3 rounded-lg ${trend >= 0 ? 'bg-green-100' : 'bg-red-100'}`}>
          <Icon className={`w-6 h-6 ${trend >= 0 ? 'text-green-600' : 'text-red-600'}`} />
        </div>
      </div>
      {trend !== undefined && (
        <div className="mt-3 flex items-center text-sm">
          <span className={trend >= 0 ? 'text-green-600' : 'text-red-600'}>
            {trend >= 0 ? '↑' : '↓'} {Math.abs(trend)}%
          </span>
          <span className="text-gray-500 ml-2">vs last period</span>
        </div>
      )}
    </div>
  );

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header */}
      <header className="bg-white shadow-sm border-b border-gray-200">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center space-x-3">
              <Zap className="w-8 h-8 text-blue-600" />
              <div>
                <h1 className="text-2xl font-bold text-gray-900">EV Charging Analytics</h1>
                <p className="text-sm text-gray-500">Real-time Utilization & Demand Forecasting</p>
              </div>
            </div>
            <div className="flex items-center space-x-4">
              <select 
                value={timeRange}
                onChange={(e) => setTimeRange(e.target.value)}
                className="px-4 py-2 border border-gray-300 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
              >
                <option value="24h">Last 24 Hours</option>
                <option value="7d">Last 7 Days</option>
                <option value="30d">Last 30 Days</option>
              </select>
              <button className="px-4 py-2 bg-blue-600 text-white rounded-lg text-sm font-medium hover:bg-blue-700">
                Export Report
              </button>
            </div>
          </div>
        </div>
      </header>

      {/* Navigation Tabs */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 mt-6">
        <div className="border-b border-gray-200">
          <nav className="flex space-x-8">
            {['dashboard', 'utilization', 'chargers', 'analytics'].map(tab => (
              <button
                key={tab}
                onClick={() => setActiveTab(tab)}
                className={`py-4 px-1 border-b-2 font-medium text-sm ${
                  activeTab === tab
                    ? 'border-blue-600 text-blue-600'
                    : 'border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300'
                }`}
              >
                {tab.charAt(0).toUpperCase() + tab.slice(1)}
              </button>
            ))}
          </nav>
        </div>
      </div>

      {/* Main Content */}
      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {activeTab === 'dashboard' && (
          <div className="space-y-6">
            {/* Key Metrics */}
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
              <MetricCard
                icon={Activity}
                title="Active Chargers"
                value={`${realtimeMetrics.activeChargers}/${realtimeMetrics.totalChargers}`}
                subtitle={`${Math.round((realtimeMetrics.activeChargers / realtimeMetrics.totalChargers) * 100)}% utilization`}
                trend={12}
              />
              <MetricCard
                icon={Zap}
                title="Current Load"
                value={`${realtimeMetrics.currentLoad.toFixed(1)} kW`}
                subtitle={`Peak: ${realtimeMetrics.peakLoad} kW`}
                trend={8}
              />
              <MetricCard
                icon={Clock}
                title="Avg Session Time"
                value={`${realtimeMetrics.avgSessionTime}h`}
                subtitle="Per charging session"
                trend={-5}
              />
              <MetricCard
                icon={DollarSign}
                title="Revenue Today"
                value={`$${realtimeMetrics.revenue.toFixed(2)}`}
                subtitle="From all stations"
                trend={15}
              />
            </div>

            {/* Utilization Chart */}
            <div className="bg-white rounded-lg shadow p-6 border border-gray-200">
              <h3 className="text-lg font-semibold text-gray-900 mb-4">Utilization Over Time</h3>
              <ResponsiveContainer width="100%" height={300}>
                <AreaChart data={utilizationData}>
                  <CartesianGrid strokeDasharray="3 3" />
                  <XAxis dataKey="time" />
                  <YAxis />
                  <Tooltip />
                  <Legend />
                  <Area type="monotone" dataKey="utilization" stroke="#3B82F6" fill="#93C5FD" name="Utilization %" />
                </AreaChart>
              </ResponsiveContainer>
            </div>

            {/* Power Consumption & Revenue */}
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
              <div className="bg-white rounded-lg shadow p-6 border border-gray-200">
                <h3 className="text-lg font-semibold text-gray-900 mb-4">Power Consumption</h3>
                <ResponsiveContainer width="100%" height={250}>
                  <LineChart data={utilizationData}>
                    <CartesianGrid strokeDasharray="3 3" />
                    <XAxis dataKey="time" />
                    <YAxis />
                    <Tooltip />
                    <Legend />
                    <Line type="monotone" dataKey="power" stroke="#10B981" strokeWidth={2} name="Power (kW)" />
                  </LineChart>
                </ResponsiveContainer>
              </div>

              <div className="bg-white rounded-lg shadow p-6 border border-gray-200">
                <h3 className="text-lg font-semibold text-gray-900 mb-4">Revenue Trends</h3>
                <ResponsiveContainer width="100%" height={250}>
                  <BarChart data={utilizationData.slice(-12)}>
                    <CartesianGrid strokeDasharray="3 3" />
                    <XAxis dataKey="time" />
                    <YAxis />
                    <Tooltip />
                    <Legend />
                    <Bar dataKey="revenue" fill="#8B5CF6" name="Revenue ($)" />
                  </BarChart>
                </ResponsiveContainer>
              </div>
            </div>
          </div>
        )}

        {activeTab === 'utilization' && (
          <div className="space-y-6">
            <div className="bg-white rounded-lg shadow p-6 border border-gray-200">
              <h3 className="text-lg font-semibold text-gray-900 mb-4">Peak Demand Analysis</h3>
              <ResponsiveContainer width="100%" height={400}>
                <BarChart data={peakDemandData}>
                  <CartesianGrid strokeDasharray="3 3" />
                  <XAxis dataKey="hour" />
                  <YAxis />
                  <Tooltip />
                  <Legend />
                  <Bar dataKey="baseline" fill="#E5E7EB" name="Baseline Capacity (%)" />
                  <Bar dataKey="demand" fill="#3B82F6" name="Actual Demand (%)" />
                </BarChart>
              </ResponsiveContainer>
            </div>

            <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
              <div className="bg-white rounded-lg shadow p-6 border border-gray-200">
                <h3 className="text-lg font-semibold text-gray-900 mb-4">Utilization Distribution</h3>
                <div className="space-y-4">
                  {[
                    { label: 'Peak Hours (7-9 AM, 5-8 PM)', value: 82, color: 'bg-red-500' },
                    { label: 'Business Hours (9 AM - 5 PM)', value: 58, color: 'bg-yellow-500' },
                    { label: 'Evening (8 PM - 11 PM)', value: 45, color: 'bg-blue-500' },
                    { label: 'Night (11 PM - 7 AM)', value: 22, color: 'bg-green-500' }
                  ].map((item, idx) => (
                    <div key={idx}>
                      <div className="flex justify-between text-sm mb-1">
                        <span className="text-gray-700">{item.label}</span>
                        <span className="font-semibold">{item.value}%</span>
                      </div>
                      <div className="w-full bg-gray-200 rounded-full h-2">
                        <div className={`${item.color} h-2 rounded-full`} style={{ width: `${item.value}%` }}></div>
                      </div>
                    </div>
                  ))}
                </div>
              </div>

              <div className="bg-white rounded-lg shadow p-6 border border-gray-200">
                <h3 className="text-lg font-semibold text-gray-900 mb-4">Key Insights</h3>
                <div className="space-y-4">
                  <div className="border-l-4 border-blue-500 pl-4">
                    <p className="font-medium text-gray-900">Peak Demand Optimization</p>
                    <p className="text-sm text-gray-600 mt-1">
                      Shift 15% of evening demand to off-peak hours to reduce grid costs by $450/month
                    </p>
                  </div>
                  <div className="border-l-4 border-green-500 pl-4">
                    <p className="font-medium text-gray-900">Capacity Expansion</p>
                    <p className="text-sm text-gray-600 mt-1">
                      Current utilization suggests need for 3 additional chargers by Q3 2026
                    </p>
                  </div>
                  <div className="border-l-4 border-yellow-500 pl-4">
                    <p className="font-medium text-gray-900">Revenue Opportunity</p>
                    <p className="text-sm text-gray-600 mt-1">
                      Dynamic pricing during peak hours could increase revenue by 18-22%
                    </p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        )}

        {activeTab === 'chargers' && (
          <div className="bg-white rounded-lg shadow border border-gray-200">
            <div className="px-6 py-4 border-b border-gray-200">
              <h3 className="text-lg font-semibold text-gray-900">Live Charger Status</h3>
            </div>
            <div className="overflow-x-auto">
              <table className="w-full">
                <thead className="bg-gray-50">
                  <tr>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">Charger ID</th>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">Status</th>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">Power Output</th>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">Vehicle</th>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">SOC</th>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">Time Remaining</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-gray-200">
                  {chargerStatus.map((charger) => (
                    <tr key={charger.id} className="hover:bg-gray-50">
                      <td className="px-6 py-4 whitespace-nowrap">
                        <span className="font-medium text-gray-900">{charger.id}</span>
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap">
                        <span className={`px-2 py-1 text-xs font-semibold rounded-full ${
                          charger.status === 'active' 
                            ? 'bg-green-100 text-green-800' 
                            : 'bg-gray-100 text-gray-800'
                        }`}>
                          {charger.status}
                        </span>
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                        {charger.power} kW
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                        {charger.vehicle}
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap">
                        <div className="flex items-center">
                          <Battery className="w-4 h-4 mr-2 text-gray-400" />
                          <span className="text-sm text-gray-900">{charger.soc}%</span>
                        </div>
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                        {charger.timeRemaining > 0 ? `${charger.timeRemaining} min` : '-'}
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        )}

        {activeTab === 'analytics' && (
          <div className="space-y-6">
            <div className="bg-white rounded-lg shadow p-6 border border-gray-200">
              <h3 className="text-lg font-semibold text-gray-900 mb-4">API Integration Status</h3>
              <div className="space-y-4">
                <div className="flex items-center justify-between p-4 bg-green-50 rounded-lg border border-green-200">
                  <div className="flex items-center space-x-3">
                    <div className="w-3 h-3 bg-green-500 rounded-full animate-pulse"></div>
                    <span className="font-medium text-gray-900">Tesla Fleet API</span>
                  </div>
                  <span className="text-sm text-green-700">Connected</span>
                </div>
                
                <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mt-6">
                  <div className="p-4 border border-gray-200 rounded-lg">
                    <p className="text-sm text-gray-600">API Calls Today</p>
                    <p className="text-2xl font-bold text-gray-900 mt-1">1,247</p>
                  </div>
                  <div className="p-4 border border-gray-200 rounded-lg">
                    <p className="text-sm text-gray-600">Data Points Collected</p>
                    <p className="text-2xl font-bold text-gray-900 mt-1">15,892</p>
                  </div>
                  <div className="p-4 border border-gray-200 rounded-lg">
                    <p className="text-sm text-gray-600">Last Sync</p>
                    <p className="text-2xl font-bold text-gray-900 mt-1">2m ago</p>
                  </div>
                </div>
              </div>
            </div>

            <div className="bg-white rounded-lg shadow p-6 border border-gray-200">
              <h3 className="text-lg font-semibold text-gray-900 mb-4">Predictive Analytics</h3>
              <div className="space-y-4">
                <div className="p-4 bg-blue-50 border border-blue-200 rounded-lg">
                  <h4 className="font-medium text-gray-900 mb-2">Next 24 Hours Forecast</h4>
                  <p className="text-sm text-gray-600">Expected peak utilization: 18:00 - 20:00 (89% capacity)</p>
                  <p className="text-sm text-gray-600">Recommended pricing adjustment: +15% during peak</p>
                </div>
                <div className="p-4 bg-purple-50 border border-purple-200 rounded-lg">
                  <h4 className="font-medium text-gray-900 mb-2">Grid Optimization</h4>
                  <p className="text-sm text-gray-600">Potential load shifting opportunity: 45 kWh</p>
                  <p className="text-sm text-gray-600">Estimated grid services revenue: $23.50</p>
                </div>
              </div>
            </div>
          </div>
        )}
      </main>

      {/* Footer */}
      <footer className="bg-white border-t border-gray-200 mt-12">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6">
          <p className="text-center text-sm text-gray-500">
            EV Charging Analytics Platform • Built for Tesla Fleet API Integration
          </p>
        </div>
      </footer>
    </div>
  );
};

export default EVChargingPlatform;
