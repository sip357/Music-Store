import { ObjectId } from "mongodb";

export interface Beat {
    _id: ObjectId; // Standard MongoDB field for document IDs,
    Title: string,
    BPM: number,
    hashtags?: string[],
    Price: number,
    src?: string,
}