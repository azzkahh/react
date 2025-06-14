const express = require('express');
const cors = require('cors');
const mysql = require('mysql2');
const bodyParser = require('body-parser');
const midtransClient = require('midtrans-client');

const app = express();
const port = process.env.PORT || 3000;

// Middleware
app.use(cors());
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

// Midtrans configuration
const snap = new midtransClient.Snap({
  isProduction: false,
  serverKey: 'YOUR-SERVER-KEY',
  clientKey: 'YOUR-CLIENT-KEY'
});

// Database connection
const pool = mysql.createPool({
  host: 'localhost',
  user: 'root',
  password: '', // Sesuaikan dengan password MySQL Anda
  database: 'azzkahh',
  waitForConnections: true,
  connectionLimit: 10,
  queueLimit: 0
});

// Mock data untuk fallback jika database tidak tersedia
const mockData = {
  program_donasi: [
    {
      id: 1,
      name: 'SEDEKAH SUBUH',
      image: '/sedekah-subuh.png',
      description: 'Rasullulah SAW bersabda "Sedekah di pagi hari akan menjauhkan kita dari bencana" (HR Ahmad)',
      collectedAmount: 'Rp 5.263.600',
      target: 'Rp 10.000.000',
      deadline: '30 September 2025',
      details: 'Yayasan memfasilitasi distribusi sedekah subuh kepada mustahik secara tercatat & tepat sasaran, adapun besarannya tidaklah ditentukan.'
    },
    {
      id: 2,
      name: 'BERAS UNTUK SANTRI',
      image: '/beras-santri.png',
      description: 'Memuliakan santri Tahfidz dengan menjaganya agar tetap dalam kondisi terbaik.',
      collectedAmount: 'Rp 330.000',
      target: 'Rp 1.000.000',
      deadline: '30 Juni 2025',
      details: 'Memuliakan santri Tahfidz dengan menjaganya agar tetap dalam kondisi terbaik dengan memberikan kecukupan makanan nya. Adapun besarannya adalah 10.000 / Liter'
    },
    {
      id: 3,
      name: 'TRANSPORT USTADZ',
      image: '/transport-ustadz.png',
      description: 'Memuliakan Ustadz agar dapat hadir tanpa kendala transportasi.',
      collectedAmount: 'Rp 630.000',
      target: 'Rp 2.000.000',
      deadline: '30 Juni 2025',
      details: 'Memuliakan Ustadz adalah dengan menjaganya agar disetiap pertemuan mampu hadir tanpa kendala yang bersifat tekhnis yaitu transpotasi dalam bentuk bensin. Adapun besarannya adalah 10.000 / Liter'
    },
    {
      id: 4,
      name: 'WAKAF QURAN TERJEMAH',
      image: '/wakaf-quran.png',
      description: 'Quran Terjemah sebagai sarana belajar santri yang perlu diperbarui secara periodik.',
      collectedAmount: 'Rp 914.000',
      target: 'Rp 5.000.000',
      deadline: '31 Desember 2025',
      details: 'Quran Terjemaah adalah sarana yg digunakan oleh santri dalam kegiatan belajar dan harus di perbaharui secara periodik. Untuk hal ini kami persilahkan menyumbang dalam bentuk Kitab atau uang seharga satu buah kitab'
    }
  ],
  donatur: [],
  donasi: [],
  metode_pembayaran: [
    { id: 1, name: 'Midtrans', description: 'Pembayaran melalui berbagai metode (QRIS, VA, E-wallet, dll)' },
    { id: 2, name: 'Xendit', description: 'Pembayaran cepat melalui berbagai channel pembayaran' }
  ]
};

// Flag untuk menentukan apakah database tersedia
let isDatabaseConnected = false;

// Test database connection
pool.getConnection((err, connection) => {
  if (err) {
    console.error('Error connecting to database:', err);
    console.log('Running in fallback mode with mock data');
  } else {
    connection.query('SELECT 1', (err, results) => {
      connection.release();
      if (err) {
        console.error('Error executing query:', err);
      } else {
        console.log('Connected to MySQL database');
        isDatabaseConnected = true;
      }
    });
  }
});

