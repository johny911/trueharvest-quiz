import React, { useEffect, useState } from 'react';
import { supabase } from '../supabaseClient';
import recommendOils from '../utils/recommendOils';
import FinalReport from './FinalReport';

const variantInfo = {
  '40442863222856': { handle: 'wood-pressed-groundnut-oil' },
  '40442863255624': { handle: 'wood-pressed-groundnut-oil' },
  '40442862862408': { handle: 'wood-pressed-coconut-oil' },
  '40442862895176': { handle: 'wood-pressed-coconut-oil' },
  '40454636568648': { handle: 'wood-pressed-sesame-oil' },
  '40454636601416': { handle: 'wood-pressed-sesame-oil' },
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
        const price = parseFloat(variant.price) / 100;
        const lineTotal = qty * price;
        total += lineTotal;

        return {
          id: variantId,
          title: variant.name,
          image: variant.featured_image?.url || data.images[0]?.src || '',
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
    const lower = name.toLowerCase();
    const volumeText = volume.toLowerCase();
    for (const [id, info] of Object.entries(variantInfo)) {
      const title = id.toString();
      if (
        info.handle.includes(lower.replace(' oil', '').replace(/\s/g, '-')) &&
        title.includes(volumeText === '1l' ? '22856' : '55624')
      ) {
        return id;
      }
    }
    return Object.keys(variantInfo).find(id => variantInfo[id].handle.includes(lower.replace(' oil', '').replace(/\s/g, '-')) && id.includes(volumeText === '1l' ? '6' : '16'));
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

  if (!loading && submitted) {
    return (
      <FinalReport
        name={formData.name}
        summary={summary}
        totalPrice={totalPrice}
        cartUrl={cartUrl}
      />
    );
  }

  return (
    <div className="w-full">
      <div className="bg-white shadow-xl rounded-2xl p-6 space-y-6">
        <p className="text-center text-gray-500 text-sm">Calculating your recommendation...</p>
      </div>
    </div>
  );
}