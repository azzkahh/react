import { useState, useRef } from 'react';
import { motion, useInView } from 'framer-motion';
import { FaSeedling, FaGraduationCap, FaHome, FaRecycle, FaChevronRight } from 'react-icons/fa';

const programs = [
  {
    id: 1,
    title: "Pertanian Organik",
    description: "Program pertanian organik kami membantu petani lokal mengadopsi metode berkelanjutan untuk meningkatkan hasil panen sambil melindungi lingkungan.",
    icon: FaSeedling,
    image: "/program-farming.jpg",
    placeholder: "https://placehold.co/600x400?text=Pertanian+Organik",
    benefits: [
      "Pelatihan metode pertanian organik",
      "Distribusi bibit unggul",
      "Pendampingan berkelanjutan",
      "Akses ke pasar organik"
    ]
  },
  {
    id: 2,
    title: "Pendidikan Lingkungan",
    description: "Kami menyelenggarakan program pendidikan lingkungan untuk meningkatkan kesadaran tentang pentingnya menjaga keberlanjutan ekosistem.",
    icon: FaGraduationCap,
    image: "/program-education.jpg",
    placeholder: "https://placehold.co/600x400?text=Pendidikan+Lingkungan",
    benefits: [
      "Workshop lingkungan untuk anak-anak",
      "Pelatihan pengelolaan sampah",
      "Program kebun sekolah",
      "Kunjungan lapangan dan praktik langsung"
    ]
  },
  {
    id: 3,
    title: "Rumah Berkelanjutan",
    description: "Kami merancang dan membangun rumah yang ramah lingkungan dengan menggunakan material lokal dan teknologi hemat energi.",
    icon: FaHome,
    image: "/program-housing.jpg",
    placeholder: "https://placehold.co/600x400?text=Rumah+Berkelanjutan",
    benefits: [
      "Desain rumah hemat energi",
      "Penggunaan material lokal dan ramah lingkungan",
      "Sistem pengolahan air dan limbah mandiri",
      "Integrasi dengan kebun produktif"
    ]
  },
  {
    id: 4,
    title: "Daur Ulang Kreatif",
    description: "Program daur ulang kreatif kami mengubah sampah menjadi produk bernilai ekonomi sambil mengurangi dampak lingkungan.",
    icon: FaRecycle,
    image: "/program-recycle.jpg",
    placeholder: "https://placehold.co/600x400?text=Daur+Ulang+Kreatif",
    benefits: [
      "Pelatihan keterampilan daur ulang",
      "Produksi kerajinan dari bahan daur ulang",
      "Pemasaran produk daur ulang",
      "Sistem pengelolaan sampah komunal"
    ]
  }
];

const ProgramsSection = () => {
  const [activeProgram, setActiveProgram] = useState(programs[0]);
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: "-100px" });

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.1
      }
    }
  };

  const itemVariants = {
    hidden: { y: 20, opacity: 0 },
    visible: {
      y: 0,
      opacity: 1,
      transition: { duration: 0.5 }
    }
  };

  return (
    <section id="programs" className="py-24 bg-gradient-to-b from-white to-accent/10">
      <div className="container mx-auto px-4">
        <div className="max-w-3xl mx-auto text-center mb-16">
          <h2 className="text-3xl md:text-4xl font-bold text-primary mb-6">Program Kami</h2>
          <p className="text-lg text-gray-700 leading-relaxed">
            Yayasan Karya Muda Bunian Drajat mengembangkan berbagai program untuk 
            menciptakan lingkungan yang berkelanjutan dan memberdayakan masyarakat lokal.
          </p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-10">
          {/* Program Tabs */}
          <div className="lg:col-span-1">
            <motion.div 
              ref={ref}
              variants={containerVariants}
              initial="hidden"
              animate={isInView ? "visible" : "hidden"}
              className="bg-white p-6 rounded-xl shadow-lg"
            >
              <h3 className="text-xl font-bold text-primary mb-6">Pilih Program</h3>
              <div className="space-y-3">
                {programs.map((program) => (
                  <motion.button
                    key={program.id}
                    variants={itemVariants}
                    onClick={() => setActiveProgram(program)}
                    className={`w-full text-left px-4 py-3 rounded-lg flex items-center transition-colors ${
                      activeProgram.id === program.id
                        ? 'bg-primary text-white'
                        : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
                    }`}
                  >
                    <program.icon className="mr-3 text-xl" />
                    <span className="font-medium">{program.title}</span>
                    {activeProgram.id === program.id && (
                      <FaChevronRight className="ml-auto" />
                    )}
                  </motion.button>
                ))}
              </div>
            </motion.div>
          </div>

          {/* Program Details */}
          <div className="lg:col-span-2">
            <motion.div 
              key={activeProgram.id}
              initial={{ opacity: 0, x: 20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.5 }}
              className="bg-white p-6 rounded-xl shadow-lg"
            >
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div>
                  <div className="flex items-center mb-4">
                    <activeProgram.icon className="text-3xl text-primary mr-3" />
                    <h3 className="text-2xl font-bold text-primary">{activeProgram.title}</h3>
                  </div>
                  <p className="text-gray-700 mb-6">{activeProgram.description}</p>
                  
                  <h4 className="font-bold text-secondary mb-3">Manfaat Program:</h4>
                  <ul className="space-y-2 mb-6">
                    {activeProgram.benefits.map((benefit, index) => (
                      <li key={index} className="flex items-start">
                        <span className="flex-shrink-0 h-5 w-5 bg-primary/20 text-primary rounded-full flex items-center justify-center mr-3 mt-1">
                          <FaChevronRight className="h-2 w-2" />
                        </span>
                        <span className="text-gray-700">{benefit}</span>
                      </li>
                    ))}
                  </ul>
                  
                  <a href="#donate" className="btn btn-primary">
                    Dukung Program Ini
                  </a>
                </div>
                
                <div className="relative">
                  <div className="relative z-10 overflow-hidden rounded-lg shadow-lg h-full">
                    <img 
                      src={activeProgram.image} 
                      alt={activeProgram.title} 
                      className="w-full h-full object-cover"
                      onError={(e) => {
                        e.target.onerror = null; 
                        e.target.src = activeProgram.placeholder;
                      }}
                    />
                  </div>
                  <div className="absolute -top-4 -right-4 w-24 h-24 bg-primary/10 rounded-full -z-10"></div>
                </div>
              </div>
            </motion.div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default ProgramsSection; 