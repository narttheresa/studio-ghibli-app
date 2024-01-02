import React, { useState, useEffect } from "react";
import { NavLink } from "react-router-dom";
import "../Styles/NavBar.css";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faArrowUp } from "@fortawesome/free-solid-svg-icons";

function NavBar() {
  const [isSticky, setIsSticky] = useState(false);

  useEffect(() => {
    function handleScroll() {
      setIsSticky(window.scrollY > 40);
    }
    window.addEventListener("scroll", handleScroll);

    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  function handleScrollToTop() {
    window.scrollTo({
      top: 0,
      behavior: 'smooth',
    });
  }

  return (
    <div className="body">
      <nav
        className="navbar"
        style={{ position: isSticky ? "fixed" : "relative", top: 0 }}
      >
        <div className="scroll-to-top">
          <FontAwesomeIcon icon={faArrowUp} onClick={handleScrollToTop} />
          <p>Back to top</p>
        </div>
        <ul>
          <li>
            <NavLink to="/" activeClassName="active">
              Home
            </NavLink>
          </li>
          <li>
            <NavLink to="/films" activeClassName="active">
              Films
            </NavLink>
          </li>
          <li>
            <NavLink to="/people" activeClassName="active">
              Characters
            </NavLink>
          </li>
          <li>
            <NavLink to="/favourites" activeClassName="active">
              Favourites
            </NavLink>
          </li>
          <li>
            <NavLink to="/quiz" activeClassName="active">
              Quiz
            </NavLink>
          </li>
        </ul>
      </nav>
    </div>
  );
}

export default NavBar;
