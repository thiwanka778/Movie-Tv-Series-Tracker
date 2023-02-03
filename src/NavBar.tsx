import React from "react"
import "./styles.css";
import {NavLink} from "react-router-dom";
import SearchRoundedIcon from '@mui/icons-material/SearchRounded';

export default function NavBar(){
    return (
        <nav className="nav">
      <p className="netprime">NetPrime</p>

      <NavLink to="/" className="mpm">Most Popular Movies</NavLink>
      <NavLink to="/tv-series" className="mpt">Most Popular Tv Series</NavLink>

     <NavLink to="/search-by-name-or-anything" className="search-div"> 
      <p className="search-icon"><SearchRoundedIcon/> </p>
      <p>Search</p>
     </NavLink>

        </nav>
    )
}

