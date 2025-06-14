import React from 'react';
import { motion } from 'framer-motion';
import { Link } from 'react-router-dom';

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
            <p className="text-gray-700 mb-6 leading-relaxed text-justify">
              Program pendampingan santri duafa program 3 thn – 6 thn, pilihan santri yaitu dapat melanjutkan santri lama atau santri baru yang disusulkan oleh Yayasan. Dukungan program berbentuk memberikan fasilitas biaya selama berkegiatan di pondok adapun besarannya 1,2 Jt/Bulan/Santri. Yang dapat pula dikelola oleh beberapa orang tua asuh (contoh 4 Orang Tua Asuh mendampingi 1 orang santri = 300 rb / Orang Tua Asuh).
            </p>
            
            <h3 className="text-xl font-semibold text-gray-800 mb-3">Manfaat Program</h3>
            <ul className="list-disc pl-6 mb-6 text-gray-700 space-y-2">
              <li>Memberikan pendidikan berkualitas bagi anak-anak kurang mampu</li>
              <li>Membantu memenuhi kebutuhan dasar seperti pakaian, makanan.</li>
              <li>Membantu pengembangan karakter dan potensi santri</li>
              <li>Memberikan kesempatan santri untuk meraih cita-cita</li>
              <li>Memperoleh laporan berkala tentang perkembangan santri asuh Anda</li>
            </ul>
            
            <div className="flex flex-col md:flex-row md:space-x-4 mb-6">
              <div className="bg-blue-50 border border-blue-200 rounded-md p-4 mb-4 md:mb-0 md:w-1/2">
                <h4 className="font-semibold text-primary mb-2">4 Orang Tua Asuh Untuk 1 Santri</h4>
                <p className="text-gray-700 mb-3">Rp 300.000 / 1 Orang Tua Asuh</p>
                <ul className="list-disc pl-5 text-gray-700 text-sm space-y-1">
                  <li>Biaya pendidikan</li>
                  <li>Perlengkapan pesantren</li>
                  <li>Makanan bergizi</li>
                  <li>Kebutuhan santri</li>
                </ul>
              </div>
              <div className="bg-green-50 border border-green-200 rounded-md p-4 md:w-1/2">
                <h4 className="font-semibold text-primary mb-2">1 Orang Tua Asuh Untuk 1 Santri</h4>
                <p className="text-gray-700 mb-3">Rp 1.200.000 / 1 Orang Tua Asuh</p>
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
              <Link 
                key={santri.id}
                to={`/santri-detail/${santri.id}`}
                className="block transition-transform hover:-translate-y-1 duration-300"
              >
                <motion.div 
                  whileHover={{ y: -5 }}
                  className="bg-white rounded-lg shadow-md overflow-hidden cursor-pointer h-full"
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
                      {santri.name}
                    </h3>
                    <p className="text-gray-700 text-center mb-4">
                      {santri.age} tahun, Kelas {santri.grade}
                    </p>
                    <div className="border-t border-dashed border-gray-200 pt-3">
                      <p className="text-xs mt-2 italic text-gray-600">{santri.story}</p>
                    </div>
                  </div>
                  <div className="bg-gray-50 p-4 text-center">
                    <span className="bg-primary text-white px-4 py-2 rounded-md hover:bg-primary/90 transition-colors text-sm font-medium inline-block">
                      Jadi Orang Tua Asuh
                    </span>
                  </div>
                </motion.div>
              </Link>
            ))}
          </div>
         </motion.div>
      </div>
    </div>
  );
};

export default ProgramOrangTuaAsuh; 