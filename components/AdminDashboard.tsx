import React from 'react';
import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
  LineChart,
  Line
} from 'recharts';
import { Package, Users, DollarSign, TrendingUp } from 'lucide-react';

const data = [
  { name: 'Mon', sales: 4000, orders: 24 },
  { name: 'Tue', sales: 3000, orders: 18 },
  { name: 'Wed', sales: 2000, orders: 12 },
  { name: 'Thu', sales: 2780, orders: 20 },
  { name: 'Fri', sales: 1890, orders: 15 },
  { name: 'Sat', sales: 6390, orders: 45 },
  { name: 'Sun', sales: 5490, orders: 38 },
];

const StatCard = ({ title, value, icon: Icon, trend }: any) => (
  <div className="bg-white p-6 rounded-2xl border border-stone-100 shadow-sm">
    <div className="flex items-center justify-between mb-4">
      <div className="p-3 bg-green-50 rounded-xl">
        <Icon className="text-green-600 h-6 w-6" />
      </div>
      <span className={`text-sm font-medium ${trend > 0 ? 'text-green-600' : 'text-red-500'}`}>
        {trend > 0 ? '+' : ''}{trend}%
      </span>
    </div>
    <h3 className="text-stone-500 text-sm font-medium">{title}</h3>
    <p className="text-2xl font-bold text-stone-900 mt-1">{value}</p>
  </div>
);

const AdminDashboard: React.FC = () => {
  return (
    <div className="space-y-8 p-6 max-w-7xl mx-auto">
      <div className="flex justify-between items-center">
        <h2 className="text-2xl font-bold font-serif text-stone-800">Admin Overview</h2>
        <div className="text-sm text-stone-500">Last updated: Just now</div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        <StatCard title="Total Revenue" value="₹124,500" icon={DollarSign} trend={12} />
        <StatCard title="Active Orders" value="45" icon={Package} trend={8} />
        <StatCard title="New Customers" value="128" icon={Users} trend={24} />
        <StatCard title="Growth Rate" value="18.2%" icon={TrendingUp} trend={4} />
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
        {/* Sales Chart */}
        <div className="bg-white p-6 rounded-2xl border border-stone-100 shadow-sm">
          <h3 className="text-lg font-bold text-stone-800 mb-6">Weekly Sales</h3>
          <div className="h-72">
            <ResponsiveContainer width="100%" height="100%">
              <BarChart data={data}>
                <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="#E5E7EB" />
                <XAxis 
                  dataKey="name" 
                  axisLine={false} 
                  tickLine={false} 
                  tick={{ fill: '#6B7280', fontSize: 12 }} 
                  dy={10}
                />
                <YAxis 
                  axisLine={false} 
                  tickLine={false} 
                  tick={{ fill: '#6B7280', fontSize: 12 }} 
                />
                <Tooltip 
                  cursor={{ fill: '#F3F4F6' }}
                  contentStyle={{ borderRadius: '8px', border: 'none', boxShadow: '0 4px 6px -1px rgba(0, 0, 0, 0.1)' }}
                />
                <Bar dataKey="sales" fill="#15803d" radius={[4, 4, 0, 0]} />
              </BarChart>
            </ResponsiveContainer>
          </div>
        </div>

        {/* Orders Trend */}
        <div className="bg-white p-6 rounded-2xl border border-stone-100 shadow-sm">
          <h3 className="text-lg font-bold text-stone-800 mb-6">Order Volume</h3>
          <div className="h-72">
            <ResponsiveContainer width="100%" height="100%">
              <LineChart data={data}>
                <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="#E5E7EB" />
                <XAxis 
                  dataKey="name" 
                  axisLine={false} 
                  tickLine={false} 
                  tick={{ fill: '#6B7280', fontSize: 12 }} 
                  dy={10}
                />
                <YAxis 
                  axisLine={false} 
                  tickLine={false} 
                  tick={{ fill: '#6B7280', fontSize: 12 }} 
                />
                <Tooltip 
                   contentStyle={{ borderRadius: '8px', border: 'none', boxShadow: '0 4px 6px -1px rgba(0, 0, 0, 0.1)' }}
                />
                <Line 
                  type="monotone" 
                  dataKey="orders" 
                  stroke="#eab308" 
                  strokeWidth={3} 
                  dot={{ fill: '#eab308', strokeWidth: 2, r: 4, stroke: '#fff' }} 
                  activeDot={{ r: 6 }} 
                />
              </LineChart>
            </ResponsiveContainer>
          </div>
        </div>
      </div>

      <div className="bg-white rounded-2xl border border-stone-100 shadow-sm overflow-hidden">
        <div className="p-6 border-b border-stone-100">
          <h3 className="text-lg font-bold text-stone-800">Recent Orders</h3>
        </div>
        <div className="overflow-x-auto">
          <table className="w-full text-left text-sm text-stone-600">
            <thead className="bg-stone-50 text-stone-900 font-medium">
              <tr>
                <th className="px-6 py-4">Order ID</th>
                <th className="px-6 py-4">Customer</th>
                <th className="px-6 py-4">Status</th>
                <th className="px-6 py-4">Total</th>
                <th className="px-6 py-4">Date</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-stone-100">
              {[1, 2, 3, 4, 5].map((i) => (
                <tr key={i} className="hover:bg-stone-50/50 transition-colors">
                  <td className="px-6 py-4">#ORD-00{i}</td>
                  <td className="px-6 py-4 font-medium text-stone-900">John Doe</td>
                  <td className="px-6 py-4">
                    <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-green-100 text-green-800">
                      Processing
                    </span>
                  </td>
                  <td className="px-6 py-4">₹{i * 450 + 100}</td>
                  <td className="px-6 py-4 text-stone-400">Oct {10 + i}, 2023</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
};

export default AdminDashboard;
