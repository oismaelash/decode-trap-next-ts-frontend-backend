import { getLyrics, getSong } from 'genius-lyrics-api';
import { NextResponse } from 'next/server';
import { analyzeLyrics } from '@/lib/openai';

export async function GET(request: Request) {
  try {
    const { searchParams } = new URL(request.url);
    const title = searchParams.get('title');
    const artist = searchParams.get('artist');

    if (!title || !artist) {
      return NextResponse.json(
        { error: 'Title and artist are required' },
        { status: 400 }
      );
    }

    const options = {
      apiKey: process.env.GENIUS_API_KEY || '',
      title,
      artist,
      optimizeQuery: true
    };

    const lyrics = await getLyrics(options);
    const song = await getSong(options)

    if (!lyrics) {
      return NextResponse.json(
        { error: 'Lyrics not found' },
        { status: 404 }
      );
    }

    const analysis = await analyzeLyrics(lyrics);

    return NextResponse.json({ lyrics, analysis, title: song.title, albumCover: song.albumArt });
  } catch (error) {
    console.error('Error fetching lyrics:', error);
    return NextResponse.json(
      { error: 'Failed to fetch lyrics', details: error },
      { status: 500 }
    );
  }
} 