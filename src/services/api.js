// API service using native Fetch API instead of axios
const API_URL = 'http://localhost:3000/api'; // Sesuaikan dengan URL API backend Anda

// Dummy data untuk development
const dummyData = {
  programDonasi: [
    {
      id: 1,
      name: 'SEDEKAH SUBUH',
      image: '/yayasan-karya-muda.jpg',
      description: 'Rasullulah SAW bersabda "Sedekah di pagi hari akan menjauhkan kita dari bencana" (HR Ahmad)',
      collectedAmount: 'Rp 5.263.600',
      target: 'Rp 10.000.000',
      deadline: '30 September 2025',
      details: 'Yayasan memfasilitasi distribusi sedekah subuh kepada mustahik secara tercatat & tepat sasaran, adapun besarannya tidaklah ditentukan.'
    },
    {
      id: 2,
      name: 'BERAS UNTUK SANTRI',
      image: '/yayasan-karya-muda.jpg',
      description: 'Memuliakan santri Tahfidz dengan menjaganya agar tetap dalam kondisi terbaik.',
      collectedAmount: 'Rp 330.000',
      target: 'Rp 1.000.000',
      deadline: '30 Juni 2025',
      details: 'Memuliakan santri Tahfidz dengan menjaganya agar tetap dalam kondisi terbaik dengan memberikan kecukupan makanan nya. Adapun besarannya adalah 10.000 / Liter'
    }
  ],
  metodePembayaran: [
    { 
      id: 'midtrans', 
      name: 'Midtrans', 
      image: '/yayasan-karya-muda.jpg',
      description: 'Pembayaran melalui berbagai metode (QRIS, VA, E-wallet, dll)'
    },
    { 
      id: 'xendit', 
      name: 'Xendit', 
      image: '/yayasan-karya-muda.jpg',
      description: 'Pembayaran cepat melalui berbagai channel pembayaran'
    }
  ],
  santri: [
    {
      id: 1,
      name: 'Ahmad',
      age: 10,
      grade: 4,
      story: 'Ahmad berasal dari keluarga kurang mampu di daerah terpencil. Ia memiliki semangat belajar yang tinggi dan bercita-cita menjadi guru.',
      quranMemorization: '5 Juz',
      videoUrl: 'https://www.youtube.com/embed/dQw4w9WgXcQ'
    },
    {
      id: 2,
      name: 'Fatimah',
      age: 12,
      grade: 6,
      story: 'Fatimah adalah anak yatim yang memiliki prestasi akademik yang baik. Ia ingin melanjutkan pendidikan untuk menjadi dokter di masa depan.',
      quranMemorization: '3 Juz',
      videoUrl: 'https://www.youtube.com/embed/dQw4w9WgXcQ'
    }
  ]
};

// Helper function for making API requests
const apiRequest = async (url, options = {}) => {
  try {
    // Check if we're in development mode
    const isDevelopment = process.env.NODE_ENV === 'development' || 
                         window.location.hostname === 'localhost' || 
                         window.location.hostname === '127.0.0.1';
    
    if (isDevelopment) {
      console.log('Development mode: Using dummy data for', url);
      // Simulate API delay
      await new Promise(resolve => setTimeout(resolve, 300));
      
      // Return dummy data based on URL
      if (url.includes('/program-donasi')) {
        const id = url.split('/').pop();
        if (id && !isNaN(parseInt(id))) {
          const program = dummyData.programDonasi.find(p => p.id === parseInt(id));
          if (program) return program;
          throw new Error('Program tidak ditemukan');
        }
        return dummyData.programDonasi;
      }
      
      if (url.includes('/metode-pembayaran')) {
        return dummyData.metodePembayaran;
      }
      
      if (url.includes('/donasi')) {
        // Simulate successful donation creation
        if (options.method === 'POST') {
          const donationData = JSON.parse(options.body);
          console.log('Creating dummy donation with data:', donationData);
          
          // Generate dummy transaction ID
          const transactionId = 'DUMMY-' + Date.now();
          
          // Create dummy donation record
          const dummyDonation = {
            id: transactionId,
            ...donationData,
            status: 'pending',
            created_at: new Date().toISOString()
          };
          
          // Store in localStorage for persistence in development
          const existingDonations = JSON.parse(localStorage.getItem('dummy_donations') || '[]');
          existingDonations.push(dummyDonation);
          localStorage.setItem('dummy_donations', JSON.stringify(existingDonations));
          
          // Return success response with dummy token for Midtrans
          return {
            success: true,
            message: 'Donasi berhasil dibuat',
            data: dummyDonation,
            transaction_id: transactionId,
            // Dummy token for Midtrans integration testing
            token: 'DUMMY-SNAP-TOKEN-' + transactionId
          };
        }
        
        // Handle GET requests for donations
        if (options.method === 'GET' || !options.method) {
          const donations = JSON.parse(localStorage.getItem('dummy_donations') || '[]');
          
          // Check if requesting a specific donation
          const id = url.split('/').pop();
          if (id && !isNaN(parseInt(id))) {
            const donation = donations.find(d => d.id === parseInt(id));
            if (donation) return donation;
            throw new Error('Donasi tidak ditemukan');
          }
          
          return donations;
        }
        
        return [];
      }
      
      if (url.includes('/santri')) {
        const id = url.split('/').pop();
        if (id && !isNaN(parseInt(id))) {
          const santri = dummyData.santri.find(s => s.id === parseInt(id));
          if (santri) return santri;
          throw new Error('Santri tidak ditemukan');
        }
        return dummyData.santri;
      }
      
      // Default dummy response
      return { message: 'Dummy data tidak tersedia untuk endpoint ini' };
    }
    
    // Real API call for production
    const response = await fetch(url, {
      headers: {
        'Content-Type': 'application/json',
        ...options.headers
      },
      ...options
    });

    if (!response.ok) {
      const error = await response.json().catch(() => ({
        message: response.statusText
      }));
      throw new Error(error.message || 'Terjadi kesalahan pada server');
    }

    return response.json();
  } catch (error) {
    console.error('API request error:', error);
    throw error;
  }
};

