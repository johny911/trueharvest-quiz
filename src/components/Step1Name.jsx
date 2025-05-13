import React, { useState } from 'react';

export default function Step1Name({ formData, updateForm, nextStep }) {
  const [name, setName] = useState(formData.name || '');
  const [error, setError] = useState('');

  const handleNext = () => {
    if (!name.trim()) {
      setError('Please enter your name');
      return;
    }
    updateForm({ name });
    nextStep();
  };

  return (
    <div className="min-h-screen flex flex-col justify-center items-center bg-white p-6">
      <div className="max-w-md w-full space-y-6">
        <h1 className="text-2xl font-bold text-gray-800 text-center">Welcome to True Harvest</h1>
        <p className="text-center text-gray-600">Let’s find the right oils for your family.</p>

        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1">What’s your name?</label>
          <input
            type="text"
            value={name}
            onChange={(e) => {
              setName(e.target.value);
              setError('');
            }}
            className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-green-500"
            placeholder="Enter your name"
          />
          {error && <p className="text-red-500 text-sm mt-1">{error}</p>}
        </div>

        <button
          onClick={handleNext}
          className="w-full bg-green-600 hover:bg-green-700 text-white font-semibold py-2 px-4 rounded-lg transition duration-200"
        >
          Next
        </button>
      </div>
    </div>
  );
}