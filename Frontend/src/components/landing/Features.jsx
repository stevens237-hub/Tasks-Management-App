import React, { useState } from 'react';

const Features = () => {
  const [activeTab, setActiveTab] = useState('gestion');
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [selectedFeature, setSelectedFeature] = useState(null);

  const tabs = [
    {
      id: 'gestion',
      label: 'Gestion des tâches',
      icon: (
        <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5H7a2 2 0 00-2 2v12a2 2 0 002 2h10a2 2 0 002-2V7a2 2 0 00-2-2h-2M9 5a2 2 0 002 2h2a2 2 0 002-2M9 5a2 2 0 012-2h2a2 2 0 012 2m-6 9l2 2 4-4" />
        </svg>
      )
    },
    {
      id: 'collaboration',
      label: 'Collaboration',
      icon: (
        <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 20h5v-2a3 3 0 00-5.356-1.857M17 20H7m10 0v-2c0-.656-.126-1.283-.356-1.857M7 20H2v-2a3 3 0 015.356-1.857M7 20v-2c0-.656.126-1.283.356-1.857m0 0a5.002 5.002 0 019.288 0M15 7a3 3 0 11-6 0 3 3 0 016 0zm6 3a2 2 0 11-4 0 2 2 0 014 0zM7 10a2 2 0 11-4 0 2 2 0 014 0z" />
        </svg>
      )
    },
    {
      id: 'visualisation',
      label: 'Visualisation',
      icon: (
        <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 19v-6a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2a2 2 0 002-2zm0 0V9a2 2 0 012-2h2a2 2 0 012 2v10m-6 0a2 2 0 002 2h2a2 2 0 002-2m0 0V5a2 2 0 012-2h2a2 2 0 012 2v14a2 2 0 01-2 2h-2a2 2 0 01-2-2z" />
        </svg>
      )
    }
  ];

  const features = {
    gestion: {
      title: 'Creation et Gestion des tâches plus facile que jamais',
      description: "Oubliez les post-it et les listes interminables ! Avec EasyTasks, la gestion de vos tâches devient un jeu d'enfant. Créez des tâches en un clin d'œil, organisez-les en projets, définissez des priorités et des échéances, et suivez leur progression en temps réel. Tâche facile vous offre une interface intuitive et puissante pour vous aider à garder le contrôle de votre quotidien et à atteindre vos objectifs avec efficacité.",
      image: '../../images/features-1.png',
      details: {
        title: 'Gestion de tâches',
        description: 'EasyTasks vous aide à gérer votre quotidien et à atteindre vos objectifs avec efficacité de part son interface intuitive et ses fonctionnalités de gestion puissantes et efficaces comme:',
        items: [
          "Création des tâches en un clin d'oeil",
          "Description des tâches",
          "Priorisation",
          "Définition des echéances et des rappels",
          "Attribution des étiquettes"
        ]
      }
    },
    collaboration: {
      title: 'Collaboration en équipe simplifiée',
      description: "Travaillez ensemble sans effort avec EasyTasks. Partagez vos projets, assignez des tâches aux membres de l'équipe, communiquez en temps réel et suivez les progrès collectivement. Notre plateforme facilite la coordination et améliore la productivité de toute votre équipe.",
      image: '../../images/features-2.png',
      details: {
        title: 'Collaboration',
        description: 'Travaillez en équipe de manière fluide et efficace avec:',
        items: [
          "Partage de projets et tableaux",
          "Attribution de tâches aux membres",
          "Commentaires et mentions",
          "Notifications en temps réel",
          "Gestion des permissions"
        ]
      }
    },
    visualisation: {
      title: 'Visualisez votre productivité',
      description: "Suivez vos progrès avec des tableaux de bord intuitifs et des graphiques détaillés. EasyTasks vous offre une vue complète de votre productivité avec des statistiques en temps réel, des rapports personnalisables et des indicateurs de performance pour vous aider à optimiser votre travail.",
      image: '../../images/features-3.png',
      details: {
        title: 'Visualisation',
        description: 'Analysez votre productivité avec des outils de visualisation puissants:',
        items: [
          "Tableaux de bord personnalisables",
          "Graphiques de progression",
          "Statistiques en temps réel",
          "Rapports d'activité",
          "Vue Kanban et calendrier"
        ]
      }
    }
  };

  const currentFeature = features[activeTab];

  const handleDetailsClick = () => {
    setSelectedFeature(currentFeature.details);
    setIsModalOpen(true);
  };

  return (
    <>
      <section id="features" className="py-20 bg-gray-60">
        <div className="container mx-auto px-4">
          {/* Section Header */}
          <div className="text-center mb-12">
            <div className="inline-block px-4 py-2 bg-[#5f4dee]/10 rounded-full mb-4">
                <p className="text-[#5f4dee] text-xs font-bold uppercase tracking-wider">
                    FEATURES
                </p>
            </div>
            <h2 className="text-4xl md:text-5xl font-bold text-gray-900 mb-4">
              Fonctionnalités
            </h2>
            <p className="text-lg text-gray-600 max-w-3xl mx-auto">
              Avec EasyTask, vous pouvez enfin dire adieu au chaos et vous concentrer sur ce qui compte vraiment
            </p>
          </div>

          {/* Tabs */}
          <div className="flex justify-center mb-12">
            <div className="inline-flex bg-white rounded-lg shadow-md p-2 gap-2">
              {tabs.map((tab) => (
                <button
                  key={tab.id}
                  onClick={() => setActiveTab(tab.id)}
                  className={`flex items-center gap-2 px-6 py-3 rounded-lg font-semibold transition-all duration-300 ${
                    activeTab === tab.id
                      ? 'bg-[#6C5CE7] text-white shadow-lg'
                      : 'text-gray-600 hover:bg-gray-100'
                  }`}
                >
                  {tab.icon}
                  <span>{tab.label}</span>
                </button>
              ))}
            </div>
          </div>

          {/* Content */}
          <div className="max-w-6xl mx-auto">
            <div className="grid lg:grid-cols-2 gap-12 items-center">
              {/* Image Preview */}
              <div className="order-2 lg:order-1">
                <div className="bg-white rounded-2xl shadow-xl p-8">
                  <img 
                    src={currentFeature.image}
                    alt={currentFeature.title}
                    className="w-full h-auto rounded-lg"
                  />
                </div>
              </div>

              {/* Text Content */}
              <div className="order-1 lg:order-2">
                <h3 className="text-3xl md:text-4xl font-bold text-gray-900 mb-6">
                  {currentFeature.title}
                </h3>
                <p className="text-gray-600 text-lg leading-relaxed mb-8">
                  {currentFeature.description}
                </p>
                <button
                  onClick={handleDetailsClick}
                  className="px-8 py-4 bg-[#6C5CE7] text-white font-bold rounded-full hover:bg-[#5B4ADB] transform hover:scale-105 transition-all duration-300 shadow-lg"
                >
                  Détails
                </button>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Modal */}
      {isModalOpen && (
        <div 
          className="fixed inset-0 bg-black/50 backdrop-blur-sm z-50 flex items-center justify-center p-4"
          onClick={() => setIsModalOpen(false)}
        >
          <div 
            className="bg-white rounded-3xl max-w-5xl w-full max-h-[90vh] overflow-y-auto shadow-2xl"
            onClick={(e) => e.stopPropagation()}
          >
            {/* Close Button */}
            <button
              onClick={() => setIsModalOpen(false)}
              className="absolute top-6 right-6 text-gray-400 hover:text-gray-600 transition-colors"
            >
              <svg className="w-8 h-8" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
              </svg>
            </button>

            <div className="grid lg:grid-cols-2 gap-8 p-8 lg:p-12">
              {/* Left - Image */}
              <div className="bg-gray-100 rounded-2xl p-8">
                <img 
                  src="../../images/features-1.png"
                  alt="Feature details"
                  className="w-full h-auto"
                />
              </div>

              {/* Right - Content */}
              <div>
                <h3 className="text-3xl font-bold text-gray-900 mb-2">
                  {selectedFeature?.title}
                </h3>
                <div className="w-16 h-1 bg-[#6C5CE7] mb-6"></div>

                <p className="text-gray-600 mb-8 leading-relaxed">
                  {selectedFeature?.description}
                </p>

                <ul className="space-y-4 mb-8">
                  {selectedFeature?.items.map((item, index) => (
                    <li key={index} className="flex items-start gap-3">
                      <div className="w-2 h-2 bg-[#6C5CE7] rounded-full mt-2 flex-shrink-0"></div>
                      <span className="text-gray-700">{item}</span>
                    </li>
                  ))}
                </ul>

                <div className="flex gap-4">
                  <button
                    onClick={() => setIsModalOpen(false)}
                    className="px-8 py-3 bg-[#6C5CE7] text-white font-bold rounded-full hover:bg-[#5B4ADB] transition-all duration-300"
                  >
                    SIGN UP
                  </button>
                  <button
                    onClick={() => setIsModalOpen(false)}
                    className="px-8 py-3 border-2 border-[#6C5CE7] text-[#6C5CE7] font-bold rounded-full hover:bg-[#6C5CE7] hover:text-white transition-all duration-300"
                  >
                    BACK
                  </button>
                </div>
              </div>
            </div>
          </div>
        </div>
      )}
    </>
  );
};

export default Features;