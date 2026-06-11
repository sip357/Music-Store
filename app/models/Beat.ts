import mongoose, { Schema, Document } from "mongoose";

export interface IBeat extends Document {
    title: string;
    artist: string;
    price: number;
    bpm: number;
    hashtags?: string[];
    audioUrl: string;
    coverImageUrl: string;
    dateAdded?: Date;
}

const beatSchema = new Schema<IBeat>(
    {
        title: { type: String, required: true },
        artist: { type: String, required: true },
        price: { type: Number, required: true },
        bpm: { type: Number, required: true },
        hashtags: { type: [String], default: [] },
        audioUrl: { type: String, required: true },
        coverImageUrl: { type: String, required: true },
        dateAdded: { type: Date, default: Date.now },
    },
    { timestamps: true }
);

export default mongoose.models.Beat || mongoose.model<IBeat>("Beat", beatSchema);