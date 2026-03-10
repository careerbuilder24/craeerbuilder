'use client';

import React, { useEffect, useState } from 'react';
import Image from 'next/image';
import AdminFooter from '../Admin Footer/AdminFooter';
import useRegistered from '@/hooks/useRegistered';
import useDailyLogins from '@/hooks/useDailyLogins';
import {
  PieChart,
  Pie,
  Cell,
  Tooltip as PieTooltip,
  ResponsiveContainer,
  LineChart,
  Line,
  XAxis,
  YAxis,
  CartesianGrid,
  AreaChart,
  Area,
  Tooltip,
} from 'recharts';

const COLORS = ['#c2d1ff', '#a3baff', '#7b9bff', '#BBF0C6'];

export default function PendingTable({ data = [] }) {
  const [showAll, setShowAll] = useState(false);
  const [students, setStudents] = useState(Array.isArray(data) ? data : []);
  const [modalStudent, setModalStudent] = useState(null);
  const [searchQuery, setSearchQuery] = useState('');
  const [register] = useRegistered();
  const { dailyLogins, loading, error } = useDailyLogins();

  useEffect(() => {
    setStudents(data);
  }, [data]);

  // 🔍 Filter students by search query
  const filteredStudents = Array.isArray(students)
    ? students.filter((s) => {
        const query = searchQuery.toLowerCase();
        return (
          s.name?.toLowerCase().includes(query) ||
          s.email?.toLowerCase().includes(query) ||
          s.phone?.toLowerCase().includes(query)
        );
      })
    : [];

  const visibleStudents = showAll ? filteredStudents : filteredStudents.slice(0, 5);

  // 🔄 Update student status
  const updateStatus = async (student, status) => {
    try {
      const res = await fetch('/api/students_Edit_Profile', {
        method: 'PUT',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ id: student.id, status }),
      });
      const result = await res.json();
      if (result.success) {
        setStudents((prev) =>
          prev.map((s) => (s.id === student.id ? { ...s, status } : s))
        );
      } else {
        alert('Error: ' + result.message);
      }
    } catch (err) {
      console.error(err);
      alert('Failed to update status.');
    }
  };

  const handleAccept = (student) => {
    if (student.status === 'pending' && confirm(`Accept ${student.name}?`)) {
      updateStatus(student, 'accepted');
    }
  };

  const handleDeny = (student) => {
    if (student.status === 'pending' && confirm(`Deny ${student.name}?`)) {
      updateStatus(student, 'denied');
    }
  };

  const handleDelete = async (student) => {
    if (confirm(`Delete ${student.name}?`)) {
      try {
        const res = await fetch('/api/students_Edit_Profile', {
          method: 'DELETE',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({ id: student.id }),
        });
        const result = await res.json();
        if (result.success) {
          setStudents((prev) => prev.filter((s) => s.id !== student.id));
          alert(result.message);
        } else {
          alert(result.message);
        }
      } catch (err) {
        console.error(err);
        alert('Failed to delete student.');
      }
    }
  };

  // 📊 Pie Chart: Status Breakdown
  const pieData = [
    { name: 'Accepted', value: students.filter((s) => s.status === 'accepted').length },
    { name: 'Pending', value: students.filter((s) => s.status === 'pending').length },
    { name: 'Denied', value: students.filter((s) => s.status === 'denied').length },
  ];

  // 📈 Line Chart: Total Registered per Month
  const monthNames = [
    'Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun',
    'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec',
  ];

  const monthlyData = Array.from({ length: 12 }, (_, i) => {
    const count = students.filter(
      (s) => new Date(s.created_at).getMonth() === i
    ).length;
    return { name: monthNames[i], users: count };
  });

  // 🔹 Monthly Logins (from dailyLogins)
  const monthlyLogins = Array.from({ length: 12 }, (_, i) => {
    const total = dailyLogins
      .filter(entry => new Date(entry.date).getMonth() === i)
      .reduce((sum, entry) => sum + entry.total_logins, 0);
    return { name: monthNames[i], logins: total };
  });

  // 📉 Area Chart: Requests per Month (simulated)
  const requestData = monthlyData.map((m) => ({
    name: m.name,
    requests: Math.floor(m.users * 1.5 + Math.random() * 10),
  }));

  return (
    <>
      {/* ==== Charts Section (2x2 Grid) ==== */}
      <div className="flex justify-center items-center py-10 bg-gray-50">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 max-w-6xl w-full px-4">

          {/* 🥧 Pie Chart */}
          <div className="p-6 shadow-md rounded-xl bg-white text-center">
            <h2 className="text-lg font-semibold mb-4">User Registration Status</h2>
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
          </div>

          {/* 📈 Line Chart: Monthly Logins */}
          <div className="p-6 shadow-md rounded-xl bg-white text-center">
            <h2 className="text-lg font-semibold mb-4">Monthly User Logins</h2>
            <ResponsiveContainer width="100%" height={250}>
              <LineChart data={monthlyLogins}>
                <CartesianGrid strokeDasharray="3 3" />
                <XAxis dataKey="name" />
                <YAxis label={{ value: 'Total Logins', angle: -90, position: 'insideLeft' }} />
                <Tooltip />
                <Line type="monotone" dataKey="logins" stroke="#2563eb" strokeWidth={3} />
              </LineChart>
            </ResponsiveContainer>
          </div>

          {/* 📊 Line Chart: Monthly Users */}
          <div className="p-6 shadow-md rounded-xl bg-white text-center">
            <h2 className="text-lg font-semibold mb-4">Total Users Registered (Monthly)</h2>
            <ResponsiveContainer width="100%" height={250}>
              <LineChart data={monthlyData}>
                <CartesianGrid strokeDasharray="3 3" />
                <XAxis dataKey="name" />
                <YAxis allowDecimals={false} />
                <Tooltip />
                <Line type="monotone" dataKey="users" stroke="#7b9bff" strokeWidth={3} />
              </LineChart>
            </ResponsiveContainer>
          </div>

          {/* 🌊 Area Chart */}
          <div className="p-6 shadow-md rounded-xl bg-white text-center">
            <h2 className="text-lg font-semibold mb-4">Student Requests Per Month</h2>
            <ResponsiveContainer width="100%" height={250}>
              <AreaChart data={requestData}>
                <defs>
                  <linearGradient id="colorRequests" x1="0" y1="0" x2="0" y2="1">
                    <stop offset="5%" stopColor="#17549A" stopOpacity={0.8} />
                    <stop offset="95%" stopColor="#17549A" stopOpacity={0} />
                  </linearGradient>
                </defs>
                <CartesianGrid strokeDasharray="3 3" />
                <XAxis dataKey="name" />
                <YAxis allowDecimals={false} />
                <Tooltip />
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
          </div>
        </div>
      </div>

      {/* ==== Student Table ==== */}
      <div className="bg-white p-6 rounded-xl shadow-md max-w-6xl mx-auto">
        <div className="flex justify-between items-center mb-6">
          <div>
            <h2 className="text-xl font-semibold">All Student Requests</h2>
            <p className="text-sm text-gray-500">
              Pending, Accepted, and Denied requests
            </p>
          </div>
          <input
            type="text"
            placeholder="Search by name, email, or phone"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="border px-3 py-1 rounded-md text-sm focus:ring-2 focus:ring-[#17549A] outline-none"
          />
        </div>

        <div className="overflow-x-auto scrollbar-hide">
          <table className="w-full text-sm border-separate border-spacing-y-2">
            <thead>
              <tr className="text-center text-gray-600">
                <th className="p-2">Name</th>
                <th className="p-2">Action</th>
                <th className="p-2">Email</th>
                <th className="p-2">Phone</th>
                <th className="p-2">Student Type</th>
                <th className="p-2">Date</th>
                <th className="p-2">Status</th>
                {/* <th className="p-2">Requests</th> */}
                <th className="p-2"></th>
              </tr>
            </thead>

            <tbody>
              {visibleStudents.length > 0 ? (
                visibleStudents.map((student, index) => (
                  <tr
                    key={index}
                    className="bg-gray-50 hover:bg-gray-100 rounded-lg transition-all"
                  >
                    <td className="flex items-center gap-3 p-2">
                      <Image
                        src={student.uploadedImage || '/default.png'}
                        alt={student.name}
                        width={40}
                        height={40}
                        className="rounded-full object-cover"
                      />
                      <span className='text-center'>{student.name}</span>
                    </td>

                    <td className="p-2">
                      <div className="flex gap-2 justify-center">
                        <button
                          className="bg-green-500 text-white px-3 py-1 rounded-full text-xs hover:bg-green-600 transition disabled:opacity-50"
                          onClick={() => handleAccept(student)}
                          disabled={student.status !== 'pending'}
                        >
                          Accept
                        </button>
                        <button
                          className="bg-red-500 text-white px-3 py-1 rounded-full text-xs hover:bg-red-600 transition disabled:opacity-50"
                          onClick={() => handleDeny(student)}
                          disabled={student.status !== 'pending'}
                        >
                          Deny
                        </button>
                      </div>
                    </td>

                    <td className="p-2 text-center">{student.email || '—'}</td>
                    <td className="p-2 text-center">{student.phone || '—'}</td>
                    <td className="p-2 text-center">{student.studentType || '—'}</td>
                    <td className="p-2 text-center">
                      {new Date(student.created_at).toLocaleDateString()}
                    </td>
                    <td className="p-2 text-center">
                      <span
                        className={`px-3 py-1 text-xs rounded-full ${
                          student.status === 'pending'
                            ? 'bg-yellow-100 text-yellow-800'
                            : student.status === 'accepted'
                            ? 'bg-green-100 text-green-800'
                            : 'bg-red-100 text-red-800'
                        }`}
                      >
                        {student.status}
                      </span>
                    </td>
                    {/* <td className="p-2 text-center">
                      <button
                        className="text-sm px-3 py-1 border rounded-full bg-gray-200 hover:bg-gray-300 transition"
                        onClick={() => setModalStudent(student)}
                      >
                        View
                      </button>
                    </td> */}
                    <td className="p-2 text-center">
                      <button
                        className="text-sm px-4 py-1 border rounded-full bg-[#3f7bfa] hover:bg-red-500 transition-all duration-300 text-white"
                        onClick={() => handleDelete(student)}
                      >
                        Delete
                      </button>
                    </td>
                  </tr>
                ))
              ) : (
                <tr>
                  <td colSpan="9" className="text-center py-4 text-gray-500">
                    No student requests found.
                  </td>
                </tr>
              )}
            </tbody>
          </table>
        </div>

        {students.length > 5 && (
          <div className="mt-4 text-right">
            <button
              className="text-sm border px-4 py-2 rounded-full hover:bg-[#17549A] hover:text-white transition-all duration-300"
              onClick={() => setShowAll(!showAll)}
            >
              {showAll ? 'Show Less' : 'View All Requests'}
            </button>
          </div>
        )}
      </div>
      {/* ==== Modal ==== */}
      {/* {modalStudent && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/50">
          <div className="bg-white rounded-xl p-6 max-w-3xl w-full relative">
            <button
              className="absolute top-3 right-3 text-gray-500 hover:text-gray-800"
              onClick={() => setModalStudent(null)}
            >
              ✕
            </button>
            <h2 className="text-xl font-semibold mb-4">
              Requests for {modalStudent.name}
            </h2>
            <ul className="space-y-2">
              <li>CV Update: {modalStudent.cvUpdate ? 'Yes' : 'No'}</li>
              <li>CV Generate: {modalStudent.cvGenerate ? 'Yes' : 'No'}</li>
              <li>Achievements: {modalStudent.achievements ? 'Yes' : 'No'}</li>
              <li>Pictures: {modalStudent.pictures ? 'Yes' : 'No'}</li>
              <li>Video: {modalStudent.video ? 'Yes' : 'No'}</li>
              <li>Certificates: {modalStudent.certificates ? 'Yes' : 'No'}</li>
              <li>Blog: {modalStudent.blog ? 'Yes' : 'No'}</li>
            </ul>
          </div>
        </div>
      )} */}

      <AdminFooter />
    </>
  );
}
