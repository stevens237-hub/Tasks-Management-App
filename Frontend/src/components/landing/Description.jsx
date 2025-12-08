import React from 'react';

const Description = () => {
  const steps = [
    {
      image: '../../images/description-1.png', 
      title: "Creation d'un tableau",
      description: "Il est facile de créer un tableau qui va contenir chacun de ses projets, ses tâches, ses idées ou tout ce que vous souhaitez organiser."
    },
    {
      image: '../../images/description-2.png',
      title: 'Creation des listes',
      description: "Les listes sont des sections verticales à l'intérieur d'un tableau qui permettent de diviser votre tableau en différentes catégories, phases ou étapes d'un projet."
    },
    {
      image: '../../images/description-3.png',
      title: 'Creation des tâches',
      description: "Une tâche représente une idée, un élément à gérer ou un sujet à traiter. C'est l'unité de base pour organiser et gérer votre travail."
    }
  ];

  return (
    <section id="description" className="py-20 bg-white">
      <div className="container mx-auto px-4">
        {/* Section Header */}
        <div className="text-center mb-16">
            <div className="inline-block px-4 py-2 bg-[#5f4dee]/10 rounded-full mb-4">
                <p className="text-[#5f4dee] text-xs font-bold uppercase tracking-wider">
                    DESCRIPTION
                </p>
            </div>
          
          <h2 className="text-4xl md:text-5xl font-bold text-gray-900">
            Comment ça marche?
          </h2>
        </div>

        {/* Cards Grid */}
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-12 max-w-6xl mx-auto">
          {steps.map((step, index) => (
            <div
              key={index}
              className="text-center"
            >
              {/* Image */}
              <div className="mb-6 flex justify-center">
                <img 
                  src={step.image}
                  alt={step.title}
                  className="w-64 h-auto"
                />
              </div>
              
              {/* Title */}
              <h4 className="text-xl md:text-2xl font-bold text-gray-900 mb-4">
                {step.title}
              </h4>
              
              {/* Description */}
              <p className="text-gray-600 leading-relaxed text-base">
                {step.description}
              </p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default Description;
