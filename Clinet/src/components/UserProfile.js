import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { checkAuth, logout } from '../utils/api';

const UserProfile = () => {
  const [user, setUser] = useState(null);
  const navigate = useNavigate();

  useEffect(() => {
    const fetchUser = async () => {
      const userData = await checkAuth();
      if (!userData) {
        navigate('/login');
      } else {
        setUser(userData);
      }
    };
    fetchUser();
  }, [navigate]);

  const handleLogout = async () => {
    await logout();
    navigate('/login');
  };

  if (!user) return <div>Loading...</div>;

  return (
    <div className="middle-center">
      {user.last_name ? (
        <h1>Hello, {user.first_name} {user.last_name}!</h1>
      ) : (
        <h1>Hello, {user.first_name}!</h1>
      )}

      {user.profile_picture && (
        <a href={user.profile_picture} target="_blank" rel="noopener noreferrer">
          <img 
            className="profile-picture" 
            src={`${user.profile_picture}?v=${Date.now()}`} 
            alt="Profile" 
          />
        </a>
      )}

      {user.last_name ? (
        <>
          <h2 className="user-data">First Name: {user.first_name}</h2>
          <h2 className="user-data">Last Name: {user.last_name}</h2>
        </>
      ) : (
        <h2 className="user-data">First Name: {user.first_name}</h2>
      )}

      {user.telegram_username && (
        <h2 className="user-data">
          Username: 
          <a href={`https://t.me/${user.telegram_username}`} target="_blank" rel="noopener noreferrer">
            @{user.telegram_username}
          </a>
        </h2>
      )}

      <h2 className="user-data">Telegram ID: {user.telegram_id}</h2>
      <h2 className="user-data">User ID: {user._id}</h2>
      <button onClick={handleLogout} className="logout-button">
        <h2 className="logout">Logout</h2>
      </button>
    </div>
  );
};

export default UserProfile;