'use client';

import PendingTable from '@/app/(with-navbar)/componenets/PendingTable/PendingTable';
import {
  PieChart, Pie, Cell, Tooltip as PieTooltip, ResponsiveContainer,
  LineChart, Line, XAxis,  Area, YAxis, Tooltip as AreaTooltip, CartesianGrid, Tooltip as LineTooltip,
  AreaChart
} from 'recharts';

const pieData = [
  { name: '0 - 1,000', value: 400 },
  { name: '1,000 - 10,000', value: 300 },
  { name: '10,000 - 100,000', value: 300 },
  { name: '100,000 - 1,000,000', value: 200 },
];

const COLORS = ['#c2d1ff', '#a3baff', '#7b9bff', '#BBF0C6'];

const lineData = [
  { name: 'Jan', users: 400 },
  { name: 'Feb', users: 700 },
  { name: 'Mar', users: 1200 },
  { name: 'Apr', users: 1000 },
  { name: 'May', users: 1500 },
  { name: 'Jun', users: 2500 },
  { name: 'July', users: 1000 },
  { name: 'August', users: 3000 },
  { name: 'September', users: 2400 },
  { name: 'October', users: 2000 },
  { name: 'November', users: 1100 },
  { name: 'December', users: 500 },
];

const requestData = [
  { name: 'Jan', requests: 200 },
  { name: 'Feb', requests: 450 },
  { name: 'Mar', requests: 600 },
  { name: 'Apr', requests: 800 },
  { name: 'May', requests: 1200 },
  { name: 'Jun', requests: 1500 },
  { name: 'July', requests: 1800 },
  { name: 'August', requests: 2000 },
  { name: 'September', requests: 1700 },
  { name: 'October', requests: 1400 },
  { name: 'November', requests: 900 },
  { name: 'December', requests: 400 },
];

export default function UserLoginsPieChart() {
  return (
    <div className=''>
      <div className="flex justify-center items-center gap-5 flex-wrap">
        {/* Pie Chart */}
        <div className="w-full max-w-sm p-4 shadow-md rounded-xl bg-white text-center">
          <h2 className="text-lg font-semibold mb-4">Total user logins</h2>
          <ResponsiveContainer width="100%" height={250}>
            <PieChart>
              <Pie
                data={pieData}
                cx="50%"
                cy="50%"
                innerRadius={60}
                outerRadius={80}
                dataKey="value"
                paddingAngle={5}
              >
                {pieData.map((entry, index) => (
                  <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
                ))}
              </Pie>
              <PieTooltip />
            </PieChart>
          </ResponsiveContainer>
          {/* <button className="mt-4 px-4 py-2 text-white bg-[#A26CFF] hover:bg-[#17549A] transition-all duration-300 rounded-lg">View full report</button> */}
        </div>

        {/* User Registration Line Chart */}
        <div className="w-full max-w-sm p-4 shadow-md rounded-xl bg-white text-center">
          <h2 className="text-lg font-semibold mb-4">Total User Registered</h2>
          <ResponsiveContainer width="100%" height={250}>
            <LineChart data={lineData} margin={{ top: 10, right: 30, left: 0, bottom: 0 }}>
              <CartesianGrid strokeDasharray="3 3" />
              <XAxis dataKey="name" />
              <YAxis />
              <LineTooltip />
              <Line type="monotone" dataKey="users" stroke="#7b9bff" strokeWidth={3} />
            </LineChart>
          </ResponsiveContainer>
          {/* <button className="mt-4 px-4 py-2 text-white bg-[#A26CFF] hover:bg-[#17549A] transition-all duration-300 rounded-lg">View full report</button> */}
        </div>

        {/* Student Requests Area Chart */}
        <div className="w-full max-w-sm p-4 shadow-md rounded-xl bg-white text-center">
          <h2 className="text-lg font-semibold mb-4">Student Requests Per Month</h2>
          <ResponsiveContainer width="100%" height={250}>
            <AreaChart data={requestData} margin={{ top: 10, right: 30, left: 0, bottom: 0 }}>
              <defs>
                <linearGradient id="colorRequests" x1="0" y1="0" x2="0" y2="1">
                  <stop offset="5%" stopColor="#17549A" stopOpacity={0.8} />
                  <stop offset="95%" stopColor="#17549A" stopOpacity={0} />
                </linearGradient>
              </defs>
              <CartesianGrid strokeDasharray="3 3" />
              <XAxis dataKey="name" />
              <YAxis />
              <AreaTooltip />
              <Area
                type="monotone"
                dataKey="requests"
                stroke="#17549A"
                fillOpacity={1}
                fill="url(#colorRequests)"
                strokeWidth={3}
              />
            </AreaChart>
          </ResponsiveContainer>
          {/* <button className="mt-4 px-4 py-2 text-white bg-[#A26CFF] hover:bg-[#17549A] transition-all duration-300 rounded-lg">View full report</button> */}
        </div>
      </div>

      <PendingTable />
    </div>
  );
}