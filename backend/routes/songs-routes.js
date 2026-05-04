import express from 'express';
import { check } from 'express-validator';
import songsController from '../controllers/songs-controllers.js';
import checkAuth from '../middleware/check-auth.js';

const router = express.Router();

// Middleware pour obtenir toutes les tâches
router.get('/', songsController.getTasks);

router.get('/:tid', songsController.getTasksById);

router.get('/user/:uid', songsController.getTasksByUserId);

router.use(checkAuth);

router.post(
    '/',
    [
        check('title').not().isEmpty(),
        check('artist').not().isEmpty(),
        check('album').not().isEmpty(),
        check('releaseYear').not().isEmpty(),
    ],
    songsController.createTask
);

router.patch('/:tid', songsController.updateTask);

router.delete('/:tid', songsController.deleteTask);

export default router;