import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { FaTimes, FaHeart } from 'react-icons/fa';

const ProgramReguler = () => {
  const [selectedProgram, setSelectedProgram] = useState(null);
  const [selectedAmount, setSelectedAmount] = useState(null);
  const [customAmount, setCustomAmount] = useState('');
  
  // Donation programs data
  const donationPrograms = [
    {
      id: 1,
      name: 'SEDEKAH SUBUH',
      image: '/sedekah-subuh.png',
      description: 'Rasullulah SAW bersabda "Sedekah di pagi hari akan menjauhkan kita dari bencana" (HR Ahmad)',
      collectedAmount: 'Rp 5.263.600',
      target: 'Rp 10.000.000',
      deadline: '30 September 2025',
      details: 'Yayasan memfasilitasi distribusi sedekah subuh kepada mustahik secara tercatat & tepat sasaran, adapun besarannya tidaklah ditentukan.'
    },
    {
      id: 2,
      name: 'BERAS UNTUK SANTRI',
      image: '/beras-santri.png',
      description: 'Memuliakan santri Tahfidz dengan menjaganya agar tetap dalam kondisi terbaik.',
      collectedAmount: 'Rp 330.000',
      target: 'Rp 1.000.000',
      deadline: '30 Juni 2025',
      details: 'Memuliakan santri Tahfidz dengan menjaganya agar tetap dalam kondisi terbaik dengan memberikan kecukupan makanan nya. Adapun besarannya adalah 10.000 / Liter'
    },
    {
      id: 3,
      name: 'TRANSPORT USTADZ',
      image: '/transport-ustadz.png',
      description: 'Memuliakan Ustadz agar dapat hadir tanpa kendala transportasi.',
      collectedAmount: 'Rp 630.000',
      target: 'Rp 2.000.000',
      deadline: '30 Juni 2025',
      details: 'Memuliakan Ustadz adalah dengan menjaganya agar disetiap pertemuan mampu hadir tanpa kendala yang bersifat tekhnis yaitu transpotasi dalam bentuk bensin. Adapun besarannya adalah 10.000 / Liter'
    },
    {
      id: 4,
      name: 'WAKAF QURAN TERJEMAH',
      image: '/wakaf-quran.png',
      description: 'Quran Terjemah sebagai sarana belajar santri yang perlu diperbarui secara periodik.',
      collectedAmount: 'Rp 914.000',
      target: 'Rp 5.000.000',
      deadline: '31 Desember 2025',
      details: 'Quran Terjemaah adalah sarana yg digunakan oleh santri dalam kegiatan belajar dan harus di perbaharui secara periodik. Untuk hal ini kami persilahkan menyumbang dalam bentuk Kitab atau uang seharga satu buah kitab'
    }
  ];

  // Donation amount options
  const donationAmounts = [
    { value: 50000, label: 'Rp 50.000' },
    { value: 100000, label: 'Rp 100.000' },
    { value: 150000, label: 'Rp 150.000' },
    { value: 200000, label: 'Rp 200.000' }
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
    setSelectedAmount(null);
    setCustomAmount('');
    document.body.style.overflow = 'hidden'; // Prevent scrolling when modal is open
  };

  const closeDonationForm = () => {
    setSelectedProgram(null);
    document.body.style.overflow = 'auto'; // Re-enable scrolling
  };

  const handleAmountSelect = (amount) => {
    setSelectedAmount(amount);
    setCustomAmount('');
  };

  const handleCustomAmountChange = (e) => {
    setCustomAmount(e.target.value);
    setSelectedAmount(null);
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
              Program Reguler Karya Muda Sunan Drajat dirancang untuk memberikan dukungan berkelanjutan kepada 
              santri dan ustadz kami. Melalui program ini, kami memfasilitasi berbagai bentuk sedekah dan wakaf 
              yang dapat dilakukan secara rutin untuk mendukung kegiatan pendidikan dan kesejahteraan santri dan ustadz.
            </p>
            
            <h3 className="text-xl font-semibold text-gray-800 mb-3">Fitur Program</h3>
            <ul className="list-disc pl-6 mb-6 text-gray-700 space-y-2">
              <li>Sedekah Subuh - distribusi sedekah pagi hari kepada mustahik</li>
              <li>Beras untuk Santri - membantu kecukupan makanan santri (Rp 10.000/liter)</li>
              <li>Transport Ustadz - membantu biaya transportasi ustadz (Rp 10.000/liter)</li>
              <li>Wakaf Quran Terjemah - menyediakan sarana belajar yang diperbarui secara periodik</li>
              <li>Laporan berkala tentang penyaluran donasi</li>
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
                    {selectedProgram.name === 'SEDEKAH SUBUH' && (
                      <p className="text-gray-700 mt-3 italic font-medium">
                        Rasullulah SAW bersabda "Sedekah di pagi hari akan menjauhkan kita dari bencana" (HR Ahmad)
                      </p>
                    )}
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
                      <label className="block text-gray-700 mb-2 font-semibold">Pilih Jumlah Donasi</label>
                      <div className="grid grid-cols-2 md:grid-cols-4 gap-3 mb-4">
                        {donationAmounts.map((amount) => (
                          <button
                            key={amount.value}
                            type="button"
                            onClick={() => handleAmountSelect(amount.value)}
                            className={`px-4 py-3 border rounded-lg text-center transition-colors ${
                              selectedAmount === amount.value
                                ? 'bg-green-500 text-white border-green-500'
                                : 'bg-white text-gray-700 border-gray-300 hover:bg-gray-50'
                            }`}
                          >
                            {amount.label}
                          </button>
                        ))}
                      </div>
                      <div>
                        <label className="block text-gray-700 mb-2">Jumlah Lain</label>
                        <div className="relative">
                          <span className="absolute left-0 top-0 flex items-center h-full pl-3 text-gray-600">Rp</span>
                          <input 
                            type="text" 
                            value={customAmount}
                            onChange={handleCustomAmountChange}
                            className="w-full px-4 py-2 pl-10 border rounded-md focus:outline-none focus:ring-2 focus:ring-primary"
                            placeholder="Masukkan jumlah donasi"
                          />
                        </div>
                      </div>
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
                        className="w-full bg-green-500 text-white font-medium py-3 rounded-md hover:bg-green-600 transition-colors flex items-center justify-center"
                      >
                        <FaHeart className="mr-2" /> Konfirmasi Donasi
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