import React, { useState, useRef } from 'react';
import { 
  Play, 
  Pause, 
  Volume2, 
  VolumeX, 
  SkipForward, 
  SkipBack 
} from 'lucide-react';

const CustomAudioPlayer = ({ song }) => {
  const audioRef = useRef(null);
  const [isPlaying, setIsPlaying] = useState(false);
  const [progress, setProgress] = useState(0);
  const [volume, setVolume] = useState(1);
  const [isMuted, setIsMuted] = useState(false);

  // Toggle play/pause
  const togglePlayPause = () => {
    if (audioRef.current) {
      if (isPlaying) {
        audioRef.current.pause();
      } else {
        audioRef.current.play();
      }
      setIsPlaying(!isPlaying);
    }
  };

  // Update progress bar
  const updateProgress = (e) => {
    const { currentTime, duration } = e.target;
    const progressPercent = (currentTime / duration) * 100;
    setProgress(progressPercent);
  };

  // Seek functionality
  const handleSeek = (e) => {
    const seekTime = (e.target.value / 100) * audioRef.current.duration;
    audioRef.current.currentTime = seekTime;
    setProgress(e.target.value);
  };

  // Volume control
  const handleVolumeChange = (e) => {
    const newVolume = parseFloat(e.target.value);
    setVolume(newVolume);
    audioRef.current.volume = newVolume;
    setIsMuted(newVolume === 0);
  };

  // Toggle mute
  const toggleMute = () => {
    if (audioRef.current) {
      const newMuteState = !isMuted;
      setIsMuted(newMuteState);
      audioRef.current.muted = newMuteState;
    }
  };

  // Format time
  const formatTime = (time) => {
    if (!time) return '0:00';
    const minutes = Math.floor(time / 60);
    const seconds = Math.floor(time % 60);
    return `${minutes}:${seconds < 10 ? '0' : ''}${seconds}`;
  };

  return (
    <div className="bg-gray-100 rounded-lg p-4 shadow-md">
      {/* Audio Element */}
      <audio 
        ref={audioRef} 
        src={song.songUrl}
        onTimeUpdate={updateProgress}
        onEnded={() => setIsPlaying(false)}
      />

      {/* Song Information */}
      <div className="flex items-center mb-4">
        <img 
          src={song.coverImageUrl} 
          alt={song.title} 
          className="w-16 h-16 rounded-md mr-4 object-cover"
        />
        <div>
          <h3 className="text-black font-bold text-lg">{song.title}</h3>
          <p className="text-gray-600">{song.movieName || 'Single'}</p>
        </div>
      </div>

      {/* Progress Bar */}
      <div className="mb-2 flex items-center space-x-2">
        <span className="text-black text-xs">
          {formatTime(audioRef.current?.currentTime)}
        </span>
        <input 
          type="range" 
          min="0" 
          max="100" 
          value={progress}
          onChange={handleSeek}
          className="w-full h-2 bg-gray-300 rounded-lg appearance-none cursor-pointer"
        />
        <span className="text-black text-xs">
          {formatTime(audioRef.current?.duration)}
        </span>
      </div>

      {/* Controls */}
      <div className="flex justify-center items-center space-x-4">
        {/* Previous Button (Placeholder) */}
        <button className="text-gray-600 hover:text-black">
          <SkipBack size={24} />
        </button>

        {/* Play/Pause Button */}
        <button 
          onClick={togglePlayPause} 
          className="bg-blue-500 text-white p-2 rounded-full hover:bg-blue-600"
        >
          {isPlaying ? <Pause size={24} /> : <Play size={24} />}
        </button>

        {/* Next Button (Placeholder) */}
        <button className="text-gray-600 hover:text-black">
          <SkipForward size={24} />
        </button>

        {/* Volume Control */}
        <div className="flex items-center space-x-2">
          <button onClick={toggleMute} className='text-black'>
            {isMuted ? <VolumeX size={20} /> : <Volume2 size={20} />}
          </button>
          <input 
            type="range" 
            min="0" 
            max="1" 
            step="0.1"
            value={volume}
            onChange={handleVolumeChange}
            className="w-24 h-2 bg-gray-300 rounded-lg appearance-none cursor-pointer"
          />
        </div>
      </div>
    </div>
  );
};

export default CustomAudioPlayer;