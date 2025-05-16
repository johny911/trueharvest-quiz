// src/utils/recommendOils.jsx
export default function recommendOils({ adults, kids, currentOils }) {
  const total = adults * 1 + kids * 0.5;

  // Lowercase everything once
  const lowers = currentOils.map(oil => oil.toLowerCase());

  // Normalize into our three categories
  const hasGroundnut = lowers.some(oil =>
    oil.includes('groundnut') ||
    oil.includes('sunflower') ||
    oil.includes('mustard')
  );
  const hasCoconut = lowers.some(oil =>
    oil.includes('coconut')
  );
  const hasSesame = lowers.some(oil =>
    oil.includes('sesame')
  );

  // Build the list of oils
  let oils = [];
  if (hasGroundnut) oils.push('Groundnut Oil');
  if (hasCoconut)  oils.push('Coconut Oil');
  if (hasSesame)   oils.push('Sesame Oil');

  // Fallback if none matched
  if (oils.length === 0) {
    oils = ['Groundnut Oil', 'Coconut Oil'];
  }

  // Helper: enforce minimum 0.5L, else round up
  const adjustQty = qty => qty <= 0.5 ? 0.5 : Math.ceil(qty);

  const recs = [];

  if (oils.length === 1) {
    // All your need in that single oil
    recs.push({
      name: oils[0],
      quantity: adjustQty(total),
    });

  } else if (oils.length === 2) {
    const [A, B] = oils;
    let ratioA, ratioB;

    // If it's Coconut+Sesame, tilt toward Sesame
    if (
      (A === 'Coconut Oil' && B === 'Sesame Oil') ||
      (A === 'Sesame Oil'  && B === 'Coconut Oil')
    ) {
      if (A === 'Sesame Oil') {
        ratioA = 0.6; ratioB = 0.4;
      } else {
        ratioA = 0.4; ratioB = 0.6;
      }
    } else {
      // Otherwise Groundnut gets priority (75/25)
      if (A === 'Groundnut Oil') {
        ratioA = 0.75; ratioB = 0.25;
      } else {
        ratioA = 0.25; ratioB = 0.75;
      }
    }

    recs.push({ name: A, quantity: adjustQty(total * ratioA) });
    recs.push({ name: B, quantity: adjustQty(total * ratioB) });

  } else {
    // All three: 50% Groundnut, 30% Coconut, 20% Sesame
    recs.push({ name: 'Groundnut Oil', quantity: adjustQty(total * 0.5) });
    recs.push({ name: 'Coconut Oil',   quantity: adjustQty(total * 0.3) });
    recs.push({ name: 'Sesame Oil',    quantity: adjustQty(total * 0.2) });
  }

  return recs;
}