import React, { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { motion } from 'framer-motion';
import { FaHeart, FaArrowLeft } from 'react-icons/fa';

const DonationProgramDetail = () => {
  const { programId } = useParams();
  const navigate = useNavigate();
  const [selectedAmount, setSelectedAmount] = useState(null);
  const [customAmount, setCustomAmount] = useState('');
  const [program, setProgram] = useState(null);

  // Donation programs data - this should ideally come from an API or context
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

  useEffect(() => {
    // Find the program based on the ID from URL params
    const foundProgram = donationPrograms.find(p => p.id === parseInt(programId));
    if (foundProgram) {
      setProgram(foundProgram);
    } else {
      // If program not found, redirect to program-reguler page
      navigate('/program-reguler');
    }
  }, [programId, navigate]);

  const handleAmountSelect = (amount) => {
    setSelectedAmount(amount);
    setCustomAmount('');
  };

  const handleCustomAmountChange = (e) => {
    setCustomAmount(e.target.value);
    setSelectedAmount(null);
  };

  if (!program) {
    return (
      <div className="min-h-screen bg-gray-50 pt-20">
        <div className="container mx-auto px-4 py-12">
          <div className="text-center">Loading...</div>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50 pt-20">
      <div className="container mx-auto px-4 py-12">
        <motion.div 
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          className="max-w-6xl mx-auto"
        >
          <button 
            onClick={() => navigate('/program-reguler')}
            className="flex items-center text-primary mb-6 hover:underline"
          >
            <FaArrowLeft className="mr-2" /> Kembali ke Program Reguler
          </button>

          <div className="bg-white rounded-lg shadow-xl p-6">
            <h1 className="text-3xl font-bold text-primary mb-6">{program.name}</h1>
            
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
              <div className="md:col-span-1">
                <div className="mb-4 border rounded-lg overflow-hidden">
                  <img 
                    src={program.image} 
                    alt={program.name}
                    className="w-full h-auto"
                    onError={(e) => {
                      e.target.onerror = null;
                      e.target.src = `https://via.placeholder.com/400x250/e6f7ff/0066cc?text=${program.name}`;
                    }}
                  />
                </div>
                
                <h3 className="font-semibold text-primary mb-2">Nama Program</h3>
                <p className="text-gray-700 mb-4">{program.name}</p>
                
                <h3 className="font-semibold text-primary mb-2">Dana Terkumpul</h3>
                <p className="text-gray-700 mb-4">{program.collectedAmount}</p>
                
                <h3 className="font-semibold text-primary mb-2">Target Donasi</h3>
                <p className="text-gray-700 mb-4">{program.target}</p>
                
                <h3 className="font-semibold text-primary mb-2">Berakhir Pada</h3>
                <p className="text-gray-700 mb-4">{program.deadline}</p>
              </div>
              
              <div className="md:col-span-2">
                <div className="mb-6">
                  <h3 className="text-lg font-semibold text-gray-800 mb-2">Deskripsi Program</h3>
                  <p className="text-gray-700">{program.details || program.description}</p>
                  {program.name === 'SEDEKAH SUBUH' && (
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
                              className="h-8 mx-auto"
                              onError={(e) => {
                                e.target.onerror = null;
                                e.target.src = `https://via.placeholder.com/80x40?text=${method.name}`;
                              }}
                            />
                            <div className="text-xs mt-1">{method.name}</div>
                          </div>
                        ))}
                      </div>
                    </div>
                    
                    <div className="mb-4">
                      <h4 className="font-medium text-gray-700 mb-2">Digital Banking</h4>
                      <div className="grid grid-cols-4 gap-2">
                        {paymentMethods.digitalBank.map((method, index) => (
                          <div key={`digital-${index}`} className="border rounded-md p-2 text-center hover:border-primary cursor-pointer">
                            <img 
                              src={method.image} 
                              alt={method.name}
                              className="h-8 mx-auto"
                              onError={(e) => {
                                e.target.onerror = null;
                                e.target.src = `https://via.placeholder.com/80x40?text=${method.name}`;
                              }}
                            />
                            <div className="text-xs mt-1">{method.name}</div>
                          </div>
                        ))}
                      </div>
                    </div>
                    
                    <div>
                      <h4 className="font-medium text-gray-700 mb-2">Virtual Account</h4>
                      <div className="grid grid-cols-4 gap-2">
                        {paymentMethods.virtualAccount.map((method, index) => (
                          <div key={`va-${index}`} className="border rounded-md p-2 text-center hover:border-primary cursor-pointer">
                            <img 
                              src={method.image} 
                              alt={method.name}
                              className="h-8 mx-auto"
                              onError={(e) => {
                                e.target.onerror = null;
                                e.target.src = `https://via.placeholder.com/80x40?text=${method.name}`;
                              }}
                            />
                            <div className="text-xs mt-1">{method.name}</div>
                          </div>
                        ))}
                      </div>
                    </div>
                  </div>
                  
                  <div className="mt-6">
                    <button 
                      type="button"
                      className="w-full bg-green-500 hover:bg-green-600 text-white font-medium py-3 px-4 rounded-lg shadow transition-colors flex items-center justify-center"
                    >
                      <FaHeart className="mr-2" /> Konfirmasi Pembayaran
                    </button>
                  </div>
                  
                </form>
              </div>
            </div>
          </div>
        </motion.div>
      </div>
    </div>
  );
};

export default DonationProgramDetail; 