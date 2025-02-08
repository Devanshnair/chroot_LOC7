import { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import {
  Menu,
  X,
  Home,
  FileText,
  Map,
  User,
  User2Icon,
  LogOutIcon,
  AlertTriangle,
  AlertCircle,
  MessageCircle,
  Siren,
  ChevronDown, // Icon for dropdown arrow
} from "lucide-react";
import UserImg from "../assets/user.png";
import SafetyTips from "../Pages/Public(User)/SafetyTips";

interface NavLink {
  path: string;
  label: string;
  icon: React.ReactNode;
}

const coreNavLinks: NavLink[] = [
  { path: "/", label: "Home", icon: <Home className="h-5 w-5" /> },
  {
    path: "/cases",
    label: "Cases",
    icon: <FileText className="h-5 w-5" />,
  },
  { path: "/map", label: "Map", icon: <Map className="h-5 w-5" /> },
  {
    path: "/chats",
    label: "Chats",
    icon: <MessageCircle className="h-5 w-5" />,
  },
];

const moreNavLinks: NavLink[] = [
  {
    path: "/user/profile",
    label: "Profile",
    icon: <User className="h-5 w-5" />,
  },
  {
    path: "/user/sos",
    label: "SOS",
    icon: <AlertTriangle className="h-5 w-5" />,
  },
  {
    path: "/user/emergencycontacts",
    label: "Emergency Contacts",
    icon: <AlertCircle className="h-5 w-5" />,
  },
  {
    path: "/incident/report",
    label: "Report Incident",
    icon: <Siren className="h-5 w-5" />,
  },
];

const Navbar = () => {
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [isLoggedIn, setIsLoggedIn] = useState<boolean>(
    localStorage.getItem("accessToken") ? true : false
  );
  const [isDropdownOpen, setIsDropdownOpen] = useState(false); // Dropdown state

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      const menu = document.getElementById("mobile-menu");
      const menuButton = document.getElementById("menu-button");
      const dropdown = document.getElementById("desktop-dropdown");
      const dropdownButton = document.getElementById("dropdown-button");

      if (
        menu &&
        !menu.contains(event.target as Node) &&
        menuButton &&
        !menuButton.contains(event.target as Node)
      ) {
        setIsMobileMenuOpen(false);
      }

      if (
        dropdown &&
        !dropdown.contains(event.target as Node) &&
        dropdownButton &&
        !dropdownButton.contains(event.target as Node)
      ) {
        setIsDropdownOpen(false);
      }
    };

    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  useEffect(() => {
    if (isMobileMenuOpen) {
      document.body.style.overflow = "hidden";
    } else {
      document.body.style.overflow = "unset";
    }
    return () => {
      document.body.style.overflow = "unset";
    };
  }, [isMobileMenuOpen]);

  useEffect(() => {
    const handleStorageChange = () => {
      setIsLoggedIn(!!localStorage.getItem("accessToken"));
    };

    window.addEventListener("storage", handleStorageChange);

    return () => window.removeEventListener("storage", handleStorageChange);
  }, []);

  // Logout function
  const handleLogout = () => {
    localStorage.removeItem("accessToken");
    setIsLoggedIn(false);
    setIsDropdownOpen(false);
  };

  return (
    <nav className="bg-white shadow-md relative z-50 ">
      <div className="max-w-[1450px] mx-auto">
        <div className="px-6 py-5 flex justify-between items-center">
          {/* Mobile menu button */}
          <button
            id="menu-button"
            type="button"
            className="text-gray-500 hover:text-gray-600 focus:outline-none md:hidden mr-4 flex items-center"
            aria-label="toggle menu"
            onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
          >
            <Menu className="h-6 w-6" />
          </button>

          <div className="flex justify-center items-center gap-2">
            <button className="flex justify-center items-center w-7 h-7 overflow-hidden">
              <img
                src={UserImg}
                className="h-full w-full object-cover"
                alt="User Profile"
              />
            </button>
            <h2 className="font-bold text-2xl">Copco</h2>
          </div>

          {/* Desktop Navigation */}
          <div className="hidden md:flex justify-center items-center gap-4">
            {coreNavLinks.map((link) => (
              <Link
                key={link.path}
                to={link.path}
                className="text-gray-800 hover:text-indigo-600 transition duration-150"
              >
                {link.label}
              </Link>
            ))}

            {/* "More" Dropdown */}
            <div className="relative" id="dropdown-button">
              <button
                onClick={() => setIsDropdownOpen(!isDropdownOpen)}
                className="text-gray-800 hover:text-indigo-600 transition duration-150 flex items-center gap-1 focus:outline-none"
                aria-label="More Navigation Links"
              >
                More
                <ChevronDown
                  className={`h-4 w-4 transition-transform ${
                    isDropdownOpen ? "rotate-180" : ""
                  }`}
                />
              </button>
              {isDropdownOpen && (
                <div
                  id="desktop-dropdown"
                  className="absolute right-0 mt-2 w-48 rounded-md shadow-xl bg-white border border-gray-200 focus:outline-none"
                  tabIndex={0}
                  onBlur={() => setIsDropdownOpen(false)}
                >
                  <div
                    className="py-1"
                    role="menu"
                    aria-orientation="vertical"
                    aria-labelledby="options-menu-button"
                  >
                    {moreNavLinks.map((link) => (
                      <Link
                        key={link.path}
                        to={link.path}
                        className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100 hover:text-indigo-600"
                        role="menuitem"
                        onClick={() => setIsDropdownOpen(false)}
                      >
                        <div className="flex items-center gap-2">
                          {link.icon}
                          {link.label}
                        </div>
                      </Link>
                    ))}
                  </div>
                </div>
              )}
            </div>
          </div>

          {!isLoggedIn ? (
            <Link to={"/user/login"}>
              <button className="bg-indigo-500 text-white font-medium text-xl px-4 py-2 rounded-lg cursor-pointer">
                Login
              </button>
            </Link>
          ) : (
            <div className="relative">
              <button
                className="h-10 w-10 p-1 rounded-full bg-slate-300 ml-4 relative cursor-pointer"
                onClick={() => setIsDropdownOpen(!isDropdownOpen)} // Consider separate dropdown for user profile if needed
              >
                <User2Icon className="h-full w-full" color="white" />
              </button>
              {isDropdownOpen && (
                <div className="flex justify-center items-center gap-2 bg-slate-300 absolute -bottom-9 right-0 p-1 rounded-sm cursor-pointer">
                  <LogOutIcon color="white" onClick={handleLogout} />
                  <p className="text-lg text-white" onClick={handleLogout}>
                    Logout
                  </p>
                </div>
              )}
            </div>
          )}
        </div>

        {isMobileMenuOpen && (
          <div
            className="fixed inset-0 bg-black/50 transition-opacity md:hidden"
            onClick={() => setIsMobileMenuOpen(false)}
          />
        )}

        <div
          id="mobile-menu"
          className={`fixed top-0 left-0 h-full w-3/4 bg-white shadow-2xl transform transition-transform duration-300 ease-in-out ${
            isMobileMenuOpen ? "translate-x-0" : "-translate-x-full"
          }`}
        >
          <div className="p-6">
            <div className="flex justify-between items-center mb-8">
              <div className="flex justify-center items-center gap-5">
                <button className="flex justify-center items-center w-7 h-7 ml-4 overflow-hidden">
                  <img
                    src={UserImg}
                    className="h-full w-full object-cover"
                    alt="User Profile"
                  />
                </button>
                <h2 className="font-bold text-xl">Copco</h2>
              </div>

              <button
                type="button"
                className="text-gray-600 hover:text-gray-800 transition duration-150"
                onClick={() => setIsMobileMenuOpen(false)}
              >
                <X className="h-6 w-6" />
              </button>
            </div>

            <nav className="space-y-2">
              {/* Core Nav Links for Mobile */}
              {coreNavLinks.map((link) => (
                <Link
                  key={link.path}
                  to={link.path}
                  className="flex items-center space-x-3 px-4 py-3 text-gray-800 hover:bg-gray-50 hover:text-indigo-600 rounded-lg transition duration-150"
                  onClick={() => setIsMobileMenuOpen(false)}
                >
                  {link.icon}
                  <span className="text-lg font-medium">{link.label}</span>
                </Link>
              ))}
              {/* "More" Dropdown Links in Mobile */}
              <div>
                <button
                  onClick={() => setIsDropdownOpen(!isDropdownOpen)}
                  className="flex items-center w-full space-x-3 px-4 py-3 text-gray-800 hover:bg-gray-50 hover:text-indigo-600 rounded-lg transition duration-150 focus:outline-none"
                  aria-label="toggle more menu"
                >
                  <Menu className="h-5 w-5" />{" "}
                  {/* Using Menu icon for "More" in mobile */}
                  <span className="text-lg font-medium">More</span>
                  <ChevronDown
                    className={`h-4 w-4 ml-auto transition-transform ${
                      isDropdownOpen ? "rotate-180" : ""
                    }`}
                  />
                </button>
                {isDropdownOpen && (
                  <div className="ml-6 mt-1 space-y-2">
                    {moreNavLinks.map((link) => (
                      <Link
                        key={link.path}
                        to={link.path}
                        className="flex items-center space-x-3 px-4 py-3 text-gray-800 hover:bg-gray-50 hover:text-indigo-600 rounded-lg transition duration-150"
                        onClick={() => setIsMobileMenuOpen(false)}
                      >
                        {link.icon}
                        <span className="text-lg font-medium">
                          {link.label}
                        </span>
                      </Link>
                    ))}
                  </div>
                )}
              </div>
            </nav>
          </div>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
