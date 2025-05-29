const crypto = require('crypto');
const { BOT_TOKEN } = require('../config/env');

function checkTelegramAuthorization(authData) {
  const check_hash = authData.hash;
  delete authData.hash;
  
  const dataCheckArr = [];
  for (const key in authData) {
    dataCheckArr.push(`${key}=${authData[key]}`);
  }
  dataCheckArr.sort();
  
  const dataCheckString = dataCheckArr.join('\n');
  const secretKey = crypto.createHash('sha256').update(BOT_TOKEN).digest();
  const hash = crypto.createHmac('sha256', secretKey).update(dataCheckString).digest('hex');
  
  if (hash !== check_hash) {
    throw new Error('Data is NOT from Telegram');
  }
  
  if ((Date.now() / 1000 - authData.auth_date) > 86400) {
    throw new Error('Data is outdated');
  }
  
  return authData;
}

module.exports = { checkTelegramAuthorization };