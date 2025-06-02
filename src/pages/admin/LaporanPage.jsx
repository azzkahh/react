import { useState } from 'react';
import { FaPlus, FaEdit, FaTrash, FaSearch, FaCalendarAlt, FaImage, FaEye, FaUpload } from 'react-icons/fa';

const LaporanPage = () => {
  const [searchTerm, setSearchTerm] = useState('');
  const [isAddModalOpen, setIsAddModalOpen] = useState(false);
  const [isEditModalOpen, setIsEditModalOpen] = useState(false);
  const [isDeleteModalOpen, setIsDeleteModalOpen] = useState(false);
  const [isDetailModalOpen, setIsDetailModalOpen] = useState(false);
  const [currentReport, setCurrentReport] = useState(null);

  // New report state
  const [newReport, setNewReport] = useState({
    title: '',
    date: '',
    description: '',
    program: '',
    location: '',
    imageUrl: ''
  });

  // Sample implementation reports data
  const [reports, setReports] = useState([
    {
      id: 1,
      title: 'Pendistribusian Bantuan Pendidikan',
      date: '12 Juni 2023',
      description: 'Pendistribusian bantuan pendidikan berupa buku, alat tulis, dan seragam untuk siswa kurang mampu di daerah Bunian.',
      program: 'Bantuan Pendidikan',
      location: 'Desa Bunian, Kecamatan Drajat',
      imageUrl: 'https://source.unsplash.com/random/300x200/?education,charity'
    },
    {
      id: 2,
      title: 'Program Kesehatan Gratis',
      date: '24 Juli 2023',
      description: 'Penyelenggaraan pemeriksaan kesehatan gratis dan penyuluhan gizi untuk masyarakat di desa Drajat.',
      program: 'Bantuan Kesehatan',
      location: 'Balai Desa Drajat',
      imageUrl: 'https://source.unsplash.com/random/300x200/?health,medical'
    },
    {
      id: 3,
      title: 'Pembangunan Sarana Air Bersih',
      date: '10 Agustus 2023',
      description: 'Peresmian sarana air bersih yang dibangun untuk memenuhi kebutuhan air bersih warga di daerah terpencil.',
      program: 'Infrastruktur Dasar',
      location: 'Dusun Karya, Desa Muda',
      imageUrl: 'https://source.unsplash.com/random/300x200/?water,village'
    },
    {
      id: 4,
      title: 'Pelatihan Keterampilan Wirausaha',
      date: '15 September 2023',
      description: 'Pelatihan keterampilan wirausaha untuk pemuda dan ibu rumah tangga guna meningkatkan kemandirian ekonomi.',
      program: 'Pemberdayaan Ekonomi',
      location: 'Aula Serbaguna Kecamatan Muda',
      imageUrl: 'https://source.unsplash.com/random/300x200/?entrepreneur,training'
    }
  ]);

  // Filter reports based on search term
  const filteredReports = reports.filter(report =>
    report.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
    report.description.toLowerCase().includes(searchTerm.toLowerCase()) ||
    report.date.toLowerCase().includes(searchTerm.toLowerCase()) ||
    report.program.toLowerCase().includes(searchTerm.toLowerCase()) ||
    report.location.toLowerCase().includes(searchTerm.toLowerCase())
  );

  // Handle image upload
  const handleImageUpload = (e, isEdit = false) => {
    const file = e.target.files[0];
    if (file) {
      // Check if the file is an image
      if (!file.type.match('image.*')) {
        alert('Mohon upload file gambar saja (JPEG, PNG, GIF, etc.)');
        return;
      }
      
      // Check file size (limit to 2MB)
      if (file.size > 2 * 1024 * 1024) {
        alert('Ukuran file terlalu besar. Maksimal 2MB.');
        return;
      }
      
      const imageUrl = URL.createObjectURL(file);
      
      if (isEdit) {
        setCurrentReport({...currentReport, imageUrl});
      } else {
        setNewReport({...newReport, imageUrl});
      }
    }
  };

  // Handle opening the edit modal and setting the current report
  const handleEdit = (report) => {
    setCurrentReport(report);
    setIsEditModalOpen(true);
  };

  // Handle opening the delete modal and setting the current report
  const handleDelete = (report) => {
    setCurrentReport(report);
    setIsDeleteModalOpen(true);
  };

  // Handle adding a new report
  const handleAddReport = () => {
    const id = reports.length > 0 ? Math.max(...reports.map(r => r.id)) + 1 : 1;
    setReports([...reports, { id, ...newReport }]);
    setNewReport({
      title: '',
      date: '',
      description: '',
      program: '',
      location: '',
      imageUrl: ''
    });
    setIsAddModalOpen(false);
  };

  // Handle updating a report
  const handleUpdateReport = () => {
    setReports(reports.map(report => 
      report.id === currentReport.id ? currentReport : report
    ));
    setIsEditModalOpen(false);
  };

  // Handle deleting a report
  const handleConfirmDelete = () => {
    setReports(reports.filter(report => report.id !== currentReport.id));
    setIsDeleteModalOpen(false);
  };

  // Handle opening the detail modal
  const handleViewDetails = (report) => {
    setCurrentReport(report);
    setIsDetailModalOpen(true);
  };

  return (
    <div className="container mx-auto px-4">
      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center mb-6 gap-4">
        <div>
          <h1 className="text-2xl font-semibold text-gray-800">Manajemen Laporan</h1>
          <p className="text-gray-600">Kelola laporan implementasi kegiatan</p>
        </div>
        <button 
          onClick={() => setIsAddModalOpen(true)}
          className="bg-blue-600 hover:bg-blue-700 text-white px-4 py-2 rounded-md flex items-center w-full sm:w-auto justify-center sm:justify-start"
        >
          <FaPlus className="mr-2" /> Tambah Laporan
        </button>
      </div>

      {/* Search */}
      <div className="bg-white p-4 rounded-lg shadow-sm mb-6">
        <div className="relative w-full max-w-md">
          <input
            type="text"
            placeholder="Cari laporan kegiatan..."
            className="w-full pl-10 pr-4 py-2 border rounded-md focus:ring-blue-500 focus:border-blue-500"
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
          />
          <FaSearch className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" />
        </div>
      </div>

      {/* Reports Table - Desktop & Tablet */}
      <div className="bg-white rounded-lg shadow-sm overflow-hidden">
        <div className="hidden md:block overflow-x-auto">
          <table className="min-w-full divide-y divide-gray-200">
            <thead className="bg-gray-50">
              <tr>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Laporan Kegiatan
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Program
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Lokasi
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Tanggal
                </th>
                <th className="px-6 py-3 text-right text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Aksi
                </th>
              </tr>
            </thead>
            <tbody className="bg-white divide-y divide-gray-200">
              {filteredReports.map((report) => (
                <tr key={report.id} className="hover:bg-gray-50">
                  <td className="px-6 py-4 flex items-center">
                    {report.imageUrl && (
                      <div className="flex-shrink-0 h-10 w-10 mr-3">
                        <img 
                          src={report.imageUrl} 
                          alt={report.title}
                          className="h-10 w-10 rounded-md object-cover" 
                        />
                      </div>
                    )}
                    <div>
                      <div className="font-medium text-gray-900">{report.title}</div>
                      <div className="text-sm text-gray-500 truncate max-w-xs">{report.description}</div>
                    </div>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    {report.program}
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    {report.location}
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    <div className="flex items-center">
                      <FaCalendarAlt className="text-gray-400 mr-2" />
                      {report.date}
                    </div>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-right text-sm font-medium">
                    <button 
                      onClick={() => handleViewDetails(report)}
                      className="text-blue-600 hover:text-blue-900 mr-3"
                    >
                      <FaEye className="inline mr-1" /> Lihat
                    </button>
                    <button 
                      onClick={() => handleEdit(report)}
                      className="text-indigo-600 hover:text-indigo-900 mr-3"
                    >
                      <FaEdit className="inline mr-1" /> Edit
                    </button>
                    <button 
                      onClick={() => handleDelete(report)}
                      className="text-red-600 hover:text-red-900"
                    >
                      <FaTrash className="inline mr-1" /> Hapus
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>

        {/* Reports Cards - Mobile View */}
        <div className="md:hidden">
          {filteredReports.map((report) => (
            <div key={report.id} className="border-b border-gray-200 p-4">
              <div className="flex items-start gap-3 mb-2">
                {report.imageUrl && (
                  <img 
                    src={report.imageUrl} 
                    alt={report.title}
                    className="h-16 w-16 rounded-md object-cover flex-shrink-0" 
                  />
                )}
                <div className="flex-1">
                  <h3 className="font-medium text-gray-900">{report.title}</h3>
                  <p className="text-sm text-gray-500 mb-1">
                    <span className="font-medium">Program:</span> {report.program}
                  </p>
                  <p className="text-sm text-gray-500 mb-2 flex items-center">
                    <FaCalendarAlt className="text-gray-400 mr-2" /> {report.date}
                  </p>
                  <p className="text-sm text-gray-600 line-clamp-2">{report.description}</p>
                </div>
              </div>
              
              <div className="flex justify-end space-x-2 mt-3">
                <button 
                  onClick={() => handleViewDetails(report)}
                  className="p-2 text-blue-600 hover:text-blue-800"
                >
                  <FaEye />
                </button>
                <button 
                  onClick={() => handleEdit(report)}
                  className="p-2 text-indigo-600 hover:text-indigo-800"
                >
                  <FaEdit />
                </button>
                <button 
                  onClick={() => handleDelete(report)}
                  className="p-2 text-red-600 hover:text-red-800"
                >
                  <FaTrash />
                </button>
              </div>
            </div>
          ))}
          
          {filteredReports.length === 0 && (
            <div className="text-center py-8 text-gray-500">
              Tidak ada laporan yang sesuai dengan pencarian
            </div>
          )}
        </div>
      </div>

      {/* Add Report Modal */}
      {isAddModalOpen && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4">
          <div className="bg-white rounded-lg shadow-xl max-w-md w-full p-6 max-h-screen overflow-y-auto">
            <h2 className="text-xl font-semibold text-gray-800 mb-4">Tambah Laporan Implementasi</h2>
            
            <div className="space-y-4">
              <div>
                <label className="block text-gray-700 text-sm font-bold mb-2">
                  Judul Laporan
                </label>
                <input 
                  type="text" 
                  className="w-full p-2 border rounded-md focus:ring-blue-500 focus:border-blue-500"
                  value={newReport.title}
                  onChange={(e) => setNewReport({...newReport, title: e.target.value})}
                />
              </div>
              
              <div>
                <label className="block text-gray-700 text-sm font-bold mb-2">
                  Program Terkait
                </label>
                <input 
                  type="text" 
                  className="w-full p-2 border rounded-md focus:ring-blue-500 focus:border-blue-500"
                  value={newReport.program}
                  onChange={(e) => setNewReport({...newReport, program: e.target.value})}
                />
              </div>
              
              <div>
                <label className="block text-gray-700 text-sm font-bold mb-2">
                  Lokasi
                </label>
                <input 
                  type="text" 
                  className="w-full p-2 border rounded-md focus:ring-blue-500 focus:border-blue-500"
                  value={newReport.location}
                  onChange={(e) => setNewReport({...newReport, location: e.target.value})}
                />
              </div>
              
              <div>
                <label className="block text-gray-700 text-sm font-bold mb-2">
                  Tanggal
                </label>
                <input 
                  type="text" 
                  className="w-full p-2 border rounded-md focus:ring-blue-500 focus:border-blue-500"
                  placeholder="DD Bulan YYYY"
                  value={newReport.date}
                  onChange={(e) => setNewReport({...newReport, date: e.target.value})}
                />
              </div>
              
              <div>
                <label className="block text-gray-700 text-sm font-bold mb-2">
                  Deskripsi
                </label>
                <textarea 
                  className="w-full p-2 border rounded-md focus:ring-blue-500 focus:border-blue-500"
                  rows="4"
                  value={newReport.description}
                  onChange={(e) => setNewReport({...newReport, description: e.target.value})}
                />
              </div>

              <div>
                <label className="block text-gray-700 text-sm font-bold mb-2">
                  Gambar Dokumentasi
                </label>
                <div className="mt-1 flex items-center space-x-4">
                  {newReport.imageUrl ? (
                    <div className="relative group">
                      <img 
                        src={newReport.imageUrl} 
                        alt="Preview" 
                        className="h-24 w-24 rounded-md object-cover border" 
                      />
                      <div 
                        className="absolute inset-0 flex items-center justify-center bg-black bg-opacity-50 opacity-0 group-hover:opacity-100 transition-opacity rounded-md cursor-pointer"
                        onClick={() => setNewReport({...newReport, imageUrl: ''})}
                      >
                        <FaTrash className="text-white" />
                      </div>
                    </div>
                  ) : (
                    <div className="h-24 w-24 rounded-md border-2 border-dashed border-gray-300 flex items-center justify-center">
                      <FaImage className="text-gray-400 text-2xl" />
                    </div>
                  )}
                  <div className="flex-1">
                    <label className="block">
                      <span className="sr-only">Choose file</span>
                      <input 
                        type="file" 
                        className="block w-full text-sm text-gray-500 file:mr-4 file:py-2 file:px-4 file:rounded-md file:border-0 file:text-sm file:font-semibold file:bg-blue-50 file:text-blue-700 hover:file:bg-blue-100"
                        accept="image/*"
                        onChange={(e) => handleImageUpload(e)}
                      />
                    </label>
                    <p className="text-xs text-gray-500 mt-1">
                      PNG, JPG, GIF hingga 2MB
                    </p>
                  </div>
                </div>
              </div>
            </div>
            
            <div className="mt-6 flex justify-end space-x-3">
              <button 
                onClick={() => setIsAddModalOpen(false)}
                className="px-4 py-2 border border-gray-300 rounded-md text-gray-700 hover:bg-gray-50"
              >
                Batal
              </button>
              <button 
                onClick={handleAddReport}
                className="px-4 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700"
              >
                Simpan
              </button>
            </div>
          </div>
        </div>
      )}

      {/* Edit Report Modal */}
      {isEditModalOpen && currentReport && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4">
          <div className="bg-white rounded-lg shadow-xl max-w-md w-full p-6 max-h-screen overflow-y-auto">
            <h2 className="text-xl font-semibold text-gray-800 mb-4">Edit Laporan Implementasi</h2>
            
            <div className="space-y-4">
              <div>
                <label className="block text-gray-700 text-sm font-bold mb-2">
                  Judul Laporan
                </label>
                <input 
                  type="text" 
                  className="w-full p-2 border rounded-md focus:ring-blue-500 focus:border-blue-500"
                  value={currentReport.title}
                  onChange={(e) => setCurrentReport({...currentReport, title: e.target.value})}
                />
              </div>
              
              <div>
                <label className="block text-gray-700 text-sm font-bold mb-2">
                  Program Terkait
                </label>
                <input 
                  type="text" 
                  className="w-full p-2 border rounded-md focus:ring-blue-500 focus:border-blue-500"
                  value={currentReport.program}
                  onChange={(e) => setCurrentReport({...currentReport, program: e.target.value})}
                />
              </div>
              
              <div>
                <label className="block text-gray-700 text-sm font-bold mb-2">
                  Lokasi
                </label>
                <input 
                  type="text" 
                  className="w-full p-2 border rounded-md focus:ring-blue-500 focus:border-blue-500"
                  value={currentReport.location}
                  onChange={(e) => setCurrentReport({...currentReport, location: e.target.value})}
                />
              </div>
              
              <div>
                <label className="block text-gray-700 text-sm font-bold mb-2">
                  Tanggal
                </label>
                <input 
                  type="text" 
                  className="w-full p-2 border rounded-md focus:ring-blue-500 focus:border-blue-500"
                  value={currentReport.date}
                  onChange={(e) => setCurrentReport({...currentReport, date: e.target.value})}
                />
              </div>
              
              <div>
                <label className="block text-gray-700 text-sm font-bold mb-2">
                  Deskripsi
                </label>
                <textarea 
                  className="w-full p-2 border rounded-md focus:ring-blue-500 focus:border-blue-500"
                  rows="4"
                  value={currentReport.description}
                  onChange={(e) => setCurrentReport({...currentReport, description: e.target.value})}
                />
              </div>

              <div>
                <label className="block text-gray-700 text-sm font-bold mb-2">
                  Gambar Dokumentasi
                </label>
                <div className="mt-1 flex items-center space-x-4">
                  {currentReport.imageUrl ? (
                    <div className="relative group">
                      <img 
                        src={currentReport.imageUrl} 
                        alt="Preview" 
                        className="h-24 w-24 rounded-md object-cover border" 
                      />
                      <div 
                        className="absolute inset-0 flex items-center justify-center bg-black bg-opacity-50 opacity-0 group-hover:opacity-100 transition-opacity rounded-md cursor-pointer"
                        onClick={() => setCurrentReport({...currentReport, imageUrl: ''})}
                      >
                        <FaTrash className="text-white" />
                      </div>
                    </div>
                  ) : (
                    <div className="h-24 w-24 rounded-md border-2 border-dashed border-gray-300 flex items-center justify-center">
                      <FaImage className="text-gray-400 text-2xl" />
                    </div>
                  )}
                  <div className="flex-1">
                    <label className="block">
                      <span className="sr-only">Choose file</span>
                      <input 
                        type="file" 
                        className="block w-full text-sm text-gray-500 file:mr-4 file:py-2 file:px-4 file:rounded-md file:border-0 file:text-sm file:font-semibold file:bg-blue-50 file:text-blue-700 hover:file:bg-blue-100"
                        accept="image/*"
                        onChange={(e) => handleImageUpload(e, true)}
                      />
                    </label>
                    <p className="text-xs text-gray-500 mt-1">
                      PNG, JPG, GIF hingga 2MB
                    </p>
                  </div>
                </div>
              </div>
            </div>
            
            <div className="mt-6 flex justify-end space-x-3">
              <button 
                onClick={() => setIsEditModalOpen(false)}
                className="px-4 py-2 border border-gray-300 rounded-md text-gray-700 hover:bg-gray-50"
              >
                Batal
              </button>
              <button 
                onClick={handleUpdateReport}
                className="px-4 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700"
              >
                Simpan Perubahan
              </button>
            </div>
          </div>
        </div>
      )}

      {/* Delete Confirmation Modal */}
      {isDeleteModalOpen && currentReport && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4">
          <div className="bg-white rounded-lg shadow-xl max-w-md w-full p-6">
            <h2 className="text-xl font-semibold text-gray-800 mb-4">Konfirmasi Hapus</h2>
            <p className="text-gray-600 mb-6">
              Apakah Anda yakin ingin menghapus laporan "{currentReport.title}"? 
              Tindakan ini tidak dapat dibatalkan.
            </p>
            
            <div className="flex justify-end space-x-3">
              <button 
                onClick={() => setIsDeleteModalOpen(false)}
                className="px-4 py-2 border border-gray-300 rounded-md text-gray-700 hover:bg-gray-50"
              >
                Batal
              </button>
              <button 
                onClick={handleConfirmDelete}
                className="px-4 py-2 bg-red-600 text-white rounded-md hover:bg-red-700"
              >
                Hapus
              </button>
            </div>
          </div>
        </div>
      )}

      {/* Detail Modal */}
      {isDetailModalOpen && currentReport && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4">
          <div className="bg-white rounded-lg shadow-xl max-w-3xl w-full p-6 max-h-screen overflow-y-auto">
            <div className="flex justify-between items-start mb-4">
              <h2 className="text-xl font-semibold text-gray-800">{currentReport.title}</h2>
              <button 
                onClick={() => setIsDetailModalOpen(false)}
                className="text-gray-400 hover:text-gray-600"
              >
                <svg className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                </svg>
              </button>
            </div>
            
            {currentReport.imageUrl && (
              <div className="mb-6">
                <img 
                  src={currentReport.imageUrl} 
                  alt={currentReport.title}
                  className="w-full h-64 object-cover rounded-lg" 
                />
              </div>
            )}
            
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-6">
              <div>
                <h3 className="text-sm font-semibold text-gray-500 mb-1">Program</h3>
                <p className="text-gray-800">{currentReport.program}</p>
              </div>
              <div>
                <h3 className="text-sm font-semibold text-gray-500 mb-1">Lokasi</h3>
                <p className="text-gray-800">{currentReport.location}</p>
              </div>
              <div>
                <h3 className="text-sm font-semibold text-gray-500 mb-1">Tanggal</h3>
                <p className="text-gray-800 flex items-center">
                  <FaCalendarAlt className="text-gray-400 mr-2" />
                  {currentReport.date}
                </p>
              </div>
            </div>
            
            <div className="mb-6">
              <h3 className="text-sm font-semibold text-gray-500 mb-2">Deskripsi</h3>
              <p className="text-gray-800 whitespace-pre-line">{currentReport.description}</p>
            </div>
            
            <div className="flex justify-end space-x-3">
              <button 
                onClick={() => {
                  setIsDetailModalOpen(false);
                  handleEdit(currentReport);
                }}
                className="px-4 py-2 border border-indigo-600 text-indigo-600 rounded-md hover:bg-indigo-50"
              >
                <FaEdit className="inline mr-2" /> Edit
              </button>
              <button 
                onClick={() => setIsDetailModalOpen(false)}
                className="px-4 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700"
              >
                Tutup
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default LaporanPage; 