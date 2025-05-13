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
      <motion.div
        animate={error ? { x: [-4, 4, -4, 4, 0] } : {}}
        transition={{ duration: 0.3 }}
        className="bg-white shadow-xl rounded-2xl p-6 space-y-6"
      >
        <div className="text-center space-y-1">
          <h1 className="text-2xl font-semibold text-gray-800">Your Phone Number</h1>
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
              'w-full px-4 py-3 rounded-xl border text-sm outline-none transition-all',
              error
                ? 'border-red-500 ring-1 ring-red-400'
                : 'border-gray-300 focus:ring-2 focus:ring-green-500'
            )}
          />
          {error && (
            <p className="text-sm text-red-500 mt-1">Please enter a valid 10-digit phone number</p>
          )}
        </div>

        <div className="flex justify-between gap-4">
          <button
            onClick={prevStep}
            className="w-1/2 bg-gray-100 hover:bg-gray-200 text-gray-700 font-semibold py-3 rounded-xl transition"
          >
            Back
          </button>
          <button
            onClick={handleNext}
            className="w-1/2 bg-green-600 hover:bg-green-700 text-white font-semibold py-3 rounded-xl transition"
          >
            Next
          </button>
        </div>
      </motion.div>
    </div>
  );
}