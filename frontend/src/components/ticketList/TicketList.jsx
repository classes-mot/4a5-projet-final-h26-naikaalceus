import { Link } from "react-router-dom";
import { AuthContext } from "../../context/auth-context";
import Modal from "../modal/Modal";
import { useState, useEffect, useContext } from "react";
import TicketCard from "../ticketCard/TicketCard"
import { useTranslation } from "react-i18next";


const TicketList = (props) => {
    const { t } = useTranslation;
    const [tickets, setTickets] = useState(() => {
        const storedTickets = localStorage.getItem("tickets");
        if (storedTickets && JSON.parse(storedTickets).length > 0) {
            return JSON.parse(storedTickets)
        }
        return props.items || [];
    });

    const [showModal, setShowModal] = useState(false);
    const [idToDelete, setIdToDelete] = useState(null);
    const auth = useContext(AuthContext);

    useEffect(() => {

        localStorage.setItem(tickets, JSON.stringify("tickets"));

    }, [tickets]);

const startDeleteHandler = (id) => {
        setIdToDelete(id);
        setShowModal(true);
    }

    const cancelDeleteHandler = () => {
        setIdToDelete(null);
        setShowModal(false);
    }

    const confirmDeleteHandler = () => {
        setTickets(prevTickets => prevTickets.filter(ticket => ticket.id !== idToDelete));
        cancelDeleteHandler();
    }
    const stored_Tickets = localStorage.getItem("tickets");

    return (
        <div className="list-container">
            {showModal && (
                <Modal titre={t('modal.modal-title')} onCancel={cancelDeleteHandler} onConfirm={confirmDeleteHandler}>
                    <p>{t('messages.ticket-delete-message')}</p>
                </Modal>
            )}
            <div>
                {auth.loggedIn && (<Link to="/newTicket" className="button">{t('tickets.addTicket')}</Link>)}
            </div>

            {JSON.parse(stored_Tickets).length === 0 ? (
                <div className="list-center">
                    <p>{t('tickets.noFoundTicket')}</p>
                </div>
            ) : (
                <ul className="ticket_list">
                    {stored_Tickets.map((ticket) => (
                        <TicketCard
                            key={ticket.id}
                            id={ticket.id}
                            artist={ticket.artist}
                            date={ticket.date}
                            location={ticket.location}
                            OnDelete={startDeleteHandler}
                        />
                    ))}
                </ul>
            )}
        </div>
    );

};

export default TicketList;