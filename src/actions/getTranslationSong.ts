'use server'

import { analyzeLyrics } from "@/lib/openai"
import { getSong } from "genius-lyrics-api";

export async function getTranslationSong(artist: string, title: string) {
    const response = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/api/lyrics?title=${encodeURIComponent(title)}&artist=${encodeURIComponent(artist)}`);
    const data = await response.json();
    const lyrics = data.lyrics

    const options = {
        apiKey: process.env.GENIUS_API_KEY || '',
        title,
        artist,
        optimizeQuery: true
    };
    const song = await getSong(options)

    const analysis = await analyzeLyrics(lyrics);

    return { lyrics, analysis, title: song.title, albumCover: song.albumArt }
}