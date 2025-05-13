import React from 'react';

export default function Step4ColdPressed({ formData, updateForm, nextStep, prevStep }) {
  const handleSelect = (value) => {
    updateForm({ usesColdPressed: value });
    nextStep();
  };

  return (
    <div className="min-h-screen flex flex-col justify-center items-center bg-white p-6">
      <div className="max-w-md w-full space-y-6 text-center">
        <h1 className="text-2xl font-bold text-gray-800">Cold-Pressed Oils?</h1>
        <p className="text-gray-600">Are you currently using cold-pressed oils in your household?</p>

        <div className="flex flex-col space-y-4">
          <button
            onClick={() => handleSelect(true)}
            className="w-full bg-green-600 text-white py-2 rounded-lg hover:bg-green-700 transition"
          >
            Yes, we use cold-pressed oils
          </button>
          <button
            onClick={() => handleSelect(false)}
            className="w-full bg-gray-200 text-gray-800 py-2 rounded-lg hover:bg-gray-300 transition"
          >
            No, we don't use them yet
          </button>
        </div>

        <button
          onClick={prevStep}
          className="mt-4 text-sm text-gray-600 underline hover:text-gray-800"
        >
          Back
        </button>
      </div>
    </div>
  );
}