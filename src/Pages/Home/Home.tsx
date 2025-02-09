import {
  FileText,
  MessageSquare,
  Camera,
  MapPin,
  UserPlus,
  Bell,
  BarChart2,
} from "lucide-react";

function HomePage() {
  const features = [
    {
      title: "Case Management System",
      description:
        "Digitally file, track, and manage cases with real-time access to evidence and updates.",
      icon: FileText,
    },
    {
      title: "Real-Time Communication",
      description:
        "Secure, instant communication tools for sharing critical information and alerts.",
      icon: MessageSquare,
    },
    {
      title: "Digital Evidence Collection",
      description:
        "Integrate photos, videos, and documents securely in a digital format.",
      icon: Camera,
    },
    {
      title: "Geolocation Services",
      description:
        "GPS functionality for navigation to crime scenes and real-time incident tracking.",
      icon: MapPin,
    },
    {
      title: "Public Reporting System",
      description:
        "Allow citizens to report incidents or crimes for faster response times.",
      icon: UserPlus,
    },
    {
      title: "Public Awareness and Safety",
      description:
        "Provide safety alerts, tips, and view crime hotspots on an interactive map.",
      icon: Bell,
    },
    {
      title: "Employee Performance Dashboard",
      description:
        "Monitor officer performance, track key metrics, and promote accountability.",
      icon: BarChart2,
    },
  ];

  return (
    <div className="font-sans antialiased text-gray-700 bg-gray-50">
      {/* Hero Section */}
      <section className="relative bg-gray-900 py-24 md:py-32 lg:py-40 overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-br from-blue-800 to-indigo-900 opacity-70"></div>
        <div className="container mx-auto px-4 relative z-10 text-center md:text-left">
          <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold text-white leading-tight mb-6">
            Modernizing Indian Police Forces Through Digital Transformation
          </h1>
          <p className="text-lg md:text-xl text-gray-300 mb-10 md:mb-12 lg:mb-16">
            Empowering law enforcement with cutting-edge technology to enhance
            efficiency, transparency, and public trust.
          </p>
          <div className="space-x-4">
            <button className="bg-blue-500 hover:bg-blue-600 text-white font-semibold py-3 px-6 rounded-md shadow-lg transition-colors duration-300">
              Explore Features
            </button>
            <button className="bg-transparent hover:bg-gray-800 text-gray-200 font-semibold py-3 px-6 rounded-md border border-gray-400 transition-colors duration-300">
              Learn More
            </button>
          </div>
        </div>
        <div
          className="hidden md:block absolute top-0 left-0 w-full h-full opacity-10"
          style={{
            backgroundImage: "url(/police-pattern.svg)",
            backgroundRepeat: "repeat",
            backgroundSize: "contain",
          }}
        ></div>
      </section>

      {/* Key Features Section */}
      <section className="py-16 md:py-20">
        <div className="container mx-auto px-4">
          <h2 className="text-3xl font-semibold text-gray-800 mb-10 text-center">
            Transforming Law Enforcement with Technology
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 md:gap-10 lg:gap-12">
            {features.map((feature, index) => (
              <div
                key={index}
                className="bg-white rounded-xl shadow-xl hover:shadow-2xl transition-shadow duration-300 p-6 md:p-8 flex flex-col items-center text-center"
              >
                <div className="w-16 h-16 rounded-full bg-blue-100 text-blue-700 flex items-center justify-center mb-4">
                  <feature.icon className="w-8 h-8" />
                </div>
                <h3 className="text-xl font-semibold text-gray-800 mb-3">
                  {feature.title}
                </h3>
                <p className="text-gray-600 leading-relaxed">
                  {feature.description}
                </p>
                <button className="mt-5 bg-blue-50 hover:bg-blue-100 text-blue-600 font-semibold py-2 px-4 rounded-md transition-colors duration-300">
                  Learn More
                </button>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Call to Action Section */}
      <section className="bg-blue-50 py-16 md:py-20">
        <div className="container mx-auto px-4 text-center">
          <h2 className="text-3xl font-semibold text-blue-800 mb-8">
            Revolutionizing Indian Police Forces
          </h2>
          <p className="text-lg text-gray-700 max-w-2xl mx-auto leading-relaxed mb-10">
            Our digital solution addresses the challenges of outdated
            technology, inefficient paperwork, and inadequate data management.
            By streamlining processes and enhancing communication, we're helping
            to improve response times, data accuracy, and overall law
            enforcement effectiveness.
          </p>
          <button className="bg-blue-700 hover:bg-blue-800 text-white font-semibold py-3 px-8 rounded-lg shadow-xl transition-colors duration-300">
            Request a Demo
          </button>
        </div>
      </section>

      {/* Footer */}
      <footer className="bg-gray-800 text-gray-300 py-12 md:py-16">
        <div className="container mx-auto px-4 text-center">
          <p className="mb-4">
            &copy; {new Date().getFullYear()} Digital Transformation of Indian
            Police Forces. All rights reserved.
          </p>
          <p className="text-sm text-gray-500">
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
