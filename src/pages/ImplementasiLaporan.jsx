import React from 'react';
import { motion } from 'framer-motion';

const ImplementasiLaporan = () => {
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

  return (
    <div className="min-h-screen bg-gray-50 pt-20">
      <div className="container mx-auto px-4 py-12">
        <motion.div 
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          className="max-w-6xl mx-auto"
        >
          <h1 className="text-3xl md:text-4xl font-bold text-primary mb-6">Implementasi & Laporan</h1>
          
          {/* Implementation Report Cards */}
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
            <h2 className="text-2xl font-semibold text-gray-800 mb-4">Tentang Implementasi & Laporan</h2>
            <p className="text-gray-700 mb-6 leading-relaxed">
              Halaman Implementasi & Laporan Karya Muda Bunian Drajat berisi dokumentasi dan laporan 
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
        </motion.div>
      </div>
    </div>
  );
};

export default ImplementasiLaporan; 