'use client';

import { SubscriptionPlan } from '@/types';

interface SubscriptionCardProps {
    plan: SubscriptionPlan;
    onSelect: (planId: string) => void;
    isCurrentPlan?: boolean;
    loading?: boolean;
}

export default function SubscriptionCard({ plan, onSelect, isCurrentPlan, loading }: SubscriptionCardProps) {
    return (
        <div
            className={`glass-effect rounded-2xl p-8 transition-all hover:shadow-glow ${plan.popular ? 'ring-2 ring-primary-500 relative' : ''
                } ${isCurrentPlan ? 'ring-2 ring-green-500' : ''}`}
        >
            {plan.popular && (
                <div className="absolute -top-4 left-1/2 transform -translate-x-1/2">
                    <span className="bg-gradient-to-r from-primary-500 to-secondary-500 text-white px-4 py-1 rounded-full text-sm font-semibold">
                        Most Popular
                    </span>
                </div>
            )}

            {isCurrentPlan && (
                <div className="absolute -top-4 right-4">
                    <span className="bg-green-500 text-white px-4 py-1 rounded-full text-sm font-semibold">
                        Current Plan
                    </span>
                </div>
            )}

            <div className="text-center mb-6">
                <h3 className="text-2xl font-bold text-white mb-2">{plan.name}</h3>
                <div className="flex items-baseline justify-center">
                    <span className="text-4xl font-bold gradient-text">₹{plan.price}</span>
                    <span className="text-gray-400 ml-2">/month</span>
                </div>
            </div>

            <ul className="space-y-4 mb-8">
                {plan.features.map((feature, index) => (
                    <li key={index} className="flex items-start">
                        <svg
                            className="w-5 h-5 text-green-500 mr-3 mt-0.5 flex-shrink-0"
                            fill="none"
                            stroke="currentColor"
                            viewBox="0 0 24 24"
                        >
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                        </svg>
                        <span className="text-gray-300">{feature}</span>
                    </li>
                ))}
            </ul>

            <div className="space-y-2 text-sm text-gray-400 mb-6">
                <div className="flex items-center justify-between">
                    <span>Quality:</span>
                    <span className="font-semibold text-white">{plan.quality}</span>
                </div>
                <div className="flex items-center justify-between">
                    <span>Streams:</span>
                    <span className="font-semibold text-white">
                        {plan.maxStreams === -1 ? 'Unlimited' : `${plan.maxStreams}/day`}
                    </span>
                </div>
            </div>

            <button
                onClick={() => onSelect(plan.id)}
                disabled={isCurrentPlan || loading}
                className={`w-full py-3 rounded-lg font-semibold transition-all ${isCurrentPlan
                        ? 'bg-gray-700 text-gray-400 cursor-not-allowed'
                        : plan.popular
                            ? 'bg-gradient-to-r from-primary-500 to-secondary-500 text-white hover:shadow-glow'
                            : 'bg-gray-700 text-white hover:bg-gray-600'
                    } disabled:opacity-50 disabled:cursor-not-allowed`}
            >
                {loading ? 'Processing...' : isCurrentPlan ? 'Current Plan' : 'Select Plan'}
            </button>
        </div>
    );
}
