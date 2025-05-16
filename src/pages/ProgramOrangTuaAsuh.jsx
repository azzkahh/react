import React from 'react';
import { motion } from 'framer-motion';

const ProgramOrangTuaAsuh = () => {
  // Sample data for santri profiles
  const santriProfiles = [
    {
      id: 1,
      name: 'Ahmad',
      age: 10,
      grade: 4,
      story: 'Ahmad berasal dari keluarga kurang mampu di daerah terpencil. Ia memiliki semangat belajar yang tinggi dan bercita-cita menjadi guru.',
    },
    {
      id: 2,
      name: 'Fatimah',
      age: 12,
      grade: 6,
      story: 'Fatimah adalah anak yatim yang memiliki prestasi akademik yang baik. Ia ingin melanjutkan pendidikan untuk menjadi dokter di masa depan.',
    },
    {
      id: 3,
      name: 'Ibrahim',
      age: 9,
      grade: 3,
      story: 'Ibrahim memiliki bakat dalam bidang seni dan hafalan Al-Quran. Ia berasal dari keluarga dengan kondisi ekonomi terbatas.',
    },
    {
      id: 4,
      name: 'Aisyah',
      age: 11,
      grade: 5,
      story: 'Aisyah adalah anak yatim piatu yang tinggal bersama neneknya. Ia rajin belajar dan memiliki minat dalam bidang matematika.',
    },
  ];

  return (
    <div className="min-h-screen bg-gray-50 pt-20">
      <div className="container mx-auto px-4 py-12">
        <motion.div 
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          className="max-w-4xl mx-auto"
        >
          <h1 className="text-3xl md:text-4xl font-bold text-primary mb-6">Program Orang Tua Asuh</h1>
          
          <div className="bg-white rounded-lg shadow-md p-6 mb-8">
            <h2 className="text-2xl font-semibold text-gray-800 mb-4">Tentang Program Orang Tua Asuh</h2>
            <p className="text-gray-700 mb-6 leading-relaxed">
              Program Orang Tua Asuh adalah inisiatif yang memungkinkan Anda untuk mendukung pendidikan dan kebutuhan 
              santri yang berasal dari keluarga kurang mampu. Dengan menjadi orang tua asuh, Anda membantu memberikan 
              masa depan yang lebih baik bagi mereka melalui pendidikan yang berkualitas.
            </p>
            
            <h3 className="text-xl font-semibold text-gray-800 mb-3">Manfaat Program</h3>
            <ul className="list-disc pl-6 mb-6 text-gray-700 space-y-2">
              <li>Memberikan pendidikan berkualitas bagi anak-anak kurang mampu</li>
              <li>Membantu memenuhi kebutuhan dasar seperti pakaian, makanan, dan tempat tinggal</li>
              <li>Membantu pengembangan karakter dan potensi santri</li>
              <li>Memberikan kesempatan santri untuk meraih cita-cita</li>
              <li>Memperoleh laporan berkala tentang perkembangan santri asuh Anda</li>
            </ul>

            <h3 className="text-xl font-semibold text-gray-800 mb-3">Cara Berpartisipasi</h3>
            <p className="text-gray-700 mb-4 leading-relaxed">
              Anda dapat berpartisipasi dengan berbagai cara:
            </p>
            <ol className="list-decimal pl-6 mb-6 text-gray-700 space-y-2">
              <li>Pilih santri yang ingin Anda bantu dari profil di bawah ini</li>
              <li>Pilih jenis dukungan yang ingin Anda berikan (bulanan atau tahunan)</li>
              <li>Isi formulir pendaftaran dan lakukan pembayaran</li>
              <li>Anda akan menerima update berkala tentang perkembangan santri asuh Anda</li>
            </ol>
            
            <div className="flex flex-col md:flex-row md:space-x-4 mb-6">
              <div className="bg-blue-50 border border-blue-200 rounded-md p-4 mb-4 md:mb-0 md:w-1/2">
                <h4 className="font-semibold text-primary mb-2">Donasi Bulanan</h4>
                <p className="text-gray-700 mb-3">Rp 500.000 / bulan</p>
                <ul className="list-disc pl-5 text-gray-700 text-sm space-y-1">
                  <li>Biaya pendidikan</li>
                  <li>Perlengkapan sekolah</li>
                  <li>Makanan bergizi</li>
                  <li>Tempat tinggal</li>
                </ul>
              </div>
              <div className="bg-green-50 border border-green-200 rounded-md p-4 md:w-1/2">
                <h4 className="font-semibold text-primary mb-2">Donasi Tahunan</h4>
                <p className="text-gray-700 mb-3">Rp 5.000.000 / tahun</p>
                <ul className="list-disc pl-5 text-gray-700 text-sm space-y-1">
                  <li>Semua manfaat donasi bulanan</li>
                  <li>Biaya kesehatan</li>
                  <li>Aktivitas ekstrakurikuler</li>
                  <li>Diskon 15% dari total biaya bulanan</li>
                </ul>
              </div>
            </div>
          </div>

          <h2 className="text-2xl font-semibold text-gray-800 mb-4">Santri Yang Membutuhkan Bantuan</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-8">
            {santriProfiles.map((santri) => (
              <motion.div 
                key={santri.id}
                whileHover={{ y: -5 }}
                className="bg-white rounded-lg shadow-md overflow-hidden"
              >
                <div className="p-5">
                  <div className="flex justify-center mb-4">
                    <div className="w-32 h-32 rounded-full bg-gray-200 flex items-center justify-center overflow-hidden">
                      <img 
                        src={`/santri-placeholder-${santri.id}.png`} 
                        alt={`Santri ${santri.name}`}
                        className="w-full h-full object-cover"
                        onError={(e) => {
                          e.target.onerror = null;
                          e.target.src = "https://via.placeholder.com/150/eee/999?text=Santri";
                        }}
                      />
                    </div>
                  </div>
                  <h3 className="text-xl font-semibold text-primary text-center mb-2">
                    Nama Santri
                  </h3>
                  <p className="text-gray-700 text-center mb-4">
                    Bio Data Santri
                  </p>
                  <div className="border-t border-dashed border-gray-200 pt-3">
                    <ul className="text-gray-600 text-sm space-y-1">
                      <li>Umur: {santri.age} tahun</li>
                      <li>Kelas: {santri.grade} SD</li>
                      <li className="text-xs mt-2 italic">{santri.story}</li>
                    </ul>
                  </div>
                </div>
                <div className="bg-gray-50 p-4 text-center">
                  <button className="bg-primary text-white px-4 py-2 rounded-md hover:bg-primary/90 transition-colors text-sm font-medium">
                    Jadi Orang Tua Asuh
                  </button>
                </div>
              </motion.div>
            ))}
          </div>

          <div className="bg-white rounded-lg shadow-md p-6">
            <h2 className="text-2xl font-semibold text-gray-800 mb-4">Mulai Berpartisipasi</h2>
            <p className="text-gray-700 mb-6 leading-relaxed">
              Untuk menjadi orang tua asuh, silakan pilih santri yang ingin Anda bantu dan ikuti proses pendaftaran.
              Anda juga dapat menghubungi kami untuk informasi lebih lanjut tentang program ini.
            </p>
            
            <div className="flex justify-center space-x-4">
              <button className="bg-primary text-white px-6 py-3 rounded-md hover:bg-primary/90 transition-colors font-medium">
                Daftar Sekarang
              </button>
              <button className="border border-primary text-primary px-6 py-3 rounded-md hover:bg-primary/10 transition-colors font-medium">
                Hubungi Kami
              </button>
            </div>
          </div>
        </motion.div>
      </div>
    </div>
  );
};

export default ProgramOrangTuaAsuh; 