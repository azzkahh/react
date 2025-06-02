import { useState } from 'react';
import { FaPlus, FaEdit, FaTrash, FaSearch, FaFilter, FaEye, FaImage, FaUpload } from 'react-icons/fa';

const ProgramPage = () => {
  const [activeTab, setActiveTab] = useState('regular');
  const [searchTerm, setSearchTerm] = useState('');
  const [isAddModalOpen, setIsAddModalOpen] = useState(false);
  const [isEditModalOpen, setIsEditModalOpen] = useState(false);
  const [isDeleteModalOpen, setIsDeleteModalOpen] = useState(false);
  const [currentProgram, setCurrentProgram] = useState(null);
  const [programType, setProgramType] = useState('regular');
  
  // New program state
  const [newRegularProgram, setNewRegularProgram] = useState({
    title: '',
    description: '',
    targetFund: '',
    collectedFund: '',
    startDate: '',
    endDate: '',
    status: 'Aktif',
    imageUrl: ''
  });

  const [newParentProgram, setNewParentProgram] = useState({
    childName: '',
    childAge: '',
    education: '',
    sponsorName: '',
    monthlyFund: '',
    startDate: '',
    status: 'Aktif',
    imageUrl: ''
  });

  // Sample data for regular programs
  const [regularPrograms, setRegularPrograms] = useState([
    { 
      id: 1, 
      title: 'Bantuan Pendidikan',
      description: 'Program bantuan untuk biaya pendidikan anak-anak kurang mampu',
      targetFund: 'Rp 50.000.000',
      collectedFund: 'Rp 35.000.000',
      startDate: '01/01/2023',
      endDate: '31/12/2023',
      status: 'Aktif',
      imageUrl: 'https://source.unsplash.com/random/300x200/?education'
    },
    { 
      id: 2, 
      title: 'Bantuan Kesehatan',
      description: 'Program bantuan untuk biaya kesehatan masyarakat kurang mampu',
      targetFund: 'Rp 30.000.000',
      collectedFund: 'Rp 15.000.000',
      startDate: '01/03/2023',
      endDate: '28/02/2024',
      status: 'Aktif',
      imageUrl: 'https://source.unsplash.com/random/300x200/?health'
    },
  ]);

  // Sample data for parent sponsor programs
  const [parentPrograms, setParentPrograms] = useState([
    { 
      id: 1, 
      childName: 'Ahmad Fauzi',
      childAge: '8 tahun',
      education: 'SD Kelas 2',
      sponsorName: 'Budi Santoso',
      monthlyFund: 'Rp 500.000',
      startDate: '01/05/2023',
      status: 'Aktif',
      imageUrl: 'https://source.unsplash.com/random/300x200/?child,boy'
    },
    { 
      id: 2, 
      childName: 'Siti Aminah',
      childAge: '10 tahun',
      education: 'SD Kelas 4',
      sponsorName: 'Dewi Lestari',
      monthlyFund: 'Rp 500.000',
      startDate: '01/06/2023',
      status: 'Aktif',
      imageUrl: 'https://source.unsplash.com/random/300x200/?child,girl'
    },
  ]);

  // Filter programs based on search term
  const filteredRegularPrograms = regularPrograms.filter(program => 
    program.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
    program.description.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const filteredParentPrograms = parentPrograms.filter(program => 
    program.childName.toLowerCase().includes(searchTerm.toLowerCase()) ||
    program.sponsorName.toLowerCase().includes(searchTerm.toLowerCase())
  );

  // Open the add modal and set the type
  const handleAddClick = (type) => {
    setProgramType(type);
    setIsAddModalOpen(true);
  };

  // Handle opening the edit modal and setting the current program
  const handleEdit = (program, type) => {
    setCurrentProgram(program);
    setProgramType(type);
    setIsEditModalOpen(true);
  };

  // Handle opening the delete modal and setting the current program
  const handleDelete = (program, type) => {
    setCurrentProgram(program);
    setProgramType(type);
    setIsDeleteModalOpen(true);
  };

  // Handle adding a new regular program
  const handleAddRegularProgram = () => {
    const id = regularPrograms.length > 0 ? Math.max(...regularPrograms.map(p => p.id)) + 1 : 1;
    setRegularPrograms([...regularPrograms, { id, ...newRegularProgram }]);
    setNewRegularProgram({
      title: '',
      description: '',
      targetFund: '',
      collectedFund: '',
      startDate: '',
      endDate: '',
      status: 'Aktif',
      imageUrl: ''
    });
    setIsAddModalOpen(false);
  };

  // Handle adding a new parent program
  const handleAddParentProgram = () => {
    const id = parentPrograms.length > 0 ? Math.max(...parentPrograms.map(p => p.id)) + 1 : 1;
    setParentPrograms([...parentPrograms, { id, ...newParentProgram }]);
    setNewParentProgram({
      childName: '',
      childAge: '',
      education: '',
      sponsorName: '',
      monthlyFund: '',
      startDate: '',
      status: 'Aktif',
      imageUrl: ''
    });
    setIsAddModalOpen(false);
  };

  // Handle updating a program
  const handleUpdateProgram = () => {
    if (programType === 'regular') {
      setRegularPrograms(regularPrograms.map(program => 
        program.id === currentProgram.id ? currentProgram : program
      ));
    } else {
      setParentPrograms(parentPrograms.map(program => 
        program.id === currentProgram.id ? currentProgram : program
      ));
    }
    setIsEditModalOpen(false);
  };

  // Handle deleting a program
  const handleConfirmDelete = () => {
    if (programType === 'regular') {
      setRegularPrograms(regularPrograms.filter(program => program.id !== currentProgram.id));
    } else {
      setParentPrograms(parentPrograms.filter(program => program.id !== currentProgram.id));
    }
    setIsDeleteModalOpen(false);
  };

  // Add a new state for the detail modal
  const [isDetailModalOpen, setIsDetailModalOpen] = useState(false);

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
        setCurrentProgram({...currentProgram, imageUrl});
      } else {
        if (programType === 'regular') {
          setNewRegularProgram({...newRegularProgram, imageUrl});
        } else {
          setNewParentProgram({...newParentProgram, imageUrl});
        }
      }
    }
  };

  return (
    <div className="container mx-auto px-4">
      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center mb-6 gap-4">
        <div>
          <h1 className="text-2xl font-semibold text-gray-800">Manajemen Program</h1>
          <p className="text-gray-600">Kelola program-program yayasan</p>
        </div>
        <button 
          onClick={() => handleAddClick(activeTab)}
          className="bg-blue-600 hover:bg-blue-700 text-white px-4 py-2 rounded-md flex items-center w-full sm:w-auto justify-center sm:justify-start"
        >
          <FaPlus className="mr-2" /> Tambah Program
        </button>
      </div>

      {/* Tabs */}
      <div className="bg-white rounded-t-lg border-b border-gray-200 mb-4">
        <nav className="flex overflow-x-auto">
          <button
            className={`px-4 py-3 text-sm font-medium border-b-2 whitespace-nowrap ${
              activeTab === 'regular'
                ? 'border-blue-600 text-blue-600'
                : 'border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300'
            }`}
            onClick={() => setActiveTab('regular')}
          >
            Program Reguler
          </button>
          <button
            className={`px-4 py-3 text-sm font-medium border-b-2 whitespace-nowrap ${
              activeTab === 'parent'
                ? 'border-blue-600 text-blue-600'
                : 'border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300'
            }`}
            onClick={() => setActiveTab('parent')}
          >
            Program Orang Tua Asuh
          </button>
        </nav>
      </div>

      {/* Search */}
      <div className="bg-white p-4 rounded-lg shadow-sm mb-6">
        <div className="relative w-full max-w-md">
          <input
            type="text"
            placeholder={`Cari ${activeTab === 'regular' ? 'program reguler' : 'program orang tua asuh'}...`}
            className="w-full pl-10 pr-4 py-2 border rounded-md focus:ring-blue-500 focus:border-blue-500"
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
          />
          <FaSearch className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" />
        </div>
      </div>

      {/* Regular Programs Table */}
      {activeTab === 'regular' && (
        <div className="bg-white rounded-lg shadow-sm overflow-hidden">
          {/* Desktop and Tablet View */}
          <div className="hidden md:block overflow-x-auto">
            <table className="min-w-full divide-y divide-gray-200">
              <thead className="bg-gray-50">
                <tr>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Program
                  </th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Target Dana
                  </th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Terkumpul
                  </th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Periode
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
                {filteredRegularPrograms.map((program) => (
                  <tr key={program.id} className="hover:bg-gray-50">
                    <td className="px-6 py-4 flex items-center">
                      {program.imageUrl && (
                        <div className="flex-shrink-0 h-10 w-10 mr-3">
                          <img 
                            src={program.imageUrl} 
                            alt={program.title}
                            className="h-10 w-10 rounded-md object-cover" 
                          />
                        </div>
                      )}
                      <div>
                        <div className="font-medium text-gray-900">{program.title}</div>
                        <div className="text-sm text-gray-500 truncate max-w-xs">{program.description}</div>
                      </div>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap">
                      {program.targetFund}
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap">
                      {program.collectedFund}
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap">
                      <div>{program.startDate} - {program.endDate}</div>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap">
                      <span className={`px-2 inline-flex text-xs leading-5 font-semibold rounded-full ${
                        program.status === 'Aktif' ? 'bg-green-100 text-green-800' : 'bg-red-100 text-red-800'
                      }`}>
                        {program.status}
                      </span>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-right text-sm font-medium">
                      <button 
                        onClick={() => handleEdit(program, 'regular')}
                        className="text-indigo-600 hover:text-indigo-900 mr-3"
                      >
                        <FaEdit className="inline" /> Edit
                      </button>
                      <button 
                        onClick={() => handleDelete(program, 'regular')}
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
          
          {/* Mobile View - Card-based layout */}
          <div className="md:hidden">
            {filteredRegularPrograms.map((program) => (
              <div key={program.id} className="border-b border-gray-200 p-4">
                <div className="flex items-start gap-3 mb-2">
                  {program.imageUrl && (
                    <img 
                      src={program.imageUrl} 
                      alt={program.title}
                      className="h-16 w-16 rounded-md object-cover flex-shrink-0" 
                    />
                  )}
                  <div className="flex-1">
                    <div className="flex justify-between items-start">
                      <h3 className="font-medium text-gray-900">{program.title}</h3>
                      <span className={`ml-2 px-2 text-xs leading-5 font-semibold rounded-full ${
                        program.status === 'Aktif' ? 'bg-green-100 text-green-800' : 'bg-red-100 text-red-800'
                      }`}>
                        {program.status}
                      </span>
                    </div>
                    <p className="text-sm text-gray-500 mb-3 line-clamp-2">{program.description}</p>
                  </div>
                </div>
                
                <div className="grid grid-cols-2 gap-2 text-sm mb-3">
                  <div>
                    <span className="text-gray-500">Target:</span>
                    <span className="ml-1 font-medium">{program.targetFund}</span>
                  </div>
                  <div>
                    <span className="text-gray-500">Terkumpul:</span>
                    <span className="ml-1 font-medium">{program.collectedFund}</span>
                  </div>
                  <div className="col-span-2">
                    <span className="text-gray-500">Periode:</span>
                    <span className="ml-1">{program.startDate} - {program.endDate}</span>
                  </div>
                </div>
                
                <div className="flex justify-end space-x-2 mt-2">
                  <button 
                    onClick={() => {
                      setCurrentProgram(program);
                      setIsDetailModalOpen(true);
                    }}
                    className="p-2 text-blue-600 hover:text-blue-800"
                  >
                    <FaEye />
                  </button>
                  <button 
                    onClick={() => handleEdit(program, 'regular')}
                    className="p-2 text-indigo-600 hover:text-indigo-800"
                  >
                    <FaEdit />
                  </button>
                  <button 
                    onClick={() => handleDelete(program, 'regular')}
                    className="p-2 text-red-600 hover:text-red-800"
                  >
                    <FaTrash />
                  </button>
                </div>
              </div>
            ))}
          </div>
          
          {filteredRegularPrograms.length === 0 && (
            <div className="text-center py-8 text-gray-500">
              Tidak ada program reguler yang sesuai dengan pencarian
            </div>
          )}
        </div>
      )}

      {/* Parent Sponsor Programs Table - Mobile Responsive Version */}
      {activeTab === 'parent' && (
        <div className="bg-white rounded-lg shadow-sm overflow-hidden">
          {/* Desktop and Tablet View */}
          <div className="hidden md:block overflow-x-auto">
            <table className="min-w-full divide-y divide-gray-200">
              <thead className="bg-gray-50">
                <tr>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Anak
                  </th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Orang Tua Asuh
                  </th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Donasi Bulanan
                  </th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Tanggal Mulai
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
                {filteredParentPrograms.map((program) => (
                  <tr key={program.id} className="hover:bg-gray-50">
                    <td className="px-6 py-4 flex items-center">
                      {program.imageUrl && (
                        <div className="flex-shrink-0 h-10 w-10 mr-3">
                          <img 
                            src={program.imageUrl} 
                            alt={program.childName}
                            className="h-10 w-10 rounded-md object-cover" 
                          />
                        </div>
                      )}
                      <div>
                        <div className="font-medium text-gray-900">{program.childName}</div>
                        <div className="text-sm text-gray-500">{program.childAge}, {program.education}</div>
                      </div>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap">
                      {program.sponsorName}
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap">
                      {program.monthlyFund}
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap">
                      {program.startDate}
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap">
                      <span className={`px-2 inline-flex text-xs leading-5 font-semibold rounded-full ${
                        program.status === 'Aktif' ? 'bg-green-100 text-green-800' : 'bg-red-100 text-red-800'
                      }`}>
                        {program.status}
                      </span>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-right text-sm font-medium">
                      <button 
                        onClick={() => handleEdit(program, 'parent')}
                        className="text-indigo-600 hover:text-indigo-900 mr-3"
                      >
                        <FaEdit className="inline" /> Edit
                      </button>
                      <button 
                        onClick={() => handleDelete(program, 'parent')}
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
          
          {/* Mobile View - Card-based layout */}
          <div className="md:hidden">
            {filteredParentPrograms.map((program) => (
              <div key={program.id} className="border-b border-gray-200 p-4">
                <div className="flex items-start gap-3 mb-2">
                  {program.imageUrl && (
                    <img 
                      src={program.imageUrl} 
                      alt={program.childName}
                      className="h-16 w-16 rounded-md object-cover flex-shrink-0" 
                    />
                  )}
                  <div className="flex-1">
                    <div className="flex justify-between items-start">
                      <h3 className="font-medium text-gray-900">{program.childName}</h3>
                      <span className={`ml-2 px-2 text-xs leading-5 font-semibold rounded-full ${
                        program.status === 'Aktif' ? 'bg-green-100 text-green-800' : 'bg-red-100 text-red-800'
                      }`}>
                        {program.status}
                      </span>
                    </div>
                    <p className="text-sm text-gray-500 mb-3">{program.childAge}, {program.education}</p>
                  </div>
                </div>
                
                <div className="grid grid-cols-2 gap-2 text-sm mb-3">
                  <div>
                    <span className="text-gray-500">Orang Tua Asuh:</span>
                    <span className="ml-1 font-medium">{program.sponsorName}</span>
                  </div>
                  <div>
                    <span className="text-gray-500">Donasi:</span>
                    <span className="ml-1 font-medium">{program.monthlyFund}</span>
                  </div>
                  <div>
                    <span className="text-gray-500">Mulai:</span>
                    <span className="ml-1">{program.startDate}</span>
                  </div>
                </div>
                
                <div className="flex justify-end space-x-2 mt-2">
                  <button 
                    onClick={() => {
                      setCurrentProgram(program);
                      setIsDetailModalOpen(true);
                    }}
                    className="p-2 text-blue-600 hover:text-blue-800"
                  >
                    <FaEye />
                  </button>
                  <button 
                    onClick={() => handleEdit(program, 'parent')}
                    className="p-2 text-indigo-600 hover:text-indigo-800"
                  >
                    <FaEdit />
                  </button>
                  <button 
                    onClick={() => handleDelete(program, 'parent')}
                    className="p-2 text-red-600 hover:text-red-800"
                  >
                    <FaTrash />
                  </button>
                </div>
              </div>
            ))}
          </div>
          
          {filteredParentPrograms.length === 0 && (
            <div className="text-center py-8 text-gray-500">
              Tidak ada program orang tua asuh yang sesuai dengan pencarian
            </div>
          )}
        </div>
      )}

      {/* Add Regular Program Modal */}
      {isAddModalOpen && programType === 'regular' && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4">
          <div className="bg-white rounded-lg shadow-xl max-w-md w-full p-6 max-h-screen overflow-y-auto">
            <h2 className="text-xl font-semibold text-gray-800 mb-4">Tambah Program Reguler</h2>
            
            <div className="space-y-4">
              <div>
                <label className="block text-gray-700 text-sm font-bold mb-2">
                  Judul Program
                </label>
                <input 
                  type="text" 
                  className="w-full p-2 border rounded-md focus:ring-blue-500 focus:border-blue-500"
                  value={newRegularProgram.title}
                  onChange={(e) => setNewRegularProgram({...newRegularProgram, title: e.target.value})}
                />
              </div>
              
              <div>
                <label className="block text-gray-700 text-sm font-bold mb-2">
                  Deskripsi
                </label>
                <textarea 
                  className="w-full p-2 border rounded-md focus:ring-blue-500 focus:border-blue-500"
                  rows="3"
                  value={newRegularProgram.description}
                  onChange={(e) => setNewRegularProgram({...newRegularProgram, description: e.target.value})}
                />
              </div>

              <div>
                <label className="block text-gray-700 text-sm font-bold mb-2">
                  Gambar Program
                </label>
                <div className="mt-1 flex items-center space-x-4">
                  {newRegularProgram.imageUrl ? (
                    <div className="relative group">
                      <img 
                        src={newRegularProgram.imageUrl} 
                        alt="Preview" 
                        className="h-24 w-24 rounded-md object-cover border" 
                      />
                      <div 
                        className="absolute inset-0 flex items-center justify-center bg-black bg-opacity-50 opacity-0 group-hover:opacity-100 transition-opacity rounded-md cursor-pointer"
                        onClick={() => setNewRegularProgram({...newRegularProgram, imageUrl: ''})}
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
                      PNG, JPG, GIF hingga 5MB
                    </p>
                  </div>
                </div>
              </div>
              
              <div>
                <label className="block text-gray-700 text-sm font-bold mb-2">
                  Target Dana
                </label>
                <input 
                  type="text" 
                  className="w-full p-2 border rounded-md focus:ring-blue-500 focus:border-blue-500"
                  placeholder="Rp 0"
                  value={newRegularProgram.targetFund}
                  onChange={(e) => setNewRegularProgram({...newRegularProgram, targetFund: e.target.value})}
                />
              </div>
              
              <div>
                <label className="block text-gray-700 text-sm font-bold mb-2">
                  Dana Terkumpul
                </label>
                <input 
                  type="text" 
                  className="w-full p-2 border rounded-md focus:ring-blue-500 focus:border-blue-500"
                  placeholder="Rp 0"
                  value={newRegularProgram.collectedFund}
                  onChange={(e) => setNewRegularProgram({...newRegularProgram, collectedFund: e.target.value})}
                />
              </div>
              
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label className="block text-gray-700 text-sm font-bold mb-2">
                    Tanggal Mulai
                  </label>
                  <input 
                    type="text" 
                    className="w-full p-2 border rounded-md focus:ring-blue-500 focus:border-blue-500"
                    placeholder="DD/MM/YYYY"
                    value={newRegularProgram.startDate}
                    onChange={(e) => setNewRegularProgram({...newRegularProgram, startDate: e.target.value})}
                  />
                </div>
                <div>
                  <label className="block text-gray-700 text-sm font-bold mb-2">
                    Tanggal Selesai
                  </label>
                  <input 
                    type="text" 
                    className="w-full p-2 border rounded-md focus:ring-blue-500 focus:border-blue-500"
                    placeholder="DD/MM/YYYY"
                    value={newRegularProgram.endDate}
                    onChange={(e) => setNewRegularProgram({...newRegularProgram, endDate: e.target.value})}
                  />
                </div>
              </div>
              
              <div>
                <label className="block text-gray-700 text-sm font-bold mb-2">
                  Status
                </label>
                <select 
                  className="w-full p-2 border rounded-md focus:ring-blue-500 focus:border-blue-500"
                  value={newRegularProgram.status}
                  onChange={(e) => setNewRegularProgram({...newRegularProgram, status: e.target.value})}
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
                onClick={handleAddRegularProgram}
                className="px-4 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700"
              >
                Simpan
              </button>
            </div>
          </div>
        </div>
      )}

      {/* Edit Regular Program Modal */}
      {isEditModalOpen && programType === 'regular' && currentProgram && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4">
          <div className="bg-white rounded-lg shadow-xl max-w-md w-full p-6 max-h-screen overflow-y-auto">
            <h2 className="text-xl font-semibold text-gray-800 mb-4">Edit Program Reguler</h2>
            
            <div className="space-y-4">
              <div>
                <label className="block text-gray-700 text-sm font-bold mb-2">
                  Judul Program
                </label>
                <input 
                  type="text" 
                  className="w-full p-2 border rounded-md focus:ring-blue-500 focus:border-blue-500"
                  value={currentProgram.title}
                  onChange={(e) => setCurrentProgram({...currentProgram, title: e.target.value})}
                />
              </div>
              
              <div>
                <label className="block text-gray-700 text-sm font-bold mb-2">
                  Deskripsi
                </label>
                <textarea 
                  className="w-full p-2 border rounded-md focus:ring-blue-500 focus:border-blue-500"
                  rows="3"
                  value={currentProgram.description}
                  onChange={(e) => setCurrentProgram({...currentProgram, description: e.target.value})}
                />
              </div>

              <div>
                <label className="block text-gray-700 text-sm font-bold mb-2">
                  Gambar Program
                </label>
                <div className="mt-1 flex items-center space-x-4">
                  {currentProgram.imageUrl ? (
                    <div className="relative group">
                      <img 
                        src={currentProgram.imageUrl} 
                        alt="Preview" 
                        className="h-24 w-24 rounded-md object-cover border" 
                      />
                      <div 
                        className="absolute inset-0 flex items-center justify-center bg-black bg-opacity-50 opacity-0 group-hover:opacity-100 transition-opacity rounded-md cursor-pointer"
                        onClick={() => setCurrentProgram({...currentProgram, imageUrl: ''})}
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
                      PNG, JPG, GIF hingga 5MB
                    </p>
                  </div>
                </div>
              </div>
              
              <div>
                <label className="block text-gray-700 text-sm font-bold mb-2">
                  Target Dana
                </label>
                <input 
                  type="text" 
                  className="w-full p-2 border rounded-md focus:ring-blue-500 focus:border-blue-500"
                  value={currentProgram.targetFund}
                  onChange={(e) => setCurrentProgram({...currentProgram, targetFund: e.target.value})}
                />
              </div>
              
              <div>
                <label className="block text-gray-700 text-sm font-bold mb-2">
                  Dana Terkumpul
                </label>
                <input 
                  type="text" 
                  className="w-full p-2 border rounded-md focus:ring-blue-500 focus:border-blue-500"
                  value={currentProgram.collectedFund}
                  onChange={(e) => setCurrentProgram({...currentProgram, collectedFund: e.target.value})}
                />
              </div>
              
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label className="block text-gray-700 text-sm font-bold mb-2">
                    Tanggal Mulai
                  </label>
                  <input 
                    type="text" 
                    className="w-full p-2 border rounded-md focus:ring-blue-500 focus:border-blue-500"
                    value={currentProgram.startDate}
                    onChange={(e) => setCurrentProgram({...currentProgram, startDate: e.target.value})}
                  />
                </div>
                <div>
                  <label className="block text-gray-700 text-sm font-bold mb-2">
                    Tanggal Selesai
                  </label>
                  <input 
                    type="text" 
                    className="w-full p-2 border rounded-md focus:ring-blue-500 focus:border-blue-500"
                    value={currentProgram.endDate}
                    onChange={(e) => setCurrentProgram({...currentProgram, endDate: e.target.value})}
                  />
                </div>
              </div>
              
              <div>
                <label className="block text-gray-700 text-sm font-bold mb-2">
                  Status
                </label>
                <select 
                  className="w-full p-2 border rounded-md focus:ring-blue-500 focus:border-blue-500"
                  value={currentProgram.status}
                  onChange={(e) => setCurrentProgram({...currentProgram, status: e.target.value})}
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
                onClick={handleUpdateProgram}
                className="px-4 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700"
              >
                Simpan Perubahan
              </button>
            </div>
          </div>
        </div>
      )}

      {/* Delete Confirmation Modal */}
      {isDeleteModalOpen && currentProgram && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4">
          <div className="bg-white rounded-lg shadow-xl max-w-md w-full p-6">
            <h2 className="text-xl font-semibold text-gray-800 mb-4">Konfirmasi Hapus</h2>
            <p className="text-gray-600 mb-6">
              Apakah Anda yakin ingin menghapus 
              {programType === 'regular' 
                ? ` program "${currentProgram.title}"?` 
                : ` data anak asuh "${currentProgram.childName}"?`
              } 
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

      {/* Add Parent Program Modal */}
      {isAddModalOpen && programType === 'parent' && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4">
          <div className="bg-white rounded-lg shadow-xl max-w-md w-full p-6 max-h-screen overflow-y-auto">
            <h2 className="text-xl font-semibold text-gray-800 mb-4">Tambah Program Orang Tua Asuh</h2>
            
            <div className="space-y-4">
              <div>
                <label className="block text-gray-700 text-sm font-bold mb-2">
                  Nama Anak
                </label>
                <input 
                  type="text" 
                  className="w-full p-2 border rounded-md focus:ring-blue-500 focus:border-blue-500"
                  value={newParentProgram.childName}
                  onChange={(e) => setNewParentProgram({...newParentProgram, childName: e.target.value})}
                />
              </div>

              <div>
                <label className="block text-gray-700 text-sm font-bold mb-2">
                  Foto Anak
                </label>
                <div className="mt-1 flex items-center space-x-4">
                  {newParentProgram.imageUrl ? (
                    <div className="relative group">
                      <img 
                        src={newParentProgram.imageUrl} 
                        alt="Preview" 
                        className="h-24 w-24 rounded-md object-cover border" 
                      />
                      <div 
                        className="absolute inset-0 flex items-center justify-center bg-black bg-opacity-50 opacity-0 group-hover:opacity-100 transition-opacity rounded-md cursor-pointer"
                        onClick={() => setNewParentProgram({...newParentProgram, imageUrl: ''})}
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
                      PNG, JPG, GIF hingga 5MB
                    </p>
                  </div>
                </div>
              </div>
              
              <div>
                <label className="block text-gray-700 text-sm font-bold mb-2">
                  Usia Anak
                </label>
                <input 
                  type="text" 
                  className="w-full p-2 border rounded-md focus:ring-blue-500 focus:border-blue-500"
                  placeholder="Contoh: 8 tahun"
                  value={newParentProgram.childAge}
                  onChange={(e) => setNewParentProgram({...newParentProgram, childAge: e.target.value})}
                />
              </div>
              
              <div>
                <label className="block text-gray-700 text-sm font-bold mb-2">
                  Pendidikan
                </label>
                <input 
                  type="text" 
                  className="w-full p-2 border rounded-md focus:ring-blue-500 focus:border-blue-500"
                  placeholder="Contoh: SD Kelas 2"
                  value={newParentProgram.education}
                  onChange={(e) => setNewParentProgram({...newParentProgram, education: e.target.value})}
                />
              </div>
              
              <div>
                <label className="block text-gray-700 text-sm font-bold mb-2">
                  Nama Orang Tua Asuh
                </label>
                <input 
                  type="text" 
                  className="w-full p-2 border rounded-md focus:ring-blue-500 focus:border-blue-500"
                  value={newParentProgram.sponsorName}
                  onChange={(e) => setNewParentProgram({...newParentProgram, sponsorName: e.target.value})}
                />
              </div>
              
              <div>
                <label className="block text-gray-700 text-sm font-bold mb-2">
                  Donasi Bulanan
                </label>
                <input 
                  type="text" 
                  className="w-full p-2 border rounded-md focus:ring-blue-500 focus:border-blue-500"
                  placeholder="Rp 500.000"
                  value={newParentProgram.monthlyFund}
                  onChange={(e) => setNewParentProgram({...newParentProgram, monthlyFund: e.target.value})}
                />
              </div>
              
              <div>
                <label className="block text-gray-700 text-sm font-bold mb-2">
                  Tanggal Mulai
                </label>
                <input 
                  type="text" 
                  className="w-full p-2 border rounded-md focus:ring-blue-500 focus:border-blue-500"
                  placeholder="DD/MM/YYYY"
                  value={newParentProgram.startDate}
                  onChange={(e) => setNewParentProgram({...newParentProgram, startDate: e.target.value})}
                />
              </div>
              
              <div>
                <label className="block text-gray-700 text-sm font-bold mb-2">
                  Status
                </label>
                <select 
                  className="w-full p-2 border rounded-md focus:ring-blue-500 focus:border-blue-500"
                  value={newParentProgram.status}
                  onChange={(e) => setNewParentProgram({...newParentProgram, status: e.target.value})}
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
                onClick={handleAddParentProgram}
                className="px-4 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700"
              >
                Simpan
              </button>
            </div>
          </div>
        </div>
      )}

      {/* Edit Parent Program Modal */}
      {isEditModalOpen && programType === 'parent' && currentProgram && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4">
          <div className="bg-white rounded-lg shadow-xl max-w-md w-full p-6 max-h-screen overflow-y-auto">
            <h2 className="text-xl font-semibold text-gray-800 mb-4">Edit Program Orang Tua Asuh</h2>
            
            <div className="space-y-4">
              <div>
                <label className="block text-gray-700 text-sm font-bold mb-2">
                  Nama Anak
                </label>
                <input 
                  type="text" 
                  className="w-full p-2 border rounded-md focus:ring-blue-500 focus:border-blue-500"
                  value={currentProgram.childName}
                  onChange={(e) => setCurrentProgram({...currentProgram, childName: e.target.value})}
                />
              </div>

              <div>
                <label className="block text-gray-700 text-sm font-bold mb-2">
                  Foto Anak
                </label>
                <div className="mt-1 flex items-center space-x-4">
                  {currentProgram.imageUrl ? (
                    <div className="relative group">
                      <img 
                        src={currentProgram.imageUrl} 
                        alt="Preview" 
                        className="h-24 w-24 rounded-md object-cover border" 
                      />
                      <div 
                        className="absolute inset-0 flex items-center justify-center bg-black bg-opacity-50 opacity-0 group-hover:opacity-100 transition-opacity rounded-md cursor-pointer"
                        onClick={() => setCurrentProgram({...currentProgram, imageUrl: ''})}
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
                      PNG, JPG, GIF hingga 5MB
                    </p>
                  </div>
                </div>
              </div>
              
              <div>
                <label className="block text-gray-700 text-sm font-bold mb-2">
                  Usia Anak
                </label>
                <input 
                  type="text" 
                  className="w-full p-2 border rounded-md focus:ring-blue-500 focus:border-blue-500"
                  value={currentProgram.childAge}
                  onChange={(e) => setCurrentProgram({...currentProgram, childAge: e.target.value})}
                />
              </div>
              
              <div>
                <label className="block text-gray-700 text-sm font-bold mb-2">
                  Pendidikan
                </label>
                <input 
                  type="text" 
                  className="w-full p-2 border rounded-md focus:ring-blue-500 focus:border-blue-500"
                  value={currentProgram.education}
                  onChange={(e) => setCurrentProgram({...currentProgram, education: e.target.value})}
                />
              </div>
              
              <div>
                <label className="block text-gray-700 text-sm font-bold mb-2">
                  Nama Orang Tua Asuh
                </label>
                <input 
                  type="text" 
                  className="w-full p-2 border rounded-md focus:ring-blue-500 focus:border-blue-500"
                  value={currentProgram.sponsorName}
                  onChange={(e) => setCurrentProgram({...currentProgram, sponsorName: e.target.value})}
                />
              </div>
              
              <div>
                <label className="block text-gray-700 text-sm font-bold mb-2">
                  Donasi Bulanan
                </label>
                <input 
                  type="text" 
                  className="w-full p-2 border rounded-md focus:ring-blue-500 focus:border-blue-500"
                  value={currentProgram.monthlyFund}
                  onChange={(e) => setCurrentProgram({...currentProgram, monthlyFund: e.target.value})}
                />
              </div>
              
              <div>
                <label className="block text-gray-700 text-sm font-bold mb-2">
                  Tanggal Mulai
                </label>
                <input 
                  type="text" 
                  className="w-full p-2 border rounded-md focus:ring-blue-500 focus:border-blue-500"
                  value={currentProgram.startDate}
                  onChange={(e) => setCurrentProgram({...currentProgram, startDate: e.target.value})}
                />
              </div>
              
              <div>
                <label className="block text-gray-700 text-sm font-bold mb-2">
                  Status
                </label>
                <select 
                  className="w-full p-2 border rounded-md focus:ring-blue-500 focus:border-blue-500"
                  value={currentProgram.status}
                  onChange={(e) => setCurrentProgram({...currentProgram, status: e.target.value})}
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
                onClick={handleUpdateProgram}
                className="px-4 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700"
              >
                Simpan Perubahan
              </button>
            </div>
          </div>
        </div>
      )}

      {/* Parent Program Detail Modal for Mobile View */}
      {isDetailModalOpen && currentProgram && programType === 'parent' && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4">
          <div className="bg-white rounded-lg shadow-xl w-full max-w-md p-6 max-h-screen overflow-y-auto">
            <h2 className="text-xl font-semibold text-gray-800 mb-4">{currentProgram.childName}</h2>
            
            {currentProgram.imageUrl && (
              <div className="mb-4 flex justify-center">
                <img
                  src={currentProgram.imageUrl}
                  alt={currentProgram.childName}
                  className="h-32 w-32 rounded-md object-cover border"
                />
              </div>
            )}
            
            <div className="space-y-4">
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label className="block text-gray-700 text-sm font-bold mb-1">
                    Usia
                  </label>
                  <p className="text-gray-600">{currentProgram.childAge}</p>
                </div>
                <div>
                  <label className="block text-gray-700 text-sm font-bold mb-1">
                    Pendidikan
                  </label>
                  <p className="text-gray-600">{currentProgram.education}</p>
                </div>
              </div>
              
              <div>
                <label className="block text-gray-700 text-sm font-bold mb-1">
                  Orang Tua Asuh
                </label>
                <p className="text-gray-600">{currentProgram.sponsorName}</p>
              </div>
              
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label className="block text-gray-700 text-sm font-bold mb-1">
                    Donasi Bulanan
                  </label>
                  <p className="text-gray-600">{currentProgram.monthlyFund}</p>
                </div>
                <div>
                  <label className="block text-gray-700 text-sm font-bold mb-1">
                    Tanggal Mulai
                  </label>
                  <p className="text-gray-600">{currentProgram.startDate}</p>
                </div>
              </div>
              
              <div>
                <label className="block text-gray-700 text-sm font-bold mb-1">
                  Status
                </label>
                <span className={`px-2 inline-flex text-xs leading-5 font-semibold rounded-full ${
                  currentProgram.status === 'Aktif' ? 'bg-green-100 text-green-800' : 'bg-red-100 text-red-800'
                }`}>
                  {currentProgram.status}
                </span>
              </div>
            </div>
            
            <div className="mt-6 flex justify-between">
              <button 
                onClick={() => setIsDetailModalOpen(false)}
                className="px-4 py-2 border border-gray-300 rounded-md text-gray-700 hover:bg-gray-50"
              >
                Tutup
              </button>
              <div className="flex space-x-2">
                <button 
                  onClick={() => {
                    setIsDetailModalOpen(false);
                    handleEdit(currentProgram, 'parent');
                  }}
                  className="px-4 py-2 bg-indigo-600 text-white rounded-md hover:bg-indigo-700"
                >
                  Edit
                </button>
                <button 
                  onClick={() => {
                    setIsDetailModalOpen(false);
                    handleDelete(currentProgram, 'parent');
                  }}
                  className="px-4 py-2 bg-red-600 text-white rounded-md hover:bg-red-700"
                >
                  Hapus
                </button>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default ProgramPage; 