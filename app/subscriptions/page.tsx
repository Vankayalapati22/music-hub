'use client';

import { useEffect, useState } from 'react';
import { useRouter } from 'next/navigation';
import { useAppDispatch, useAppSelector } from '@/store/hooks';
import { fetchPlans, fetchMySubscription, subscribeToPlan } from '@/store/slices/subscriptionSlice';
import Header from '@/components/ui/Header';
import SubscriptionCard from '@/components/ui/SubscriptionCard';

export default function SubscriptionsPage() {
    const router = useRouter();
    const dispatch = useAppDispatch();
    const { isAuthenticated } = useAppSelector((state) => state.auth);
    const { plans, currentSubscription, loading } = useAppSelector((state) => state.subscription);
    const [selectedPlanId, setSelectedPlanId] = useState<string | null>(null);

    useEffect(() => {
        dispatch(fetchPlans());
        if (isAuthenticated) {
            dispatch(fetchMySubscription());
        }
    }, [dispatch, isAuthenticated]);

    const handleSelectPlan = async (planId: string) => {
        if (!isAuthenticated) {
            router.push('/login');
            return;
        }

        setSelectedPlanId(planId);

        // Simulate payment flow
        const confirmed = confirm('Proceed to payment?');
        if (confirmed) {
            await dispatch(subscribeToPlan(planId));
            alert('Subscription successful! (Mock payment)');
            dispatch(fetchMySubscription());
        }

        setSelectedPlanId(null);
    };

    return (
        <div className="min-h-screen bg-gradient-to-b from-gray-900 to-black">
            <Header />

            <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
                {/* Page Header */}
                <div className="text-center mb-12">
                    <h1 className="text-4xl md:text-5xl font-bold gradient-text mb-4">
                        Choose Your Plan
                    </h1>
                    <p className="text-xl text-gray-400 max-w-2xl mx-auto">
                        Select the perfect plan for your music streaming needs. Upgrade or downgrade anytime.
                    </p>
                </div>

                {/* Current Subscription Info */}
                {isAuthenticated && currentSubscription && (
                    <div className="glass-effect rounded-xl p-6 mb-12 max-w-2xl mx-auto">
                        <div className="flex items-center justify-between">
                            <div>
                                <h3 className="text-lg font-semibold text-white mb-1">Your Current Subscription</h3>
                                <p className="text-gray-400">
                                    {plans.find(p => p.id === currentSubscription.planId)?.name || 'Unknown Plan'}
                                </p>
                            </div>
                            <div className="text-right">
                                <p className="text-sm text-gray-400">Status</p>
                                <span className={`inline-block px-3 py-1 rounded-full text-sm font-semibold ${currentSubscription.status === 'active'
                                        ? 'bg-green-500/20 text-green-400'
                                        : 'bg-red-500/20 text-red-400'
                                    }`}>
                                    {currentSubscription.status.toUpperCase()}
                                </span>
                            </div>
                        </div>
                        <div className="mt-4 pt-4 border-t border-gray-700 flex items-center justify-between text-sm">
                            <span className="text-gray-400">Expires on:</span>
                            <span className="text-white font-medium">
                                {new Date(currentSubscription.endDate).toLocaleDateString()}
                            </span>
                        </div>
                    </div>
                )}

                {/* Plans Grid */}
                {loading && plans.length === 0 ? (
                    <div className="flex items-center justify-center py-20">
                        <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-primary-500"></div>
                    </div>
                ) : (
                    <div className="grid grid-cols-1 md:grid-cols-3 gap-8 max-w-6xl mx-auto">
                        {plans.map((plan) => (
                            <SubscriptionCard
                                key={plan.id}
                                plan={plan}
                                onSelect={handleSelectPlan}
                                isCurrentPlan={currentSubscription?.planId === plan.id && currentSubscription?.status === 'active'}
                                loading={loading && selectedPlanId === plan.id}
                            />
                        ))}
                    </div>
                )}

                {/* FAQ Section */}
                <div className="mt-20 max-w-3xl mx-auto">
                    <h2 className="text-3xl font-bold text-white text-center mb-8">Frequently Asked Questions</h2>

                    <div className="space-y-4">
                        <div className="glass-effect rounded-xl p-6">
                            <h3 className="text-lg font-semibold text-white mb-2">Can I cancel anytime?</h3>
                            <p className="text-gray-400">
                                Yes, you can cancel your subscription at any time. You'll continue to have access until the end of your billing period.
                            </p>
                        </div>

                        <div className="glass-effect rounded-xl p-6">
                            <h3 className="text-lg font-semibold text-white mb-2">What payment methods do you accept?</h3>
                            <p className="text-gray-400">
                                We accept all major credit cards, debit cards, UPI, and net banking.
                            </p>
                        </div>

                        <div className="glass-effect rounded-xl p-6">
                            <h3 className="text-lg font-semibold text-white mb-2">Can I upgrade or downgrade my plan?</h3>
                            <p className="text-gray-400">
                                Yes, you can change your plan at any time. Changes will take effect immediately, and we'll prorate the charges.
                            </p>
                        </div>
                    </div>
                </div>
            </main>
        </div>
    );
}
