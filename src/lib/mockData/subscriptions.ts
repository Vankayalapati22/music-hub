import { SubscriptionPlan, UserSubscription } from '@/types';

export const mockSubscriptionPlans: SubscriptionPlan[] = [
    {
        id: 'plan-free',
        name: 'Free',
        price: 0,
        duration: 30,
        features: [
            'Browse media catalog',
            'SD quality streaming',
            'Limited to 10 songs per day',
            'Ads supported',
        ],
        maxStreams: 10,
        quality: 'SD',
    },
    {
        id: 'plan-premium',
        name: 'Premium',
        price: 199,
        duration: 30,
        features: [
            'Unlimited streaming',
            'HD quality streaming',
            'Ad-free experience',
            'Download for offline',
            'Upload your own content',
        ],
        maxStreams: -1, // unlimited
        quality: 'HD',
        popular: true,
    },
    {
        id: 'plan-family',
        name: 'Family',
        price: 299,
        duration: 30,
        features: [
            'All Premium features',
            'Full HD quality streaming',
            'Up to 5 family members',
            'Exclusive content access',
            'Priority customer support',
        ],
        maxStreams: -1,
        quality: 'FHD',
    },
];

export const mockUserSubscriptions: UserSubscription[] = [
    {
        id: 'sub-1',
        userId: '1',
        planId: 'plan-premium',
        startDate: '2024-02-01T00:00:00Z',
        endDate: '2024-03-01T00:00:00Z',
        status: 'active',
        autoRenew: true,
    },
];

export const getUserSubscription = (userId: string): UserSubscription | null => {
    return mockUserSubscriptions.find(sub => sub.userId === userId) || null;
};

export const getSubscriptionPlan = (planId: string): SubscriptionPlan | null => {
    return mockSubscriptionPlans.find(plan => plan.id === planId) || null;
};
