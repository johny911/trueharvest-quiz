import React, { useEffect, useState } from 'react';
import { supabase } from '../supabaseClient';
import recommendOils from '../utils/recommendOils';

// Shopify Variant ID Map
const variantMap = {
  'Groundnut Oil': {
    '1L': '40442863222856',
    '500ml': '40442863255624',
  },
  'Coconut Oil': {
    '1L': '40442862862408',
    '500ml': '40442862895176',
  },
  'Sesame Oil': {
    '1L': '40454636568648',
    '500ml': '40454636601416',
  },
};

export default function Step6Recommendation({ formData, prevStep }) {
  const [recommendations, setRecommendations] = useState([]);
  const [loading, setLoading] = useState(true);
  const [submitted, setSubmitted] = useState(false);
  const [cartUrl, setCartUrl] = useState('');

  useEffect(() => {
    const recs = recommendOils(formData);
    setRecommendations(recs);
    generateCartUrl(recs);
    submitToSupabase(recs);
  }, []);

  const generateCartUrl = (recs) => {
    const base = 'https://trueharvest.store/cart/';
    const items = recs.map(({ name, quantity }) => {
      const variantId = quantity >= 1
        ? variantMap[name]['1L']
        : variantMap[name]['500ml'];
      const qty = Math.max(Math.round(quantity), 1);
      return `${variantId}:${qty}`;
    });
    const url = base + items.join(',');
    setCartUrl(url);
  };

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

    if (!error) setSubmitted(true);
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

            <a
              href={cartUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="block w-full mt-6 bg-green-600 hover:bg-green-700 text-white font-semibold py-3 rounded-lg transition duration-200"
            >
              Buy Now
            </a>

            {submitted && (
              <p className="text-sm text-gray-500 mt-3">Your response has been saved successfully.</p>
            )}

            <button
              onClick={prevStep}
              className="mt-4 text-sm text-gray-600 underline hover:text-gray-800"
            >
              Go Back
            </button>
          </>
        )}
      </div>
    </div>
  );
}