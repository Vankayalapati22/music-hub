'use client';

import { useAppSelector, useAppDispatch } from '@/store/hooks';
import { setCurrentMedia, removeFromPlaylist } from '@/store/slices/mediaSlice';
import { useEffect, useRef, useState } from 'react';

export default function MediaPlayer() {
    const dispatch = useAppDispatch();
    const { currentMedia, playlist } = useAppSelector((state) => state.media);
    const [isPlaying, setIsPlaying] = useState(false);
    const [currentTime, setCurrentTime] = useState(0);
    const [duration, setDuration] = useState(0);
    const [volume, setVolume] = useState(1);
    const mediaRef = useRef<HTMLAudioElement | HTMLVideoElement>(null);

    useEffect(() => {
        if (currentMedia && mediaRef.current) {
            mediaRef.current.src = currentMedia.url;
            mediaRef.current.play();
            setIsPlaying(true);
        }
    }, [currentMedia]);

    const togglePlayPause = () => {
        if (!mediaRef.current) return;

        if (isPlaying) {
            mediaRef.current.pause();
        } else {
            mediaRef.current.play();
        }
        setIsPlaying(!isPlaying);
    };

    const handleTimeUpdate = () => {
        if (mediaRef.current) {
            setCurrentTime(mediaRef.current.currentTime);
        }
    };

    const handleLoadedMetadata = () => {
        if (mediaRef.current) {
            setDuration(mediaRef.current.duration);
        }
    };

    const handleSeek = (e: React.ChangeEvent<HTMLInputElement>) => {
        const time = parseFloat(e.target.value);
        setCurrentTime(time);
        if (mediaRef.current) {
            mediaRef.current.currentTime = time;
        }
    };

    const handleVolumeChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const vol = parseFloat(e.target.value);
        setVolume(vol);
        if (mediaRef.current) {
            mediaRef.current.volume = vol;
        }
    };

    const playNext = () => {
        if (playlist.length > 0) {
            const currentIndex = playlist.findIndex(m => m.id === currentMedia?.id);
            const nextIndex = (currentIndex + 1) % playlist.length;
            dispatch(setCurrentMedia(playlist[nextIndex]));
        }
    };

    const playPrevious = () => {
        if (playlist.length > 0) {
            const currentIndex = playlist.findIndex(m => m.id === currentMedia?.id);
            const prevIndex = currentIndex === 0 ? playlist.length - 1 : currentIndex - 1;
            dispatch(setCurrentMedia(playlist[prevIndex]));
        }
    };

    const formatTime = (seconds: number) => {
        if (isNaN(seconds)) return '0:00';
        const mins = Math.floor(seconds / 60);
        const secs = Math.floor(seconds % 60);
        return `${mins}:${secs.toString().padStart(2, '0')}`;
    };

    if (!currentMedia) return null;

    return (
        <div className="fixed bottom-0 left-0 right-0 z-50 glass-effect border-t border-gray-700">
            <div className="max-w-7xl mx-auto px-4 py-3">
                {/* Hidden media element */}
                {currentMedia.type === 'audio' ? (
                    <audio
                        ref={mediaRef as React.RefObject<HTMLAudioElement>}
                        onTimeUpdate={handleTimeUpdate}
                        onLoadedMetadata={handleLoadedMetadata}
                        onEnded={playNext}
                    />
                ) : (
                    <video
                        ref={mediaRef as React.RefObject<HTMLVideoElement>}
                        onTimeUpdate={handleTimeUpdate}
                        onLoadedMetadata={handleLoadedMetadata}
                        onEnded={playNext}
                        className="hidden"
                    />
                )}

                <div className="flex items-center justify-between">
                    {/* Media Info */}
                    <div className="flex items-center space-x-4 flex-1">
                        <img
                            src={currentMedia.thumbnail}
                            alt={currentMedia.title}
                            className="w-14 h-14 rounded object-cover"
                        />
                        <div className="min-w-0">
                            <h4 className="font-semibold text-white truncate">{currentMedia.title}</h4>
                            <p className="text-sm text-gray-400 truncate">{currentMedia.artist}</p>
                        </div>
                    </div>

                    {/* Controls */}
                    <div className="flex-1 max-w-2xl mx-8">
                        <div className="flex items-center justify-center space-x-4 mb-2">
                            <button
                                onClick={playPrevious}
                                className="text-gray-400 hover:text-white transition-colors"
                                disabled={playlist.length === 0}
                            >
                                <svg className="w-6 h-6" fill="currentColor" viewBox="0 0 20 20">
                                    <path d="M8.445 14.832A1 1 0 0010 14v-2.798l5.445 3.63A1 1 0 0017 14V6a1 1 0 00-1.555-.832L10 8.798V6a1 1 0 00-1.555-.832l-6 4a1 1 0 000 1.664l6 4z" />
                                </svg>
                            </button>

                            <button
                                onClick={togglePlayPause}
                                className="w-10 h-10 bg-white rounded-full flex items-center justify-center hover:scale-105 transition-transform"
                            >
                                {isPlaying ? (
                                    <svg className="w-5 h-5 text-gray-900" fill="currentColor" viewBox="0 0 20 20">
                                        <path fillRule="evenodd" d="M18 10a8 8 0 11-16 0 8 8 0 0116 0zM7 8a1 1 0 012 0v4a1 1 0 11-2 0V8zm5-1a1 1 0 00-1 1v4a1 1 0 102 0V8a1 1 0 00-1-1z" clipRule="evenodd" />
                                    </svg>
                                ) : (
                                    <svg className="w-5 h-5 text-gray-900 ml-0.5" fill="currentColor" viewBox="0 0 20 20">
                                        <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zM9.555 7.168A1 1 0 008 8v4a1 1 0 001.555.832l3-2a1 1 0 000-1.664l-3-2z" clipRule="evenodd" />
                                    </svg>
                                )}
                            </button>

                            <button
                                onClick={playNext}
                                className="text-gray-400 hover:text-white transition-colors"
                                disabled={playlist.length === 0}
                            >
                                <svg className="w-6 h-6" fill="currentColor" viewBox="0 0 20 20">
                                    <path d="M4.555 5.168A1 1 0 003 6v8a1 1 0 001.555.832L10 11.202V14a1 1 0 001.555.832l6-4a1 1 0 000-1.664l-6-4A1 1 0 0010 6v2.798l-5.445-3.63z" />
                                </svg>
                            </button>
                        </div>

                        {/* Progress Bar */}
                        <div className="flex items-center space-x-2">
                            <span className="text-xs text-gray-400 w-10 text-right">{formatTime(currentTime)}</span>
                            <input
                                type="range"
                                min="0"
                                max={duration || 0}
                                value={currentTime}
                                onChange={handleSeek}
                                className="flex-1 h-1 bg-gray-700 rounded-lg appearance-none cursor-pointer slider"
                            />
                            <span className="text-xs text-gray-400 w-10">{formatTime(duration)}</span>
                        </div>
                    </div>

                    {/* Volume */}
                    <div className="flex items-center space-x-2 flex-1 justify-end">
                        <svg className="w-5 h-5 text-gray-400" fill="currentColor" viewBox="0 0 20 20">
                            <path fillRule="evenodd" d="M9.383 3.076A1 1 0 0110 4v12a1 1 0 01-1.707.707L4.586 13H2a1 1 0 01-1-1V8a1 1 0 011-1h2.586l3.707-3.707a1 1 0 011.09-.217zM14.657 2.929a1 1 0 011.414 0A9.972 9.972 0 0119 10a9.972 9.972 0 01-2.929 7.071 1 1 0 01-1.414-1.414A7.971 7.971 0 0017 10c0-2.21-.894-4.208-2.343-5.657a1 1 0 010-1.414zm-2.829 2.828a1 1 0 011.415 0A5.983 5.983 0 0115 10a5.984 5.984 0 01-1.757 4.243 1 1 0 01-1.415-1.415A3.984 3.984 0 0013 10a3.983 3.983 0 00-1.172-2.828 1 1 0 010-1.415z" clipRule="evenodd" />
                        </svg>
                        <input
                            type="range"
                            min="0"
                            max="1"
                            step="0.01"
                            value={volume}
                            onChange={handleVolumeChange}
                            className="w-24 h-1 bg-gray-700 rounded-lg appearance-none cursor-pointer slider"
                        />
                    </div>
                </div>
            </div>

            <style jsx>{`
        .slider::-webkit-slider-thumb {
          appearance: none;
          width: 12px;
          height: 12px;
          border-radius: 50%;
          background: #0ea5e9;
          cursor: pointer;
        }
        .slider::-moz-range-thumb {
          width: 12px;
          height: 12px;
          border-radius: 50%;
          background: #0ea5e9;
          cursor: pointer;
          border: none;
        }
      `}</style>
        </div>
    );
}
