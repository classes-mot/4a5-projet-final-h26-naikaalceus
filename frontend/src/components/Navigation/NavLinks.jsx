import { useContext } from "react";
import { NavLink } from "react-router-dom";
import { AuthContext } from "../../context/auth-context";
import "./NavLinks.css";

const NavLinks = () => {

    const auth = useContext(AuthContext)

    return (
        <ul className="nav-links">
            <li>
                <NavLink to="/menu">Menu</NavLink>
            </li>

            {auth.loggedIn && (
                <li>
                    <NavLink to="/newSong">Ajouter une chanson</NavLink>
                    <NavLink to="/newTicket">Ajouter un ticket</NavLink>
                </li>
            )}

            {!auth.loggedIn ? (
                <>
                    <li>
                        <NavLink to="/auth">Se connecter</NavLink>
                    </li>
                    <li>
                        <NavLink to="/subscribe">S'inscrire</NavLink>
                    </li>

                </>
            ) : (
                <li>
                    <NavLink to="/" onClick={auth.logout}>Déconnexion</NavLink>
                </li>
            )}
        </ul>
    );
};

export default NavLinks;