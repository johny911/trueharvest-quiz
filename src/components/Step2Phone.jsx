import React, { useState } from 'react';

export default function Step2Phone({ formData, updateForm, nextStep, prevStep }) {
  const [phone, setPhone] = useState(formData.phone || '');
  const [error, setError] = useState('');

  const handleNext = () => {
    const isValid = /^\d{10}$/.test(phone);
    if (!isValid) {
      setError('Please enter a valid 10-digit phone number');
      return;
    }

    updateForm({ phone });
    nextStep();
  };

  return (
    <div className="min-h-screen flex flex-col justify-center items-center bg-white p-6">
      <div className="max-w-md w-full space-y-6">
        <h1 className="text-2xl font-bold text-gray-800 text-center">Your Phone Number</h1>
        <p className="text-center text-gray-600">We’ll only use this to help you with your oil recommendation or order.</p>

        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1">Phone Number</label>
          <input
            type="tel"
            value={phone}
            onChange={(e) => {
              setPhone(e.target.value);
              setError('');
            }}
            placeholder="Enter 10-digit mobile number"
            className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-green-500"
          />
          {error && <p className="text-red-500 text-sm mt-1">{error}</p>}
        </div>

        <div className="flex justify-between space-x-4">
          <button
            onClick={prevStep}
            className="w-1/2 bg-gray-200 text-gray-700 font-semibold py-2 px-4 rounded-lg hover:bg-gray-300"
          >
            Back
          </button>
          <button
            onClick={handleNext}
            className="w-1/2 bg-green-600 text-white font-semibold py-2 px-4 rounded-lg hover:bg-green-700"
          >
            Next
          </button>
        </div>
      </div>
    </div>
  );
}