import { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import Card from "../UIElements/Card";
import "./TicketForm.css";

const TicketForm = () => {
    const navigate = useNavigate();
    const { ticketId } = useParams();

    const [formData, setFormData] = useState(() => {
        if (ticketId) {
            const storedTickets = JSON.parse(localStorage.getItem("tickets")) || [];
            const ticketToEdit = storedTickets.find((ticket) => ticket.id === ticketId);
            if (ticketToEdit) { return ticketToEdit };
        } return {
            artist: "Beyoncé",
            location: "Mtl, CA",
            date: "16 avril 2027",
            forfait: "De base"
        };
    });

    useEffect(() => {
        if (ticketId) {
            document.title = `Modification : ${formData.title}`;
        } else {
            document.title = "Ajouter un nouveau ticket";
        }
    }, [ticketId, formData.title]);

    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData((prevData) => ({ ...prevData, [name]: value }));
    };

    const handleSubmit = (e) => {
        e.preventDefault();

        let storedTickets = JSON.parse(localStorage.getItem("Tickets")) || [];
        if (ticketId) {
            storedTickets = storedTickets.map((ticket) => (ticket.id === ticketId ? { ...formData } : ticket));
        } else {
            const newTicket = { ...formData, id: Date.now().toString() };
            storedTickets.push(newTicket);
        }
        localStorage.setItem("tickets", JSON.stringify(storedTickets));
        navigate("/tickets");
    };
    return (
        <div className="form">
            <Card className="form_card">
                <h2 className="title">{ticketId ? "Modifier le ticket" : "Ajouter un ticket"}</h2>
                <form onSubmit={handleSubmit}>
                    <div className="control">
                        <label>Artiste</label>
                        <select name="artist" value={formData.artist} onChange={handleChange}>
                            <option value="Beyoncé">Beyoncé</option>
                            <option value="Kittie">Kittie</option>
                            <option value="MeganTS">Megan thee Stallion</option>
                            <option value="MenITrust">Men I Trust</option>
                            <option value="PinkPantheress">PinkPantheress</option>
                            <option value="SteveLacy">Steve Lacy</option>
                        </select>
                    </div>

                    <div className="control">
                        <label>Location</label>
                        <select name="location" value={formData.location} onChange={handleChange}>
                            <option value="Montreal">Montréal, CA</option>
                            <option value="Toronto">Toronto, CA</option>
                            <option value="Vancouver">Vancouver, CA</option>
                            <option value="Chicago">Chicago, ÉUA</option>
                            <option value="NewYork">New York, ÉUA</option>
                            <option value="LA">Los Angeles, ÉUA</option>
                        </select>
                    </div>

                    <div className="control">
                        <label>Date</label>
                        <select name="date" value={formData.data} onChange={handleChange}>
                            <option value="160427">16 avril 2027</option>
                            <option value="060527">6 main 2027</option>
                            <option value="080527">8 main 2027</option>
                            <option value="100727">10 juin 2027</option>
                            <option value="110727">11 juin 2027</option>

                        </select>
                    </div>

                    <div className="control">
                        <label>Forfait</label>
                        <ul>
                            <li>
                                <input type="radio" id="forfait-base" name="forfait" value="deBase" />
                                <label for="forfait-base">De base</label>
                            </li>
                            <li>
                                <input type="radio" id="forfait-vip" name="forfait" value="vip" />
                                <label for="forfait-vip">VIP</label>
                            </li>
                        </ul>
                    </div>
                    <div className="btn_actions">
                        <button type="onSubmit" className="button_enregistrer">Enregistrer</button>
                        <button className="button_annuler" type="onCancel" onClick={() => navigate("/")}>Annuler</button>
                    </div>

                </form>
            </Card>
        </div>
    );
};

export default TicketForm;

