import axios, { AxiosInstance, InternalAxiosRequestConfig, AxiosResponse } from 'axios';
import { mockUsers, mockCredentials, generateMockToken, validateMockToken } from '@/lib/mockData/users';
import { mockMedia } from '@/lib/mockData/media';
import { mockSubscriptionPlans, mockUserSubscriptions } from '@/lib/mockData/subscriptions';

// Create Axios instance
export const api: AxiosInstance = axios.create({
    baseURL: process.env.NEXT_PUBLIC_API_URL || 'http://localhost:3000/api',
    timeout: 10000,
    headers: {
        'Content-Type': 'application/json',
    },
});

// Request interceptor - Add auth token
api.interceptors.request.use(
    (config: InternalAxiosRequestConfig) => {
        if (typeof window !== 'undefined') {
            const token = localStorage.getItem('token');
            if (token && config.headers) {
                config.headers.Authorization = `Bearer ${token}`;
            }
        }
        return config;
    },
    (error) => {
        return Promise.reject(error);
    }
);

// Response interceptor - Mock API responses
api.interceptors.response.use(
    (response: AxiosResponse) => {
        return response;
    },
    async (error) => {
        const { config } = error;

        // Mock API responses for development
        if (process.env.NODE_ENV === 'development' || !process.env.NEXT_PUBLIC_API_URL) {
            return handleMockResponse(config);
        }

        return Promise.reject(error);
    }
);

// Mock response handler
function handleMockResponse(config: InternalAxiosRequestConfig): Promise<AxiosResponse> {
    const { url, method, data } = config;

    return new Promise((resolve) => {
        setTimeout(() => {
            let mockResponse: any = { data: null, status: 200 };

            // Auth endpoints
            if (url?.includes('/auth/login') && method === 'post') {
                const { email, password } = JSON.parse(data || '{}');
                const user = mockUsers.find(u => u.email === email);

                if (user && mockCredentials[email as keyof typeof mockCredentials] === password) {
                    const token = generateMockToken(user.id);
                    mockResponse.data = { user, token };
                } else {
                    mockResponse = { data: { error: 'Invalid credentials' }, status: 401 };
                }
            }

            else if (url?.includes('/auth/register') && method === 'post') {
                const userData = JSON.parse(data || '{}');
                const newUser = {
                    id: `${mockUsers.length + 1}`,
                    ...userData,
                    role: 'user' as const,
                    createdAt: new Date().toISOString(),
                };
                mockUsers.push(newUser);
                const token = generateMockToken(newUser.id);
                mockResponse.data = { user: newUser, token };
            }

            else if (url?.includes('/auth/me') && method === 'get') {
                const authHeader = config.headers?.Authorization;
                const token = typeof authHeader === 'string' ? authHeader.replace('Bearer ', '') : '';
                const user = token ? validateMockToken(token) : null;
                mockResponse.data = { user };
            }

            // Media endpoints
            else if (url?.includes('/media') && method === 'get') {
                const params = new URLSearchParams(url.split('?')[1]);
                let filteredMedia = [...mockMedia.filter(m => m.status === 'approved')];

                if (params.get('genre')) {
                    filteredMedia = filteredMedia.filter(m => m.genre === params.get('genre'));
                }
                if (params.get('category')) {
                    filteredMedia = filteredMedia.filter(m => m.category === params.get('category'));
                }
                if (params.get('type')) {
                    filteredMedia = filteredMedia.filter(m => m.type === params.get('type'));
                }
                if (params.get('search')) {
                    const search = params.get('search')?.toLowerCase();
                    filteredMedia = filteredMedia.filter(m =>
                        m.title.toLowerCase().includes(search || '') ||
                        m.artist.toLowerCase().includes(search || '')
                    );
                }

                mockResponse.data = { media: filteredMedia };
            }

            // Subscription endpoints
            else if (url?.includes('/subscriptions/plans') && method === 'get') {
                mockResponse.data = { plans: mockSubscriptionPlans };
            }

            else if (url?.includes('/subscriptions/my-subscription') && method === 'get') {
                const authHeader = config.headers?.Authorization;
                const token = typeof authHeader === 'string' ? authHeader.replace('Bearer ', '') : '';
                const user = token ? validateMockToken(token) : null;
                const subscription = user ? mockUserSubscriptions.find(s => s.userId === user.id) : null;
                mockResponse.data = { subscription };
            }

            // Upload endpoints
            else if (url?.includes('/uploads') && method === 'post') {
                mockResponse.data = {
                    success: true,
                    uploadId: `upload-${Date.now()}`,
                    message: 'Upload successful. Pending moderation.'
                };
            }

            else if (url?.includes('/admin/pending-uploads') && method === 'get') {
                const pendingUploads = mockMedia.filter(m => m.status === 'pending');
                mockResponse.data = { uploads: pendingUploads };
            }

            resolve(mockResponse as AxiosResponse);
        }, 500); // Simulate network delay
    });
}

export default api;
