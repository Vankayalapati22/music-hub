import { createSlice, createAsyncThunk, PayloadAction } from '@reduxjs/toolkit';
import { MediaState, Media, MediaFilter } from '@/types';
import { mediaService } from '@/services/mediaService';

const initialState: MediaState = {
    items: [],
    filteredItems: [],
    currentMedia: null,
    playlist: [],
    filters: {},
    loading: false,
    error: null,
};

// Async thunks
export const fetchMedia = createAsyncThunk(
    'media/fetchMedia',
    async (filters: MediaFilter | undefined, { rejectWithValue }) => {
        try {
            const media = await mediaService.getMedia(filters);
            return media;
        } catch (error: any) {
            return rejectWithValue(error.response?.data?.error || 'Failed to fetch media');
        }
    }
);

export const fetchMediaById = createAsyncThunk(
    'media/fetchMediaById',
    async (id: string, { rejectWithValue }) => {
        try {
            const media = await mediaService.getMediaById(id);
            return media;
        } catch (error: any) {
            return rejectWithValue(error.response?.data?.error || 'Failed to fetch media');
        }
    }
);

const mediaSlice = createSlice({
    name: 'media',
    initialState,
    reducers: {
        setFilters: (state, action: PayloadAction<MediaFilter>) => {
            state.filters = action.payload;
        },
        setCurrentMedia: (state, action: PayloadAction<Media | null>) => {
            state.currentMedia = action.payload;
        },
        addToPlaylist: (state, action: PayloadAction<Media>) => {
            const exists = state.playlist.find(m => m.id === action.payload.id);
            if (!exists) {
                state.playlist.push(action.payload);
            }
        },
        removeFromPlaylist: (state, action: PayloadAction<string>) => {
            state.playlist = state.playlist.filter(m => m.id !== action.payload);
        },
        clearPlaylist: (state) => {
            state.playlist = [];
        },
        clearError: (state) => {
            state.error = null;
        },
    },
    extraReducers: (builder) => {
        // Fetch media
        builder.addCase(fetchMedia.pending, (state) => {
            state.loading = true;
            state.error = null;
        });
        builder.addCase(fetchMedia.fulfilled, (state, action) => {
            state.loading = false;
            state.items = action.payload;
            state.filteredItems = action.payload;
        });
        builder.addCase(fetchMedia.rejected, (state, action) => {
            state.loading = false;
            state.error = action.payload as string;
        });

        // Fetch media by ID
        builder.addCase(fetchMediaById.fulfilled, (state, action) => {
            state.currentMedia = action.payload;
        });
    },
});

export const {
    setFilters,
    setCurrentMedia,
    addToPlaylist,
    removeFromPlaylist,
    clearPlaylist,
    clearError,
} = mediaSlice.actions;

export default mediaSlice.reducer;
