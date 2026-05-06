import { useContext } from "react";
import { NavLink } from "react-router-dom";
import { AuthContext } from "../../context/auth-context";
import "./NavLinks.css";
import { useTranslation } from "react-i18next";

const NavLinks = () => {
    const { t } = useTranslation();
    const auth = useContext(AuthContext)

    return (
        <ul className="nav-links">
            <li>
                <NavLink to="/">Menu</NavLink>
            </li>

            {auth.loggedIn && (
                <>
                    <li>
                        <NavLink to="/newSong">{t('addSong')}</NavLink>
                    </li>
                    <li>
                        <NavLink to="/newTicket">{t("addTicket")}</NavLink>
                    </li>
                    <li>
                        <NavLink to="/songs">{t('songs')}</NavLink>
                    </li>
                    <li>
                        <NavLink to="/tickets">{t('tickets')}</NavLink>
                    </li>
                </>
            )}

            {!auth.loggedIn ? (
                <>
                    <li>
                        <NavLink to="/auth">{t('login')}</NavLink>
                    </li>
                    <li>
                        <NavLink to="/subscribe">{t('signUp')}</NavLink>
                    </li>

                </>
            ) : (
                <li>
                    <NavLink to="/" onClick={auth.logout}>{t('logout')}</NavLink>
                </li>
            )}
        </ul>
    );
};

export default NavLinks;