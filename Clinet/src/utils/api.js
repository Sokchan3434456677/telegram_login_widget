import axios from 'axios';

const API_BASE_URL = 'https://apiwidget-v1.vercel.app/api';

export const checkAuth = async () => {
  try {
    // Get telegram_id from localStorage or another source
    const telegram_id = localStorage.getItem('telegram_id');
    if (!telegram_id) return null;
    const response = await axios.get(`${API_BASE_URL}/user?telegram_id=${telegram_id}`);
    return response.data;
  } catch (error) {
    return null;
  }
};

export const logout = async () => {
  localStorage.removeItem('telegram_id');
};