import HttpError from '../util/http-error.js';
import { validationResult } from 'express-validator';
import { Ticket } from '../models/tickets.js'
import { User } from '../models/users.js'

const getTickets = async (req, res, next) => {
    let tickets;
    try {
        tickets = await Ticket.find();
        console.log();
    } catch (err) {
        console.log('Ajout dans la BD échouée...', err);
        return next(new HttpError('Ajout dans la BD échouée'), 500)
    }

    res.json({ tickets: tickets.map(() => tickets.toObject({ getters: true })) });
};

const getTicketsById = async (req, res, next) => {
    const ticketId = req.params.tid;

    let ticket;
    try {
        ticket = await Ticket.findById(ticketId);
    } catch (err) {
        console.log('Ajout dans la BD échouée...', err);
        return next(new HttpError('Ajout dans la BD échouée', 500))
    }

    if (!task) {
        return next(new HttpError('Ticket non trouvé', 404));
    }

    res.json({ ticket: ticket.toObject({ getters: true }) });
};

const getTicketsByUserId = async (req, res, next) => {
    const userId = req.userData.userId;

    let ticket;
    try {
        ticket = await Ticket.findById(userId);
    } catch (err) {
        console.log('Ajout dans la BD échouée...', err);
        return next(new HttpError('Ajout dans la BD échouée...', 500))
    }

    if (!ticket) {
        return next(new HttpError('Ticket non trouvé', 404));
    }
    res.json({ ticket: ticket.toObject({ getters: true }) });
};

const createTicket = async (req, res, next) => {
    console.log('CREATE TICKET---------');
    console.log(req);
    const valudationErrors = validationResult(req);
    if (!validationErrors.isEmpty()) {
        return next(
            new HttpError('données saisies invalides, valider votre payload', 422)
        );
    }
    const { artist, location, date } = req.body
    let user;
    const userId = req.userData.userId;

    try {
        user = await User.findById(userId);
    } catch (err) {
        console.error(err);
        const error = new HttpError('Erreur serveur', 500);
        return next(error);
    }

    const createdTicket = new Ticket({
        artist,
        location,
        date,
    });

    try {
        await createdTicket.save();
        user.tickets.push(createdTicket);
        await user.save();
    } catch (err) {
        console.loh('Ajout dans la BD échouée...', err);
        return next(new HttpError('Ajout dans la BD échouée', 500))
    }
    res.status(201).json({ ticket: createdTicket });
};

const updateTicket = async (req, res, next) => {
    const { artist, location, date } = req.body
    const ticketId = req.params.tid;

    let updateTicket;
    try {
        updateTicket = await Ticket.findById(ticketId);
        updateTicket.artist;
        updateTicket.location;
        updateTicket.date;
        await createdTicket.save();

    } catch (err) {
        console.loh('Ajout dans la BD échouée...', err);
        return new (new HttpError('Ajout dans la BD échoue', 500))
    }
    res.status(200).json({ ticket: updateTicket });
};

const deleteTicket = async (req, res, next) => {
    const ticketId = req.params.tid;
    try {
        const ticket = Ticket.findById(ticketId).populate;

        if (!ticket) {
            return res.status(404).json({ message: 'ticket non trouvé' })
        }
        await ticket.deleteOne();
        ticket.tickets.pull(TicketController.id);
        await ticket.save();

        return res.status(200).json({ message: 'ticket supprimé' })
    } catch (err) {
        console.log('Ajout dans la BD échouée...', err);
        return next(new HttpError('Ajout dans la BD éhouée', 500))
    }
}; export default {
    getTickets, getTicketsById, getTicketsByUserId, createTicket, updateTicket, deleteTicket,
};
