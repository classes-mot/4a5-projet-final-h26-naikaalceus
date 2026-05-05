import { Link } from "react-router-dom";
import { useContext } from "react";
import { AuthContext } from "../../context/auth-context";
import "./Menu.css";

const Menu = () => {
    const auth = useContext(AuthContext)
    return (
        !auth.loggedIn ? (
            <>
                <div className="container">
                    <h1 className="title">Bienvenue à toutes et à tous !</h1>
                    <p className="subtitle">En vous inscrivant, vous gagnez accès à une bibliothèque de musique complètement personnalisée. Et encore mieux, vous gagnez aussi accès aux ventes de tickets de vos artistes préférés ! </p>
                    <hr className="hr_control" />

                    <div>
                        <p className="btn_actions">
                            <Link to="/subscribe" className="button">Inscrivez-vous</Link>
                            <Link to="/auth" className="button">Connectez-vous</Link>
                        </p>
                    </div>
                </div>
            </>
        ) : (

            <>
                <div className="container">
                    <h1 className="title">Bon retour !</h1>
                    <p className="subtitle">Que souhaitez-vous faire ? </p>
                    <hr className="hr_control" />

                    <div>
                        <p className="btn-actions">
                            <Link to="/songs" className="button">Consulter vos chanson</Link>
                            <Link to="/tickets" className="button">Consulter vos tickets</Link>
                        </p>
                    </div>
                </div>
            </>
        )
    );
};

export default Menu;

