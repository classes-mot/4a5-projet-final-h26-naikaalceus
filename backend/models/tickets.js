import mongoose from "mongoose";

const ticketSchema = new mongoose.Schema({
    id: { type: Number, required: true },
    artist: { type: String, required: true },
    location: { type: String, required: true },
    date: { type: String, required: true },

});

export const Ticket = mongoose.model('Ticket', ticketSchema);