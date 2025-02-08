import React from "react";
import {
  Users,
  MessageSquarePlus,
  School,
  ShieldCheck,
  BadgeCheck,
} from "lucide-react"; // Import Lucide Icons

function HomePage() {
  const focusAreas = [
    {
      title: "Enhanced Communication",
      description:
        "Streamlining communication channels for quicker responses and better coordination.",
      icon: MessageSquarePlus, // Lucide Communication Icon (adjust as needed - MessageSquarePlus is a suggestion)
    },
    {
      title: "Modernized Training",
      description:
        "Equipping officers with digital skills for effective policing in the 21st century.",
      icon: School, // Lucide Training Icon (Academy or BookOpenCheck could also be options)
    },
    {
      title: "Stronger Community Engagement",
      description:
        "Building trust and transparency through digital platforms and citizen interaction.",
      icon: Users, // Lucide Community Icon (Users is a good fit)
    },
    {
      title: "Ethical Digital Policing",
      description:
        "Integrating ethical frameworks and accountability in the digital transformation process.",
      icon: ShieldCheck, // Lucide Ethics Icon (ShieldCheck implies security and ethics)
    },
    {
      title: "Adaptive Leadership",
      description:
        "Cultivating leadership that embraces change and drives digital culture within police forces.",
      icon: BadgeCheck, // Lucide Leadership Icon (BadgeCheck or Award could also work)
    },
  ];

  return (
    <div className="font-sans antialiased text-gray-700 bg-gray-50">
      {/* Hero Section */}
      <section className="relative bg-gray-900 py-24 md:py-32 lg:py-40 overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-br from-indigo-800 to-purple-900 opacity-70"></div>
        <div className="container mx-auto px-4 relative z-10 text-center md:text-left">
          <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold text-white leading-tight mb-6">
            Empowering Trust & Efficiency Through Digital Culture in Policing
          </h1>
          <p className="text-lg md:text-xl text-gray-300 mb-10 md:mb-12 lg:mb-16">
            Explore how digital transformation can revolutionize police work by
            fostering a culture of innovation, transparency, and community
            collaboration.
          </p>
          <div className="space-x-4">
            <button className="bg-indigo-500 hover:bg-indigo-600 text-white font-semibold py-3 px-6 rounded-md shadow-lg transition-colors duration-300">
              Learn More
            </button>
            <button className="bg-transparent hover:bg-gray-800 text-gray-200 font-semibold py-3 px-6 rounded-md border border-gray-400 transition-colors duration-300">
              Explore Features
            </button>
          </div>
        </div>
        {/* Background pattern/image (optional) */}
        <div
          className="hidden md:block absolute top-0 left-0 w-full h-full opacity-10"
          style={{
            backgroundImage: "url(/hero-pattern.svg)",
            backgroundRepeat: "repeat",
            backgroundSize: "contain",
          }}
        ></div>{" "}
        {/* Replace with your pattern or remove */}
      </section>

      {/* Key Focus Areas Section - Visually Enhanced Cards */}
      <section className="py-16 md:py-20">
        <div className="container mx-auto px-4">
          <h2 className="text-3xl font-semibold text-gray-800 mb-10 text-center">
            Key Areas of Cultural Transformation
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 md:gap-10 lg:gap-12">
            {focusAreas.map((area, index) => (
              <div
                key={index}
                className="bg-white rounded-xl shadow-xl hover:shadow-2xl transition-shadow duration-300 p-6 md:p-8 flex flex-col items-center text-center"
              >
                <div className="w-16 h-16 rounded-full bg-indigo-100 text-indigo-700 flex items-center justify-center mb-4">
                  <area.icon className="w-8 h-8" />{" "}
                  {/* Render Lucide Icon component */}
                </div>
                <h3 className="text-xl font-semibold text-gray-800 mb-3">
                  {area.title}
                </h3>
                <p className="text-gray-600 leading-relaxed">
                  {area.description}
                </p>
                <button className="mt-5 bg-indigo-50 hover:bg-indigo-100 text-indigo-600 font-semibold py-2 px-4 rounded-md transition-colors duration-300">
                  Learn More
                </button>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Call to Action / "Why Digital Culture?" Section */}
      <section className="bg-indigo-50 py-16 md:py-20">
        <div className="container mx-auto px-4 text-center">
          <h2 className="text-3xl font-semibold text-indigo-800 mb-8">
            Why Focus on Culture in Digital Transformation?
          </h2>
          <p className="text-lg text-gray-700 max-w-2xl mx-auto leading-relaxed mb-10">
            Technology is the engine, but culture is the steering wheel. A
            successful digital transformation in police work isn't just about
            adopting new tools – it's about fostering a cultural environment
            that embraces change, values data-driven decisions, and prioritizes
            community trust.
          </p>
          <button className="bg-indigo-700 hover:bg-indigo-800 text-white font-semibold py-3 px-8 rounded-lg shadow-xl transition-colors duration-300">
            Explore the Benefits
          </button>
        </div>
      </section>

      {/* Footer */}
      <footer className="bg-gray-800 text-gray-300 py-12 md:py-16">
        <div className="container mx-auto px-4 text-center">
          <p className="mb-4">
            &copy; {new Date().getFullYear()} Digital Transformation of Police
            Work - Culture. All rights reserved.
          </p>
          <p className="text-sm text-gray-500">
            {/* Add links to Privacy Policy, Terms, Contact etc. if needed */}
            <a href="#" className="hover:text-gray-400 mr-4">
              Privacy Policy
            </a>
            <a href="#" className="hover:text-gray-400">
              Terms of Service
            </a>
          </p>
        </div>
      </footer>
    </div>
  );
}

export default HomePage;
