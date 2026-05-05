import { TICKETS } from "../data/tickets";
import TicketList from "../components/ticketList/TicketList";

const TicketCards = () => {

    return <TicketList items={TICKETS} />

};
export default TicketCards;