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

  // Helper: enforce minimum 0.5L, otherwise ceil to integer
  const adjustQty = (qty) => qty <= 0.5 ? 0.5 : Math.ceil(qty);

  const recs = [];

  if (oils.length === 1) {
    // 100% of their need in that one oil
    recs.push({
      name: oils[0],
      quantity: adjustQty(total),
    });

  } else if (oils.length === 2) {
    const [A, B] = oils;
    let ratioA, ratioB;

    // Coconut+Sesame → more Sesame
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
      // Otherwise Groundnut primary (75/25)
      if (A === 'Groundnut Oil') {
        ratioA = 0.75; ratioB = 0.25;
      } else {
        ratioA = 0.25; ratioB = 0.75;
      }
    }

    recs.push({
      name: A,
      quantity: adjustQty(total * ratioA),
    });
    recs.push({
      name: B,
      quantity: adjustQty(total * ratioB),
    });

  } else {
    // All three: Groundnut 50%, Coconut 30%, Sesame 20%
    recs.push({
      name: 'Groundnut Oil',
      quantity: adjustQty(total * 0.5),
    });
    recs.push({
      name: 'Coconut Oil',
      quantity: adjustQty(total * 0.3),
    });
    recs.push({
      name: 'Sesame Oil',
      quantity: adjustQty(total * 0.2),
    });
  }

  return recs;
}