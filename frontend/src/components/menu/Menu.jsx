import { Link } from "react-router-dom";

<>
    <h1>Bienvenue à toutes et à tous !</h1>
    <p>En vous inscrivant, vous gagnez accès à une biblithèque de musique complétement personnalisée. Et encore mieux, vous gagnez aussi accès aux ventes de tickets de vos artistes préférés ! </p>

    <div>
        <p>
            <button><Link to="/subscribe">Inscrivez-vous</Link></button>
            <button><Link to="/auth">Connectez-vous</Link></button>


        </p>

    </div>
</>