// API Routes

// Program Donasi Routes
app.get('/api/program-donasi', async (req, res) => {
  try {
    if (isDatabaseConnected) {
      pool.query('SELECT * FROM program_donasi', (err, results) => {
        if (err) {
          console.error(err);
          res.json(mockData.program_donasi);
        } else {
          res.json(results);
        }
      });
    } else {
      res.json(mockData.program_donasi);
    }
  } catch (err) {
    console.error(err);
    res.json(mockData.program_donasi);
  }
});

app.get('/api/program-donasi/:id', (req, res) => {
  try {
    const { id } = req.params;
    
    if (isDatabaseConnected) {
      pool.query('SELECT * FROM program_donasi WHERE id = ?', [id], (err, results) => {
        if (err || results.length === 0) {
          const mockProgram = mockData.program_donasi.find(p => p.id === parseInt(id));
          if (mockProgram) {
            return res.json(mockProgram);
          }
          return res.status(404).json({ error: 'Program donasi tidak ditemukan' });
        }
        res.json(results[0]);
      });
    } else {
      const mockProgram = mockData.program_donasi.find(p => p.id === parseInt(id));
      if (mockProgram) {
        return res.json(mockProgram);
      }
      return res.status(404).json({ error: 'Program donasi tidak ditemukan' });
    }
  } catch (err) {
    console.error(err);
    const mockProgram = mockData.program_donasi.find(p => p.id === parseInt(req.params.id));
    if (mockProgram) {
      return res.json(mockProgram);
    }
    res.status(500).json({ error: 'Terjadi kesalahan saat mengambil data program donasi' });
  }
});

// Donasi Routes
app.get('/api/donasi', (req, res) => {
  try {
    if (isDatabaseConnected) {
      pool.query(`
        SELECT d.*, p.name as program_name, dt.name as donatur_name, mp.name as metode_pembayaran_name
        FROM donasi d
        LEFT JOIN program_donasi p ON d.id_program = p.id
        LEFT JOIN donatur dt ON d.id_donatur = dt.id
        LEFT JOIN metode_pembayaran mp ON d.metode_pembayaran = mp.id
      `, (err, results) => {
        if (err) {
          console.error(err);
          res.json(mockData.donasi);
        } else {
          res.json(results);
        }
      });
    } else {
      res.json(mockData.donasi);
    }
  } catch (err) {
    console.error(err);
    res.json(mockData.donasi);
  }
});

