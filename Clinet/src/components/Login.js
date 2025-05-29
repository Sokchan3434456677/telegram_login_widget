import React, { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { checkAuth } from '../utils/api';

const Login = () => {
  const navigate = useNavigate();
  const BOT_USERNAME = process.env.REACT_APP_BOT_USERNAME;

  useEffect(() => {
    const verifyAuth = async () => {
      const user = await checkAuth();
      if (user) {
        navigate('/user');
      }
    };
    verifyAuth();

    // Listen for Telegram login callback
    window.onTelegramAuth = function(userData) {
      fetch(`http://localhost:5000/api/auth?${new URLSearchParams(userData).toString()}`)
        .then(res => res.json())
        .then(data => {
          if (data.token) {
            localStorage.setItem('token', data.token);
            navigate('/user');
          }
        });
    };
  }, [navigate]);

  return (
    <div className="middle-center">
      <h1>Hello, Anonymous!</h1>
      <div
        id="telegram-login"
        dangerouslySetInnerHTML={{
          __html: `<script async src="https://telegram.org/js/telegram-widget.js" data-telegram-login="${BOT_USERNAME}" data-size="large" data-userpic="false" data-auth-url="http://localhost:5000/api/auth" data-request-access="write" data-onauth="window.onTelegramAuth(user)" ></script>`
        }}
      />
    </div>
  );
};

export default Login;