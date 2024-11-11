'use client';
interface AudioProps {
  audioUrl: string,
}

export default function AudioPlayer({audioUrl}: AudioProps) {
  return (
    <div>
      <audio src={audioUrl}></audio>
    </div>
  );
}
