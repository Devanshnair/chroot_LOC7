import { useState } from "react";
import { Link } from "react-router-dom";
import { Menu, X } from "lucide-react";

function Navbar() {
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  const toggleMobileMenu = () => {
    setIsMobileMenuOpen(!isMobileMenuOpen);
  };

  return (
    <nav className="bg-white shadow-md">
      <div className="container mx-auto px-6 py-3 md:flex md:justify-between md:items-center">
        <div className="flex items-center justify-between">
          <Link
            to="/"
            className="text-xl font-bold text-gray-800 hover:text-gray-700"
          >
            Digital Police Culture{" "}
            {/* Replace with your actual app name or logo component */}
          </Link>
          {/* Mobile menu button */}
          <div className="flex md:hidden">
            <button
              type="button"
              className="text-gray-500 hover:text-gray-600 focus:outline-none focus:text-gray-600"
              aria-label="toggle menu"
              onClick={toggleMobileMenu}
            >
              {isMobileMenuOpen ? (
                <X className="h-6 w-6" />
              ) : (
                <Menu className="h-6 w-6" />
              )}
            </button>
          </div>
        </div>

        {/* Navigation links */}
        <div
          className={`md:flex items-center ${
            isMobileMenuOpen ? "block" : "hidden"
          }`}
        >
          <div className="flex flex-col md:flex-row md:mx-6">
            <Link
              to="/"
              className="block px-4 py-2 text-sm text-gray-800 hover:text-indigo-600"
            >
              Home
            </Link>
            <Link
              to="/cases"
              className="block px-4 py-2 text-sm text-gray-800 hover:text-indigo-600 mt-2 md:mt-0 md:ml-2"
            >
              Case Management
            </Link>
            <Link
              to="/map"
              className="block px-4 py-2 text-sm text-gray-800 hover:text-indigo-600 mt-2 md:mt-0 md:ml-2"
            >
              Map
            </Link>
          </div>
        </div>
      </div>
    </nav>
  );
}

export default Navbar;
