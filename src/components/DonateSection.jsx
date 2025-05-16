import { useState } from 'react';
import { motion } from 'framer-motion';
import { FaHeart, FaHandHoldingHeart, FaUsers } from 'react-icons/fa';

const donationOptions = [
  { id: 1, amount: '50.000', label: 'Rp 50.000' },
  { id: 2, amount: '100.000', label: 'Rp 100.000' },
  { id: 3, amount: '250.000', label: 'Rp 250.000' },
  { id: 4, amount: '500.000', label: 'Rp 500.000' },
  { id: 5, amount: 'custom', label: 'Jumlah Lain' }
];

const DonateSection = () => {
  const [selectedAmount, setSelectedAmount] = useState('100.000');
  const [customAmount, setCustomAmount] = useState('');
  const [showCustom, setShowCustom] = useState(false);

  const handleAmountSelect = (amount) => {
    if (amount === 'custom') {
      setShowCustom(true);
      setSelectedAmount('custom');
    } else {
      setShowCustom(false);
      setSelectedAmount(amount);
    }
  };

  return (
    <section id="donate" className="py-24 bg-gradient-to-b from-accent/10 to-white">
      <div className="container mx-auto px-4">
        <div className="max-w-3xl mx-auto text-center mb-16">
          <h2 className="text-3xl md:text-4xl font-bold text-primary mb-6">Dukung Gerakan Kami</h2>
          <p className="text-lg text-gray-700 leading-relaxed">
            Donasi Anda membantu kami mewujudkan lingkungan yang berkelanjutan dan 
            memberdayakan komunitas lokal melalui program-program inovatif.
          </p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-10 items-center">
          {/* Donation Form */}
          <motion.div 
            initial={{ opacity: 0, x: -20 }}
            whileInView={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.6 }}
            viewport={{ once: true }}
            className="bg-white p-8 rounded-xl shadow-lg"
          >
            <h3 className="text-2xl font-bold text-primary mb-6 flex items-center">
              <FaHeart className="text-secondary mr-3" />
              Formulir Donasi
            </h3>

            <div className="mb-6">
              <label className="block text-gray-700 font-medium mb-2">Pilih Jumlah Donasi</label>
              <div className="grid grid-cols-2 md:grid-cols-3 gap-3">
                {donationOptions.map(option => (
                  <button
                    key={option.id}
                    className={`py-3 px-4 rounded-lg border-2 transition-colors ${
                      selectedAmount === option.amount
                        ? 'border-primary bg-primary/10 text-primary'
                        : 'border-gray-200 hover:border-primary/50'
                    }`}
                    onClick={() => handleAmountSelect(option.amount)}
                  >
                    {option.label}
                  </button>
                ))}
              </div>
            </div>

            {showCustom && (
              <div className="mb-6">
                <label htmlFor="customAmount" className="block text-gray-700 font-medium mb-2">
                  Masukkan Jumlah (Rp)
                </label>
                <input
                  type="text"
                  id="customAmount"
                  value={customAmount}
                  onChange={(e) => setCustomAmount(e.target.value)}
                  placeholder="contoh: 75.000"
                  className="w-full px-4 py-3 border-2 border-gray-200 rounded-lg focus:outline-none focus:border-primary"
                />
              </div>
            )}

            <div className="space-y-6">
              <div>
                <label htmlFor="name" className="block text-gray-700 font-medium mb-2">
                  Nama Lengkap
                </label>
                <input
                  type="text"
                  id="name"
                  placeholder="Masukkan nama lengkap Anda"
                  className="w-full px-4 py-3 border-2 border-gray-200 rounded-lg focus:outline-none focus:border-primary"
                />
              </div>

              <div>
                <label htmlFor="email" className="block text-gray-700 font-medium mb-2">
                  Email
                </label>
                <input
                  type="email"
                  id="email"
                  placeholder="contoh@email.com"
                  className="w-full px-4 py-3 border-2 border-gray-200 rounded-lg focus:outline-none focus:border-primary"
                />
              </div>

              <div>
                <label htmlFor="message" className="block text-gray-700 font-medium mb-2">
                  Pesan (Opsional)
                </label>
                <textarea
                  id="message"
                  rows="3"
                  placeholder="Tulis pesan Anda di sini"
                  className="w-full px-4 py-3 border-2 border-gray-200 rounded-lg focus:outline-none focus:border-primary"
                ></textarea>
              </div>

              <button className="w-full btn btn-primary">
                Lanjutkan Donasi
              </button>
            </div>
          </motion.div>

          {/* Why Donate */}
          <motion.div 
            initial={{ opacity: 0, x: 20 }}
            whileInView={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.6, delay: 0.2 }}
            viewport={{ once: true }}
          >
            <h3 className="text-2xl font-bold text-primary mb-6">Mengapa Berdonasi?</h3>
            
            <div className="space-y-8">
              <div className="flex">
                <div className="flex-shrink-0 h-12 w-12 bg-primary/20 text-primary rounded-full flex items-center justify-center mr-4">
                  <FaHandHoldingHeart className="h-6 w-6" />
                </div>
                <div>
                  <h4 className="text-xl font-bold text-secondary mb-2">Dampak Langsung</h4>
                  <p className="text-gray-700">
                    100% donasi Anda disalurkan langsung untuk mendukung program-program 
                    keberlanjutan dan pemberdayaan masyarakat.
                  </p>
                </div>
              </div>
              
              <div className="flex">
                <div className="flex-shrink-0 h-12 w-12 bg-primary/20 text-primary rounded-full flex items-center justify-center mr-4">
                  <FaUsers className="h-6 w-6" />
                </div>
                <div>
                  <h4 className="text-xl font-bold text-secondary mb-2">Membangun Komunitas</h4>
                  <p className="text-gray-700">
                    Donasi Anda membantu terciptanya komunitas yang lebih kuat dengan pengetahuan 
                    dan keterampilan untuk masa depan berkelanjutan.
                  </p>
                </div>
              </div>
              
              <div className="p-6 bg-accent/20 rounded-lg">
                <h4 className="text-xl font-bold text-primary mb-3">Daftar Donatur Teratas</h4>
                <ul className="space-y-3">
                  <li className="flex justify-between pb-2 border-b border-gray-200">
                    <span className="font-medium">Budi Santoso</span>
                    <span className="text-primary font-medium">Rp 5.000.000</span>
                  </li>
                  <li className="flex justify-between pb-2 border-b border-gray-200">
                    <span className="font-medium">PT Hijau Lestari</span>
                    <span className="text-primary font-medium">Rp 10.000.000</span>
                  </li>
                  <li className="flex justify-between pb-2 border-b border-gray-200">
                    <span className="font-medium">Komunitas Peduli Alam</span>
                    <span className="text-primary font-medium">Rp 7.500.000</span>
                  </li>
                </ul>
                <p className="mt-4 text-sm text-gray-600 text-center">
                  Bergabunglah dengan para donatur kami untuk mendukung perubahan positif!
                </p>
              </div>
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
};

export default DonateSection; 