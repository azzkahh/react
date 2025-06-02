import React from 'react';
import { motion } from 'framer-motion';
import { FaBookReader, FaHandsHelping, FaMoneyBillWave } from 'react-icons/fa';

const ProgramInfo = () => {
  return (
    <section id="program-info" className="py-16 bg-white">
      <div className="container mx-auto px-4">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          viewport={{ once: true }}
          className="max-w-4xl mx-auto"
        >
          <h2 className="text-3xl md:text-4xl font-bold text-center text-primary mb-12">Ikhtiar Kegiatan Kami</h2>
          
          <div className="space-y-12">
            <div className="flex flex-col md:flex-row gap-6 items-start">
              <div className="flex-shrink-0 p-4 bg-green-50 rounded-full">
                <FaBookReader className="text-4xl text-[#00A651]" />
              </div>
              <div>
                <h3 className="text-2xl font-semibold text-gray-800 mb-3">Bidang Pendidikan</h3>
                <p className="text-gray-700 leading-relaxed mb-4">
                  Kami bergerak di bidang pendidikan dalam bentuk Pondok Tahfidz Sunan Drajat, Parenting & Majelis Ta'lim. 
                  Melalui program ini, kami berkomitmen untuk membangun generasi yang berilmu, berakhlak mulia, dan hafal Al-Qur'an.
                </p>
                <img 
                  src="/program-pendidikan.jpg" 
                  alt="Program Pendidikan" 
                  className="w-full h-64 object-cover rounded-lg shadow-md"
                  onError={(e) => {
                    e.target.onerror = null; 
                    e.target.src = "https://placehold.co/800x400?text=Program+Pendidikan";
                  }}
                />
              </div>
            </div>
            
            <div className="flex flex-col md:flex-row gap-6 items-start">
              <div className="flex-shrink-0 p-4 bg-blue-50 rounded-full">
                <FaHandsHelping className="text-4xl text-[#00A651]" />
              </div>
              <div>
                <h3 className="text-2xl font-semibold text-gray-800 mb-3">Bidang Sosial & Kemasyarakatan</h3>
                <p className="text-gray-700 leading-relaxed mb-4">
                  Kami aktif dalam bidang sosial & kemasyarakatan, dalam bentuk bakti sosial dan pelayanan bantuan bagi masyarakat sekitar. 
                  Program ini bertujuan untuk membantu meringankan beban saudara-saudara kita yang membutuhkan.
                </p>
                <img 
                  src="/program-sosial.jpg" 
                  alt="Program Sosial" 
                  className="w-full h-64 object-cover rounded-lg shadow-md"
                  onError={(e) => {
                    e.target.onerror = null; 
                    e.target.src = "https://placehold.co/800x400?text=Program+Sosial";
                  }}
                />
              </div>
            </div>
            
            <div className="flex flex-col md:flex-row gap-6 items-start">
              <div className="flex-shrink-0 p-4 bg-amber-50 rounded-full">
                <FaMoneyBillWave className="text-4xl text-[#00A651]" />
              </div>
              <div>
                <h3 className="text-2xl font-semibold text-gray-800 mb-3">Bidang Muamalah</h3>
                <p className="text-gray-700 leading-relaxed mb-4">
                  Kami memprakarsai bidang-bidang usaha dan keahlian yang mampu menjadi bekal dalam beribadah. 
                  Melalui program ini, kami berupaya mengembangkan kemandirian ekonomi dan keterampilan yang bermanfaat bagi masyarakat.
                </p>
                <img 
                  src="/program-muamalah.jpg" 
                  alt="Program Muamalah" 
                  className="w-full h-64 object-cover rounded-lg shadow-md"
                  onError={(e) => {
                    e.target.onerror = null; 
                    e.target.src = "https://placehold.co/800x400?text=Program+Muamalah";
                  }}
                />
              </div>
            </div>
          </div>
        </motion.div>
      </div>
    </section>
  );
};

export default ProgramInfo; 