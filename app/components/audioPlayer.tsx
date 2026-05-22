'use client';
import  React, { useEffect, useRef, useState } from "react";
import { Beat } from "../models/Beat";
import { ForwardIcon, PauseIcon, PlayIcon, RewindIcon } from "./icons";
import ProductList from "./product/ProductList";
import { usePlaylist } from "../context/PlaylistContext";

export default function AudioPlayer() {
  const globalPlaylist = usePlaylist()
  const [currentTrackIndex, setCurrentTrackIndex] = useState<number>(0); // State to manage the current track index
  const [isPlaying, setIsPlaying] = useState<boolean>(false); // State to manage the play/pause status
  const [progress, setProgress] = useState<number>(0); // State to manage the progress of the current track
  const [currentTime, setCurrentTime] = useState<number>(0); // State to manage the current time of the track
  const [duration, setDuration] = useState<number>(0); // State to manage the duration of the track
  const [listOpen, setListOpen] = useState<boolean>(false); // State to manage the visibility of the playlist
  const audioRef = useRef<HTMLAudioElement | null>(null); // Ref to manage the audio element

  //Handle current track index change
  useEffect(() => {
    setCurrentTrackIndex(globalPlaylist.currentTrackIndex);
  }, [globalPlaylist.currentTrackIndex]);

  // Function to handle play/pause toggle
  const handlePlayPause = () => {
    if (!audioRef.current) return;

    const audio = audioRef.current;

    try {
      if (isPlaying) {
        audio.pause();
        setIsPlaying(false);
      } else {
        audio.play();
        setIsPlaying(true);
      }
    } catch (error) {
      console.error("Playback error:", error);
    }
  };

  // Function to handle next track
  const handleNextTrack = () => {
    globalPlaylist.setCurrentTrackIndex((prevIndex) => (prevIndex + 1) % globalPlaylist.playlist.length);
  };

  // Function to handle previous track
  const handlePrevTrack = () => {
    globalPlaylist.setCurrentTrackIndex((prevIndex) =>
      prevIndex === 0 ? globalPlaylist.playlist.length - 1 : prevIndex - 1
    );
  };

  // Function to handle time update of the track
  const handleTimeUpdate = () => {
    if (audioRef.current) {
      const currentTime = audioRef.current.currentTime;
      const duration = audioRef.current.duration;
  
      if (duration && duration > 0) {
        setCurrentTime(currentTime);
        setProgress((currentTime / duration) * 100);
      }
    }
  };

  // Function to handle metadata load of the track
  const handleLoadedMetadata = () => {
    if (audioRef.current) {
      setDuration(audioRef.current.duration);
    }
  };

  const handleListOpen = () => {
    setListOpen(!listOpen);
  }

  // Function to format time in minutes and seconds
  const formatTime = (time: number) => {
    const minutes = Math.floor(time / 60);
    const seconds = Math.floor(time % 60);
    return `${minutes}:${seconds < 10 ? "0" : ""}${seconds}`;
  };


const playAudio = async () => {
  if (!audioRef.current) return;

  try {
    await audioRef.current.play();
  } catch (error) {
    console.error(error);
  }
};

const pauseAudio = () => {
  if (!audioRef.current) return;

  audioRef.current.pause();
};
  // Effect to update the audio source when the current track index changes
  useEffect(() => {
    if (audioRef.current) {
      // Pause current track and prepare the new one
      audioRef.current.pause();
      audioRef.current.src = globalPlaylist.playlist[currentTrackIndex]?.audioUrl || "";
      audioRef.current.load();
      audioRef.current.currentTime = 0; // Reset the current time for the new track
      setCurrentTime(0); // Reset the current time in state
      setProgress(0); // Reset progress for the new track
      if (isPlaying) {
        playAudio();
      }
    }
  }, [currentTrackIndex, globalPlaylist.playlist]);

  // useEffect(() => {
  //   playAudio();,
  // }, [currentTrackIndex]);
  useEffect(() => {
  const track =
    globalPlaylist.playlist[currentTrackIndex];

  if (!audioRef.current || !track) return;

  const audio = audioRef.current;

  audio.src = track.audioUrl;

  if (isPlaying) {
    playAudio();
  }
}, [currentTrackIndex]);
  

  return (
    <div>
      {globalPlaylist.isPlaying ? (
        <div className="flex w-full bg-white text-black h-12 absolute bottom-0 z-10">
          <span>{formatTime(currentTime)}</span>
          <span>{globalPlaylist.currentTrackIndex}</span>
          <div className="flex w-full justify-center items-center gap-3 size-6">
            <button onClick={handlePrevTrack}>
              <RewindIcon/>
            </button>
            <button onClick={handlePlayPause}>
              {isPlaying ? (<PauseIcon />) : (<PlayIcon />)}
            </button>
            <button onClick={handleNextTrack}>
              <ForwardIcon/>
            </button>
          </div>
          <span>{formatTime(duration)}</span> 
          <audio 
            ref={audioRef}
            onTimeUpdate={handleTimeUpdate}
            onLoadedMetadata={handleLoadedMetadata}
          />
          <button onClick={handleListOpen}>
            {listOpen ? "Close Playlist" : "Open Playlist"}
          </button>
        </div>
      ) : ("")
      }
      
      <div>
        {listOpen ? <ProductList /> : ""}
      </div>
    </div>
    
  );
}
