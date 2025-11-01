import type { Category } from '@baselhack/shared/types/categories.types';

const API_URL = import.meta.env.VITE_API_URL;

export const createCategory = async (category: Category) => {
    console.log('Bearer Token:', localStorage.getItem('token'));
    const response = await fetch(`${API_URL}/categories/v1/`, {
        method: 'POST',
        headers: {
            'Authorization': `Bearer ${localStorage.getItem('token')}`,
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
            'Authorization': `Bearer ${localStorage.getItem('token')}`,
            'Content-Type': 'application/json',
        },
    });

    return await response.json();
};

export const updateCategory = async (id: string, category: Category) => {
    const response = await fetch(`${API_URL}/categories/v1/${id}`, {
        method: 'PUT',
        headers: {
            'Authorization': `Bearer ${localStorage.getItem('token')}`,
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
            'Authorization': `Bearer ${localStorage.getItem('token')}`,
            'Content-Type': 'application/json',
        },
    });

    return await response.json();
};

// const token: string = "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6IjY5MDU2YjE2ZmFiYTUzZjE2MjU4YjEwNCIsIm5hbWUiOiJhZG1pbiIsImVtYWlsIjoiYWRtaW5AYmFzZWwuY29tIiwicm9sZSI6ImFkbWluIiwiaWF0IjoxNzYxOTg5Mjk0LCJleHAiOjE3NjE5OTAxOTR9.lgWG68Ot1yl-eD6CrZ2jFDy9hBk29PSxgFN8aEVOYMs"
// localStorage.setItem('token', token);

// createCategory({name: "Test Category"});
