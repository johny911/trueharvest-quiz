import React, { useState } from 'react';
import { motion } from 'framer-motion';
import clsx from 'clsx';

export default function Step1Name({ formData, updateForm, nextStep, prevStep }) {
  const [name, setName] = useState(formData.name || '');
  const [error, setError] = useState(false);

  const handleNext = () => {
    if (!name.trim()) {
      setError(true);
      return;
    }
    updateForm({ name });
    nextStep();
  };

  return (
    <div className="w-full">
      <motion.div
        animate={error ? { x: [-4, 4, -4, 4, 0] } : {}}
        transition={{ duration: 0.3 }}
        className="relative bg-white shadow-xl rounded-2xl p-6 space-y-6"
      >
        {/* ← Back icon in top-left */}
        <button
          onClick={prevStep}
          className="absolute top-4 left-4 text-gray-500 hover:text-gray-800 text-xl"
        >
          ←
        </button>

        <div className="text-center space-y-1 mt-2">
          <h1 className="text-2xl font-semibold text-gray-800">First, what’s your name?</h1>
        </div>

        <div>
          <input
            type="text"
            value={name}
            onChange={(e) => {
              setName(e.target.value);
              setError(false);
            }}
            placeholder="Enter your name"
            className={clsx(
              'w-full px-4 py-3 text-[16px] rounded-xl border outline-none transition-all',
              error
                ? 'border-red-500 ring-1 ring-red-400'
                : 'border-gray-300 focus:ring-2 focus:ring-green-500'
            )}
          />
          {error && (
            <p className="text-sm text-red-500 mt-1">Please enter your name</p>
          )}
        </div>

        <div>
          <button
            onClick={handleNext}
            className="w-full bg-green-600 hover:bg-green-700 text-white font-semibold py-3 rounded-xl transition duration-200"
          >
            Next
          </button>
          <p className="text-xs text-gray-400 mt-2 text-left">
            We ask, so we can personalize your experience!
          </p>
        </div>
      </motion.div>
    </div>
  );
}