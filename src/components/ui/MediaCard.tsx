'use client';

import { Media } from '@/types';
import { useRouter } from 'next/navigation';
import { useAppDispatch, useAppSelector } from '@/store/hooks';
import { setCurrentMedia, addToPlaylist } from '@/store/slices/mediaSlice';

interface MediaCardProps {
    media: Media;
}

export default function MediaCard({ media }: MediaCardProps) {
    const router = useRouter();
    const dispatch = useAppDispatch();
    const { isAuthenticated } = useAppSelector((state) => state.auth);

    const handlePlay = () => {
        if (!isAuthenticated) {
            router.push('/login');
            return;
        }
        dispatch(setCurrentMedia(media));
    };

    const handleAddToPlaylist = (e: React.MouseEvent) => {
        e.stopPropagation();
        if (!isAuthenticated) {
            router.push('/login');
            return;
        }
        dispatch(addToPlaylist(media));
    };

    const formatDuration = (seconds: number) => {
        const mins = Math.floor(seconds / 60);
        const secs = seconds % 60;
        return `${mins}:${secs.toString().padStart(2, '0')}`;
    };

    return (
        <div
            className="group relative bg-card rounded-lg overflow-hidden hover:bg-card-hover transition-all duration-300 cursor-pointer hover:shadow-glow"
            onClick={handlePlay}
        >
            {/* Thumbnail */}
            <div className="relative aspect-square overflow-hidden">
                <img
                    src={media.thumbnail}
                    alt={media.title}
                    className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-300"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/20 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                    <div className="absolute bottom-4 left-4 right-4 flex items-center justify-between">
                        <button
                            onClick={handlePlay}
                            className="w-12 h-12 bg-primary-500 rounded-full flex items-center justify-center hover:bg-primary-600 transition-colors shadow-lg"
                        >
                            <svg className="w-6 h-6 text-white ml-1" fill="currentColor" viewBox="0 0 20 20">
                                <path d="M6.3 2.841A1.5 1.5 0 004 4.11V15.89a1.5 1.5 0 002.3 1.269l9.344-5.89a1.5 1.5 0 000-2.538L6.3 2.84z" />
                            </svg>
                        </button>
                        <button
                            onClick={handleAddToPlaylist}
                            className="w-10 h-10 bg-gray-800/80 rounded-full flex items-center justify-center hover:bg-gray-700 transition-colors"
                        >
                            <svg className="w-5 h-5 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 4v16m8-8H4" />
                            </svg>
                        </button>
                    </div>
                </div>
                {/* Type Badge */}
                <div className="absolute top-2 right-2 bg-black/60 backdrop-blur-sm px-2 py-1 rounded text-xs font-medium text-white">
                    {media.type === 'audio' ? '🎵 Audio' : '🎬 Video'}
                </div>
            </div>

            {/* Content */}
            <div className="p-4">
                <h3 className="font-semibold text-white truncate mb-1">{media.title}</h3>
                <p className="text-sm text-gray-400 truncate mb-2">{media.artist}</p>
                <div className="flex items-center justify-between text-xs text-gray-500">
                    <span className="bg-gray-800 px-2 py-1 rounded">{media.genre}</span>
                    <span>{formatDuration(media.duration)}</span>
                </div>
                <div className="flex items-center mt-2 text-xs text-gray-500">
                    <svg className="w-4 h-4 mr-1" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" />
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M2.458 12C3.732 7.943 7.523 5 12 5c4.478 0 8.268 2.943 9.542 7-1.274 4.057-5.064 7-9.542 7-4.477 0-8.268-2.943-9.542-7z" />
                    </svg>
                    {media.views.toLocaleString()} views
                </div>
            </div>
        </div>
    );
}
