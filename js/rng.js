// Seeded Pseudo-Random Number Generator (Mulberry32)
export class RNG {
  constructor(seed = Date.now()) {
    this.seed = seed;
    this.state = seed;
  }

  // Generate next 32-bit random float [0, 1)
  next() {
    let t = (this.state += 0x6d2b79f5);
    t = Math.imul(t ^ (t >>> 15), t | 1);
    t ^= t + Math.imul(t ^ (t >>> 7), t | 61);
    return ((t ^ (t >>> 14)) >>> 0) / 4294967296;
  }

  // Integer in [min, max] inclusive
  range(min, max) {
    return Math.floor(this.next() * (max - min + 1)) + min;
  }

  // Weighted pick from array of items { item, weight }
  weightedPick(weightedList) {
    const totalWeight = weightedList.reduce((sum, entry) => sum + (entry.weight || 1), 0);
    let r = this.next() * totalWeight;
    for (const entry of weightedList) {
      r -= (entry.weight || 1);
      if (r <= 0) return entry.item;
    }
    return weightedList[weightedList.length - 1].item;
  }

  // Fisher-Yates array shuffle
  shuffle(array) {
    const copy = [...array];
    for (let i = copy.length - 1; i > 0; i--) {
      const j = Math.floor(this.next() * (i + 1));
      [copy[i], copy[j]] = [copy[j], copy[i]];
    }
    return copy;
  }
}

export const rng = new RNG();
