import { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { Link } from 'react-router-dom';
import { FaBars, FaTimes, FaChevronDown } from 'react-icons/fa';

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
      className={`fixed w-full z-50 transition-all duration-300 ${
        scrolled ? 'bg-white shadow-md py-2' : 'bg-transparent py-4'
      }`}
    >
      <div className="container mx-auto px-4 flex justify-between items-center">
        <Link to="/" className="flex items-center">
          <img 
            src="/logo.svg" 
            alt="Karya Muda Logo" 
            className="h-12 w-auto"
            onError={(e) => {
              e.target.onerror = null;
              e.target.src = "https://via.placeholder.com/48x48?text=KM";
            }}
          />
          <div className="ml-3">
            <h1 className="text-lg font-serif font-bold text-primary">KARYA MUDA</h1>
            <p className="text-xs text-secondary uppercase tracking-wider">Bunian Drajat</p>
          </div>
        </Link>

        {/* Desktop Menu */}
        <div className="hidden md:flex space-x-8">
          <Link to="/" className="text-primary font-medium hover:text-primary/80 transition-colors">
            Main Menu / Yayasan
          </Link>
          
          {/* Program Kami Dropdown Menu */}
          <div className="relative group">
            <button 
              className="text-primary font-medium hover:text-primary/80 transition-colors flex items-center"
              onClick={() => setDropdownOpen(!dropdownOpen)}
              onMouseEnter={() => setDropdownOpen(true)}
              onMouseLeave={() => setDropdownOpen(false)}
            >
              Program Kami <FaChevronDown className="ml-1 h-3 w-3" />
            </button>
            
            {/* Dropdown content */}
            <div 
              className={`absolute left-0 mt-2 w-64 bg-white shadow-lg rounded-md py-2 transition-all duration-200 ${
                dropdownOpen ? 'opacity-100 visible' : 'opacity-0 invisible'
              }`}
              onMouseEnter={() => setDropdownOpen(true)}
              onMouseLeave={() => setDropdownOpen(false)}
            >
              <Link 
                to="/program-reguler" 
                className="block px-4 py-2 text-primary hover:bg-blue-100 transition-colors"
              >
                Program Reguler
              </Link>
              <Link 
                to="/program-orang-tua-asuh" 
                className="block px-4 py-2 text-primary hover:bg-blue-100 transition-colors"
              >
                Program Orang Tua Asuh
              </Link>
            </div>
          </div>
          
          <Link to="#donate" className="text-primary font-medium hover:text-primary/80 transition-colors">
            Daftar Donatur
          </Link>
          <Link to="/implementasi-laporan" className="text-primary font-medium hover:text-primary/80 transition-colors">
            Implementasi / Laporan
          </Link>
        </div>

        {/* Mobile Menu Button */}
        <button 
          className="md:hidden text-primary text-2xl focus:outline-none"
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
          className="md:hidden bg-white py-4 px-4 shadow-lg"
        >
          <div className="flex flex-col space-y-4">
            <Link 
              to="/" 
              className="text-primary font-medium hover:text-primary/80 transition-colors py-2 border-b border-gray-100"
              onClick={() => setIsOpen(false)}
            >
              Main Menu / Yayasan
            </Link>
            
            {/* Mobile Program Menu */}
            <div className="py-2 border-b border-gray-100">
              <button 
                className="w-full text-left text-primary font-medium flex items-center justify-between"
                onClick={() => setDropdownOpen(!dropdownOpen)}
              >
                Program Kami
                <FaChevronDown className={`transition-transform duration-200 ${dropdownOpen ? 'rotate-180' : ''}`} />
              </button>
              
              {dropdownOpen && (
                <div className="mt-2 pl-4 flex flex-col space-y-2">
                  <Link 
                    to="/program-reguler" 
                    className="text-primary hover:text-primary/80 transition-colors py-1"
                    onClick={() => setIsOpen(false)}
                  >
                    Program Reguler
                  </Link>
                  <Link 
                    to="/program-orang-tua-asuh" 
                    className="text-primary hover:text-primary/80 transition-colors py-1"
                    onClick={() => setIsOpen(false)}
                  >
                    Program Orang Tua Asuh
                  </Link>
                </div>
              )}
            </div>
            
            <Link 
              to="#donate" 
              className="text-primary font-medium hover:text-primary/80 transition-colors py-2 border-b border-gray-100"
              onClick={() => setIsOpen(false)}
            >
              Daftar Donatur
            </Link>
            <Link 
              to="/implementasi-laporan" 
              className="text-primary font-medium hover:text-primary/80 transition-colors py-2 border-b border-gray-100"
              onClick={() => setIsOpen(false)}
            >
              Implementasi / Laporan
            </Link>
          </div>
        </motion.div>
      )}
    </nav>
  );
};

export default Navbar; 