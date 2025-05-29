import axios from 'axios';

const API_BASE_URL = 'http://localhost:5000/api';

export const checkAuth = async () => {
  try {
    const token = localStorage.getItem('token');
    if (!token) return null;
    const response = await axios.get(`${API_BASE_URL}/user`, {
      headers: { Authorization: `Bearer ${token}` }
    });
    return response.data;
  } catch (error) {
    return null;
  }
};

export const logout = async () => {
  localStorage.removeItem('token');
};