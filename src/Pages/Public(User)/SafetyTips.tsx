import { Shield, AlertTriangle, Smartphone, Car, Home, Globe } from 'lucide-react';

interface SafetyTip {
  category: string;
  icon: React.ReactNode;
  tips: string[];
}

const SafetyTips = () => {
  const safetyTips: SafetyTip[] = [
    {
      category: "Emergency Preparedness",
      icon: <AlertTriangle className="h-6 w-6 text-red-500" />,
      tips: [
        "Keep emergency numbers saved on your phone",
        "Create a family emergency plan",
        "Keep a first-aid kit readily available",
        "Learn basic self-defense techniques",
        "Store emergency contacts in easily accessible places"
      ]
    },
    {
      category: "Personal Safety",
      icon: <Shield className="h-6 w-6 text-blue-500" />,
      tips: [
        "Stay aware of your surroundings at all times",
        "Walk confidently and stay in well-lit areas",
        "Trust your instincts if a situation feels unsafe",
        "Share your location with trusted contacts",
        "Avoid walking alone at night when possible"
      ]
    },
    {
      category: "Digital Safety",
      icon: <Smartphone className="h-6 w-6 text-purple-500" />,
      tips: [
        "Use strong, unique passwords for all accounts",
        "Enable two-factor authentication",
        "Be careful what you share on social media",
        "Keep your software and apps updated",
        "Don't click on suspicious links or downloads"
      ]
    },
    {
      category: "Travel Safety",
      icon: <Car className="h-6 w-6 text-green-500" />,
      tips: [
        "Research your destination beforehand",
        "Keep important documents secure",
        "Share your itinerary with trusted contacts",
        "Use reputable transportation services",
        "Keep emergency cash in separate places"
      ]
    },
    {
      category: "Home Security",
      icon: <Home className="h-6 w-6 text-orange-500" />,
      tips: [
        "Install proper locks on all doors and windows",
        "Keep emergency exits clear",
        "Install security cameras or doorbell cameras",
        "Know your neighbors and build a community watch",
        "Keep exterior areas well-lit"
      ]
    }
  ];

  return (
    <div className="min-h-screen bg-gray-50 py-8 px-4 sm:px-6 lg:px-8">
      <div className="max-w-4xl mx-auto">
        <div className="text-center mb-12">
          <h1 className="text-3xl font-bold text-gray-900 mb-4">Safety Tips</h1>
          <p className="text-lg text-gray-600">
            Essential guidelines to help keep you safe in various situations
          </p>
        </div>

        <div className="space-y-8">
          {safetyTips.map((section, index) => (
            <div 
              key={index}
              className="bg-white rounded-lg shadow-md overflow-hidden hover:shadow-lg transition-shadow duration-300"
            >
              <div className="p-6">
                <div className="flex items-center gap-3 mb-4">
                  {section.icon}
                  <h2 className="text-xl font-semibold text-gray-900">
                    {section.category}
                  </h2>
                </div>
                <ul className="space-y-3">
                  {section.tips.map((tip, tipIndex) => (
                    <li 
                      key={tipIndex}
                      className="flex items-start gap-2 text-gray-700"
                    >
                      <span className="text-indigo-500 font-bold">•</span>
                      {tip}
                    </li>
                  ))}
                </ul>
              </div>
            </div>
          ))}
        </div>

        <div className="mt-12 text-center text-gray-600">
          <p className="text-sm">
            Remember: These are general safety guidelines. Always use your best judgment 
            and contact emergency services when in doubt.
          </p>
        </div>
      </div>
    </div>
  );
};

export default SafetyTips;