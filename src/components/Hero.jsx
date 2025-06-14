import { motion } from 'framer-motion';
import { FaBookReader, FaHandsHelping, FaMoneyBillWave, FaQuran, FaMosque } from 'react-icons/fa';
// Import gambar placeholder
import placeholderImage from '../assets/placeholder.jpg';
import { Link } from 'react-router-dom';
import { FaHandHoldingHeart } from 'react-icons/fa';

const Hero = () => {
  const fadeIn = {
    hidden: { opacity: 0, y: 20 },
    visible: { 
      opacity: 1, 
      y: 0,
      transition: { duration: 0.8 }
    }
  };

  const staggerContainer = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.2
      }
    }
  };

  const itemVariant = {
    hidden: { opacity: 0, y: 20 },
    visible: {
      opacity: 1,
      y: 0,
      transition: { 
        type: "spring",
        stiffness: 100,
        damping: 12
      }
    }
  };

  // Fungsi untuk menangani error gambar
  const handleImageError = (e) => {
    console.log("Gambar tidak ditemukan, menggunakan placeholder");
    e.target.onerror = null;
    // Gunakan gambar dari Unsplash sebagai fallback terakhir
    e.target.src = "https://source.unsplash.com/random/1200x800/?islamic,mosque,education,charity";
  };

  return (
    <section className="min-h-screen flex items-center bg-gradient-to-b from-white to-accent/10 pt-20">
      <div className="container mx-auto px-4">
        <div className="flex flex-col lg:flex-row items-center gap-12">
          {/* Left content - Text */}
          <motion.div 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            className="w-full lg:w-1/2"
          >
            <h1 className="text-4xl md:text-5xl font-bold text-primary mb-6">
              Yayasan Karya Muda Sunan Drajat
            </h1>
            <p className="text-lg text-gray-700 mb-8 leading-relaxed text-justify">
            Yayasan Karya Muda Sunan Drajat, hadir sebagai perwujudan rasa syukur atas karunia Allah dan sebagai jawaban atas kesadaran sesama hamba Allah untuk mengambil peran sebagai "khalifah" nya dalam menebar manfaat dari karunia yang Allah hadirkan kepada hambanya.
            </p >
            <div className="flex flex-wrap gap-4">
              <Link
                to="/program-donasi"
                className="inline-flex items-center px-6 py-3 rounded-full bg-green-600 text-white font-medium hover:bg-green-700 transition-colors duration-200"
              >
                <FaHandHoldingHeart className="mr-2" />
                 Yuk Berdonasi
              </Link>
            </div>
          </motion.div>

          {/* Right content - Image */}
          <motion.div 
            initial={{ opacity: 0, scale: 0.9, x: 20 }}
            animate={{ opacity: 1, scale: 1, x: 0 }}
            transition={{ duration: 0.8, delay: 0.3 }}
            className="w-full lg:w-1/2 relative"
          >
            <img
              src="/yayasan-karya-muda.jpg"
              alt="Yayasan Karya Muda Sunan Drajat"
              className="w-full h-auto rounded-2xl shadow-xl"
              onError={(e) => {
                e.target.onerror = null;
                e.target.src = "https://placehold.co/800x600?text=Yayasan+Karya+Muda";
              }}
            />
          </motion.div>
        </div>
      </div>
    </section>
  );
};

export default Hero; 