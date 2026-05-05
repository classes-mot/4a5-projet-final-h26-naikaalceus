import { Link } from "react-router-dom";
import { AuthContext } from "../../context/auth-context";
import Modal from "../modal/Modal";
import { useState, useEffect, useContext } from "react";
import "./SongList.css";
import SongCard from "../songCard/SongCard"


const SongList = (props) => {

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
                <Modal titre="Confirmer la suppression" onCancel={cancelDeleteHandler} onConfirm={confirmDeleteHandler}>
                    <p>Êtes-vous sûr de vouloir supprimer cette chanson ? Vous ne pourrez plus l'écouter :(</p>
                </Modal>
            )}

            <div className="list-header">
                <input
                    type="text"
                    placeholder="Rechercher une chanson. . ."
                    className="search-bar"
                    value={searchTerm}
                    onChange={(e) => setSearchTerm(e.target.value)}
                />

                {auth.loggedIn && (<Link to="/newSong" className="button">Ajouter une chanson</Link>)}

            </div>

            {filterSongs.length === 0 ? (
                <div className="list-center">
                    <p>Aucune chanson trouvée</p>
                </div>
            ) : (
                <ul className="games_list">
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