"use client";
import React, { useState, useEffect, useRef } from "react";
import { fetchAudio, getBeats } from "../services/beats";
import { Beat } from "../models";
import AudioPlayer from "../components/audioPlayer";

export default function ProductContainer() {
    const [beats, setBeats] = useState<Beat[]>([]); // Store fetched items
    const [lastID, setLastID] = useState<string | null>(null); //Keep track of the most recent document
    const [hasMore, setHasMore] = useState<boolean>(true); //Check if there are more documents
    const [isLoading, setIsLoading] = useState(false);
    const [audioURL, setAudioURLs] = useState<string[]>([]); //Stores array of urls for each audio file
    const [playlist, setPlaylist] = useState<Beat[]>([]);
    const [audioLoading, setAudioLoading] = useState<boolean>(false);
    const hasRun = useRef(false);

    const fetchBeats = async () => {
        console.log("FetchBeats called")
        if (isLoading) return; // Prevent duplicate requests
    
        setIsLoading(true);
    
        try {
            const response: {
                status: number;
                data: Beat[];
                nextLastId: string | null;
            } = await getBeats(lastID);
    
            if (response.status === 200) {
                // Update beats state
                setBeats((prevBeats) => [...prevBeats, ...response.data]);
    
                // Fetch audio URLs
                if (response.data.length === 0) {
                    console.warn("No beats to fetch URLs for.");
                }
                await getAudioURL(response.data);

                //Allow Audio component to access url
                setAudioLoading(false);
    
                // Update lastID and hasMore states
                setLastID(response.nextLastId || null);
                if (!response.nextLastId) {
                    setHasMore(false); // No more items to fetch
                }
                setIsLoading(false);
                return
            } else {
                console.error("Error fetching items.");
            }
        } catch (error) {
            console.error("Error fetching beats: ", error);
        } finally {
            setIsLoading(false);
        }
    };
    
    const getAudioURL = async (arr: Beat[]) => {
        console.log("getAudioURL called with:", arr);
        const urls: string[] = [];
        const queue: Beat[] = [];
    
        for (const beat of arr) {
            console.log("Processing beat:", beat);
            try {
                // Convert beat.Id to string
                console.log("Raw Id:", beat._id);
                const idAsString = beat._id + ''; // Convert ObjectId to string

                // Fetch audio URL
                const response: { url: string | null } = await fetchAudio(idAsString);
                if (response.url) {
                    const url = response.url.replace("Url: ", ""); // Remove the "Url: " part
                    beat.src = url;
                    //Add Beat to the playlist
                    playlist.push(beat);
                    console.log("Beat: ", beat);
                    urls.push(url); // Collect the cleaned URL
                }
            } catch (error) {
                console.error(`Error fetching audio for beat ${beat._id}: `, error);
            }
        }
        //Update playlist
        setPlaylist((prevPlaylist) => [...prevPlaylist, ...queue]);

        // Update audioURLs state once after the loop
        setAudioURLs((prevURLs) => [...prevURLs, ...urls]);
    };
    

    // Fetch initial items on mount
    useEffect(() => {
        setAudioLoading(true);
        if (!hasRun.current) {
            hasRun.current = true;
            fetchBeats();
        }
    }, []);

    return (
        <div className="overflow-x-auto my-6">
            <table className="table-fixed m-auto bg-inherit w-4/5 md:table-auto">
                <thead>
                    <tr>
                        <th>Title</th>
                        <th>BPM</th>
                        <th>Tags</th>
                        <th>Price</th>
                    </tr>
                </thead>
                <tbody>
                    {beats.map((beat, index) => (
                        <tr key={index}>
                            <td>{beat.Title}</td>
                            <td>{beat.BPM}</td>
                            <td>{beat.hashtags?.map((tag: string | null) => `#${tag}`).join(", ")}</td>
                            <td>{beat.Price}</td>
                        </tr>
                    ))}
                </tbody>
            </table>
            <div className="flex items-center justify-center my-2">
                {hasMore ? (
                <button onClick={fetchBeats} disabled={isLoading}
                    className="rounded-full border border-solid border-black/[.08] dark:border-white/[.145] transition-colors flex items-center justify-center hover:bg-[#f2f2f2] dark:hover:bg-[#1a1a1a] hover:border-transparent text-sm sm:text-base h-10 sm:h-12 px-4 sm:px-5 sm:min-w-44"
                >
                    {isLoading ? "Loading..." : "Load More"}
                    </button>
                ) : (
                    <span>No more beats to load.</span>
                )}
            </div>
            <section>
                {audioLoading ? (
                    ""
                ) : (
                    <div className="block w-full mr-auto ml-auto">
                        <AudioPlayer playlist ={playlist} />
                    </div>
                )
                }
            </section>
        </div>
    );
}
