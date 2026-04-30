import Card from "../UIElements/Card";
import { AuthContext } from "../../context/auth-context";
import { useContext } from "react";
import { Link } from "react-router-dom";

const SongCard = (props) => {
    const auth = useContext(AuthContext)

    return (
        <li>
            <Card>

                <div>
                    <h2>{props.title} - {props.artist} </h2>
                    <p>{props.album}</p>
                    <p>{props.releaseYear}</p>

                </div>

                {auth.loggedIn && <div>
                    <Link to={`/edit/${props.id}`}>
                        <button>Modifier</button>
                    </Link>
                    <button onClick={() => props.OnDelete(props.id)}>Supprimer</button>
                </div>
                }
            </Card>
        </li>
    );
};

export default SongCard 