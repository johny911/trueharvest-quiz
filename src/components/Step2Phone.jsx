// src/components/Step2Phone.jsx
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
      {/* Clean black ← arrow */}
      <div className="mb-2">
        <span
          onClick={prevStep}
          className="text-2xl text-black font-semibold cursor-pointer select-none"
        >
          ←
        </span>
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
            maxLength={10}
            onChange={(e) => {
              // strip non-digits and limit to 10 chars
              const digits = e.target.value.replace(/\D/g, '').slice(0, 10);
              setPhone(digits);
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
            <p className="text-sm text-red-500 mt-1">
              Please enter a valid 10-digit phone number
            </p>
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