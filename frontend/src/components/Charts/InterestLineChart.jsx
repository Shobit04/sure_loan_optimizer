import React from 'react';
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer } from 'recharts';
import { formatCurrency } from '../../utils/calculations';

const InterestLineChart = ({ schedule, title = "Interest vs Principal Over Time" }) => {
  // Sample data points (show every 12th month for readability)
  const sampledData = schedule.filter((item, index) => index % 12 === 0 || index === schedule.length - 1);

  const CustomTooltip = ({ active, payload, label }) => {
    if (active && payload && payload.length) {
      return (
        <div className="bg-white p-4 rounded-lg shadow-lg border border-gray-200">
          <p className="font-semibold text-gray-800">Month {label}</p>
          <p className="text-primary-600">Principal: {formatCurrency(payload[0].value)}</p>
          <p className="text-warning-600">Interest: {formatCurrency(payload[1].value)}</p>
          <p className="text-gray-600 text-sm mt-1">
            Balance: {formatCurrency(payload[0].payload.remaining_balance)}
          </p>
        </div>
      );
    }
    return null;
  };

  return (
    <div className="w-full h-80">
      <h3 className="text-lg font-semibold text-gray-800 mb-4 text-center">{title}</h3>
      <ResponsiveContainer width="100%" height="100%">
        <LineChart
          data={sampledData}
          margin={{ top: 5, right: 30, left: 20, bottom: 5 }}
        >
          <CartesianGrid strokeDasharray="3 3" stroke="#e5e7eb" />
          <XAxis
            dataKey="month"
            stroke="#6b7280"
            label={{ value: 'Months', position: 'insideBottom', offset: -5 }}
          />
          <YAxis
            stroke="#6b7280"
            tickFormatter={(value) => `₹${(value / 1000).toFixed(0)}K`}
            label={{ value: 'Amount', angle: -90, position: 'insideLeft' }}
          />
          <Tooltip content={<CustomTooltip />} />
          <Legend
            verticalAlign="top"
            height={36}
            wrapperStyle={{ paddingBottom: '10px' }}
          />
          <Line
            type="monotone"
            dataKey="principal_payment"
            stroke="#0ea5e9"
            strokeWidth={2}
            name="Principal Payment"
            dot={false}
          />
          <Line
            type="monotone"
            dataKey="interest_payment"
            stroke="#f59e0b"
            strokeWidth={2}
            name="Interest Payment"
            dot={false}
          />
        </LineChart>
      </ResponsiveContainer>
    </div>
  );
};

export default InterestLineChart;
