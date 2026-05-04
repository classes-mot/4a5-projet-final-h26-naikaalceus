import express from 'express';
import { check } from 'express-validator';
import ticketsController from '../controllers/tickets-controllers.js';
//import checkAuth from '../middleware/check-auth.js';

const router = express.Router();

// Middleware pour obtenir toutes les tâches
router.get('/', tasksController.getTasks);

router.get('/:tid', tasksController.getTasksById);

router.get('/user/:uid', tasksController.getTasksByUserId);

router.use(checkAuth);

router.post(
  '/',
  [
    check('title').not().isEmpty(),
    check('description').isLength({ min: 10 }),
    check('dueDate').not().isEmpty(),
  ],
  tasksController.createTask
);

router.patch('/:tid', tasksController.updateTask);

router.delete('/:tid', tasksController.deleteTask);

export default router;