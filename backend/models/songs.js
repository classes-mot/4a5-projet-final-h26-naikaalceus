import mongoose from "mongoose";

const songSchema = new mongoose.Schema({
    id: { type: Number, required: true },
    title: { type: String, required: true },
    artist: { type: String, required: true },
    album: { type: String, required: true },
    releaseYear: { type: String, required: true },
});

export const Song = mongoose.model('Song', songSchema)