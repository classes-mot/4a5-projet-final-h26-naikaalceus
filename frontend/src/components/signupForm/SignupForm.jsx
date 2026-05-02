import { useState, useContext } from "react";
import { AuthContext } from "../../context/auth-context";
import { useNavigate } from "react-router-dom";
import { Link } from "react-router-dom";
import "./SignupForm.css";

export default function Signup() {
    const [passwdNotEqual, setPsswdNotEqual] = useState(false);
    const auth = useContext(AuthContext)
    const navigate = useNavigate();

    function handleSubmit(event) {
        event.preventDefault();
        const fd = new FormData(event.target);
        const data = Object.fromEntries(fd.entries());

        if (data.psswd !== data["confirmer-mdp"]) {
            console.log("Les mots de passes sont différents")
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
                <h2 className="title">Bienvenue !</h2>
                <p className="subtitle">Veuillez entrer vos informations. </p>

                <div className="control">
                    <label htmlFor="email"> Courriel </label>
                    <input id="email" type="email" name="courriel" required />
                </div>

                <div className="control-row">
                    <div className="control">
                        <label htmlFor="password">Mot de passe</label>
                        <input id="password" type="password" name="password" />
                    </div>
                    <div className="control">
                        <label>Confirmez le mot de passe</label>
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
                        <p>Les mots de passe doivent être pareils ! </p>
                    </div>
                )}
                <hr className="hr_control" />
                <div className="control_row">
                    <div className="control">
                        <label htmlFor="first-name">Prénom</label>
                        <input id="first-name" type="text" name="first-name" />
                    </div>

                    <div className="control">
                        <label htmlFor="last-name">Nom</label>
                        <input id="last-name" type="text" name="last-name" />
                    </div>
                </div>

                <div className="control checkbox">
                    <label htmlFor="terms-and-conditions">
                        <input type="checkbox" id="terns-and-conditions" name="terms" required />
                        J'accepte les conditions générales de ce  site web
                    </label>
                    <label htmlFor="terms-and-conditions">
                        <input type="checkbox" id="terns-and-conditions" name="terms" required />
                        Je souhaite m"inscrire à l'infolettres de ce site web
                    </label>
                </div>

                <div>
                    <p className="subtitle">Vous avez un compte ? <Link to="/auth" className="lien">Se connecter</Link></p>
                </div>

                <p className="btn_actions">
                    <button type="reset" className="button button_submit">S'inscrire</button>
                    <button type="reset" className="button button_outline">Réinitialiser</button>
                </p>
            </form>
        </div >
    );
}