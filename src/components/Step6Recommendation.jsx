import React, { useEffect, useState } from 'react';
import { supabase } from '../supabaseClient';
import recommendOils from '../utils/recommendOils';

// Shopify variant map: variant ID → { product handle, label }
const variantInfo = {
  '40442863222856': { handle: 'wood-pressed-groundnut-oil', label: 'Groundnut Oil 1L' },
  '40442863255624': { handle: 'wood-pressed-groundnut-oil', label: 'Groundnut Oil 500ml' },
  '40442862862408': { handle: 'wood-pressed-coconut-oil', label: 'Coconut Oil 1L' },
  '40442862895176': { handle: 'wood-pressed-coconut-oil', label: 'Coconut Oil 500ml' },
  '40454636568648': { handle: 'wood-pressed-sesame-oil', label: 'Sesame Oil 1L' },
  '40454636601416': { handle: 'wood-pressed-sesame-oil', label: 'Sesame Oil 500ml' },
};

export default function Step6Recommendation({ formData, prevStep }) {
  const [recommendations, setRecommendations] = useState([]);
  const [loading, setLoading] = useState(true);
  const [submitted, setSubmitted] = useState(false);
  const [cartUrl, setCartUrl] = useState('');
  const [summary, setSummary] = useState([]);
  const [totalPrice, setTotalPrice] = useState(0);

  useEffect(() => {
    const recs = recommendOils(formData);
    setRecommendations(recs);
    fetchPricesAndBuildSummary(recs);
    submitToSupabase(recs);
  }, []);

  const fetchPricesAndBuildSummary = async (recs) => {
    let total = 0;
    const items = await Promise.all(
      recs.map(async ({ name, quantity }) => {
        const variantId = quantity >= 1
          ? getVariantId(name, '1L')
          : getVariantId(name, '500ml');
        const handle = variantInfo[variantId].handle;

        const res = await fetch(`https://trueharvest.store/products/${handle}.js`);
        const data = await res.json();
        const variant = data.variants.find(v => v.id == variantId);

        const qty = Math.max(Math.round(quantity), 1);
        const price = parseFloat(variant.price) / 100; // 🛠 convert from paisa to ₹
        const lineTotal = qty * price;
        total += lineTotal;

        return {
          id: variantId,
          title: variantInfo[variantId].label,
          image: variant.featured_image.url,
          quantity: qty,
          price,
          lineTotal,
        };
      })
    );

    setSummary(items);
    setTotalPrice(total);
    const cartLink = buildCartUrl(items);
    setCartUrl(cartLink);
    setLoading(false);
  };

  const getVariantId = (name, volume) => {
    for (const [id, info] of Object.entries(variantInfo)) {
      if (info.label.startsWith(name) && info.label.includes(volume)) return id;
    }
    return null;
  };

  const buildCartUrl = (items) => {
    const base = 'https://trueharvest.store/cart/';
    const parts = items.map(item => `${item.id}:${item.quantity}`);
    return base + parts.join(',');
  };

  const submitToSupabase = async (recommendedOils) => {
    await supabase.from('quiz_responses').insert({
      name: formData.name,
      phone: formData.phone,
      adults: formData.adults,
      kids: formData.kids,
      uses_cold_pressed: formData.usesColdPressed,
      current_oils: formData.currentOils,
      recommended_oils: recommendedOils.map((r) => `${r.name} - ${r.quantity}L`)
    });
    setSubmitted(true);
  };

  return (
    <div className="min-h-screen flex flex-col justify-center items-center bg-white p-6">
      <div className="max-w-md w-full space-y-6">
        {loading ? (
          <p className="text-center text-gray-600">Calculating your recommendation...</p>
        ) : (
          <>
            <h1 className="text-2xl font-bold text-gray-800 text-center">Hey {formData.name} 👋</h1>
            <p className="text-center text-gray-600">Here’s what we recommend for your family:</p>

            <div className="space-y-4">
              {summary.map((item, index) => (
                <div key={index} className="flex items-center border p-2 rounded-lg shadow-sm">
                  <img src={item.image} alt={item.title} className="w-16 h-16 object-cover rounded mr-4" />
                  <div className="flex-1">
                    <p className="font-semibold">{item.title}</p>
                    <p className="text-sm text-gray-600">₹{item.price.toFixed(2)} × {item.quantity}</p>
                  </div>
                  <p className="font-bold text-right">₹{item.lineTotal.toFixed(2)}</p>
                </div>
              ))}
              <div className="flex justify-between pt-2 border-t text-lg font-semibold">
                <span>Total</span>
                <span>₹{totalPrice.toFixed(2)}</span>
              </div>
            </div>

            <a
              href={cartUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="block w-full bg-green-600 hover:bg-green-700 text-white font-semibold py-3 rounded-lg transition duration-200 text-center"
            >
              Buy Now
            </a>

            {submitted && (
              <p className="text-center text-sm text-gray-500 mt-3">Your recommendation has been saved.</p>
            )}

            <button
              onClick={prevStep}
              className="text-sm text-gray-600 underline hover:text-gray-800 mt-3 block mx-auto"
            >
              Go Back
            </button>
          </>
        )}
      </div>
    </div>
  );
}