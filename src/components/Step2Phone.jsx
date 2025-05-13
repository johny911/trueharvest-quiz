import React, { useState } from 'react';
import { motion } from 'framer-motion';
import clsx from 'clsx';

export default function Step2Phone({ formData, updateForm, nextStep, prevStep }) {
  const [phone, setPhone] = useState(formData.phone || '');
  const [error, setError] = useState(false);

  const handleNext = () => {
    const isValid = /^\d{10}$/.test(phone);
    if (!isValid) {
      setError(true);
      return;
    }

    updateForm({ phone });
    nextStep();
  };

  return (
    <div className="w-full">
      {/* SVG Back Arrow */}
      <div className="mb-2">
        <button
          onClick={prevStep}
          className="cursor-pointer text-black hover:text-gray-700"
          aria-label="Go Back"
        >
          <svg
            xmlns="http://www.w3.org/2000/svg"
            className="h-6 w-6"
            fill="none"
            viewBox="0 0 24 24"
            stroke="currentColor"
            strokeWidth={2}
          >
            <path strokeLinecap="round" strokeLinejoin="round" d="M15 19l-7-7 7-7" />
          </svg>
        </button>
      </div>

      <motion.div
        animate={error ? { x: [-4, 4, -4, 4, 0] } : {}}
        transition={{ duration: 0.3 }}
        className="bg-white shadow-xl rounded-2xl p-6 space-y-6"
      >
        <div className="text-center space-y-1">
          <h1 className="text-2xl font-semibold text-gray-800">
            Thanks, {formData.name || 'there'}!<br />Could you share your phone number?
          </h1>
          <p className="text-sm text-gray-500">
            We’ll only use this to help you with your oil recommendation or order.
          </p>
        </div>

        <div>
          <input
            type="tel"
            value={phone}
            onChange={(e) => {
              setPhone(e.target.value);
              setError(false);
            }}
            placeholder="Enter 10-digit mobile number"
            className={clsx(
              'w-full px-4 py-3 text-[16px] rounded-xl border outline-none transition-all',
              error
                ? 'border-red-500 ring-1 ring-red-400'
                : 'border-gray-300 focus:ring-2 focus:ring-green-500'
            )}
          />
          {error && (
            <p className="text-sm text-red-500 mt-1">Please enter a valid 10-digit phone number</p>
          )}
        </div>

        <div className="pt-2">
          <button
            onClick={handleNext}
            className="w-full bg-green-600 hover:bg-green-700 text-white font-semibold py-3 rounded-xl transition"
          >
            Next
          </button>
          <p className="text-xs text-gray-400 text-left mt-2">We won’t spam you.</p>
        </div>
      </motion.div>
    </div>
  );
}