import React, { useState, useEffect } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { Menu, X, Code2 } from 'lucide-react';

const Navbar = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const location = useLocation();

  useEffect(() => {
    const handleScroll = () => {
      if (window.scrollY > 20) {
        setScrolled(true);
      } else {
        setScrolled(false);
      }
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const navLinks = [
    { name: 'Home', path: '/' },
    { name: 'About', path: '/#about' },
    { name: 'Skills', path: '/#skills' },
    { name: 'Projects', path: '/#projects' },
    { name: 'Contact', path: '/#contact' },
  ];

  const handleNavClick = (hash) => {
    setIsOpen(false);
    if (location.pathname !== '/') return;
    const element = document.getElementById(hash.replace('/#', ''));
    if (element) {
      element.scrollIntoView({ behavior: 'smooth' });
    }
  };

  return (
    <nav
      style={{
        position: 'fixed',
        top: 0,
        left: 0,
        right: 0,
        zIndex: 1000,
        background: scrolled ? 'rgba(10, 10, 18, 0.85)' : 'transparent',
        backdropFilter: scrolled ? 'blur(10px)' : 'none',
        borderBottom: scrolled ? '1px solid rgba(255, 255, 255, 0.05)' : 'none',
        transition: 'all 0.3s ease',
        padding: scrolled ? '1rem 0' : '1.5rem 0',
      }}
    >
      <div className="container" style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
        <Link
          to="/"
          style={{
            display: 'flex',
            alignItems: 'center',
            gap: '10px',
            textDecoration: 'none',
            color: 'var(--text-main)',
            fontFamily: 'var(--font-primary)',
            fontSize: '1.4rem',
            fontWeight: 800,
            letterSpacing: '-0.5px',
          }}
        >
          <Code2 size={28} color="var(--primary)" />
          <span>JK<span style={{ color: 'var(--primary)' }}>.</span></span>
        </Link>

        {/* Desktop Navigation */}
        <div style={{ display: 'flex', gap: '2rem', alignItems: 'center' }} className="desktop-menu">
          {navLinks.map((link) => (
            <Link
              key={link.name}
              to={link.path}
              onClick={() => handleNavClick(link.path)}
              style={{
                textDecoration: 'none',
                color: location.pathname === '/' && link.path.startsWith('/#') ? 'var(--text-muted)' : 'var(--text-main)',
                fontSize: '0.95rem',
                fontWeight: 500,
                transition: 'var(--transition-smooth)',
              }}
              onMouseEnter={(e) => (e.target.style.color = 'var(--primary)')}
              onMouseLeave={(e) => (e.target.style.color = 'var(--text-main)')}
            >
              {link.name}
            </Link>
          ))}
          <Link to="/login" className="btn btn-secondary" style={{ padding: '0.5rem 1.2rem', fontSize: '0.9rem' }}>
            Admin Portal
          </Link>
        </div>

        {/* Mobile Menu Icon */}
        <div
          onClick={() => setIsOpen(!isOpen)}
          style={{ display: 'none', cursor: 'pointer', color: 'var(--text-main)' }}
          className="mobile-toggle"
        >
          {isOpen ? <X size={24} /> : <Menu size={24} />}
        </div>
      </div>

      {/* Mobile Menu Drawer */}
      {isOpen && (
        <div
          style={{
            position: 'absolute',
            top: '100%',
            left: 0,
            right: 0,
            background: 'var(--bg-secondary)',
            borderBottom: '1px solid var(--card-border)',
            padding: '2rem',
            display: 'flex',
            flexDirection: 'column',
            gap: '1.5rem',
          }}
        >
          {navLinks.map((link) => (
            <Link
              key={link.name}
              to={link.path}
              onClick={() => handleNavClick(link.path)}
              style={{
                textDecoration: 'none',
                color: 'var(--text-main)',
                fontSize: '1.1rem',
                fontWeight: 500,
              }}
            >
              {link.name}
            </Link>
          ))}
          <Link to="/login" onClick={() => setIsOpen(false)} className="btn btn-primary" style={{ alignSelf: 'flex-start' }}>
            Admin Portal
          </Link>
        </div>
      )}

      {/* Inline styles for hiding/showing desktop menu on mobile */}
      <style>{`
        @media (max-width: 768px) {
          .desktop-menu {
            display: none !important;
          }
          .mobile-toggle {
            display: block !important;
          }
        }
      `}</style>
    </nav>
  );
};

export default Navbar;
