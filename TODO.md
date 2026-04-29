# Portfolio Contact Form CORS Fix - TODO

## Completed:
- [x] Updated frontend/script.js: Fixed API_URL to use production Render backend for deployed site
- [x] Updated backend/index.js: Added specific CORS origins for Vercel/Render/localhost
- [x] Created this TODO.md

## Remaining:
- [ ] Verify backend deployment on Render:
  - Login to Render dashboard
  - Check service status, redeploy if needed (git push or manual)
  - Test https://personal-portfolio-dulu.onrender.com/health → {status: "ok"}
- [ ] Test deployed frontend form (Vercel URL)
- [ ] Local test: cd backend && npm start, open frontend/index.html
- [ ] Optional: Add Vercel env var for backend URL

## Commands:
Local backend: `cd backend && npm start`
Test backend: `powershell -Command \"Invoke-WebRequest -Uri 'https://personal-portfolio-dulu.onrender.com/health'\"`

