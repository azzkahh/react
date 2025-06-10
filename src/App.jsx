import { useState } from 'react'
import { motion } from 'framer-motion'
import { Routes, Route } from 'react-router-dom'
import Navbar from './components/Navbar'
import Hero from './components/Hero'
import AboutSection from './components/AboutSection'
import ProgramsSection from './components/ProgramsSection'
import ProgramInfo from './components/ProgramInfo'
import Footer from './components/Footer'
import ProgramReguler from './pages/ProgramReguler'
import ProgramOrangTuaAsuh from './pages/ProgramOrangTuaAsuh'
import ImplementasiLaporan from './pages/ImplementasiLaporan'
import DonorListPage from './pages/DonorListPage'
import DonationProgramDetail from './pages/donations/DonationProgramDetail'

// Admin imports
import AdminLayout from './components/AdminLayout'
import AdminLogin from './pages/AdminLogin'
import Dashboard from './pages/admin/Dashboard'
import DonaturPage from './pages/admin/DonaturPage'
import ProgramPage from './pages/admin/ProgramPage'
import LaporanPage from './pages/admin/LaporanPage'

function HomePage() {
  return (
    <>
      <Hero />
      <ProgramInfo />
      <AboutSection />
      <ProgramsSection />
    </>
  )
}

function App() {
  return (
    <div className="min-h-screen flex flex-col">
      <Routes>
        {/* Admin Routes */}
        <Route path="/admin/login" element={<AdminLogin />} />
        <Route path="/admin" element={<AdminLayout />}>
          <Route path="dashboard" element={<Dashboard />} />
          <Route path="donatur" element={<DonaturPage />} />
          <Route path="program" element={<ProgramPage />} />
          <Route path="laporan" element={<LaporanPage />} />
          <Route index element={<Dashboard />} />
        </Route>
        
        {/* Public Routes */}
        <Route path="*" element={
          <>
            <Navbar />
            <Routes>
              <Route path="/" element={<HomePage />} />
              <Route path="/program-reguler" element={<ProgramReguler />} />
              <Route path="/program-orang-tua-asuh" element={<ProgramOrangTuaAsuh />} />
              <Route path="/implementasi-laporan" element={<ImplementasiLaporan />} />
              <Route path="/daftar-donatur" element={<DonorListPage />} />
              <Route path="/program-donasi/:programId" element={<DonationProgramDetail />} />
            </Routes>
            <Footer />
          </>
        } />
      </Routes>
    </div>
  )
}

export default App
