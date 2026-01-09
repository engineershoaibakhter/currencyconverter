# Quick Start Guide

## 🚀 Quick Setup (5 minutes)

### Step 1: Install Backend Dependencies
```bash
cd backend
npm install
```

### Step 2: Install Frontend Dependencies
```bash
cd ../frontend
npm install
```

### Step 3: Start Backend (Terminal 1)
```bash
cd backend
npm run start:dev
```
✅ Backend running at: http://localhost:3000

### Step 4: Start Frontend (Terminal 2)
```bash
cd frontend
npm start
```
✅ Frontend running at: http://localhost:4200

### Step 5: Open Browser
Navigate to: http://localhost:4200

## ✨ Features to Test

1. **Currency Conversion**
   - Select "From" currency (e.g., USD)
   - Select "To" currency (e.g., EUR)
   - Enter amount (e.g., 100)
   - Click "Convert"

2. **Historical Rates**
   - Click on the date picker
   - Select a past date
   - Convert to see historical rate

3. **Conversion History**
   - Click "History" tab
   - View all your conversions
   - Delete individual items
   - Clear all history

4. **Mobile View**
   - Open DevTools (F12)
   - Toggle device toolbar (Ctrl+Shift+M)
   - Test on different screen sizes

## 🔧 Troubleshooting

### Port Already in Use

**Backend (Port 3000)**:
```bash
# Windows
netstat -ano | findstr :3000
taskkill /PID <PID> /F

# Linux/Mac
lsof -ti:3000 | xargs kill -9
```

**Frontend (Port 4200)**:
```bash
# Change port in angular.json or
ng serve --port 4300
```

### API Key Limit Reached

1. Go to: https://freecurrencyapi.com
2. Sign up (free)
3. Copy new API key
4. Update `backend/.env`:
   ```
   CURRENCY_API_KEY=your_new_key_here
   ```
5. Restart backend

### Dependencies Issues

```bash
# Clear cache and reinstall
rm -rf node_modules package-lock.json
npm cache clean --force
npm install
```

## 📱 Testing Checklist

- [ ] Backend API responds at http://localhost:3000/currency/currencies
- [ ] Frontend loads at http://localhost:4200
- [ ] Can select currencies from dropdowns
- [ ] Can convert currencies
- [ ] Results display correctly
- [ ] Can select historical date
- [ ] Historical conversion works
- [ ] History tab shows conversions
- [ ] History persists after page reload
- [ ] Can delete history items
- [ ] Mobile view is responsive
- [ ] All animations work smoothly

## 🎨 UI Highlights

- **Color Scheme**: Purple gradient (#667eea to #764ba2)
- **Material Design**: Angular Material components
- **Animations**: Smooth fade-in effects
- **Mobile-First**: Perfect on all screen sizes
- **Professional**: Clean and modern interface

## 📊 Project Structure

```
TA SOLUTION/
├── backend/           → NestJS backend (Port 3000)
│   ├── src/
│   │   ├── currency/  → Currency API logic
│   │   └── main.ts    → Entry point
│   └── .env           → API key configuration
│
├── frontend/          → Angular app (Port 4200)
│   └── src/
│       ├── app/
│       │   ├── components/     → UI components
│       │   ├── services/       → API & storage services
│       │   ├── models/         → TypeScript interfaces
│       │   └── directives/     → Custom directives
│       └── environments/       → Config files
│
├── README.md          → Full documentation
├── DEPLOYMENT.md      → Deployment guide
└── QUICKSTART.md      → This file
```

## 🔗 Useful Commands

### Backend
```bash
npm run start:dev    # Development mode with hot reload
npm run build        # Build for production
npm run start:prod   # Run production build
```

### Frontend
```bash
npm start            # Development server
npm run build        # Production build
ng serve --open      # Start and open browser
```

## 🌐 API Endpoints

Test these in browser or Postman:

1. **Get Currencies**
   ```
   GET http://localhost:3000/currency/currencies
   ```

2. **Latest Rates**
   ```
   GET http://localhost:3000/currency/latest?base_currency=USD
   ```

3. **Historical Rates**
   ```
   GET http://localhost:3000/currency/historical?date=2024-01-01&base_currency=USD
   ```

4. **Convert**
   ```
   GET http://localhost:3000/currency/convert?from=USD&to=EUR&amount=100
   ```

## 🎯 Next Steps

1. ✅ Test all features locally
2. 📝 Update README with screenshots
3. 🔐 Create new API key if needed
4. 🚀 Deploy backend (see DEPLOYMENT.md)
5. 🌍 Deploy frontend (see DEPLOYMENT.md)
6. 🔗 Share GitHub repository
7. 📧 Submit deployed URL

## 💡 Pro Tips

- Use Ctrl+Shift+I to open DevTools
- Check Network tab for API calls
- Use Console for debugging
- Test on real mobile device
- Clear localStorage to reset history
- Keep backend running while using frontend

## ❓ Need Help?

- Check [README.md](README.md) for full docs
- See [DEPLOYMENT.md](DEPLOYMENT.md) for deployment
- Check browser console for errors
- Verify both servers are running
- Ensure ports 3000 and 4200 are free

---

**Ready to go? Start with Step 1 above! 🚀**
