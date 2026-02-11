import api from '@/lib/axios';
import { SubscriptionPlan, UserSubscription } from '@/types';

export interface SubscriptionPlansResponse {
    plans: SubscriptionPlan[];
}

export interface UserSubscriptionResponse {
    subscription: UserSubscription | null;
}

export const subscriptionService = {
    async getPlans(): Promise<SubscriptionPlan[]> {
        const response = await api.get<SubscriptionPlansResponse>('/subscriptions/plans');
        return response.data.plans;
    },

    async getMySubscription(): Promise<UserSubscription | null> {
        try {
            const response = await api.get<UserSubscriptionResponse>('/subscriptions/my-subscription');
            return response.data.subscription;
        } catch (error) {
            return null;
        }
    },

    async subscribeToPlan(planId: string): Promise<{ success: boolean; subscriptionId: string }> {
        const response = await api.post('/subscriptions/subscribe', { planId });
        return response.data;
    },

    async cancelSubscription(subscriptionId: string): Promise<{ success: boolean }> {
        const response = await api.post(`/subscriptions/${subscriptionId}/cancel`);
        return response.data;
    },
};
