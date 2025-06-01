interface ProgressBarProps {
    currentTime: number; // Current playback time in seconds
    duration: number; // Total duration in seconds
    onSeek: (time: number) => void; // Callback for scrubbing
  }
  
export default function ProgressBar({ currentTime, duration, onSeek }: ProgressBarProps) {
    const progress = (currentTime / duration) * 100 || 0; // Calculate progress percentage
  
    const handleSeek = (e: React.MouseEvent<HTMLDivElement>) => {
      const rect = (e.target as HTMLDivElement).getBoundingClientRect();
      const clickX = e.clientX - rect.left;
      const newTime = (clickX / rect.width) * duration;
      onSeek(newTime);
    };
  
    return (
      <div
        className="relative h-4 bg-gray-200 rounded-md cursor-pointer"
        onClick={handleSeek}
      >
        <div
          className="absolute top-0 left-0 h-4 bg-blue-500 rounded-md"
          style={{ width: `${progress}%` }}
        />
      </div>
    );
  }
  