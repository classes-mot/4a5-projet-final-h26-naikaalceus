import { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import Card from "../UIElements/Card";

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
            const newTicket = { ...formData, id: "ticket" + Math.random().toString(36).substring(2, 4) };
            storedTickets.push(newTicket);
        }
        localStorage.setItem("tickets", JSON.stringify(storedTickets));
        navigate("/");
    };
    return (
        <div>
            <Card>
                <h2>{ticketId ? "Modifier le ticket" : "Ajouter le ticket"}</h2>
                <form onSubmit={handleSubmit}>
                    <div>
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

                    <div>
                        <label>Location</label>
                        <select name="location" value={formData.location} onChange={handleChange}>
                            <option value="Beyoncé">Beyoncé</option>
                            <option value="Kittie">Kittie</option>
                            <option value="MeganTS">Megan thee Stallion</option>
                            <option value="MenITrust">Men I Trust</option>
                            <option value="PinkPantheress">PinkPantheress</option>
                            <option value="SteveLacy">Steve Lacy</option>
                        </select>
                    </div>

                    <div>
                        <label>Date</label>
                        <select name="date" value={formData.data} onChange={handleChange}>
                            <option></option>
                            <option></option>
                            <option></option>
                            <option></option>
                            <option></option>

                        </select>
                    </div>

                    <div>
                        <label>Forfait</label>
                        <input type="radio" id="forfait-base" name="forfait" value="deBase" />
                        <label for="forfait-base">De base</label>
                        <input type="radio" id="forfait-vip" name="forfait" value="vip" />
                        <label for="forfait-vip">VIP</label>
                    </div>
                    <div>
                        <button type="onSubmit">Enregistrer</button>
                        <button type="onSubmit" onClick={() => navigate("/")}>Annuler</button>
                    </div>

                </form>
            </Card>
        </div>
    );
};

export default TicketForm;