// API untuk program donasi
export const programDonasiAPI = {
  getAll: () => apiRequest(`${API_URL}/program-donasi`),
  getById: (id) => apiRequest(`${API_URL}/program-donasi/${id}`),
  create: (data) => apiRequest(`${API_URL}/program-donasi`, {
    method: 'POST',
    body: JSON.stringify(data)
  }),
  update: (id, data) => apiRequest(`${API_URL}/program-donasi/${id}`, {
    method: 'PUT',
    body: JSON.stringify(data)
  }),
  delete: (id) => apiRequest(`${API_URL}/program-donasi/${id}`, {
    method: 'DELETE'
  }),
};

// API untuk donasi
export const donasiAPI = {
  getAll: () => apiRequest(`${API_URL}/donasi`),
  getById: (id) => apiRequest(`${API_URL}/donasi/${id}`),
  create: (data) => apiRequest(`${API_URL}/donasi`, {
    method: 'POST',
    body: JSON.stringify(data)
  }),
  update: (id, data) => apiRequest(`${API_URL}/donasi/${id}`, {
    method: 'PUT',
    body: JSON.stringify(data)
  }),
  delete: (id) => apiRequest(`${API_URL}/donasi/${id}`, {
    method: 'DELETE'
  }),
  getByProgramId: (programId) => apiRequest(`${API_URL}/donasi/program/${programId}`),
};

// API untuk donatur
export const donaturAPI = {
  getAll: () => apiRequest(`${API_URL}/donatur`),
  getById: (id) => apiRequest(`${API_URL}/donatur/${id}`),
  create: (data) => apiRequest(`${API_URL}/donatur`, {
    method: 'POST',
    body: JSON.stringify(data)
  }),
  update: (id, data) => apiRequest(`${API_URL}/donatur/${id}`, {
    method: 'PUT',
    body: JSON.stringify(data)
  }),
  delete: (id) => apiRequest(`${API_URL}/donatur/${id}`, {
    method: 'DELETE'
  }),
};

// API untuk metode pembayaran
export const metodePembayaranAPI = {
  getAll: () => apiRequest(`${API_URL}/metode-pembayaran`),
  getById: (id) => apiRequest(`${API_URL}/metode-pembayaran/${id}`),
  create: (data) => apiRequest(`${API_URL}/metode-pembayaran`, {
    method: 'POST',
    body: JSON.stringify(data)
  }),
  update: (id, data) => apiRequest(`${API_URL}/metode-pembayaran/${id}`, {
    method: 'PUT',
    body: JSON.stringify(data)
  }),
  delete: (id) => apiRequest(`${API_URL}/metode-pembayaran/${id}`, {
    method: 'DELETE'
  }),
};

// API untuk santri
export const santriAPI = {
  getAll: () => apiRequest(`${API_URL}/santri`),
  getById: (id) => apiRequest(`${API_URL}/santri/${id}`),
  create: (data) => apiRequest(`${API_URL}/santri`, {
    method: 'POST',
    body: JSON.stringify(data)
  }),
  update: (id, data) => apiRequest(`${API_URL}/santri/${id}`, {
    method: 'PUT',
    body: JSON.stringify(data)
  }),
  delete: (id) => apiRequest(`${API_URL}/santri/${id}`, {
    method: 'DELETE'
  }),
};

export default {
  programDonasiAPI,
  donasiAPI,
  donaturAPI,
  metodePembayaranAPI,
  santriAPI
}; 