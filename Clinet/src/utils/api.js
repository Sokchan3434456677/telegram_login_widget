const API_URL = process.env.REACT_APP_API_URL || 'https://apiwidget-v1.vercel.app/api';

export const checkAuth = async () => {
  try {
    const token = localStorage.getItem('token');
    const response = await fetch(`${API_URL}/check-auth`, {
      headers: {
        'Authorization': `Bearer ${token}`,
      },
    });
    const data = await response.json();
    return data.success ? data.user : null;
  } catch (error) {
    console.error('Auth check error:', error);
    return null;
  }
};

export const logout = async () => {
  try {
    const token = localStorage.getItem('token');
    await fetch(`${API_URL}/logout`, {
      method: 'POST',
      headers: {
        'Authorization': `Bearer ${token}`,
      },
    });
    localStorage.removeItem('token');
    localStorage.removeItem('telegram_id');
  } catch (error) {
    console.error('Logout error:', error);
  }
};