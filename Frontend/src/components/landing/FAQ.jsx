import React, { useState } from 'react';

const FAQ = () => {
  const [openIndex, setOpenIndex] = useState(null);

  const faqs = [
    {
      question: "Que peut faire EasyTasks pour moi?",
      answer: "EasyTasks est une application de gestion des tâches puissante qui vous permet d'organiser vos tâches, de définir des rappels, de collaborer avec votre équipe, de suivre vos objectifs et d'obtenir des informations précieuses sur votre productivité."
    },
    {
      question: "Pourrais-je partager mes tâches avec mon équipe ou d'autres utilisateurs?",
      answer: "De par son intuitivité et sa convivialité, EasyTasks rend la collaboration ou le partage des tâches rapide et facile."
    },
    {
      question: "Quels sont les points forts de EasyTasks?",
      answer: "En plus de la gestion facile des tâches, EasyTasks propose également la visualisation à travers un tableau de bord de ses tâches complètes, en cours ou à venir et consulter les statistiques sur sa productivité."
    },
    {
      question: "EasyTasks est-elle disponible sur plusieurs appareils?",
      answer: "EasyTasks étant uniquement une application web pour le moment et donc pas encore disponible sur version mobile, est accessible sur tout appareil ayant accès à internet et désirant utiliser l'application."
    }
  ];

  const toggleFAQ = (index) => {
    setOpenIndex(openIndex === index ? null : index);
  };

  return (
    <section id="faq" className="py-20 bg-gray-60">
      <div className="container mx-auto px-4">
        {/* Section Header */}
        <div className="text-center mb-16">
          <div className="inline-block px-4 py-2 bg-[#5f4dee]/10 rounded-full mb-4">
            <p className="text-[#5f4dee] text-xs font-bold uppercase tracking-wider">QUESTIONS</p>
          </div>
          <h2 className="text-3xl md:text-4xl font-bold text-gray-900">
            FAQ'S
          </h2>
        </div>

        {/* FAQ Items */}
        <div className="max-w-3xl mx-auto space-y-4">
          {faqs.map((faq, index) => (
            <div
              key={index}
              className="bg-white rounded-xl shadow-md overflow-hidden transition-all duration-300 hover:shadow-lg"
            >
              <button
                onClick={() => toggleFAQ(index)}
                className="w-full px-6 py-5 flex items-center justify-between text-left focus:outline-none group"
              >
                <span className="text-lg font-semibold text-gray-900 group-hover:text-[#5f4dee] transition-colors pr-4">
                  {faq.question}
                </span>
                <svg
                  className={`w-6 h-6 text-[#5f4dee] flex-shrink-0 transform transition-transform duration-300 ${
                    openIndex === index ? 'rotate-180' : ''
                  }`}
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M19 9l-7 7-7-7"
                  />
                </svg>
              </button>

              <div
                className={`overflow-hidden transition-all duration-300 ${
                  openIndex === index ? 'max-h-96 opacity-100' : 'max-h-0 opacity-0'
                }`}
              >
                <div className="px-6 pb-5 pt-2">
                  <p className="text-gray-600 leading-relaxed">
                    {faq.answer}
                  </p>
                </div>
              </div>
            </div>
          ))}
        </div>

        {/* Contact CTA */}
        <div className="text-center mt-12">
          <p className="text-gray-600 mb-4">
            Vous avez d'autres questions?
          </p>
          <a
            href="#footer"
            className="inline-block px-8 py-3 border-2 border-[#5f4dee] text-[#5f4dee] text-base font-bold rounded-full hover:bg-[#5f4dee] hover:text-white transition-all duration-300"
          >
            Contactez-nous
          </a>
        </div>
      </div>
    </section>
  );
};

export default FAQ;