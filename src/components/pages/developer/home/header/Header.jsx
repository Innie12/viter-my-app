import React from "react";
import { HiPencil } from "react-icons/hi";
import ModalAddHeader from "./ModalAddHeader";

const Header = () => {
  const [isMenuOpen, setIsMenuOpen] = React.useState(false);
  const [isModalHeader, setIsModalHeader] = React.useState(false);

  const handleAdd = () => {
    setIsModalHeader(true);
  };

  return (
    <header id="header" className="bg-white relative shadow-md w-full">
      <div className="container mx-auto px-4 py-7 flex justify-between items-center">
        {/* Logo */}
        <div className="flex items-center">
          <div className="w-8 h-8 bg-blue-500 rounded-full"></div>
          <span className="ml-2 text-xl font-bold">MyApp</span>
        </div>

        {/* Desktop Navigation */}
        <nav className="hidden md:flex space-x-6 items-center">
          <a
            href="#"
            onClick={() => setIsMenuOpen(!isMenuOpen)}
            className="hover:text-blue-500"
          >
            Home
          </a>
          <a href="#about" className="hover:text-blue-500">
            About
          </a>
          <a href="#services" className="hover:text-blue-500">
            Services
          </a>
          <a href="#contact" className="hover:text-blue-500">
            Contact
          </a>
          <button
            className="tooltip"
            data-tooltip="Edit"
            type="button"
            // onClick={() => handleAdd (data,values)} other syntax
            onClick={handleAdd}
          >
            <HiPencil className="bg-primary text-white size-6 p-1 border transition-all ease-in-out duration-200 rounded-full" />
          </button>
        </nav>

        {/* Mobile Menu Button */}
        <button
          className="md:hidden text-gray-600"
          onClick={() => setIsMenuOpen(!isMenuOpen)}
        >
          {isMenuOpen ? (
            <svg
              className="w-6 h-6"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M6 18L18 6M6 6l12 12"
              />
            </svg>
          ) : (
            <svg
              className="w-6 h-6"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M4 6h16M4 12h16M4 18h16"
              />
            </svg>
          )}
        </button>
      </div>

      {/* Mobile Menu (now positioned absolutely) */}
      {isMenuOpen && (
        <div className="md:hidden bg-white absolute top-full left-0 right-0 shadow-lg px-4 py-2 space-y-2 border-t border-gray-200">
          <a
            onClick={() => setIsMenuOpen(false)}
            href="#"
            className="block py-2 hover:text-blue-500"
          >
            Home
          </a>
          <a
            onClick={() => setIsMenuOpen(false)}
            href="#about"
            className="block py-2 hover:text-blue-500"
          >
            About
          </a>
          <a
            onClick={() => setIsMenuOpen(false)}
            href="#services"
            className="block py-2 hover:text-blue-500"
          >
            Services
          </a>
          <a
            onClick={() => setIsMenuOpen(false)}
            href="#contact"
            className="block py-2 hover:text-blue-500"
          >
            Contact
          </a>
        </div>
      )}
      {isModalHeader && <ModalAddHeader setIsModal={setIsModalHeader} />}
    </header>
  );
};

export default Header;
