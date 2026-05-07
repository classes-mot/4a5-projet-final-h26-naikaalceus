import { render, screen } from "@testing-library/react";
import { describe, expect, it } from "vitest";
import SongCard from "./SongCard";
import "@testing-library/jest-dom";

describe('Composant SongCard', () => {
    it("affche les chansons de l'utilisateur", () => {
        const song = {
            id: "s1",
            title: "ALL UP IN YOUR MIND",
            artist: "Beyoncé",
            album: "Renaissance",
            releaseYear: "2022"
        };

        render(
            <SongCard

                id={song.id}
                title={song.title}
                album={song.album}
                artist={song.artist}
                releaseYear={song.releaseYear}
            />
        );

        expect(screen.getByText(song.title)).toBeInTheDocument();
        expect(screen.getByText(song.artist)).toBeInTheDocument();
        expect(screen.getByText(song.album)).toBeInTheDocument();
        expect(screen.getByText(song.releaseYear)).toBeInTheDocument();

    });
})