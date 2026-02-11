import { User } from '@/types';

export const mockUsers: User[] = [
    {
        id: '1',
        email: 'user@example.com',
        name: 'John Doe',
        role: 'user',
        mobileNumber: '9876543210',
        profilePicture: 'https://api.dicebear.com/7.x/avataaars/svg?seed=John',
        subscriptionId: 'sub-1',
        createdAt: '2024-01-15T10:00:00Z',
    },
    {
        id: '2',
        email: 'admin@example.com',
        name: 'Admin User',
        role: 'admin',
        mobileNumber: '9876543211',
        profilePicture: 'https://api.dicebear.com/7.x/avataaars/svg?seed=Admin',
        createdAt: '2024-01-01T10:00:00Z',
    },
    {
        id: '3',
        email: 'jane@example.com',
        name: 'Jane Smith',
        role: 'user',
        mobileNumber: '9876543212',
        profilePicture: 'https://api.dicebear.com/7.x/avataaars/svg?seed=Jane',
        createdAt: '2024-02-01T10:00:00Z',
    },
];

export const mockCredentials = {
    'user@example.com': 'password123',
    'admin@example.com': 'admin123',
    'jane@example.com': 'password123',
};

export const mockTokens: Record<string, string> = {};

export const generateMockToken = (userId: string): string => {
    const token = `mock-jwt-token-${userId}-${Date.now()}`;
    mockTokens[token] = userId;
    return token;
};

export const validateMockToken = (token: string): User | null => {
    const userId = mockTokens[token];
    if (!userId) return null;
    return mockUsers.find(u => u.id === userId) || null;
};
