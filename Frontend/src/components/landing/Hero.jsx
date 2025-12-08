import React from 'react';
import { Link } from 'react-router-dom';
import heroImage from '../../assets/kanban.jpg';

const Hero = () => {
  return (
    <section id="header" className="relative min-h-screen flex items-center pt-8 overflow-hidden bg-[#6C5CE7]">
      <div className="container mx-auto px-4 relative z-10">
        <div className="grid lg:grid-cols-2 gap-12 items-center">
          {/* Text Content - Gauche */}
          <div className="text-white pl-8 w-4/5">
            <h1 className="text-5xl md:text-6xl lg:text-7xl font-bold mb-6 leading-tight">
              Booste ta productivité
            </h1>
            <p className="text-lg md:text-xl mb-8 leading-relaxed opacity-95">
              Facilitez la gestion de vos tâches, boostez votre productivité avec EasyTasks. 
              Organisez vos tâches, configurez des rappels, collaborez en toute fluidité, 
              visualisez vos données avec un dashboard. Gérez au mieux vos tâches et réalisez davantage.
            </p>
            <Link
              to="/register"
              className="inline-block px-10 py-4 bg-white text-[#6C5CE7] text-base font-bold rounded-full hover:bg-gray-100 transform hover:scale-105 transition-all duration-300 shadow-lg"
            >
              S'inscrire
            </Link>
          </div>

         
          <div className="mt-8 lg:mt-0">
            <div className="relative">
              <div className="bg-white/95 backdrop-blur-sm rounded-3xl p-8 shadow-2xl">
                <img 
                  src={heroImage}  
                  alt="EasyTasks Dashboard"
                  className="w-full h-auto rounded-2xl"
                />
              </div>
            </div>
          </div>
        </div>
      </div>

      
      <div className="absolute bottom-0 left-0 right-0">
        <svg
          className="w-full h-auto"
          preserveAspectRatio="none"
          viewBox="0 0 1440 120"
          xmlns="http://www.w3.org/2000/svg"
        >
          <path
            fill="#ffffff"
            d="M0,64L80,69.3C160,75,320,85,480,80C640,75,800,53,960,48C1120,43,1280,53,1360,58.7L1440,64L1440,120L1360,120C1280,120,1120,120,960,120C800,120,640,120,480,120C320,120,160,120,80,120L0,120Z"
          />
        </svg>
      </div>
    </section>
  );
};

export default Hero;