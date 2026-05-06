import { Link } from "react-router-dom";
import { AuthContext } from "../../context/auth-context";
import Modal from "../modal/Modal";
import { useState, useEffect, useContext } from "react";
import { useTranslation } from "react-i18next";

const TicketList = (props) => {
    const { t } = useTranslation;
    const [tickets, setTickets] = useState(() => {
        const storedTickets = localStorage.getItem("tickets");
        return (storedTickets && JSON.parse(storedTickets).length > 0) ? JSON.parse(storedTickets) : props.items;
    });

    const [showModal, setShowModal] = useState(false);
    const [idToDelete, setIdToDelete] = useState(null);
    const auth = useContext(AuthContext);

    useEffect(() => {

        localStorage.setItem(tickets, JSON.stringify("tickets"));

    }, [tickets]);

    const cancelDeleteHandler = () => {
        setIdToDelete(null);
        setShowModal(false);
    }

    const confirmDeleteHandler = () => {
        setTickets(prevTickets => prevTickets.filter(ticket => ticket.id !== idToDelete));
        cancelDeleteHandler();
    }

    return (
        <div className="list-container">
            {showModal && (
                <Modal titre={t('modal-title')} onCancel={cancelDeleteHandler} onConfirm={confirmDeleteHandler}>
                    <p>{t('ticket-delete-message')}</p>
                </Modal>
            )}
            <div>
                {auth.loggedIn && (<Link to="/newTicket" className="button">{t('addTicket')}</Link>)}
            </div>
        </div>
    );

};

export default TicketList;