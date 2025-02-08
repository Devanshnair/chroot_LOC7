function App() {
  const focusAreas = [
    {
      title: "Communication & Collaboration",
      description:
        "Modernizing internal and external communication through digital channels.",
    },
    {
      title: "Training & Skill Development",
      description:
        "Adapting training methods to equip officers for the digital landscape.",
    },
    {
      title: "Community Engagement",
      description:
        "Building trust and transparency through digital interactions with the public.",
    },
    {
      title: "Ethics & Accountability",
      description:
        "Navigating ethical dilemmas and ensuring accountability in the digital realm.",
    },
    {
      title: "Leadership & Change Management",
      description:
        "Fostering leadership that champions cultural change and digital adoption.",
    },
  ];

  return (
    <div className="font-sans antialiased text-gray-700">
      {/* Header Section */}
      <header className="bg-gray-100 py-16 text-center">
        <div className="container mx-auto px-4">
          <h1 className="text-4xl font-bold text-gray-800 mb-4">
            Digital Transformation of Police Work: Culture
          </h1>
          <p className="text-xl text-gray-600">
            Navigating cultural shifts in the digital age to enhance policing.
          </p>
        </div>
      </header>

      {/* Introduction Section */}
      <section className="bg-white py-12 border-b border-gray-200">
        <div className="container mx-auto px-4">
          <h2 className="text-3xl font-semibold text-gray-800 mb-6 text-center">
            The Cultural Imperative
          </h2>
          <div className="max-w-2xl mx-auto">
            <p className="mb-4 leading-relaxed">
              Digital tools offer unprecedented opportunities for modern
              policing, but their effective integration hinges on a fundamental
              shift in police culture. This platform explores the critical
              aspects of this transformation.
            </p>
            <p className="leading-relaxed">
              We delve into how technology impacts communication, training,
              community engagement, ethical considerations, and the very values
              that underpin police work. Understanding and adapting police
              culture is not just beneficial – it's essential for successful
              digital transformation.
            </p>
          </div>
        </div>
      </section>

      {/* Key Focus Areas Section */}
      <section className="bg-gray-50 py-16">
        <div className="container mx-auto px-4">
          <h2 className="text-3xl font-semibold text-gray-800 mb-8 text-center">
            Key Focus Areas
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 max-w-5xl mx-auto">
            {focusAreas.map((area, index) => (
              <div
                key={index}
                className="bg-white p-6 rounded-lg shadow-md hover:shadow-xl transition-shadow duration-300"
              >
                <h3 className="text-xl font-semibold text-gray-800 mb-3">
                  {area.title}
                </h3>
                <p className="text-gray-600 leading-relaxed">
                  {area.description}
                </p>
                {/* Add "Learn More" link or icon here if needed - Example: */}
                {/* <a href="#" className="text-blue-500 hover:underline mt-4 block">Learn More</a> */}
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Footer Section */}
      <footer className="bg-gray-800 text-gray-300 py-8">
        <div className="container mx-auto px-4 text-center">
          <p>
            &copy; {new Date().getFullYear()} Digital Transformation of Police
            Work - Culture. All rights reserved.
          </p>
          {/* Add links to privacy policy, terms of service, etc., here */}
        </div>
      </footer>
    </div>
  );
}

export default App;
