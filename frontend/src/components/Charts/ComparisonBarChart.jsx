import React from 'react';
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer, Cell } from 'recharts';
import { formatCurrency } from '../../utils/calculations';

const ComparisonBarChart = ({ comparisons, title = "Total Cost Comparison" }) => {
  const data = comparisons.map(loan => ({
    name: loan.loan_name.length > 15 ? loan.loan_name.substring(0, 15) + '...' : loan.loan_name,
    fullName: loan.loan_name,
    totalCost: loan.total_cost,
    totalInterest: loan.total_interest,
    principal: loan.total_cost - loan.total_interest,
    rank: loan.rank,
  }));

  const COLORS = ['#22c55e', '#0ea5e9', '#f59e0b', '#ef4444', '#8b5cf6'];

  const CustomTooltip = ({ active, payload }) => {
    if (active && payload && payload.length) {
      const data = payload[0].payload;
      return (
        <div className="bg-white p-4 rounded-lg shadow-lg border border-gray-200">
          <p className="font-semibold text-gray-800 mb-2">{data.fullName}</p>
          <p className="text-gray-600">Total Cost: {formatCurrency(data.totalCost)}</p>
          <p className="text-warning-600">Interest: {formatCurrency(data.totalInterest)}</p>
          <p className="text-primary-600">Principal: {formatCurrency(data.principal)}</p>
          <p className="text-sm text-gray-500 mt-1">Rank: #{data.rank}</p>
        </div>
      );
    }
    return null;
  };

  return (
    <div className="w-full h-80">
      <h3 className="text-lg font-semibold text-gray-800 mb-4 text-center">{title}</h3>
      <ResponsiveContainer width="100%" height="100%">
        <BarChart
          data={data}
          margin={{ top: 5, right: 30, left: 20, bottom: 5 }}
        >
          <CartesianGrid strokeDasharray="3 3" stroke="#e5e7eb" />
          <XAxis
            dataKey="name"
            stroke="#6b7280"
            angle={-15}
            textAnchor="end"
            height={80}
          />
          <YAxis
            stroke="#6b7280"
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
