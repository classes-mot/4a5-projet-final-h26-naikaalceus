import Card from "../UIElements/Card";
import { AuthContext } from "../../context/auth-context";
import { useContext } from "react";
import { Link } from "react-router-dom";
import "./SongCard.css";
import { useTranslation } from "react-i18next";

const SongCard = (props) => {

    const { t } = useTranslation();

    const auth = useContext(AuthContext)

    return (
        <li className="SongCard">
            <Card className="SongCard_content">

                <div className="SongCard_info">
                    <h2>{props.titre} - {props.artiste} </h2>
                    <p>{props.album}</p>
                    <p>{props.anneePublication}</p>

                </div>

                {auth.loggedIn && <div className="SongCard_actions">
                    <Link to={`/edit/${props.id}`}>
                        <button className="button_outline">{t('modal.edit')}</button>
                    </Link>
                    <button className="button" onClick={() => props.OnDelete(props.id)}>{t('modal.delete')}</button>
                </div>
                }
            </Card>
        </li>
    );
};

export default SongCard 