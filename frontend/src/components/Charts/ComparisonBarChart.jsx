import React from 'react';
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer, Cell } from 'recharts';
import { formatCurrency } from '../../utils/calculations';

const ComparisonBarChart = ({ comparisons, title = "Total Cost Comparison" }) => {
  // Add safety check for undefined or empty comparisons
  if (!comparisons || !Array.isArray(comparisons) || comparisons.length === 0) {
    return (
      <div className="w-full h-80 flex items-center justify-center">
        <p className="text-gray-500 dark:text-gray-400">No comparison data available</p>
      </div>
    );
  }

  const data = comparisons.map(loan => ({
    name: loan.loan_name?.length > 15 ? loan.loan_name.substring(0, 15) + '...' : loan.loan_name || 'Unnamed Loan',
    fullName: loan.loan_name || 'Unnamed Loan',
    totalCost: loan.total_cost || 0,
    totalInterest: loan.total_interest || 0,
    principal: (loan.total_cost || 0) - (loan.total_interest || 0),
    rank: loan.rank || 0,
  }));

  const COLORS = ['#22c55e', '#0ea5e9', '#f59e0b', '#ef4444', '#8b5cf6'];

  const CustomTooltip = ({ active, payload }) => {
    if (active && payload && payload.length) {
      const data = payload[0].payload;
      return (
        <div className="bg-white dark:bg-dark-card p-4 rounded-lg shadow-lg border border-gray-200 dark:border-gray-700">
          <p className="font-semibold text-gray-800 dark:text-white mb-2">{data.fullName}</p>
          <p className="text-gray-600 dark:text-gray-300">Total Cost: {formatCurrency(data.totalCost)}</p>
          <p className="text-warning-600 dark:text-warning-400">Interest: {formatCurrency(data.totalInterest)}</p>
          <p className="text-primary-600 dark:text-primary-400">Principal: {formatCurrency(data.principal)}</p>
          <p className="text-sm text-gray-500 dark:text-gray-400 mt-1">Rank: #{data.rank}</p>
        </div>
      );
    }
    return null;
  };

  return (
    <div className="w-full h-80">
      <h3 className="text-lg font-semibold text-gray-800 dark:text-white mb-4 text-center">{title}</h3>
      <ResponsiveContainer width="100%" height="100%">
        <BarChart
          data={data}
          margin={{ top: 5, right: 30, left: 20, bottom: 5 }}
        >
          <CartesianGrid strokeDasharray="3 3" stroke="#e5e7eb" className="dark:stroke-gray-700" />
          <XAxis
            dataKey="name"
            stroke="#6b7280"
            className="dark:stroke-gray-400"
            angle={-15}
            textAnchor="end"
            height={80}
          />
          <YAxis
            stroke="#6b7280"
            className="dark:stroke-gray-400"
            tickFormatter={(value) => `₹${(value / 100000).toFixed(1)}L`}
            label={{ value: 'Total Cost', angle: -90, position: 'insideLeft' }}
          />
          <Tooltip content={<CustomTooltip />} />
          <Legend
            verticalAlign="top"
            height={36}
            wrapperStyle={{ paddingBottom: '10px' }}
          />
          <Bar dataKey="totalCost" name="Total Cost" radius={[8, 8, 0, 0]}>
            {data.map((entry, index) => (
              <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
            ))}
          </Bar>
        </BarChart>
      </ResponsiveContainer>
    </div>
  );
};

export default ComparisonBarChart;
