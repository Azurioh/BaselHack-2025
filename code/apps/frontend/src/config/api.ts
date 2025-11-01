import axios from 'axios'

const API_BASE_URL = (import.meta.env.VITE_API_URL || import.meta.env.REACT_APP_API_URL || 'http://localhost:3000').replace(/^"(.*)"$/, '$1')

const api = axios.create({
  baseURL: API_BASE_URL,
  headers: {
    'Content-Type': 'application/json',
  },
})

// Add request interceptor to include auth token
api.interceptors.request.use(
  (config) => {
    const token = localStorage.getItem('accessToken')
    if (token) {
      config.headers.Authorization = `Bearer ${token}`
    }
    return config
  },
  (error) => {
    return Promise.reject(error)
  }
)

// Add response interceptor to handle token refresh
api.interceptors.response.use(
  (response) => response,
  async (error) => {
    const originalRequest = error.config

    // If 401 and we have a refresh token, try to refresh
    if (error.response?.status === 401 && !originalRequest._retry) {
      originalRequest._retry = true
      const refreshToken = localStorage.getItem('refreshToken')

      if (refreshToken) {
        try {
          const response = await api.post('/auth/v1/refresh-token', {
            refreshToken,
          })
          // Backend returns new refresh token in data.data.token
          const newRefreshToken = response.data.data.token
          localStorage.setItem('refreshToken', newRefreshToken)

          // Note: The refresh endpoint returns a new refresh token, not an access token
          // When access token expires, we need to re-login
          localStorage.removeItem('accessToken')
          window.location.href = '/login'
          return Promise.reject(error)
        } catch (refreshError) {
          // Refresh failed, clear tokens and redirect to login
          localStorage.removeItem('accessToken')
          localStorage.removeItem('refreshToken')
          window.location.href = '/login'
          return Promise.reject(refreshError)
        }
      } else {
        // No refresh token, redirect to login
        window.location.href = '/login'
      }
    }

    return Promise.reject(error)
  }
)

export default api
