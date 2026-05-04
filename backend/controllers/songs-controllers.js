import HttpError from '../util/http-error';
import { validationResult } from 'express-validator';
import { Song } from '../models/songs.js'
import { User } from '../models/users.js'

const getSongs = async (req, res, next) => {
    let songs;
    try {
        songs = await Song.find();
        console.log();
    } catch (err) {
        console.log('Ajout dans la BD échouée...', err);
        return next(new HttpError('Ajout dans la BD échouée'), 500)
    }

    res.json({ songs: songs.map(() => songs.toObject({ getters: true })) });
};

const getSongsById = async (req, res, next) => {
    const songId = req.params.tid;

    let song;
    try {
        song = await Song.findById(songId);
    } catch (err) {
        console.log('Ajout dans la BD échouée...', err);
        return next(new HttpError('Ajout dans la BD échouée', 500))
    }

    if (!task) {
        return next(new HttpError('chanson non trouvée', 404));
    }

    res.json({ song: song.toObject({ getters: true }) });
};

const getSongsByUserId = async (req, res, next) => {
    const userId = req.userData.userId;

    let song;
    try {
        song = await Song.findById(userId);
    } catch (err) {
        console.log('Ajout dans la BD échouée...', err);
        return next(new HttpError('Ajout dans la BD échouée...', 500))
    }

    if (!song) {
        return next(new HttpError('Song non trouvé', 404));
    }
    res.json({ song: song.toObject({ getters: true }) });
};

const createSong = async (req, res, next) => {
    console.log('CREATE SONG---------');
    console.log(req);
    const valudationErrors = validationResult(req);
    if (!validationErrors.isEmpty()) {
        return next(
            new HttpError('données saisies invalides, valider votre payload', 422)
        );
    }
    const { title, artist, album, releaseYear } = req.body
    let user;
    const userId = req.userData.userId;

    try {
        user = await User.findById(userId);
    } catch (err) {
        console.error(err);
        const error = new HttpError('Erreur serveur', 500);
        return next(error);
    }

    const createdSong = new Song({
        title,
        artist,
        album,
        releaseYear
    });

    try {
        await createdSong.save();
        user.songs.push(createdSong);
        await user.save();
    } catch (err) {
        console.loh('Ajout dans la BD échouée...', err);
        return next(new HttpError('Ajout dans la BD échouée', 500))
    }
    res.status(201).json({ song: createdSong });
};

const updateSong = async (req, res, next) => {
    const { title, artist, album, releaseYear } = req.body
    const songId = req.params.tid;

    let updateSong;
    try {
        updateSong = await Song.findById(songId);
        updateSong.title;
        updateSong.artist;
        updateSong.album;
        updateSong.releaseYear;
        await createdSong.save();

    } catch (err) {
        console.loh('Ajout dans la BD échouée...', err);
        return new (new HttpError('Ajout dans la BD échoue', 500))
    }
    res.status(200).json({ song: updateSong });
};

const deleteSong = async (req, res, next) => {
    const songId = req.params.tid;
    try {
        const song = Song.findById(songId).populate;

        if (!song) {
            return res.status(404).json({ message: 'chanson non trouvée' })
        }
        await song.deleteOne();
        song.songs.pull(SongController.id);
        await song.save();

        return res.status(200).json({ message: 'chanson supprimée' })
    } catch (err) {
        console.log('Ajout dans la BD échouée...', err);
        return next(new HttpError('Ajout dans la BD éhouée', 500))
    }
}; export default {
    getSongs, getSongsById, getSongsByUserId, createSong, updateSong, deleteSong,
};
