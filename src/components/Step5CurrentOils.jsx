import React, { useState } from 'react';

const oilOptions = [
  'Refined Sunflower Oil',
  'Refined Groundnut Oil',
  'Palm Oil',
  'Olive Oil',
  'Cold-Pressed Oil',
  "I don't know"
];

export default function Step5CurrentOils({ formData, updateForm, nextStep, prevStep }) {
  const [selected, setSelected] = useState(formData.currentOils || []);
  const [error, setError] = useState('');

  const handleToggle = (oil) => {
    if (selected.includes(oil)) {
      setSelected(selected.filter((o) => o !== oil));
    } else {
      setSelected([...selected, oil]);
    }
    setError('');
  };

  const handleNext = () => {
    if (selected.length === 0) {
      setError('Please select at least one oil');
      return;
    }
    updateForm({ currentOils: selected });
    nextStep();
  };

  return (
    <div className="min-h-screen flex flex-col justify-center items-center bg-white p-6">
      <div className="max-w-md w-full space-y-6">
        <h1 className="text-2xl font-bold text-gray-800 text-center">What oils do you use now?</h1>
        <p className="text-center text-gray-600">Choose all that apply</p>

        <div className="space-y-3">
          {oilOptions.map((oil) => (
            <label key={oil} className="block">
              <input
                type="checkbox"
                checked={selected.includes(oil)}
                onChange={() => handleToggle(oil)}
                className="mr-2"
              />
              {oil}
            </label>
          ))}
          {error && <p className="text-red-500 text-sm mt-2">{error}</p>}
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
            Get Recommendation
          </button>
        </div>
      </div>
    </div>
  );
}