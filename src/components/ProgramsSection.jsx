import { useState, useRef } from 'react';
import { motion, useInView } from 'framer-motion';
import { FaBookOpen, FaSun, FaUtensils, FaCarSide, FaBook, FaChevronRight } from 'react-icons/fa';
import { Link } from 'react-router-dom';

const programs = [
  {
    id: 1,
    title: "Orang Tua Asuh",
    description: "Program pendampingan santri duafa program 3-6 tahun, dengan dukungan biaya selama berkegiatan di pondok.",
    icon: FaBookOpen,
    image: "/program-ota.jpg",
    placeholder: "https://placehold.co/600x400?text=Orang+Tua+Asuh",
    link: "/program-orang-tua-asuh"
  },
  {
    id: 2,
    title: "Sedekah Subuh",
    description: "Rasullulah SAW bersabda \"Sedekah di pagi hari akan menjauhkan kita dari bencana\" (HR Ahmad)",
    icon: FaSun,
    image: "/sedekah-subuh.png",
    placeholder: "https://placehold.co/600x400?text=Sedekah+Subuh",
    link: "/program-reguler"
  },
  {
    id: 3,
    title: "Beras untuk Santri",
    description: "Memuliakan santri Tahfidz dengan menjaganya agar tetap dalam kondisi terbaik dengan memberikan kecukupan makanan.",
    icon: FaUtensils,
    image: "/beras-santri.png",
    placeholder: "https://placehold.co/600x400?text=Beras+Santri",
    link: "/program-reguler"
  },
  {
    id: 4,
    title: "Transport Ustadz",
    description: "Memuliakan Ustadz agar disetiap pertemuan mampu hadir tanpa kendala yang bersifat tekhnis yaitu transpotasi.",
    icon: FaCarSide,
    image: "/transport-ustadz.png",
    placeholder: "https://placehold.co/600x400?text=Transport+Ustadz",
    link: "/program-reguler"
  },
  {
    id: 5,
    title: "Wakaf Qur'an Terjemah",
    description: "Quran Terjemah adalah sarana yang digunakan oleh santri dalam kegiatan belajar dan harus di perbaharui secara periodik.",
    icon: FaBook,
    image: "/wakaf-quran.png",
    placeholder: "https://placehold.co/600x400?text=Wakaf+Quran",
    link: "/program-reguler"
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
                  
                  <Link to={activeProgram.link} className="btn btn-primary">
                    Dukung Program Ini
                  </Link>
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