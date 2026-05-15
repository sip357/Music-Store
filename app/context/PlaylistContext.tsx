// app/context/PlaylistContext.tsx
'use client';

import React, { createContext, useContext, useEffect, useState } from "react";
import { Beat } from "../models/Beat";
import { getInstrumentals } from "../beatServices";

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
            const response: Beat[] | null = await getInstrumentals(null);

            setHasFetched(true);

            if (response) {
                setPlaylist(response);
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
