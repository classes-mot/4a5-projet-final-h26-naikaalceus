import SongList from "../components/songList/SongList";
import TicketList from "../components/ticketList/TicketList";
import { SONGS } from "../data/songs";
import { TICKETS } from "../data/tickets";

const Cards = () => {

    return (
    <SongList items={SONGS} />
    <TicketList items={TICKETS} />
 );
;
export default Cards;