import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';

const Navbar = ({ scrollToSection }) => {
  const [isScrolled, setIsScrolled] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      if (window.scrollY > 60) {
        setIsScrolled(true);
      } else {
        setIsScrolled(false);
      }
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const navLinks = [
    { label: 'HOME', href: 'header' },
    { label: 'DESCRIPTION', href: 'description' },
    { label: 'FONCTIONNALITÉS', href: 'features' },
    { label: 'TÉMOIGNAGES', href: 'testimonial' }
  ];

  const handleNavClick = (href) => {
    scrollToSection(href);
    setIsMobileMenuOpen(false);
  };

  return (
    <nav
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
        isScrolled
        ? 'bg-[#5B4ADB] shadow-lg py-4'  
        : 'bg-[#6C5CE7] py-6'             
    }`}
    >
      <div className="container mx-auto px-4">
        <div className="flex items-center justify-between">
          {/* Logo */}
          <Link
            to="/"
            className="text-white text-3xl font-bold tracking-tight hover:opacity-90 transition-opacity"
          >
            EasyTasks
          </Link>

          {/* Desktop Menu */}
          <div className="hidden lg:flex items-center space-x-8">
            <ul className="flex items-center space-x-6">
              {navLinks.map((link) => (
                <li key={link.href}>
                  <button
                    onClick={() => handleNavClick(link.href)}
                    className="text-white text-base font-semibold cursor-pointer"
                  >
                    {link.label}
                  </button>
                </li>
              ))}
            </ul>
            <Link
              to="/login"
              className="px-6 py-2.5 border-2 border-white rounded-full text-white text-sm font-bold hover:bg-white hover:text-[#5f4dee] transition-all duration-300"
            >
              SE CONNECTER
            </Link>
          </div>

          {/* Mobile Menu Button */}
          <button
            onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
            className="lg:hidden text-white p-2 focus:outline-none"
            aria-label="Toggle menu"
          >
            {isMobileMenuOpen ? (
              <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
              </svg>
            ) : (
              <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h16" />
              </svg>
            )}
          </button>
        </div>

        {/* Mobile Menu */}
        {isMobileMenuOpen && (
          <div className="lg:hidden mt-4 pb-4 border-t border-gray-700 pt-4">
            <ul className="space-y-3">
              {navLinks.map((link) => (
                <li key={link.href}>
                  <button
                    onClick={() => handleNavClick(link.href)}
                    className="block w-full text-left text-white text-sm font-semibold hover:text-[#5f4dee] transition-colors duration-300 py-2"
                  >
                    {link.label}
                  </button>
                </li>
              ))}
              <li>
                <Link
                  to="/login"
                  className="block text-center px-6 py-2.5 border-2 border-white rounded-full text-white text-sm font-bold hover:bg-white hover:text-[#5f4dee] transition-all duration-300 mt-4"
                >
                  SE CONNECTER
                </Link>
              </li>
            </ul>
          </div>
        )}
      </div>
    </nav>
  );
};

export default Navbar;