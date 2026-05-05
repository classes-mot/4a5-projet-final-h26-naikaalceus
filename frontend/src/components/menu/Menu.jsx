import { Link } from "react-router-dom";
import "./Menu.css";

<>
    <h1 className="title">Bienvenue à toutes et à tous !</h1>
    <p className="subtitle">En vous inscrivant, vous gagnez accès à une bibliothèque de musique complètement personnalisée. Et encore mieux, vous gagnez aussi accès aux ventes de tickets de vos artistes préférés ! </p>
    
    <hr className="hr_control" />
    <p className="btn_actions">
        <Link to="/subscribe" className="button">Inscrivez-vous</Link>
        <Link to="/auth" className="button">Connectez-vous</Link>
    </p>
</>