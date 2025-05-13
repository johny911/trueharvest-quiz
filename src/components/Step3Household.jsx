import React, { useState } from 'react';

export default function Step3Household({ formData, updateForm, nextStep, prevStep }) {
  const [adults, setAdults] = useState(formData.adults || 1);
  const [kids, setKids] = useState(formData.kids || 0);

  const handleNext = () => {
    updateForm({ adults, kids });
    nextStep();
  };

  return (
    <div className="min-h-screen flex flex-col justify-center items-center bg-white p-6">
      <div className="max-w-md w-full space-y-6">
        <h1 className="text-2xl font-bold text-gray-800 text-center">Your Household</h1>
        <p className="text-center text-gray-600">Tell us about your family size to recommend the right oil quantity.</p>

        <div className="flex justify-between space-x-4">
          <div className="w-1/2">
            <label className="block text-sm font-medium text-gray-700 mb-1">Adults</label>
            <input
              type="number"
              min={1}
              value={adults}
              onChange={(e) => setAdults(Number(e.target.value))}
              className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-green-500"
            />
          </div>

          <div className="w-1/2">
            <label className="block text-sm font-medium text-gray-700 mb-1">Kids</label>
            <input
              type="number"
              min={0}
              value={kids}
              onChange={(e) => setKids(Number(e.target.value))}
              className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-green-500"
            />
          </div>
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