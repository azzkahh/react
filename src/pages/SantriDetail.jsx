import React, { useState, useEffect } from 'react';
import { useParams, Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import { FaHeart, FaArrowLeft, FaQuran } from 'react-icons/fa';
import { donasiAPI, santriAPI } from '../services/api'; // Import API services

// Midtrans API Keys
const MIDTRANS_CLIENT_KEY = 'SB-Mid-client-UfShnUzEBDKi_dsY';
const MIDTRANS_SERVER_KEY = 'SB-Mid-server-VcQ2N5hImJgXd4iSBEvOoC_L';

const SantriDetail = () => {
  const { santriId } = useParams();
  const [santri, setSantri] = useState(null);
  const [loading, setLoading] = useState(true);
  const [donorName, setDonorName] = useState('');
  const [donorEmail, setDonorEmail] = useState('');
  const [donorCity, setDonorCity] = useState('');
  const [donorWhatsapp, setDonorWhatsapp] = useState('');
  const [donorMessage, setDonorMessage] = useState('');
  const [addToDonorList, setAddToDonorList] = useState(true);
  const [selectedAmount, setSelectedAmount] = useState(50000); // Default to 50000
  const [customAmount, setCustomAmount] = useState('');
  const [isProcessing, setIsProcessing] = useState(false);
  const [showPaymentOptions, setShowPaymentOptions] = useState(false);
  const [error, setError] = useState(null);
  const [paymentSuccess, setPaymentSuccess] = useState(false);
  const [midtransScriptLoaded, setMidtransScriptLoaded] = useState(false);

  // Donation amount options - updated to match the image
  const donationAmounts = [
    { value: 50000, label: 'Rp 50.000' },
    { value: 100000, label: 'Rp 100.000' },
    { value: 150000, label: 'Rp 150.000' },
    { value: 200000, label: 'Rp 200.000' },
  ];

  // Sample data for santri profiles - in a real app, this would come from an API
  const santriProfiles = [
    {
      id: 1,
      name: 'Ahmad',
      age: 10,
      grade: 4,
      story: 'Ahmad berasal dari keluarga kurang mampu di daerah terpencil. Ia memiliki semangat belajar yang tinggi dan bercita-cita menjadi guru.',
      quranMemorization: '5 Juz',
      videoUrl: 'https://www.youtube.com/embed/dQw4w9WgXcQ' // Replace with actual YouTube video ID
    },
    {
      id: 2,
      name: 'Fatimah',
      age: 12,
      grade: 6,
      story: 'Fatimah adalah anak yatim yang memiliki prestasi akademik yang baik. Ia ingin melanjutkan pendidikan untuk menjadi dokter di masa depan.',
      quranMemorization: '3 Juz',
      videoUrl: 'https://www.youtube.com/embed/dQw4w9WgXcQ' // Replace with actual YouTube video ID
    },
    {
      id: 3,
      name: 'Ibrahim',
      age: 9,
      grade: 3,
      story: 'Ibrahim memiliki bakat dalam bidang seni dan hafalan Al-Quran. Ia berasal dari keluarga dengan kondisi ekonomi terbatas.',
      quranMemorization: '7 Juz',
      videoUrl: 'https://www.youtube.com/embed/dQw4w9WgXcQ' // Replace with actual YouTube video ID
    },
    {
      id: 4,
      name: 'Aisyah',
      age: 11,
      grade: 5,
      story: 'Aisyah adalah anak yatim piatu yang tinggal bersama neneknya. Ia rajin belajar dan memiliki minat dalam bidang matematika.',
      quranMemorization: '2 Juz',
      videoUrl: 'https://www.youtube.com/embed/dQw4w9WgXcQ' // Replace with actual YouTube video ID
    },
  ];

  // Fetch santri data from API
  useEffect(() => {
    const fetchSantriData = async () => {
      setLoading(true);
      try {
        // Try to get santri data from API
        const data = await santriAPI.getById(santriId);
        if (data) {
          setSantri(data);
        }
      } catch (error) {
        console.error('Error fetching santri data:', error);
        // Fallback to sample data if API fails
        const foundSantri = santriProfiles.find(s => s.id === parseInt(santriId));
        if (foundSantri) {
          setSantri(foundSantri);
        }
      } finally {
        setLoading(false);
      }
    };

    fetchSantriData();
  }, [santriId]);

  // Load Midtrans Snap script
  useEffect(() => {
    // Check if script is already loaded
    if (document.getElementById('midtrans-script')) {
      setMidtransScriptLoaded(true);
      return;
    }
    
    // Create script element
    const script = document.createElement('script');
    script.src = 'https://app.sandbox.midtrans.com/snap/snap.js';
    script.setAttribute('data-client-key', MIDTRANS_CLIENT_KEY);
    script.id = 'midtrans-script';
    script.async = true;

    // Set up event listeners
    script.onload = () => {
      console.log('Midtrans script loaded successfully');
      setMidtransScriptLoaded(true);
    };
    
    script.onerror = () => {
      console.error('Failed to load Midtrans script');
      setError('Gagal memuat skrip pembayaran. Silakan muat ulang halaman.');
    };

    // Append script to document
    document.body.appendChild(script);

    // Clean up
    return () => {
      if (document.body.contains(script)) {
        document.body.removeChild(script);
      }
    };
  }, []);

  const handleAmountSelect = (amount) => {
    setSelectedAmount(amount);
    setCustomAmount('');
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
      // Get final donation amount (either selected or custom)
      const finalAmount = selectedAmount || (customAmount ? parseInt(customAmount.replace(/\./g, ''), 10) : 0);
      
      if (!finalAmount || finalAmount < 10000) {
        setError('Silakan pilih atau masukkan jumlah donasi minimal Rp 10.000');
        setIsProcessing(false);
        return;
      }

      // Validate required fields
      if (!donorName || !donorEmail || !donorWhatsapp) {
        setError('Mohon lengkapi nama, email, dan nomor WhatsApp Anda');
        setIsProcessing(false);
        return;
      }

      // Prepare donation data
      const donationData = {
        amount: finalAmount,
        name: donorName,
        email: donorEmail,
        phone: donorWhatsapp,
        city: donorCity,
        message: donorMessage,
        santri_id: santriId,
        santri_name: santri.name,
        show_in_donor_list: addToDonorList,
        payment_type: 'midtrans'
      };

      console.log('Creating donation with data:', donationData);
      
      // For development environment, use dummy implementation
      if (process.env.NODE_ENV === 'development' || 
          window.location.hostname === 'localhost' || 
          window.location.hostname === '127.0.0.1') {
        
        console.log('Development mode: Using dummy payment flow');
        
        // Simulate API delay
        await new Promise(resolve => setTimeout(resolve, 1000));
        
        // Show payment options directly without trying to call Midtrans
        setShowPaymentOptions(true);
        setIsProcessing(false);
        
        return;
      }
      
      // For production environment, try to use actual Midtrans integration
      try {
        // Create transaction via your backend API
        const response = await donasiAPI.create(donationData);
        
        if (response && response.token) {
          // If we have a token, open Midtrans Snap
          if (window.snap && midtransScriptLoaded) {
            window.snap.pay(response.token, {
              onSuccess: function(result) {
                console.log('Payment success:', result);
                setPaymentSuccess(true);
                resetForm();
              },
              onPending: function(result) {
                console.log('Payment pending:', result);
                alert('Pembayaran dalam proses. Silakan selesaikan pembayaran Anda.');
              },
              onError: function(result) {
                console.error('Payment error:', result);
                setError('Terjadi kesalahan saat memproses pembayaran.');
              },
              onClose: function() {
                console.log('Customer closed the payment window');
                setShowPaymentOptions(true);
              }
            });
          } else {
            console.error('Midtrans Snap not available');
            setError('Layanan pembayaran tidak tersedia. Silakan muat ulang halaman.');
            setShowPaymentOptions(true);
          }
        } else {
          // If no token, show payment options as fallback
          console.log('No token received, showing payment options');
          setShowPaymentOptions(true);
        }
      } catch (apiError) {
        console.error('API error:', apiError);
        // Show payment options as fallback on API error
        setShowPaymentOptions(true);
      }
      
      setIsProcessing(false);
    } catch (error) {
      console.error('Error processing donation:', error);
      setError('Terjadi kesalahan saat memproses donasi. Silakan coba lagi.');
      setShowPaymentOptions(true);
      setIsProcessing(false);
    }
  };

  // Function to reset form
  const resetForm = () => {
    setDonorName('');
    setDonorEmail('');
    setDonorCity('');
    setDonorWhatsapp('');
    setDonorMessage('');
    setCustomAmount('');
    setSelectedAmount(null);
    setAddToDonorList(true);
    setShowPaymentOptions(false);
    setError(null);
  };

  // Payment method handler
  const handlePaymentMethodSelect = (method) => {
    setIsProcessing(true);
    
    try {
      // Simulasi proses pembayaran
      setTimeout(() => {
        setIsProcessing(false);
        setPaymentSuccess(true);
        
        // Simpan data donasi ke localStorage untuk simulasi
        const donationId = Date.now();
        const donationData = {
          id: donationId,
          santri_id: santriId,
          santri_name: santri.name,
          amount: selectedAmount || (customAmount ? parseInt(customAmount.replace(/\./g, ''), 10) : 0),
          donor_name: donorName,
          donor_email: donorEmail,
          donor_whatsapp: donorWhatsapp,
          donor_city: donorCity,
          message: donorMessage,
          payment_method: method,
          created_at: new Date().toISOString()
        };
        
        localStorage.setItem(`santri_donation_${donationId}`, JSON.stringify(donationData));
        console.log('Donation data saved:', donationData);
        
        // Tampilkan notifikasi sukses
        alert(`Terima kasih ${donorName}! Donasi Anda untuk ${santri.name} telah berhasil diproses menggunakan ${method}.`);
        
        // Reset form
        resetForm();
      }, 2000);
    } catch (error) {
      console.error('Error processing payment:', error);
      setError('Terjadi kesalahan saat memproses pembayaran. Silakan coba lagi.');
      setIsProcessing(false);
    }
  };

  if (loading) {
    return (
      <div className="min-h-screen bg-gray-50 pt-20">
        <div className="container mx-auto px-4 py-12">
          <div className="flex justify-center items-center h-64">
            <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-green-500"></div>
          </div>
        </div>
      </div>
    );
  }

  if (!santri) {
    return (
      <div className="min-h-screen bg-gray-50 pt-20">
        <div className="container mx-auto px-4 py-12">
          <div className="max-w-4xl mx-auto text-center">
            <h2 className="text-2xl font-bold text-gray-800 mb-4">Santri tidak ditemukan</h2>
            <p className="text-gray-600 mb-6">Maaf, data santri yang Anda cari tidak ditemukan.</p>
            <Link to="/program-orang-tua-asuh" className="inline-flex items-center text-primary hover:underline">
              <FaArrowLeft className="mr-2" /> Kembali ke Program Orang Tua Asuh
            </Link>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50 pt-20">
      <div className="container mx-auto px-4 py-12">
        <div className="max-w-4xl mx-auto">
          <div className="mb-6">
            <Link to="/program-orang-tua-asuh" className="inline-flex items-center text-primary hover:underline">
              <FaArrowLeft className="mr-2" /> Kembali ke Program Orang Tua Asuh
            </Link>
          </div>
          
          <motion.div 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
          >
            <h1 className="text-3xl md:text-4xl font-bold text-primary mb-6">Detail Santri</h1>
            
            {/* YouTube Video */}
            <div className="bg-white rounded-lg shadow-md p-6 mb-8">
              <h2 className="text-2xl font-semibold text-gray-800 mb-4">Video Profil {santri?.name}</h2>
              <div className="aspect-w-16 aspect-h-9 mb-6">
                <iframe 
                  className="w-full h-[400px] rounded-lg"
                  src={santri?.videoUrl}
                  title={`Video Profil ${santri?.name}`}
                  frameBorder="0"
                  allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                  allowFullScreen
                ></iframe>
              </div>
            </div>
            
            <div className="bg-white rounded-lg shadow-md p-6 mb-8">
              <div className="flex flex-col md:flex-row gap-8">
                {/* Santri Info */}
                <div className="md:w-1/2">
                  <div className="flex justify-center mb-6">
                    <div className="w-40 h-40 rounded-full bg-gray-200 flex items-center justify-center overflow-hidden">
                      <img 
                        src={`/santri-placeholder-${santri?.id}.png`} 
                        alt={`Santri ${santri?.name}`}
                        className="w-full h-full object-cover"
                        onError={(e) => {
                          e.target.onerror = null;
                          e.target.src = "https://via.placeholder.com/200/eee/999?text=Santri";
                        }}
                      />
                    </div>
                  </div>
                  
                  <h3 className="text-2xl font-bold text-primary text-center mb-4">{santri?.name}</h3>
                  
                  <div className="bg-gray-50 p-4 rounded-lg mb-6">
                    <h4 className="font-semibold text-gray-800 mb-2">Biodata Santri</h4>
                    <ul className="space-y-2">
                      <li className="flex justify-between">
                        <span className="text-gray-600">Umur:</span>
                        <span className="font-medium">{santri?.age} tahun</span>
                      </li>
                      <li className="flex justify-between">
                        <span className="text-gray-600">Kelas:</span>
                        <span className="font-medium">{santri?.grade} SD</span>
                      </li>
                      <li className="flex justify-between items-center">
                        <span className="text-gray-600">Hafalan Al-Qur'an:</span>
                        <span className="font-medium flex items-center">
                          <FaQuran className="text-green-600 mr-2" />
                          {santri?.quranMemorization}
                        </span>
                      </li>
                      <li className="flex justify-between">
                        <span className="text-gray-600">Status:</span>
                        <span className="font-medium">Membutuhkan orang tua asuh</span>
                      </li>
                    </ul>
                  </div>
                  
                  <div className="mb-6">
                    <h4 className="font-semibold text-gray-800 mb-2">Cerita {santri?.name}</h4>
                    <p className="text-gray-600 text-justify">{santri?.story}</p>
                  </div>
                </div>
                
                {/* Donation Form - Updated to match the image */}
                <div className="md:w-1/2">
                  {paymentSuccess ? (
                    <div className="bg-green-50 p-6 rounded-lg border border-green-200 text-center">
                      <div className="text-green-500 text-5xl mb-4 flex justify-center">
                        <svg xmlns="http://www.w3.org/2000/svg" className="h-16 w-16" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
                        </svg>
                      </div>
                      <h3 className="text-xl font-bold text-green-800 mb-2">Pembayaran Berhasil!</h3>
                      <p className="text-green-700 mb-4">
                        Terima kasih atas donasi Anda untuk {santri?.name}. Donasi Anda akan sangat membantu pendidikannya.
                      </p>
                      <button 
                        onClick={() => setPaymentSuccess(false)}
                        className="px-4 py-2 bg-green-600 text-white rounded-md hover:bg-green-700 transition-colors"
                      >
                        Donasi Lagi
                      </button>
                    </div>
                  ) : (
                    <>
                      <h3 className="text-xl font-semibold text-primary mb-4">Form Donasi</h3>
                      
                      {error && (
                        <div className="mb-4 p-3 bg-red-50 border border-red-200 text-red-700 rounded-md">
                          {error}
                        </div>
                      )}
                      
                      <form onSubmit={handleSubmit}>
                        <div className="mb-4">
                          <label className="block text-gray-700 text-sm font-medium mb-2">
                            Nama Lengkap
                          </label>
                          <input 
                            type="text" 
                            className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-primary/50"
                            value={donorName}
                            onChange={(e) => setDonorName(e.target.value)}
                            required
                          />
                        </div>
                        
                        <div className="mb-4">
                          <label className="block text-gray-700 text-sm font-medium mb-2">
                            Email
                          </label>
                          <input 
                            type="email" 
                            className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-primary/50"
                            value={donorEmail}
                            onChange={(e) => setDonorEmail(e.target.value)}
                            required
                          />
                        </div>
                        
                        <div className="mb-4">
                          <label className="block text-gray-700 text-sm font-medium mb-2">
                            Kota
                          </label>
                          <input 
                            type="text" 
                            className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-primary/50"
                            value={donorCity}
                            onChange={(e) => setDonorCity(e.target.value)}
                            required
                          />
                        </div>
                        
                        <div className="mb-4">
                          <label className="block text-gray-700 text-sm font-medium mb-2">
                            WhatsApp
                          </label>
                          <input 
                            type="tel" 
                            className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-primary/50"
                            value={donorWhatsapp}
                            onChange={(e) => setDonorWhatsapp(e.target.value)}
                            required
                            placeholder="08xxxxxxxxxx"
                          />
                        </div>
                        
                        <div className="mb-4">
                          <label className="block text-gray-700 text-sm font-medium mb-2">
                            Pesan (Opsional)
                          </label>
                          <textarea 
                            className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-primary/50"
                            value={donorMessage}
                            onChange={(e) => setDonorMessage(e.target.value)}
                            placeholder="Tuliskan pesan atau doa untuk santri..."
                            rows="3"
                          ></textarea>
                        </div>
                        
                        {/* Donation Amount Selection - Updated to match the image */}
                        <div className="mb-6">
                          <label className="block text-gray-700 text-sm font-medium mb-2">
                            Pilih Jumlah Donasi
                          </label>
                          <div className="grid grid-cols-2 gap-3">
                            {donationAmounts.map((amount) => (
                              <button
                                key={amount.value}
                                type="button"
                                onClick={() => handleAmountSelect(amount.value)}
                                className={`py-3 px-4 rounded-md text-center transition-colors ${
                                  selectedAmount === amount.value 
                                    ? 'bg-green-500 text-white' 
                                    : 'border border-gray-300 hover:border-green-500 text-gray-700'
                                }`}
                              >
                                {amount.label}
                                {selectedAmount === amount.value && (
                                  <span className="block text-xs mt-1">(Klik untuk batal)</span>
                                )}
                              </button>
                            ))}
                          </div>
                        </div>
                        
                        {/* Custom Amount Input */}
                        <div className="mb-6">
                          <label className="block text-gray-700 text-sm font-medium mb-2">
                            Jumlah Lain
                          </label>
                          <div className="flex items-center border border-gray-300 rounded-md overflow-hidden">
                            <span className="bg-gray-100 px-3 py-2 text-gray-600 border-r">Rp</span>
                            <input
                              type="text"
                              className="flex-1 px-3 py-2 focus:outline-none"
                              placeholder="Masukkan nominal"
                              value={customAmount}
                              onChange={handleCustomAmountChange}
                              onClick={() => {
                                setSelectedAmount(null);
                              }}
                            />
                          </div>
                        </div>
                        
                        <div className="mb-6">
                          <label className="flex items-center">
                            <input
                              type="checkbox"
                              className="rounded text-green-500 focus:ring-green-500"
                              checked={addToDonorList}
                              onChange={() => setAddToDonorList(!addToDonorList)}
                            />
                            <span className="ml-2 text-sm text-gray-600">
                              Masukkan ke Daftar Donatur
                            </span>
                          </label>
                        </div>
                        
                        {/* Payment Button - Made more prominent */}
                        <button
                          type="submit"
                          className={`w-full py-4 rounded-md font-medium text-lg text-white flex items-center justify-center ${
                            isProcessing 
                              ? 'bg-gray-400 cursor-not-allowed' 
                              : 'bg-green-500 hover:bg-green-600'
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
                        
                        {showPaymentOptions && (
                          <div className="mt-6 p-4 bg-gray-50 rounded-lg border border-gray-200">
                            <h4 className="text-lg font-semibold text-gray-800 mb-3">Pilih Metode Pembayaran</h4>
                            <p className="text-gray-600 mb-4">Silakan pilih metode pembayaran yang Anda inginkan:</p>
                            
                            <div className="space-y-3">
                              {/* Payment method options */}
                              <button 
                                type="button"
                                className="w-full flex items-center justify-between p-3 border rounded-md hover:bg-gray-50 transition-colors"
                                onClick={() => handlePaymentMethodSelect('Bank Transfer')}
                                disabled={isProcessing}
                              >
                                <div className="flex items-center">
                                  <img 
                                    src="https://i.imgur.com/SLJ80Fv.png" 
                                    alt="Bank Transfer" 
                                    className="h-8 w-auto mr-3"
                                  />
                                  <span>Bank Transfer</span>
                                </div>
                                <span className="text-primary">→</span>
                              </button>
                              
                              <button 
                                type="button"
                                className="w-full flex items-center justify-between p-3 border rounded-md hover:bg-gray-50 transition-colors"
                                onClick={() => handlePaymentMethodSelect('QRIS')}
                                disabled={isProcessing}
                              >
                                <div className="flex items-center">
                                  <img 
                                    src="https://i.imgur.com/mHzQMbP.png" 
                                    alt="QRIS" 
                                    className="h-8 w-auto mr-3"
                                  />
                                  <span>QRIS</span>
                                </div>
                                <span className="text-primary">→</span>
                              </button>
                              
                              <button 
                                type="button"
                                className="w-full flex items-center justify-between p-3 border rounded-md hover:bg-gray-50 transition-colors"
                                onClick={() => handlePaymentMethodSelect('E-Wallet')}
                                disabled={isProcessing}
                              >
                                <div className="flex items-center">
                                  <img 
                                    src="https://i.imgur.com/kFUJoHS.png" 
                                    alt="E-Wallet" 
                                    className="h-8 w-auto mr-3"
                                  />
                                  <span>E-Wallet (OVO, GoPay, DANA, LinkAja)</span>
                                </div>
                                <span className="text-primary">→</span>
                              </button>
                            </div>
                          </div>
                        )}
                      </form>
                    </>
                  )}
                </div>
              </div>
            </div>
          </motion.div>
        </div>
      </div>
    </div>
  );
};

export default SantriDetail; 