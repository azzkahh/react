import React from 'react';
import { useNavigate } from 'react-router-dom';
import { motion } from 'framer-motion';

const ProgramReguler = () => {
  const navigate = useNavigate();
  
  // Donation programs data
  const donationPrograms = [
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
  ];

  // Navigate to donation program detail page
  const navigateToDonationProgram = (programId) => {
    navigate(`/program-donasi/${programId}`);
  };

  return (
    <div className="min-h-screen bg-gray-50 pt-20">
      <div className="container mx-auto px-4 py-12">
        <motion.div 
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          className="max-w-6xl mx-auto"
        >
          <h1 className="text-3xl md:text-4xl font-bold text-primary mb-6">Program Reguler</h1>
          
          {/* Donation Program Cards */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
            {donationPrograms.map((program) => (
              <motion.div 
                key={program.id}
                whileHover={{ y: -5 }}
                className="bg-white rounded-lg shadow-md overflow-hidden cursor-pointer"
                onClick={() => navigateToDonationProgram(program.id)}
              >
                <div className="h-52 overflow-hidden">
                  <img 
                    src={program.image} 
                    alt={program.name}
                    className="w-full h-full object-cover"
                    onError={(e) => {
                      e.target.onerror = null;
                      e.target.src = `https://via.placeholder.com/400x250/e6f7ff/0066cc?text=${program.name}`;
                    }}
                  />
                </div>
                <div className="p-4">
                  <h3 className="font-semibold text-primary mb-1">{program.name}</h3>
                  <div className="text-gray-700 font-medium mb-2">Dana Terkumpul</div>
                  <div className="text-gray-900 font-bold mb-3">{program.collectedAmount}</div>
                  
                  <div className="mb-4">
                    <div className="w-full bg-gray-200 rounded-full h-2">
                      <div 
                        className="bg-primary h-2 rounded-full" 
                        style={{ width: `${Math.min(parseInt(program.collectedAmount.replace(/\D/g, '')) / parseInt(program.target.replace(/\D/g, '')) * 100, 100)}%` }}
                      ></div>
                    </div>
                  </div>
                  
                  <div className="text-sm text-gray-600">
                    Berakhir Pada<br />
                    {program.deadline}
                  </div>
                </div>
              </motion.div>
            ))}
          </div>

          <div className="bg-white rounded-lg shadow-md p-6 mb-8">
            <h2 className="text-2xl font-semibold text-gray-800 mb-4">Tentang Program Reguler</h2>
            <p className="text-gray-700 mb-6 leading-relaxed">
              Program Reguler Karya Muda Sunan Drajat dirancang untuk memberikan dukungan berkelanjutan kepada 
              santri dan ustadz kami. Melalui program ini, kami memfasilitasi berbagai bentuk sedekah dan wakaf 
              yang dapat dilakukan secara rutin untuk mendukung kegiatan pendidikan dan kesejahteraan santri dan ustadz.
            </p>
            
            <h3 className="text-xl font-semibold text-gray-800 mb-3">Fitur Program</h3>
            <ul className="list-disc pl-6 mb-6 text-gray-700 space-y-2">
              <li>Sedekah Subuh - distribusi sedekah pagi hari kepada mustahik</li>
              <li>Beras untuk Santri - membantu kecukupan makanan santri (Rp 10.000/liter)</li>
              <li>Transport Ustadz - membantu biaya transportasi ustadz (Rp 10.000/liter)</li>
              <li>Wakaf Quran Terjemah - menyediakan sarana belajar yang diperbarui secara periodik</li>
            </ul>

            <h3 className="text-xl font-semibold text-gray-800 mb-3">Jadwal Kegiatan Reguler (Senin - Sabtu)</h3>
            <div className="overflow-x-auto mb-6">
              <table className="min-w-full bg-white border border-gray-200">
                <thead>
                  <tr className="bg-gray-100">
                    <th colSpan="2" className="py-2 px-3 border-b text-center">JAM</th>
                    <th rowSpan="2" className="py-2 px-3 border-b text-center">JADWAL KEGIATAN</th>
                  </tr>
                  <tr className="bg-gray-100">
                    <th className="py-2 px-3 border-b text-center">Mulai</th>
                    <th className="py-2 px-3 border-b text-center">Selesai</th>
                  </tr>
                </thead>
                <tbody>
                  <tr>
                    <td className="py-2 px-3 border-b text-center">03.00</td>
                    <td className="py-2 px-3 border-b text-center">03.30</td>
                    <td className="py-2 px-3 border-b">Bangun Persiapan Tahajud</td>
                  </tr>
                  <tr>
                    <td className="py-2 px-3 border-b text-center">03.30</td>
                    <td className="py-2 px-3 border-b text-center">04.30</td>
                    <td className="py-2 px-3 border-b">Tahajud Berjamaah 4 Raka'at + witir</td>
                  </tr>
                  <tr>
                    <td className="py-2 px-3 border-b text-center">04.30</td>
                    <td className="py-2 px-3 border-b text-center">05.30</td>
                    <td className="py-2 px-3 border-b">Sholat Subuh, Al Ma'surat, Halaqah Quran</td>
                  </tr>
                  <tr>
                    <td className="py-2 px-3 border-b text-center">05.30</td>
                    <td className="py-2 px-3 border-b text-center">06.00</td>
                    <td className="py-2 px-3 border-b">Halaqah Qur'an / Simaan</td>
                  </tr>
                  <tr>
                    <td className="py-2 px-3 border-b text-center">06.00</td>
                    <td className="py-2 px-3 border-b text-center">06.30</td>
                    <td className="py-2 px-3 border-b">Chek Tempat Tugas & Susun Rencana</td>
                  </tr>
                  <tr>
                    <td className="py-2 px-3 border-b text-center">06.30</td>
                    <td className="py-2 px-3 border-b text-center">08.30</td>
                    <td className="py-2 px-3 border-b">Piket Kebersihan, Sarapan & Mandi</td>
                  </tr>
                  <tr>
                    <td className="py-2 px-3 border-b text-center">08.30</td>
                    <td className="py-2 px-3 border-b text-center">10.45</td>
                    <td className="py-2 px-3 border-b">Dhuha, Halaqah Quran / Materi</td>
                  </tr>
                  <tr>
                    <td className="py-2 px-3 border-b text-center">10.45</td>
                    <td className="py-2 px-3 border-b text-center">11.45</td>
                    <td className="py-2 px-3 border-b">Istirahat / Qoilullah</td>
                  </tr>
                  <tr>
                    <td className="py-2 px-3 border-b text-center">11.45</td>
                    <td className="py-2 px-3 border-b text-center">12.30</td>
                    <td className="py-2 px-3 border-b">Sholat Dzuhur</td>
                  </tr>
                  <tr>
                    <td className="py-2 px-3 border-b text-center">12.30</td>
                    <td className="py-2 px-3 border-b text-center">13.00</td>
                    <td className="py-2 px-3 border-b">Makan Siang (Piket kebersihan)</td>
                  </tr>
                  <tr>
                    <td className="py-2 px-3 border-b text-center">13.00</td>
                    <td className="py-2 px-3 border-b text-center">14.00</td>
                    <td className="py-2 px-3 border-b">Tugas Lapangan 1</td>
                  </tr>
                  <tr>
                    <td className="py-2 px-3 border-b text-center">14.00</td>
                    <td className="py-2 px-3 border-b text-center">15.00</td>
                    <td className="py-2 px-3 border-b">Tugas Lapangan 2</td>
                  </tr>
                  <tr>
                    <td className="py-2 px-3 border-b text-center">15.00</td>
                    <td className="py-2 px-3 border-b text-center">15.45</td>
                    <td className="py-2 px-3 border-b">Sholat Ashar, Al Ma'surat, Asmaul Husna</td>
                  </tr>
                  <tr>
                    <td className="py-2 px-3 border-b text-center">15.45</td>
                    <td className="py-2 px-3 border-b text-center">17.00</td>
                    <td className="py-2 px-3 border-b">Istirahat Sore, Bersih-bersih</td>
                  </tr>
                  <tr>
                    <td className="py-2 px-3 border-b text-center">17.00</td>
                    <td className="py-2 px-3 border-b text-center">17.45</td>
                    <td className="py-2 px-3 border-b">Persiapan Sholat Maghrib</td>
                  </tr>
                  <tr>
                    <td className="py-2 px-3 border-b text-center">17.45</td>
                    <td className="py-2 px-3 border-b text-center">18.30</td>
                    <td className="py-2 px-3 border-b">Shalat Maghrib</td>
                  </tr>
                  <tr>
                    <td className="py-2 px-3 border-b text-center">18.30</td>
                    <td className="py-2 px-3 border-b text-center">19.00</td>
                    <td className="py-2 px-3 border-b">Makan Malam (Piket kebersihan)</td>
                  </tr>
                  <tr>
                    <td className="py-2 px-3 border-b text-center">19.00</td>
                    <td className="py-2 px-3 border-b text-center">19.20</td>
                    <td className="py-2 px-3 border-b">Sholat Isya</td>
                  </tr>
                  <tr>
                    <td className="py-2 px-3 border-b text-center">19.20</td>
                    <td className="py-2 px-3 border-b text-center">20.50</td>
                    <td className="py-2 px-3 border-b">Halaqah Qur'an / Simaan</td>
                  </tr>
                  <tr>
                    <td className="py-2 px-3 border-b text-center">20.50</td>
                    <td className="py-2 px-3 border-b text-center">21.00</td>
                    <td className="py-2 px-3 border-b">Baca Surat Pilihan (Al Khafi Malam Jumat)</td>
                  </tr>
                  <tr>
                    <td className="py-2 px-3 border-b text-center">21.00</td>
                    <td className="py-2 px-3 border-b text-center">21.30</td>
                    <td className="py-2 px-3 border-b">Istirahat Tidur Malam</td>
                  </tr>
                </tbody>
              </table>
            </div>
            
            <h3 className="text-xl font-semibold text-gray-800 mb-3">Jadwal Kegiatan Hari Ahad</h3>
            <div className="overflow-x-auto mb-6">
              <table className="min-w-full bg-white border border-gray-200">
                <thead>
                  <tr className="bg-gray-100">
                    <th colSpan="2" className="py-2 px-3 border-b text-center">JAM</th>
                    <th rowSpan="2" className="py-2 px-3 border-b text-center">JADWAL KEGIATAN</th>
                  </tr>
                  <tr className="bg-gray-100">
                    <th className="py-2 px-3 border-b text-center">Mulai</th>
                    <th className="py-2 px-3 border-b text-center">Selesai</th>
                  </tr>
                </thead>
                <tbody>
                  <tr>
                    <td className="py-2 px-3 border-b text-center">03.00</td>
                    <td className="py-2 px-3 border-b text-center">03.30</td>
                    <td className="py-2 px-3 border-b">Bangun Persiapan Tahajud</td>
                  </tr>
                  <tr>
                    <td className="py-2 px-3 border-b text-center">03.30</td>
                    <td className="py-2 px-3 border-b text-center">04.30</td>
                    <td className="py-2 px-3 border-b">Tahajud Berjamaah 4 Raka'at + witir</td>
                  </tr>
                  <tr>
                    <td className="py-2 px-3 border-b text-center">04.30</td>
                    <td className="py-2 px-3 border-b text-center">05.30</td>
                    <td className="py-2 px-3 border-b">Sholat Subuh, Al Ma'surat, Halaqah Quran</td>
                  </tr>
                  <tr>
                    <td className="py-2 px-3 border-b text-center">05.30</td>
                    <td className="py-2 px-3 border-b text-center">06.00</td>
                    <td className="py-2 px-3 border-b">Halaqah Qur'an / Simaan</td>
                  </tr>
                  <tr>
                    <td className="py-2 px-3 border-b text-center">06.00</td>
                    <td className="py-2 px-3 border-b text-center">08.00</td>
                    <td className="py-2 px-3 border-b">Olah Raga</td>
                  </tr>
                  <tr>
                    <td className="py-2 px-3 border-b text-center">08.00</td>
                    <td className="py-2 px-3 border-b text-center">09.30</td>
                    <td className="py-2 px-3 border-b">Piket Kebersihan, Sarapan & Mandi</td>
                  </tr>
                  <tr>
                    <td className="py-2 px-3 border-b text-center">09.30</td>
                    <td className="py-2 px-3 border-b text-center">10.45</td>
                    <td className="py-2 px-3 border-b">Chek Tempat Tugas dan susun rencana kerja</td>
                  </tr>
                  <tr>
                    <td className="py-2 px-3 border-b text-center">10.45</td>
                    <td className="py-2 px-3 border-b text-center">11.30</td>
                    <td className="py-2 px-3 border-b">Tugas Lapangan 1</td>
                  </tr>
                  <tr>
                    <td className="py-2 px-3 border-b text-center">11.30</td>
                    <td className="py-2 px-3 border-b text-center">13.00</td>
                    <td className="py-2 px-3 border-b">Sholat Dzuhur</td>
                  </tr>
                  <tr>
                    <td className="py-2 px-3 border-b text-center">13.00</td>
                    <td className="py-2 px-3 border-b text-center">14.00</td>
                    <td className="py-2 px-3 border-b">Makan Siang (Piket kebersihan)</td>
                  </tr>
                  <tr>
                    <td className="py-2 px-3 border-b text-center">14.00</td>
                    <td className="py-2 px-3 border-b text-center">15.00</td>
                    <td className="py-2 px-3 border-b">Tugas Lapangan 1</td>
                  </tr>
                  <tr>
                    <td className="py-2 px-3 border-b text-center">15.00</td>
                    <td className="py-2 px-3 border-b text-center">15.45</td>
                    <td className="py-2 px-3 border-b">Sholat Ashar, Al Ma'surat, Asmaul Husna</td>
                  </tr>
                  <tr>
                    <td className="py-2 px-3 border-b text-center">15.45</td>
                    <td className="py-2 px-3 border-b text-center">17.00</td>
                    <td className="py-2 px-3 border-b">Istirahat Sore, Bersih-bersih</td>
                  </tr>
                  <tr>
                    <td className="py-2 px-3 border-b text-center">17.00</td>
                    <td className="py-2 px-3 border-b text-center">17.45</td>
                    <td className="py-2 px-3 border-b">Persiapan Sholat Maghrib</td>
                  </tr>
                  <tr>
                    <td className="py-2 px-3 border-b text-center">17.45</td>
                    <td className="py-2 px-3 border-b text-center">18.30</td>
                    <td className="py-2 px-3 border-b">Shalat Maghrib</td>
                  </tr>
                  <tr>
                    <td className="py-2 px-3 border-b text-center">18.30</td>
                    <td className="py-2 px-3 border-b text-center">19.00</td>
                    <td className="py-2 px-3 border-b">Makan Malam (Piket kebersihan)</td>
                  </tr>
                  <tr>
                    <td className="py-2 px-3 border-b text-center">19.00</td>
                    <td className="py-2 px-3 border-b text-center">19.20</td>
                    <td className="py-2 px-3 border-b">Sholat Isya</td>
                  </tr>
                  <tr>
                    <td className="py-2 px-3 border-b text-center">19.20</td>
                    <td className="py-2 px-3 border-b text-center">20.50</td>
                    <td className="py-2 px-3 border-b">Baca Buku Bebas</td>
                  </tr>
                  <tr>
                    <td className="py-2 px-3 border-b text-center">20.50</td>
                    <td className="py-2 px-3 border-b text-center">21.00</td>
                    <td className="py-2 px-3 border-b">Baca Surat Pilihan</td>
                  </tr>
                  <tr>
                    <td className="py-2 px-3 border-b text-center">21.00</td>
                    <td className="py-2 px-3 border-b text-center">21.30</td>
                    <td className="py-2 px-3 border-b">Istirahat Tidur Malam</td>
                  </tr>
                </tbody>
              </table>
            </div>
          </div>
        </motion.div>
      </div>
    </div>
  );
};

export default ProgramReguler; 