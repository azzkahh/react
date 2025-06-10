import React from 'react';
import DonorList from '../components/DonorList';
import Navbar from '../components/Navbar';

const DonorListPage = () => {
  return (
    <div className="min-h-screen flex flex-col">
      <main className="flex-grow">
        <div className="bg-primary py-16">
          <div className="container mx-auto px-4">
            <p className="mt-4 text-center max-w-3xl mx-auto text-lg text-black">
              Kami mengucapkan terima kasih kepada para donatur yang telah mendukung program-program kami.
              Dukungan Anda sangat berarti bagi keberlanjutan program dan dampak yang kami berikan.
            </p>
          </div>
        </div>
        <DonorList />
      </main>
    </div>
  );
};

export default DonorListPage; 