# Telegram Auth Backend API

## How to Use

1. **Start the server:**
   ```bash
   npm start
   ```
   or for development:
   ```bash
   npm run dev
   ```

2. **API Endpoints:**

   - **Telegram Auth:**  
     `GET /api/auth?...`  
     Used by the Telegram login widget.

   - **Check Auth:**  
     `GET /api/check-auth`  
     Requires header:  
     `Authorization: Bearer <JWT_TOKEN>`

   - **Logout:**  
     `POST /api/logout`  
     Requires header:  
     `Authorization: Bearer <JWT_TOKEN>`

   - **Get User by Telegram ID:**  
     `GET /api/user?telegram_id=123456789`

3. **Example Request:**
   ```bash
   curl -H "Authorization: Bearer <your_jwt_token>" http://localhost:5000/api/check-auth
   ```

4. **Frontend Integration:**
   The React frontend uses these endpoints for authentication and user profile features.
