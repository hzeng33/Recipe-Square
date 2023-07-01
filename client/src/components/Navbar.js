import React from "react";
import {Link} from "react-router-dom";
import "./Navbar.css";

function Navbar(){
    

    return(
        <nav className="navbar">
            <h3 className="logo">RecipeSquare</h3>
            <ul className="navbar-menu">
                <Link  to="/" className="navbar-link">Home</Link>
                <Link  to="/recipeAdd" className="navbar-link">Add Recipe</Link>
                <Link  to="/about" className="navbar-link">About</Link>
            </ul>
            
        </nav>
    );
}

export default Navbar;