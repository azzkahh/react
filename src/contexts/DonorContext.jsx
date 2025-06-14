import React, { createContext, useState, useContext, useEffect } from 'react';

// Create the context
const DonorContext = createContext();

// Initial donor data with the donation programs
const initialDonorData = [
  {
    id: 1,
    name: "Sedekah Subuh",
    donors: [
      { id: 1, name: "Ahmad Fauzi", location: "Jakarta" },
      { id: 2, name: "Siti Aminah", location: "Surabaya" },
      { id: 3, name: "Budi Santoso", location: "Bandung" },
    ]
  },
  {
    id: 2,
    name: "Beras Untuk Santri",
    donors: [
      { id: 4, name: "Hasan Mahmud", location: "Yogyakarta" },
      { id: 5, name: "Aisyah Putri", location: "Solo" },
      { id: 6, name: "Ridwan Kamil", location: "Bogor" },
    ]
  },
  {
    id: 3,
    name: "Transport Ustadz",
    donors: [
      { id: 7, name: "Nur Hidayah", location: "Malang" },
      { id: 8, name: "Faisal Rahman", location: "Semarang" },
      { id: 9, name: "Dewi Safitri", location: "Makassar" },
    ]
  },
  {
    id: 4,
    name: "Wakaf Qur'an Terjemah",
    donors: [
      { id: 10, name: "Anwar Ibrahim", location: "Padang" },
      { id: 11, name: "Fatimah Zahra", location: "Medan" },
      { id: 12, name: "Rudi Hartono", location: "Palembang" },
    ]
  },
  {
    id: 5,
    name: "Orang Tua Asuh",
    donors: [
      { id: 13, name: "Slamet Riyadi", location: "Tangerang" },
      { id: 14, name: "Nurul Huda", location: "Bekasi" },
      { id: 15, name: "Agus Setiawan", location: "Depok" },
    ]
  }
];

// Create the provider component
export const DonorProvider = ({ children }) => {
  // State to store donor data
  const [donorData, setDonorData] = useState(() => {
    // Check if data exists in localStorage
    const savedData = localStorage.getItem('donorData');
    return savedData ? JSON.parse(savedData) : initialDonorData;
  });

  // Save to localStorage whenever donorData changes
  useEffect(() => {
    localStorage.setItem('donorData', JSON.stringify(donorData));
  }, [donorData]);

  // Function to add a new donor
  const addDonor = (programId, donorName, donorLocation) => {
    setDonorData(prevData => {
      // Find the program by ID
      const programIndex = prevData.findIndex(program => program.id === programId);
      
      if (programIndex === -1) return prevData; // Program not found
      
      // Create a copy of the donor data
      const newData = [...prevData];
      
      // Generate a new donor ID (max ID + 1)
      const maxId = Math.max(...prevData.flatMap(p => p.donors.map(d => d.id)), 0);
      const newDonorId = maxId + 1;
      
      // Add the new donor to the program
      newData[programIndex] = {
        ...newData[programIndex],
        donors: [
          ...newData[programIndex].donors,
          { id: newDonorId, name: donorName, location: donorLocation }
        ]
      };
      
      return newData;
    });
  };

  // Value to be provided by the context
  const value = {
    donorData,
    addDonor
  };

  return (
    <DonorContext.Provider value={value}>
      {children}
    </DonorContext.Provider>
  );
};

// Custom hook to use the donor context
export const useDonor = () => {
  const context = useContext(DonorContext);
  if (!context) {
    throw new Error('useDonor must be used within a DonorProvider');
  }
  return context;
};

export default DonorContext; 