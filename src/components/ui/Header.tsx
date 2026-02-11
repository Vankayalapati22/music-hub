'use client';

import Link from 'next/link';
import { usePathname, useRouter } from 'next/navigation';
import { useAppSelector, useAppDispatch } from '@/store/hooks';
import { logout } from '@/store/slices/authSlice';
import { useState } from 'react';

export default function Header() {
    const pathname = usePathname();
    const router = useRouter();
    const dispatch = useAppDispatch();
    const { user, isAuthenticated } = useAppSelector((state) => state.auth);
    const [searchQuery, setSearchQuery] = useState('');

    const handleLogout = async () => {
        await dispatch(logout());
        router.push('/login');
    };

    const handleSearch = (e: React.FormEvent) => {
        e.preventDefault();
        if (searchQuery.trim()) {
            router.push(`/browse?search=${encodeURIComponent(searchQuery)}`);
        }
    };

    return (
        <header className="sticky top-0 z-50 glass-effect border-b border-gray-700">
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                <div className="flex items-center justify-between h-16">
                    {/* Logo */}
                    <Link href="/" className="flex items-center space-x-2">
                        <div className="w-10 h-10 bg-gradient-to-br from-primary-500 to-secondary-500 rounded-lg flex items-center justify-center">
                            <span className="text-white font-bold text-xl">🎵</span>
                        </div>
                        <span className="font-display font-bold text-xl gradient-text">
                            Music Hub
                        </span>
                    </Link>

                    {/* Navigation */}
                    <nav className="hidden md:flex items-center space-x-8">
                        <Link
                            href="/browse"
                            className={`text-sm font-medium transition-colors hover:text-primary-400 ${pathname === '/browse' ? 'text-primary-400' : 'text-gray-300'
                                }`}
                        >
                            Browse
                        </Link>
                        <Link
                            href="/subscriptions"
                            className={`text-sm font-medium transition-colors hover:text-primary-400 ${pathname === '/subscriptions' ? 'text-primary-400' : 'text-gray-300'
                                }`}
                        >
                            Subscriptions
                        </Link>
                        {isAuthenticated && (
                            <>
                                <Link
                                    href="/upload"
                                    className={`text-sm font-medium transition-colors hover:text-primary-400 ${pathname === '/upload' ? 'text-primary-400' : 'text-gray-300'
                                        }`}
                                >
                                    Upload
                                </Link>
                                {user?.role === 'admin' && (
                                    <Link
                                        href="/admin/dashboard"
                                        className={`text-sm font-medium transition-colors hover:text-primary-400 ${pathname === '/admin/dashboard' ? 'text-primary-400' : 'text-gray-300'
                                            }`}
                                    >
                                        Admin
                                    </Link>
                                )}
                            </>
                        )}
                    </nav>

                    {/* Search */}
                    <form onSubmit={handleSearch} className="hidden lg:block flex-1 max-w-md mx-8">
                        <div className="relative">
                            <input
                                type="text"
                                placeholder="Search songs, artists, movies..."
                                value={searchQuery}
                                onChange={(e) => setSearchQuery(e.target.value)}
                                className="w-full bg-gray-800 text-white rounded-full py-2 px-4 pl-10 focus:outline-none focus:ring-2 focus:ring-primary-500"
                            />
                            <svg
                                className="absolute left-3 top-2.5 h-5 w-5 text-gray-400"
                                fill="none"
                                stroke="currentColor"
                                viewBox="0 0 24 24"
                            >
                                <path
                                    strokeLinecap="round"
                                    strokeLinejoin="round"
                                    strokeWidth={2}
                                    d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z"
                                />
                            </svg>
                        </div>
                    </form>

                    {/* User Menu */}
                    <div className="flex items-center space-x-4">
                        {isAuthenticated ? (
                            <div className="flex items-center space-x-4">
                                <Link href="/profile" className="flex items-center space-x-2">
                                    <img
                                        src={user?.profilePicture || 'https://api.dicebear.com/7.x/avataaars/svg?seed=default'}
                                        alt={user?.name}
                                        className="w-8 h-8 rounded-full"
                                    />
                                    <span className="hidden md:block text-sm font-medium text-gray-300">
                                        {user?.name}
                                    </span>
                                </Link>
                                <button
                                    onClick={handleLogout}
                                    className="text-sm font-medium text-gray-300 hover:text-primary-400 transition-colors"
                                >
                                    Logout
                                </button>
                            </div>
                        ) : (
                            <div className="flex items-center space-x-4">
                                <Link
                                    href="/login"
                                    className="text-sm font-medium text-gray-300 hover:text-primary-400 transition-colors"
                                >
                                    Login
                                </Link>
                                <Link
                                    href="/register"
                                    className="bg-gradient-to-r from-primary-500 to-secondary-500 text-white px-4 py-2 rounded-full text-sm font-medium hover:shadow-glow transition-all"
                                >
                                    Sign Up
                                </Link>
                            </div>
                        )}
                    </div>
                </div>
            </div>
        </header>
    );
}
