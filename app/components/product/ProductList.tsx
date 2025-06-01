import { Beat } from "@/app/models";
import React from "react";
import { usePlaylist } from "@/app/context/PlaylistContext";

export default function ProductList() {
    const globalPlaylist = usePlaylist();
    const beats = globalPlaylist.playlist;
    const lastID = globalPlaylist.lastID;
    // Normalize the beats array
    const beatsArray = Array.isArray(beats) ? beats : [beats];
    const normalizedBeats = beatsArray.map((beat) => ({
        Title: beat?.Title?.S || "Unknown Title",
        BPM: beat?.BPM?.N || "Unknown BPM",
        Hashtags: beat?.Hashtags?.SS || [],
    }));

    if (!normalizedBeats || normalizedBeats.length === 0) {
        return <div>No products available.</div>; // Handle empty state
    }

    return (
        <div className="overflow-x-auto my-6">
            <table className="table-fixed m-auto bg-inherit w-4/5 md:table-auto">
                <thead>
                    <tr>
                        <th>Title</th>
                        <th>BPM</th>
                        <th>Tags</th>
                    </tr>
                </thead>
                <tbody>
                    {normalizedBeats.map((beat, index) => (
                        <tr key={index}>
                            <td>
                                <button
                                    onClick={() => {
                                        globalPlaylist.setIsPlaying(true);
                                        globalPlaylist.setCurrentTrackIndex(index);
                                    }}
                                    className="bg-gray-200 hover:bg-gray-300 text-gray-800 font-bold py-2 px-4 rounded"
                                >
                                    Play
                                </button>
                            </td>
                            <td className="text-left">{beat.Title}</td>
                            <td>{beat.BPM}</td>
                            <td
                                className="whitespace-nowrap overflow-hidden text-ellipsis max-w-xs"
                            >
                                {beat.Hashtags.map((tag: string) => `#${tag}`).join(", ")}
                            </td>
                        </tr>
                    ))}
                </tbody>
            </table>
        </div>
    );
}