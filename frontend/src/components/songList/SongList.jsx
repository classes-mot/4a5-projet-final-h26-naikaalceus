import { Link } from "react-router-dom";
import { AuthContext } from "../../context/auth-context";
import Modal from "../modal/Modal";
import { useState, useEffect, useContext } from "react";
import "./SongList.css";

const SongList = (props) => {

    const [songs, setSongs] = useState(() => {
        const storedSongs = localStorage.getItem("songs");
        return (storedSongs && JSON.parse(storedSongs).length > 0) ? JSON.parse(storedSongs) : props.items;
    });

    const [showModal, setShowModal] = useState(false);
    const [idToDelete, setIdToDelete] = useState(null);
    const auth = useContext(AuthContext);

    useEffect(() => {

        localStorage.setItem("songs", JSON.stringify(songs));

    }, [songs]);

    const cancelDeleteHandler = () => {
        setIdToDelete(null);
        setShowModal(false);
    }

    const confirmDeleteHandler = () => {
        setSongs(prevSongs => prevSongs.filter(song => song.id !== idToDelete));
        cancelDeleteHandler();
    }

    return (
        <div className="list_container">
            {showModal && (
                <Modal titre="Confirmer la suppression" onCancel={cancelDeleteHandler} onConfirm={confirmDeleteHandler}>
                    <p>Êtes-vous sûr de vouloir supprimer cette chanson ? Vous ne pourrez plus l'écouter :(</p>
                </Modal>
            )}
            <div>
                {auth.loggedIn && (<Link to="/newSong" className="button">Ajouter une chanson</Link>)}
            </div>
        </div>
    );

};

export default SongList;