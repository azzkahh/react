import React from 'react';
import { motion } from 'framer-motion';
import { FaHandHoldingHeart } from 'react-icons/fa';
import DonorList from '../components/DonorList';

const DonorListPage = () => {
  return (
    <div className="min-h-screen flex flex-col">
      <main className="flex-grow">
        {/* Hero section with thank you message */}
        <div className="bg-gradient-to-b from-primary/80 to-primary py-20">
          <div className="container mx-auto px-4">
            <motion.div
              initial={{ opacity: 0, y: -20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8 }}
              className="max-w-4xl mx-auto text-center"
            >
              <div className="flex justify-center mb-6">
                <div className="h-16 w-16 rounded-full bg-white/20 flex items-center justify-center">
                  <FaHandHoldingHeart className="h-8 w-8 text-white" />
                </div>
              </div>
              
              <div className="bg-white backdrop-blur-sm rounded-xl p-6 md:p-8 shadow-lg">
                <p className="text-center text-lg md:text-xl text-black leading-relaxed">
                  Kami mengucapkan terima kasih kepada para donatur yang telah mendukung program-program kami.
                  Dukungan Anda sangat berarti bagi keberlanjutan program dan dampak yang kami berikan.
                </p>
              </div>
            </motion.div>
          </div>
        </div>
        
        {/* Donor list section */}
        <DonorList />
      </main>
    </div>
  );
};

export default DonorListPage; 