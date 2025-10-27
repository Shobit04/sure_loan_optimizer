import axios from 'axios';

const API_URL = process.env.REACT_APP_API_URL || 'http://localhost:8000';

const api = axios.create({
  baseURL: API_URL,
  headers: {
    'Content-Type': 'application/json',
  },
});

// EMI Calculator
export const calculateEMI = async (loanData) => {
  const response = await api.post('/api/calculate-emi', loanData);
  return response.data;
};

// Loan Comparison
export const compareLoans = async (loans) => {
  const response = await api.post('/api/compare-loans', { loans });
  return response.data;
};

// Prepayment Calculator
export const calculatePrepayment = async (prepaymentData) => {
  const response = await api.post('/api/calculate-prepayment', prepaymentData);
  return response.data;
};

// Amortization Schedule
export const getAmortizationSchedule = async (loanData) => {
  const response = await api.post('/api/amortization-schedule', loanData);
  return response.data;
};

// AI Advisor
export const getAIRecommendation = async (data) => {
  const response = await api.post('/api/ai-advisor', data);
  return response.data;
};

// AI Term Explainer
export const explainTerm = async (term, context = null) => {
  const response = await api.post('/api/ai-explain-term', { term, context });
  return response.data;
};

// AI Savings Strategy
export const getAIStrategy = async (strategyData) => {
  const response = await api.post('/api/ai-strategy', strategyData);
  return response.data;
};

// AI Chatbot
export const chatWithAI = async (question, loanContext = null, history = null) => {
  const response = await api.post('/api/ai-chat', {
    user_question: question,
    loan_context: loanContext,
    conversation_history: history,
  });
  return response.data;
};

// Sample Loans
export const getSampleLoans = async () => {
  const response = await api.get('/api/sample-loans');
  return response.data;
};

// Health Check
export const healthCheck = async () => {
  const response = await api.get('/api/health');
  return response.data;
};

export default api;
