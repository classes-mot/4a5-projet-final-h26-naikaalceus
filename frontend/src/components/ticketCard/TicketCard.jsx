import Card from "../UIElements/Card";
import { AuthContext } from "../../context/auth-context";
import { useContext } from "react";
import { Link } from "react-router-dom";
import { useTranslation } from "react-i18next";

const TicketCard = (props) => {
    const { t } = useTranslation;
    const auth = useContext(AuthContext);

    return (
        <li>
            <Card>

                <div>
                    <h2> {props.artist} - {props.date} - {props.location} </h2>
                    <p>{props.forfait}</p>
                </div>

                {auth.loggedIn && <div>
                    <Link to={`/edit/${props.id}`}>
                        <button>{t('modal.edit')}</button>
                    </Link>
                    <button onClick={() => props.OnDelete(props.id)}>{TicketCard('modal.delete')}</button>
                </div>
                }
            </Card>
        </li>
    );
};

export default TicketCard