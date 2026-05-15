"use client";
import React, { useState, useEffect, useRef } from "react";
import { getInstrumentals } from "../beatServices";
import { Beat } from "../models/Beat";
import { usePlaylist } from "../context/PlaylistContext";
import ProductList from "../components/product/ProductList";

export default function ProductContainer() {
    const globalPlaylist = usePlaylist();
    
    // //Check if there are more documents to load
    const [hasMore, setHasMore] = useState<boolean>(true);

    // //Check if the app is fetching data
    const [isLoading, setIsLoading] = useState(false);

    // //Check if the app is fetching audio
    const [audioLoading, setAudioLoading] = useState<boolean>(false);

    // Ref to check if the function has run before
    const hasRun = useRef(false);

    const fetchBeats = async () => {
        // Check if the app is already loading data
        // If it is, do not call the API again
        if (isLoading) return;
        
        setIsLoading(true);
    
        try {
            const response: Beat[] = await getInstrumentals(globalPlaylist.lastID);
            console.log("API Response:", response);
    
            if (response.length > 0) {
                // Append new beats to the existing playlist
                globalPlaylist.setPlaylist((prevBeats) => [...prevBeats, ...response]);
                setAudioLoading(false);

                // Extract and update lastID
                const nextLastID = response[response.length - 1]._id; // Assuming each beat has a unique 'id' field
                globalPlaylist.setLastID(nextLastID!);
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
            <ProductList/>
            <div className="flex items-center justify-center my-2">
                {hasMore ? (
                <button onClick={fetchBeats} disabled={isLoading}
                    className="rounded-full border border-solid border-black/[.08] dark:border-white/[.145] transition-colors flex items-center justify-center hover:bg-[#f2f2f2] dark:hover:bg-[#1a1a1a] hover:border-transparent text-sm sm:text-base h-10 sm:h-12 px-4 sm:px-5 sm:min-w-44"
                >
                    {isLoading ? "Loading..." : "Load More"}
                    </button>
                ) : (
                    <span>No more beats to loads.</span>
                )}
            </div>
        </div>
    );
}
