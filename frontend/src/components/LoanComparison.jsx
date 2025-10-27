import React, { useState } from 'react';
import { GitCompare, Plus, Trash2, Award, TrendingUp } from 'lucide-react';
import ComparisonBarChart from './Charts/ComparisonBarChart';
import { compareLoans, getSampleLoans } from '../services/api';
import {
  formatCurrency,
  getBadgeColor,
  getRankColor,
  generateId
} from '../utils/calculations';

const LoanComparison = () => {
  const [loans, setLoans] = useState([
    {
      id: generateId(),
      name: 'Current Loan',
      principal: 1000000,
      interest_rate: 11,
      tenure_months: 60,
      processing_fee: 0
    }
  ]);
  
  const [comparisonResults, setComparisonResults] = useState(null);
  const [loading, setLoading] = useState(false);
  const [aiInsight, setAiInsight] = useState('');

  const addLoan = () => {
    if (loans.length >= 5) {
      alert('Maximum 5 loans can be compared');
      return;
    }
    
    setLoans([
      ...loans,
      {
        id: generateId(),
        name: `Option ${loans.length}`,
        principal: 1000000,
        interest_rate: 10,
        tenure_months: 60,
        processing_fee: 0
      }
    ]);
  };

  const removeLoan = (id) => {
    if (loans.length <= 1) {
      alert('At least one loan is required');
      return;
    }
    setLoans(loans.filter(loan => loan.id !== id));
    setComparisonResults(null);
  };

  const updateLoan = (id, field, value) => {
    setLoans(loans.map(loan => 
      loan.id === id ? { ...loan, [field]: value } : loan
    ));
    setComparisonResults(null);
  };

  const handleCompare = async () => {
    if (loans.length < 2) {
      alert('Please add at least 2 loans to compare');
      return;
    }

    try {
      setLoading(true);
      const response = await compareLoans(loans);
      setComparisonResults(response.comparisons);
      setAiInsight(response.ai_insight);
    } catch (error) {
      console.error('Error comparing loans:', error);
      alert('Error comparing loans. Please try again.');
    } finally {
      setLoading(false);
    }
  };

  const loadSampleScenario = async (scenarioType) => {
    try {
      const response = await getSampleLoans();
      const scenario = response.scenarios.find(s => s.name === scenarioType);
      
      if (scenario) {
        const allLoans = [scenario.current, ...scenario.options];
        setLoans(allLoans);
        setComparisonResults(null);
      }
    } catch (error) {
      console.error('Error loading sample:', error);
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-50 to-blue-50 dark:from-dark-bg dark:to-slate-900 py-8 animate-fade-in">
      <div className="container mx-auto px-4">
        {/* Header */}
        <div className="text-center mb-8">
          <h1 className="text-4xl font-bold text-gray-900 dark:text-white mb-2 flex items-center justify-center gap-3">
            <div className="w-12 h-12 bg-gradient-to-br from-primary-500 to-purple-500 rounded-2xl flex items-center justify-center shadow-lg">
              <GitCompare className="w-6 h-6 text-white" />
            </div>
            Multi-Loan <span className="bg-gradient-to-r from-primary-600 to-purple-600 bg-clip-text text-transparent">Comparison</span> Engine
          </h1>
          <p className="text-gray-600 dark:text-gray-300 mb-4">
            Compare up to 5 loans side-by-side with intelligent ranking
          </p>

          {/* Sample Scenarios */}
          <div className="flex flex-wrap gap-2 justify-center">
            <button
              onClick={() => loadSampleScenario('Home Loan Refinancing')}
              className="text-sm px-4 py-2 bg-white dark:bg-dark-card border border-gray-300 dark:border-gray-700 rounded-lg hover:bg-gray-50 dark:hover:bg-dark-hover transition-all text-gray-700 dark:text-gray-300"
            >
              📊 Home Loan Sample
            </button>
            <button
              onClick={() => loadSampleScenario('Personal Loan Optimization')}
              className="text-sm px-4 py-2 bg-white dark:bg-dark-card border border-gray-300 dark:border-gray-700 rounded-lg hover:bg-gray-50 dark:hover:bg-dark-hover transition-all text-gray-700 dark:text-gray-300"
            >
              💳 Personal Loan Sample
            </button>
            <button
              onClick={() => loadSampleScenario('Car Loan Comparison')}
              className="text-sm px-4 py-2 bg-white dark:bg-dark-card border border-gray-300 dark:border-gray-700 rounded-lg hover:bg-gray-50 dark:hover:bg-dark-hover transition-all text-gray-700 dark:text-gray-300"
            >
              🚗 Car Loan Sample
            </button>
          </div>
        </div>

        {/* Loan Input Forms */}
        <div className="grid lg:grid-cols-2 gap-6 mb-8">
          {loans.map((loan, index) => (
            <div key={loan.id} className="bg-white dark:bg-dark-card rounded-xl shadow-lg p-6 border border-transparent dark:border-gray-700">
              <div className="flex justify-between items-center mb-4">
                <input
                  type="text"
                  value={loan.name}
                  onChange={(e) => updateLoan(loan.id, 'name', e.target.value)}
                  className="text-xl font-bold text-gray-900 dark:text-white bg-transparent border-b-2 border-transparent focus:border-primary-600 outline-none"
                />
                {loans.length > 1 && (
                  <button
                    onClick={() => removeLoan(loan.id)}
                    className="text-danger-500 hover:text-danger-700 dark:hover:text-danger-400 p-2 transition-colors"
                  >
                    <Trash2 className="w-5 h-5" />
                  </button>
                )}
              </div>

              <div className="space-y-4">
                <div>
                  <label className="block text-sm font-semibold text-gray-700 dark:text-gray-300 mb-1">
                    Principal Amount (₹)
                  </label>
                  <input
                    type="number"
                    value={loan.principal}
                    onChange={(e) => updateLoan(loan.id, 'principal', Number(e.target.value))}
                    className="w-full px-4 py-2 border border-gray-300 dark:border-gray-600 rounded-lg focus:ring-2 focus:ring-primary-500 focus:border-transparent bg-white dark:bg-slate-800 text-gray-900 dark:text-white"
                  />
                </div>

                <div>
                  <label className="block text-sm font-semibold text-gray-700 dark:text-gray-300 mb-1">
                    Interest Rate (% p.a.)
                  </label>
                  <input
                    type="number"
                    step="0.1"
                    value={loan.interest_rate}
                    onChange={(e) => updateLoan(loan.id, 'interest_rate', Number(e.target.value))}
                    className="w-full px-4 py-2 border border-gray-300 dark:border-gray-600 rounded-lg focus:ring-2 focus:ring-primary-500 focus:border-transparent bg-white dark:bg-slate-800 text-gray-900 dark:text-white"
                  />
                </div>

                <div>
                  <label className="block text-sm font-semibold text-gray-700 dark:text-gray-300 mb-1">
                    Tenure (months)
                  </label>
                  <input
                    type="number"
                    value={loan.tenure_months}
                    onChange={(e) => updateLoan(loan.id, 'tenure_months', Number(e.target.value))}
                    className="w-full px-4 py-2 border border-gray-300 dark:border-gray-600 rounded-lg focus:ring-2 focus:ring-primary-500 focus:border-transparent bg-white dark:bg-slate-800 text-gray-900 dark:text-white"
                  />
                </div>

                <div>
                  <label className="block text-sm font-semibold text-gray-700 dark:text-gray-300 mb-1">
                    Processing Fee (₹)
                  </label>
                  <input
                    type="number"
                    value={loan.processing_fee}
                    onChange={(e) => updateLoan(loan.id, 'processing_fee', Number(e.target.value))}
                    className="w-full px-4 py-2 border border-gray-300 dark:border-gray-600 rounded-lg focus:ring-2 focus:ring-primary-500 focus:border-transparent bg-white dark:bg-slate-800 text-gray-900 dark:text-white"
                  />
                </div>
              </div>
            </div>
          ))}
        </div>

        {/* Action Buttons */}
        <div className="flex flex-wrap gap-4 justify-center mb-8">
          <button
            onClick={addLoan}
            disabled={loans.length >= 5}
            className="px-6 py-3 bg-white dark:bg-dark-card border-2 border-primary-600 dark:border-primary-500 text-primary-600 dark:text-primary-400 rounded-lg font-semibold hover:bg-primary-50 dark:hover:bg-dark-hover transition-all flex items-center gap-2 disabled:opacity-50 disabled:cursor-not-allowed"
          >
            <Plus className="w-5 h-5" />
            Add Loan Option
          </button>

          <button
            onClick={handleCompare}
            disabled={loading || loans.length < 2}
            className="px-8 py-3 bg-gradient-to-r from-primary-600 to-purple-600 text-white rounded-lg font-semibold hover:from-primary-700 hover:to-purple-700 hover:shadow-xl transition-all disabled:opacity-50 disabled:cursor-not-allowed flex items-center gap-2"
          >
            {loading ? 'Analyzing...' : 'Compare & Analyze'}
            <TrendingUp className="w-5 h-5" />
          </button>
        </div>

        {/* Comparison Results */}
        {comparisonResults && (
          <div className="space-y-8 animate-fade-in">
            {/* AI Insight */}
            {aiInsight && (
              <div className="bg-gradient-to-r from-primary-50 to-success-50 dark:from-primary-900/20 dark:to-success-900/20 rounded-xl shadow-lg p-6 border-l-4 border-primary-600 dark:border-primary-500">
                <div className="flex items-start gap-3">
                  <Award className="w-6 h-6 text-primary-600 dark:text-primary-400 flex-shrink-0 mt-1" />
                  <div>
                    <h3 className="text-lg font-bold text-gray-900 dark:text-white mb-2">AI Recommendation</h3>
                    <p className="text-gray-700 dark:text-gray-300 leading-relaxed">{aiInsight}</p>
                  </div>
                </div>
              </div>
            )}

            {/* Visualization */}
            <div className="bg-white dark:bg-dark-card rounded-xl shadow-lg p-8 border border-transparent dark:border-gray-700">
              <ComparisonBarChart comparisons={comparisonResults} />
            </div>

            {/* Detailed Comparison Table */}
            <div className="bg-white dark:bg-dark-card rounded-xl shadow-lg overflow-hidden border border-transparent dark:border-gray-700">
              <div className="overflow-x-auto">
                <table className="w-full">
                  <thead className="bg-gray-50 dark:bg-slate-800">
                    <tr>
                      <th className="px-6 py-4 text-left text-sm font-bold text-gray-700 dark:text-gray-300">Rank</th>
                      <th className="px-6 py-4 text-left text-sm font-bold text-gray-700 dark:text-gray-300">Loan Name</th>
                      <th className="px-6 py-4 text-left text-sm font-bold text-gray-700 dark:text-gray-300">Monthly EMI</th>
                      <th className="px-6 py-4 text-left text-sm font-bold text-gray-700 dark:text-gray-300">Total Interest</th>
                      <th className="px-6 py-4 text-left text-sm font-bold text-gray-700 dark:text-gray-300">Total Cost</th>
                      <th className="px-6 py-4 text-left text-sm font-bold text-gray-700 dark:text-gray-300">Score</th>
                      <th className="px-6 py-4 text-left text-sm font-bold text-gray-700 dark:text-gray-300">Badge</th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-gray-200 dark:divide-gray-700">
                    {comparisonResults.map((result) => (
                      <tr
                        key={result.loan_id}
                        className={result.rank === 1 ? 'bg-success-50 dark:bg-success-900/20' : 'hover:bg-gray-50 dark:hover:bg-dark-hover'}
                      >
                        <td className="px-6 py-4">
                          <span className={`text-2xl font-bold ${getRankColor(result.rank)}`}>
                            #{result.rank}
                          </span>
                        </td>
                        <td className="px-6 py-4 font-semibold text-gray-900 dark:text-white">
                          {result.loan_name}
                          {result.rank === 1 && (
                            <span className="ml-2 text-xs text-success-600 dark:text-success-400">✓ Best Choice</span>
                          )}
                        </td>
                        <td className="px-6 py-4 text-gray-700 dark:text-gray-300">
                          {formatCurrency(result.emi)}
                        </td>
                        <td className="px-6 py-4 text-warning-600 dark:text-warning-400 font-semibold">
                          {formatCurrency(result.total_interest)}
                        </td>
                        <td className="px-6 py-4 font-semibold text-gray-900 dark:text-white">
                          {formatCurrency(result.total_cost)}
                        </td>
                        <td className="px-6 py-4">
                          <div className="flex items-center gap-2">
                            <div className="w-16 bg-gray-200 dark:bg-gray-700 rounded-full h-2">
                              <div
                                className="bg-gradient-to-r from-primary-600 to-purple-600 h-2 rounded-full"
                                style={{ width: `${result.score}%` }}
                              ></div>
                            </div>
                            <span className="text-sm font-semibold text-gray-700 dark:text-gray-300">
                              {result.score}/100
                            </span>
                          </div>
                        </td>
                        <td className="px-6 py-4">
                          {result.badge && (
                            <span className={`px-3 py-1 rounded-full text-xs font-semibold ${getBadgeColor(result.badge)}`}>
                              {result.badge}
                            </span>
                          )}
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </div>

            {/* Savings Highlight */}
            {comparisonResults.length > 1 && comparisonResults[0].savings_vs_first !== 0 && (
              <div className="bg-gradient-to-r from-success-50 to-emerald-50 dark:from-success-900/20 dark:to-emerald-900/20 rounded-xl shadow-lg p-6 border-l-4 border-success-600 dark:border-success-500">
                <h3 className="text-2xl font-bold text-success-700 dark:text-success-400 mb-2">
                  💰 Potential Savings
                </h3>
                <p className="text-gray-700 dark:text-gray-300 text-lg">
                  By choosing <span className="font-bold text-gray-900 dark:text-white">{comparisonResults[0].loan_name}</span> over 
                  the most expensive option, you could save{' '}
                  <span className="text-2xl font-bold text-success-600 dark:text-success-400">
                    {formatCurrency(Math.abs(comparisonResults[comparisonResults.length - 1].savings_vs_first))}
                  </span>
                  {' '}in total costs!
                </p>
              </div>
            )}
          </div>
        )}
      </div>
    </div>
  );
};

export default LoanComparison;
