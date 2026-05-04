import mongoose from "mongoose";

const userSchema = new mongoose.Schema({
    id: { type: Number, required: true },
    name: { type: String, required: true },
    email: { type: String, required: true },
    password: { type: String, required: true },
    role: { type: String, required: true },
    song: [
        {
            type: mongoose.Types.ObjectId,
            required: true,
            ref: 'Song',
        }
    ],
    ticket: [
        {
            type: mongoose.Types.ObjectId,
            required: true,
            ref: 'Ticket',
        }
    ],
});

export const User = mongoose.model('User', userSchema);