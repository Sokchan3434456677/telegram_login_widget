require('dotenv').config();

module.exports = {
  BOT_TOKEN: process.env.BOT_TOKEN || '7319982034:AAGhxNH7RHI1ZI5MnIouLXgm2UxIVjmSGiI',
  BOT_USERNAME: process.env.BOT_USERNAME || 'targetclotherigisterBot',
  MONGODB_URI: process.env.MONGODB_URI || 'mongodb+srv://sokchanear0:lDSUqqnQNYBxWJll@cluster0.exfhtoc.mongodb.net/Dl_DAshboard?retryWrites=true&w=majority&appName=Cluster0',
  SESSION_SECRET: process.env.SESSION_SECRET || 'your-secret-key',
  PORT: process.env.PORT || 5000,
  CLIENT_URL: process.env.CLIENT_URL || 'https://telegramloginwidget.vercel.app'
};
