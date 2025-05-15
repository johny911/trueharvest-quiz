// src/utils/recommendOils.jsx
export default function recommendOils({ adults, kids, currentOils }) {
  const total = adults * 1 + kids * 0.5

  // Normalize their selections into our three product buckets
  const hasGroundnut =
    currentOils.includes('Refined Groundnut Oil') ||
    currentOils.includes('Cold-Pressed Groundnut Oil') ||
    currentOils.includes('Refined Sunflower Oil') ||      // treated as groundnut
    currentOils.includes('Cold-Pressed Mustard Oil')      // treated as groundnut

  const hasCoconut =
    currentOils.includes('Refined Coconut Oil') ||
    currentOils.includes('Cold-Pressed Coconut Oil')

  const hasSesame =
    currentOils.includes('Refined Sesame Oil') ||
    currentOils.includes('Cold-Pressed Sesame Oil')

  // Build list of oils to recommend
  let oils = []
  if (hasGroundnut) oils.push('Groundnut Oil')
  if (hasCoconut)   oils.push('Coconut Oil')
  if (hasSesame)    oils.push('Sesame Oil')

  // Fallback if they didn't select any recognized oil
  if (oils.length === 0) {
    oils = ['Groundnut Oil', 'Coconut Oil']
  }

  const recs = []

  if (oils.length === 1) {
    // 100% of their need in that one oil
    recs.push({
      name: oils[0],
      quantity: Math.ceil(total)
    })
  } else if (oils.length === 2) {
    const [A, B] = oils
    let ratioA, ratioB

    // Coconut + Sesame → more Sesame (60/40)
    if (
      (A === 'Coconut Oil' && B === 'Sesame Oil') ||
      (A === 'Sesame Oil'  && B === 'Coconut Oil')
    ) {
      if (A === 'Sesame Oil') {
        ratioA = 0.6
        ratioB = 0.4
      } else {
        ratioA = 0.4
        ratioB = 0.6
      }
    } else {
      // Any pair with Groundnut → Groundnut primary (75/25)
      if (A === 'Groundnut Oil') {
        ratioA = 0.75
        ratioB = 0.25
      } else {
        ratioA = 0.25
        ratioB = 0.75
      }
    }

    recs.push({
      name: A,
      quantity: Math.ceil(total * ratioA)
    })
    recs.push({
      name: B,
      quantity: Math.ceil(total * ratioB)
    })
  } else {
    // All three: Groundnut 50%, Coconut 30%, Sesame 20%
    recs.push({
      name: 'Groundnut Oil',
      quantity: Math.ceil(total * 0.5)
    })
    recs.push({
      name: 'Coconut Oil',
      quantity: Math.ceil(total * 0.3)
    })
    recs.push({
      name: 'Sesame Oil',
      quantity: Math.ceil(total * 0.2)
    })
  }

  return recs
}