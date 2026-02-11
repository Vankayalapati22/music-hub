import api from '@/lib/axios';
import { User } from '@/types';

export interface LoginCredentials {
    email: string;
    password: string;
}

export interface RegisterData {
    email: string;
    password: string;
    name: string;
    mobileNumber: string;
}

export interface AuthResponse {
    user: User;
    token: string;
}

export const authService = {
    async login(credentials: LoginCredentials): Promise<AuthResponse> {
        const response = await api.post<AuthResponse>('/auth/login', credentials);
        return response.data;
    },

    async register(data: RegisterData): Promise<AuthResponse> {
        const response = await api.post<AuthResponse>('/auth/register', data);
        return response.data;
    },

    async getCurrentUser(): Promise<User | null> {
        try {
            const response = await api.get<{ user: User }>('/auth/me');
            return response.data.user;
        } catch (error) {
            return null;
        }
    },

    async logout(): Promise<void> {
        localStorage.removeItem('token');
        localStorage.removeItem('user');
    },
};
