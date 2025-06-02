import { useState, useEffect } from 'react';
import { FaUsers, FaMoneyBillWave, FaProjectDiagram, FaCalendarAlt } from 'react-icons/fa';

const Dashboard = () => {
  const [statistics, setStatistics] = useState({
    totalDonors: 0,
    totalDonations: 0,
    activePrograms: 0,
    recentActivities: 0
  });

  // Simulate loading data from API
  useEffect(() => {
    // In a real app, this would be an API call
    const fetchData = () => {
      // Mock data
      setTimeout(() => {
        setStatistics({
          totalDonors: 126,
          totalDonations: 'Rp 45.500.000',
          activePrograms: 4,
          recentActivities: 8
        });
      }, 1000);
    };
    
    fetchData();
  }, []);

  // Dashboard cards data
  const cards = [
    {
      title: 'Total Donatur',
      value: statistics.totalDonors,
      icon: <FaUsers className="h-8 w-8 text-blue-500" />,
      bgColor: 'bg-blue-100',
      textColor: 'text-blue-800'
    },
    {
      title: 'Total Donasi',
      value: statistics.totalDonations,
      icon: <FaMoneyBillWave className="h-8 w-8 text-green-500" />,
      bgColor: 'bg-green-100',
      textColor: 'text-green-800'
    },
    {
      title: 'Program Aktif',
      value: statistics.activePrograms,
      icon: <FaProjectDiagram className="h-8 w-8 text-purple-500" />,
      bgColor: 'bg-purple-100',
      textColor: 'text-purple-800'
    },
    {
      title: 'Aktivitas Terbaru',
      value: statistics.recentActivities,
      icon: <FaCalendarAlt className="h-8 w-8 text-orange-500" />,
      bgColor: 'bg-orange-100',
      textColor: 'text-orange-800'
    }
  ];

  // Recent activities mock data
  const recentActivities = [
    { id: 1, action: 'Donasi baru', user: 'Budi Santoso', amount: 'Rp 500.000', timestamp: '2 jam yang lalu' },
    { id: 2, action: 'Program diperbarui', user: 'Admin', program: 'Program Reguler', timestamp: '5 jam yang lalu' },
    { id: 3, action: 'Donasi baru', user: 'Siti Aminah', amount: 'Rp 1.000.000', timestamp: '1 hari yang lalu' },
    { id: 4, action: 'Donatur baru terdaftar', user: 'Ahmad Yusuf', timestamp: '2 hari yang lalu' },
    { id: 5, action: 'Laporan dibuat', user: 'Admin', report: 'Implementasi Q2 2023', timestamp: '3 hari yang lalu' }
  ];

  return (
    <div className="container mx-auto">
      <div className="mb-6">
        <h1 className="text-2xl font-semibold text-gray-800">Dashboard Admin</h1>
        <p className="text-gray-600">Selamat datang di panel admin Karya Muda</p>
      </div>

      {/* Statistics Cards */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4 mb-8">
        {cards.map((card, index) => (
          <div key={index} className={`${card.bgColor} p-4 rounded-lg shadow-sm`}>
            <div className="flex items-center justify-between">
              <div>
                <h2 className="text-gray-600 text-sm font-medium">{card.title}</h2>
                <p className={`${card.textColor} text-2xl font-bold mt-1`}>{card.value}</p>
              </div>
              <div className="rounded-full p-3 bg-white bg-opacity-30">
                {card.icon}
              </div>
            </div>
          </div>
        ))}
      </div>

      {/* Main Content Grid */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Recent Donations List */}
        <div className="lg:col-span-2 bg-white rounded-lg shadow-sm p-4">
          <h2 className="text-lg font-semibold text-gray-800 mb-4">Aktivitas Terbaru</h2>
          <div className="overflow-x-auto">
            <table className="min-w-full bg-white">
              <thead className="bg-gray-50 text-gray-600 text-sm leading-normal">
                <tr>
                  <th className="py-3 px-4 text-left">Aktivitas</th>
                  <th className="py-3 px-4 text-left">Detail</th>
                  <th className="py-3 px-4 text-left">Waktu</th>
                </tr>
              </thead>
              <tbody className="text-gray-600 text-sm">
                {recentActivities.map((activity) => (
                  <tr key={activity.id} className="border-b border-gray-200 hover:bg-gray-50">
                    <td className="py-3 px-4">{activity.action}</td>
                    <td className="py-3 px-4">
                      {activity.user}
                      {activity.amount && <span className="ml-1 text-green-600">{activity.amount}</span>}
                      {activity.program && <span className="ml-1">- {activity.program}</span>}
                      {activity.report && <span className="ml-1">- {activity.report}</span>}
                    </td>
                    <td className="py-3 px-4 text-gray-500">{activity.timestamp}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>

        {/* Quick Actions Card */}
        <div className="bg-white rounded-lg shadow-sm p-4">
          <h2 className="text-lg font-semibold text-gray-800 mb-4">Aksi Cepat</h2>
          <div className="space-y-3">
            <button className="w-full flex items-center justify-between p-3 bg-blue-50 hover:bg-blue-100 rounded-md text-blue-700 transition">
              <span className="font-medium">Buat Laporan Baru</span>
              <FaCalendarAlt />
            </button>
            <button className="w-full flex items-center justify-between p-3 bg-green-50 hover:bg-green-100 rounded-md text-green-700 transition">
              <span className="font-medium">Tambah Donatur</span>
              <FaUsers />
            </button>
            <button className="w-full flex items-center justify-between p-3 bg-purple-50 hover:bg-purple-100 rounded-md text-purple-700 transition">
              <span className="font-medium">Update Program</span>
              <FaProjectDiagram />
            </button>
            <button className="w-full flex items-center justify-between p-3 bg-orange-50 hover:bg-orange-100 rounded-md text-orange-700 transition">
              <span className="font-medium">Catat Donasi Baru</span>
              <FaMoneyBillWave />
            </button>
          </div>

          <div className="mt-6">
            <h3 className="text-md font-semibold text-gray-800 mb-3">Statistik Donasi</h3>
            <div className="bg-gray-100 p-3 rounded-md">
              <p className="text-sm text-gray-600 mb-2">Terkumpul bulan ini:</p>
              <div className="relative pt-1">
                <div className="overflow-hidden h-4 text-xs flex rounded-full bg-gray-200">
                  <div 
                    style={{ width: "68%" }} 
                    className="shadow-none flex flex-col text-center whitespace-nowrap text-white justify-center bg-primary"
                  ></div>
                </div>
                <div className="flex justify-between mt-1">
                  <span className="text-xs font-semibold text-gray-600">Rp 15.300.000</span>
                  <span className="text-xs font-semibold text-gray-600">Target: Rp 22.500.000</span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Dashboard; 