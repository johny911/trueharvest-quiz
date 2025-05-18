// src/components/Step6Recommendation.jsx
import React, { useEffect, useState } from 'react';
import { supabase } from '../supabaseClient';
import recommendOils from '../utils/recommendOils';
import FinalReport from './FinalReport';

const VARIANT_MAP = {
  'Groundnut Oil': {
    handle: 'wood-pressed-groundnut-oil',
    '1L': '40442863222856',
    '500ml': '40442863255624',
  },
  'Coconut Oil': {
    handle: 'wood-pressed-coconut-oil',
    '1L': '40442862862408',
    '500ml': '40442862895176',
  },
  'Sesame Oil': {
    handle: 'wood-pressed-sesame-oil',
    '1L': '40454636568648',
    '500ml': '40454636601416',
  },
};

export default function Step6Recommendation({ formData }) {
  const [loading, setLoading] = useState(true);
  const [submitted, setSubmitted] = useState(false);
  const [summary, setSummary] = useState([]);
  const [totalPrice, setTotalPrice] = useState(0);
  const [cartUrl, setCartUrl] = useState('');

  useEffect(() => {
    // preload all relevant icons during loading
    [
      '/images/inflammation.png',
      '/images/heart.png',
      '/images/insulin.png',
      '/images/stone-pressed.png',
      '/images/sunlight-dried.png',
      '/images/heirloom-seeds.png',
      '/images/heat-hype.png',
      '/images/stripped-of-goodness.png',
      '/images/white-label-deception.png'
    ].forEach(src => {
      const img = new Image();
      img.src = src;
    });

    const recs = recommendOils(formData);
    fetchPricesAndBuildSummary(recs);
  }, []);

  const fetchPricesAndBuildSummary = async (recs) => {
    let total = 0;

    const items = await Promise.all(
      recs.map(async ({ name, quantity }) => {
        const sizeKey = quantity >= 1 ? '1L' : '500ml';
        const { handle, ...variants } = VARIANT_MAP[name];
        const variantId = variants[sizeKey];

        const res = await fetch(`https://trueharvest.store/products/${handle}.js`);
        const data = await res.json();
        const variant = data.variants.find(v => v.id.toString() === variantId);

        const qty = Math.max(Math.round(quantity), 1);
        const price = parseFloat(variant.price) / 100;
        total += qty * price;

        const image =
          variant.featured_image?.src ||
          data.images?.[0] ||
          '';

        return {
          id: variantId,
          title: variant.name,
          image,
          quantity: qty,
          price,
          compareAtPrice: variant.compare_at_price
            ? parseFloat(variant.compare_at_price) / 100
            : price,
        };
      })
    );

    setSummary(items);
    setTotalPrice(total);
    setCartUrl(
      'https://trueharvest.store/cart/' +
      items.map(i => `${i.id}:${i.quantity}`).join(',')
    );
    setLoading(false);

    // submit once total is calculated
    submitToSupabase(recs, total);
  };

  const submitToSupabase = async (recommendedOils, value) => {
    await supabase.from('quiz_responses').insert({
      name: formData.name,
      phone: formData.phone,
      adults: formData.adults,
      kids: formData.kids,
      uses_cold_pressed: formData.usesColdPressed,
      current_oils: formData.currentOils,
      recommended_oils: recommendedOils.map(r => `${r.name} - ${r.quantity}L`)
    });

    const qs = new URLSearchParams({
      name: formData.name,
      phone: formData.phone,
      numAdults: formData.adults,
      numChildren: formData.kids,
      coldPressUser: formData.usesColdPressed ? "Yes" : "No",
      oilChoices: formData.currentOils?.join(", "),
      recommendation: recommendedOils.map(r => `${r.name} - ${r.quantity}L`).join(", "),
      value: value.toString()
    }).toString();

    new Image().src =
      "https://script.google.com/macros/s/AKfycbw-atgx_I4x508IA5ms5wQ_cji2kgsdqpxsv-AM1EYU2tmR7e9nTTc606eXsO4TjqSi5w/exec?" + qs;

    setSubmitted(true);
  };

  if (!loading && submitted) {
    return (
      <FinalReport
        formData={formData}
        summary={summary}
        totalPrice={totalPrice}
        cartUrl={cartUrl}
      />
    );
  }

  return (
    <div className="w-full">
      <div className="bg-white shadow-xl rounded-2xl p-6 space-y-6">
        <p className="text-center text-gray-500 text-sm">
          Calculating your recommendation...
        </p>
      </div>
    </div>
  );
}
