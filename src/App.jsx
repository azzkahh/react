import { useState } from 'react'
import { motion } from 'framer-motion'
import { Routes, Route } from 'react-router-dom'
import Navbar from './components/Navbar'
import Hero from './components/Hero'
import AboutSection from './components/AboutSection'
import ProgramsSection from './components/ProgramsSection'
import DonateSection from './components/DonateSection'
import Footer from './components/Footer'
import ProgramReguler from './pages/ProgramReguler'
import ProgramOrangTuaAsuh from './pages/ProgramOrangTuaAsuh'
import ImplementasiLaporan from './pages/ImplementasiLaporan'

function HomePage() {
  return (
    <>
      <Hero />
      <AboutSection />
      <ProgramsSection />
      <DonateSection />
    </>
  )
}

function App() {
  return (
    <div className="min-h-screen flex flex-col">
      <Navbar />
      <Routes>
        <Route path="/" element={<HomePage />} />
        <Route path="/program-reguler" element={<ProgramReguler />} />
        <Route path="/program-orang-tua-asuh" element={<ProgramOrangTuaAsuh />} />
        <Route path="/implementasi-laporan" element={<ImplementasiLaporan />} />
      </Routes>
      <Footer />
    </div>
  )
}

export default App
