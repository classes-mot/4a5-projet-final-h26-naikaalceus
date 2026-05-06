import { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import Card from "../UIElements/Card";
import "./TicketForm.css";
import { useTranslation } from "react-i18next";

const TicketForm = () => {
    const { t } = useTranslation();
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
            document.title = t('modal.edit');
        } else {
            document.title = t('tickets.addTicket');
        }
    }, [ticketId, t]);

    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData((prevData) => ({ ...prevData, [name]: value }));
    };

    const handleSubmit = (e) => {
        e.preventDefault();

        let storedTickets = JSON.parse(localStorage.getItem("tickets")) || [];
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
                <h2 className="title">{ticketId ? t('tickets.editTicket') : t('tickets.addTicket')}</h2>
                <form onSubmit={handleSubmit}>
                    <div className="control">
                        <label>{t('songs.artist')}</label>
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
                            <option value="Montreal">{t('tickets.location1')}</option>
                            <option value="Toronto">{t('tickets.location2')}</option>
                            <option value="Vancouver">{t('tickets.location3')}</option>
                            <option value="Chicago">{t('tickets.location4')}</option>
                            <option value="NewYork">{t('tickets.location5')}</option>
                            <option value="LA">{t('tickets.location6')}</option>
                        </select>
                    </div>

                    <div className="control">
                        <label>Date</label>
                        <select name="date" value={formData.data} onChange={handleChange}>
                            <option value="160427">{t('tickets.date1')}</option>
                            <option value="060527">{t('tickets.date2')}</option>
                            <option value="080527">{t('tickets.date3')}</option>
                            <option value="100727">{t('tickets.date4')}</option>
                            <option value="110727">{t('tickets.date5')}</option>

                        </select>
                    </div>

                    <div className="control">
                        <label>{t('tickets.package')}</label>
                        <ul>
                            <li>
                                <input type="radio" id="forfait-base" name="forfait" value="deBase" />
                                <label for="forfait-base">{t('tickets.basicPackage')}</label>
                            </li>
                            <li>
                                <input type="radio" id="forfait-vip" name="forfait" value="vip" />
                                <label for="forfait-vip">VIP</label>
                            </li>
                        </ul>
                    </div>
                    <div className="btn_actions">
                        <button type="onSubmit" className="button_enregistrer">{t('modal.save')}</button>
                        <button className="button_annuler" type="onCancel" onClick={() => navigate("/")}>{t('modal.cancel-button')}</button>
                    </div>

                </form>
            </Card>
        </div>
    );
};

export default TicketForm;

