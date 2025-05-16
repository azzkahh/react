import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { FaTimes } from 'react-icons/fa';

const ProgramReguler = () => {
  const [selectedProgram, setSelectedProgram] = useState(null);
  
  // Donation programs data
  const donationPrograms = [
    {
      id: 1,
      name: 'ONE DAY, ONE THOUSAND',
      image: '/gerakan-one-day.png',
      description: 'Gerakan donasi seribu rupiah setiap hari untuk membantu pendidikan santri.',
      collectedAmount: 'Rp 5.263.600',
      target: 'Rp 10.000.000',
      deadline: '30 September 2025',
      details: 'Program ini dirancang untuk memudahkan berdonasi dengan nominal yang terjangkau namun berkelanjutan. Setiap seribu rupiah yang Anda sumbangkan akan membantu menyediakan fasilitas pendidikan yang layak bagi santri yang membutuhkan.'
    },
    {
      id: 2,
      name: 'JUMAT BERKAH - REGULAR',
      image: '/jumat-berkah.png',
      description: 'Program donasi rutin setiap hari Jumat untuk keberkahan di hari spesial.',
      collectedAmount: 'Rp 330.000',
      target: 'Rp 1.000.000',
      deadline: '30 Juni 2025',
      details: 'Jumat Berkah adalah program donasi rutin yang dilaksanakan setiap hari Jumat, dimulai dari Rp 20.000. Donasi ini akan digunakan untuk kegiatan sosial dan peningkatan fasilitas belajar santri.'
    },
    {
      id: 3,
      name: 'KIRIM BERAS UNTUK SANTRI YATIM',
      image: '/kirim-beras.png',
      description: 'Bantuan kebutuhan pokok berupa beras untuk santri yatim di pesantren.',
      collectedAmount: 'Rp 630.000',
      target: 'Rp 2.000.000',
      deadline: '30 Juni 2025',
      details: 'Program donasi untuk menyediakan beras bagi santri yatim di pondok pesantren. Donasi Anda akan membantu memenuhi kebutuhan pangan sehari-hari para santri.'
    },
    {
      id: 4,
      name: 'WAKAF AL QURAN BRAILLE',
      image: '/wakaf-quran.png',
      description: 'Wakaf Al-Quran Braille untuk membantu santri dengan gangguan penglihatan.',
      collectedAmount: 'Rp 914.000',
      target: 'Rp 5.000.000',
      deadline: '31 Desember 2025',
      details: 'Program wakaf Al-Quran Braille bertujuan membantu santri dengan gangguan penglihatan agar dapat membaca dan mempelajari Al-Quran dengan lebih mudah.'
    }
  ];

  // Banks and payment methods
  const paymentMethods = {
    eWallet: [
      { name: 'OVO', image: '/payment/ovo.png' },
      { name: 'DANA', image: '/payment/dana.png' },
      { name: 'Gopay', image: '/payment/gopay.png' },
      { name: 'LinkAja', image: '/payment/linkaja.png' }
    ],
    digitalBank: [
      { name: 'Jenius', image: '/payment/jenius.png' },
      { name: 'Jago', image: '/payment/jago.png' },
      { name: 'Blu', image: '/payment/blu.png' },
      { name: 'SeaBank', image: '/payment/seabank.png' }
    ],
    virtualAccount: [
      { name: 'BCA', image: '/payment/bca.png' },
      { name: 'BRI', image: '/payment/bri.png' },
      { name: 'BNI', image: '/payment/bni.png' },
      { name: 'Mandiri', image: '/payment/mandiri.png' }
    ]
  };

  const openDonationForm = (program) => {
    setSelectedProgram(program);
    document.body.style.overflow = 'hidden'; // Prevent scrolling when modal is open
  };

  const closeDonationForm = () => {
    setSelectedProgram(null);
    document.body.style.overflow = 'auto'; // Re-enable scrolling
  };

  return (
    <div className="min-h-screen bg-gray-50 pt-20">
      <div className="container mx-auto px-4 py-12">
        <motion.div 
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          className="max-w-6xl mx-auto"
        >
          <h1 className="text-3xl md:text-4xl font-bold text-primary mb-6">Program Reguler</h1>
          
          {/* Donation Program Cards */}
          <h2 className="text-2xl font-semibold text-gray-800 mb-4">Donasi, ZIS, Wakaf</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
            {donationPrograms.map((program) => (
              <motion.div 
                key={program.id}
                whileHover={{ y: -5 }}
                className="bg-white rounded-lg shadow-md overflow-hidden cursor-pointer"
                onClick={() => openDonationForm(program)}
              >
                <div className="h-52 overflow-hidden">
                  <img 
                    src={program.image} 
                    alt={program.name}
                    className="w-full h-full object-cover"
                    onError={(e) => {
                      e.target.onerror = null;
                      e.target.src = `https://via.placeholder.com/400x250/e6f7ff/0066cc?text=${program.name}`;
                    }}
                  />
                </div>
                <div className="p-4">
                  <h3 className="font-semibold text-primary mb-1">{program.name}</h3>
                  <div className="text-gray-700 font-medium mb-2">Dana Terkumpul</div>
                  <div className="text-gray-900 font-bold mb-3">{program.collectedAmount}</div>
                  
                  <div className="mb-4">
                    <div className="w-full bg-gray-200 rounded-full h-2">
                      <div 
                        className="bg-primary h-2 rounded-full" 
                        style={{ width: `${Math.min(parseInt(program.collectedAmount.replace(/\D/g, '')) / parseInt(program.target.replace(/\D/g, '')) * 100, 100)}%` }}
                      ></div>
                    </div>
                  </div>
                  
                  <div className="text-sm text-gray-600">
                    Berakhir Pada<br />
                    {program.deadline}
                  </div>
                </div>
              </motion.div>
            ))}
          </div>

          <div className="bg-white rounded-lg shadow-md p-6 mb-8">
            <h2 className="text-2xl font-semibold text-gray-800 mb-4">Tentang Program Reguler</h2>
            <p className="text-gray-700 mb-6 leading-relaxed">
              Program Reguler Karya Muda Bunian Drajat dirancang untuk memberikan pendidikan dan pelatihan berkualitas 
              kepada santri kami. Melalui program ini, kami fokus pada pengembangan keterampilan akademik, spiritual,
              dan keterampilan hidup yang penting untuk masa depan mereka.
            </p>
            
            <h3 className="text-xl font-semibold text-gray-800 mb-3">Fitur Program</h3>
            <ul className="list-disc pl-6 mb-6 text-gray-700 space-y-2">
              <li>Pendidikan agama komprehensif</li>
              <li>Kurikulum akademik yang sesuai dengan standar nasional</li>
              <li>Pengembangan keterampilan bahasa (Arab dan Inggris)</li>
              <li>Pelatihan keterampilan hidup dan kewirausahaan</li>
              <li>Kegiatan ekstrakurikuler untuk pengembangan bakat</li>
            </ul>

            <h3 className="text-xl font-semibold text-gray-800 mb-3">Jadwal dan Kegiatan</h3>
            <div className="overflow-x-auto mb-6">
              <table className="min-w-full bg-white border border-gray-200">
                <thead>
                  <tr className="bg-gray-100">
                    <th className="py-2 px-3 border-b text-left">Waktu</th>
                    <th className="py-2 px-3 border-b text-left">Kegiatan</th>
                  </tr>
                </thead>
                <tbody>
                  <tr>
                    <td className="py-2 px-3 border-b">04:00 - 05:30</td>
                    <td className="py-2 px-3 border-b">Sholat Subuh & Mengaji</td>
                  </tr>
                  <tr>
                    <td className="py-2 px-3 border-b">06:00 - 07:00</td>
                    <td className="py-2 px-3 border-b">Sarapan & Persiapan</td>
                  </tr>
                  <tr>
                    <td className="py-2 px-3 border-b">07:30 - 12:00</td>
                    <td className="py-2 px-3 border-b">Kegiatan Belajar Formal</td>
                  </tr>
                  <tr>
                    <td className="py-2 px-3 border-b">12:00 - 13:30</td>
                    <td className="py-2 px-3 border-b">Sholat Dzuhur & Makan Siang</td>
                  </tr>
                  <tr>
                    <td className="py-2 px-3 border-b">14:00 - 15:30</td>
                    <td className="py-2 px-3 border-b">Pembelajaran Tambahan</td>
                  </tr>
                  <tr>
                    <td className="py-2 px-3 border-b">16:00 - 17:30</td>
                    <td className="py-2 px-3 border-b">Kegiatan Ekstrakurikuler</td>
                  </tr>
                  <tr>
                    <td className="py-2 px-3 border-b">18:00 - 19:30</td>
                    <td className="py-2 px-3 border-b">Sholat Maghrib & Mengaji</td>
                  </tr>
                  <tr>
                    <td className="py-2 px-3 border-b">20:00 - 21:30</td>
                    <td className="py-2 px-3 border-b">Belajar Mandiri</td>
                  </tr>
                </tbody>
              </table>
            </div>
          </div>

          <div className="bg-white rounded-lg shadow-md p-6">
            <h2 className="text-2xl font-semibold text-gray-800 mb-4">Pendaftaran</h2>
            <p className="text-gray-700 mb-6 leading-relaxed">
              Untuk mendaftar Program Reguler di Karya Muda Bunian Drajat, silakan lengkapi formulir pendaftaran
              dan ikuti proses seleksi. Pendaftaran dibuka sepanjang tahun dengan kuota terbatas.
            </p>
            
            <div className="flex justify-center">
              <button className="bg-primary text-white px-6 py-3 rounded-md hover:bg-primary/90 transition-colors font-medium">
                Daftar Sekarang
              </button>
            </div>
          </div>
        </motion.div>
      </div>

      {/* Donation Form Modal */}
      {selectedProgram && (
        <div className="fixed inset-0 bg-black bg-opacity-50 z-50 flex items-center justify-center p-4">
          <motion.div 
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            className="bg-white rounded-lg shadow-xl max-w-4xl w-full max-h-[90vh] overflow-y-auto"
          >
            <div className="sticky top-0 bg-white p-4 border-b flex justify-between items-center">
              <h2 className="text-xl font-bold text-primary">{selectedProgram.name}</h2>
              <button 
                onClick={closeDonationForm}
                className="text-gray-500 hover:text-gray-700 text-xl"
              >
                <FaTimes />
              </button>
            </div>
            
            <div className="p-6">
              <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
                <div className="md:col-span-1">
                  <div className="mb-4 border rounded-lg overflow-hidden">
                    <img 
                      src={selectedProgram.image} 
                      alt={selectedProgram.name}
                      className="w-full h-auto"
                      onError={(e) => {
                        e.target.onerror = null;
                        e.target.src = `https://via.placeholder.com/400x250/e6f7ff/0066cc?text=${selectedProgram.name}`;
                      }}
                    />
                  </div>
                  
                  <h3 className="font-semibold text-primary mb-2">Nama Program</h3>
                  <p className="text-gray-700 mb-4">{selectedProgram.name}</p>
                  
                  <h3 className="font-semibold text-primary mb-2">Dana Terkumpul</h3>
                  <p className="text-gray-700 mb-4">{selectedProgram.collectedAmount}</p>
                  
                  <h3 className="font-semibold text-primary mb-2">Target Donasi</h3>
                  <p className="text-gray-700 mb-4">{selectedProgram.target}</p>
                  
                  <h3 className="font-semibold text-primary mb-2">Berakhir Pada</h3>
                  <p className="text-gray-700 mb-4">{selectedProgram.deadline}</p>
                </div>
                
                <div className="md:col-span-2">
                  <div className="mb-6">
                    <h3 className="text-lg font-semibold text-gray-800 mb-2">Deskripsi Program</h3>
                    <p className="text-gray-700">{selectedProgram.details || selectedProgram.description}</p>
                  </div>
                  
                  <form className="space-y-4">
                    <div>
                      <label className="block text-gray-700 mb-2">Nama Donatur</label>
                      <input 
                        type="text" 
                        className="w-full px-4 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-primary"
                        placeholder="Masukkan nama Anda"
                      />
                    </div>
                    
                    <div>
                      <label className="block text-gray-700 mb-2">Asal Kota</label>
                      <input 
                        type="text" 
                        className="w-full px-4 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-primary"
                        placeholder="Masukkan kota asal Anda"
                      />
                    </div>
                    
                    <div>
                      <label className="block text-gray-700 mb-2">No WhatsApp</label>
                      <input 
                        type="text" 
                        className="w-full px-4 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-primary"
                        placeholder="Masukkan nomor WhatsApp Anda"
                      />
                    </div>
                    
                    <div>
                      <label className="block text-gray-700 mb-2">Jumlah Donasi</label>
                      <input 
                        type="text" 
                        className="w-full px-4 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-primary"
                        placeholder="Masukkan jumlah donasi"
                      />
                    </div>
                    
                    <div>
                      <label className="flex items-center space-x-2">
                        <input type="checkbox" className="h-4 w-4 text-primary focus:ring-primary" />
                        <span className="text-gray-700">Masukkan ke Daftar Donatur</span>
                      </label>
                    </div>
                    
                    <div>
                      <label className="block text-gray-700 mb-2">Metode Pembayaran</label>
                      
                      <div className="mb-4">
                        <h4 className="font-medium text-gray-700 mb-2">E-Wallet</h4>
                        <div className="grid grid-cols-4 gap-2">
                          {paymentMethods.eWallet.map((method, index) => (
                            <div key={`ewallet-${index}`} className="border rounded-md p-2 text-center hover:border-primary cursor-pointer">
                              <img 
                                src={method.image} 
                                alt={method.name}
                                className="h-6 mx-auto mb-1"
                                onError={(e) => {
                                  e.target.onerror = null;
                                  e.target.src = `https://via.placeholder.com/60x30/e6f7ff/0066cc?text=${method.name}`;
                                }}
                              />
                              <div className="text-xs">{method.name}</div>
                            </div>
                          ))}
                        </div>
                      </div>
                      
                      <div className="mb-4">
                        <h4 className="font-medium text-gray-700 mb-2">Digital Bank</h4>
                        <div className="grid grid-cols-4 gap-2">
                          {paymentMethods.digitalBank.map((method, index) => (
                            <div key={`digital-${index}`} className="border rounded-md p-2 text-center hover:border-primary cursor-pointer">
                              <img 
                                src={method.image} 
                                alt={method.name}
                                className="h-6 mx-auto mb-1"
                                onError={(e) => {
                                  e.target.onerror = null;
                                  e.target.src = `https://via.placeholder.com/60x30/e6f7ff/0066cc?text=${method.name}`;
                                }}
                              />
                              <div className="text-xs">{method.name}</div>
                            </div>
                          ))}
                        </div>
                      </div>
                      
                      <div className="mb-4">
                        <h4 className="font-medium text-gray-700 mb-2">Virtual Account</h4>
                        <div className="grid grid-cols-4 gap-2">
                          {paymentMethods.virtualAccount.map((method, index) => (
                            <div key={`va-${index}`} className="border rounded-md p-2 text-center hover:border-primary cursor-pointer">
                              <img 
                                src={method.image} 
                                alt={method.name}
                                className="h-6 mx-auto mb-1"
                                onError={(e) => {
                                  e.target.onerror = null;
                                  e.target.src = `https://via.placeholder.com/60x30/e6f7ff/0066cc?text=${method.name}`;
                                }}
                              />
                              <div className="text-xs">{method.name}</div>
                            </div>
                          ))}
                        </div>
                      </div>
                    </div>
                    
                    <div className="pt-4">
                      <button 
                        type="button"
                        className="w-full bg-green-500 text-white font-medium py-3 rounded-md hover:bg-green-600 transition-colors"
                      >
                        Konfirmasi Donasi
                      </button>
                    </div>
                  </form>
                </div>
              </div>
            </div>
          </motion.div>
        </div>
      )}
    </div>
  );
};

export default ProgramReguler; 