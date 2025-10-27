# 🚀 Quick Deployment Steps

## Frontend → Vercel (5 minutes)

1. **Go to Vercel**: https://vercel.com
2. **Sign in** with GitHub
3. **Import Project**: 
   - Click "Add New Project"
   - Select `Shobit04/sure_loan_optimizer`
4. **Configure**:
   - Root Directory: `frontend`
   - Framework: Create React App
   - Click "Deploy"
5. **After backend deployment, add environment variable**:
   - Go to Settings → Environment Variables
   - Add `REACT_APP_API_URL` = `https://your-render-backend-url.onrender.com`
   - Redeploy

**Your frontend URL**: `https://your-project-name.vercel.app`

---

## Backend → Render (10 minutes)

1. **Go to Render**: https://render.com
2. **Sign in** with GitHub
3. **Create Web Service**:
   - Click "New +" → "Web Service"
   - Select `Shobit04/sure_loan_optimizer`
4. **Configure**:
   - Name: `loan-optimizer-backend`
   - Root Directory: `backend`
   - Runtime: Python 3
   - Build Command: `pip install -r requirements.txt`
   - Start Command: `uvicorn main:app --host 0.0.0.0 --port $PORT`
5. **Add Environment Variable**:
   - Key: `GEMINI_API_KEY`
   - Value: `AIzaSyCSTwbvcAWOH22BZnGsx_x8VyIWYmBGCdA`
6. **Create Web Service** (wait 5-10 minutes)

**Your backend URL**: `https://loan-optimizer-backend.onrender.com`

---

## Final Step: Connect Frontend to Backend

1. Copy your Render backend URL
2. Go to Vercel → Your Project → Settings → Environment Variables
3. Add: `REACT_APP_API_URL` = `https://your-backend-url.onrender.com`
4. Redeploy frontend (Deployments → Click "..." → Redeploy)

---

## ✅ Test Your Deployment

- Backend Health: `https://your-backend-url.onrender.com/health`
- Frontend: `https://your-project-name.vercel.app`

**Done! Your app is live! 🎉**

---

**Note**: Free tier backend sleeps after 15 minutes of inactivity. First request will be slow (~30 seconds).

For detailed instructions, see `DEPLOYMENT.md`
