import type { Category } from '@baselhack/shared/types/categories.types';

const API_URL = import.meta.env.VITE_API_URL;

export const createCategory = async (category: Category) => {
    const response = await fetch(`${API_URL}/categories/v1/`, {
        method: 'POST',
        headers: {
            'Authorization': `Bearer ${localStorage.getItem('accessToken')}`,
            'Content-Type': 'application/json',
        },
        body: JSON.stringify(category),
    });

    return await response.json();
};

export const getCategories = async () => {
    const response = await fetch(`${API_URL}/categories/v1/`, {
        method: 'GET',
        headers: {
            'Authorization': `Bearer ${localStorage.getItem('accessToken')}`,
            'Content-Type': 'application/json',
        },
    });

    return await response.json();
};

export const updateCategory = async (id: string, category: Category) => {
    const response = await fetch(`${API_URL}/categories/v1/${id}`, {
        method: 'PUT',
        headers: {
            'Authorization': `Bearer ${localStorage.getItem('accessToken')}`,
            'Content-Type': 'application/json',
        },
        body: JSON.stringify(category),
    });

    return await response.json();
};

export const deleteCategory = async (id: string) => {
    const response = await fetch(`${API_URL}/categories/v1/${id}`, {
        method: 'DELETE',
        headers: {
            'Authorization': `Bearer ${localStorage.getItem('accessToken')}`,
            'Content-Type': 'application/json',
        },
    });

    return await response.json();
};
