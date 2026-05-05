import { Link } from "react-router-dom";
import { useContext } from "react";
import { AuthContext } from "../../context/auth-context";
import "./Menu.css";

const Menu = () => {
    const auth = useContext(AuthContext)
    return (
        <>

            <h1 className="title">Bon retour !</h1>
            <p className="subtitle">Que souhaitez-vous faire ? </p>
            <p className="btn-actions">
                <Link to="/newSong" className="button">Consulter vos chanson</Link>
                <Link to="/newTicket" className="button">Consulter vos tickets</Link>
            </p>


            {!auth.loggedIn && (
                <>
                    <h1 className="title">Bienvenue à toutes et à tous !</h1>
                    <p className="subtitle">En vous inscrivant, vous gagnez accès à une bibliothèque de musique complètement personnalisée. Et encore mieux, vous gagnez aussi accès aux ventes de tickets de vos artistes préférés ! </p>
                    <hr className="hr_control" />
                    <p className="btn_actions">
                        <Link to="/subscribe" className="button">Inscrivez-vous</Link>
                        <Link to="/auth" className="button">Connectez-vous</Link>
                    </p>
                </>
            )}

        </>
    );
};

export default Menu;

