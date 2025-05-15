// src/utils/recommendOils.js

export default function recommendOils({ adults, kids, currentOils }) {
  // Calculate total requirement (1 L per adult, 0.5 L per kid)
  const total = adults * 1 + kids * 0.5;
  const recs = [];

  // Define which selections map to which oil
  const coconutOpts = ['Refined Coconut Oil', 'Cold-Pressed Coconut Oil'];
  const groundnutOpts = [
    'Refined Groundnut Oil',
    'Cold-Pressed Groundnut Oil',
    'Refined Sunflower Oil',      // treated as Groundnut
    'Cold-Pressed Sunflower Oil', // treated as Groundnut
    'Cold-Pressed Mustard Oil'    // treated as Groundnut
  ];
  const sesameOpts = ['Refined Sesame Oil', 'Cold-Pressed Sesame Oil'];

  const usesCoconut = currentOils.some(oil => coconutOpts.includes(oil));
  const usesGroundnut = currentOils.some(oil => groundnutOpts.includes(oil));
  const usesSesame = currentOils.some(oil => sesameOpts.includes(oil));

  // All three selected → 60% G, 20% C, 20% S
  if (usesGroundnut && usesCoconut && usesSesame) {
    recs.push({ name: 'Groundnut Oil', quantity: Math.ceil(total * 0.6) });
    recs.push({ name: 'Coconut Oil',   quantity: Math.ceil(total * 0.2) });
    recs.push({ name: 'Sesame Oil',    quantity: Math.ceil(total * 0.2) });

  // Any two selected → 75/25 split, bias to the first in the pair
  } else if (usesGroundnut && usesCoconut) {
    recs.push({ name: 'Groundnut Oil', quantity: Math.ceil(total * 0.75) });
    recs.push({ name: 'Coconut Oil',   quantity: Math.ceil(total * 0.25) });
  } else if (usesGroundnut && usesSesame) {
    recs.push({ name: 'Groundnut Oil', quantity: Math.ceil(total * 0.75) });
    recs.push({ name: 'Sesame Oil',    quantity: Math.ceil(total * 0.25) });
  } else if (usesCoconut && usesSesame) {
    recs.push({ name: 'Coconut Oil',   quantity: Math.ceil(total * 0.75) });
    recs.push({ name: 'Sesame Oil',    quantity: Math.ceil(total * 0.25) });

  // Only one selected → give 100% of total
  } else if (usesGroundnut) {
    recs.push({ name: 'Groundnut Oil', quantity: Math.ceil(total) });
  } else if (usesCoconut) {
    recs.push({ name: 'Coconut Oil',   quantity: Math.ceil(total) });
  } else if (usesSesame) {
    recs.push({ name: 'Sesame Oil',    quantity: Math.ceil(total) });

  // Fallback if none explicitly selected → default 75% G / 25% C
  } else {
    recs.push({ name: 'Groundnut Oil', quantity: Math.ceil(total * 0.75) });
    recs.push({ name: 'Coconut Oil',   quantity: Math.ceil(total * 0.25) });
  }

  return recs;
}