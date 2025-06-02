import React from 'react';
import { motion } from 'framer-motion';

const DonorList = () => {
  // Sample data - replace with actual data from your API/database
  const programDonors = [
    {
      id: 1,
      name: "Pertanian Organik",
      donors: [
        { id: 1, name: "Nama Donatur", location: "Asal Kota" },
        { id: 2, name: "Nama Donatur", location: "Asal Kota" },
        { id: 3, name: "Nama Donatur", location: "Asal Kota" },
      ]
    },
    {
      id: 2,
      name: "Pendidikan Lingkungan",
      donors: [
        { id: 4, name: "Nama Donatur", location: "Asal Kota" },
        { id: 5, name: "Nama Donatur", location: "Asal Kota" },
        { id: 6, name: "Nama Donatur", location: "Asal Kota" },
      ]
    },
    {
      id: 3,
      name: "Rumah Berkelanjutan",
      donors: [
        { id: 7, name: "Nama Donatur", location: "Asal Kota" },
        { id: 8, name: "Nama Donatur", location: "Asal Kota" },
        { id: 9, name: "Nama Donatur", location: "Asal Kota" },
      ]
    }
  ];

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
            {programDonors.map((program) => (
              <div key={program.id} className="bg-white rounded-lg shadow-md overflow-hidden">
                <h3 className="text-xl font-bold text-primary bg-gray-50 p-4 border-b">
                  {program.name}
                </h3>
                <div className="p-4">
                  {program.donors.map((donor) => (
                    <div key={donor.id} className="py-2 border-b border-gray-100 last:border-0">
                      <div className="flex flex-col">
                        <span className="font-medium text-gray-800">{donor.name}</span>
                        <span className="text-gray-600">{donor.location}</span>
                      </div>
                    </div>
                  ))}
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