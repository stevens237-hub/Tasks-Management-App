import React, { useState } from 'react';

const Testimonials = () => {
  const [currentIndex, setCurrentIndex] = useState(0);

  const testimonials = [
    {
      text: "EasyTasks a transformé la façon dont notre équipe travaille ensemble. La collaboration est désormais fluide et productive. C'est un outil indispensable!",
      author: "Steve MBODA",
      role: "Chef de Projet",
      company: "TechCorp"
    },
    {
      text: "Interface intuitive et fonctionnalités puissantes. J'ai doublé ma productivité depuis que j'utilise EasyTasks. Je le recommande à tous mes collègues!",
      author: "Lionel MESSI",
      role: "Développeur Senior",
      company: "WebAgency"
    },
    {
      text: "La meilleure application de gestion de tâches que j'ai utilisée. Simple, efficace et magnifiquement conçue. Mon équipe l'adore!",
      author: "Killian MBAPPÉ",
      role: "Directrice Marketing",
      company: "StartupPro"
    }
  ];

  const nextSlide = () => {
    setCurrentIndex((prevIndex) =>
      prevIndex === testimonials.length - 1 ? 0 : prevIndex + 1
    );
  };

  const prevSlide = () => {
    setCurrentIndex((prevIndex) =>
      prevIndex === 0 ? testimonials.length - 1 : prevIndex - 1
    );
  };

  return (
    <section id="testimonial" className="py-20 bg-white">
      <div className="container mx-auto px-4">
        {/* Section Header */}
        <div className="text-center mb-16">
          <div className="inline-block px-4 py-2 bg-[#5f4dee]/10 rounded-full mb-4">
            <p className="text-[#5f4dee] text-xs font-bold uppercase tracking-wider">TÉMOIGNAGES</p>
          </div>
          <h2 className="text-3xl md:text-4xl font-bold text-gray-900">
            Ce que disent nos utilisateurs
          </h2>
        </div>

        {/* Slider */}
        <div className="max-w-4xl mx-auto relative">
          <div className="bg-gray-50 rounded-2xl p-8 md:p-12 shadow-xl">
            {/* Quote Icon */}
            <div className="text-[#5f4dee] mb-6">
              <svg className="w-12 h-12 opacity-50" fill="currentColor" viewBox="0 0 24 24">
                <path d="M14.017 21v-7.391c0-5.704 3.731-9.57 8.983-10.609l.995 2.151c-2.432.917-3.995 3.638-3.995 5.849h4v10h-9.983zm-14.017 0v-7.391c0-5.704 3.748-9.57 9-10.609l.996 2.151c-2.433.917-3.996 3.638-3.996 5.849h3.983v10h-9.983z" />
              </svg>
            </div>

            {/* Testimonial Content */}
            <div className="min-h-[200px]">
              <p className="text-xl md:text-2xl text-gray-700 italic mb-8 leading-relaxed">
                "{testimonials[currentIndex].text}"
              </p>

              <div className="flex items-center">
                <div className="w-16 h-16 bg-[#5f4dee] rounded-full flex items-center justify-center text-white text-2xl font-bold mr-4">
                  {testimonials[currentIndex].author.charAt(0)}
                </div>
                <div>
                  <p className="font-bold text-gray-900 text-lg">
                    {testimonials[currentIndex].author}
                  </p>
                  <p className="text-gray-600">
                    {testimonials[currentIndex].role} - {testimonials[currentIndex].company}
                  </p>
                </div>
              </div>
            </div>
          </div>

          {/* Navigation Buttons */}
          <button
            onClick={prevSlide}
            className="absolute left-0 top-1/2 -translate-y-1/2 -translate-x-4 md:-translate-x-16 bg-white w-12 h-12 rounded-full shadow-lg hover:shadow-xl flex items-center justify-center text-[#5f4dee] hover:bg-[#5f4dee] hover:text-white transition-all duration-300 focus:outline-none"
            aria-label="Previous testimonial"
          >
            <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
            </svg>
          </button>

          <button
            onClick={nextSlide}
            className="absolute right-0 top-1/2 -translate-y-1/2 translate-x-4 md:translate-x-16 bg-white w-12 h-12 rounded-full shadow-lg hover:shadow-xl flex items-center justify-center text-[#5f4dee] hover:bg-[#5f4dee] hover:text-white transition-all duration-300 focus:outline-none"
            aria-label="Next testimonial"
          >
            <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
            </svg>
          </button>

          {/* Dots Indicator */}
          <div className="flex justify-center mt-8 space-x-2">
            {testimonials.map((_, index) => (
              <button
                key={index}
                onClick={() => setCurrentIndex(index)}
                className={`w-3 h-3 rounded-full transition-all duration-300 focus:outline-none ${
                  index === currentIndex
                    ? 'bg-[#5f4dee] w-8'
                    : 'bg-gray-300 hover:bg-gray-400'
                }`}
                aria-label={`Go to testimonial ${index + 1}`}
              />
            ))}
          </div>
        </div>
      </div>
    </section>
  );
};

export default Testimonials;