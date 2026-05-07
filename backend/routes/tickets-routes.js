import express from 'express';
import { check } from 'express-validator';
import ticketsController from '../controllers/tickets-controllers.js';
import checkAuth from '../middleware/check-auth.js';

const router = express.Router();

router.get('/', ticketsController.getTickets);

router.get('/:tid', ticketsController.getTicketsById);

router.get('/user/:uid', ticketsController.getTicketsByUserId);

router.use(checkAuth);

router.post(
    '/',
    [
        check('artist').not().isEmpty(),
        check('location').not().isEmpty(),
        check('date').not().isEmpty(),
    ],
    ticketsController.createTicket
);

router.patch('/:tid', ticketsController.updateTicket);

router.delete('/:tid', ticketsController.deleteTicket);

export default router;