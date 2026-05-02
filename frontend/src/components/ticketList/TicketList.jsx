import { Link } from "react-router-dom";
import { AuthContext } from "../../context/auth-context";
import Modal from "../modal/Modal";
import { useState, useEffect, useContext } from "react";

const TicketList = (props) => {

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
        <div>
            {showModal && (
                <Modal titre="Confirmer la suppression" onCancel={cancelDeleteHandler} onConfirm={confirmDeleteHandler}>
                    <p>Êtes-vous sûr de vouloir supprimer ce ticket ?</p>
                </Modal>
            )}
            <div>
                {auth.loggedIn && (<Link to="/newTicket">Ajouter un ticket</Link>)}
            </div>
        </div>
    );

};

export default TicketList;