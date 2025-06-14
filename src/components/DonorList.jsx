import React from 'react';
import { motion } from 'framer-motion';
import { useDonor } from '../contexts/DonorContext';

const DonorList = () => {
  // Use the donor context to get the donor data
  const { donorData } = useDonor();

  return (
    <section id="donor-list" className="py-16 bg-gray-50">
      <div className="container mx-auto px-4">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          viewport={{ once: true }}
          className="max-w-5xl mx-auto"
        >
          <div className="space-y-12">
            {donorData.map((program) => (
              <div key={program.id} className="bg-white rounded-lg shadow-md overflow-hidden">
                <h3 className="text-xl font-bold text-primary bg-gray-50 p-4 border-b">
                  {program.name}
                </h3>
                <div className="p-4">
                  {program.donors.length > 0 ? (
                    program.donors.map((donor) => (
                      <div key={donor.id} className="py-2 border-b border-gray-100 last:border-0">
                        <div className="flex flex-col">
                          <span className="font-medium text-gray-800">{donor.name}</span>
                          <span className="text-gray-600">{donor.location}</span>
                        </div>
                      </div>
                    ))
                  ) : (
                    <p className="text-gray-500 italic">Belum ada donatur untuk program ini</p>
                  )}
                </div>
              </div>
            ))}
          </div>
        </motion.div>
      </div>
    </section>
  );
};

export default DonorList; 