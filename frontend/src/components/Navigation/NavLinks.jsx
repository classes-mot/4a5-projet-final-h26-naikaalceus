import { useContext } from "react";
import { NavLink } from "react-router-dom";
import { AuthContext } from "../../context/auth-context";

const NavLinks = () => {

    const auth = useContext(AuthContext)

    return (
        <ul>
            <li>
                <NavLink to="/" end>Menu</NavLink>
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