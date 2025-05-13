import React from 'react';

export default function Step4ColdPressed({ formData, updateForm, nextStep, prevStep }) {
  const handleSelect = (value) => {
    updateForm({ usesColdPressed: value });
    nextStep();
  };

  return (
    <div className="w-full">
      {/* Minimal black ← arrow */}
      <div className="mb-2">
        <span
          onClick={prevStep}
          className="text-2xl text-black font-semibold cursor-pointer select-none"
        >
          ←
        </span>
      </div>

      <div className="bg-white shadow-xl rounded-2xl p-6 space-y-6 text-center">
        <h1 className="text-2xl font-semibold text-gray-800">Cold-Pressed Oils?</h1>
        <p className="text-sm text-gray-500">
          Are you currently using cold-pressed oils in your household?
        </p>

        <div className="flex flex-col gap-4">
          <button
            onClick={() => handleSelect(true)}
            className="w-full bg-green-600 hover:bg-green-700 text-white font-semibold py-3 rounded-xl transition"
          >
            Yes, we use cold-pressed oils
          </button>

          <button
            onClick={() => handleSelect(false)}
            className="w-full bg-gray-100 hover:bg-gray-200 text-gray-800 font-semibold py-3 rounded-xl transition"
          >
            No, we don't use them yet
          </button>
        </div>
      </div>
    </div>
  );
}