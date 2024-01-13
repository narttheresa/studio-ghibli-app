import React, { useState, useEffect } from "react";
import { NavLink } from "react-router-dom";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faArrowUp, faBars } from "@fortawesome/free-solid-svg-icons";
import "../Styles/NavBar.css";

function NavBar() {
  //setting state variables for sticky navbar, screen resizing
  const [isSticky, setIsSticky] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [isSmallScreen, setIsSmallScreen] = useState(window.innerWidth <= 630);
  const scrollThreshold = 40;
  const mobileMenuThreshold = 630;

  useEffect(() => {
    function handleScroll() {
      setIsSticky(window.scrollY > scrollThreshold);
    }

    function handleResize() {
      const newScreenWidth = window.innerWidth;
      setIsMobileMenuOpen(newScreenWidth > mobileMenuThreshold);
      setIsSmallScreen(newScreenWidth <= 630);
    }

    window.addEventListener("scroll", handleScroll);
    window.addEventListener("resize", handleResize);

    // Initial check for mobile menu visibility
    handleResize();

    return () => {
      window.removeEventListener("scroll", handleScroll);
      window.removeEventListener("resize", handleResize);
    };
  }, []);

  //scrolls the window to the top when the icon is clicked
  function handleScrollToTop() {
    window.scrollTo({
      top: 0,
      behavior: "smooth",
    });
  }

  //toggles the state of ismobilemenuopen to show/hide the menu icon
  function toggleMobileMenu() {
    setIsMobileMenuOpen(!isMobileMenuOpen);
  }

  return (
    <div className="body">
      <nav className={`navbar ${isSticky ? "sticky" : ""}`}>
        <div className="scroll-to-top">
          <FontAwesomeIcon icon={faArrowUp} onClick={handleScrollToTop} />
          <p>Back to top</p>
        </div>
        {isSmallScreen && (
          <div className="menu-icon" onClick={toggleMobileMenu}>
            <FontAwesomeIcon icon={faBars} />
          </div>
        )}
        <ul className={isMobileMenuOpen ? "mobile-menu" : ""}>
          <li>
            <NavLink to="/" onClick={toggleMobileMenu}>
              Home
            </NavLink>
          </li>
          <li>
            <NavLink to="/films" onClick={toggleMobileMenu}>
              Films
            </NavLink>
          </li>
          <li>
            <NavLink to="/people" onClick={toggleMobileMenu}>
              Characters
            </NavLink>
          </li>
          <li>
            <NavLink to="/favourites" onClick={toggleMobileMenu}>
              Favourites
            </NavLink>
          </li>
          <li>
            <NavLink to="/quiz" onClick={toggleMobileMenu}>
              Quiz
            </NavLink>
          </li>
        </ul>
      </nav>
    </div>
  );
}

export default NavBar;