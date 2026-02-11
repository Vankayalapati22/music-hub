'use client';

import { useEffect } from 'react';
import { useRouter } from 'next/navigation';
import { useAppDispatch, useAppSelector } from '@/store/hooks';
import { loadUserFromStorage } from '@/store/slices/authSlice';
import { fetchMedia } from '@/store/slices/mediaSlice';
import Link from 'next/link';

export default function HomePage() {
    const router = useRouter();
    const dispatch = useAppDispatch();
    const { isAuthenticated } = useAppSelector((state) => state.auth);
    const { items } = useAppSelector((state) => state.media);

    useEffect(() => {
        dispatch(loadUserFromStorage());
        dispatch(fetchMedia());
    }, [dispatch]);

    const trendingMedia = items.slice(0, 6);

    return (
        <div className="min-h-screen bg-gradient-to-b from-gray-900 via-gray-800 to-black">
            {/* Hero Section */}
            <div className="relative overflow-hidden">
                <div className="absolute inset-0 bg-gradient-to-r from-primary-500/20 to-secondary-500/20 blur-3xl"></div>

                <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-20">
                    <div className="text-center">
                        <div className="inline-flex items-center space-x-3 mb-6">
                            <div className="w-16 h-16 bg-gradient-to-br from-primary-500 to-secondary-500 rounded-2xl flex items-center justify-center shadow-glow">
                                <span className="text-white font-bold text-3xl">🎵</span>
                            </div>
                            <span className="font-display font-bold text-5xl gradient-text">Music Hub</span>
                        </div>

                        <h1 className="text-5xl md:text-6xl font-bold text-white mb-6">
                            Your Ultimate Music
                            <br />
                            <span className="gradient-text">Streaming Platform</span>
                        </h1>

                        <p className="text-xl text-gray-300 mb-8 max-w-2xl mx-auto">
                            Stream unlimited music, discover new artists, and enjoy your favorite songs in HD quality
                        </p>

                        <div className="flex items-center justify-center space-x-4">
                            {isAuthenticated ? (
                                <Link
                                    href="/browse"
                                    className="bg-gradient-to-r from-primary-500 to-secondary-500 text-white px-8 py-4 rounded-full text-lg font-semibold hover:shadow-glow-lg transition-all"
                                >
                                    Browse Music
                                </Link>
                            ) : (
                                <>
                                    <Link
                                        href="/register"
                                        className="bg-gradient-to-r from-primary-500 to-secondary-500 text-white px-8 py-4 rounded-full text-lg font-semibold hover:shadow-glow-lg transition-all"
                                    >
                                        Get Started Free
                                    </Link>
                                    <Link
                                        href="/login"
                                        className="glass-effect text-white px-8 py-4 rounded-full text-lg font-semibold hover:bg-gray-700 transition-all"
                                    >
                                        Login
                                    </Link>
                                </>
                            )}
                        </div>
                    </div>
                </div>
            </div>

            {/* Features Section */}
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-20">
                <h2 className="text-3xl font-bold text-white text-center mb-12">Why Choose Music Hub?</h2>

                <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
                    <div className="glass-effect rounded-2xl p-8 text-center hover:shadow-glow transition-all">
                        <div className="w-16 h-16 bg-gradient-to-br from-primary-500 to-primary-600 rounded-full flex items-center justify-center mx-auto mb-4">
                            <span className="text-3xl">🎧</span>
                        </div>
                        <h3 className="text-xl font-semibold text-white mb-3">Unlimited Streaming</h3>
                        <p className="text-gray-400">
                            Stream millions of songs and videos in high quality without any limits
                        </p>
                    </div>

                    <div className="glass-effect rounded-2xl p-8 text-center hover:shadow-glow transition-all">
                        <div className="w-16 h-16 bg-gradient-to-br from-secondary-500 to-secondary-600 rounded-full flex items-center justify-center mx-auto mb-4">
                            <span className="text-3xl">📤</span>
                        </div>
                        <h3 className="text-xl font-semibold text-white mb-3">Upload Your Music</h3>
                        <p className="text-gray-400">
                            Share your own music with the world and reach millions of listeners
                        </p>
                    </div>

                    <div className="glass-effect rounded-2xl p-8 text-center hover:shadow-glow transition-all">
                        <div className="w-16 h-16 bg-gradient-to-br from-accent-500 to-accent-600 rounded-full flex items-center justify-center mx-auto mb-4">
                            <span className="text-3xl">🎬</span>
                        </div>
                        <h3 className="text-xl font-semibold text-white mb-3">Music Videos</h3>
                        <p className="text-gray-400">
                            Watch exclusive music videos and live performances from your favorite artists
                        </p>
                    </div>
                </div>
            </div>

            {/* Trending Section */}
            {trendingMedia.length > 0 && (
                <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-20">
                    <div className="flex items-center justify-between mb-8">
                        <h2 className="text-3xl font-bold text-white">Trending Now</h2>
                        <Link
                            href="/browse"
                            className="text-primary-400 hover:text-primary-300 font-medium transition-colors"
                        >
                            View All →
                        </Link>
                    </div>

                    <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-4">
                        {trendingMedia.map((media) => (
                            <Link
                                key={media.id}
                                href="/browse"
                                className="group relative aspect-square rounded-lg overflow-hidden hover:shadow-glow transition-all"
                            >
                                <img
                                    src={media.thumbnail}
                                    alt={media.title}
                                    className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-300"
                                />
                                <div className="absolute inset-0 bg-gradient-to-t from-black/80 to-transparent flex items-end p-3">
                                    <div>
                                        <h4 className="text-white font-semibold text-sm truncate">{media.title}</h4>
                                        <p className="text-gray-300 text-xs truncate">{media.artist}</p>
                                    </div>
                                </div>
                            </Link>
                        ))}
                    </div>
                </div>
            )}

            {/* CTA Section */}
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-20">
                <div className="glass-effect rounded-3xl p-12 text-center relative overflow-hidden">
                    <div className="absolute inset-0 bg-gradient-to-r from-primary-500/10 to-secondary-500/10"></div>
                    <div className="relative">
                        <h2 className="text-4xl font-bold text-white mb-4">
                            Ready to Start Your Musical Journey?
                        </h2>
                        <p className="text-xl text-gray-300 mb-8">
                            Join millions of music lovers on Music Hub today
                        </p>
                        {!isAuthenticated && (
                            <Link
                                href="/register"
                                className="inline-block bg-gradient-to-r from-primary-500 to-secondary-500 text-white px-10 py-4 rounded-full text-lg font-semibold hover:shadow-glow-lg transition-all"
                            >
                                Sign Up Now - It's Free!
                            </Link>
                        )}
                    </div>
                </div>
            </div>

            {/* Footer */}
            <footer className="border-t border-gray-800 py-8">
                <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                    <div className="flex flex-col md:flex-row items-center justify-between">
                        <div className="flex items-center space-x-2 mb-4 md:mb-0">
                            <div className="w-8 h-8 bg-gradient-to-br from-primary-500 to-secondary-500 rounded-lg flex items-center justify-center">
                                <span className="text-white font-bold">🎵</span>
                            </div>
                            <span className="font-display font-bold text-lg gradient-text">Music Hub</span>
                        </div>
                        <p className="text-gray-400 text-sm">
                            © 2024 Music Hub. All rights reserved.
                        </p>
                    </div>
                </div>
            </footer>
        </div>
    );
}
