import { useState, useEffect } from 'react';
import { Outlet, Link, useNavigate, useLocation } from 'react-router-dom';
import { 
  FaHome, 
  FaUsers, 
  FaClipboardList, 
  FaFileAlt, 
  FaSignOutAlt, 
  FaBars, 
  FaTimes,
  FaUserCircle 
} from 'react-icons/fa';

const AdminLayout = () => {
  const [sidebarOpen, setSidebarOpen] = useState(false); // Default closed on mobile
  const navigate = useNavigate();
  const location = useLocation();
  
  // Close sidebar when changing routes on mobile
  useEffect(() => {
    const handleResize = () => {
      if (window.innerWidth >= 768) {
        setSidebarOpen(true); // Keep sidebar open on desktop
      } else {
        setSidebarOpen(false); // Close on mobile by default
      }
    };

    // Set initial state based on window size
    handleResize();

    // Add event listener
    window.addEventListener('resize', handleResize);

    // Clean up
    return () => window.removeEventListener('resize', handleResize);
  }, []);

  // Close sidebar when changing routes on mobile
  useEffect(() => {
    if (window.innerWidth < 768) {
      setSidebarOpen(false);
    }
  }, [location.pathname]);
  
  // Check for authentication on component mount
  useEffect(() => {
    const isAuthenticated = localStorage.getItem('adminAuth') === 'true';
    if (!isAuthenticated) {
      navigate('/admin/login');
    }
  }, [navigate]);

  const handleLogout = () => {
    localStorage.removeItem('adminAuth');
    navigate('/admin/login');
  };

  // Menu items with icons and paths
  const menuItems = [
    { icon: <FaHome size={20} />, title: 'Dashboard', path: '/admin/dashboard' },
    { icon: <FaUsers size={20} />, title: 'Donatur', path: '/admin/donatur' },
    { icon: <FaClipboardList size={20} />, title: 'Program', path: '/admin/program' },
    { icon: <FaFileAlt size={20} />, title: 'Laporan', path: '/admin/laporan' },
  ];

  return (
    <div className="flex h-screen bg-gray-100 overflow-hidden">
      {/* Sidebar */}
      <div 
        className={`${
          sidebarOpen ? 'translate-x-0' : '-translate-x-full'
        } bg-gray-800 shadow-lg transition-transform duration-300 fixed md:static h-full z-30 w-[260px] md:translate-x-0 overflow-y-auto`}
      >
        {/* Sidebar Header */}
        <div className="flex items-center justify-between p-4 border-b border-gray-700 bg-gray-900">
          <Link to="/admin/dashboard" className="text-white font-bold flex items-center">
            <span className="text-lg md:text-base">KARYA MUDA ADMIN</span>
          </Link>
          <button 
            onClick={() => setSidebarOpen(false)}
            className="bg-blue-600 text-white hover:bg-blue-700 p-1.5 rounded-md transition-colors md:hidden"
          >
            <FaTimes size={18} />
          </button>
        </div>

        {/* User Profile - Mobile Only */}
        <div className="md:hidden flex items-center py-4 px-4 border-b border-gray-700">
          <div className="flex-shrink-0">
            <FaUserCircle className="h-9 w-9 text-gray-300" />
          </div>
          <div className="ml-3">
            <div className="text-base font-medium text-white">Admin</div>
            <div className="text-sm text-gray-400">admin@karyamuda.id</div>
          </div>
        </div>

        {/* Sidebar Menu */}
        <nav className="mt-4">
          <ul className="space-y-1 px-2">
            {menuItems.map((item, index) => (
              <li key={index}>
                <Link
                  to={item.path}
                  className={`flex items-center py-3 px-4 rounded-md ${
                    location.pathname === item.path
                      ? 'bg-blue-600 text-white'
                      : 'text-gray-300 hover:bg-gray-700'
                  } transition-colors duration-200`}
                >
                  <span className="mr-3">{item.icon}</span>
                  <span>{item.title}</span>
                </Link>
              </li>
            ))}
            <li className="pt-6">
              <button
                onClick={handleLogout}
                className="flex items-center w-full py-3 px-4 rounded-md text-gray-300 hover:bg-gray-700 transition-colors duration-200"
              >
                <span className="mr-3"><FaSignOutAlt size={20} /></span>
                <span>Logout</span>
              </button>
            </li>
          </ul>
        </nav>
      </div>

      {/* Main Content */}
      <div className="flex-1 flex flex-col overflow-hidden w-full">
        {/* Header */}
        <header className="bg-white shadow-sm z-20 sticky top-0">
          <div className="flex items-center justify-between p-4">
            <div className="flex items-center">
              <button
                onClick={() => setSidebarOpen(!sidebarOpen)}
                className="text-blue-600 hover:text-blue-800 transition-colors p-1.5 rounded-md hover:bg-gray-100 md:hidden"
                aria-label="Toggle sidebar"
              >
                <FaBars size={24} />
              </button>
              <div className="ml-2 text-lg font-medium text-primary truncate">
                {menuItems.find(item => location.pathname === item.path)?.title || 'Admin Panel'}
              </div>
            </div>
            
            {/* User Profile - Desktop Only */}
            <div className="hidden md:flex items-center space-x-3">
              <div className="font-medium text-gray-700">Admin</div>
              <FaUserCircle className="h-8 w-8 text-gray-500" />
            </div>
          </div>
        </header>

        {/* Main content */}
        <main className="flex-1 overflow-x-hidden overflow-y-auto bg-gray-100 p-4">
          <Outlet />
        </main>
      </div>
      
      {/* Overlay for small screens */}
      {sidebarOpen && (
        <div 
          className="md:hidden fixed inset-0 bg-black bg-opacity-50 z-20"
          onClick={() => setSidebarOpen(false)}
          aria-hidden="true"
        ></div>
      )}
    </div>
  );
};

export default AdminLayout; 