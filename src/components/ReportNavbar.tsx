import { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import {
  Menu,
  X,
  Home,
  FileText,
  Map,
  User,
  Siren,
  AlertTriangle,
  MessageCircle,
  FlagTriangleRight,
  Phone,
  ShieldCheck,
} from "lucide-react";
import UserImg from "../assets/user.png";
import { jwtDecode } from "jwt-decode";

interface NavLink {
  path: string;
  label: string;
  icon: React.ReactNode;
}

const decoded = jwtDecode(localStorage.getItem("accessToken") || "");

const commonNavLinks: NavLink[] = [
  { path: "/", label: "Home", icon: <Home className="h-5 w-5" /> },
  { path: "/map", label: "Map", icon: <Map className="h-5 w-5" /> },
];

const officerNavLinks: NavLink[] = [
  { path: "/cases", label: "Cases", icon: <FileText className="h-5 w-5" /> },
  {
    path: "/chats",
    label: "Chats",
    icon: <MessageCircle className="h-5 w-5" />,
  },
  {
    path: "/incident/report",
    label: "Reports",
    icon: <Siren className="h-5 w-5" />,
  },
];

const userNavLinks: NavLink[] = [
  { path: "/", label: "Home", icon: <Home className="h-5 w-5" /> },
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
    path: "/user/report",
    label: "Report an Incident",
    icon: <FlagTriangleRight className="h-5 w-5" />,
  },
  { path: "/map", label: "Map", icon: <Map className="h-5 w-5" /> },
  {
    path: "/user/emergencycontacts",
    label: "Emergency Contacts",
    icon: <Phone className="h-5 w-5" />,
  },
  {
    path: "/user/blogs",
    label: "Safety Tips",
    icon: <ShieldCheck className="h-5 w-5" />,
  },
];

const navLinks = decoded.is_officer
  ? [...commonNavLinks, ...officerNavLinks]
  : userNavLinks;

const ReportNavbar = () => {
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      const menu = document.getElementById("mobile-menu");
      const menuButton = document.getElementById("menu-button");

      if (
        menu &&
        !menu.contains(event.target as Node) &&
        menuButton &&
        !menuButton.contains(event.target as Node)
      ) {
        setIsMobileMenuOpen(false);
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

  return (
    <nav className="bg-white fixed top-0 shadow-md  w-full z-50 isolate">
      <div className="container mx-auto px-6 py-5 flex items-center">
        <button
          id="menu-button"
          type="button"
          className="text-gray-500 hover:text-gray-600 focus:outline-none md:hidden mr-4 flex items-center"
          aria-label="toggle menu"
          onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
        >
          <Menu className="h-6 w-6" />
        </button>

        <div className="flex justify-center items-center gap-5">
          <button className="flex justify-center items-center w-7 h-7 ml-4 overflow-hidden">
            <img src={UserImg} className="h-full w-full object-cover" />
          </button>
          <h2 className="font-bold text-2xl">CopCo</h2>
        </div>

        <Link to={"/user/login"}>
          <button className="bg-indigo-500 text-white font-medium text-xl px-4 py-2 rounded-lg">
            Login
          </button>
        </Link>

        <div className="hidden md:flex items-center ml-auto space-x-6">
          {navLinks.map((link) => (
            <Link
              key={link.path}
              to={link.path}
              className="text-gray-800 hover:text-indigo-600 transition duration-150"
            >
              {link.label}
            </Link>
          ))}
        </div>
      </div>

      {isMobileMenuOpen && (
        <div
          className="fixed inset-0  bg-black/50 transition-opacity md:hidden"
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
                <img src={UserImg} className="h-full w-full object-cover" />
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
            {navLinks.map((link) => (
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
          </nav>
        </div>
      </div>
    </nav>
  );
};

export default ReportNavbar;
