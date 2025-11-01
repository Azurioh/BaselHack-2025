const API_URL = import.meta.env.VITE_API_URL;

export const getMyUser = async (id: string) => {
    const response = await fetch(`${API_URL}/users/v1/${id}`, {
        method: 'GET',
        headers: {
            'Authorization': `Bearer ${localStorage.getItem('accessToken')}`,
            'Content-Type': 'application/json',
        },
    });

    return await response.json();
};

export const getMyQuestions = async () => {
    const response = await fetch(`${API_URL}/users/v1/me/questions`, {
        method: 'GET',
        headers: {
            'Authorization': `Bearer ${localStorage.getItem('accessToken')}`,
            'Content-Type': 'application/json',
        },
    });

    return await response.json();
};

export const getMyAnswers = async () => {
    const response = await fetch(`${API_URL}/users/v1/me/answers`, {
        method: 'GET',
        headers: {
            'Authorization': `Bearer ${localStorage.getItem('accessToken')}`,
            'Content-Type': 'application/json',
        },
    });

    return await response.json();
};

export const getUserById = async (id: string) => {
    const response = await fetch(`${API_URL}/users/v1/${id}`, {
        method: 'GET',
        headers: {
            'Authorization': `Bearer ${localStorage.getItem('accessToken')}`,
            'Content-Type': 'application/json',
        },
    });

    return await response.json();
};

export const getUserQuestions = async (id: string) => {
    const response = await fetch(`${API_URL}/users/v1/${id}/questions`, {
        method: 'GET',
        headers: {
            'Authorization': `Bearer ${localStorage.getItem('accessToken')}`,
            'Content-Type': 'application/json',
        },
    });

    return await response.json();
};

export const getUserAnswers = async (id: string) => {
    const response = await fetch(`${API_URL}/users/v1/${id}/answers`, {
        method: 'GET',
        headers: {
            'Authorization': `Bearer ${localStorage.getItem('accessToken')}`,
            'Content-Type': 'application/json',
        },
    });

    return await response.json();
}
