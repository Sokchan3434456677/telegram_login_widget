const crypto = require('crypto');

function verifyTelegramAuth(botToken, authData) {
  const checkString = Object.keys(authData)
    .filter(key => key !== 'hash')
    .sort()
    .map(key => `${key}=${authData[key]}`)
    .join('\n');
  
  const secretKey = crypto.createHash('sha256').update(botToken).digest();
  const hmac = crypto.createHmac('sha256', secretKey).update(checkString).digest('hex');
  
  return hmac === authData.hash;
}

module.exports = { verifyTelegramAuth };