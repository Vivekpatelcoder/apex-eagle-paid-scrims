# Railway/Render Deployment

## Deploy to Railway

### Steps:
1. Push code to GitHub
2. Go to https://railway.app
3. Click "New Project"
4. Select "Deploy from GitHub repo"
5. Add environment variables in Railway dashboard
6. Railway auto-deploys on push

### Environment Variables (Add in Railway):
```
NODE_ENV=production
PORT=5000
FIREBASE_API_KEY=your_key
FIREBASE_PROJECT_ID=your_project
PHONEPE_MERCHANT_ID=your_merchant_id
PHONEPE_API_KEY=your_api_key
EMAIL_USER=your_email@gmail.com
EMAIL_PASSWORD=your_app_password
JWT_SECRET=your_secret_key
```

## Deploy Frontend to Vercel

### Steps:
1. Go to https://vercel.com
2. Import your GitHub repository
3. Vercel auto-detects it's a static site
4. Click Deploy
5. Update API_BASE_URL in api-service.js to your Railway URL

## Docker Setup (Optional)

Create `Dockerfile`:
```dockerfile
FROM node:18
WORKDIR /app
COPY package*.json ./
RUN npm install
COPY . .
EXPOSE 5000
CMD ["npm", "start"]
```

Create `docker-compose.yml`:
```yaml
version: '3'
services:
  app:
    build: .
    ports:
      - "5000:5000"
    environment:
      NODE_ENV: production
      PORT: 5000
```

Run with: `docker-compose up`
