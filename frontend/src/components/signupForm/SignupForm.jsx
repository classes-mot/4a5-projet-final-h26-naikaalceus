import { useState, useContext } from "react";
import { AuthContext } from "../../context/auth-context";
import { useNavigate } from "react-router-dom";
import { Link } from "react-router-dom";
import "./SignupForm.css";
import { useTranslation } from "react-i18next";

export default function Signup() {

    const { t } = useTranslation();

    const [passwdNotEqual, setPsswdNotEqual] = useState(false);
    const auth = useContext(AuthContext)
    const navigate = useNavigate();

    function handleSubmit(event) {
        event.preventDefault();
        const fd = new FormData(event.target);
        const data = Object.fromEntries(fd.entries());

        if (data.password !== data["confirmer-mdp"]) {
            console.log(t('passwd-error'))
            setPsswdNotEqual(true);
            return;
        }
        setPsswdNotEqual(false);
        console.log("Inscription réussie", data)

        auth.login("ul", data.courriel);
        navigate("/");
    }
    return (
        <div className="container">
            <form className="form" onSubmit={handleSubmit}>
                <h2 className="title">{t('welcomeMessage')}</h2>
                <p className="subtitle">{t('info')}</p>

                <div className="control">
                    <label htmlFor="email">{t('email')}</label>
                    <input id="email" type="email" name="courriel" required />
                </div>

                <div className="control-row">
                    <div className="control">
                        <label htmlFor="password">{t('password')}</label>
                        <input id="password" type="password" name="password" required />
                    </div>
                    <div className="control">
                        <label htmlFor="confirmer-mdp">{t('passwd-confirm')}</label>
                        <input
                            id="confirmer-mdp"
                            type="password"
                            name="confirmer-mdp"
                            required
                            className={passwdNotEqual ? "input_invalide" : ""}
                        />
                    </div>
                </div>

                {passwdNotEqual && (
                    <div className="msg_erreur">
                        <p>{t('passwd-error')} </p>
                    </div>
                )}
                <hr className="hr_control" />
                <div className="control_row">
                    <div className="control">
                        <label htmlFor="first-name">{t('first-name')}</label>
                        <input id="first-name" type="text" name="first-name" required />
                    </div>

                    <div className="control">
                        <label htmlFor="last-name">{t('last-name')}</label>
                        <input id="last-name" type="text" name="last-name" required />
                    </div>
                </div>
                <hr className="hr_control" />
                <div className="control checkbox">
                    <label htmlFor="terms-and-conditions">
                        <input type="checkbox" id="terns-and-conditions" name="terms" required />
                        {t('terms-and-conditions')}
                    </label>
                    <label htmlFor="terms-and-conditions">
                        <input type="checkbox" id="terns-and-conditions" name="terms" />
                        {t('newsletter')}
                    </label>
                </div>

                <div>
                    <p className="subtitle">{t('account')} <Link to="/auth" className="lien">{t('login')}</Link></p>
                </div>

                <p className="btn_actions">
                    <button type="submit" className="button">{t('signUp')}</button>
                    <button type="reset" className="button_outline">{t('reset')}</button>
                </p>
            </form>
        </div >
    );
}