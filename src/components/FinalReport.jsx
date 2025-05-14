import React, { useState, useEffect } from 'react';
import { supabase } from '../supabaseClient';

export default function FinalReport({ formData, summary: initialSummary, totalPrice: initialTotalPrice }) {
  const [activeTab, setActiveTab] = useState('inflammation');
  const [summary, setSummary] = useState(initialSummary);
  const [totalPrice, setTotalPrice] = useState(initialTotalPrice);

  const warnings = {
    inflammation: {
      image: '/images/inflammation.png',
      title: 'Inflammation',
      description: 'Refined oils are high in omega-6 fatty acids which can trigger chronic inflammation in the body.'
    },
    heart: {
      image: '/images/heart.png',
      title: 'Heart Disease',
      description: 'Chemically extracted oils may damage blood vessels and raise bad cholesterol.'
    },
    insulin: {
      image: '/images/insulin.png',
      title: 'Insulin Resistance & Diabetes',
      description: 'Refined oils impair insulin sensitivity and increase the risk of developing diabetes.'
    }
  };

  const buildFastrrUrl = (items) => {
    const base = 'https://trueharvest.store/';
    const productParam = items.map((item) => `${item.id}:${item.quantity}`).join(',');
    return `${base}?isFastrrProduct=true&fastrr_link_type=CHECKOUT_LINK&seller-domain=trueharvest.store&products=${encodeURIComponent(productParam)}`;
  };

  const updateQuantity = async (index, delta) => {
    const newSummary = [...summary];
    newSummary[index].quantity += delta;
    if (newSummary[index].quantity < 1) newSummary.splice(index, 1);

    const newTotal = newSummary.reduce((acc, item) => acc + item.quantity * item.price, 0);
    setSummary(newSummary);
    setTotalPrice(newTotal);

    await supabase
      .from('quiz_responses')
      .update({
        recommended_oils: newSummary.map(item => `${item.title} - ${item.quantity}L`)
      })
      .eq('phone', formData.phone);
  };

  const getBadgeText = (title) => {
    const lower = title.toLowerCase();
    if (lower.includes('sesame')) return 'Molasses Free';
    if (lower.includes('coconut')) return 'Sulfur Free Copra';
    if (lower.includes('groundnut')) return 'Heirloom Groundnut';
    return 'GMO Free';
  };

  const fastrrUrl = buildFastrrUrl(summary);

  return (
    <div className="min-h-screen bg-gray-50 flex items-center justify-center px-4 py-8">
      <div className="w-full max-w-2xl space-y-6 bg-white rounded-2xl shadow-xl p-6">
        <div className="space-y-1 text-center">
          <h1 className="text-2xl font-bold text-gray-800">Hi {formData?.name},</h1>
          <p className="text-sm text-gray-600">Based on your answers, here’s your personalized oil recommendation.</p>
        </div>

        {/* Warnings */}
        <div className="bg-red-50 border border-red-200 rounded-xl p-4">
          <h2 className="text-base font-semibold text-red-700 mb-3">The refined oil you’re using could be causing:</h2>
          <div className="flex justify-between gap-2 mb-3">
            {Object.keys(warnings).map((key) => (
              <button
                key={key}
                onClick={() => setActiveTab(key)}
                className={`w-1/3 rounded-xl p-2 border transition flex flex-col items-center ${
                  activeTab === key ? 'bg-red-100 border-red-300' : 'bg-white border-gray-200 hover:border-red-400'
                }`}
              >
                <img src={warnings[key].image} alt={key} className="h-16 mb-2 object-contain" />
                <span className="text-xs font-medium text-red-700 text-center">{warnings[key].title}</span>
              </button>
            ))}
          </div>
          <p className="text-xs text-gray-600 text-center">{warnings[activeTab].description}</p>
        </div>

        {/* Recommendations */}
        <div className="space-y-3">
          <h2 className="text-base font-semibold text-gray-800">Your Oil Plan for the Next 30 Days</h2>
          {summary.map((item, index) => (
            <div
              key={index}
              className="flex items-center bg-gray-100 rounded-lg p-3 shadow-sm relative"
            >
              <img
                src={item.image}
                alt={item.title}
                className="w-14 h-14 object-cover rounded-md border mr-3"
              />
              <div className="flex-1">
                <p className="text-gray-800 font-medium text-sm mb-1">{item.title}</p>
                <p className="text-gray-500 text-xs">₹{item.price.toFixed(2)} × {item.quantity}</p>
                <div className="mt-2 inline-block text-[10px] bg-green-100 text-green-800 font-semibold px-2 py-1 rounded-md">
                  {getBadgeText(item.title)}
                </div>
              </div>
              <div className="flex flex-col items-end">
                <div className="flex items-center gap-2">
                  <button
                    onClick={() => updateQuantity(index, -1)}
                    className="w-7 h-7 border border-gray-300 rounded-md text-gray-700 text-base flex items-center justify-center hover:border-gray-400"
                  >
                    −
                  </button>
                  <span className="text-sm font-medium">{item.quantity}</span>
                  <button
                    onClick={() => updateQuantity(index, 1)}
                    className="w-7 h-7 border border-gray-300 rounded-md text-gray-700 text-base flex items-center justify-center hover:border-gray-400"
                  >
                    +
                  </button>
                </div>
                <div className="text-green-700 font-semibold text-sm mt-1">
                  ₹{(item.quantity * item.price).toFixed(2)}
                </div>
              </div>
            </div>
          ))}

          <div className="flex justify-between pt-2 border-t text-base font-semibold text-gray-800">
            <span>Total</span>
            <span>₹{totalPrice.toFixed(2)}</span>
          </div>
        </div>

        <a
          href={fastrrUrl}
          className="block w-full bg-green-600 hover:bg-green-700 text-white font-semibold py-3 rounded-xl text-center transition"
        >
          Buy Now
        </a>

        <p className="text-center text-xs text-gray-400 mt-2">
          Make the switch. Your health deserves better.
        </p>
      </div>
    </div>
  );
}