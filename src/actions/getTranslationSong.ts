'use server'

import { analyzeLyrics } from "@/lib/openai"
import { getLyrics, getSong } from "genius-lyrics-api";

export async function getTranslationSong(artist: string, title: string) {
    const options = {
        apiKey: process.env.GENIUS_API_KEY || '',
        title,
        artist,
        optimizeQuery: true
    };

    const lyrics = await getLyrics(options);
    const song = await getSong(options)

    if (!lyrics) {
        return { error: 'Lyrics not found' }
    }

    const analysis = await analyzeLyrics(lyrics);

    return { lyrics, analysis, title: song.title, albumCover: song.albumArt }
}