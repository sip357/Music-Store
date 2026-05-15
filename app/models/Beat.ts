import {Schema, model, models} from "mongoose";

export interface IBeat {
    title: string;
    artist: string;
    price: number;
    bpm: number;
    hashtags?: string[];
    audioUrl: string;
    coverImageUrl: string;
}

const BeatSchema = new Schema<IBeat>({
    title: { type: String, required: true },
    artist: { type: String, required: true },
    price: { type: Number, required: true },
    bpm: { type: Number, required: true },
    hashtags: [{ type: String }],
    audioUrl: { type: String, required: true },
    coverImageUrl: { type: String, required: true }
});

const Beat = models.Beat || model<IBeat>("Beat", BeatSchema);

export default Beat;
