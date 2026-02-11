'use client';

import { useEffect, useState } from 'react';
import { useRouter } from 'next/navigation';
import { useAppSelector } from '@/store/hooks';
import Header from '@/components/ui/Header';
import api from '@/lib/axios';
import { Media } from '@/types';

export default function AdminDashboardPage() {
    const router = useRouter();
    const { user, isAuthenticated } = useAppSelector((state) => state.auth);
    const [pendingUploads, setPendingUploads] = useState<Media[]>([]);
    const [loading, setLoading] = useState(true);
    const [processingId, setProcessingId] = useState<string | null>(null);

    useEffect(() => {
        if (!isAuthenticated || user?.role !== 'admin') {
            router.push('/');
            return;
        }

        fetchPendingUploads();
    }, [isAuthenticated, user, router]);

    const fetchPendingUploads = async () => {
        try {
            const response = await api.get('/admin/pending-uploads');
            setPendingUploads(response.data.uploads || []);
        } catch (error) {
            console.error('Failed to fetch pending uploads:', error);
        } finally {
            setLoading(false);
        }
    };

    const handleApprove = async (uploadId: string) => {
        setProcessingId(uploadId);

        // Simulate API call
        await new Promise(resolve => setTimeout(resolve, 1000));

        alert('Content approved successfully!');
        setPendingUploads(prev => prev.filter(u => u.id !== uploadId));
        setProcessingId(null);
    };

    const handleReject = async (uploadId: string) => {
        const reason = prompt('Enter rejection reason:');
        if (!reason) return;

        setProcessingId(uploadId);

        // Simulate API call
        await new Promise(resolve => setTimeout(resolve, 1000));

        alert('Content rejected successfully!');
        setPendingUploads(prev => prev.filter(u => u.id !== uploadId));
        setProcessingId(null);
    };

    if (!isAuthenticated || user?.role !== 'admin') {
        return null;
    }

    return (
        <div className="min-h-screen bg-gradient-to-b from-gray-900 to-black">
            <Header />

            <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
                {/* Page Header */}
                <div className="mb-8">
                    <h1 className="text-4xl font-bold gradient-text mb-2">Admin Dashboard</h1>
                    <p className="text-gray-400">Manage content moderation and platform settings</p>
                </div>

                {/* Stats Cards */}
                <div className="grid grid-cols-1 md:grid-cols-4 gap-6 mb-12">
                    <div className="glass-effect rounded-xl p-6">
                        <div className="flex items-center justify-between mb-2">
                            <span className="text-gray-400 text-sm">Pending Uploads</span>
                            <span className="text-2xl">📋</span>
                        </div>
                        <p className="text-3xl font-bold text-white">{pendingUploads.length}</p>
                    </div>

                    <div className="glass-effect rounded-xl p-6">
                        <div className="flex items-center justify-between mb-2">
                            <span className="text-gray-400 text-sm">Total Users</span>
                            <span className="text-2xl">👥</span>
                        </div>
                        <p className="text-3xl font-bold text-white">1,234</p>
                    </div>

                    <div className="glass-effect rounded-xl p-6">
                        <div className="flex items-center justify-between mb-2">
                            <span className="text-gray-400 text-sm">Total Media</span>
                            <span className="text-2xl">🎵</span>
                        </div>
                        <p className="text-3xl font-bold text-white">5,678</p>
                    </div>

                    <div className="glass-effect rounded-xl p-6">
                        <div className="flex items-center justify-between mb-2">
                            <span className="text-gray-400 text-sm">Active Subs</span>
                            <span className="text-2xl">💎</span>
                        </div>
                        <p className="text-3xl font-bold text-white">892</p>
                    </div>
                </div>

                {/* Pending Uploads */}
                <div className="glass-effect rounded-2xl p-8">
                    <h2 className="text-2xl font-bold text-white mb-6">Pending Content Moderation</h2>

                    {loading ? (
                        <div className="flex items-center justify-center py-12">
                            <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-primary-500"></div>
                        </div>
                    ) : pendingUploads.length === 0 ? (
                        <div className="text-center py-12">
                            <div className="text-6xl mb-4">✅</div>
                            <h3 className="text-xl font-semibold text-white mb-2">All Caught Up!</h3>
                            <p className="text-gray-400">No pending uploads to review</p>
                        </div>
                    ) : (
                        <div className="space-y-4">
                            {pendingUploads.map((upload) => (
                                <div
                                    key={upload.id}
                                    className="bg-gray-800/50 rounded-xl p-6 hover:bg-gray-800 transition-all"
                                >
                                    <div className="flex items-start justify-between">
                                        <div className="flex items-start space-x-4 flex-1">
                                            <img
                                                src={upload.thumbnail}
                                                alt={upload.title}
                                                className="w-24 h-24 rounded-lg object-cover"
                                            />
                                            <div className="flex-1">
                                                <div className="flex items-center space-x-2 mb-2">
                                                    <h3 className="text-lg font-semibold text-white">{upload.title}</h3>
                                                    <span className="bg-gray-700 px-2 py-1 rounded text-xs text-gray-300">
                                                        {upload.type === 'audio' ? '🎵 Audio' : '🎬 Video'}
                                                    </span>
                                                </div>
                                                <p className="text-gray-400 mb-2">{upload.artist}</p>
                                                <p className="text-sm text-gray-500 mb-3">{upload.description}</p>
                                                <div className="flex items-center space-x-4 text-sm text-gray-400">
                                                    <span className="flex items-center">
                                                        <svg className="w-4 h-4 mr-1" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M7 7h.01M7 3h5c.512 0 1.024.195 1.414.586l7 7a2 2 0 010 2.828l-7 7a2 2 0 01-2.828 0l-7-7A1.994 1.994 0 013 12V7a4 4 0 014-4z" />
                                                        </svg>
                                                        {upload.genre}
                                                    </span>
                                                    <span className="flex items-center">
                                                        <svg className="w-4 h-4 mr-1" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
                                                        </svg>
                                                        {new Date(upload.uploadedAt).toLocaleDateString()}
                                                    </span>
                                                </div>
                                            </div>
                                        </div>

                                        <div className="flex flex-col space-y-2 ml-4">
                                            <button
                                                onClick={() => handleApprove(upload.id)}
                                                disabled={processingId === upload.id}
                                                className="bg-green-500 text-white px-6 py-2 rounded-lg hover:bg-green-600 transition-colors disabled:opacity-50 disabled:cursor-not-allowed flex items-center"
                                            >
                                                <svg className="w-5 h-5 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                                                </svg>
                                                Approve
                                            </button>
                                            <button
                                                onClick={() => handleReject(upload.id)}
                                                disabled={processingId === upload.id}
                                                className="bg-red-500 text-white px-6 py-2 rounded-lg hover:bg-red-600 transition-colors disabled:opacity-50 disabled:cursor-not-allowed flex items-center"
                                            >
                                                <svg className="w-5 h-5 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                                                </svg>
                                                Reject
                                            </button>
                                        </div>
                                    </div>
                                </div>
                            ))}
                        </div>
                    )}
                </div>
            </main>
        </div>
    );
}
