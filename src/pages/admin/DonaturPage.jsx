import { useState } from 'react';
import { FaPlus, FaEdit, FaTrash, FaSearch, FaFilter } from 'react-icons/fa';

const DonaturPage = () => {
  const [donors, setDonors] = useState([
    { id: 1, name: 'Budi Santoso', email: 'budi@example.com', phone: '081234567890', totalDonation: 'Rp 2.500.000', lastDonation: '12/05/2023', status: 'Aktif' },
    { id: 2, name: 'Siti Aminah', email: 'siti@example.com', phone: '081234567891', totalDonation: 'Rp 1.800.000', lastDonation: '05/06/2023', status: 'Aktif' },
    { id: 3, name: 'Ahmad Yusuf', email: 'ahmad@example.com', phone: '081234567892', totalDonation: 'Rp 500.000', lastDonation: '22/06/2023', status: 'Aktif' },
    { id: 4, name: 'Dewi Lestari', email: 'dewi@example.com', phone: '081234567893', totalDonation: 'Rp 3.200.000', lastDonation: '02/03/2023', status: 'Tidak Aktif' },
    { id: 5, name: 'Eko Prasetyo', email: 'eko@example.com', phone: '081234567894', totalDonation: 'Rp 750.000', lastDonation: '15/04/2023', status: 'Aktif' },
  ]);

  const [searchTerm, setSearchTerm] = useState('');
  const [statusFilter, setStatusFilter] = useState('all');
  const [isAddModalOpen, setIsAddModalOpen] = useState(false);
  const [isEditModalOpen, setIsEditModalOpen] = useState(false);
  const [isDeleteModalOpen, setIsDeleteModalOpen] = useState(false);
  const [currentDonor, setCurrentDonor] = useState(null);
  const [newDonor, setNewDonor] = useState({
    name: '',
    email: '',
    phone: '',
    totalDonation: '',
    lastDonation: '',
    status: 'Aktif'
  });

  // Filter donors based on search term and status
  const filteredDonors = donors.filter(donor => {
    const matchesSearch = 
      donor.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
      donor.email.toLowerCase().includes(searchTerm.toLowerCase()) ||
      donor.phone.includes(searchTerm);
    
    const matchesStatus = statusFilter === 'all' || donor.status === statusFilter;
    
    return matchesSearch && matchesStatus;
  });

  // Handle opening the edit modal and setting the current donor
  const handleEdit = (donor) => {
    setCurrentDonor(donor);
    setIsEditModalOpen(true);
  };

  // Handle opening the delete modal and setting the current donor
  const handleDelete = (donor) => {
    setCurrentDonor(donor);
    setIsDeleteModalOpen(true);
  };

  // Handle adding a new donor
  const handleAddDonor = () => {
    const id = donors.length > 0 ? Math.max(...donors.map(d => d.id)) + 1 : 1;
    setDonors([...donors, { id, ...newDonor }]);
    setNewDonor({
      name: '',
      email: '',
      phone: '',
      totalDonation: '',
      lastDonation: '',
      status: 'Aktif'
    });
    setIsAddModalOpen(false);
  };

  // Handle updating a donor
  const handleUpdateDonor = () => {
    setDonors(donors.map(donor => 
      donor.id === currentDonor.id ? currentDonor : donor
    ));
    setIsEditModalOpen(false);
  };

  // Handle deleting a donor
  const handleConfirmDelete = () => {
    setDonors(donors.filter(donor => donor.id !== currentDonor.id));
    setIsDeleteModalOpen(false);
  };

  return (
    <div className="container mx-auto">
      <div className="flex justify-between items-center mb-6">
        <div>
          <h1 className="text-2xl font-semibold text-gray-800">Manajemen Donatur</h1>
          <p className="text-gray-600">Kelola data donatur yayasan</p>
        </div>
        <button 
          onClick={() => setIsAddModalOpen(true)}
          className="bg-primary hover:bg-primary/90 text-white px-4 py-2 rounded-md flex items-center"
        >
          <FaPlus className="mr-2" /> Tambah Donatur
        </button>
      </div>

      {/* Filters and Search */}
      <div className="bg-white p-4 rounded-lg shadow-sm mb-6">
        <div className="flex flex-col md:flex-row md:justify-between md:items-center space-y-3 md:space-y-0">
          <div className="relative flex-1 max-w-md">
            <input
              type="text"
              placeholder="Cari donatur..."
              className="w-full pl-10 pr-4 py-2 border rounded-md focus:ring-primary focus:border-primary"
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
            />
            <FaSearch className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" />
          </div>
          
          <div className="flex items-center space-x-2">
            <FaFilter className="text-gray-400" />
            <select
              className="border rounded-md p-2 focus:ring-primary focus:border-primary"
              value={statusFilter}
              onChange={(e) => setStatusFilter(e.target.value)}
            >
              <option value="all">Semua Status</option>
              <option value="Aktif">Aktif</option>
              <option value="Tidak Aktif">Tidak Aktif</option>
            </select>
          </div>
        </div>
      </div>

      {/* Donors Table */}
      <div className="bg-white rounded-lg shadow-sm overflow-hidden">
        <div className="overflow-x-auto">
          <table className="min-w-full divide-y divide-gray-200">
            <thead className="bg-gray-50">
              <tr>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Nama
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Kontak
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Total Donasi
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Donasi Terakhir
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Status
                </th>
                <th className="px-6 py-3 text-right text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Aksi
                </th>
              </tr>
            </thead>
            <tbody className="bg-white divide-y divide-gray-200">
              {filteredDonors.map((donor) => (
                <tr key={donor.id} className="hover:bg-gray-50">
                  <td className="px-6 py-4 whitespace-nowrap">
                    <div className="font-medium text-gray-900">{donor.name}</div>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    <div className="text-gray-900">{donor.email}</div>
                    <div className="text-gray-500">{donor.phone}</div>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    <div className="text-gray-900 font-medium">{donor.totalDonation}</div>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-gray-500">
                    {donor.lastDonation}
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    <span className={`px-2 inline-flex text-xs leading-5 font-semibold rounded-full ${
                      donor.status === 'Aktif' ? 'bg-green-100 text-green-800' : 'bg-red-100 text-red-800'
                    }`}>
                      {donor.status}
                    </span>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-right text-sm font-medium">
                    <button 
                      onClick={() => handleEdit(donor)}
                      className="text-indigo-600 hover:text-indigo-900 mr-3"
                    >
                      <FaEdit className="inline" /> Edit
                    </button>
                    <button 
                      onClick={() => handleDelete(donor)}
                      className="text-red-600 hover:text-red-900"
                    >
                      <FaTrash className="inline" /> Hapus
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
        
        {filteredDonors.length === 0 && (
          <div className="text-center py-8 text-gray-500">
            Tidak ada data donatur yang sesuai dengan pencarian
          </div>
        )}
      </div>

      {/* Add Donor Modal */}
      {isAddModalOpen && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4">
          <div className="bg-white rounded-lg shadow-xl max-w-md w-full p-6 max-h-screen overflow-y-auto">
            <h2 className="text-xl font-semibold text-gray-800 mb-4">Tambah Donatur Baru</h2>
            
            <div className="space-y-4">
              <div>
                <label className="block text-gray-700 text-sm font-bold mb-2">
                  Nama Lengkap
                </label>
                <input 
                  type="text" 
                  className="w-full p-2 border rounded-md focus:ring-primary focus:border-primary"
                  value={newDonor.name}
                  onChange={(e) => setNewDonor({...newDonor, name: e.target.value})}
                />
              </div>
              
              <div>
                <label className="block text-gray-700 text-sm font-bold mb-2">
                  Email
                </label>
                <input 
                  type="email" 
                  className="w-full p-2 border rounded-md focus:ring-primary focus:border-primary"
                  value={newDonor.email}
                  onChange={(e) => setNewDonor({...newDonor, email: e.target.value})}
                />
              </div>
              
              <div>
                <label className="block text-gray-700 text-sm font-bold mb-2">
                  Nomor Telepon
                </label>
                <input 
                  type="text" 
                  className="w-full p-2 border rounded-md focus:ring-primary focus:border-primary"
                  value={newDonor.phone}
                  onChange={(e) => setNewDonor({...newDonor, phone: e.target.value})}
                />
              </div>
              
              <div>
                <label className="block text-gray-700 text-sm font-bold mb-2">
                  Total Donasi
                </label>
                <input 
                  type="text" 
                  className="w-full p-2 border rounded-md focus:ring-primary focus:border-primary"
                  value={newDonor.totalDonation}
                  onChange={(e) => setNewDonor({...newDonor, totalDonation: e.target.value})}
                  placeholder="Rp 0"
                />
              </div>
              
              <div>
                <label className="block text-gray-700 text-sm font-bold mb-2">
                  Tanggal Donasi Terakhir
                </label>
                <input 
                  type="text" 
                  className="w-full p-2 border rounded-md focus:ring-primary focus:border-primary"
                  value={newDonor.lastDonation}
                  onChange={(e) => setNewDonor({...newDonor, lastDonation: e.target.value})}
                  placeholder="DD/MM/YYYY"
                />
              </div>
              
              <div>
                <label className="block text-gray-700 text-sm font-bold mb-2">
                  Status
                </label>
                <select 
                  className="w-full p-2 border rounded-md focus:ring-primary focus:border-primary"
                  value={newDonor.status}
                  onChange={(e) => setNewDonor({...newDonor, status: e.target.value})}
                >
                  <option value="Aktif">Aktif</option>
                  <option value="Tidak Aktif">Tidak Aktif</option>
                </select>
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
                onClick={handleAddDonor}
                className="px-4 py-2 bg-primary text-white rounded-md hover:bg-primary/90"
              >
                Simpan
              </button>
            </div>
          </div>
        </div>
      )}

      {/* Edit Donor Modal */}
      {isEditModalOpen && currentDonor && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4">
          <div className="bg-white rounded-lg shadow-xl max-w-md w-full p-6 max-h-screen overflow-y-auto">
            <h2 className="text-xl font-semibold text-gray-800 mb-4">Edit Donatur</h2>
            
            <div className="space-y-4">
              <div>
                <label className="block text-gray-700 text-sm font-bold mb-2">
                  Nama Lengkap
                </label>
                <input 
                  type="text" 
                  className="w-full p-2 border rounded-md focus:ring-primary focus:border-primary"
                  value={currentDonor.name}
                  onChange={(e) => setCurrentDonor({...currentDonor, name: e.target.value})}
                />
              </div>
              
              <div>
                <label className="block text-gray-700 text-sm font-bold mb-2">
                  Email
                </label>
                <input 
                  type="email" 
                  className="w-full p-2 border rounded-md focus:ring-primary focus:border-primary"
                  value={currentDonor.email}
                  onChange={(e) => setCurrentDonor({...currentDonor, email: e.target.value})}
                />
              </div>
              
              <div>
                <label className="block text-gray-700 text-sm font-bold mb-2">
                  Nomor Telepon
                </label>
                <input 
                  type="text" 
                  className="w-full p-2 border rounded-md focus:ring-primary focus:border-primary"
                  value={currentDonor.phone}
                  onChange={(e) => setCurrentDonor({...currentDonor, phone: e.target.value})}
                />
              </div>
              
              <div>
                <label className="block text-gray-700 text-sm font-bold mb-2">
                  Total Donasi
                </label>
                <input 
                  type="text" 
                  className="w-full p-2 border rounded-md focus:ring-primary focus:border-primary"
                  value={currentDonor.totalDonation}
                  onChange={(e) => setCurrentDonor({...currentDonor, totalDonation: e.target.value})}
                />
              </div>
              
              <div>
                <label className="block text-gray-700 text-sm font-bold mb-2">
                  Tanggal Donasi Terakhir
                </label>
                <input 
                  type="text" 
                  className="w-full p-2 border rounded-md focus:ring-primary focus:border-primary"
                  value={currentDonor.lastDonation}
                  onChange={(e) => setCurrentDonor({...currentDonor, lastDonation: e.target.value})}
                />
              </div>
              
              <div>
                <label className="block text-gray-700 text-sm font-bold mb-2">
                  Status
                </label>
                <select 
                  className="w-full p-2 border rounded-md focus:ring-primary focus:border-primary"
                  value={currentDonor.status}
                  onChange={(e) => setCurrentDonor({...currentDonor, status: e.target.value})}
                >
                  <option value="Aktif">Aktif</option>
                  <option value="Tidak Aktif">Tidak Aktif</option>
                </select>
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
                onClick={handleUpdateDonor}
                className="px-4 py-2 bg-primary text-white rounded-md hover:bg-primary/90"
              >
                Simpan Perubahan
              </button>
            </div>
          </div>
        </div>
      )}

      {/* Delete Confirmation Modal */}
      {isDeleteModalOpen && currentDonor && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4">
          <div className="bg-white rounded-lg shadow-xl max-w-md w-full p-6">
            <h2 className="text-xl font-semibold text-gray-800 mb-4">Konfirmasi Hapus</h2>
            <p className="text-gray-600 mb-6">
              Apakah Anda yakin ingin menghapus donatur <strong>{currentDonor.name}</strong>? Tindakan ini tidak dapat dibatalkan.
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
    </div>
  );
};

export default DonaturPage; 