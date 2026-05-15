export interface Beat {
    title: string;
    artist: string;
    price: number;
    bpm: number;
    hashtags?: string[];
    audioUrl: string;
    coverImageUrl: string;
    dateAdded: Date;
}