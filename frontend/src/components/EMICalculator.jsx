import React, { useState, useEffect } from 'react';
import { Calculator, Share2, Info } from 'lucide-react';
import DonutChart from './Charts/DonutChart';
import InterestLineChart from './Charts/InterestLineChart';
import { getAmortizationSchedule, explainTerm } from '../services/api';
import {
  formatCurrency,
  calculateEMILocal,
  calculateTotalInterest,
  debounce,
  formatTenure,
  copyToClipboard
} from '../utils/calculations';

const EMICalculator = () => {
  const [principal, setPrincipal] = useState(1000000);
  const [interestRate, setInterestRate] = useState(10);
  const [tenure, setTenure] = useState(60);
  const [emi, setEmi] = useState(0);
  const [totalInterest, setTotalInterest] = useState(0);
  const [totalPayment, setTotalPayment] = useState(0);
  const [schedule, setSchedule] = useState([]);
  const [explanation, setExplanation] = useState(null);
  const [showTooltip, setShowTooltip] = useState(false);

  // Real-time calculation
  useEffect(() => {
    const calculatedEmi = calculateEMILocal(principal, interestRate, tenure);
    const calculatedInterest = calculateTotalInterest(calculatedEmi, tenure, principal);
    const calculatedTotal = calculatedEmi * tenure;

    setEmi(calculatedEmi);
    setTotalInterest(calculatedInterest);
    setTotalPayment(calculatedTotal);
  }, [principal, interestRate, tenure]);

  // Fetch full schedule with debounce
  useEffect(() => {
    const fetchSchedule = debounce(async () => {
      try {
        const response = await getAmortizationSchedule({
          principal,
          interest_rate: interestRate,
          tenure_months: tenure
        });
        setSchedule(response.schedule);
      } catch (error) {
        console.error('Error fetching schedule:', error);
      }
    }, 500);

    fetchSchedule();
  }, [principal, interestRate, tenure]);

  const handleShare = async () => {
    const shareText = `💰 Loan EMI Calculation:
Principal: ${formatCurrency(principal)}
Interest Rate: ${interestRate}%
Tenure: ${formatTenure(tenure)}
Monthly EMI: ${formatCurrency(emi)}
Total Interest: ${formatCurrency(totalInterest)}
Total Payment: ${formatCurrency(totalPayment)}

Calculate your loan at Sure Loan Optimizer`;

    try {
      await copyToClipboard(shareText);
      alert('Results copied to clipboard!');
    } catch (error) {
      console.error('Error sharing:', error);
    }
  };

  const handleExplainTerm = async (term) => {
    try {
      const response = await explainTerm(term, {
        amount: principal,
        rate: interestRate
      });
      setExplanation({ term, text: response.explanation });
      setShowTooltip(true);
    } catch (error) {
      console.error('Error explaining term:', error);
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-50 to-blue-50 dark:from-dark-bg dark:to-slate-900 py-8">
      <div className="container mx-auto px-4">
        {/* Header */}
        <div className="text-center mb-8 animate-fade-in">
          <h1 className="text-4xl md:text-5xl font-bold text-gray-900 dark:text-white mb-3 flex items-center justify-center gap-3">
            <div className="w-12 h-12 bg-gradient-to-br from-primary-500 to-purple-500 rounded-2xl flex items-center justify-center shadow-lg">
              <Calculator className="w-7 h-7 text-white" />
            </div>
            <span className="bg-gradient-to-r from-primary-600 to-purple-600 bg-clip-text text-transparent">
              Smart EMI Calculator
            </span>
          </h1>
          <p className="text-gray-600 dark:text-gray-300 text-lg">Real-time loan calculations with interactive visualizations</p>
        </div>

        {/* Main Content */}
        <div className="grid lg:grid-cols-2 gap-8">
          {/* Input Section */}
          <div className="bg-white dark:bg-dark-card rounded-2xl shadow-xl p-8 border border-gray-200 dark:border-gray-700 hover:shadow-2xl transition-all">
            <h2 className="text-2xl font-bold text-gray-900 dark:text-white mb-6 flex items-center gap-2">
              <span className="w-2 h-8 bg-gradient-to-b from-primary-500 to-purple-500 rounded-full"></span>
              Loan Details
            </h2>

            {/* Principal */}
            <div className="mb-6">
              <div className="flex justify-between items-center mb-3">
                <label className="text-gray-700 dark:text-gray-300 font-semibold flex items-center gap-2">
                  Principal Amount
                  <Info
                    className="w-4 h-4 text-gray-400 dark:text-gray-500 cursor-pointer hover:text-primary-600 dark:hover:text-primary-400 transition-colors"
                    onClick={() => handleExplainTerm('principal')}
                  />
                </label>
                <span className="text-primary-600 dark:text-primary-400 font-bold text-xl">
                  {formatCurrency(principal)}
                </span>
              </div>
              <input
                type="range"
                min="100000"
                max="10000000"
                step="100000"
                value={principal}
                onChange={(e) => setPrincipal(Number(e.target.value))}
                className="w-full slider"
              />
              <div className="flex justify-between text-xs text-gray-500 dark:text-gray-400 mt-2">
                <span>₹1L</span>
                <span>₹1Cr</span>
              </div>
            </div>

            {/* Interest Rate */}
            <div className="mb-6">
              <div className="flex justify-between items-center mb-3">
                <label className="text-gray-700 dark:text-gray-300 font-semibold flex items-center gap-2">
                  Interest Rate (Annual)
                  <Info
                    className="w-4 h-4 text-gray-400 dark:text-gray-500 cursor-pointer hover:text-primary-600 dark:hover:text-primary-400 transition-colors"
                    onClick={() => handleExplainTerm('interest rate')}
                  />
                </label>
                <span className="text-primary-600 dark:text-primary-400 font-bold text-xl">{interestRate}%</span>
              </div>
              <input
                type="range"
                min="1"
                max="25"
                step="0.5"
                value={interestRate}
                onChange={(e) => setInterestRate(Number(e.target.value))}
                className="w-full slider"
              />
              <div className="flex justify-between text-xs text-gray-500 dark:text-gray-400 mt-2">
                <span>1%</span>
                <span>25%</span>
              </div>
            </div>

            {/* Tenure */}
            <div className="mb-8">
              <div className="flex justify-between items-center mb-3">
                <label className="text-gray-700 dark:text-gray-300 font-semibold flex items-center gap-2">
                  Loan Tenure
                  <Info
                    className="w-4 h-4 text-gray-400 dark:text-gray-500 cursor-pointer hover:text-primary-600 dark:hover:text-primary-400 transition-colors"
                    onClick={() => handleExplainTerm('tenure')}
                  />
                </label>
                <span className="text-primary-600 dark:text-primary-400 font-bold text-xl">{formatTenure(tenure)}</span>
              </div>
              <input
                type="range"
                min="12"
                max="360"
                step="12"
                value={tenure}
                onChange={(e) => setTenure(Number(e.target.value))}
                className="w-full slider"
              />
              <div className="flex justify-between text-xs text-gray-500 dark:text-gray-400 mt-2">
                <span>1 year</span>
                <span>30 years</span>
              </div>
            </div>

            {/* Results */}
            <div className="border-t-2 border-gray-200 dark:border-gray-700 pt-6">
              <div className="bg-gradient-to-br from-primary-500 to-purple-500 rounded-2xl p-6 mb-4 shadow-lg hover:shadow-2xl transition-shadow">
                <div className="text-sm text-white/80 mb-2">Monthly EMI</div>
                <div className="text-4xl md:text-5xl font-bold text-white">
                  {formatCurrency(emi)}
                </div>
              </div>

              <div className="grid grid-cols-2 gap-4">
                <div className="bg-gradient-to-br from-orange-50 to-orange-100 dark:from-orange-900/20 dark:to-orange-800/20 rounded-xl p-4 border border-orange-200 dark:border-orange-700/50">
                  <div className="text-sm text-gray-600 dark:text-gray-300 mb-1">Total Interest</div>
                  <div className="text-xl font-bold text-orange-600 dark:text-orange-400">
                    {formatCurrency(totalInterest)}
                  </div>
                </div>
                <div className="bg-gradient-to-br from-blue-50 to-blue-100 dark:from-blue-900/20 dark:to-blue-800/20 rounded-xl p-4 border border-blue-200 dark:border-blue-700/50">
                  <div className="text-sm text-gray-600 dark:text-gray-300 mb-1">Total Payment</div>
                  <div className="text-xl font-bold text-blue-600 dark:text-blue-400">
                    {formatCurrency(totalPayment)}
                  </div>
                </div>
              </div>

              <button
                onClick={handleShare}
                className="w-full mt-4 bg-gradient-to-r from-primary-600 to-purple-600 text-white py-3 rounded-xl font-semibold hover:shadow-xl hover:shadow-primary-500/50 transition-all flex items-center justify-center gap-2 transform hover:scale-105"
              >
                <Share2 className="w-5 h-5" />
                Share Results
              </button>
            </div>
          </div>

          {/* Visualization Section */}
          <div className="space-y-8">
            <div className="bg-white dark:bg-dark-card rounded-2xl shadow-xl p-8 border border-gray-200 dark:border-gray-700 hover:shadow-2xl transition-all">
              <DonutChart principal={principal} totalInterest={totalInterest} />
            </div>

            {schedule.length > 0 && (
              <div className="bg-white dark:bg-dark-card rounded-2xl shadow-xl p-8 border border-gray-200 dark:border-gray-700 hover:shadow-2xl transition-all">
                <InterestLineChart schedule={schedule} />
              </div>
            )}
          </div>
        </div>

        {/* Explanation Tooltip */}
        {showTooltip && explanation && (
          <div className="fixed inset-0 bg-black/60 backdrop-blur-sm flex items-center justify-center z-50 p-4 animate-fade-in">
            <div className="bg-white dark:bg-dark-card rounded-2xl shadow-2xl max-w-md w-full p-6 animate-slide-up border border-gray-200 dark:border-gray-700">
              <h3 className="text-xl font-bold text-gray-900 dark:text-white mb-3 capitalize">
                {explanation.term}
              </h3>
              <p className="text-gray-600 dark:text-gray-300 leading-relaxed mb-4">{explanation.text}</p>
              <button
                onClick={() => setShowTooltip(false)}
                className="w-full bg-gradient-to-r from-primary-600 to-purple-600 text-white py-3 rounded-xl font-semibold hover:shadow-xl hover:shadow-primary-500/50 transition-all transform hover:scale-105"
              >
                Got it!
              </button>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default EMICalculator;
