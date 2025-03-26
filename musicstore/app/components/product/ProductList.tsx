import { Beat } from "@/app/models";
import React from "react";

export default function ProductList({ beats }: { beats: Beat[] }) {
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
                            <td>{beat.Hashtags?.map((tag: string | null) => `#${tag}`).join(", ")}</td>
                            <td>{beat.Price}</td>
                        </tr>
                    ))}
                </tbody>
            </table>
        </div>
    );
}
