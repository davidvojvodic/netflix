import React, { useCallback, useState, useEffect } from "react";
import NavbarItem from "./NavbarItem";
import { BsChevronDown, BsSearch, BsBell } from "react-icons/bs";
import MobileMenu from "./MobileMenu";
import AccountMenu from "./AccountMenu";

// offset value for applying background to Navbar
const TOP_OFFSET = 66;

const Navbar = () => {
  // State variables for managing mobile menu, account menu and background visibility
  const [showMobileMenu, setShowMobileMenu] = useState(false);
  const [showAccountMenu, setShowAccountMenu] = useState(false);
  const [showBackground, setShowBackground] = useState(false);

  // Handler for updating Background visibility on scrolling
  useEffect(() => {
    const handleScroll = () => {
      if (window.scrollY >= TOP_OFFSET) {
        setShowBackground(true);
      } else {
        setShowBackground(false);
      }
    };

    window.addEventListener("scroll", handleScroll);

    return () => {
      window.removeEventListener("scroll", handleScroll);
    };
  }, []);

  // Handler for toggling the mobile menu visibility
  const toggleMobileMenu = useCallback(() => {
    setShowMobileMenu((current) => !current);
  }, []);

  // Handler for toggling the account menu visibility
  const toggleAccountMenu = useCallback(() => {
    setShowAccountMenu((current) => !current);
  }, []);

  return (
    // Navigation bar with logo and other elements
    <nav className="w-full fixed z-40">
      <div
        // Adding styling classes based on showBackground state value for adding background with transition effect
        className={`px-4 md:px-16 py-6 flex flex-row items-center transition duration-500 ${
          showBackground ? "bg-zinc-900 bg-opacity-90" : ""
        }`}
      >
        <img className="h-7 lg:h-12" src="/images/logonetflix.png" alt="Logo" />
        <div className="flex-row ml-8 gap-7 hidden lg:flex">
          {/* Navigation items */}
          <NavbarItem label="Home" />
          <NavbarItem label="Series" />
          <NavbarItem label="Films" />
          <NavbarItem label="New & Popular" />
          <NavbarItem label="My List" />
          <NavbarItem label="Browse by languages" />
        </div>
        {/* Button for mobile menu */}
        <div
          onClick={toggleMobileMenu}
          // Styling classes for mobile menu button
          className="lg:hidden flex flex-row items-center gap-2 ml-8 cursor-pointer relative"
        >
          <p className="text-white text-sm">Browse</p>
          <BsChevronDown
            // Rotating chevron icon based on showMobileMenu state value
            className={`text-white transition ${
              showMobileMenu ? "rotate-180" : "rotate-0"
            }`}
          />
          {/* Displaying mobile menu based on the showMobileMenu state value */}
          <MobileMenu visible={showMobileMenu} />
        </div>
        <div className="flex flex-row ml-auto gap-7 items-center">
          <div className="text-gray-200 hover:text-gray-300 cursor-pointer">
            <BsSearch />
          </div>
          <div className="text-gray-200 hover:text-gray-300 cursor-pointer">
            <BsBell />
          </div>
          <div
            onClick={toggleAccountMenu}
            className="flex flex-row items-center gap-2 cursor-pointer relative"
          >
            {/* Profile image */}
            <div className="w-6 h-6 lg:w-10 lg:h-10 rounded-md overflow-hidden">
              <img src="/images/default-red.png" alt="profile" />
            </div>
            <BsChevronDown
              // Rotating chevron icon based on showAccountMenu state value
              className={`text-white transition ${
                showAccountMenu ? "rotate-180" : "rotate-0"
              }`}
            />
            {/* Displaying account menu based on the showAccountMenu state value */}
            <AccountMenu visible={showAccountMenu} />
          </div>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
