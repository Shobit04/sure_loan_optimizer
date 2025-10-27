# Deployment Guide

## 🚀 Deploy Frontend to Vercel

### Prerequisites
- GitHub account
- Vercel account (free tier available at https://vercel.com)

### Steps

1. **Push your code to GitHub** (Already done! ✅)

2. **Deploy to Vercel:**
   - Go to https://vercel.com and sign in
   - Click "Add New Project"
   - Import your GitHub repository: `Shobit04/sure_loan_optimizer`
   - Configure the project:
     - **Framework Preset**: Create React App
     - **Root Directory**: `frontend`
     - **Build Command**: `npm run build` (auto-detected)
     - **Output Directory**: `build` (auto-detected)
     - **Install Command**: `npm install` (auto-detected)

3. **Add Environment Variables in Vercel:**
   - In your Vercel project settings, go to "Environment Variables"
   - Add: `REACT_APP_API_URL` = `<your-render-backend-url>`
     - Example: `https://loan-optimizer-backend.onrender.com`
   - Click "Deploy" to redeploy with new environment variable

4. **Your frontend will be live at**: `https://your-project-name.vercel.app`

---

## 🔧 Deploy Backend to Render

### Prerequisites
- GitHub account
- Render account (free tier available at https://render.com)
- Your Gemini API Key: `AIzaSyCSTwbvcAWOH22BZnGsx_x8VyIWYmBGCdA`

### Steps

1. **Push your code to GitHub** (Already done! ✅)

2. **Deploy to Render:**
   - Go to https://render.com and sign in
   - Click "New +" → "Web Service"
   - Connect your GitHub repository: `Shobit04/sure_loan_optimizer`
   - Configure the service:
     - **Name**: `loan-optimizer-backend` (or your choice)
     - **Region**: Choose closest to your users
     - **Branch**: `main`
     - **Root Directory**: `backend`
     - **Runtime**: `Python 3`
     - **Build Command**: `pip install -r requirements.txt`
     - **Start Command**: `uvicorn main:app --host 0.0.0.0 --port $PORT`
     - **Instance Type**: `Free` (or your choice)

3. **Add Environment Variables in Render:**
   - In the "Environment" section, add:
     - **Key**: `GEMINI_API_KEY`
     - **Value**: `AIzaSyCSTwbvcAWOH22BZnGsx_x8VyIWYmBGCdA`
   - Click "Save"

4. **Deploy:**
   - Click "Create Web Service"
   - Wait for the deployment to complete (5-10 minutes)
   - Your backend will be live at: `https://loan-optimizer-backend.onrender.com`

5. **Important: Copy your Render backend URL and update Vercel:**
   - Copy the URL: `https://loan-optimizer-backend.onrender.com`
   - Go back to Vercel → Your Project → Settings → Environment Variables
   - Update `REACT_APP_API_URL` with your Render URL
   - Redeploy the frontend

---

## 🔄 Update API URL in Frontend

After deploying the backend to Render, you need to update the frontend to use the production API URL.

### Option 1: Using Environment Variables (Recommended)
Already configured! Just set `REACT_APP_API_URL` in Vercel to your Render backend URL.

### Option 2: Update the Code
If you want to hardcode it (not recommended), edit `frontend/src/services/api.js`:

```javascript
const API_BASE_URL = process.env.REACT_APP_API_URL || 'https://your-render-backend-url.onrender.com';
```

---

## ✅ Verification Steps

1. **Test Backend:**
   - Visit: `https://your-backend-url.onrender.com/health`
   - Should return: `{"status": "healthy"}`

2. **Test Frontend:**
   - Visit your Vercel URL
   - Try the EMI Calculator
   - Test the AI Chatbot
   - Verify dark/light mode toggle works

3. **Test API Integration:**
   - Open browser console (F12)
   - Check for any CORS or API errors
   - Test all three calculators
   - Test loan comparison feature

---

## 🐛 Troubleshooting

### Frontend Issues:
- **API calls failing**: Check REACT_APP_API_URL is set correctly in Vercel
- **CORS errors**: Ensure backend CORS is configured for your Vercel domain
- **Build fails**: Check all dependencies are in package.json

### Backend Issues:
- **Service won't start**: Check logs in Render dashboard
- **AI chatbot not working**: Verify GEMINI_API_KEY is set correctly
- **CORS errors**: Update CORS origins in backend/main.py to include your Vercel domain

### Common Solutions:
1. Check environment variables are set correctly
2. Check build and deployment logs
3. Ensure all dependencies are installed
4. Verify Python version (3.10+) and Node version (14+)

---

## 🔐 Security Notes

1. **Never commit API keys** - Use environment variables
2. **Update CORS origins** - Add your production URLs to the backend CORS configuration
3. **Use HTTPS** - Both Vercel and Render provide free SSL certificates

---

## 💰 Cost Considerations

### Vercel Free Tier:
- ✅ Unlimited deployments
- ✅ 100 GB bandwidth/month
- ✅ Automatic SSL
- ✅ Perfect for this project

### Render Free Tier:
- ✅ 750 hours/month (enough for 24/7 uptime)
- ✅ Automatic SSL
- ⚠️ Services spin down after 15 minutes of inactivity
- ⚠️ Cold start delay (~30 seconds) when waking up

**Note**: Free tier backend will sleep after inactivity. First request after sleep will be slow. Consider upgrading to paid tier ($7/month) for always-on service.

---

## 📝 Next Steps After Deployment

1. Update backend CORS to include your Vercel domain
2. Test all features in production
3. Set up custom domain (optional)
4. Monitor usage and logs
5. Consider upgrading to paid tiers if needed

---

## 🎉 Congratulations!

Your AI-Powered Loan Optimizer Platform is now live! 🚀
