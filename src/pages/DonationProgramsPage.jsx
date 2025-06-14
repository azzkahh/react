import { motion } from 'framer-motion';
import { FaSun, FaUtensils, FaCar, FaBook, FaHandHoldingHeart } from 'react-icons/fa';
import { Link } from 'react-router-dom';

const DonationProgramsPage = () => {
  // Animation variants for staggered animations
  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.15
      }
    }
  };

  const itemVariants = {
    hidden: { opacity: 0, y: 30 },
    visible: {
      opacity: 1,
      y: 0,
      transition: { 
        type: "spring",
        stiffness: 100,
        damping: 12,
        duration: 0.6 
      }
    }
  };

  // Donation programs data
  const donationPrograms = [
    {
      id: 'sedekah-subuh',
      title: 'Sedekah Subuh',
      description: 'Berbagi keberkahan di waktu pagi untuk sesama',
      icon: <FaSun className="text-3xl text-amber-500" />,
      color: 'from-amber-100 to-amber-50',
      hoverColor: 'hover:from-amber-200 hover:to-amber-100',
      path: '/program-donasi/1'
    },
    {
      id: 'beras-santri',
      title: 'Beras untuk Santri',
      description: 'Memenuhi kebutuhan pokok para penuntut ilmu',
      icon: <FaUtensils className="text-3xl text-emerald-600" />,
      color: 'from-emerald-100 to-emerald-50',
      hoverColor: 'hover:from-emerald-200 hover:to-emerald-100',
      path: '/program-donasi/2'
    },
    {
      id: 'transport-ustadz',
      title: 'Transport Ustadz',
      description: 'Memudahkan perjalanan para pengajar ilmu agama',
      icon: <FaCar className="text-3xl text-blue-600" />,
      color: 'from-blue-100 to-blue-50',
      hoverColor: 'hover:from-blue-200 hover:to-blue-100',
      path: '/program-donasi/3'
    },
    {
      id: 'wakaf-quran',
      title: 'Wakaf Qur\'an Terjemah',
      description: 'Menyebarkan cahaya Al-Qur\'an untuk semua',
      icon: <FaBook className="text-3xl text-purple-600" />,
      color: 'from-purple-100 to-purple-50',
      hoverColor: 'hover:from-purple-200 hover:to-purple-100',
      path: '/program-donasi/4'
    }
  ];

  return (
    <div className="min-h-screen bg-gradient-to-b from-white to-gray-50 pt-28 pb-16">
      <div className="container mx-auto px-4">
        <motion.div
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.7 }}
          className="text-center mb-16"
        >
          <div className="flex justify-center mb-6">
            <div className="inline-block p-4 rounded-full bg-primary/10">
              <FaHandHoldingHeart className="text-4xl text-primary" />
            </div>
          </div>
          <h1 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">Pilih Program Donasi</h1>
          <p className="text-gray-600 max-w-2xl mx-auto text-lg">
            Pilih program donasi yang ingin Anda dukung untuk membantu kami mewujudkan program-program 
            sosial dan pendidikan yang bermanfaat
          </p>
        </motion.div>

        <motion.div
          variants={containerVariants}
          initial="hidden"
          animate="visible"
          className="max-w-3xl mx-auto"
        >
          {donationPrograms.map((program) => (
            <motion.div
              key={program.id}
              variants={itemVariants}
              whileHover={{ scale: 1.03 }}
              className="mb-6"
            >
              <Link 
                to={program.path}
                className={`flex items-center bg-gradient-to-r ${program.color} ${program.hoverColor} rounded-xl p-6 shadow-sm hover:shadow-md transition-all duration-300`}
              >
                <div className="flex-shrink-0 mr-6 bg-white p-4 rounded-full shadow-sm">
                  {program.icon}
                </div>
                <div className="flex-grow">
                  <div className="text-xl font-bold text-gray-800 mb-1">
                    {program.title}
                  </div>
                  <div className="text-gray-600">
                    {program.description}
                  </div>
                </div>
                <div className="ml-4">
                  <div className="bg-white/80 hover:bg-white rounded-full h-10 w-10 flex items-center justify-center shadow-sm">
                    <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 text-gray-500" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                    </svg>
                  </div>
                </div>
              </Link>
            </motion.div>
          ))}
        </motion.div>
        
        <motion.div 
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 1, duration: 1 }}
          className="text-center mt-12 text-gray-500"
        >
          <p>Setiap donasi Anda sangat berarti bagi kami</p>
        </motion.div>
      </div>
    </div>
  );
};

export default DonationProgramsPage; 