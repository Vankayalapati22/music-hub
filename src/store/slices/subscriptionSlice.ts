import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import { SubscriptionState } from '@/types';
import { subscriptionService } from '@/services/subscriptionService';

const initialState: SubscriptionState = {
    plans: [],
    currentSubscription: null,
    loading: false,
    error: null,
};

// Async thunks
export const fetchPlans = createAsyncThunk(
    'subscription/fetchPlans',
    async (_, { rejectWithValue }) => {
        try {
            const plans = await subscriptionService.getPlans();
            return plans;
        } catch (error: any) {
            return rejectWithValue(error.response?.data?.error || 'Failed to fetch plans');
        }
    }
);

export const fetchMySubscription = createAsyncThunk(
    'subscription/fetchMySubscription',
    async (_, { rejectWithValue }) => {
        try {
            const subscription = await subscriptionService.getMySubscription();
            return subscription;
        } catch (error: any) {
            return rejectWithValue(error.response?.data?.error || 'Failed to fetch subscription');
        }
    }
);

export const subscribeToPlan = createAsyncThunk(
    'subscription/subscribeToPlan',
    async (planId: string, { rejectWithValue }) => {
        try {
            const result = await subscriptionService.subscribeToPlan(planId);
            return result;
        } catch (error: any) {
            return rejectWithValue(error.response?.data?.error || 'Failed to subscribe');
        }
    }
);

const subscriptionSlice = createSlice({
    name: 'subscription',
    initialState,
    reducers: {
        clearError: (state) => {
            state.error = null;
        },
    },
    extraReducers: (builder) => {
        // Fetch plans
        builder.addCase(fetchPlans.pending, (state) => {
            state.loading = true;
            state.error = null;
        });
        builder.addCase(fetchPlans.fulfilled, (state, action) => {
            state.loading = false;
            state.plans = action.payload;
        });
        builder.addCase(fetchPlans.rejected, (state, action) => {
            state.loading = false;
            state.error = action.payload as string;
        });

        // Fetch my subscription
        builder.addCase(fetchMySubscription.fulfilled, (state, action) => {
            state.currentSubscription = action.payload;
        });

        // Subscribe to plan
        builder.addCase(subscribeToPlan.pending, (state) => {
            state.loading = true;
            state.error = null;
        });
        builder.addCase(subscribeToPlan.fulfilled, (state) => {
            state.loading = false;
        });
        builder.addCase(subscribeToPlan.rejected, (state, action) => {
            state.loading = false;
            state.error = action.payload as string;
        });
    },
});

export const { clearError } = subscriptionSlice.actions;
export default subscriptionSlice.reducer;
