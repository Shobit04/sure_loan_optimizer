import React, { useState } from 'react';
import { Zap, ArrowDown, ArrowRight } from 'lucide-react';
import { calculatePrepayment } from '../services/api';
import { formatCurrency, formatTenure } from '../utils/calculations';

const PrepaymentCalculator = () => {
  const [loanData, setLoanData] = useState({
    principal: 1000000,
    interest_rate: 10,
    tenure_months: 60
  });

  const [prepaymentData, setPrepaymentData] = useState({
    prepayment_amount: 100000,
    prepayment_month: 12,
    reduce_emi: false
  });

  const [result, setResult] = useState(null);
  const [loading, setLoading] = useState(false);

  const handleCalculate = async () => {
    try {
      setLoading(true);
      const response = await calculatePrepayment({
        ...loanData,
        ...prepaymentData
      });
      setResult(response);
    } catch (error) {
      console.error('Error calculating prepayment:', error);
      alert('Error calculating prepayment impact. Please check your inputs.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-50 to-blue-50 dark:from-dark-bg dark:to-slate-900 py-8 animate-fade-in">
      <div className="container mx-auto px-4">
        {/* Header */}
        <div className="text-center mb-8">
          <h1 className="text-4xl font-bold text-gray-900 dark:text-white mb-2 flex items-center justify-center gap-3">
            <div className="w-12 h-12 bg-gradient-to-br from-warning-500 to-orange-500 rounded-2xl flex items-center justify-center shadow-lg">
              <Zap className="w-6 h-6 text-white" />
            </div>
            <span className="bg-gradient-to-r from-warning-600 to-orange-600 bg-clip-text text-transparent">Prepayment</span> Impact Calculator
          </h1>
          <p className="text-gray-600 dark:text-gray-300">
            See how prepayments can reduce your loan burden
          </p>
        </div>

        {/* Input Section */}
        <div className="grid lg:grid-cols-2 gap-8 mb-8">
          {/* Current Loan Details */}
          <div className="bg-white dark:bg-dark-card rounded-xl shadow-lg p-8 border border-transparent dark:border-gray-700">
            <h2 className="text-2xl font-bold text-gray-900 dark:text-white mb-6">Current Loan Details</h2>
            
            <div className="space-y-4">
              <div>
                <label className="block text-sm font-semibold text-gray-700 dark:text-gray-300 mb-2">
                  Principal Amount (₹)
                </label>
                <input
                  type="number"
                  value={loanData.principal}
                  onChange={(e) => setLoanData({ ...loanData, principal: Number(e.target.value) })}
                  className="w-full px-4 py-3 border border-gray-300 dark:border-gray-600 rounded-lg focus:ring-2 focus:ring-primary-500 focus:border-transparent bg-white dark:bg-slate-800 text-gray-900 dark:text-white"
                />
              </div>

              <div>
                <label className="block text-sm font-semibold text-gray-700 dark:text-gray-300 mb-2">
                  Interest Rate (% p.a.)
                </label>
                <input
                  type="number"
                  step="0.1"
                  value={loanData.interest_rate}
                  onChange={(e) => setLoanData({ ...loanData, interest_rate: Number(e.target.value) })}
                  className="w-full px-4 py-3 border border-gray-300 dark:border-gray-600 rounded-lg focus:ring-2 focus:ring-primary-500 focus:border-transparent bg-white dark:bg-slate-800 text-gray-900 dark:text-white"
                />
              </div>

              <div>
                <label className="block text-sm font-semibold text-gray-700 dark:text-gray-300 mb-2">
                  Loan Tenure (months)
                </label>
                <input
                  type="number"
                  value={loanData.tenure_months}
                  onChange={(e) => setLoanData({ ...loanData, tenure_months: Number(e.target.value) })}
                  className="w-full px-4 py-3 border border-gray-300 dark:border-gray-600 rounded-lg focus:ring-2 focus:ring-primary-500 focus:border-transparent bg-white dark:bg-slate-800 text-gray-900 dark:text-white"
                />
              </div>
            </div>
          </div>

          {/* Prepayment Details */}
          <div className="bg-white dark:bg-dark-card rounded-xl shadow-lg p-8 border border-transparent dark:border-gray-700">
            <h2 className="text-2xl font-bold text-gray-900 dark:text-white mb-6">Prepayment Details</h2>
            
            <div className="space-y-4">
              <div>
                <label className="block text-sm font-semibold text-gray-700 dark:text-gray-300 mb-2">
                  Prepayment Amount (₹)
                </label>
                <input
                  type="number"
                  value={prepaymentData.prepayment_amount}
                  onChange={(e) => setPrepaymentData({ ...prepaymentData, prepayment_amount: Number(e.target.value) })}
                  className="w-full px-4 py-3 border border-gray-300 dark:border-gray-600 rounded-lg focus:ring-2 focus:ring-primary-500 focus:border-transparent bg-white dark:bg-slate-800 text-gray-900 dark:text-white"
                />
              </div>

              <div>
                <label className="block text-sm font-semibold text-gray-700 dark:text-gray-300 mb-2">
                  Prepayment Month
                </label>
                <input
                  type="number"
                  value={prepaymentData.prepayment_month}
                  onChange={(e) => setPrepaymentData({ ...prepaymentData, prepayment_month: Number(e.target.value) })}
                  min="1"
                  max={loanData.tenure_months - 1}
                  className="w-full px-4 py-3 border border-gray-300 dark:border-gray-600 rounded-lg focus:ring-2 focus:ring-primary-500 focus:border-transparent bg-white dark:bg-slate-800 text-gray-900 dark:text-white"
                />
              </div>

              <div className="bg-gray-50 dark:bg-slate-800 rounded-lg p-4">
                <label className="flex items-center gap-3 cursor-pointer">
                  <input
                    type="checkbox"
                    checked={prepaymentData.reduce_emi}
                    onChange={(e) => setPrepaymentData({ ...prepaymentData, reduce_emi: e.target.checked })}
                    className="w-5 h-5 text-primary-600 rounded focus:ring-primary-500"
                  />
                  <div>
                    <div className="font-semibold text-gray-900 dark:text-white">Reduce EMI</div>
                    <div className="text-sm text-gray-600 dark:text-gray-400">
                      {prepaymentData.reduce_emi 
                        ? 'Keep tenure same, lower monthly payment' 
                        : 'Keep EMI same, reduce loan tenure'}
                    </div>
                  </div>
                </label>
              </div>

              <button
                onClick={handleCalculate}
                disabled={loading}
                className="w-full bg-gradient-to-r from-primary-600 to-purple-600 text-white py-3 rounded-lg font-semibold hover:from-primary-700 hover:to-purple-700 hover:shadow-xl transition-all disabled:opacity-50 disabled:cursor-not-allowed"
              >
                {loading ? 'Calculating...' : 'Calculate Impact'}
              </button>
            </div>
          </div>
        </div>

        {/* Results */}
        {result && (
          <div className="animate-fade-in space-y-6">
            {/* Before vs After Comparison */}
            <div className="grid md:grid-cols-2 gap-6">
              {/* Before */}
              <div className="bg-white dark:bg-dark-card rounded-xl shadow-lg p-8 border-l-4 border-gray-400 dark:border-gray-600">
                <h3 className="text-xl font-bold text-gray-900 dark:text-white mb-4 flex items-center gap-2">
                  Before Prepayment
                </h3>
                <div className="space-y-3">
                  <div>
                    <div className="text-sm text-gray-600 dark:text-gray-400">Monthly EMI</div>
                    <div className="text-2xl font-bold text-gray-900 dark:text-white">
                      {formatCurrency(result.original_emi)}
                    </div>
                  </div>
                  <div>
                    <div className="text-sm text-gray-600 dark:text-gray-400">Total Interest</div>
                    <div className="text-xl font-semibold text-gray-700 dark:text-gray-300">
                      {formatCurrency(result.original_total_interest)}
                    </div>
                  </div>
                  <div>
                    <div className="text-sm text-gray-600 dark:text-gray-400">Loan Tenure</div>
                    <div className="text-xl font-semibold text-gray-700 dark:text-gray-300">
                      {formatTenure(result.original_tenure)}
                    </div>
                  </div>
                </div>
              </div>

              {/* After */}
              <div className="bg-white dark:bg-dark-card rounded-xl shadow-lg p-8 border-l-4 border-success-600 dark:border-success-500">
                <h3 className="text-xl font-bold text-success-700 dark:text-success-400 mb-4 flex items-center gap-2">
                  After Prepayment
                  <ArrowRight className="w-5 h-5" />
                </h3>
                <div className="space-y-3">
                  <div>
                    <div className="text-sm text-gray-600 dark:text-gray-400">Monthly EMI</div>
                    <div className="text-2xl font-bold text-success-600 dark:text-success-400">
                      {formatCurrency(result.new_emi)}
                      {result.new_emi < result.original_emi && (
                        <span className="text-sm ml-2">
                          <ArrowDown className="w-4 h-4 inline" />
                          {formatCurrency(result.original_emi - result.new_emi)}
                        </span>
                      )}
                    </div>
                  </div>
                  <div>
                    <div className="text-sm text-gray-600 dark:text-gray-400">Total Interest</div>
                    <div className="text-xl font-semibold text-success-600 dark:text-success-400">
                      {formatCurrency(result.new_total_interest)}
                    </div>
                  </div>
                  <div>
                    <div className="text-sm text-gray-600 dark:text-gray-400">Loan Tenure</div>
                    <div className="text-xl font-semibold text-success-600 dark:text-success-400">
                      {formatTenure(result.new_tenure)}
                    </div>
                  </div>
                </div>
              </div>
            </div>

            {/* Savings Highlight */}
            <div className="grid md:grid-cols-3 gap-6">
              <div className="bg-gradient-to-br from-success-500 to-success-600 rounded-xl shadow-lg p-6 text-white">
                <div className="text-sm opacity-90 mb-1">Interest Saved</div>
                <div className="text-3xl font-bold">
                  {formatCurrency(result.interest_saved)}
                </div>
              </div>

              <div className="bg-gradient-to-br from-primary-500 to-primary-600 rounded-xl shadow-lg p-6 text-white">
                <div className="text-sm opacity-90 mb-1">Months Saved</div>
                <div className="text-3xl font-bold">
                  {result.months_saved} months
                </div>
              </div>

              <div className="bg-gradient-to-br from-warning-500 to-warning-600 rounded-xl shadow-lg p-6 text-white">
                <div className="text-sm opacity-90 mb-1">Break-Even Period</div>
                <div className="text-3xl font-bold">
                  {result.break_even_months} months
                </div>
              </div>
            </div>

            {/* ROI Message */}
            <div className="bg-gradient-to-r from-success-50 to-emerald-50 dark:from-success-900/20 dark:to-emerald-900/20 rounded-xl shadow-lg p-6 border-l-4 border-success-600 dark:border-success-500">
              <h3 className="text-xl font-bold text-success-700 dark:text-success-400 mb-2">
                🎉 Smart Financial Move!
              </h3>
              <p className="text-gray-700 dark:text-gray-300 text-lg leading-relaxed">
                By prepaying {formatCurrency(prepaymentData.prepayment_amount)} in month {prepaymentData.prepayment_month}, 
                you'll save <span className="font-bold text-success-600 dark:text-success-400">{formatCurrency(result.interest_saved)}</span> in interest charges.
                {result.months_saved > 0 && (
                  <span> You'll also be debt-free {result.months_saved} months earlier!</span>
                )}
                {' '}Your prepayment will pay for itself in just <span className="font-bold">{result.break_even_months} months</span>.
              </p>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default PrepaymentCalculator;
