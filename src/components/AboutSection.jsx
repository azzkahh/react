import { useRef } from 'react';
import { motion, useInView } from 'framer-motion';
import { FaAward, FaUsers, FaTree, FaHandHoldingHeart } from 'react-icons/fa';
import { Link } from 'react-router-dom';

const AboutSection = () => {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: "-100px" });

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.2
      }
    }
  };

  const itemVariants = {
    hidden: { y: 20, opacity: 0 },
    visible: {
      y: 0,
      opacity: 1,
      transition: { duration: 0.6 }
    }
  };

  return (
    <section id="about" className="py-24 bg-white">
      <div className="container mx-auto px-4">
        <div className="max-w-3xl mx-auto">
          <motion.div 
            ref={ref}
            variants={containerVariants}
            initial="hidden"
            animate={isInView ? "visible" : "hidden"}
            className="space-y-6"
          >
            <motion.div variants={itemVariants}>
              <h3 className="text-2xl md:text-3xl font-bold text-primary mb-4">Dukung Program Kami</h3>
              <p className="text-gray-700 mb-4">
                Dukung kami dengan bersedekah untuk memuliakan para santri tahfidz duafa dan mendukung program dakwah dengan pilihan program sedekah sebagai berikut:
              </p>
              
              <ul className="space-y-4 mb-6">
                <li className="flex items-start">
                  <span className="flex-shrink-0 h-6 w-6 bg-primary/20 text-primary rounded-full flex items-center justify-center mr-3 mt-1">
                    <FaHandHoldingHeart className="h-3 w-3" />
                  </span>
                  <Link to="/program-orang-tua-asuh" className="text-gray-700 hover:text-primary">Orang Tua Asuh</Link>
                </li>
                <li className="flex items-start">
                  <span className="flex-shrink-0 h-6 w-6 bg-primary/20 text-primary rounded-full flex items-center justify-center mr-3 mt-1">
                    <FaHandHoldingHeart className="h-3 w-3" />
                  </span>
                  <Link to="/program-reguler" className="text-gray-700 hover:text-primary">Sedekah Subuh</Link>
                </li>
                <li className="flex items-start">
                  <span className="flex-shrink-0 h-6 w-6 bg-primary/20 text-primary rounded-full flex items-center justify-center mr-3 mt-1">
                    <FaHandHoldingHeart className="h-3 w-3" />
                  </span>
                  <Link to="/program-reguler" className="text-gray-700 hover:text-primary">Beras untuk Santri</Link>
                </li>
                <li className="flex items-start">
                  <span className="flex-shrink-0 h-6 w-6 bg-primary/20 text-primary rounded-full flex items-center justify-center mr-3 mt-1">
                    <FaHandHoldingHeart className="h-3 w-3" />
                  </span>
                  <Link to="/program-reguler" className="text-gray-700 hover:text-primary">Transport Ustadz</Link>
                </li>
                <li className="flex items-start">
                  <span className="flex-shrink-0 h-6 w-6 bg-primary/20 text-primary rounded-full flex items-center justify-center mr-3 mt-1">
                    <FaHandHoldingHeart className="h-3 w-3" />
                  </span>
                  <Link to="/program-reguler" className="text-gray-700 hover:text-primary">Wakaf Qur'an Terjemah</Link>
                </li>
              </ul>
              
              <p className="text-gray-700 italic text-sm mb-4">
                Insya Allah setiap program akan kami laporkan secara berkala baik dalam bentuk visualisasi kegiatan ataupun alokasi distribusi donasi.
              </p>
              
              <p className="text-gray-700 font-medium text-sm">
                "Semoga segala bentuk partisipasi dan dukungan dalam program ini Allah catat sebagai Amalan yang abadi, dan menjadi saksi di yaumil akhir Insya Allah, atas segala dukungan dan partisipasinya kami ucapkan Jazakallahu khairon katsiron."
              </p>
            </motion.div>

            <motion.div variants={itemVariants}>
              <Link to="/program-reguler" className="btn btn-primary">
                Dukung Sekarang
              </Link>
            </motion.div>
          </motion.div>
        </div>
      </div>
    </section>
  );
};

export default AboutSection; 