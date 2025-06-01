// app/context/PlaylistContext.tsx
'use client';

import React, { createContext, useContext, useEffect, useState } from "react";
import { Beat } from "../models";
import { getBeats } from "../beatServices";

type PlaylistContextType = {
  playlist: Beat[];
  setPlaylist: React.Dispatch<React.SetStateAction<Beat[]>>;
  currentTrackIndex: number;
  setCurrentTrackIndex: React.Dispatch<React.SetStateAction<number>>;
  isPlaying: boolean;
  setIsPlaying: React.Dispatch<React.SetStateAction<boolean>>;
  lastID: string | null;
    setLastID: React.Dispatch<React.SetStateAction<string | null>>;
};

const PlaylistContext = createContext<PlaylistContextType | undefined>(undefined);

export const PlaylistProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
    const [hasfetched, setHasFetched] = useState<boolean>(false);
    const [playlist, setPlaylist] = useState<Beat[]>([]);
    const [lastID, setLastID] = useState<string | null>(null);
    const [currentTrackIndex, setCurrentTrackIndex] = useState<number>(0);
    const [isPlaying, setIsPlaying] = useState<boolean>(false);

    useEffect(() => {
        const fetchBeats = async () => {
            const response: {
                status: number;
                beatsWithUrls: Beat[];
                lastKey: { S: string } | null;
            } = await getBeats(null);

            setHasFetched(true);

            switch (response?.status) {
                case 200:
                    setPlaylist(response.beatsWithUrls);
                    setLastID(response.lastKey?.S || null);
                    console.log("Last ID:", response.lastKey?.S);
                    console.log("Beats with URLs:", response.beatsWithUrls);
                    break;
                case 204:
                    console.log("No beats returned from API.");
                    setPlaylist([]);
                    setLastID(null);
                    break;
                case 400:
                    console.error("Bad request: ", response.status);
                    setPlaylist([]);
                    setLastID(null);
                    break;
                case 401:
                    console.error("Unauthorized: ", response.status);
                    setPlaylist([]);
                    setLastID(null);
                    break;
                case 403:
                    console.error("Forbidden: ", response.status);
                    setPlaylist([]);
                    setLastID(null);
                    break;
                case 404:
                    console.error("Not found: ", response.status);
                    setPlaylist([]);
                    setLastID(null);
                    break;
                case 429:
                    console.error("Too many requests: ", response.status);
                    setPlaylist([]);
                    setLastID(null);
                    break;
                case 500:
                    console.error("Server error: ", response.status);
                    setPlaylist([]);
                    setLastID(null);
                    break;
                case 503:
                    console.error("Service unavailable: ", response.status);
                    setPlaylist([]);
                    setLastID(null);
                    break;
                case 504:
                    console.error("Gateway timeout: ", response.status);
                    setPlaylist([]);
                    setLastID(null);
                    break;
                default:
                    console.error("Failed to fetch playlist");
            }
        };
        fetchBeats();
    }, []);

    
    return (
        <PlaylistContext.Provider
        value={{
            playlist,
            setPlaylist,
            currentTrackIndex,
            setCurrentTrackIndex,
            isPlaying,
            setIsPlaying,
            lastID,
            setLastID,
        }}
        >
        {children}
        </PlaylistContext.Provider>
    );
    }


export const usePlaylist = () => {
  const context = useContext(PlaylistContext);
  if (!context) throw new Error('usePlaylist must be used within a PlaylistProvider');
  return context;
};
