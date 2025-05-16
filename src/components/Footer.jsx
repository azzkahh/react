import { FaFacebook, FaTwitter, FaInstagram, FaEnvelope, FaPhone, FaMapMarkerAlt } from 'react-icons/fa';

const Footer = () => {
  const currentYear = new Date().getFullYear();

  return (
    <footer id="implementation" className="bg-primary text-white">
      {/* Top Wave */}
      <div className="overflow-hidden leading-none">
        <svg
          xmlns="http://www.w3.org/2000/svg"
          viewBox="0 0 1200 120"
          preserveAspectRatio="none"
          className="w-full h-16 text-white"
        >
          <path
            d="M321.39,56.44c58-10.79,114.16-30.13,172-41.86,82.39-16.72,168.19-17.73,250.45-.39C823.78,31,906.67,72,985.66,92.83c70.05,18.48,146.53,26.09,214.34,3V120H0V0C0,0,0,32,0,48C0,67.52,22.75,74.55,48.51,77.32,108.71,84.43,187.93,67.08,252,49.9,293.09,39.24,280.88,55.59,321.39,56.44Z"
            className="fill-white"
          ></path>
        </svg>
      </div>

      <div className="container mx-auto px-4 pt-12 pb-8">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
          {/* Logo and Info */}
          <div className="md:col-span-1">
            <div className="flex items-center mb-4">
              <img
                src="/logo-white.svg"
                alt="Karya Muda Logo"
                className="h-12 w-auto mr-3"
                onError={(e) => {
                  e.target.onerror = null;
                  e.target.src = "https://via.placeholder.com/48x48?text=KM";
                }}
              />
              <div>
                <h2 className="text-xl font-serif font-bold">KARYA MUDA</h2>
                <p className="text-xs text-gray-300 uppercase tracking-wider">Bunian Drajat</p>
              </div>
            </div>
            <p className="text-gray-300 mb-6">
              Membangun masa depan berkelanjutan dan mengembangkan potensi komunitas 
              melalui pendekatan inovatif yang harmonis dengan alam.
            </p>
            <div className="flex space-x-4">
              <a 
                href="#" 
                className="bg-white/10 hover:bg-white/20 h-10 w-10 rounded-full flex items-center justify-center transition-colors"
                aria-label="Facebook"
              >
                <FaFacebook />
              </a>
              <a 
                href="#" 
                className="bg-white/10 hover:bg-white/20 h-10 w-10 rounded-full flex items-center justify-center transition-colors"
                aria-label="Twitter"
              >
                <FaTwitter />
              </a>
              <a 
                href="#" 
                className="bg-white/10 hover:bg-white/20 h-10 w-10 rounded-full flex items-center justify-center transition-colors"
                aria-label="Instagram"
              >
                <FaInstagram />
              </a>
            </div>
          </div>

          {/* Quick Links */}
          <div className="md:col-span-1">
            <h3 className="text-lg font-bold mb-4">Tautan Cepat</h3>
            <ul className="space-y-2">
              <li>
                <a href="#" className="text-gray-300 hover:text-white transition-colors">
                  Main Menu / Yayasan
                </a>
              </li>
              <li>
                <a href="#programs" className="text-gray-300 hover:text-white transition-colors">
                  Program Kami
                </a>
              </li>
              <li>
                <a href="#donate" className="text-gray-300 hover:text-white transition-colors">
                  Daftar Donatur
                </a>
              </li>
              <li>
                <a href="/implementasi-laporan" className="text-gray-300 hover:text-white transition-colors">
                  Implementasi / Laporan
                </a>
              </li>
              <li>
                <a href="#" className="text-gray-300 hover:text-white transition-colors">
                  Galeri Kegiatan
                </a>
              </li>
              <li>
                <a href="#" className="text-gray-300 hover:text-white transition-colors">
                  Tentang Kami
                </a>
              </li>
            </ul>
          </div>

          {/* Programs */}
          <div className="md:col-span-1">
            <h3 className="text-lg font-bold mb-4">Program Kami</h3>
            <ul className="space-y-2">
              <li>
                <a href="#programs" className="text-gray-300 hover:text-white transition-colors">
                  Pertanian Organik
                </a>
              </li>
              <li>
                <a href="#programs" className="text-gray-300 hover:text-white transition-colors">
                  Pendidikan Lingkungan
                </a>
              </li>
              <li>
                <a href="#programs" className="text-gray-300 hover:text-white transition-colors">
                  Rumah Berkelanjutan
                </a>
              </li>
              <li>
                <a href="#programs" className="text-gray-300 hover:text-white transition-colors">
                  Daur Ulang Kreatif
                </a>
              </li>
              <li>
                <a href="#programs" className="text-gray-300 hover:text-white transition-colors">
                  Kewirausahaan Sosial
                </a>
              </li>
            </ul>
          </div>

          {/* Contact Info */}
          <div className="md:col-span-1">
            <h3 className="text-lg font-bold mb-4">Hubungi Kami</h3>
            <ul className="space-y-4">
              <li className="flex items-start">
                <FaMapMarkerAlt className="mt-1 mr-3 flex-shrink-0" />
                <span>Jl. Bunian Drajat No. 123, Bogor, Jawa Barat, Indonesia</span>
              </li>
              <li className="flex items-center">
                <FaPhone className="mr-3 flex-shrink-0" />
                <span>+62 123 4567 890</span>
              </li>
              <li className="flex items-center">
                <FaEnvelope className="mr-3 flex-shrink-0" />
                <span>info@karyamuda.org</span>
              </li>
            </ul>
          </div>
        </div>

        <div className="border-t border-white/20 mt-12 pt-8 text-center text-gray-300">
          <p>© {currentYear} Yayasan Karya Muda Bunian Drajat. Hak Cipta Dilindungi.</p>
        </div>
      </div>
    </footer>
  );
};

export default Footer; 