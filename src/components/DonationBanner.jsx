import { motion } from 'framer-motion';

const DonationBanner = () => {
  return (
    <div className="w-full relative overflow-hidden" style={{ height: '30px' }}>
      {/* Background image */}
      <div 
        className="absolute inset-0 bg-cover bg-center z-0"
        style={{ 
          backgroundImage: "url('https://source.unsplash.com/random/1600x900/?islamic,school,pesantren')", 
          filter: "brightness(0.7)"
        }}
      ></div>
      
      {/* Fallback background color in case image doesn't load */}
      <div className="absolute inset-0 bg-primary/70 z-0"></div>
    </div>
  );
};

export default DonationBanner; 