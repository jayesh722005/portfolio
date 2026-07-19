import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Navbar from './components/Navbar';
import Footer from './components/Footer';
import Home from './pages/Home';
import Login from './pages/Login';
import AdminDashboard from './pages/AdminDashboard';
import AdminRoute from './components/AdminRoute';
import FloatingParticles from './components/FloatingParticles';

function App() {
  return (
    <Router>
      <div style={{ display: 'flex', flexDirection: 'column', minHeight: '100vh', background: 'var(--bg-primary)', position: 'relative', overflow: 'hidden' }}>
        {/* Animated Background Elements */}
        <FloatingParticles />
        <div className="glowing-orb-1"></div>
        <div className="glowing-orb-2"></div>
        <div className="glowing-orb-3"></div>

        <Navbar />
        
        <main style={{ flexGrow: 1, position: 'relative', zIndex: 1 }}>
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/login" element={<Login />} />
            <Route 
              path="/admin" 
              element={
                <AdminRoute>
                  <AdminDashboard />
                </AdminRoute>
              } 
            />
          </Routes>
        </main>

        <Footer style={{ zIndex: 1 }} />
      </div>
    </Router>
  );
}

export default App;
