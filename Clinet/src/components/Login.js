import React, { useEffect, useRef } from 'react';
import { useNavigate } from 'react-router-dom';
import { checkAuth } from '../utils/api';

const Login = () => {
  const navigate = useNavigate();
  const BOT_USERNAME = process.env.REACT_APP_BOT_USERNAME;
  const widgetRef = useRef(null);

  useEffect(() => {
    const verifyAuth = async () => {
      const user = await checkAuth();
      if (user) {
        navigate('/user');
      }
    };
    verifyAuth();

    // Listen for Telegram login callback

    window.onTelegramAuth = function(user) {
      fetch(`https://apiwidget-v1.vercel.app/api/auth?${new URLSearchParams(user).toString()}`)

    window.onTelegramAuth = function(userData) {
      fetch(`https://apiwidget-v1.vercel.app/api/auth?${new URLSearchParams(userData).toString()}`)

        .then(res => res.json())
        .then(data => {
          if (data.success && data.user && data.user.telegram_id) {
            localStorage.setItem('telegram_id', data.user.telegram_id);
            navigate('/user');
          } else {
            alert('Login failed: ' + (data.error || 'No user received'));
          }
        })
        .catch(err => {
          alert('Login error: ' + err.message);
        });
    };

    // Inject Telegram widget script
    if (BOT_USERNAME && widgetRef.current) {
      widgetRef.current.innerHTML = '';
      const script = document.createElement('script');
      script.src = 'https://telegram.org/js/telegram-widget.js?7';
      script.setAttribute('data-telegram-login', BOT_USERNAME);
      script.setAttribute('data-size', 'large');
      script.setAttribute('data-userpic', 'false');
      script.setAttribute('data-auth-url', 'https://apiwidget-v1.vercel.app/api/auth');
      script.setAttribute('data-request-access', 'write');
      script.setAttribute('data-onauth', 'window.onTelegramAuth(user)');
      script.async = true;
      widgetRef.current.appendChild(script);
    }
  }, [navigate, BOT_USERNAME]);

  return (
    <div className="middle-center">
      <h1>Hello, Anonymous!</h1>
      <div id="telegram-login" ref={widgetRef} />
    </div>
  );
};

export default Login;
