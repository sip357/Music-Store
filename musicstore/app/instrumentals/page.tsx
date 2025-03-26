"use client";
import React, { useState, useEffect, useRef } from "react";
import { fetchAudio, getBeats } from "../services";
import { Beat } from "../models";
import AudioPlayer from "../components/audioPlayer";
import ProductList from "../components/product/ProductList";

export default function ProductContainer() {
    const [beats, setBeats] = useState<Beat[]>([]); // Store fetched items
    const [lastID, setLastID] = useState<string | null>(null); //Keep track of the most recent document
    const [hasMore, setHasMore] = useState<boolean>(true); //Check if there are more documents
    const [isLoading, setIsLoading] = useState(false); //Check if the app is fetching data
    const [audioLoading, setAudioLoading] = useState<boolean>(false); //Check if the app is fetching audio
    const hasRun = useRef(false);

    const fetchBeats = async () => {
        console.log("FetchBeats called")
        if (isLoading) return; // Prevent duplicate requests
    
        setIsLoading(true);
    
        try {
            const response: {
                status: number;
                beatsWithUrls: Beat[];
                lastKey: string | null;
            } = await getBeats(lastID);
    
            if (response.status === 200) {
                // Update beats state
                setBeats((prevBeats) => [...prevBeats, ...response.beatsWithUrls]);

                //Allow Audio component to access url
                setAudioLoading(false);
    
                // Update lastID and hasMore states
                setLastID(response.lastKey || null);
                if (!response.lastKey) {
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
            <ProductList beats={beats} />
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
                        <AudioPlayer playlist ={beats} />
                    </div>
                )
                }
            </section>
        </div>
    );
}
