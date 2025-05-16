import { useRef } from 'react';
import { motion, useInView } from 'framer-motion';
import { FaAward, FaUsers, FaTree } from 'react-icons/fa';

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
        <div className="max-w-3xl mx-auto text-center mb-16">
          <h2 className="text-3xl md:text-4xl font-bold text-primary mb-6">Tentang Yayasan Kami</h2>
          <p className="text-lg text-gray-700 leading-relaxed">
            Yayasan Karya Muda Bunian Drajat didirikan dengan visi untuk membangun lingkungan
            yang berkelanjutan, memberdayakan komunitas, dan melestarikan kearifan lokal melalui
            pendekatan inovatif dan ramah lingkungan.
          </p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-10 items-center">
          <div className="relative">
            <div className="relative z-10 overflow-hidden rounded-lg shadow-xl">
              <img 
                src="/about-image.jpg" 
                alt="Kegiatan Yayasan" 
                className="w-full h-auto" 
                onError={(e) => {
                  e.target.onerror = null; 
                  e.target.src = "https://placehold.co/600x400?text=Kegiatan+Yayasan";
                }}
              />
            </div>
            <div className="absolute -top-6 -left-6 w-36 h-36 bg-primary/10 rounded-full -z-10"></div>
            <div className="absolute -bottom-6 -right-6 w-28 h-28 bg-secondary/10 rounded-full -z-10"></div>
          </div>

          <motion.div 
            ref={ref}
            variants={containerVariants}
            initial="hidden"
            animate={isInView ? "visible" : "hidden"}
            className="space-y-6"
          >
            <motion.div variants={itemVariants}>
              <h3 className="text-2xl md:text-3xl font-bold text-primary mb-4">Misi Kami</h3>
              <p className="text-gray-700 mb-4">
                Memberikan solusi berkelanjutan untuk permasalahan lingkungan dan sosial 
                dengan menggabungkan kearifan tradisional dan teknologi modern.
              </p>
            </motion.div>

            <motion.div variants={itemVariants}>
              <h3 className="text-2xl font-bold text-primary mb-4">Apa Yang Kami Lakukan</h3>
              <ul className="space-y-4">
                <li className="flex items-start">
                  <span className="flex-shrink-0 h-6 w-6 bg-primary/20 text-primary rounded-full flex items-center justify-center mr-3 mt-1">
                    <FaTree className="h-3 w-3" />
                  </span>
                  <p className="text-gray-700">Mengembangkan pertanian organik dan mandiri pangan untuk komunitas lokal</p>
                </li>
                <li className="flex items-start">
                  <span className="flex-shrink-0 h-6 w-6 bg-primary/20 text-primary rounded-full flex items-center justify-center mr-3 mt-1">
                    <FaUsers className="h-3 w-3" />
                  </span>
                  <p className="text-gray-700">Memberdayakan masyarakat melalui pelatihan keterampilan dan kewirausahaan</p>
                </li>
                <li className="flex items-start">
                  <span className="flex-shrink-0 h-6 w-6 bg-primary/20 text-primary rounded-full flex items-center justify-center mr-3 mt-1">
                    <FaAward className="h-3 w-3" />
                  </span>
                  <p className="text-gray-700">Mengembangkan model rumah dan bangunan berkelanjutan dengan material lokal</p>
                </li>
              </ul>
            </motion.div>

            <motion.div variants={itemVariants}>
              <a href="#programs" className="btn btn-primary">
                Lihat Program Kami
              </a>
            </motion.div>
          </motion.div>
        </div>

        {/* Stats Section */}
        <div className="mt-24 grid grid-cols-1 md:grid-cols-3 gap-8">
          <motion.div 
            whileHover={{ y: -10 }}
            className="bg-accent/20 p-8 rounded-lg text-center shadow"
          >
            <h3 className="text-5xl font-bold text-primary mb-2">5+</h3>
            <p className="text-lg text-gray-700">Tahun Pengalaman</p>
          </motion.div>
          
          <motion.div 
            whileHover={{ y: -10 }}
            className="bg-accent/20 p-8 rounded-lg text-center shadow"
          >
            <h3 className="text-5xl font-bold text-primary mb-2">15+</h3>
            <p className="text-lg text-gray-700">Program Sukses</p>
          </motion.div>
          
          <motion.div 
            whileHover={{ y: -10 }}
            className="bg-accent/20 p-8 rounded-lg text-center shadow"
          >
            <h3 className="text-5xl font-bold text-primary mb-2">500+</h3>
            <p className="text-lg text-gray-700">Masyarakat Terdampak</p>
          </motion.div>
        </div>
      </div>
    </section>
  );
};

export default AboutSection; 