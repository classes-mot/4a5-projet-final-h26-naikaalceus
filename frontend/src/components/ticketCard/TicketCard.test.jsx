import { render, screen } from "@testing-library/react";
import { describe, expect, it } from "vitest";
import TicketCard from "./TicketCard";
import "@testing-library/jest-dom";

describe('Composant TicketCard', () => {
    it("affche les tickets de l'utilisateur", () => {
        const ticket = {
            id: "s1",
            artist: "Beyoncé",
            date: "16 avril 2027",
            location: "Montréal, CA",
            forfait: "De base"
        };

        render(
            <TicketCard

                id={ticket.id}
                artist={ticket.artist}
                date={ticket.date}
                location={ticket.location}
                forfait={ticket.forfait}
            />
        );

        expect(screen.getByText(ticket.artist)).toBeInTheDocument();
        expect(screen.getByText(ticket.date)).toBeInTheDocument();
        expect(screen.getByText(ticket.location)).toBeInTheDocument();
        expect(screen.getByText(ticket.forfait)).toBeInTheDocument();

    });
})