import React from "react";
import { NavLink } from "react-router-dom";

function NavBar() {
    return (
        <div>
           <nav>
            <ul>
                <li>
                    <NavLink exact to ="/">Home</NavLink>
                </li>
                <li>
                    <NavLink to ="/films">Films</NavLink>
                </li>
                <li>
                    <NavLink to ="/people">Characters</NavLink>
                </li>
                <li>
                    <NavLink to ="/favourites">Add To Favourites</NavLink>
                </li>
                <li>
                    <NavLink to ="/quiz">Quiz</NavLink>
                </li>
            </ul>
           </nav> 
        </div>

    )
}


export default NavBar;