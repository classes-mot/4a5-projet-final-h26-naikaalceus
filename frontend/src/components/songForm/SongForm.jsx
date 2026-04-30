import { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import Card from "../UIElements/Card";

const SongForm = () => {
    const navigate = useNavigate();
    const { songId } = useParams();

    const [formData, setFormData] = useState(() => {
        if (songId) {
            const storedSongs = JSON.parse(localStorage.getItem("songs")) || [];
            const songToEdit = storedSongs.find((song) => song.id === songId);
            if (songToEdit) { return songToEdit };
        } return {
            title: "",
            artist: "",
            album: "",
            releaseYear: ""
        };
    });

    const [errors, setErrors] = useState({});

    useEffect(() => {
        if (songId) {
            document.title = `Modification : ${formData.title}`;
        } else {
            document.title = "Ajouter une nouvelle chanson";
        }
    }, [songId, formData.title]);

    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData((prevData) => ({ ...prevData, [name]: value }));
    };

    const validate = () => {
        let errs = {};
        if (!formData.title.trim()) errs.title = "Le titre est requis";
        if (!formData.title.trim()) errs.artist = "L'artiste est requis";
        setErrors(errs);
        return Object.keys(errs).length === 0;
    };

    const handleSubmit = (e) => {
        e.preventDefault();
        if (!validate()) return;

        let storedSongs = JSON.parse(localStorage.getItem("songs")) || [];
        if (songId) {
            storedSongs = storedSongs.map((song) => (song.id === songId ? { ...formData } : song));
        } else {
            const newSong = { ...formData, id: "song" + Math.random().toString(36).substring(2, 4) };
            storedSongs.push(newSong);
        }
        localStorage.setItem("songs", JSON.stringify(storedSongs));
        navigate("/");
    };
    return (
        <div>
            <Card>
                <h2>{songId ? "Modifier la chanson" : "Ajouter la chanson"}</h2>
                <form onSubmit={handleSubmit}>
                    <div>
                        <label>Titre</label>
                        <input type="text" name="title" value={formData.title} onChange={handleChange} />
                        {errors.title && <span>{errors.title}</span>}
                    </div>

                    <div>
                        <label>Artiste</label>
                        <input type="text" name="artist" value={formData.artist} onChange={handleChange} />
                        {errors.artist && <span>{errors.artist}</span>}
                    </div>

                    <div>
                        <label>Album</label>
                        <input type="text" name="album" value={formData.album} onChange={handleChange} />
                    </div>

                    <div>
                        <label>Date de publication</label>
                        <input type="text" name="releaseYear" value={formData.releaseYear} onChange={handleChange} placeholder="ex: 1999" />
                    </div>
                    <div>
                        <button type="onSubmit">Enregistrer</button>
                        <button type="onSubmit" onClick={() => navigate("/")}>Annuler</button>
                    </div>

                </form>
            </Card>
        </div>

    );
};

export default SongForm;
