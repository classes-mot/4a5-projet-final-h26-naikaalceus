import express from 'express';
import { check } from 'express-validator';
import ticketsController from '../controllers/tickets-controllers.js';
import checkAuth from '../middleware/check-auth.js';

const router = express.Router();

// Middleware pour obtenir toutes les tâches
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
    ticketsController.createTask
);

router.patch('/:tid', ticketsController.updateTask);

router.delete('/:tid', ticketsController.deleteTask);

export default router;