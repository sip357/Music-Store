"use client";
import React, { useState, useEffect, useRef } from "react";
import { getBeats } from "../beatServices";
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

    // const fakeBeats = [
    //     { Title: "Test Beat 1", BPM: 120, Hashtags: ["chill", "lofi"]},
    //     { Title: "Test Beat 2", BPM: 130, Hashtags: ["trap"]},
    // ];
    
    // useEffect(() => {
    //     setBeats(fakeBeats);
    // }, []);

    const fetchBeats = async () => {
        console.log("Fetching beats...");
        console.log("Calling getBeats with lastID:", lastID);
        if (isLoading) return;
        
        setIsLoading(true);
    
        try {
            const response: {
                status: number;
                beatsWithUrls: Beat[];
                lastKey: string | null;
            } = await getBeats(lastID);
            console.log("Response:", response);
    
            if (response.status === 200 && response.beatsWithUrls.length > 0) {
                setBeats((prevBeats) => [...prevBeats, ...response.beatsWithUrls]);
                setAudioLoading(false);
                setLastID(response.lastKey || null);
                setHasMore(!!response.lastKey);
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

    // useEffect(() => {
    //     (async () => {
    //         try {
    //             console.log("Testing getBeats with lastID = null...");
    //             const response = await getBeats(null);
    //             console.log("API Response:", response);
    //         } catch (error) {
    //             console.error("Error calling getBeats:", error);
    //         }
    //     })();
    // }, []);
    
       

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
