import { Link } from "react-router-dom";
import { useContext } from "react";
import { AuthContext } from "../../context/auth-context";
import "./Menu.css";
import { useTranslation } from "react-i18next";

const Menu = () => {
    const { t, i18n } = useTranslation();
    const auth = useContext(AuthContext)
    return (
        !auth.loggedIn ? (
            <>
                <div className="container">
                    <h1 className="title">{t('welcome_NotLoggedIn')}</h1>
                    <p className="subtitle">{t('menuMessage_NotLoggedIn')}</p>
                    <hr className="hr_control" />

                    <div>
                        <p className="btn_actions">
                            <Link to="/subscribe" className="button">{t('signUp')}</Link>
                            <Link to="/auth" className="button">{t('login')}</Link>
                        </p>
                    </div>
                </div>
            </>
        ) : (

            <>
                <div className="container">
                    <h1 className="title">{t('welcome_LoggedIn')}</h1>
                    <p className="subtitle">{t('menuMessage_LoggedIn')}</p>
                    <hr className="hr_control" />

                    <div>
                        <p className="btn-actions">
                            <Link to="/songs" className="button">{t('viewSongs')}</Link>
                            <Link to="/tickets" className="button">{t('viewTickets')}</Link>
                        </p>
                    </div>
                </div>
            </>
        )
    );
};

export default Menu;

