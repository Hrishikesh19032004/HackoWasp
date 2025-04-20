import { useState } from "react";
import { Link } from "react-router-dom";
import Container from "./Container";
import Image from '../Images/globe.png';
import { useAuth } from '../context/AuthContext';
import Logout from '../Pages/Logout';

function Navbar() {
  const [isOpen, setIsOpen] = useState(false);
  const { isAuthenticated } = useAuth();

  return (
    <nav className="bg-white shadow-md py-2 z-40">
      <Container>
        <div className="flex items-center justify-between h-16">
          <div className="flex gap-4 items-center">
            <img src={Image} alt="Logo" className="h-12 w-auto" />
            <span className="text-2xl font-bold text-gray-800">AaharSetu</span>
            <div className="hidden md:block">
              <div className="ml-10 flex items-baseline space-x-4">
                <Link to="/home" className="hover:bg-green-500 hover:text-white px-3 py-2 rounded-md text-lg font-medium transition-all">Home</Link>
                <Link to="/About" className="hover:bg-green-500 hover:text-white px-3 py-2 rounded-md text-lg font-medium transition-all">About</Link>
                <Link to="/ContactUs" className="hover:bg-green-500 hover:text-white px-3 py-2 rounded-md text-lg font-medium transition-all">Contact Us</Link>
                <Link to="/livestream" className="hover:bg-green-500 hover:text-white px-3 py-2 rounded-md text-lg font-medium transition-all">LiveStream</Link>
                <Link to="/rec" className="hover:bg-green-500 hover:text-white px-3 py-2 rounded-md text-lg font-medium transition-all">Apply now</Link>
                <Link to="/community" className="hover:bg-green-500 hover:text-white px-3 py-2 rounded-md text-lg font-medium transition-all">Community</Link>
              </div>
            </div>
          </div>

          {isAuthenticated ? (
            <Logout />
          ) : (
            <Link to="/">
              <div className="hidden md:block hover:bg-green-500 px-4 py-1 rounded-xl text-lg font-medium transition-all">Logout</div>
            </Link>
          )}

          <div className="-mr-2 flex md:hidden">
            <button
              onClick={() => setIsOpen(!isOpen)}
              type="button"
              className="bg-gray-800 inline-flex items-center justify-center p-2 rounded-md text-gray-400 hover:text-white hover:bg-gray-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-offset-gray-800 focus:ring-white"
              aria-controls="mobile-menu"
              aria-expanded="false"
            >
              <span className="sr-only">Open main menu</span>
              <i className="fas fa-bars"></i>
            </button>
          </div>
        </div>

        {isOpen && (
          <div className="md:hidden transition-all" id="mobile-menu">
            <div className="px-2 pt-2 pb-3 space-y-1 sm:px-3 text-black">
              <Link to="/home" className="hover:bg-green-500 hover:text-white block px-3 py-2 rounded-md text-lg font-medium transition-all">Home</Link>
              <Link to="/About" className="hover:bg-green-500 hover:text-white block px-3 py-2 rounded-md text-lg font-medium transition-all">About</Link>
              {isAuthenticated ? (
                <Logout className="hover:bg-green-500 bg-green-500 text-white block px-3 py-2 rounded-md text-lg font-medium transition-all" />
              ) : (
                <Link to="/SignInUp" className="hover:bg-green-500 bg-green-500 text-white block px-3 py-2 rounded-md text-lg font-medium transition-all">SignIn</Link>
              )}
            </div>
          </div>
        )}
      </Container>
    </nav>
  );
}

export default Navbar;
