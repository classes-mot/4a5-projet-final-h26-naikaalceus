import { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import Card from "../UIElements/Card";
import "./SongForm.css";
import { useTranslation } from "react-i18next";

const SongForm = () => {
    const { t } = useTranslation();
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
            document.title = `t('modal.edit) : ${formData.title}`;
        } else {
            document.title = "t('songs.addSong)";
        }
    }, [songId, formData.title]);

    const handleChange = (e) => {
        const { name, value } = e.target;
        setErrors({});
        setFormData((prevData) => ({ ...prevData, [name]: value }));
    };

    const validate = () => {
        let errs = {};
        if (!formData.title.trim()) errs.title = t('errors.artist-error');
        if (!formData.artist.trim()) errs.artist = t('errors.title-error');
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
            const newSong = { ...formData, id: Date.now().toString() };
            storedSongs.push(newSong);
        }
        localStorage.setItem("songs", JSON.stringify(storedSongs));
        navigate("/songs");
    };
    return (
        <div className="form">
            <Card className="form_card">
                <h2 className="title">{songId ? t('songs.editSong') : t('songs.addSong')}</h2>
                <form onSubmit={handleSubmit}>
                    <div className="control">
                        <label>{t('songs.title')}</label>
                        <input
                            type="text"
                            name="title"
                            value={formData.title}
                            onChange={handleChange}
                        />
                        {errors.title && <span className="error">{errors.title}</span>}
                    </div>

                    <div className="control">
                        <label>{t('songs.title')}</label>
                        <input
                            type="text"
                            name="artist"
                            value={formData.artist}
                            onChange={handleChange}
                        />
                        {errors.artist && <span className="error">{errors.artist}</span>}
                    </div>

                    <div className="control">
                        <label>Album</label>
                        <input
                            type="text"
                            name="album"
                            value={formData.album}
                            onChange={handleChange} />
                    </div>

                    <div className="control">
                        <label>{t('songs.releaseYear')}</label>
                        <input
                            type="text"
                            name="releaseYear"
                            value={formData.releaseYear}
                            onChange={handleChange}
                            placeholder="ex: 1999"
                        />
                    </div>

                    <div className="btn_actions">
                        <button type="onSubmit" className="button_enregistrer">{t('modal.save')}</button>
                        <button type="onCancel" className="button_annuler" onClick={() => navigate("/")}>{t('modal.cancel-button')}</button>
                    </div>

                </form>
            </Card>
        </div>

    );
};

export default SongForm;
