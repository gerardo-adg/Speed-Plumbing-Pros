export type IconName = 'drain' | 'heater' | 'pipe' | 'faucet' | 'gear' | 'bolt';

export const categories = [
  { id: 'drains-sewer', name: 'Drains & Sewer', icon: 'drain', blurb: "Clogs cleared fast, and camera inspections that show what's going on inside the line." },
  { id: 'water-heaters', name: 'Water Heaters', icon: 'heater', blurb: 'No hot water? We repair, replace and install tank and tankless units, often the same day.' },
  { id: 'leaks-pipes', name: 'Leaks & Pipes', icon: 'pipe', blurb: 'Hidden leaks found and fixed, from slab leaks to whole-home repipes and gas lines.' },
  { id: 'fixtures', name: 'Fixtures', icon: 'faucet', blurb: 'Toilets, faucets, disposals, showers and tubs, repaired or installed cleanly.' },
  { id: 'water-systems', name: 'Water Systems', icon: 'gear', blurb: 'Softeners for hard water and sump pumps that keep water out of low spots.' },
  { id: 'emergency-commercial', name: 'Emergency & Commercial', icon: 'bolt', blurb: 'Burst pipe at 2 a.m. or a backed-up sink at your business. We pick up 24/7.' },
] as const satisfies ReadonlyArray<{ id: string; name: string; icon: IconName; blurb: string }>;

export type CategoryId = (typeof categories)[number]['id'];
export const categoryIds = categories.map((c) => c.id) as [CategoryId, ...CategoryId[]];
