import React, { useEffect } from "react";
import { NavLink } from "react-router-dom";
import "../Styles/NavBar.css";

function NavBar() {
  useEffect(() => {
    const handleScroll = () => {
      const navbar = document.querySelector(".navbar");
      const scrollPosition = window.pageYOffset;

      if (scrollPosition > 100) {
        // Adjust the threshold as needed
        navbar.classList.add("transparent");
      } else {
        navbar.classList.remove("transparent");
      }
    };

    window.addEventListener("scroll", handleScroll);

    return () => window.removeEventListener("scroll", handleScroll);
  }, []);
  return (
    <div>
      <nav className="navbar">
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
              Add To Favourites
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
