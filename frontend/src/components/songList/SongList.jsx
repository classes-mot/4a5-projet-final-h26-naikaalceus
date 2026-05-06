import { Link } from "react-router-dom";
import { AuthContext } from "../../context/auth-context";
import Modal from "../modal/Modal";
import { useState, useEffect, useContext } from "react";
import "./SongList.css";
import SongCard from "../songCard/SongCard"
import { useTranslation } from "react-i18next";


const SongList = (props) => {
    const { t } = useTranslation();
    const [songs, setSongs] = useState(() => {
        const storedSongs = localStorage.getItem("songs");
        return (storedSongs && JSON.parse(storedSongs).length > 0)
            ? JSON.parse(storedSongs) : props.items;
    });

    const [showModal, setShowModal] = useState(false);
    const [idToDelete, setIdToDelete] = useState(null);
    const [searchTerm, setSearchTerm] = useState("");
    const auth = useContext(AuthContext);

    useEffect(() => {

        localStorage.setItem("songs", JSON.stringify(songs));

    }, [songs]);

    const startDeleteHandler = (id) => {
        setIdToDelete(id);
        setShowModal(true);
    }
    const cancelDeleteHandler = () => {
        setIdToDelete(null);
        setShowModal(false);
    }

    const confirmDeleteHandler = () => {
        setSongs(prevSongs => prevSongs.filter(song => song.id !== idToDelete));
        cancelDeleteHandler();
    }

    const filterSongs = songs.filter((song) =>
        song.title.toLowerCase().includes(searchTerm.toLowerCase)
    );

    return (
        <div className="list_container">
            {showModal && (
                <Modal titre={t('modal.modal-title')} onCancel={cancelDeleteHandler} onConfirm={confirmDeleteHandler}>
                    <p>{t('message.song-delete-message')}</p>
                </Modal>
            )}

            <div className="list-header">
                <input
                    type="text"
                    placeholder={t('songs.searchbar_song')}
                    className="search-bar"
                    value={searchTerm}
                    onChange={(e) => setSearchTerm(e.target.value)}
                />

                {auth.loggedIn && (<Link to="/newSong" className="button">{t('songs.addSong')}</Link>)}

            </div>

            {filterSongs.length === 0 ? (
                <div className="list-center">
                    <p>{t('songs.noFoundSong')}</p>
                </div>
            ) : (
                <ul className="songs_list">
                    {filterSongs.map((song) => (
                        <SongCard
                            key={song.id}
                            id={song.id}
                            titre={song.title}
                            artiste={song.artist}
                            album={song.album}
                            anneePublication={song.releaseYear}
                            OnDelete={startDeleteHandler}
                        />
                    ))}
                </ul>
            )}
        </div>
    );

};

export default SongList;