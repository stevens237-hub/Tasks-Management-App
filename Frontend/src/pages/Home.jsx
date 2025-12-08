import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import Navbar from '../components/landing/Navbar';
import Hero from '../components/landing/Hero';
import Description from '../components/landing/Description';
import Features from '../components/landing/Features';
import Testimonials from '../components/landing/Testimonials';
import FAQ from '../components/landing/FAQ';
import Footer from '../components/landing/Footer';
import Preloader from '../components/landing/Preloader';

const Home = () => {
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    // Simulate preloader
    const timer = setTimeout(() => {
      setLoading(false);
    }, 1000);

    return () => clearTimeout(timer);
  }, []);

  // Smooth scroll function
  const scrollToSection = (sectionId) => {
    const element = document.getElementById(sectionId);
    if (element) {
      element.scrollIntoView({ behavior: 'smooth', block: 'start' });
    }
  };

  if (loading) {
    return <Preloader />;
  }

  return (
    <div className="relative w-full">
      <Navbar scrollToSection={scrollToSection} />
      <Hero />
      <Description />
      <Features />
      <Testimonials />
      <FAQ />
      <Footer />
    </div>
  );
};

export default Home;