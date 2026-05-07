import express from 'express';
import { check } from 'express-validator';
import songsController from '../controllers/songs-controllers.js';
import checkAuth from '../middleware/check-auth.js';

const router = express.Router();

router.get('/', songsController.getSongs);

router.get('/:tid', songsController.getSongsById);

router.get('/user/:uid', songsController.getSongsByUserId);

router.use(checkAuth);

router.post(
    '/',
    [
        check('title').not().isEmpty(),
        check('artist').not().isEmpty(),
        check('album').not().isEmpty(),
        check('releaseYear').not().isEmpty(),
    ],
    songsController.createSong
);

router.patch('/:tid', songsController.updateSong);

router.delete('/:tid', songsController.deleteSong);

export default router;