import { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { Link } from 'react-router-dom';
import { FaBars, FaTimes, FaChevronDown, FaHome, FaHandsHelping, FaUsers, FaFileAlt } from 'react-icons/fa';

const Navbar = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const [dropdownOpen, setDropdownOpen] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      const offset = window.scrollY;
      if (offset > 50) {
        setScrolled(true);
      } else {
        setScrolled(false);
      }
    };

    window.addEventListener('scroll', handleScroll);
    return () => {
      window.removeEventListener('scroll', handleScroll);
    };
  }, []);

  return (
    <nav 
      className={`fixed w-full z-50 transition-all duration-300 backdrop-blur-md ${
        scrolled 
          ? 'bg-white/90 shadow-lg py-2' 
          : 'bg-gradient-to-r from-blue-900/70 via-blue-800/70 to-blue-900/70 py-4 text-white'
      }`}
    >
      <div className="container mx-auto px-4 flex justify-between items-center">
        <Link to="/" className="flex items-center group">
          <div className={`h-12 w-12 flex items-center justify-center ${
            scrolled ? 'bg-white' : 'bg-white/10'
          } rounded-full overflow-hidden`}>
            <img 
              src={scrolled ? "/logo.svg" : "/logo-white.svg"}
              alt="Karya Muda Logo" 
              className="h-10 w-10 transform group-hover:scale-110 transition-transform"
              onError={(e) => {
                e.target.onerror = null;
                e.target.src = "https://via.placeholder.com/48x48?text=KM";
              }}
            />
          </div>
          <div className="ml-3">
            <h1 className={`text-lg font-serif font-bold ${scrolled ? 'text-[#8B572A]' : 'text-white'} tracking-wide`}>
              KARYA MUDA
            </h1>
            <div className={`h-0.5 w-0 group-hover:w-full transition-all duration-300 ${
              scrolled ? 'bg-gradient-to-r from-[#00A651] to-[#8B572A]' : 'bg-white'
            }`}></div>
            <p className={`text-xs uppercase tracking-wider ${
              scrolled ? 'text-[#8B572A]' : 'text-green-300'
            }`}>Sunan Drajat</p>
          </div>
        </Link>

        {/* Desktop Menu */}
        <div className="hidden md:flex items-center space-x-1">
          <Link to="/" 
            className={`px-4 py-2 rounded-full flex items-center font-medium transition-all duration-300 ${
              scrolled 
                ? 'text-gray-800 hover:bg-blue-50 hover:text-[#00A651]' 
                : 'text-white/90 hover:text-white hover:bg-white/10'
            }`}
          >
            <FaHome className="mr-2" /> Yayasan
          </Link>
          
          {/* Program Kami Dropdown Menu */}
          <div className="relative group">
            <button 
              className={`px-4 py-2 rounded-full flex items-center font-medium transition-all duration-300 ${
                scrolled 
                  ? 'text-gray-800 hover:bg-blue-50 hover:text-[#00A651]' 
                  : 'text-white/90 hover:text-white hover:bg-white/10'
              }`}
              onClick={() => setDropdownOpen(!dropdownOpen)}
              onMouseEnter={() => setDropdownOpen(true)}
              onMouseLeave={() => setDropdownOpen(false)}
            >
              <FaHandsHelping className="mr-2" /> Program Kami <FaChevronDown className="ml-1 h-3 w-3" />
            </button>
            
            {/* Dropdown content */}
            <div 
              className={`absolute left-0 mt-2 w-64 bg-white/95 backdrop-blur-md shadow-xl rounded-xl py-2 border border-gray-100 transition-all duration-200 ${
                dropdownOpen ? 'opacity-100 visible translate-y-0' : 'opacity-0 invisible -translate-y-3'
              }`}
              onMouseEnter={() => setDropdownOpen(true)}
              onMouseLeave={() => setDropdownOpen(false)}
            >
              <Link 
                to="/program-reguler" 
                className="block px-4 py-3 text-gray-700 hover:bg-gradient-to-r hover:from-blue-50 hover:to-green-50 hover:text-[#00A651] transition-colors"
              >
                <div className="flex items-center">
                  Program Reguler
                </div>
              </Link>
              <Link 
                to="/program-orang-tua-asuh" 
                className="block px-4 py-3 text-gray-700 hover:bg-gradient-to-r hover:from-blue-50 hover:to-green-50 hover:text-[#00A651] transition-colors"
              >
                <div className="flex items-center">
                  Program Orang Tua Asuh
                </div>
              </Link>
            </div>
          </div>
          
          <Link to="/daftar-donatur" 
            className={`px-4 py-2 rounded-full flex items-center font-medium transition-all duration-300 ${
              scrolled 
                ? 'text-gray-800 hover:bg-blue-50 hover:text-[#00A651]' 
                : 'text-white/90 hover:text-white hover:bg-white/10'
            }`}
          >
            <FaUsers className="mr-2" /> Daftar Donatur
          </Link>
          
          <Link to="/implementasi-laporan" 
            className={`px-4 py-2 rounded-full flex items-center font-medium transition-all duration-300 ${
              scrolled 
                ? 'text-gray-800 hover:bg-blue-50 hover:text-[#00A651]' 
                : 'text-white/90 hover:text-white hover:bg-white/10'
            }`}
          >
            <FaFileAlt className="mr-2" /> Laporan
          </Link>
        </div>

        {/* Mobile Menu Button */}
        <button 
          className={`md:hidden text-2xl focus:outline-none transition-colors ${
            scrolled ? 'text-[#00A651]' : 'text-white'
          }`}
          onClick={() => setIsOpen(!isOpen)}
        >
          {isOpen ? <FaTimes /> : <FaBars />}
        </button>
      </div>

      {/* Mobile Menu */}
      {isOpen && (
        <motion.div 
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          exit={{ opacity: 0, y: -20 }}
          className="md:hidden bg-white/95 backdrop-blur-md py-4 px-4 shadow-lg"
        >
          <div className="flex flex-col space-y-1">
            <Link 
              to="/" 
              className="flex items-center text-gray-800 font-medium hover:bg-blue-50 hover:text-[#00A651] transition-colors py-3 px-4 rounded-lg"
              onClick={() => setIsOpen(false)}
            >
              <FaHome className="mr-3 text-[#00A651]" /> Yayasan
            </Link>
            
            {/* Mobile Program Menu */}
            <div className="py-1">
              <button 
                className="w-full text-left flex items-center justify-between text-gray-800 font-medium hover:bg-blue-50 hover:text-[#00A651] transition-colors py-3 px-4 rounded-lg"
                onClick={() => setDropdownOpen(!dropdownOpen)}
              >
                <span className="flex items-center">
                  <FaHandsHelping className="mr-3 text-[#00A651]" /> Program Kami
                </span>
                <FaChevronDown className={`transition-transform duration-200 text-[#00A651] ${dropdownOpen ? 'rotate-180' : ''}`} />
              </button>
              
              {dropdownOpen && (
                <motion.div 
                  initial={{ opacity: 0, height: 0 }}
                  animate={{ opacity: 1, height: 'auto' }}
                  className="mt-1 pl-4 flex flex-col space-y-1 bg-gray-50 rounded-lg py-2 mx-2"
                >
                  <Link 
                    to="/program-reguler" 
                    className="flex items-center text-gray-700 hover:text-[#00A651] transition-colors py-2 px-4 rounded-md"
                    onClick={() => setIsOpen(false)}
                  >
                    Program Reguler
                  </Link>
                  <Link 
                    to="/program-orang-tua-asuh" 
                    className="flex items-center text-gray-700 hover:text-[#00A651] transition-colors py-2 px-4 rounded-md"
                    onClick={() => setIsOpen(false)}
                  >
                    Program Orang Tua Asuh
                  </Link>
                </motion.div>
              )}
            </div>
            
            <Link 
              to="/daftar-donatur" 
              className="flex items-center text-gray-800 font-medium hover:bg-blue-50 hover:text-[#00A651] transition-colors py-3 px-4 rounded-lg"
              onClick={() => setIsOpen(false)}
            >
              <FaUsers className="mr-3 text-[#00A651]" /> Daftar Donatur
            </Link>
            
            <Link 
              to="/implementasi-laporan" 
              className="flex items-center text-gray-800 font-medium hover:bg-blue-50 hover:text-[#00A651] transition-colors py-3 px-4 rounded-lg"
              onClick={() => setIsOpen(false)}
            >
              <FaFileAlt className="mr-3 text-[#00A651]" /> Laporan
            </Link>
          </div>
        </motion.div>
      )}
    </nav>
  );
};

export default Navbar; 