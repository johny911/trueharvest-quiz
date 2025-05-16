// src/utils/recommendOils.jsx
export default function recommendOils({ adults, kids, currentOils }) {
  const total = adults * 1 + kids * 0.5;

  // Normalize their selections into the 3 available oils
  const hasGroundnut = currentOils.some(oil =>
    oil.includes('Groundnut Oil') ||
    oil.includes('Sunflower Oil')   // treated as groundnut
  );
  const hasCoconut = currentOils.some(oil =>
    oil.includes('Coconut Oil')
  );
  const hasSesame = currentOils.some(oil =>
    oil.includes('Sesame Oil')
  );

  // Build list of oils to recommend
  let oils = [];
  if (hasGroundnut) oils.push('Groundnut Oil');
  if (hasCoconut)  oils.push('Coconut Oil');
  if (hasSesame)   oils.push('Sesame Oil');

  // Fallback if nothing matched
  if (oils.length === 0) {
    oils = ['Groundnut Oil', 'Coconut Oil'];
  }

  const recs = [];

  if (oils.length === 1) {
    // 100% of their need in that one oil
    recs.push({
      name: oils[0],
      quantity: Math.ceil(total)
    });
  } else if (oils.length === 2) {
    const [A, B] = oils;
    let ratioA, ratioB;

    // Coconut+Sesame → more Sesame
    if ( (A === 'Coconut Oil' && B === 'Sesame Oil') ||
         (A === 'Sesame Oil'  && B === 'Coconut Oil') ) {
      if (A === 'Sesame Oil') {
        ratioA = 0.6; ratioB = 0.4;
      } else {
        ratioA = 0.4; ratioB = 0.6;
      }
    } else {
      // Otherwise Groundnut primary (75/25)
      if (A === 'Groundnut Oil') {
        ratioA = 0.75; ratioB = 0.25;
      } else {
        ratioA = 0.25; ratioB = 0.75;
      }
    }

    recs.push({
      name: A,
      quantity: Math.ceil(total * ratioA)
    });
    recs.push({
      name: B,
      quantity: Math.ceil(total * ratioB)
    });
  } else {
    // All three: 50% GN, 30% C, 20% S
    recs.push({
      name: 'Groundnut Oil',
      quantity: Math.ceil(total * 0.5)
    });
    recs.push({
      name: 'Coconut Oil',
      quantity: Math.ceil(total * 0.3)
    });
    recs.push({
      name: 'Sesame Oil',
      quantity: Math.ceil(total * 0.2)
    });
  }

  return recs;
}