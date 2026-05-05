import SongList from "../components/songList/SongList";
import { SONGS } from "../data/songs";


const Cards = () => {

    return <SongList items={SONGS} /> 

};
export default Cards;