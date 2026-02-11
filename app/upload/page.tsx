'use client';

import { useState } from 'react';
import { useRouter } from 'next/navigation';
import { useAppSelector } from '@/store/hooks';
import { uploadService } from '@/services/uploadService';
import Header from '@/components/ui/Header';
import { genres } from '@/lib/mockData/media';

export default function UploadPage() {
    const router = useRouter();
    const { isAuthenticated, user } = useAppSelector((state) => state.auth);

    const [formData, setFormData] = useState({
        title: '',
        description: '',
        genre: '',
        artist: '',
        type: 'audio' as 'audio' | 'video',
    });

    const [file, setFile] = useState<File | null>(null);
    const [uploadProgress, setUploadProgress] = useState(0);
    const [uploading, setUploading] = useState(false);
    const [dragActive, setDragActive] = useState(false);

    if (!isAuthenticated) {
        router.push('/login');
        return null;
    }

    const handleDrag = (e: React.DragEvent) => {
        e.preventDefault();
        e.stopPropagation();
        if (e.type === 'dragenter' || e.type === 'dragover') {
            setDragActive(true);
        } else if (e.type === 'dragleave') {
            setDragActive(false);
        }
    };

    const handleDrop = (e: React.DragEvent) => {
        e.preventDefault();
        e.stopPropagation();
        setDragActive(false);

        if (e.dataTransfer.files && e.dataTransfer.files[0]) {
            setFile(e.dataTransfer.files[0]);
        }
    };

    const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        if (e.target.files && e.target.files[0]) {
            setFile(e.target.files[0]);
        }
    };

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();

        if (!file) {
            alert('Please select a file to upload');
            return;
        }

        setUploading(true);
        setUploadProgress(0);

        try {
            const uploadData = {
                ...formData,
                file,
            };

            await uploadService.uploadMedia(uploadData, (progress) => {
                setUploadProgress(progress);
            });

            alert('Upload successful! Your content is pending moderation.');
            router.push('/browse');
        } catch (error) {
            alert('Upload failed. Please try again.');
        } finally {
            setUploading(false);
            setUploadProgress(0);
        }
    };

    const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
        setFormData({ ...formData, [e.target.name]: e.target.value });
    };

    return (
        <div className="min-h-screen bg-gradient-to-b from-gray-900 to-black">
            <Header />

            <main className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
                {/* Page Header */}
                <div className="mb-8">
                    <h1 className="text-4xl font-bold gradient-text mb-2">Upload Your Music</h1>
                    <p className="text-gray-400">Share your creativity with millions of listeners</p>
                </div>

                {/* Upload Form */}
                <form onSubmit={handleSubmit} className="glass-effect rounded-2xl p-8">
                    {/* File Upload Area */}
                    <div
                        className={`mb-8 border-2 border-dashed rounded-xl p-12 text-center transition-all ${dragActive
                                ? 'border-primary-500 bg-primary-500/10'
                                : 'border-gray-700 hover:border-gray-600'
                            }`}
                        onDragEnter={handleDrag}
                        onDragLeave={handleDrag}
                        onDragOver={handleDrag}
                        onDrop={handleDrop}
                    >
                        {file ? (
                            <div>
                                <div className="text-6xl mb-4">
                                    {formData.type === 'audio' ? '🎵' : '🎬'}
                                </div>
                                <p className="text-white font-semibold mb-2">{file.name}</p>
                                <p className="text-gray-400 text-sm mb-4">
                                    {(file.size / (1024 * 1024)).toFixed(2)} MB
                                </p>
                                <button
                                    type="button"
                                    onClick={() => setFile(null)}
                                    className="text-red-400 hover:text-red-300 text-sm"
                                >
                                    Remove File
                                </button>
                            </div>
                        ) : (
                            <div>
                                <div className="text-6xl mb-4">📤</div>
                                <p className="text-white font-semibold mb-2">
                                    Drag and drop your file here
                                </p>
                                <p className="text-gray-400 text-sm mb-4">or</p>
                                <label className="inline-block bg-primary-500 text-white px-6 py-3 rounded-lg cursor-pointer hover:bg-primary-600 transition-colors">
                                    Browse Files
                                    <input
                                        type="file"
                                        accept={formData.type === 'audio' ? 'audio/*' : 'video/*'}
                                        onChange={handleFileChange}
                                        className="hidden"
                                    />
                                </label>
                                <p className="text-gray-500 text-xs mt-4">
                                    Supported formats: MP3, WAV, MP4, AVI (Max 100MB)
                                </p>
                            </div>
                        )}
                    </div>

                    {/* Upload Progress */}
                    {uploading && (
                        <div className="mb-8">
                            <div className="flex items-center justify-between mb-2">
                                <span className="text-sm text-gray-400">Uploading...</span>
                                <span className="text-sm text-white font-semibold">{uploadProgress}%</span>
                            </div>
                            <div className="w-full bg-gray-700 rounded-full h-2">
                                <div
                                    className="bg-gradient-to-r from-primary-500 to-secondary-500 h-2 rounded-full transition-all duration-300"
                                    style={{ width: `${uploadProgress}%` }}
                                ></div>
                            </div>
                        </div>
                    )}

                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-6">
                        {/* Type */}
                        <div>
                            <label className="block text-sm font-medium text-gray-300 mb-2">
                                Content Type
                            </label>
                            <select
                                name="type"
                                value={formData.type}
                                onChange={handleChange}
                                required
                                className="w-full bg-gray-800 text-white rounded-lg px-4 py-3 focus:outline-none focus:ring-2 focus:ring-primary-500"
                            >
                                <option value="audio">🎵 Audio</option>
                                <option value="video">🎬 Video</option>
                            </select>
                        </div>

                        {/* Genre */}
                        <div>
                            <label className="block text-sm font-medium text-gray-300 mb-2">
                                Genre
                            </label>
                            <select
                                name="genre"
                                value={formData.genre}
                                onChange={handleChange}
                                required
                                className="w-full bg-gray-800 text-white rounded-lg px-4 py-3 focus:outline-none focus:ring-2 focus:ring-primary-500"
                            >
                                <option value="">Select Genre</option>
                                {genres.map((genre) => (
                                    <option key={genre} value={genre}>
                                        {genre}
                                    </option>
                                ))}
                            </select>
                        </div>
                    </div>

                    {/* Title */}
                    <div className="mb-6">
                        <label className="block text-sm font-medium text-gray-300 mb-2">
                            Title
                        </label>
                        <input
                            type="text"
                            name="title"
                            value={formData.title}
                            onChange={handleChange}
                            required
                            className="w-full bg-gray-800 text-white rounded-lg px-4 py-3 focus:outline-none focus:ring-2 focus:ring-primary-500"
                            placeholder="Enter song/video title"
                        />
                    </div>

                    {/* Artist */}
                    <div className="mb-6">
                        <label className="block text-sm font-medium text-gray-300 mb-2">
                            Artist Name
                        </label>
                        <input
                            type="text"
                            name="artist"
                            value={formData.artist}
                            onChange={handleChange}
                            required
                            className="w-full bg-gray-800 text-white rounded-lg px-4 py-3 focus:outline-none focus:ring-2 focus:ring-primary-500"
                            placeholder="Enter artist name"
                        />
                    </div>

                    {/* Description */}
                    <div className="mb-8">
                        <label className="block text-sm font-medium text-gray-300 mb-2">
                            Description
                        </label>
                        <textarea
                            name="description"
                            value={formData.description}
                            onChange={handleChange}
                            required
                            rows={4}
                            className="w-full bg-gray-800 text-white rounded-lg px-4 py-3 focus:outline-none focus:ring-2 focus:ring-primary-500 resize-none"
                            placeholder="Describe your content..."
                        />
                    </div>

                    {/* Submit Button */}
                    <button
                        type="submit"
                        disabled={uploading || !file}
                        className="w-full bg-gradient-to-r from-primary-500 to-secondary-500 text-white font-semibold py-4 rounded-lg hover:shadow-glow transition-all disabled:opacity-50 disabled:cursor-not-allowed"
                    >
                        {uploading ? `Uploading... ${uploadProgress}%` : 'Upload Content'}
                    </button>

                    {/* Info */}
                    <div className="mt-6 p-4 bg-blue-500/10 border border-blue-500/30 rounded-lg">
                        <p className="text-sm text-blue-400">
                            ℹ️ Your content will be reviewed by our moderation team before being published. This usually takes 24-48 hours.
                        </p>
                    </div>
                </form>
            </main>
        </div>
    );
}
