import React, { useState } from 'react';

export default function Step3Household({ formData, updateForm, nextStep, prevStep }) {
  const [adults, setAdults] = useState(formData.adults || 1);
  const [kids, setKids] = useState(formData.kids || 0);

  const handleNext = () => {
    updateForm({ adults, kids });
    nextStep();
  };

  return (
    <div className="w-full">
      <div className="bg-white shadow-xl rounded-2xl p-6 space-y-6">
        <div className="text-center space-y-1">
          <h1 className="text-2xl font-semibold text-gray-800">Your Household</h1>
          <p className="text-sm text-gray-500">
            Tell us about your family size so we can recommend the right oil quantity.
          </p>
        </div>

        <div className="flex gap-4">
          <div className="w-1/2">
            <label className="block text-sm font-medium text-gray-700 mb-1">Adults</label>
            <input
              type="number"
              min={1}
              value={adults}
              onChange={(e) => setAdults(Number(e.target.value))}
              className="w-full px-4 py-3 rounded-xl border border-gray-300 text-sm outline-none focus:ring-2 focus:ring-green-500"
            />
          </div>

          <div className="w-1/2">
            <label className="block text-sm font-medium text-gray-700 mb-1">Kids</label>
            <input
              type="number"
              min={0}
              value={kids}
              onChange={(e) => setKids(Number(e.target.value))}
              className="w-full px-4 py-3 rounded-xl border border-gray-300 text-sm outline-none focus:ring-2 focus:ring-green-500"
            />
          </div>
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
      </div>
    </div>
  );
}