import React, { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { motion } from 'framer-motion';
import { FaHeart, FaArrowLeft, FaCreditCard } from 'react-icons/fa';
import { useDonor } from '../../contexts/DonorContext';
import { programDonasiAPI, donasiAPI, metodePembayaranAPI } from '../../services/api';

const DonationProgramDetail = () => {
  const { programId } = useParams();
  const navigate = useNavigate();
  const { addDonor } = useDonor();
  const [selectedAmount, setSelectedAmount] = useState(null);
  const [customAmount, setCustomAmount] = useState('');
  const [program, setProgram] = useState(null);
  const [donorName, setDonorName] = useState('');
  const [donorEmail, setDonorEmail] = useState('');
  const [donorCity, setDonorCity] = useState('');
  const [donorWhatsapp, setDonorWhatsapp] = useState('');
  const [addToDonorList, setAddToDonorList] = useState(true);
  const [selectedPaymentGateway, setSelectedPaymentGateway] = useState(null);
  const [isProcessing, setIsProcessing] = useState(false);
  const [paymentStep, setPaymentStep] = useState(1);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [metodePembayaran, setMetodePembayaran] = useState([]);
  const [showPaymentOptions, setShowPaymentOptions] = useState(false);
  const [paymentSuccess, setPaymentSuccess] = useState(false);

  // Donation programs data - this should ideally come from an API or context
  const donationPrograms = [
    {
      id: 1,
      name: 'SEDEKAH SUBUH',
      image: '/yayasan-karya-muda.jpg',
      description: 'Rasullulah SAW bersabda "Sedekah di pagi hari akan menjauhkan kita dari bencana" (HR Ahmad)',
      collectedAmount: 'Rp 5.263.600',
      target: 'Rp 10.000.000',
      deadline: '30 September 2025',
      details: 'Yayasan memfasilitasi distribusi sedekah subuh kepada mustahik secara tercatat & tepat sasaran, adapun besarannya tidaklah ditentukan.'
    },
    {
      id: 2,
      name: 'BERAS UNTUK SANTRI',
      image: '/yayasan-karya-muda.jpg',
      description: 'Memuliakan santri Tahfidz dengan menjaganya agar tetap dalam kondisi terbaik.',
      collectedAmount: 'Rp 330.000',
      target: 'Rp 1.000.000',
      deadline: '30 Juni 2025',
      details: 'Memuliakan santri Tahfidz dengan menjaganya agar tetap dalam kondisi terbaik dengan memberikan kecukupan makanan nya. Adapun besarannya adalah 10.000 / Liter'
    },
    {
      id: 3,
      name: 'TRANSPORT USTADZ',
      image: '/yayasan-karya-muda.jpg',
      description: 'Memuliakan Ustadz agar dapat hadir tanpa kendala transportasi.',
      collectedAmount: 'Rp 630.000',
      target: 'Rp 2.000.000',
      deadline: '30 Juni 2025',
      details: 'Memuliakan Ustadz adalah dengan menjaganya agar disetiap pertemuan mampu hadir tanpa kendala yang bersifat tekhnis yaitu transpotasi dalam bentuk bensin. Adapun besarannya adalah 10.000 / Liter'
    },
    {
      id: 4,
      name: 'WAKAF QURAN TERJEMAH',
      image: '/yayasan-karya-muda.jpg',
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

  // Payment gateways
  const paymentGateways = [
    { 
      id: 'midtrans', 
      name: 'Midtrans', 
      image: '/yayasan-karya-muda.jpg',
      description: 'Pembayaran melalui berbagai metode (QRIS, VA, E-wallet, dll)'
    },
    { 
      id: 'xendit', 
      name: 'Xendit', 
      image: '/yayasan-karya-muda.jpg',
      description: 'Pembayaran cepat melalui berbagai channel pembayaran'
    }
  ];

  useEffect(() => {
    const fetchData = async () => {
      try {
        setLoading(true);
        setError(null);
        
        // Pastikan programId adalah integer
        const parsedProgramId = parseInt(programId);
        if (isNaN(parsedProgramId)) {
          setError('ID program tidak valid');
          setLoading(false);
          return;
        }
        
        try {
          // Fetch program data
          const programData = await programDonasiAPI.getById(parsedProgramId);
          setProgram(programData);
          
          // Fetch payment methods
          const metodePembayaranData = await metodePembayaranAPI.getAll();
          setMetodePembayaran(metodePembayaranData);
          
          setLoading(false);
        } catch (apiError) {
          console.error('Error fetching data from API:', apiError);
          
          // Fallback to static data if API fails
          // Find the program based on the ID from URL params
          const foundProgram = donationPrograms.find(p => p.id === parsedProgramId);
          if (foundProgram) {
            setProgram(foundProgram);
            setMetodePembayaran(paymentGateways);
            setLoading(false);
          } else {
            // If program not found, show error
            setError(`Program donasi dengan ID ${parsedProgramId} tidak ditemukan`);
            setLoading(false);
          }
        }
      } catch (err) {
        console.error('Error in component:', err);
        setError('Terjadi kesalahan saat mengambil data. Silakan coba lagi.');
        setLoading(false);
      }
    };
    
    fetchData();
  }, [programId, navigate]);

  const handleAmountSelect = (amount) => {
    // Toggle selection: if the same amount is clicked, deselect it
    if (selectedAmount === amount) {
      setSelectedAmount(null);
      setCustomAmount('');
    } else {
      setSelectedAmount(amount);
      setCustomAmount(formatNumber(amount.toString()));
    }
  };

  const formatNumber = (value) => {
    // Remove non-numeric characters
    const numericValue = value.replace(/[^\d]/g, '');
    
    // Format with thousand separator
    if (numericValue) {
      return numericValue.replace(/\B(?=(\d{3})+(?!\d))/g, '.');
    }
    return '';
  };

  const handleCustomAmountChange = (e) => {
    const value = e.target.value;
    // Remove dots before setting the value
    const numericValue = value.replace(/\./g, '');
    setCustomAmount(formatNumber(numericValue));
    setSelectedAmount(null);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsProcessing(true);
    setError(null);

    try {
      const amount = customAmount ? parseInt(customAmount.replace(/\./g, '')) : selectedAmount;
      if (!amount) {
        setError('Silakan pilih atau masukkan jumlah donasi');
        setIsProcessing(false);
        return;
      }

      // Validate required fields
      if (!donorName || !donorEmail || !donorWhatsapp) {
        setError('Mohon lengkapi nama, email, dan nomor WhatsApp Anda');
        setIsProcessing(false);
        return;
      }

      const donationData = {
        id_program: programId,
        jumlah: amount,
        metode_pembayaran: 1, // Midtrans
        donatur: {
          name: donorName,
          email: donorEmail,
          city: donorCity,
          whatsapp: donorWhatsapp
        }
      };

      try {
        const response = await donasiAPI.create(donationData);
        console.log('Donation created:', response);
        
        // Redirect ke halaman pembayaran Midtrans jika ada redirect URL
        if (response.payment && response.payment.redirect_url) {
          window.location.href = response.payment.redirect_url;
        } else {
          // Fallback jika tidak ada redirect URL
          console.log('No redirect URL provided, showing payment options');
          
          // Tambahkan donatur ke daftar jika dipilih
          if (addToDonorList) {
            addDonor({
              name: donorName,
              amount: amount,
              program: program?.name || `Program #${programId}`,
              date: new Date().toLocaleDateString()
            });
          }
          
          setShowPaymentOptions(true);
        }
      } catch (apiError) {
        console.error('API Error:', apiError);
        setError('Terjadi kesalahan saat memproses pembayaran. Silakan coba lagi.');
        
        // Tampilkan opsi pembayaran alternatif
        setShowPaymentOptions(true);
      }
    } catch (error) {
      console.error('Error creating donation:', error);
      setError('Terjadi kesalahan saat membuat donasi. Silakan coba lagi.');
      // Tampilkan opsi pembayaran alternatif sebagai fallback
      setShowPaymentOptions(true);
    } finally {
      setIsProcessing(false);
    }
  };

  const handlePaymentGatewaySelect = (gateway) => {
    setSelectedPaymentGateway(gateway);
    // Simulasi proses pembayaran
    setIsProcessing(true);
    setTimeout(() => {
      setIsProcessing(false);
      setPaymentSuccess(true);
      // Tambahkan donatur ke daftar jika dipilih
      if (addToDonorList) {
        const amount = customAmount ? parseInt(customAmount.replace(/\./g, '')) : selectedAmount;
        addDonor({
          name: donorName,
          amount: amount,
          program: program?.name || `Program #${programId}`,
          date: new Date().toLocaleDateString()
        });
      }
    }, 2000);
  };
  
  const handlePaymentComplete = () => {
    // Reset form
    setDonorName('');
    setDonorEmail('');
    setDonorCity('');
    setDonorWhatsapp('');
    setCustomAmount('');
    setSelectedAmount(null);
    setAddToDonorList(true);
    setSelectedPaymentGateway(null);
    setPaymentStep(1);
    setShowPaymentOptions(false);
    setPaymentSuccess(false);
    
    // Redirect to donor list page after successful donation
    navigate('/daftar-donatur');
  };

  if (loading) {
    return (
      <div className="min-h-screen bg-gray-50 pt-20">
        <div className="container mx-auto px-4 py-12" style={{ overflowX: 'hidden' }}>
          <div className="flex justify-center items-center h-64">
            <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-green-500"></div>
          </div>
        </div>
      </div>
    );
  }
  
  if (error && !program) {
    return (
      <div className="min-h-screen bg-gray-50 pt-20">
        <div className="container mx-auto px-4 py-12" style={{ overflowX: 'hidden' }}>
          <div className="bg-red-50 border border-red-200 rounded-lg p-6 text-center max-w-2xl mx-auto">
            <h3 className="text-xl font-bold text-red-800 mb-2">Error</h3>
            <p className="text-red-600 mb-4">{error}</p>
            <button 
              onClick={() => navigate('/program-donasi')}
              className="bg-primary hover:bg-primary-dark text-white font-medium py-2 px-4 rounded-lg"
            >
              Kembali ke Daftar Program
            </button>
          </div>
        </div>
      </div>
    );
  }

  if (!program) {
    return (
      <div className="min-h-screen bg-gray-50 pt-20">
        <div className="container mx-auto px-4 py-12" style={{ overflowX: 'hidden' }}>
          <div className="text-center">Program tidak ditemukan</div>
        </div>
      </div>
    );
  }

  // Tambahkan rendering untuk opsi pembayaran alternatif
  const renderPaymentOptions = () => {
    if (!showPaymentOptions) return null;
    
    return (
      <div className="mt-6 p-4 bg-gray-50 rounded-lg border border-gray-200">
        <h4 className="text-lg font-semibold text-gray-800 mb-3">Pilih Metode Pembayaran</h4>
        <p className="text-gray-600 mb-4">Silakan pilih metode pembayaran yang Anda inginkan:</p>
        
        <div className="space-y-3">
          {/* Payment method options */}
          <button 
            type="button"
            className="w-full flex items-center justify-between p-3 border rounded-md hover:bg-gray-50 transition-colors"
            onClick={() => handlePaymentGatewaySelect('Bank Transfer')}
            disabled={isProcessing}
          >
            <div className="flex items-center">
              <img 
                src="https://i.imgur.com/SLJ80Fv.png" 
                alt="Bank Transfer" 
                className="h-8 w-auto mr-3"
                onError={(e) => {
                  e.target.onerror = null;
                  e.target.src = "https://via.placeholder.com/32/eee/999?text=Bank";
                }}
              />
              <span>Bank Transfer</span>
            </div>
            <span className="text-primary">→</span>
          </button>
          
          <button 
            type="button"
            className="w-full flex items-center justify-between p-3 border rounded-md hover:bg-gray-50 transition-colors"
            onClick={() => handlePaymentGatewaySelect('QRIS')}
            disabled={isProcessing}
          >
            <div className="flex items-center">
              <img 
                src="https://i.imgur.com/mHzQMbP.png" 
                alt="QRIS" 
                className="h-8 w-auto mr-3"
                onError={(e) => {
                  e.target.onerror = null;
                  e.target.src = "https://via.placeholder.com/32/eee/999?text=QRIS";
                }}
              />
              <span>QRIS</span>
            </div>
            <span className="text-primary">→</span>
          </button>
          
          <button 
            type="button"
            className="w-full flex items-center justify-between p-3 border rounded-md hover:bg-gray-50 transition-colors"
            onClick={() => handlePaymentGatewaySelect('E-Wallet')}
            disabled={isProcessing}
          >
            <div className="flex items-center">
              <img 
                src="https://i.imgur.com/kFUJoHS.png" 
                alt="E-Wallet" 
                className="h-8 w-auto mr-3"
                onError={(e) => {
                  e.target.onerror = null;
                  e.target.src = "https://via.placeholder.com/32/eee/999?text=Wallet";
                }}
              />
              <span>E-Wallet (OVO, GoPay, DANA, LinkAja)</span>
            </div>
            <span className="text-primary">→</span>
          </button>
        </div>
      </div>
    );
  };

  const renderSuccessMessage = () => {
    if (!paymentSuccess) return null;
    
    return (
      <div className="bg-green-50 p-6 rounded-lg border border-green-200 text-center">
        <div className="text-green-500 text-5xl mb-4 flex justify-center">
          <svg xmlns="http://www.w3.org/2000/svg" className="h-16 w-16" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
          </svg>
        </div>
        <h3 className="text-xl font-bold text-green-800 mb-2">Pembayaran Berhasil!</h3>
        <p className="text-green-700 mb-4">
          Terima kasih atas donasi Anda untuk {program?.name}. Donasi Anda akan sangat membantu program ini.
        </p>
        <button 
          onClick={handlePaymentComplete}
          className="px-4 py-2 bg-green-600 text-white rounded-md hover:bg-green-700 transition-colors"
        >
          Lihat Daftar Donatur
        </button>
      </div>
    );
  };

  return (
    <div className="min-h-screen bg-gray-50 pt-20">
      <div className="container mx-auto px-4 py-12" style={{ overflowX: 'hidden' }}>
        <motion.div 
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, ease: "easeOut" }}
          className="max-w-6xl mx-auto"
        >
          <button 
            onClick={() => navigate('/program-reguler')}
            className="flex items-center text-primary mb-6 hover:text-primary-dark"
            style={{ willChange: 'auto' }}
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
                      e.target.src = '/yayasan-karya-muda.jpg';
                    }}
                  />
                </div>
                
                <h3 className="font-semibold text-primary mb-2">Nama Program</h3>
                <p className="text-gray-700 mb-4">{program.name}</p>
                
                <h3 className="font-semibold text-primary mb-2">Dana Terkumpul</h3>
                <p className="text-gray-700 mb-4">{program.collectedAmount || 'Rp 0'}</p>
                
                <h3 className="font-semibold text-primary mb-2">Target Donasi</h3>
                <p className="text-gray-700 mb-4">{program.target || 'Rp 0'}</p>
                
                <h3 className="font-semibold text-primary mb-2">Berakhir Pada</h3>
                <p className="text-gray-700 mb-4">{program.deadline || 'Belum ditentukan'}</p>
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
                
                {paymentSuccess ? (
                  renderSuccessMessage()
                ) : (
                  <>
                    <h3 className="text-xl font-semibold text-primary mb-4">Form Donasi</h3>
                    
                    {error && (
                      <div className="mb-4 p-3 bg-red-50 border border-red-200 text-red-700 rounded-md">
                        {error}
                      </div>
                    )}
                    
                    <form onSubmit={handleSubmit}>
                      <div>
                        <label className="block text-gray-700 mb-2">Nama Donatur</label>
                        <input 
                          type="text" 
                          className="w-full px-4 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-primary"
                          placeholder="Masukkan nama Anda"
                          value={donorName}
                          onChange={(e) => setDonorName(e.target.value)}
                          required
                        />
                      </div>
                      
                      <div>
                        <label className="block text-gray-700 mb-2">Email</label>
                        <input 
                          type="email" 
                          className="w-full px-4 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-primary"
                          placeholder="Masukkan email Anda"
                          value={donorEmail}
                          onChange={(e) => setDonorEmail(e.target.value)}
                          required
                        />
                      </div>
                      
                      <div>
                        <label className="block text-gray-700 mb-2">Asal Kota</label>
                        <input 
                          type="text" 
                          className="w-full px-4 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-primary"
                          placeholder="Masukkan kota asal Anda"
                          value={donorCity}
                          onChange={(e) => setDonorCity(e.target.value)}
                          required
                        />
                      </div>
                      
                      <div>
                        <label className="block text-gray-700 mb-2">No WhatsApp</label>
                        <input 
                          type="text" 
                          className="w-full px-4 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-primary"
                          placeholder="Masukkan nomor WhatsApp Anda"
                          value={donorWhatsapp}
                          onChange={(e) => setDonorWhatsapp(e.target.value)}
                          required
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
                              className={`px-4 py-3 border rounded-lg text-center transition-all ${
                                selectedAmount === amount.value
                                  ? 'bg-green-500 text-white border-green-500 shadow-md hover:bg-green-600'
                                  : 'bg-white text-gray-700 border-gray-300 hover:bg-gray-50'
                              }`}
                            >
                              {amount.label}
                              {selectedAmount === amount.value && (
                                <div className="text-xs mt-1 font-normal">(Klik untuk batal)</div>
                              )}
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
                              className={`w-full px-4 py-2 pl-10 border rounded-md focus:outline-none focus:ring-2 focus:ring-primary ${
                                selectedAmount ? 'bg-gray-100' : ''
                              }`}
                              placeholder="Masukkan jumlah donasi"
                              disabled={selectedAmount !== null}
                              onClick={() => {
                                if (selectedAmount) {
                                  setSelectedAmount(null);
                                  setCustomAmount('');
                                }
                              }}
                            />
                          </div>
                        </div>
                      </div>
                      
                      <div>
                        <label className="flex items-center space-x-2">
                          <input 
                            type="checkbox" 
                            className="h-4 w-4 text-primary focus:ring-primary" 
                            checked={addToDonorList}
                            onChange={(e) => setAddToDonorList(e.target.checked)}
                          />
                          <span className="text-gray-700">Masukkan ke Daftar Donatur</span>
                        </label>
                      </div>
                      
                      <div className="mt-6">
                        <button
                          type="submit"
                          className={`w-full py-3 rounded-md font-medium text-white flex items-center justify-center ${
                            isProcessing 
                              ? 'bg-gray-400 cursor-not-allowed' 
                              : 'bg-primary hover:bg-primary/90'
                          }`}
                          disabled={isProcessing}
                        >
                          {isProcessing ? (
                            <>
                              <div className="animate-spin rounded-full h-5 w-5 border-t-2 border-b-2 border-white mr-3"></div>
                              Memproses...
                            </>
                          ) : (
                            <>
                              <FaHeart className="mr-2" />
                              Lanjutkan ke Pembayaran
                            </>
                          )}
                        </button>
                        
                        {renderPaymentOptions()}
                      </div>
                    </form>
                  </>
                )}
              </div>
            </div>
          </div>
        </motion.div>
      </div>
    </div>
  );
};

export default DonationProgramDetail; 