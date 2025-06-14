import { Link } from 'react-router-dom';
import { FaInstagram, FaEnvelope, FaPhone, FaMapMarkerAlt, FaWhatsapp } from 'react-icons/fa';
import { FaTiktok } from 'react-icons/fa6';

const Footer = () => {
  return (
    <footer className="bg-gray-900 text-white">
      {/* Main Footer */}
      <div className="container mx-auto px-4 py-12">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {/* Logo and Description */}
          <div>
            <Link to="/" className="flex items-center mb-4">
              <img 
                src="/logo-white.svg" 
                alt="Karya Muda Logo" 
                className="h-10 w-auto"
                onError={(e) => {
                  e.target.onerror = null;
                  e.target.src = "https://via.placeholder.com/40x40?text=KM";
                }}
              />
              <div className="ml-3">
                <h1 className="text-lg font-serif font-bold text-white">KARYA MUDA</h1>
                <p className="text-xs text-gray-300 uppercase tracking-wider">Sunan Drajat</p>
              </div>
            </Link>
            <p className="text-gray-400 mb-6">
              Karya Muda adalah platform donasi dan crowdfunding yang bertujuan untuk membantu program sosial, pendidikan, dan kesehatan bagi masyarakat yang membutuhkan.
            </p>
            <div className="flex space-x-4">
              <a href="http://Instagram.com/kmsdrajat" className="w-8 h-8 rounded-full bg-gray-700 flex items-center justify-center hover:bg-pink-600 transition-colors">
                <FaInstagram className="text-white" />
              </a>
              <a href="https://www.tiktok.com/@kmsdrajat" className="w-8 h-8 rounded-full bg-gray-700 flex items-center justify-center hover:bg-black transition-colors">
                <FaTiktok className="text-white" />
              </a>
            </div>
          </div>

          {/* Menu */}
          <div>
            <h3 className="text-lg font-semibold mb-4 border-b border-gray-700 pb-2">Menu</h3>
            <ul className="space-y-2">
              <li>
                <Link to="/" className="text-gray-400 hover:text-white transition-colors flex items-center">
                  <span className="w-1.5 h-1.5 bg-blue-500 rounded-full mr-2"></span>
                  Beranda
                </Link>
              </li>
              <li>
                <Link to="/program-reguler" className="text-gray-400 hover:text-white transition-colors flex items-center">
                  <span className="w-1.5 h-1.5 bg-blue-500 rounded-full mr-2"></span>
                  Program Reguler
                </Link>
              </li>
              <li>
                <Link to="/program-orang-tua-asuh" className="text-gray-400 hover:text-white transition-colors flex items-center">
                  <span className="w-1.5 h-1.5 bg-blue-500 rounded-full mr-2"></span>
                  Program Orang Tua Asuh
                </Link>
              </li>
              <li>
                <Link to="/implementasi-laporan" className="text-gray-400 hover:text-white transition-colors flex items-center">
                  <span className="w-1.5 h-1.5 bg-blue-500 rounded-full mr-2"></span>
                  Laporan
                </Link>
              </li>
              <li>
                <Link to="/daftar-donatur" className="text-gray-400 hover:text-white transition-colors flex items-center">
                  <span className="w-1.5 h-1.5 bg-blue-500 rounded-full mr-2"></span>
                  Daftar Donatur
                </Link>
              </li>
            </ul>
          </div>

          {/* Kontak */}
          <div>
            <h3 className="text-lg font-semibold mb-4 border-b border-gray-700 pb-2">Kontak</h3>
            <ul className="space-y-3">
              <li className="flex items-start">
                <FaMapMarkerAlt className="text-blue-500 mr-3 mt-1 flex-shrink-0" />
                <span className="text-gray-400">
                  Jl. Tugu Jaya Kp. Cibogo RT 01 RW 06 Desa Tugu Jaya Cigombong, Kab Bogor - Jawa Barat 16110.
                </span>
              </li>
              <li className="flex items-center">
                <FaEnvelope className="text-blue-500 mr-3 flex-shrink-0" />
                <a href="mailto:foundationkmsdrajat@gmail.com" className="text-gray-400 hover:text-white transition-colors">
                foundationkmsdrajat@gmail.com
                </a>
              </li>
              <li className="flex items-center">
                <FaPhone className="text-blue-500 mr-3 flex-shrink-0" />
                <a href="tel:+6282112547550" className="text-gray-400 hover:text-white transition-colors">
                  0821 1254 7550
                </a>
              </li>
              <li className="flex items-center">
                <FaWhatsapp className="text-blue-500 mr-3 flex-shrink-0" />
                <a href="https://wa.me/6282112547550" className="text-gray-400 hover:text-white transition-colors">
                  0821 1254 7550 (WhatsApp)
                </a>
              </li>
            </ul>
          </div>
        </div>
      </div>

      {/* Copyright */}
      <div className="bg-gray-950 py-4">
        <div className="container mx-auto px-4 flex flex-col sm:flex-row justify-between items-center">
          <p className="text-gray-500 text-sm mb-2 sm:mb-0">
            © {new Date().getFullYear()} Karya Muda. All Rights Reserved.
          </p>
          <div className="flex space-x-4">
            <Link to="/privacy-policy" className="text-gray-500 text-sm hover:text-gray-300">
              Kebijakan Privasi
            </Link>
            <Link to="/terms" className="text-gray-500 text-sm hover:text-gray-300">
              Syarat & Ketentuan
            </Link>
          </div>
        </div>
      </div>

      {/* Scroll to top button */}
      <div className="fixed bottom-6 right-6">
        <button 
          onClick={() => window.scrollTo({ top: 0, behavior: 'smooth' })}
          className="w-12 h-12 rounded-full bg-blue-600 text-white flex items-center justify-center shadow-lg hover:bg-blue-700 transition-colors"
          aria-label="Scroll to top"
        >
          <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 15l7-7 7 7" />
          </svg>
        </button>
      </div>
    </footer>
  );
};

export default Footer; 