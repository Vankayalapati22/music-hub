import api from '@/lib/axios';
import { Upload } from '@/types';

export interface UploadData {
    title: string;
    description: string;
    genre: string;
    artist: string;
    type: 'audio' | 'video';
    file: File;
}

export interface UploadResponse {
    success: boolean;
    uploadId: string;
    message: string;
}

export const uploadService = {
    async uploadMedia(data: UploadData, onProgress?: (progress: number) => void): Promise<UploadResponse> {
        const formData = new FormData();
        formData.append('title', data.title);
        formData.append('description', data.description);
        formData.append('genre', data.genre);
        formData.append('artist', data.artist);
        formData.append('type', data.type);
        formData.append('file', data.file);

        const response = await api.post<UploadResponse>('/uploads', formData, {
            headers: {
                'Content-Type': 'multipart/form-data',
            },
            onUploadProgress: (progressEvent) => {
                if (onProgress && progressEvent.total) {
                    const progress = Math.round((progressEvent.loaded * 100) / progressEvent.total);
                    onProgress(progress);
                }
            },
        });

        return response.data;
    },

    async getMyUploads(): Promise<Upload[]> {
        const response = await api.get<{ uploads: Upload[] }>('/uploads/my-uploads');
        return response.data.uploads;
    },
};
