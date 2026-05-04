import { Link } from "react-router-dom";
//import { usest } from "react";
import NavLinks from "./NavLinks";


const MainNavigation = () => {

  
    return (
        <>

            <header>
                <h1>
                  <Link to="/">Menu</Link>
                </h1>
                <nav>
                    <NavLinks/>
                </nav>
            </header>

        </>
    );
};

export default MainNavigation;