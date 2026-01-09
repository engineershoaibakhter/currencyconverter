# Currency Converter - TA Solutions

A professional full-stack currency converter application built with Angular 19, Angular Material, and NestJS.

## Features

✨ **Core Features:**
- Real-time currency conversion using FreeCurrencyAPI
- Historical exchange rates with date selector
- Support for 150+ currencies
- Conversion history with localStorage persistence
- Mobile-first responsive design
- Professional UI with Angular Material
- Custom directives for input validation
- Smooth animations and loading states

🎯 **Technical Highlights:**
- **Frontend:** Angular 19, Angular Material, Standalone Components
- **Backend:** NestJS with secure API key handling
- **API:** FreeCurrencyAPI integration
- **Storage:** localStorage for persistent history
- **Design:** Mobile-first, responsive, modern gradient UI

## Project Structure

```
TA SOLUTION/
├── backend/                 # NestJS Backend
│   ├── src/
│   │   ├── currency/       # Currency module
│   │   │   ├── currency.controller.ts
│   │   │   ├── currency.service.ts
│   │   │   └── currency.module.ts
│   │   ├── app.module.ts
│   │   └── main.ts
│   ├── .env                # Environment variables
│   └── package.json
│
└── frontend/               # Angular Frontend
    ├── src/
    │   ├── app/
    │   │   ├── components/
    │   │   │   ├── currency-converter/
    │   │   │   └── conversion-history/
    │   │   ├── services/
    │   │   │   ├── currency.service.ts
    │   │   │   └── storage.service.ts
    │   │   ├── models/
    │   │   │   └── currency.model.ts
    │   │   ├── directives/
    │   │   │   ├── currency-format.directive.ts
    │   │   │   └── numbers-only.directive.ts
    │   │   ├── app.component.ts
    │   │   └── app.component.html
    │   ├── environments/
    │   └── styles.scss
    └── package.json
```

## Installation & Setup

### Prerequisites
- Node.js (v18 or higher)
- npm or yarn

### Backend Setup

1. Navigate to the backend directory:
```bash
cd backend
```

2. Install dependencies:
```bash
npm install
```

3. Configure environment variables (`.env` file already created):
```env
CURRENCY_API_KEY=4E0VK7BnkdeUuh1vegAt808v2IUjzUR6lxcvBMT2
CURRENCY_API_BASE_URL=https://api.freecurrencyapi.com/v1
PORT=3000
```

4. Start the backend server:
```bash
npm run start:dev
```

The backend will be running at `http://localhost:3000`

### Frontend Setup

1. Navigate to the frontend directory:
```bash
cd frontend
```

2. Install dependencies:
```bash
npm install
```

3. Start the development server:
```bash
npm start
```

The frontend will be running at `http://localhost:4200`

## API Endpoints

### Backend REST API

- `GET /currency/currencies` - Get all supported currencies
- `GET /currency/latest?base_currency=USD&currencies=EUR` - Get latest exchange rates
- `GET /currency/historical?date=2024-01-01&base_currency=USD&currencies=EUR` - Get historical rates
- `GET /currency/convert?from=USD&to=EUR&amount=100&date=2024-01-01` - Convert currency

## Features Demonstration

### 1. Currency Conversion
- Select from currency dropdown
- Select to currency dropdown
- Enter amount
- Optionally select historical date
- Click "Convert" to see results

### 2. Historical Rates
- Click on the date picker
- Select any past date
- Conversion will use exchange rate from that date

### 3. Conversion History
- All conversions are automatically saved
- View history in the "History" tab
- Persists even after browser reload
- Delete individual items or clear all

### 4. Mobile Responsive
- Optimized for mobile screens
- Touch-friendly interface
- Adaptive layouts

## Deployment

### Backend Deployment (Render/Railway/Heroku)

1. Create a new web service
2. Connect your GitHub repository
3. Set environment variables:
   - `CURRENCY_API_KEY`
   - `CURRENCY_API_BASE_URL`
   - `PORT`
4. Deploy

### Frontend Deployment (Netlify)

1. Build the production bundle:
```bash
cd frontend
npm run build
```

2. Deploy to Netlify:
   - Drag and drop the `dist/currency-converter/browser` folder to Netlify
   - Or connect GitHub repository for automatic deployments

3. Update environment:
   - Update `environment.prod.ts` with your backend URL
   - Rebuild and redeploy

### Important: CORS Configuration

Update the backend `main.ts` file with your deployed frontend URL:
```typescript
app.enableCors({
  origin: ['http://localhost:4200', 'https://your-frontend-url.netlify.app'],
  methods: 'GET,HEAD,PUT,PATCH,POST,DELETE,OPTIONS',
  credentials: true,
});
```

## Usage Tips

1. **API Key**: If the provided API key reaches its limit, create a new free key at https://freecurrencyapi.com/
2. **Historical Data**: Free API has limitations on historical data range
3. **Rate Limits**: Be mindful of API rate limits (free tier)

## Technologies Used

### Frontend
- Angular 19
- Angular Material
- RxJS
- TypeScript
- SCSS

### Backend
- NestJS
- Axios
- Node.js
- TypeScript

## Browser Support

- Chrome (latest)
- Firefox (latest)
- Safari (latest)
- Edge (latest)
- Mobile browsers

## License

MIT License - Feel free to use this project for learning and development.

## Author

**TA Solutions**

## Screenshots

### Desktop View
![Currency Converter](screenshots/converter.png)

### Mobile View
![Mobile View](screenshots/mobile.png)

### History
![Conversion History](screenshots/history.png)

---

**Note:** Make sure both backend and frontend are running for the application to work properly. The backend must be started before the frontend to ensure API connectivity.
