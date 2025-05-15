// src/utils/recommendOils.js
export default function recommendOils({ adults, kids, currentOils }) {
  // 1. Compute baseline in liters
  const baseline = adults * 1 + kids * 0.5;

  // 2. Map their selections to the three products
  const choices = new Set();
  currentOils.forEach(oil => {
    const lower = oil.toLowerCase();
    if (lower.includes('coconut')) {
      choices.add('Coconut Oil');
    } else if (lower.includes('sesame')) {
      choices.add('Sesame Oil');
    } else if (
      lower.includes('groundnut') ||
      lower.includes('sunflower') ||
      lower.includes('mustard')
    ) {
      choices.add('Groundnut Oil');
    }
  });

  // 3. Fallback to original logic if they picked none
  const usesRefined = currentOils.some(oil =>
    ['refined groundnut oil','refined sunflower oil','palm oil']
      .includes(oil.toLowerCase())
  );
  const usesCold = currentOils.includes('Cold-Pressed Oil');
  if (choices.size === 0) {
    return (usesRefined || !usesCold)
      ? [ { name: 'Groundnut Oil', quantity: Math.ceil(baseline * 0.75 * 2) / 2 },
          { name: 'Coconut Oil',  quantity: Math.ceil(baseline * 0.25 * 2) / 2 } ]
      : [ { name: 'Sesame Oil',   quantity: Math.ceil(baseline * 0.5 * 2) / 2 },
          { name: 'Groundnut Oil',quantity: Math.ceil(baseline * 0.5 * 2) / 2 } ];
  }

  const out = [];

  // 4. If they picked all three, give 0.5L each
  if (choices.size === 3) {
    return Array.from(choices).map(name => ({ name, quantity: 0.5 }));
  }

  // 5. If only one choice, give them the full baseline
  if (choices.size === 1) {
    const [name] = choices;
    return [{ name, quantity: Math.ceil(baseline * 2) / 2 }];
  }

  // 6. If exactly two choices, weight 60/40 towards the “primary” oil
  //    Primary: Groundnut > Sesame > Coconut
  const pick = Array.from(choices);
  let primary, secondary;
  if (pick.includes('Groundnut Oil')) {
    primary = 'Groundnut Oil';
    secondary = pick.find(n => n !== primary);
  } else if (pick.includes('Sesame Oil')) {
    primary = 'Sesame Oil';
    secondary = pick.find(n => n !== primary);
  } else {
    // only coconut + something else
    primary = pick[0];
    secondary = pick[1];
  }

  const primaryShare   = baseline * 0.6;
  const secondaryShare = baseline * 0.4;
  // round each down to nearest 0.5L
  let pQty = Math.floor(primaryShare * 2) / 2;
  let sQty = Math.floor(secondaryShare * 2) / 2;

  // if rounding down left us under baseline, add a single extra 0.5 to the primary
  const sum = pQty + sQty;
  if (sum < baseline) {
    pQty += 0.5;
  }

  return [
    { name: primary,   quantity: pQty },
    { name: secondary, quantity: sQty }
  ];
}