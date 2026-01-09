# Currency Converter - Deployment Guide

## Backend Deployment

### Option 1: Render.com (Recommended)

1. **Create Account**: Sign up at https://render.com

2. **Create New Web Service**:
   - Click "New +" → "Web Service"
   - Connect your GitHub repository
   - Select the `backend` directory

3. **Configure**:
   - Name: `currency-converter-backend`
   - Environment: `Node`
   - Build Command: `npm install`
   - Start Command: `npm run start:prod`

4. **Environment Variables**:
   ```
   CURRENCY_API_KEY=4E0VK7BnkdeUuh1vegAt808v2IUjzUR6lxcvBMT2
   CURRENCY_API_BASE_URL=https://api.freecurrencyapi.com/v1
   PORT=3000
   ```

5. **Deploy**: Click "Create Web Service"

6. **Note your backend URL**: `https://currency-converter-backend-xxxx.onrender.com`

### Option 2: Railway.app

1. Sign up at https://railway.app
2. Create new project from GitHub repo
3. Add environment variables
4. Deploy

### Option 3: Heroku

1. Install Heroku CLI
2. Login: `heroku login`
3. Create app: `heroku create currency-converter-backend`
4. Set env vars: `heroku config:set CURRENCY_API_KEY=xxx`
5. Deploy: `git push heroku main`

## Frontend Deployment

### Option 1: Netlify (Recommended)

#### Method A: Drag & Drop

1. **Build the app**:
   ```bash
   cd frontend
   npm install
   npm run build
   ```

2. **Deploy**:
   - Go to https://app.netlify.com/drop
   - Drag and drop the `dist/currency-converter/browser` folder
   - Done!

#### Method B: GitHub Integration

1. **Update Environment**:
   - Edit `frontend/src/environments/environment.prod.ts`
   - Replace `apiUrl` with your backend URL:
   ```typescript
   export const environment = {
     production: true,
     apiUrl: 'https://your-backend-url.onrender.com'
   };
   ```

2. **Commit and Push** to GitHub

3. **Netlify Setup**:
   - Go to https://app.netlify.com
   - Click "Add new site" → "Import an existing project"
   - Connect to GitHub
   - Select your repository
   
4. **Build Settings**:
   - Base directory: `frontend`
   - Build command: `npm run build`
   - Publish directory: `dist/currency-converter/browser`

5. **Deploy**!

### Option 2: Vercel

1. Install Vercel CLI:
   ```bash
   npm i -g vercel
   ```

2. Deploy:
   ```bash
   cd frontend
   vercel
   ```

### Option 3: Firebase Hosting

1. Install Firebase CLI:
   ```bash
   npm install -g firebase-tools
   ```

2. Initialize:
   ```bash
   firebase login
   firebase init hosting
   ```

3. Build and deploy:
   ```bash
   npm run build
   firebase deploy
   ```

## Post-Deployment Steps

### 1. Update CORS in Backend

Edit `backend/src/main.ts`:

```typescript
app.enableCors({
  origin: [
    'http://localhost:4200',
    'https://your-frontend-url.netlify.app'  // Add your frontend URL
  ],
  methods: 'GET,HEAD,PUT,PATCH,POST,DELETE,OPTIONS',
  credentials: true,
});
```

Redeploy the backend after this change.

### 2. Test the Deployment

1. Visit your frontend URL
2. Test currency conversion
3. Test historical dates
4. Check if history persists
5. Test on mobile device

### 3. Monitor API Usage

- Check your FreeCurrencyAPI dashboard
- Monitor API calls
- If you hit the limit, create a new free API key

## Troubleshooting

### Frontend can't connect to backend

**Issue**: CORS errors or connection refused

**Solutions**:
1. Check if backend is running and accessible
2. Verify backend URL in `environment.prod.ts`
3. Check CORS configuration in backend
4. Ensure HTTPS is used (most hosts provide it automatically)

### API Key Limit Reached

**Issue**: API returns 429 or quota exceeded errors

**Solution**:
1. Go to https://freecurrencyapi.com
2. Create a new free account
3. Get new API key
4. Update backend environment variable
5. Redeploy backend

### Build Errors

**Issue**: Build fails on deployment

**Solutions**:
1. Check Node.js version (use v18+)
2. Clear cache: `npm cache clean --force`
3. Delete `node_modules` and reinstall
4. Check build logs for specific errors

### History Not Persisting

**Issue**: Conversion history disappears

**Solution**:
- This is a browser localStorage feature
- Check if localStorage is enabled
- Check browser privacy settings
- Try a different browser

## Environment Variables Summary

### Backend (.env)
```env
CURRENCY_API_KEY=4E0VK7BnkdeUuh1vegAt808v2IUjzUR6lxcvBMT2
CURRENCY_API_BASE_URL=https://api.freecurrencyapi.com/v1
PORT=3000
```

### Frontend (environment.prod.ts)
```typescript
export const environment = {
  production: true,
  apiUrl: 'https://your-backend-url.onrender.com'
};
```

## Custom Domain (Optional)

### Netlify
1. Go to Site Settings → Domain Management
2. Add custom domain
3. Follow DNS configuration instructions

### Render
1. Go to Settings → Custom Domains
2. Add your domain
3. Update DNS records

## Monitoring

### Backend
- Render Dashboard: Check logs and metrics
- Set up health checks
- Monitor API usage

### Frontend
- Netlify Analytics: Track visitors
- Check deploy logs
- Monitor build times

## Security Best Practices

1. **Never commit `.env` files**: Already in `.gitignore`
2. **Use environment variables**: For all sensitive data
3. **Enable HTTPS**: Automatic on Netlify and Render
4. **Rate limiting**: Consider adding to backend
5. **Input validation**: Already implemented

## Cost Considerations

### Free Tiers
- **Render**: Free tier available (spins down after inactivity)
- **Netlify**: 100GB bandwidth/month free
- **FreeCurrencyAPI**: Limited free requests

### Keeping Backend Active
- Render free tier spins down after 15 min inactivity
- Consider using a cron job to ping every 10 minutes
- Or upgrade to paid tier ($7/month)

## Support

If you encounter issues:
1. Check deployment logs
2. Verify environment variables
3. Test API endpoints directly
4. Check browser console for errors
5. Review network requests in DevTools

---

**Quick Deploy Checklist:**
- [ ] Backend deployed and running
- [ ] Backend URL noted
- [ ] Frontend environment updated with backend URL
- [ ] Frontend built successfully
- [ ] Frontend deployed
- [ ] CORS updated in backend
- [ ] Backend redeployed
- [ ] Application tested end-to-end
- [ ] Mobile responsiveness verified
- [ ] GitHub repository updated with deployment URLs

Good luck with your deployment! 🚀
