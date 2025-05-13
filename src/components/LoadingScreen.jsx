import React, { useEffect, useState } from 'react';

const messages = [
  'Analyzing your responses…',
  'Making it a combo…',
  'Making your switch easier…',
];

export default function LoadingScreen({ onComplete }) {
  const [currentStep, setCurrentStep] = useState(0);

  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentStep((prev) => {
        if (prev < messages.length - 1) return prev + 1;
        clearInterval(interval);
        setTimeout(onComplete, 1000); // final pause before moving on
        return prev;
      });
    }, 1500);
    return () => clearInterval(interval);
  }, [onComplete]);

  return (
    <div className="bg-white shadow-xl rounded-2xl p-6 w-full text-center space-y-4">
      <h1 className="text-2xl font-semibold text-gray-800">Getting your recommendation ready…</h1>
      <div className="space-y-3 pt-4">
        {messages.map((msg, index) => (
          <div key={index} className="flex items-center justify-center gap-2">
            <div className="w-3 h-3 rounded-full border-2 border-gray-300 border-t-green-600 animate-spin"></div>
            <span
              className={`text-sm ${
                index === currentStep ? 'text-gray-800 font-medium' : 'text-gray-400'
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