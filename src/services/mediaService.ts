import api from '@/lib/axios';
import { Media, MediaFilter } from '@/types';

export interface MediaResponse {
    media: Media[];
}

export const mediaService = {
    async getMedia(filters?: MediaFilter): Promise<Media[]> {
        const params = new URLSearchParams();

        if (filters?.genre) params.append('genre', filters.genre);
        if (filters?.category) params.append('category', filters.category);
        if (filters?.artist) params.append('artist', filters.artist);
        if (filters?.type) params.append('type', filters.type);
        if (filters?.search) params.append('search', filters.search);

        const response = await api.get<MediaResponse>(`/media?${params.toString()}`);
        return response.data.media;
    },

    async getMediaById(id: string): Promise<Media | null> {
        try {
            const response = await api.get<{ media: Media }>(`/media/${id}`);
            return response.data.media;
        } catch (error) {
            return null;
        }
    },

    async incrementViews(id: string): Promise<void> {
        await api.post(`/media/${id}/view`);
    },
};