app.post('/api/donasi', (req, res) => {
  try {
    const { id_program, id_donatur, jumlah, metode_pembayaran, donatur } = req.body;
    
    if (!id_program || !jumlah || !metode_pembayaran) {
      return res.status(400).json({ error: 'Data tidak lengkap' });
    }
    
    if (isDatabaseConnected) {
      if (!id_donatur && donatur) {
        const { name, email, city, whatsapp } = donatur;
        pool.query(
          'INSERT INTO donatur (name, email, city, whatsapp) VALUES (?, ?, ?, ?)',
          [name, email, city, whatsapp],
          (err, result) => {
            if (err) {
              console.error(err);
              return res.status(500).json({ error: 'Terjadi kesalahan saat membuat donatur' });
            }
            
            const donaturId = result.insertId;
            insertDonasi(donaturId);
          }
        );
      } else {
        insertDonasi(id_donatur);
      }
      
      function insertDonasi(donaturId) {
        pool.query(
          'INSERT INTO donasi (id_program, id_donatur, jumlah, metode_pembayaran, created_at) VALUES (?, ?, ?, ?, NOW())',
          [id_program, donaturId, jumlah, metode_pembayaran],
          async (err, result) => {
            if (err) {
              console.error(err);
              return res.status(500).json({ error: 'Terjadi kesalahan saat membuat donasi' });
            }
            
            try {
              // Create Midtrans transaction
              const transactionDetails = {
                transaction_details: {
                  order_id: `DONASI-${result.insertId}-${Date.now()}`,
                  gross_amount: jumlah
                },
                customer_details: {
                  first_name: donatur.name,
                  email: donatur.email,
                  phone: donatur.whatsapp,
                  billing_address: {
                    city: donatur.city
                  }
                },
                item_details: [{
                  id: `PROGRAM-${id_program}`,
                  price: jumlah,
                  quantity: 1,
                  name: 'Donasi Program'
                }],
                callbacks: {
                  finish: 'http://localhost:5173/daftar-donatur'
                }
              };

              const midtransToken = await snap.createTransaction(transactionDetails);
              
              res.status(201).json({
                donation: { id: result.insertId, id_program, id_donatur: donaturId, jumlah, metode_pembayaran },
                payment: {
                  token: midtransToken.token,
                  redirect_url: midtransToken.redirect_url
                }
              });
            } catch (midtransErr) {
              console.error(midtransErr);
              res.status(500).json({ error: 'Terjadi kesalahan saat membuat transaksi pembayaran' });
            }
          }
        );
      }
    } else {
      // Fallback untuk mock data
      const newDonasi = {
        id: mockData.donasi.length + 1,
        id_program,
        id_donatur: id_donatur || (mockData.donatur.length + 1),
        jumlah,
        metode_pembayaran,
        created_at: new Date().toISOString()
      };
      
      // Jika donatur baru, tambahkan ke mock data
      if (!id_donatur && donatur) {
        const { name, email, city, whatsapp } = donatur;
        const newDonatur = {
          id: mockData.donatur.length + 1,
          name,
          email,
          city,
          whatsapp
        };
        mockData.donatur.push(newDonatur);
        newDonasi.id_donatur = newDonatur.id;
      }
      
      mockData.donasi.push(newDonasi);

      // Create mock Midtrans response
      const mockMidtransResponse = {
        token: 'mock-token-' + Date.now(),
        redirect_url: 'https://app.sandbox.midtrans.com/snap/v3/redirection/mock-token'
      };

      res.status(201).json({
        donation: newDonasi,
        payment: mockMidtransResponse
      });
    }
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: 'Terjadi kesalahan saat membuat donasi' });
  }
});

app.get('/api/donasi/program/:programId', async (req, res) => {
  try {
    const { programId } = req.params;
    
    if (isDatabaseConnected) {
      pool.query(`
        SELECT d.*, dt.name as donatur_name, mp.name as metode_pembayaran_name
        FROM donasi d
        LEFT JOIN donatur dt ON d.id_donatur = dt.id
        LEFT JOIN metode_pembayaran mp ON d.metode_pembayaran = mp.id
        WHERE d.id_program = ?
      `, [programId], (err, results) => {
        if (err) {
          console.error(err);
          res.status(500).json({ error: 'Terjadi kesalahan saat mengambil data donasi' });
        } else {
          res.json(results);
        }
      });
    } else {
      // Fallback to mock data
      const filteredDonasi = mockData.donasi.filter(d => d.id_program === parseInt(programId));
      res.json(filteredDonasi);
    }
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: 'Terjadi kesalahan saat mengambil data donasi' });
  }
});

// Donatur Routes
app.get('/api/donatur', async (req, res) => {
  try {
    if (isDatabaseConnected) {
      pool.query('SELECT * FROM donatur', (err, results) => {
        if (err) {
          console.error(err);
          res.json(mockData.donatur);
        } else {
          res.json(results);
        }
      });
    } else {
      res.json(mockData.donatur);
    }
  } catch (err) {
    console.error(err);
    res.json(mockData.donatur);
  }
});

// Metode Pembayaran Routes
app.get('/api/metode-pembayaran', async (req, res) => {
  try {
    if (isDatabaseConnected) {
      pool.query('SELECT * FROM metode_pembayaran', (err, results) => {
        if (err) {
          console.error(err);
          res.json(mockData.metode_pembayaran);
        } else {
          res.json(results);
        }
      });
    } else {
      res.json(mockData.metode_pembayaran);
    }
  } catch (err) {
    console.error(err);
    res.json(mockData.metode_pembayaran);
  }
});

// Start server
app.listen(port, () => {
  console.log(`Server berjalan di http://localhost:${port}`);
}); 