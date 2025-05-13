import React, { useEffect, useState } from 'react';
import { supabase } from '../supabaseClient';
import recommendOils from '../utils/recommendOils';

export default function Step6Recommendation({ formData, prevStep }) {
  const [recommendations, setRecommendations] = useState([]);
  const [loading, setLoading] = useState(true);
  const [submitted, setSubmitted] = useState(false);

  useEffect(() => {
    const recs = recommendOils(formData);
    setRecommendations(recs);
    submitToSupabase(recs);
  }, []);

  const submitToSupabase = async (recommendedOils) => {
    const { error } = await supabase.from('quiz_responses').insert({
      name: formData.name,
      phone: formData.phone,
      adults: formData.adults,
      kids: formData.kids,
      uses_cold_pressed: formData.usesColdPressed,
      current_oils: formData.currentOils,
      recommended_oils: recommendedOils.map((r) => `${r.name} - ${r.quantity}L`)
    });

    if (!error) {
      setSubmitted(true);
    }
    setLoading(false);
  };

  return (
    <div className="min-h-screen flex flex-col justify-center items-center bg-white p-6">
      <div className="max-w-md w-full space-y-6 text-center">
        {loading ? (
          <p className="text-gray-600">Calculating your recommendation...</p>
        ) : (
          <>
            <h1 className="text-2xl font-bold text-gray-800">Hey {formData.name} 👋</h1>
            <p className="text-gray-600">Based on your answers, we recommend:</p>

            <ul className="mt-4 space-y-2 text-left">
              {recommendations.map((item, index) => (
                <li key={index} className="text-green-700 font-semibold">
                  ✅ {item.name}: {item.quantity}L per month
                </li>
              ))}
            </ul>

            {submitted && (
              <p className="text-sm text-gray-500 mt-2">Your response has been saved.</p>
            )}

            <div className="mt-6">
              <button
                onClick={prevStep}
                className="text-sm text-gray-600 underline hover:text-gray-800"
              >
                Go Back
              </button>
            </div>
          </>
        )}
      </div>
    </div>
  );
}