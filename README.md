# 🚀 AI-Powered Loan Optimizer Platform

An intelligent fintech application that helps users discover hidden savings in their loans through AI-powered recommendations, smart comparisons, and personalized financial strategies.

![Loan Optimizer](https://img.shields.io/badge/AI-Powered-success)
![React](https://img.shields.io/badge/React-18+-blue)
![FastAPI](https://img.shields.io/badge/FastAPI-Latest-green)
![Gemini AI](https://img.shields.io/badge/Gemini-AI-orange)

## ✨ Features

### 🧮 Smart EMI Calculator
- Real-time EMI calculations with interactive sliders
- Visual payment breakdown with donut charts
- Interest vs Principal timeline visualization
- Amortization schedule generation
- Shareable results

### 📊 Multi-Loan Comparison Engine
- Compare up to 5 loans side-by-side
- Intelligent MCDA (Multi-Criteria Decision Analysis) ranking algorithm
- Visual comparison with interactive bar charts
- Automatic "Best Overall", "Most Affordable EMI", "Fastest Payoff" badges
- Savings calculator showing potential cost reductions

### 🤖 AI-Powered Recommendations (Google Gemini)
- Natural language loan advice tailored to your situation
- Financial term explainer in simple language
- Personalized savings strategy generator
- Intelligent chatbot assistant for loan queries
- Context-aware responses based on your loan details

### ⚡ Prepayment Impact Calculator
- Calculate prepayment effects on loan tenure and interest
- Toggle between "Reduce EMI" vs "Reduce Tenure" options
- Break-even analysis
- ROI calculations for prepayment decisions

### 📈 Savings Visualization Dashboard
- Interactive charts and graphs
- Key metrics cards showing potential savings
- Comprehensive loan analytics
- Export-ready reports

## 🏗️ Technology Stack

### Frontend
- **React 18+** - Modern UI library
- **Tailwind CSS** - Utility-first styling
- **Recharts** - Interactive data visualizations
- **Axios** - API communication
- **Lucide React** - Beautiful icons
- **React Router** - Navigation

### Backend
- **FastAPI** - High-performance Python web framework
- **Google Gemini API** - AI-powered recommendations
- **Pydantic** - Data validation
- **Uvicorn** - ASGI server
- **Python 3.10+**

## 📦 Installation & Setup

### Prerequisites
- **Python 3.10+** installed
- **Node.js 16+** and npm installed
- **Google Gemini API Key** (Get from [Google AI Studio](https://makersuite.google.com/app/apikey))

### Backend Setup

1. **Navigate to backend directory:**
```powershell
cd d:\sure_loan_optimizer\backend
```

2. **Activate virtual environment:**
```powershell
.\venv\Scripts\Activate.ps1
```

3. **Configure environment variables:**
   - Copy `.env.example` to `.env`
   - Add your Gemini API key:
```env
GEMINI_API_KEY=your_actual_gemini_api_key_here
PORT=8000
```

4. **Start the backend server:**
```powershell
python main.py
```

The API will be available at `http://localhost:8000`
- **API Documentation:** http://localhost:8000/docs
- **Health Check:** http://localhost:8000/api/health

### Frontend Setup

1. **Navigate to frontend directory:**
```powershell
cd d:\sure_loan_optimizer\frontend
```

2. **Install dependencies:**
```powershell
npm install
```

3. **Start the development server:**
```powershell
npm start
```

The application will open at `http://localhost:3000`

## 🎯 Usage Guide

### 1. EMI Calculator
1. Navigate to **EMI Calculator** from the landing page
2. Adjust loan amount, interest rate, and tenure using sliders
3. View real-time EMI calculations
4. Explore payment breakdown visualizations
5. Click **Share Results** to copy details

### 2. Loan Comparison
1. Go to **Compare** section
2. Enter your current loan details
3. Add alternative loan options (up to 5)
4. Or load sample scenarios for quick testing
5. Click **Compare & Analyze**
6. Review AI insights and ranked results
7. See potential savings highlighted in green

### 3. Prepayment Calculator
1. Open **Prepayment** tool
2. Enter your loan details
3. Specify prepayment amount and month
4. Choose between "Reduce EMI" or "Reduce Tenure"
5. View interest saved and break-even period

### 4. AI Chatbot
1. Click the floating AI button (bottom-right)
2. Ask questions like:
   - "Should I refinance my 11% home loan?"
   - "What is a processing fee?"
   - "How much can I save by prepaying ₹1 lakh?"
3. Get contextual, personalized responses

## 🧮 Algorithms & Calculations

### EMI Formula
```
EMI = [P × R × (1+R)^N] / [(1+R)^N - 1]
```
Where:
- P = Principal loan amount
- R = Monthly interest rate (Annual rate / 12 / 100)
- N = Tenure in months

### Multi-Criteria Decision Analysis (MCDA)
Loan ranking based on weighted scoring:
- **Total Interest**: 35%
- **Monthly EMI**: 25%
- **Total Cost**: 20%
- **Tenure**: 10%
- **Processing Fees**: 10%

Each metric is normalized (0-100 scale) and weighted to produce a composite score.

### Prepayment Impact
Calculates remaining principal after N months, applies prepayment, then:
- **Reduce EMI**: Keeps tenure same, recalculates lower EMI
- **Reduce Tenure**: Keeps EMI same, calculates months saved

## 🔌 API Endpoints

### Core Calculations
- `POST /api/calculate-emi` - Calculate EMI for single loan
- `POST /api/compare-loans` - Compare multiple loans with ranking
- `POST /api/calculate-prepayment` - Prepayment impact analysis
- `POST /api/amortization-schedule` - Month-by-month breakdown

### AI-Powered Endpoints
- `POST /api/ai-advisor` - Natural language loan recommendation
- `POST /api/ai-explain-term` - Explain financial terms simply
- `POST /api/ai-strategy` - Generate personalized savings strategy
- `POST /api/ai-chat` - Chatbot conversation

### Utility
- `GET /api/health` - Health check
- `GET /api/sample-loans` - Sample loan scenarios for testing

## 📱 Features Showcase

### Smart Visualizations
- **Donut Charts**: Principal vs Interest breakdown
- **Line Charts**: Payment timeline over loan tenure
- **Bar Charts**: Side-by-side loan cost comparison
- **Progress Indicators**: Score visualization with color coding

### User Experience
- **Real-time Calculations**: No button clicks needed
- **Debounced Updates**: Smooth performance with sliders
- **Mobile-Responsive**: Works perfectly on all devices
- **Tooltips**: AI-powered explanations for complex terms
- **Smooth Animations**: Fade-ins, slide-ups, and transitions

### AI Integration
- **Context-Aware**: AI considers your specific loan details
- **Conversational**: Natural language, not robotic responses
- **Personalized**: Recommendations based on your financial profile
- **Educational**: Explains WHY certain options are better

## 🌐 Deployment

### Frontend (Vercel)
1. Push code to GitHub repository
2. Connect Vercel to your repo
3. Configure build settings:
   - **Build Command**: `npm run build`
   - **Output Directory**: `build`
   - **Install Command**: `npm install`
4. Add environment variable:
   - `REACT_APP_API_URL` = Your backend URL
5. Deploy!

### Backend (Render)
1. Push code to GitHub
2. Create new Web Service on Render
3. Configure:
   - **Build Command**: `pip install -r requirements.txt`
   - **Start Command**: `uvicorn main:app --host 0.0.0.0 --port $PORT`
4. Add environment variables:
   - `GEMINI_API_KEY` = Your API key
5. Deploy!

## 🧪 Sample Scenarios

The app includes pre-configured scenarios for testing:

### Home Loan Refinancing
- Current: ₹50L at 11.5% for 20 years
- Option A: ₹50L at 9.5% for 20 years
- Option B: ₹50L at 9% for 15 years

### Personal Loan Optimization
- Current: ₹5L at 16% for 3 years
- Option A: ₹5L at 13% for 3 years
- Option B: ₹5L at 14% for 2 years

### Car Loan Comparison
- Current: ₹10L at 10% for 5 years
- Option A: ₹10L at 8.5% for 5 years
- Option B: ₹10L at 9% for 4 years

## 🤝 Contributing

Contributions are welcome! Please feel free to submit a Pull Request.

## 📄 License

This project is open source and available under the MIT License.

## 🙏 Acknowledgments

- **Google Gemini AI** for intelligent recommendations
- **Recharts** for beautiful visualizations
- **FastAPI** for excellent API framework
- **Tailwind CSS** for rapid UI development

## 📞 Support

For issues, questions, or suggestions:
- Create an issue on GitHub
- Contact: your-email@example.com

## 🚀 Future Enhancements

- [ ] PDF report generation
- [ ] Email notifications for loan alerts
- [ ] Historical loan data tracking
- [ ] Multi-user accounts
- [ ] Loan comparison history
- [ ] Integration with real bank APIs
- [ ] Voice-enabled AI assistant
- [ ] Regional language support

---

**Built with ❤️ using React, FastAPI, and Google Gemini AI**

*Helping borrowers save lakhs through intelligent loan optimization*
