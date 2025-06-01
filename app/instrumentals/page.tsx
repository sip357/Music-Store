"use client";
import React, { useState, useEffect, useRef } from "react";
import { getBeats } from "../beatServices";
import { Beat } from "../models";
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
            const response: {
                status: number;
                beatsWithUrls: Beat[];
                lastKey: {S: string} | null;
            } = await getBeats(globalPlaylist.lastID);
            console.log("API Response:", response);
            console.log("Responsstatus:", response.status);
            console.log("Lastkey:", response.lastKey);
            console.log("Bears with URLs:", response.beatsWithUrls);
    
            if (response.status === 200 && response.beatsWithUrls.length > 0) {
                globalPlaylist.setPlaylist((prevBeats) => [...prevBeats, ...response.beatsWithUrls]);
                setAudioLoading(false);

                // Extract and update lastID
                const nextLastID = response.lastKey?.S || null;
                globalPlaylist.setLastID(nextLastID);
                console.log("Updated Last ID:", nextLastID);

                // Check if there are more items to load
                // Set hasMore to false if there are no more items to load
                setHasMore(!!nextLastID);
            } else if (response.status === 200 && response.beatsWithUrls.length === 0) {
                console.log("No more beats to load.");
                setHasMore(false);
            }
            else if (response.status === 500) {
                console.error("Server error:", response);
                setHasMore(false);
            } else if (response.status === 400) {
                console.error("Bad request:", response);
                setHasMore(false);
            }
            else if (response.status === 401) {
                console.error("Unauthorized:", response);
                setHasMore(false);
            }
            else if (response.status === 403) {
                console.error("Forbidden:", response);
                setHasMore(false);
            }
            else if (response.status === 404) {
                console.error("Not found:", response);
                setHasMore(false);
            }
            else if (response.status === 429) {
                console.error("Too many requests:", response);
                setHasMore(false);
            }
            else if (response.status === 503) {
                console.error("Service unavailable:", response);
                setHasMore(false);
            }
            else if (response.status === 504) {
                console.error("Gateway timeout:", response);
                setHasMore(false);
            }            
            else {
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
