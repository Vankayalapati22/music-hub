// User Types
export interface User {
    id: string;
    email: string;
    name: string;
    role: 'user' | 'admin';
    mobileNumber?: string;
    profilePicture?: string;
    subscriptionId?: string;
    createdAt: string;
}

export interface AuthState {
    user: User | null;
    token: string | null;
    isAuthenticated: boolean;
    loading: boolean;
    error: string | null;
}

// Media Types
export interface Media {
    id: string;
    title: string;
    type: 'audio' | 'video';
    artist: string;
    artistId: string;
    genre: string;
    category: string;
    duration: number;
    thumbnail: string;
    url: string;
    views: number;
    uploadedBy: string;
    uploadedAt: string;
    status: 'pending' | 'approved' | 'rejected';
    description?: string;
    musicDirector?: string;
    singer?: string;
    movie?: string;
}

export interface MediaFilter {
    genre?: string;
    category?: string;
    artist?: string;
    type?: 'audio' | 'video';
    search?: string;
}

export interface MediaState {
    items: Media[];
    filteredItems: Media[];
    currentMedia: Media | null;
    playlist: Media[];
    filters: MediaFilter;
    loading: boolean;
    error: string | null;
}

// Subscription Types
export interface SubscriptionPlan {
    id: string;
    name: string;
    price: number;
    duration: number; // in days
    features: string[];
    maxStreams: number;
    quality: 'SD' | 'HD' | 'FHD';
    popular?: boolean;
}

export interface UserSubscription {
    id: string;
    userId: string;
    planId: string;
    startDate: string;
    endDate: string;
    status: 'active' | 'expired' | 'cancelled';
    autoRenew: boolean;
}

export interface SubscriptionState {
    plans: SubscriptionPlan[];
    currentSubscription: UserSubscription | null;
    loading: boolean;
    error: string | null;
}

// Upload Types
export interface Upload {
    id: string;
    userId: string;
    title: string;
    description: string;
    genre: string;
    artist: string;
    type: 'audio' | 'video';
    fileName: string;
    fileSize: number;
    status: 'pending' | 'approved' | 'rejected';
    uploadedAt: string;
    moderatedAt?: string;
    moderatorComments?: string;
    thumbnailUrl?: string;
}

export interface UploadState {
    uploads: Upload[];
    currentUpload: Upload | null;
    uploadProgress: number;
    loading: boolean;
    error: string | null;
}

// Payment Types
export interface Payment {
    id: string;
    userId: string;
    subscriptionId: string;
    amount: number;
    paymentMode: 'credit_card' | 'debit_card' | 'upi' | 'net_banking';
    status: 'pending' | 'success' | 'failed';
    transactionId?: string;
    createdAt: string;
}

// Notification Types
export interface Notification {
    id: string;
    userId: string;
    type: 'subscription' | 'payment' | 'upload' | 'system';
    title: string;
    message: string;
    read: boolean;
    createdAt: string;
}

// Admin Types
export interface AdminStats {
    totalUsers: number;
    totalMedia: number;
    pendingUploads: number;
    activeSubscriptions: number;
    revenue: number;
}
