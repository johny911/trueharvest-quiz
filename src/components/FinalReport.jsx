// src/components/FinalReport.jsx
import React, { useState } from 'react';
import { supabase } from '../supabaseClient';

export default function FinalReport({
  formData,
  summary: initialSummary,
  totalPrice: initialTotalPrice,
  cartUrl
}) {
  const [activeTab, setActiveTab] = useState('inflammation');
  const [activeFeature, setActiveFeature] = useState('stone');
  const [activeMyth, setActiveMyth] = useState('heat');
  const [summary, setSummary] = useState(initialSummary);
  const [totalPrice, setTotalPrice] = useState(initialTotalPrice);

  // Compute original total (using compareAtPrice where available)
  const originalTotal = summary.reduce(
    (acc, item) =>
      acc + (item.compareAtPrice ?? item.price) * item.quantity,
    0
  );

  const warnings = {
    inflammation: {
      image: '/images/inflammation.png',
      title: 'Inflammation',
      description:
        'Refined oils are high in omega-6 fatty acids which can trigger chronic inflammation in the body.'
    },
    heart: {
      image: '/images/heart.png',
      title: 'Heart Disease',
      description:
        'Chemically extracted oils may damage blood vessels and raise bad cholesterol.'
    },
    insulin: {
      image: '/images/insulin.png',
      title: 'Insulin Resistance & Diabetes',
      description:
        'Refined oils impair insulin sensitivity and increase the risk of developing diabetes.'
    }
  };

  const features = {
    stone: {
      image: '/images/stone-pressed.png',
      title: 'Stone Pressed',
      description:
        'Traditional stone-pressing retains maximum nutrients by gently extracting oil without heat.'
    },
    sunlight: {
      image: '/images/sunlight-dried.png',
      title: 'Sunlight Dried',
      description:
        'Our oil settles naturally under the sun for 10 days—no filtration—so you get all the goodness.'
    },
    heirloom: {
      image: '/images/heirloom-seeds.png',
      title: 'Heirloom Seeds',
      description:
        'We use native, non-GMO seeds for pure, unadulterated flavor and nutrition.'
    }
  };

  const myths = {
    heat: {
      image: '/images/heat-hype.png',
      title: 'Heat & Hype',
      description:
        'Big factories push “cold-pressed” oil through giant machines at high speed. That friction heats it, destroying delicate nutrients—so it’s almost as “dead” as refined oil.'
    },
    stripped: {
      image: '/images/stripped-of-goodness.png',
      title: 'Stripped of Goodness',
      description:
        'Real cold-pressed oil settles naturally in sunlight, keeping all its vitamins and antioxidants. Commercial brands force-filter their batches in minutes, washing away the very nutrients you paid for.'
    },
    whiteLabel: {
      image: '/images/white-label-deception.png',
      title: 'White-Label Deception',
      description:
        'Many popular “cold-pressed” oils are actually mass-produced white-label products—you never know if it’s genuine or just re-branded factory output.'
    }
  };

  const updateQuantity = async (index, delta) => {
    const newSummary = [...summary];
    const currentQty = newSummary[index].quantity;
    if (delta === -1 && currentQty === 1) return;
    newSummary[index].quantity += delta;
    const newTotal = newSummary.reduce(
      (acc, item) => acc + item.quantity * item.price,
      0
    );
    setSummary(newSummary);
    setTotalPrice(newTotal);
    await supabase
      .from('quiz_responses')
      .update({
        recommended_oils: newSummary.map(
          (item) => `${item.title} - ${item.quantity}L`
        )
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

  // 👉 Change is here: point to cartUrl directly
  const checkoutUrl = cartUrl;

  return (
    <div className="min-h-screen bg-gray-50 flex items-center justify-center px-4 py-8">
      <div className="w-full max-w-2xl bg-white rounded-2xl shadow-xl p-6 flex flex-col space-y-6">
        {/* Greeting */}
        <div className="space-y-1 text-center">
          <h1 className="text-2xl font-bold text-gray-800">
            Hi {formData?.name},
          </h1>
          <p className="text-sm text-gray-600">
            Based on your answers, here’s your personalized oil recommendation.
          </p>
        </div>

        {/* Conditional section */}
        {!formData.usesColdPressed ? (
          <div className="bg-red-50 border border-red-200 rounded-xl p-4">
            <h2 className="text-base font-semibold text-red-700 mb-3">
              The refined oil you’re using could be causing:
            </h2>
            <div className="flex justify-between gap-2 mb-3">
              {Object.keys(warnings).map((key) => (
                <button
                  key={key}
                  onClick={() => setActiveTab(key)}
                  className={`w-1/3 rounded-xl p-2 border transition flex flex-col items-center ${
                    activeTab === key
                      ? 'bg-red-100 border-red-300'
                      : 'bg-white border-gray-200 hover:border-red-400'
                  }`}
                >
                  <img
                    src={warnings[key].image}
                    alt={warnings[key].title}
                    className="h-16 mb-2 object-contain"
                  />
                  <span className="text-xs font-medium text-red-700 text-center">
                    {warnings[key].title}
                  </span>
                </button>
              ))}
            </div>
            <p className="text-xs text-gray-600 text-center">
              {warnings[activeTab].description}
            </p>
          </div>
        ) : (
          <div className="bg-yellow-50 border border-yellow-200 rounded-xl p-4">
            <h2 className="text-base font-semibold text-yellow-700 mb-3">
              You’re on cold-pressed oil—nice! But beware: not all cold-pressed oils are created equal.
            </h2>
            <div className="flex justify-between gap-2 mb-3">
              {Object.keys(myths).map((key) => (
                <button
                  key={key}
                  onClick={() => setActiveMyth(key)}
                  className={`w-1/3 rounded-xl p-2 border transition flex flex-col items-center ${
                    activeMyth === key
                      ? 'bg-yellow-100 border-yellow-300'
                      : 'bg-white border-gray-200 hover:border-yellow-300'
                  }`}
                >
                  <img
                    src={myths[key].image}
                    alt={myths[key].title}
                    className="h-16 mb-2 object-contain"
                  />
                  <span className="text-xs font-medium text-yellow-700 text-center">
                    {myths[key].title}
                  </span>
                </button>
              ))}
            </div>
            <p className="text-xs text-gray-600 text-center">
              {myths[activeMyth].description}
            </p>
          </div>
        )}

        {/* Recommendations list */}
        <div className="space-y-3 overflow-auto">
          <h2 className="text-base font-semibold text-gray-800">
            Your Oil Plan for the Next 30 Days
          </h2>
          {summary.map((item, idx) => {
            const unit = item.compareAtPrice ?? item.price;
            return (
              <div
                key={idx}
                className="flex items-center bg-gray-100 rounded-lg p-3 shadow-sm"
              >
                <img
                  src={item.image}
                  alt={item.title}
                  className="w-14 h-14 object-cover rounded-md border mr-3"
                />
                <div className="flex-1">
                  <p className="text-gray-800 font-medium text-sm mb-1">
                    {item.title}
                  </p>
                  <p className="text-sm text-gray-500">
                    ₹{unit.toFixed(2)} × {item.quantity}
                  </p>
                  <div className="mt-2 inline-block text-[10px] bg-green-100 text-green-800 font-semibold px-2 py-1 rounded-md">
                    {getBadgeText(item.title)}
                  </div>
                </div>
                <div className="flex flex-col items-end">
                  <div className="flex items-center gap-2">
                    <button
                      onClick={() => updateQuantity(idx, -1)}
                      className="w-7 h-7 border border-gray-300 bg-white rounded-md text-gray-700 flex items-center justify-center hover:bg-gray-100"
                    >
                      −
                    </button>
                    <span className="text-sm font-medium">
                      {item.quantity}
                    </span>
                    <button
                      onClick={() => updateQuantity(idx, 1)}
                      className="w-7 h-7 border border-gray-300 bg-white rounded-md text-gray-700 flex items-center justify-center hover:bg-gray-100"
                    >
                      +
                    </button>
                  </div>
                  <div className="text-green-700 font-semibold text-sm mt-1">
                    ₹{(unit * item.quantity).toFixed(2)}
                  </div>
                </div>
              </div>
            );
          })}
        </div>

        {/* What makes our oils different? */}
        <div className="bg-green-50 border border-green-200 rounded-xl p-4">
          <h2 className="text-base font-semibold text-green-700 mb-3">
            What makes our oils different?
          </h2>
          <div className="flex justify-between gap-2 mb-3">
            {Object.keys(features).map((key) => (
              <button
                key={key}
                onClick={() => setActiveFeature(key)}
                className={`w-1/3 rounded-xl p-2 border transition flex flex-col items-center ${
                  activeFeature === key
                    ? 'bg-green-100 border-green-300'
                    : 'bg-white border-gray-200 hover:border-green-300'
                }`}
              >
                <img
                  src={features[key].image}
                  alt={features[key].title}
                  className="h-16 mb-2 object-contain"
                />
                <span className="text-xs font-medium text-green-700 text-center">
                  {features[key].title}
                </span>
              </button>
            ))}
          </div>
          <p className="text-xs text-gray-600 text-center">
            {features[activeFeature].description}
          </p>
        </div>

        {/* Sticky footer */}
        <div className="sticky bottom-0 bg-white pt-4">
          <div className="flex justify-between pt-2 border-t">
            <span className="text-base font-semibold text-gray-800">Total</span>
            <div className="flex flex-col items-end">
              <span className="text-base font-semibold text-gray-800">
                <span className="line-through mr-2">
                  ₹{originalTotal.toFixed(2)}
                </span>
                ₹{totalPrice.toFixed(2)}
              </span>
              <span className="text-xs text-gray-500">
                Inclusive of all taxes
              </span>
            </div>
          </div>
          <a
            href={checkoutUrl}
            className="block w-full bg-green-600 hover:bg-green-700 text-white font-semibold py-3 rounded-xl text-center transition mt-3"
          >
            Buy Now
          </a>
          <p className="text-center text-xs text-gray-400 mt-2">
            Make the switch. Your health deserves better.
          </p>
        </div>
      </div>
    </div>
  );
}
