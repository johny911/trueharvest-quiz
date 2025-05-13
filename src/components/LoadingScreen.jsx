import React, { useEffect, useState } from 'react';

const messages = [
  'Analyzing your responses…',
  'Making it a combo…',
  'Making your switch easier…',
];

export default function LoadingScreen({ onComplete }) {
  const [currentStep, setCurrentStep] = useState(0);
  const [completedSteps, setCompletedSteps] = useState([]);

  useEffect(() => {
    const interval = setInterval(() => {
      setCompletedSteps((prev) => [...prev, currentStep]);

      if (currentStep < messages.length - 1) {
        setCurrentStep((prev) => prev + 1);
      } else {
        clearInterval(interval);
        setTimeout(onComplete, 1000);
      }
    }, 2300);

    return () => clearInterval(interval);
  }, [currentStep, onComplete]);

  return (
    <div className="bg-white shadow-xl rounded-2xl p-6 w-full text-center space-y-4">
      <h1 className="text-2xl font-semibold text-gray-800">Getting your recommendation ready…</h1>
      <div className="space-y-4 pt-4">
        {messages.map((msg, index) => (
          <div
            key={index}
            className="flex items-center justify-center gap-2 text-sm"
          >
            {completedSteps.includes(index) ? (
              <svg
                className="w-4 h-4 text-green-600"
                fill="none"
                stroke="currentColor"
                strokeWidth="3"
                viewBox="0 0 24 24"
              >
                <path strokeLinecap="round" strokeLinejoin="round" d="M5 13l4 4L19 7" />
              </svg>
            ) : index === currentStep ? (
              <div className="w-4 h-4 rounded-full border-2 border-gray-300 border-t-green-600 animate-spin" />
            ) : (
              <div className="w-4 h-4 rounded-full border-2 border-gray-200" />
            )}
            <span
              className={`${
                completedSteps.includes(index)
                  ? 'text-green-700 font-medium'
                  : index === currentStep
                  ? 'text-gray-800'
                  : 'text-gray-400'
              }`}
            >
              {msg}
            </span>
          </div>
        ))}
      </div>
    </div>
  );
}