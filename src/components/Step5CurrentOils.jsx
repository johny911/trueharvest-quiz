import React, { useState, useMemo } from 'react';
import clsx from 'clsx';
import { motion } from 'framer-motion';
import LoadingScreen from './LoadingScreen';

export default function Step5CurrentOils({ formData, updateForm, nextStep, prevStep }) {
  const [selected, setSelected] = useState(formData.currentOils || []);
  const [error, setError] = useState(false);
  const [isLoading, setIsLoading] = useState(false);

  const oilOptions = useMemo(() => {
    return formData.usesColdPressed
      ? [
          'Cold-Pressed Sesame Oil',
          'Cold-Pressed Groundnut Oil',
          'Cold-Pressed Mustard Oil',
          'Cold-Pressed Coconut Oil',
          'Cold-Pressed Sunflower Oil',
        ]
      : [
          'Refined Sunflower Oil',
          'Refined Groundnut Oil',
          'Refined Sesame Oil',
          'Palm Oil',
          'Refined Coconut Oil',
        ];
  }, [formData.usesColdPressed]);

  const handleToggle = (oil) => {
    if (selected.includes(oil)) {
      setSelected(selected.filter((o) => o !== oil));
    } else {
      setSelected([...selected, oil]);
    }
    setError(false);
  };

  const handleNext = () => {
    if (selected.length === 0) {
      setError(true);
      return;
    }
    updateForm({ currentOils: selected });
    setIsLoading(true);
  };

  const subtext = formData.usesColdPressed
    ? 'There’s cold-pressed. And then there’s truly cold-pressed.'
    : 'It’s not cooking oil. It’s a chemistry experiment.';

  return (
    <div className="w-full">
      {isLoading ? (
        <LoadingScreen onComplete={nextStep} />
      ) : (
        <>
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
              <h1 className="text-2xl font-semibold text-gray-800">What oils do you use now?</h1>
              <p className="text-sm text-gray-500">Choose all that apply</p>
            </div>

            <div className="flex flex-wrap gap-2">
              {oilOptions.map((oil) => (
                <button
                  key={oil}
                  onClick={() => handleToggle(oil)}
                  type="button"
                  className={clsx(
                    'px-4 py-2 rounded-full text-sm border transition',
                    selected.includes(oil)
                      ? 'bg-green-600 text-white border-green-600'
                      : 'bg-gray-100 text-gray-800 border-gray-300 hover:bg-gray-200'
                  )}
                >
                  {oil}
                </button>
              ))}
            </div>

            {error && (
              <p className="text-sm text-red-500 mt-2 text-center">
                Please select at least one option.
              </p>
            )}

            <div className="pt-4">
              <button
                onClick={handleNext}
                className="w-full bg-green-600 hover:bg-green-700 text-white font-semibold py-3 rounded-xl transition"
              >
                Get Recommendation
              </button>
              <p className="text-xs text-gray-400 text-center mt-2">{subtext}</p>
            </div>
          </motion.div>
        </>
      )}
    </div>
  );
}