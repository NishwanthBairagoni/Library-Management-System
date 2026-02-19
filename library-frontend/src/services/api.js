import axios from 'axios';

const API_URL = 'http://localhost:8080/api';

const api = axios.create({
    baseURL: API_URL,
    headers: {
        'Content-Type': 'application/json',
    },
});

// Add a request interceptor to include the auth token if available
api.interceptors.request.use(
    (config) => {
        const user = JSON.parse(localStorage.getItem('user'));
        if (user && user.token) {
            // Note: Current backend implementation uses Basic Auth or just relies on the user object.
            // For a robust system, we should use JWT.
            // For now, assuming the backend might eventually need a token or basic auth.
            // If using Basic Auth (username:password), we'd set it here.
            // For this step, we'll just keep the header ready.
            // config.headers.Authorization = `Bearer ${user.token}`;
        }
        return config;
    },
    (error) => {
        return Promise.reject(error);
    }
);

export const login = (email, password, role) => {
    return api.post('/auth/login', { email, password, role });
};

export const register = (userData) => {
    return api.post('/auth/register', userData);
};

export const getPendingUsers = () => {
    return api.get('/admin/users/pending');
};

export const approveUser = (userId) => {
    return api.put(`/admin/users/${userId}/approve`);
};

export const rejectUser = (userId) => {
    return api.put(`/admin/users/${userId}/reject`);
};

export const getApprovedUsers = () => {
    return api.get('/admin/users');
};

export const deleteUser = (userId) => {
    return api.delete(`/admin/users/${userId}`);
};

// Book APIs
export const getAllBooks = () => {
    return api.get('/books');
};

export const addBook = (bookData) => {
    return api.post('/books', bookData);
};

export const updateBook = (id, bookData) => {
    return api.put(`/books/${id}`, bookData);
};

export const deleteBook = (id) => {
    return api.delete(`/books/${id}`);
};

// Issue APIs
export const issueBook = (userId, bookId) => {
    return api.post(`/issues/issue?userId=${userId}&bookId=${bookId}`);
};

export const returnBook = (userId, bookId) => {
    return api.post(`/issues/return?userId=${userId}&bookId=${bookId}`);
};

export const getActiveIssues = () => {
    return api.get('/issues/active');
};

export const getUserHistory = (userId) => {
    return api.get(`/issues/history/${userId}`);
};

// Dashboard Stats
export const getDashboardStats = () => {
    return api.get('/dashboard/stats');
};

export default api;
