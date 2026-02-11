'use client';

import { useEffect, useState, Suspense } from 'react';
import { useAppDispatch, useAppSelector } from '@/store/hooks';
import { fetchMedia, setFilters } from '@/store/slices/mediaSlice';
import { useSearchParams } from 'next/navigation';
import Header from '@/components/ui/Header';
import MediaCard from '@/components/ui/MediaCard';
import MediaPlayer from '@/components/ui/MediaPlayer';
import { genres, categories } from '@/lib/mockData/media';

function BrowseContent() {
    const dispatch = useAppDispatch();
    const searchParams = useSearchParams();
    const { filteredItems, loading, filters } = useAppSelector((state) => state.media);

    const [selectedGenre, setSelectedGenre] = useState<string>('');
    const [selectedCategory, setSelectedCategory] = useState<string>('');
    const [selectedType, setSelectedType] = useState<'audio' | 'video' | ''>('');

    useEffect(() => {
        const searchQuery = searchParams.get('search') || '';
        const newFilters = {
            ...filters,
            search: searchQuery,
            genre: selectedGenre || undefined,
            category: selectedCategory || undefined,
            type: selectedType || undefined,
        };

        dispatch(setFilters(newFilters));
        dispatch(fetchMedia(newFilters));
    }, [selectedGenre, selectedCategory, selectedType, searchParams]);

    const clearFilters = () => {
        setSelectedGenre('');
        setSelectedCategory('');
        setSelectedType('');
    };

    return (
        <>
            {/* Filters */}
            <div className="mb-8 glass-effect rounded-xl p-6">
                <div className="flex items-center justify-between mb-4">
                    <h2 className="text-lg font-semibold text-white">Filters</h2>
                    {(selectedGenre || selectedCategory || selectedType) && (
                        <button
                            onClick={clearFilters}
                            className="text-sm text-primary-400 hover:text-primary-300 transition-colors"
                        >
                            Clear All
                        </button>
                    )}
                </div>

                <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                    {/* Type Filter */}
                    <div>
                        <label className="block text-sm font-medium text-gray-300 mb-2">Type</label>
                        <select
                            value={selectedType}
                            onChange={(e) => setSelectedType(e.target.value as any)}
                            className="w-full bg-gray-800 text-white rounded-lg px-4 py-2 focus:outline-none focus:ring-2 focus:ring-primary-500"
                        >
                            <option value="">All Types</option>
                            <option value="audio">🎵 Audio</option>
                            <option value="video">🎬 Video</option>
                        </select>
                    </div>

                    {/* Genre Filter */}
                    <div>
                        <label className="block text-sm font-medium text-gray-300 mb-2">Genre</label>
                        <select
                            value={selectedGenre}
                            onChange={(e) => setSelectedGenre(e.target.value)}
                            className="w-full bg-gray-800 text-white rounded-lg px-4 py-2 focus:outline-none focus:ring-2 focus:ring-primary-500"
                        >
                            <option value="">All Genres</option>
                            {genres.map((genre) => (
                                <option key={genre} value={genre}>
                                    {genre}
                                </option>
                            ))}
                        </select>
                    </div>

                    {/* Category Filter */}
                    <div>
                        <label className="block text-sm font-medium text-gray-300 mb-2">Language</label>
                        <select
                            value={selectedCategory}
                            onChange={(e) => setSelectedCategory(e.target.value)}
                            className="w-full bg-gray-800 text-white rounded-lg px-4 py-2 focus:outline-none focus:ring-2 focus:ring-primary-500"
                        >
                            <option value="">All Languages</option>
                            {categories.map((category) => (
                                <option key={category} value={category}>
                                    {category}
                                </option>
                            ))}
                        </select>
                    </div>
                </div>
            </div>

            {/* Results Count */}
            <div className="mb-6">
                <p className="text-gray-400 text-sm">
                    {loading ? 'Loading...' : `${filteredItems.length} results found`}
                </p>
            </div>

            {/* Media Grid */}
            {loading ? (
                <div className="flex items-center justify-center py-20">
                    <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-primary-500"></div>
                </div>
            ) : filteredItems.length === 0 ? (
                <div className="text-center py-20">
                    <div className="text-6xl mb-4">🎵</div>
                    <h3 className="text-xl font-semibold text-white mb-2">No media found</h3>
                    <p className="text-gray-400 mb-6">Try adjusting your filters or search query</p>
                    <button
                        onClick={clearFilters}
                        className="bg-primary-500 text-white px-6 py-2 rounded-lg hover:bg-primary-600 transition-colors"
                    >
                        Clear Filters
                    </button>
                </div>
            ) : (
                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
                    {filteredItems.map((media) => (
                        <MediaCard key={media.id} media={media} />
                    ))}
                </div>
            )}
        </>
    );
}

export default function BrowsePage() {
    return (
        <div className="min-h-screen bg-gradient-to-b from-gray-900 to-black">
            <Header />

            <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 pb-32">
                {/* Page Header */}
                <div className="mb-8">
                    <h1 className="text-4xl font-bold gradient-text mb-2">Browse Music</h1>
                    <p className="text-gray-400">Discover your next favorite song or video</p>
                </div>

                <Suspense fallback={
                    <div className="flex items-center justify-center py-20">
                        <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-primary-500"></div>
                    </div>
                }>
                    <BrowseContent />
                </Suspense>
            </main>

            <MediaPlayer />
        </div>
    );
}
