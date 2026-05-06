import { AuthContext } from "../../context/auth-context";
import { useNavigate } from "react-router-dom";
import { useContext, useState } from "react";
import { Link } from "react-router-dom";
import "./LoginForm.css";
import { useTranslation } from "react-i18next";

export default function LoginForm() {

    const { t } = useTranslation(['messages', 'auth', 'songs', 'tickets', 'errors', 'signup', 'user-infos', 'signin', 'modal']);

    const [mdpVide, setMdpVide] = useState(false);
    const [emailVide, setEmailVide] = useState(false);

    const auth = useContext(AuthContext);
    const navigate = useNavigate();

    const authSubmitHandler = (event) => {
        event.preventDefault();
        const fd = new FormData(event.target);
        const data = Object.fromEntries(fd.entries())

        setEmailVide(false);
        setMdpVide(false)

        let valid = true;
        if (!data.courriel) {
            setEmailVide(true);
            valid = false;
        }

        if (data.password === "") {
            setMdpVide(true);
            valid = false;
        }

        if (valid) {
            auth.login("ul", data.courriel);
            navigate("/");
        }
    };
    return (
        <div className="container">
            <form onSubmit={authSubmitHandler} className="form">
                <h2 className="title">{t('login', { ns: 'auth' })}</h2>

                <hr className="hr_control" />

                <div className="control-row">
                    <div className="control">
                        <label htmlFor="email">{t('email', { ns: 'user-infos' })}</label>
                        <input
                            id="email"
                            type="email"
                            name="courriel"
                            className={emailVide ? "input_invalide" : ""}
                            required
                        />
                        {emailVide && <div className="msg_erreur">{t('email-error', { ns: 'errors' })}</div>}
                    </div>

                    <div className="control">
                        <label htmlFor="password">{t('password')}</label>
                        <input
                            id="password"
                            type="password"
                            name="password"
                            className={mdpVide ? "input_invalide" : ""}
                            required
                        />
                        {mdpVide && <div className="msg_erreur">{t('passwd-error1', { ns: 'errors' })}</div>}
                    </div>
                </div>

                <hr className="hr_control" />

                <div>
                    <p>{t('noAccount')}<Link to="/subscribe" className="lien">{t('signUp', { ns: 'auth' })}</Link></p>
                </div>

                <div className="btn_actions">
                    <p>
                        <button type="submit" className="button">{t('login', { ns: 'auth' })}</button>
                        <button type="reset" className="button_outline">{t('reset', { ns: 'modal' })}</button>
                    </p>
                </div>
            </form>
        </div>
    );

}