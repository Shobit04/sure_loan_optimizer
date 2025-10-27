import React from 'react';
import { BrowserRouter as Router, Routes, Route, Link, useLocation } from 'react-router-dom';
import { Calculator, GitCompare, Zap, Home, Moon, Sun } from 'lucide-react';
import { ThemeProvider, useTheme } from './contexts/ThemeContext';
import LandingPage from './components/LandingPage';
import EMICalculator from './components/EMICalculator';
import LoanComparison from './components/LoanComparison';
import PrepaymentCalculator from './components/PrepaymentCalculator';
import AIChatbot from './components/AIChatbot';
import './index.css';

const Navigation = () => {
  const location = useLocation();
  const { theme, toggleTheme } = useTheme();
  
  const isActive = (path) => {
    return location.pathname === path;
  };

  if (location.pathname === '/') {
    return null;
  }

  return (
    <nav className="bg-white dark:bg-dark-card shadow-lg sticky top-0 z-40 backdrop-blur-sm bg-opacity-90 dark:bg-opacity-90 border-b border-gray-200 dark:border-gray-700">
      <div className="container mx-auto px-4">
        <div className="flex items-center justify-between h-16">
          <Link to="/" className="flex items-center gap-2 text-xl font-bold text-primary-600 dark:text-primary-400 hover:text-primary-700 dark:hover:text-primary-300 transition-colors">
            <Home className="w-6 h-6" />
            <span className="bg-gradient-to-r from-primary-600 to-primary-400 dark:from-primary-400 dark:to-primary-300 bg-clip-text text-transparent">
              Sure Loan Optimizer
            </span>
          </Link>
          
          <div className="flex items-center gap-2">
            <Link
              to="/calculator"
              className={`flex items-center gap-2 px-4 py-2 rounded-xl font-semibold transition-all transform hover:scale-105 ${
                isActive('/calculator')
                  ? 'bg-gradient-to-r from-primary-600 to-primary-500 text-white shadow-lg shadow-primary-500/50'
                  : 'text-gray-700 dark:text-gray-300 hover:bg-primary-50 dark:hover:bg-dark-hover'
              }`}
            >
              <Calculator className="w-5 h-5" />
              <span className="hidden sm:inline">Calculator</span>
            </Link>
            
            <Link
              to="/compare"
              className={`flex items-center gap-2 px-4 py-2 rounded-xl font-semibold transition-all transform hover:scale-105 ${
                isActive('/compare')
                  ? 'bg-gradient-to-r from-primary-600 to-primary-500 text-white shadow-lg shadow-primary-500/50'
                  : 'text-gray-700 dark:text-gray-300 hover:bg-primary-50 dark:hover:bg-dark-hover'
              }`}
            >
              <GitCompare className="w-5 h-5" />
              <span className="hidden sm:inline">Compare</span>
            </Link>
            
            <Link
              to="/prepayment"
              className={`flex items-center gap-2 px-4 py-2 rounded-xl font-semibold transition-all transform hover:scale-105 ${
                isActive('/prepayment')
                  ? 'bg-gradient-to-r from-primary-600 to-primary-500 text-white shadow-lg shadow-primary-500/50'
                  : 'text-gray-700 dark:text-gray-300 hover:bg-primary-50 dark:hover:bg-dark-hover'
              }`}
            >
              <Zap className="w-5 h-5" />
              <span className="hidden sm:inline">Prepayment</span>
            </Link>

            {/* Theme Toggle */}
            <button
              onClick={toggleTheme}
              className="ml-2 p-2 rounded-xl bg-gray-100 dark:bg-dark-hover hover:bg-gray-200 dark:hover:bg-gray-600 transition-all transform hover:scale-105 hover:rotate-12"
              aria-label="Toggle theme"
            >
              {theme === 'light' ? (
                <Moon className="w-5 h-5 text-gray-700" />
              ) : (
                <Sun className="w-5 h-5 text-yellow-400" />
              )}
            </button>
          </div>
        </div>
      </div>
    </nav>
  );
};

function App() {
  return (
    <ThemeProvider>
      <Router>
        <div className="App min-h-screen bg-gradient-to-br from-gray-50 to-gray-100 dark:from-dark-bg dark:to-slate-900 transition-colors duration-300">
          <Navigation />
          
          <Routes>
            <Route path="/" element={<LandingPage />} />
            <Route path="/calculator" element={<EMICalculator />} />
            <Route path="/compare" element={<LoanComparison />} />
            <Route path="/prepayment" element={<PrepaymentCalculator />} />
          </Routes>

          {/* AI Chatbot - Available on all pages */}
          <AIChatbot />
        </div>
      </Router>
    </ThemeProvider>
  );
}

export default App;
