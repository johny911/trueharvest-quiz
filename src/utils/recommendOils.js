export default function recommendOils({ adults, kids, currentOils }) {
    const total = adults * 1 + kids * 0.5;
    const recs = [];
  
    const usesRefined = currentOils.some(oil =>
      ['Refined Groundnut Oil', 'Refined Sunflower Oil', 'Palm Oil'].includes(oil)
    );
  
    const usesColdPressed = currentOils.includes('Cold-Pressed Oil');
  
    if (usesRefined || !usesColdPressed) {
      recs.push({
        name: 'Groundnut Oil',
        quantity: Math.ceil(total * 0.75),
      });
      recs.push({
        name: 'Coconut Oil',
        quantity: Math.ceil(total * 0.25),
      });
    } else {
      recs.push({
        name: 'Sesame Oil',
        quantity: Math.ceil(total * 0.5),
      });
      recs.push({
        name: 'Groundnut Oil',
        quantity: Math.ceil(total * 0.5),
      });
    }
  
    return recs;
  }