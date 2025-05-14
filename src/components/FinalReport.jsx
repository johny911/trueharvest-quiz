import React, { useState, useEffect } from 'react';
import { supabase } from '../supabaseClient';

export default function FinalReport({ formData, summary: initialSummary, totalPrice: initialTotal, cartUrl }) {
  const [activeTab, setActiveTab] = useState('inflammation');
  const [summary, setSummary] = useState(initialSummary);
  const [totalPrice, setTotalPrice] = useState(initialTotal);

  const warnings = {
    inflammation: {
      icon: '🧠',
      title: 'Inflammation',
      description: 'Refined oils are high in omega-6 fatty acids which can trigger chronic inflammation in the body.'
    },
    heart: {
      icon: '❤️',
      title: 'Heart Disease',
      description: 'Chemically extracted oils may damage blood vessels and raise bad cholesterol.'
    },
    insulin: {
      icon: '🍩',
      title: 'Insulin Resistance & Diabetes',
      description: 'Refined oils impair insulin sensitivity and increase the risk of developing diabetes.'
    }
  };

  const updateQuantity = async (index, delta) => {
    const updated = [...summary];
    updated[index].quantity += delta;

    if (updated[index].quantity < 1) {
      updated.splice(index, 1);
    }

    const newTotal = updated.reduce((acc, item) => acc + item.price * item.quantity, 0);
    setSummary(updated);
    setTotalPrice(newTotal);

    await supabase.from('quiz_responses').update({
      recommended_oils: updated.map((r) => `${r.title} - ${r.quantity}L`)
    }).eq('phone', formData.phone);
  };

  const buildFastrrUrl = (items) => {
    const base = 'https://trueharvest.store/';
    const productParam = items.map((item) => `${item.id}:${item.quantity}`).join(',');
    return `${base}?isFastrrProduct=true&fastrr_link_type=CHECKOUT_LINK&seller-domain=trueharvest.store&products=${encodeURIComponent(productParam)}`;
  };

  const fastrrUrl = buildFastrrUrl(summary);

  return (
    <div className="min-h-screen bg-gray-50 flex items-center justify-center px-4 py-8">
      <div className="w-full max-w-2xl space-y-6 bg-white rounded-2xl shadow-xl p-6">
        <div className="space-y-1 text-center">
          <h1 className="text-2xl font-bold text-gray-800">Hi {formData?.name},</h1>
          <p className="text-sm text-gray-600">Based on your answers, here’s your personalized oil recommendation.</p>
        </div>

        <div className="bg-red-50 border border-red-200 rounded-xl p-4">
          <h2 className="text-base font-semibold text-red-700 mb-3">The refined oil you’re using could be causing:</h2>
          <div className="flex justify-around gap-2">
            {Object.keys(warnings).map((key) => (
              <button
                key={key}
                onClick={() => setActiveTab(key)}
                className={`flex flex-col items-center text-sm p-2 rounded-xl transition ${
                  activeTab === key ? 'bg-red-100 text-red-700' : 'text-red-500 hover:bg-red-50'
                }`}
              >
                <div className="text-3xl">{warnings[key].icon}</div>
                <span>{warnings[key].title}</span>
              </button>
            ))}
          </div>
          <p className="text-xs text-gray-600 mt-3">{warnings[activeTab].description}</p>
        </div>

        <div className="space-y-3">
          <h2 className="text-base font-semibold text-gray-800">Your Recommended Combo</h2>
          {summary.map((item, index) => (
            <div key={index} className="flex items-center bg-gray-100 rounded-lg p-3 shadow-sm">
              <img src={item.image} alt={item.title} className="w-14 h-14 object-cover rounded-md border mr-3" />
              <div className="flex-1">
                <p className="text-gray-800 font-medium text-sm">{item.title}</p>
                <p className="text-gray-500 text-xs">₹{item.price.toFixed(2)} × {item.quantity}</p>
              </div>
              <div className="flex items-center gap-1">
                <button
                  onClick={() => updateQuantity(index, -1)}
                  className="w-7 h-7 rounded-full bg-gray-200 hover:bg-gray-300 text-sm font-bold"
                >−</button>
                <span className="text-sm font-medium w-6 text-center">{item.quantity}</span>
                <button
                  onClick={() => updateQuantity(index, 1)}
                  className="w-7 h-7 rounded-full bg-gray-200 hover:bg-gray-300 text-sm font-bold"
                >+</button>
              </div>
              <div className="ml-3 text-green-700 font-semibold text-sm text-right">
                ₹{(item.price * item.quantity).toFixed(2)}
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
          target="_blank"
          rel="noopener noreferrer"
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