"use client";
import React, { useState, useEffect, useRef } from "react";
import { getBeats } from "../beatServices";
import { Beat } from "../models";
import AudioPlayer from "../components/audioPlayer";
import ProductList from "../components/product/ProductList";

export default function ProductContainer() {
    // Store fetched items in state
    const [beats, setBeats] = useState<Beat[]>([]);

    //Keep track of the most recent document fetched by the API using lastID
    const [lastID, setLastID] = useState<string | null>(null);
    
    // //Check if there are more documents to load
    const [hasMore, setHasMore] = useState<boolean>(true);

    // //Check if the app is fetching data
    const [isLoading, setIsLoading] = useState(false);

    // //Check if the app is fetching audio
    const [audioLoading, setAudioLoading] = useState<boolean>(false);

    // Ref to check if the function has run before
    const hasRun = useRef(false);

    const fetchBeats = async () => {
        console.log("Fetching beats...");
        console.log("Calling getBeats with lastID:", lastID);
        if (isLoading) return;
        
        setIsLoading(true);
    
        try {
            const response: {
                status: number;
                beatsWithUrls: Beat[];
                lastKey: {S: string} | null;
            } = await getBeats(lastID);
            console.log("API Response:", response);
            console.log("Response status:", response.status);
            console.log("Lastkey:", response.lastKey);
            console.log("Bears with URLs:", response.beatsWithUrls);
    
            if (response.status === 200 && response.beatsWithUrls.length > 0) {
                setBeats((prevBeats) => [...prevBeats, ...response.beatsWithUrls]);
                setAudioLoading(false);

                // Extract and update lastID
                const nextLastID = response.lastKey?.S || null;
                setLastID(nextLastID);
                console.log("Updated Last ID:", nextLastID);

                // Check if there are more items to load
                // Set hasMore to false if there are no more items to load
                setHasMore(!!nextLastID);
            } else {
                console.log("No beats returned from API.");
                console.warn("No beats returned from API.");
                setHasMore(false);
            }
        } catch (error) {
            console.error("Error fetching beats:", error);
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
            <ProductList beats={beats}/>
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
