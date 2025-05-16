import { motion } from 'framer-motion';
import { FaLeaf, FaHandsHelping, FaHome } from 'react-icons/fa';

const Hero = () => {
  return (
    <div className="min-h-screen relative bg-gradient-to-b from-accent/20 to-white pt-20">
      <div className="container mx-auto px-4 py-20 flex flex-col lg:flex-row items-center">
        {/* Left content */}
        <motion.div 
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          className="w-full lg:w-1/2 mb-12 lg:mb-0"
        >
          <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold text-primary leading-tight mb-6">
            Membangun Masa Depan <span className="text-secondary">Lebih Baik</span>
          </h1>
          <p className="text-lg md:text-xl text-gray-700 mb-8 max-w-lg">
            Yayasan Karya Muda Bunian Drajat adalah tempat di mana tradisi bertemu inovasi untuk membangun 
            komunitas yang berkelanjutan dan harmonis dengan alam.
          </p>
          <div className="flex flex-wrap gap-4">
            <a href="#programs" className="btn btn-primary">
              Program Kami
            </a>
            <a href="#donate" className="btn btn-outline">
              Dukung Kami
            </a>
          </div>

          <div className="mt-12 grid grid-cols-1 sm:grid-cols-3 gap-6">
            <motion.div 
              whileHover={{ y: -10 }}
              className="bg-white p-5 rounded-lg shadow-md flex flex-col items-center text-center"
            >
              <FaLeaf className="text-4xl text-primary mb-3" />
              <h3 className="font-bold text-lg mb-1">Pertanian Organik</h3>
              <p className="text-gray-600 text-sm">Menumbuhkan makanan sehat dengan praktik berkelanjutan</p>
            </motion.div>
            
            <motion.div 
              whileHover={{ y: -10 }}
              className="bg-white p-5 rounded-lg shadow-md flex flex-col items-center text-center"
            >
              <FaHandsHelping className="text-4xl text-primary mb-3" />
              <h3 className="font-bold text-lg mb-1">Pemberdayaan</h3>
              <p className="text-gray-600 text-sm">Mengembangkan keterampilan untuk kemandirian ekonomi</p>
            </motion.div>
            
            <motion.div 
              whileHover={{ y: -10 }}
              className="bg-white p-5 rounded-lg shadow-md flex flex-col items-center text-center"
            >
              <FaHome className="text-4xl text-primary mb-3" />
              <h3 className="font-bold text-lg mb-1">Desain Berkelanjutan</h3>
              <p className="text-gray-600 text-sm">Membangun rumah yang ramah lingkungan dan efisien</p>
            </motion.div>
          </div>
        </motion.div>

        {/* Right content - Image */}
        <motion.div 
          initial={{ opacity: 0, scale: 0.9 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.8, delay: 0.2 }}
          className="w-full lg:w-1/2 relative"
        >
          <div className="relative z-10 overflow-hidden rounded-xl shadow-2xl">
            <img 
              src="/hero-image.jpg" 
              alt="Rumah Karya Muda" 
              className="w-full h-auto object-cover"
              onError={(e) => {
                e.target.onerror = null; 
                e.target.src = "https://placehold.co/600x400?text=Rumah+Karya+Muda";
              }}
            />
          </div>
          
          {/* Decorative elements */}
          <div className="absolute -bottom-10 -right-10 w-60 h-60 bg-primary/10 rounded-full -z-10"></div>
          <div className="absolute -top-10 -left-10 w-40 h-40 bg-secondary/10 rounded-full -z-10"></div>
        </motion.div>
      </div>

      {/* Wave separator */}
      <div className="absolute bottom-0 left-0 w-full overflow-hidden leading-none">
        <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 1200 120" preserveAspectRatio="none" className="w-full h-16 text-white">
          <path d="M321.39,56.44c58-10.79,114.16-30.13,172-41.86,82.39-16.72,168.19-17.73,250.45-.39C823.78,31,906.67,72,985.66,92.83c70.05,18.48,146.53,26.09,214.34,3V120H0V0C0,0,0,32,0,48C0,67.52,22.75,74.55,48.51,77.32,108.71,84.43,187.93,67.08,252,49.9,293.09,39.24,280.88,55.59,321.39,56.44Z" className="fill-white"></path>
        </svg>
      </div>
    </div>
  );
};

export default Hero; 