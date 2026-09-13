# 🌤️ Weather Dashboard Setup Guide

## Quick Start (5 Minutes)

### Prerequisites
- Node.js v14+
- npm or yarn
- OpenWeatherMap API Key (free)

### 1. Get API Key
1. Visit [openweathermap.org/api](https://openweathermap.org/api)
2. Sign up (free)
3. Get your API key from dashboard

### 2. Frontend Setup
```bash
cd frontend
npm install
cp .env.example .env.local
```

Edit `.env.local`:
```
VITE_OPENWEATHER_API_KEY=your_key_here
```

Start development server:
```bash
npm run dev
```

Visit: `http://localhost:5173`

### 3. Backend Setup (Optional)
```bash
cd backend
npm install
cp .env.example .env
```

Edit `.env`:
```
OPENWEATHER_API_KEY=your_key_here
CORS_ORIGIN=http://localhost:5173
```

Start backend:
```bash
npm run dev
```

Server runs on: `http://localhost:5000`

## 🎯 First Use

1. Search for a city (e.g., "London")
2. View current weather and 5-day forecast
3. Click "Add to Favorites" to save
4. Toggle between °C and °F
5. Use 🌙 to switch themes

## 📱 Features

- 🌍 Global weather data
- 📊 Current conditions & forecast
- 🎨 Dark/Light modes
- ⭐ Save favorites
- 📍 Auto-detect location
- 📊 Detailed metrics
- 🌅 Sunrise/Sunset times

## 🚀 Build for Production

```bash
cd frontend
npm run build
```

Output in `dist/` folder

## 🐛 Troubleshooting

### "API key invalid"
- Check key in .env.local
- Verify key is active in OpenWeatherMap dashboard
- Wait 10 minutes after creating new key

### "CORS error"
- Ensure backend is running (if using)
- Check CORS_ORIGIN in backend .env

### "Location not found"
- Check spelling
- Try full city name with country

## 📊 API Limits

Free tier: 60 calls/minute, 1,000,000/month

## 🌐 Deployment

### Vercel (Frontend)
```bash
vercel
```

### Heroku (Backend)
```bash
heroku create app-name
heroku config:set OPENWEATHER_API_KEY=your_key
git push heroku main
```

## 📚 More Info

- [OpenWeatherMap Docs](https://openweathermap.org/api)
- [React Query Docs](https://tanstack.com/query/latest)
- [Tailwind CSS Docs](https://tailwindcss.com)

---

**Happy weather tracking! 🌤️**
