# DEPLOYMENT GUIDE & CONFIGURATION

## 1. Environment Variables (.env)
```ini
# Database
MONGODB_URI="mongodb://localhost:27017/ikasmandakendal_dev"

# Authentication
NEXTAUTH_SECRET="CHANGE_ME_IN_PROD"
NEXTAUTH_URL="http://localhost:3000"
```

## 2. Database Access (MongoDB)
Gunakan MongoDB Compass.

## 3. Deployment Steps
1.  **Vercel**: Import repository -> Set Envs -> Deploy.
2.  **VPS**: `npm run build` -> `npm start`.

## 4. Admin Management
*   **Content**: Admin bisa mengedit konten via `/admin`.
*   **API Token**: Generate di menu Users.
