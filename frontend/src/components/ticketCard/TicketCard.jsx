import Card from "../UIElements/Card";
import { AuthContext } from "../../context/auth-context";
import { useContext } from "react";
import { Link } from "react-router-dom";
import { useTranslation } from "react-i18next";

const TicketCard = (props) => {
    const { t } = useTranslation();
    const auth = useContext(AuthContext);

    return (
        <li className="TicketCard">
            <Card className="TicketCard_content">

                <div className="TicketCard_info">
                    <h2> {props.artist} - {props.date} - {props.location} </h2>
                    <p>{props.forfait}</p>
                </div>

                {auth.loggedIn && <div className="TicketCard_actions">
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

export default TicketCard