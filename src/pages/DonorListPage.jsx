import React from 'react';
import DonorList from '../components/DonorList';
import Navbar from '../components/Navbar';
import Footer from '../components/Footer';

const DonorListPage = () => {
  return (
    <div className="min-h-screen flex flex-col">
      <Navbar />
      <main className="flex-grow">
        <div className="bg-primary text-white py-16">
          <div className="container mx-auto px-4">
            <h1 className="text-3xl md:text-5xl font-bold text-center">Daftar Donatur</h1>
            <p className="mt-4 text-center max-w-3xl mx-auto text-lg">
              Kami mengucapkan terima kasih kepada para donatur yang telah mendukung program-program kami.
              Dukungan Anda sangat berarti bagi keberlanjutan program dan dampak yang kami berikan.
            </p>
          </div>
        </div>
        <DonorList />
      </main>
      <Footer />
    </div>
  );
};

export default DonorListPage; 