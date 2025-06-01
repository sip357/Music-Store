import { ObjectId } from "mongodb";

export interface Beat {
    Id?: {S: string},
    Title: {S: string},
    BPM: {N: number},
    Hashtags?: {SS: string[]},
    src?: {S: string},
}