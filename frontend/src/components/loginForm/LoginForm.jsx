import { AuthContext } from "../../context/auth-context";
import { useNavigate } from "react-router-dom";
import { useContext, useState } from "react";
import { Link } from "react-router-dom";
import "./LoginForm.css";

export default function LoginForm() {

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
        if (!data.email) {
            setEmailVide(true);
            valid = false;
        }

        if (!data.psswd === "") {
            setMdpVide(true);
            valid = false;
        }

        if (valid) {
            auth.login("ul", data.email);
            navigate("/");
        }
    };
    return (
        <div className="container">
            <form onSubmit={authSubmitHandler} className="form">
                <h2 className="title">Connexion</h2>

                <hr className="hr_control" />

                <div className="control-row">
                    <div className="control">
                        <label htmlFor="email">Courriel</label>
                        <input
                            id="email"
                            type="email"
                            name="courriel"
                            className={emailVide ? "input_valide" : ""}
                        />
                        {emailVide && <div className="msg_erreur">Le courriel est requis</div>}
                    </div>

                    <div className="control">
                        <label htmlFor="password">Mot de passe</label>
                        <input
                            id="password"
                            type="password"
                            name="password"
                            className={mdpVide ? "input_valide" : ""}
                        />
                        {mdpVide && <div className="msg_erreur">Le mot de passe est requis</div>}
                    </div>
                </div>

                <hr className="hr_control" />

                <div>
                    <p>Vous n'avez pas de compte ? <Link to="/subscribe" className="lien">S'inscrire</Link></p>
                </div>

                <div className="btn_actions">
                    <p>
                        <button type="submit" className="button">Se connecter</button>
                        <button type="reset" className="button_outline">Réinitialiser</button>
                    </p>
                </div>
            </form>
        </div>
    );

}