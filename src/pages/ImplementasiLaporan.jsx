import React, { useState } from 'react';
import { motion } from 'framer-motion';

const ImplementasiLaporan = () => {
  const [activeTab, setActiveTab] = useState('kegiatan'); // 'kegiatan' or 'keuangan'

  // Sample implementation reports data
  const implementationReports = [
    {
      id: 1,
      name: 'Nama Kegiatan',
      image: '/kegiatan1.jpg',
      date: '12 Juni 2023',
      description: 'Deskripsi singkat tentang kegiatan implementasi program yang sudah dilaksanakan.'
    },
    {
      id: 2,
      name: 'Nama Kegiatan',
      image: '/kegiatan2.jpg',
      date: '24 Juli 2023',
      description: 'Deskripsi singkat tentang kegiatan implementasi program yang sudah dilaksanakan.'
    },
    {
      id: 3,
      name: 'Nama Kegiatan',
      image: '/kegiatan3.jpg',
      date: '10 Agustus 2023',
      description: 'Deskripsi singkat tentang kegiatan implementasi program yang sudah dilaksanakan.'
    },
    {
      id: 4,
      name: 'Nama Kegiatan',
      image: '/kegiatan4.jpg',
      date: '15 September 2023',
      description: 'Deskripsi singkat tentang kegiatan implementasi program yang sudah dilaksanakan.'
    },
    {
      id: 5,
      name: 'Nama Kegiatan',
      image: '/kegiatan5.jpg',
      date: '30 Oktober 2023',
      description: 'Deskripsi singkat tentang kegiatan implementasi program yang sudah dilaksanakan.'
    },
    {
      id: 6,
      name: 'Nama Kegiatan',
      image: '/kegiatan6.jpg',
      date: '20 November 2023',
      description: 'Deskripsi singkat tentang kegiatan implementasi program yang sudah dilaksanakan.'
    },
    {
      id: 7,
      name: 'Nama Kegiatan',
      image: '/kegiatan7.jpg',
      date: '10 Desember 2023',
      description: 'Deskripsi singkat tentang kegiatan implementasi program yang sudah dilaksanakan.'
    },
    {
      id: 8,
      name: 'Nama Kegiatan',
      image: '/kegiatan8.jpg',
      date: '25 Januari 2024',
      description: 'Deskripsi singkat tentang kegiatan implementasi program yang sudah dilaksanakan.'
    }
  ];

  // Sample financial reports data
  const financialReports = [
    {
      id: 1,
      month: 'Januari 2024',
      income: 'Rp 15.750.000',
      expenses: 'Rp 12.450.000',
      balance: 'Rp 3.300.000',
      details: 'Laporan keuangan bulan Januari mencakup pemasukan dari donasi reguler dan pengeluaran untuk program pendidikan.'
    },
    {
      id: 2,
      month: 'Desember 2023',
      income: 'Rp 18.250.000',
      expenses: 'Rp 16.125.000',
      balance: 'Rp 2.125.000',
      details: 'Laporan keuangan bulan Desember mencakup pemasukan dari donasi akhir tahun dan pengeluaran untuk program sosial.'
    },
    {
      id: 3,
      month: 'November 2023',
      income: 'Rp 14.500.000',
      expenses: 'Rp 13.750.000',
      balance: 'Rp 750.000',
      details: 'Laporan keuangan bulan November mencakup pemasukan dari donasi reguler dan pengeluaran untuk program pendidikan dan sosial.'
    },
    {
      id: 4,
      month: 'Oktober 2023',
      income: 'Rp 13.250.000',
      expenses: 'Rp 12.100.000',
      balance: 'Rp 1.150.000',
      details: 'Laporan keuangan bulan Oktober mencakup pemasukan dari donasi reguler dan pengeluaran untuk program pendidikan.'
    }
  ];

  return (
    <div className="min-h-screen bg-gray-50 pt-20">
      <div className="container mx-auto px-4 py-12">
        <motion.div 
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          className="max-w-6xl mx-auto"
        >
          <h1 className="text-3xl md:text-4xl font-bold text-primary mb-6">Laporan</h1>
          
          {/* Tab Navigation */}
          <div className="flex border-b border-gray-200 mb-6">
            <button
              className={`py-3 px-6 font-medium text-lg ${
                activeTab === 'kegiatan'
                  ? 'text-primary border-b-2 border-primary'
                  : 'text-gray-500 hover:text-gray-700'
              }`}
              onClick={() => setActiveTab('kegiatan')}
            >
              Laporan Kegiatan
            </button>
            <button
              className={`py-3 px-6 font-medium text-lg ${
                activeTab === 'keuangan'
                  ? 'text-primary border-b-2 border-primary'
                  : 'text-gray-500 hover:text-gray-700'
              }`}
              onClick={() => setActiveTab('keuangan')}
            >
              Laporan Keuangan
            </button>
          </div>
          
          {/* Laporan Kegiatan Tab */}
          {activeTab === 'kegiatan' && (
            <>
              <h2 className="text-2xl font-semibold text-gray-800 mb-4">Laporan Kegiatan</h2>
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
                {implementationReports.map((report) => (
                  <motion.div 
                    key={report.id}
                    whileHover={{ y: -5 }}
                    className="bg-white rounded-lg shadow-md overflow-hidden cursor-pointer"
                  >
                    <div className="h-52 overflow-hidden">
                      <img 
                        src={report.image} 
                        alt={report.name}
                        className="w-full h-full object-cover"
                        onError={(e) => {
                          e.target.onerror = null;
                          e.target.src = `https://via.placeholder.com/400x250/e6f7ff/0066cc?text=${report.name}`;
                        }}
                      />
                    </div>
                    <div className="p-4">
                      <h3 className="font-semibold text-primary mb-2">{report.name}</h3>
                      <p className="text-sm text-gray-500 mb-2">{report.date}</p>
                      <p className="text-gray-700 text-sm">{report.description}</p>
                    </div>
                  </motion.div>
                ))}
              </div>

              <div className="bg-white rounded-lg shadow-md p-6 mb-8">
                <h2 className="text-2xl font-semibold text-gray-800 mb-4">Tentang Laporan Kegiatan</h2>
                <p className="text-gray-700 mb-6 leading-relaxed">
                  Laporan Kegiatan Karya Muda Sunan Drajat berisi dokumentasi dan laporan 
                  dari berbagai kegiatan yang telah kami lakukan. Laporan ini menunjukkan bagaimana 
                  dana yang telah diberikan oleh para donatur digunakan dengan tepat sasaran untuk 
                  mendukung program-program kami.
                </p>
                
                <h3 className="text-xl font-semibold text-gray-800 mb-3">Transparansi Penggunaan Dana</h3>
                <p className="text-gray-700 mb-6 leading-relaxed">
                  Kami berkomitmen untuk transparan dalam penggunaan setiap dana yang diterima. 
                  Setiap bulan kami menerbitkan laporan keuangan yang merinci pemasukan dan pengeluaran 
                  serta alokasi dana untuk masing-masing program yang kami jalankan.
                </p>
                
                <h3 className="text-xl font-semibold text-gray-800 mb-3">Laporan Berkala</h3>
                <p className="text-gray-700 mb-6 leading-relaxed">
                  Selain laporan kegiatan yang dapat Anda lihat di atas, kami juga menyediakan 
                  laporan berkala yang lebih rinci tentang kemajuan program, pencapaian, dan 
                  tantangan yang dihadapi. Laporan ini dapat diakses oleh donatur dan mitra 
                  kami untuk memastikan akuntabilitas dan evaluasi program yang berkelanjutan.
                </p>
              </div>
            </>
          )}
          
          {/* Laporan Keuangan Tab */}
          {activeTab === 'keuangan' && (
            <>
              <h2 className="text-2xl font-semibold text-gray-800 mb-4">Laporan Keuangan</h2>
              
              <div className="bg-white rounded-lg shadow-md overflow-hidden mb-8">
                <div className="overflow-x-auto">
                  <table className="min-w-full divide-y divide-gray-200">
                    <thead className="bg-gray-50">
                      <tr>
                        <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                          Periode
                        </th>
                        <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                          Pemasukan
                        </th>
                        <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                          Pengeluaran
                        </th>
                        <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                          Saldo
                        </th>
                      </tr>
                    </thead>
                    <tbody className="bg-white divide-y divide-gray-200">
                      {financialReports.map((report) => (
                        <tr key={report.id} className="hover:bg-gray-50">
                          <td className="px-6 py-4 whitespace-nowrap">
                            <div className="text-sm font-medium text-gray-900">{report.month}</div>
                          </td>
                          <td className="px-6 py-4 whitespace-nowrap">
                            <div className="text-sm text-gray-900">{report.income}</div>
                          </td>
                          <td className="px-6 py-4 whitespace-nowrap">
                            <div className="text-sm text-gray-900">{report.expenses}</div>
                          </td>
                          <td className="px-6 py-4 whitespace-nowrap">
                            <div className="text-sm font-medium text-green-600">{report.balance}</div>
                          </td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
              </div>
              
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-8">
                {financialReports.map((report) => (
                  <div key={report.id} className="bg-white rounded-lg shadow-md p-6">
                    <h3 className="font-semibold text-primary text-lg mb-2">Laporan Keuangan {report.month}</h3>
                    <div className="grid grid-cols-3 gap-2 mb-4">
                      <div className="bg-blue-50 p-3 rounded-lg">
                        <p className="text-xs text-gray-500">Pemasukan</p>
                        <p className="font-medium text-blue-600">{report.income}</p>
                      </div>
                      <div className="bg-red-50 p-3 rounded-lg">
                        <p className="text-xs text-gray-500">Pengeluaran</p>
                        <p className="font-medium text-red-600">{report.expenses}</p>
                      </div>
                      <div className="bg-green-50 p-3 rounded-lg">
                        <p className="text-xs text-gray-500">Saldo</p>
                        <p className="font-medium text-green-600">{report.balance}</p>
                      </div>
                    </div>
                    <p className="text-sm text-gray-700">{report.details}</p>
                  </div>
                ))}
              </div>
              
              <div className="bg-white rounded-lg shadow-md p-6 mb-8">
                <h2 className="text-2xl font-semibold text-gray-800 mb-4">Tentang Laporan Keuangan</h2>
                <p className="text-gray-700 mb-6 leading-relaxed">
                  Laporan Keuangan Karya Muda Sunan Drajat berisi rincian pemasukan dan pengeluaran 
                  dari seluruh program yang kami jalankan. Kami berkomitmen untuk transparan dalam 
                  mengelola setiap dana yang dipercayakan oleh para donatur.
                </p>
                
                <h3 className="text-xl font-semibold text-gray-800 mb-3">Alokasi Dana</h3>
                <p className="text-gray-700 mb-6 leading-relaxed">
                  Setiap dana yang diterima dialokasikan secara efisien untuk berbagai program 
                  dengan prioritas utama pada program pendidikan dan sosial. Kami memastikan bahwa 
                  minimal 85% dari total donasi langsung digunakan untuk program, sementara maksimal 
                  15% digunakan untuk biaya operasional.
                </p>
                
                <h3 className="text-xl font-semibold text-gray-800 mb-3">Audit Keuangan</h3>
                <p className="text-gray-700 mb-6 leading-relaxed">
                  Kami melakukan audit keuangan secara berkala untuk memastikan akuntabilitas dan 
                  transparansi. Hasil audit ini tersedia untuk diakses oleh para donatur dan pemangku 
                  kepentingan lainnya sebagai bagian dari komitmen kami terhadap tata kelola yang baik.
                </p>
              </div>
            </>
          )}
        </motion.div>
      </div>
    </div>
  );
};

export default ImplementasiLaporan; 