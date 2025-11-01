import type { RefreshTokenBody } from '@baselhack/shared/types/auth.types';
import type { User } from '@baselhack/shared/types/user.types';

const API_URL = process.env.REACT_APP_API_URL || 'http://localhost:3000';

export const login = async (user: User) => {
    const response = await fetch(`${API_URL}/auth/v1/login`, {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
        },
        body: JSON.stringify(user),
    });

    return await response.json();
};

export const register = async (user: User) => {
    const response = await fetch(`${API_URL}/auth/v1/register`, {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
        },
        body: JSON.stringify(user),
    });

    return await response.json();
};

export const refreshToken = async (token: RefreshTokenBody) => {
    const response = await fetch(`${API_URL}/auth/v1/refresh-token`, {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
        },
        body: JSON.stringify({ token }),
    });

    return await response.json();
};
