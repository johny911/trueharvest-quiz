import React from 'react';

export default function ProgressBar({ step, totalSteps = 6 }) {
  const percentage = Math.round((step / totalSteps) * 100);

  return (
    <div className="w-full mb-4">
      <div className="w-full bg-gray-200 rounded-full h-2 overflow-hidden">
        <div
          className="bg-green-500 h-2 transition-all duration-300"
          style={{ width: `${percentage}%` }}
        ></div>
      </div>
      <p className="text-xs text-gray-500 text-right mt-1">{percentage}% completed</p>
    </div>
  );
}