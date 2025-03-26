import { ObjectId } from "mongodb";

export interface Beat {
    Id: string,
    Title: string,
    BPM: number,
    Hashtags: string[],
    Price?: number,
    src: string,
}