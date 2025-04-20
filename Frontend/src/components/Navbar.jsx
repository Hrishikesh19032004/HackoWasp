import { useState } from "react";
import { Link } from "react-router-dom";
import Container from "./Container";
import Image from "../Images/globe.png";
import { useAuth } from "../context/AuthContext";
import Logout from "../Pages/Logout";

function Navbar() {
  const [isOpen, setIsOpen] = useState(false); // Mobile menu state
  const [isDropdownOpen, setIsDropdownOpen] = useState(false); // Dropdown state
  const { isAuthenticated } = useAuth();

  const handleDropdownToggle = () => {
    setIsDropdownOpen((prev) => !prev);
  };

  const handleMouseEnter = () => {
    setTimeout(() => setIsDropdownOpen(true), 150); // Add delay before opening
  };

  const handleMouseLeave = () => {
    setTimeout(() => setIsDropdownOpen(false), 150); // Add delay before closing
  };

  return (
    <nav className="bg-white shadow-md py-2 z-50">
      <Container>
        <div className="flex items-center justify-between">
          {/* Logo */}
          <div className="flex items-center gap-4">
            <img src={Image} alt="Logo" className="h-10 w-auto" />
            <span className="text-2xl font-bold text-green-600">
              AaharSetu
            </span>
          </div>

          {/* Desktop Menu */}
          <div className="hidden md:flex items-center gap-6">
            <Link
              to="/home"
              className="hover:text-green-600 text-gray-700 font-medium text-lg transition-all"
            >
              Home
            </Link>
            <Link
              to="/About"
              className="hover:text-green-600 text-gray-700 font-medium text-lg transition-all"
            >
              About
            </Link>
            <Link
              to="/ContactUs"
              className="hover:text-green-600 text-gray-700 font-medium text-lg transition-all"
            >
              Contact
            </Link>
            <Link
              to="/donate"
              className="hover:text-green-600 text-gray-700 font-medium text-lg transition-all"
            >
              Donate
            </Link>
            <Link
              to="/popupMap"
              className="hover:text-green-600 text-gray-700 font-medium text-lg transition-all"
            >
              Location
            </Link>
            <Link
              to="/recipe"
              className="hover:text-green-600 text-gray-700 font-medium text-lg transition-all"
            >
              Recipe Generator
            </Link>

            {/* Dropdown */}
            <div
              className="relative group"
              onMouseEnter={handleMouseEnter}
              onMouseLeave={handleMouseLeave}
            >
              <button
                onClick={handleDropdownToggle}
                className="text-gray-700 font-medium text-lg hover:text-green-600 transition-all"
              >
                More
              </button>
              {(isDropdownOpen || isDropdownOpen === undefined) && (
                <div className="absolute bg-white shadow-lg rounded-lg p-4 mt-2 w-48 z-50">
                  <Link
                    to="/impactful"
                    className="block px-4 py-2 text-gray-700 hover:text-green-600 hover:bg-gray-100 rounded-md transition-all"
                  >
                    Impact Analysis
                  </Link>
                  <Link
                    to="/fraud"
                    className="block px-4 py-2 text-gray-700 hover:text-green-600 hover:bg-gray-100 rounded-md transition-all"
                  >
                    Fraud Detection
                  </Link>
                  <Link
                    to="/ecom"
                    className="block px-4 py-2 text-gray-700 hover:text-green-600 hover:bg-gray-100 rounded-md transition-all"
                  >
                    Shop
                  </Link>
                  <Link
                    to="/leaderboard"
                    className="block px-4 py-2 text-gray-700 hover:text-green-600 hover:bg-gray-100 rounded-md transition-all"
                  >
                    Leaderboard
                  </Link>
                  <Link
                    to="/map"
                    className="block px-4 py-2 text-gray-700 hover:text-green-600 hover:bg-gray-100 rounded-md transition-all"
                  >
                    Map
                  </Link>
                </div>
              )}
            </div>

            {isAuthenticated ? (
              <Logout />
            ) : (
              <Link
                to="/"
                className="bg-green-500 text-white px-4 py-2 rounded-lg hover:bg-green-600 transition-all"
              >
                Sign In
              </Link>
            )}
          </div>

          {/* Mobile Menu Button */}
          <button
            onClick={() => setIsOpen(!isOpen)}
            className="md:hidden text-gray-700 focus:outline-none"
          >
            <i className={`fas ${isOpen ? "fa-times" : "fa-bars"} text-2xl`} />
          </button>
        </div>

        {/* Mobile Menu */}
        {isOpen && (
          <div className="md:hidden mt-4 bg-white shadow-lg rounded-lg p-4">
            <Link
              to="/home"
              className="block px-4 py-2 text-gray-700 hover:text-green-600 hover:bg-gray-100 rounded-md transition-all"
            >
              Home
            </Link>
            <Link
              to="/recipe"
              className="block px-4 py-2 text-gray-700 hover:text-green-600 hover:bg-gray-100 rounded-md transition-all"
            >
              Recipe Generator
            </Link>
            <Link
              to="/donate"
              className="block px-4 py-2 text-gray-700 hover:text-green-600 hover:bg-gray-100 rounded-md transition-all"
            >
              Donate
            </Link>
            <Link
              to="/popupMap"
              className="block px-4 py-2 text-gray-700 hover:text-green-600 hover:bg-gray-100 rounded-md transition-all"
            >
              Location
            </Link>
            <Link
              to="/impactful"
              className="block px-4 py-2 text-gray-700 hover:text-green-600 hover:bg-gray-100 rounded-md transition-all"
            >
              Impact Analysis
            </Link>
            {isAuthenticated ? (
              <Logout className="block px-4 py-2 text-gray-700 hover:text-green-600 rounded-md" />
            ) : (
              <Link
                to="/"
                className="block bg-green-500 text-white px-4 py-2 rounded-lg hover:bg-green-600 transition-all"
              >
                Sign In
              </Link>
            )}
          </div>
        )}
      </Container>
    </nav>
  );
}

export default Navbar;
