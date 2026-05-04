import Card from "../UIElements/Card";
import { AuthContext } from "../../context/auth-context";
import { useContext } from "react";
import { Link } from "react-router-dom";
import "./SongCard.css";

const SongCard = (props) => {
    const auth = useContext(AuthContext)

    return (
        <li className="SongCard">
            <Card className="SongCard_content">

                <div className="SongCard_info">
                    <h2>{props.title} - {props.artist} </h2>
                    <p>{props.album}</p>
                    <p>{props.releaseYear}</p>

                </div>

                {auth.loggedIn && <div className="SongCard_actions">
                    <Link to={`/edit/${props.id}`}>
                        <button className="btn_outline">Modifier</button>
                    </Link>
                    <button className="button" onClick={() => props.OnDelete(props.id)}>Supprimer</button>
                </div>
                }
            </Card>
        </li>
    );
};

export default SongCard 