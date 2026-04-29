import { AuthContext } from "../../context/auth-context";
import { useNavigate } from "react-router-dom";
import { useContext, useState } from "react";

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
        <div>
            <form onSubmit={authSubmitHandler}>
                <h2>Connexion</h2>

                <div>
                    <div>
                        <label htmlFor="email">Courriel</label>
                        <input id="email" tupe="email" name="courriel" />
                        {emailVide && <div>Le courriel est requis</div>}
                    </div>

                    <div>
                        <label htmlFor="password">Mot de passe</label>
                        <input id="password" type="password" name="password" />
                        {mdpVide && <div>Le mot de passe est requis</div>}
                    </div>
                </div>

                <p>
                    <button type="reset">Réinitialiser</button>
                    <button type="submit">See connecter</button>

                </p>
            </form>
        </div>
    );

}