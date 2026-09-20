import { Product } from '../types';

export const PRODUCTS: Product[] = [
  {
    id: 'organic-black-rice',
    name: 'Organic Black Rice',
    tagline: 'The Ancient Purple Superfood Harvested from Odisha Soil',
    category: 'Heirloom Super-Grains',
    pricePerKg: 250,
    weightOptions: [
      { weight: '1 kg', multiplier: 1, label: 'Standard 1 kg Pouch' },
      { weight: '2 kg', multiplier: 1.95, label: '2 kg Value Pack', savings: 'Save ₹15' },
      { weight: '5 kg', multiplier: 4.8, label: '5 kg Family Bag', savings: 'Save ₹50' },
    ],
    rating: 4.9,
    reviewsCount: 142,
    inStock: true,
    stockQuantity: 4,
    badge: 'High Anthocyanin Superfood',
    accentColor: '#1A181C',
    image: '/Black Rice.png',
    description:
      'Cultivated by traditional farming families in Western Odisha using age-old regenerative wisdom. Our Organic Black Rice boasts a rich deep purple-black hue packed with anthocyanin antioxidants—exceeding blueberries by weight. Nourished solely with homemade cow dung vermicompost and protected with natural neem-leaf decoction, never seeing a drop of chemical fertilizer or synthetic pesticides.',
    tastingNotes: [
      'Subtle nutty and earthy fragrance',
      'Pleasing al dente chewiness with tender core',
      'Imparts a majestic royal purple broth and color',
      'Naturally mild sweet undertones without added sugar'
    ],
    healthBenefits: [
      'Rich in Anthocyanin antioxidants (heart and cell protection)',
      'Low Glycemic Index (GI ~52) — gentle on blood sugar',
      'Over 8.5g of plant protein per 100g serving',
      'Abundant dietary fiber promoting gut microbiome diversity',
      'Zero polishing — retains 100% bran and germ nutrition'
    ],
    cookingInstructions: {
      prepTime: 'Rinse 2-3 times, soak for 2–4 hours in lukewarm water',
      cookTime: '30–35 minutes on low flame or 4 whistles in pressure cooker',
      waterRatio: '1 cup Black Rice : 2.5 cups water',
      steps: [
        'Wash grains gently until water runs pale purple (avoid harsh scrubbing to preserve bran).',
        'Soak for at least 2 hours to soften the nutritious outer bran coat.',
        'In a heavy-bottomed clay or stainless pot, combine soaked rice with water and a pinch of rock salt.',
        'Bring to a rolling boil, reduce flame to the lowest setting, cover tightly, and simmer for 32 minutes.',
        'Turn off the heat and let rest covered for 10 minutes before fluffing gently with a fork.'
      ],
      chefTip: 'The soaking water is loaded with antioxidants—use it for cooking the rice or as a nutrient-packed broth for soups!'
    },
    farmOrigin: {
      region: 'Bargarh & Sambalpur District',
      state: 'Odisha, India',
      soilType: 'Rich alluvial & red loamy riverside soil',
      compostType: 'Vedic Jeevamrut & cow dung vermicompost (100% chemical-free)',
      pestCare: 'Fermented Neem leaf & Karanja oil spray repellent',
      harvestSeason: 'Winter Aman Crop (Hand-harvested & sun-dried)'
    },
    nutrition: {
      servingSize: '100g uncooked',
      calories: '345 kcal',
      protein: '8.8 g',
      carbs: '74 g',
      fiber: '4.9 g',
      iron: '3.5 mg (25% RDA)',
      antioxidants: 'Anthocyanins > 320 mg'
    }
  },
  {
    id: 'indrayani-white-rice',
    name: 'Odisha Indrayani-Style Rice',
    tagline: 'Thick & Aromatic Short Plump Grains with Heavenly Scent',
    category: 'Aromatic Heritage Rice',
    pricePerKg: 160,
    weightOptions: [
      { weight: '1 kg', multiplier: 1, label: 'Standard 1 kg Pouch' },
      { weight: '2 kg', multiplier: 1.95, label: '2 kg Value Pack', savings: 'Save ₹12' },
      { weight: '5 kg', multiplier: 4.8, label: '5 kg Family Bag', savings: 'Save ₹40' },
    ],
    rating: 4.95,
    reviewsCount: 189,
    inStock: true,
    stockQuantity: 28,
    badge: 'Short & Plump Aromatic Grain',
    accentColor: '#D97706',
    image: '/White Rice.png',
    description:
      'Grown in the mineral-rich soils of Odisha, our Indrayani-style heritage rice is cherished for its distinctive plump, thick grains and an intoxicating floral aroma that fills your entire kitchen upon boiling. Handcrafted with traditional organic farming methods, homemade compost, and natural neem extracts, delivering the comforting taste of grandmother’s farm-fresh meals.',
    tastingNotes: [
      'Intense, warm floral aroma released during cooking',
      'Soft, succulent, slightly sticky and melt-in-mouth texture',
      'Comforting buttery mouthfeel when paired with warm ghee and dal',
      'Absorbs curries, sambar, and rasam with luscious flavor retention'
    ],
    healthBenefits: [
      'Easily digestible starch structure — soothing on sensitive stomachs',
      'Natural energy booster without bloating or heaviness',
      'Zero chemical polish, talc, or artificial scent additives',
      'Rich in natural B-complex vitamins and minerals',
      'Ideal for children, elders, and convalescent diets'
    ],
    cookingInstructions: {
      prepTime: 'Gentle rinse once or twice, soak for 15–20 minutes',
      cookTime: '15–18 minutes on medium flame',
      waterRatio: '1 cup Rice : 2 cups water (adjust to 2.25 cups for extra soft khichdi/khiri)',
      steps: [
        'Rinse gently once to retain the delicate natural aromatic essential oils on the grain surface.',
        'Rest grains in measured water for 15 minutes before placing on heat.',
        'Bring water and rice to a simmer in an open pot until craters form on top.',
        'Cover with a snug lid, lower the heat to minimal for 5 minutes until all water is absorbed.',
        'Drizzle half a spoon of pure A2 desi cow ghee, rest for 5 minutes, then serve steaming hot.'
      ],
      chefTip: 'The ultimate rice for authentic Odia Dalma, fragrant Kanika, Temple-style Chaula Khiri, and fermented Pakhala!'
    },
    farmOrigin: {
      region: 'Mayurbhanj & Dhenkanal Foot-hills',
      state: 'Odisha, India',
      soilType: 'Virgin mountain runoff sandy loam',
      compostType: 'Fermented plant biomass & indigenous bio-humus',
      pestCare: 'Decoction of Neem seeds, Garlic, and Agniastra',
      harvestSeason: 'Autumn Kharif Crop'
    },
    nutrition: {
      servingSize: '100g uncooked',
      calories: '350 kcal',
      protein: '7.2 g',
      carbs: '78 g',
      fiber: '2.1 g',
      iron: '1.8 mg',
      antioxidants: 'Polyphenols & natural oryzenin'
    }
  },
  {
    id: 'utkal-roots-duo-bundle',
    name: 'Utkal Roots Heritage Duo Pack',
    tagline: '1 kg Organic Black Rice + 1 kg Indrayani-Style Aromatic Rice (Both 1+1 Pack)',
    category: 'Farm Special Combo',
    pricePerKg: 400, // ₹400 for 1+1 pack (2 kg total)
    weightOptions: [
      { weight: '2 kg (1kg + 1kg)', multiplier: 1, label: '1+1 Duo Pack (2 kg total)', savings: '₹400 for Both' },
      { weight: '4 kg (2kg + 2kg)', multiplier: 1.95, label: '2+2 Family Pack (4 kg total)', savings: 'Save ₹50' },
    ],
    rating: 5.0,
    reviewsCount: 96,
    inStock: true,
    stockQuantity: 3,
    badge: 'Most Popular Farm Bundle (₹400 for Both)',
    accentColor: '#2D6A4F',
    image: '/Both Rice.png',
    description:
      'Experience the best of both worlds from Odisha soil! The Utkal Roots Heritage Duo Pack combines 1 kg of our antioxidant-rich Organic Black Rice and 1 kg of our heavenly scented Indrayani-Style Aromatic Rice. Perfect for health-conscious homes wanting wholesome daily grains along with celebratory heritage meals.',
    tastingNotes: [
      'Versatile kitchen pairing: medicinal superfood & aromatic comfort',
      'Authentic Odia harvest direct from smallholder farmers',
      'Freshly milled in micro-batches to order',
      'Packaged in eco-friendly protective pouches with resealable zip'
    ],
    healthBenefits: [
      'Complete grain spectrum: high antioxidant anthocyanins + soothing digestible carbs',
      'Zero pesticide residues verified by independent lab audits',
      'Supports regenerative organic farming biodiversity in rural Odisha'
    ],
    cookingInstructions: {
      prepTime: 'Cook Black Rice for salads and immunity bowls; Indrayani for daily meals and fragrant curries',
      cookTime: 'Varies per grain type (recipes included in pack)',
      waterRatio: 'Refer to individual grain instructions',
      steps: [
        'Mix half Black Rice and half Indrayani Rice for a stunning dual-tone royal pulao!',
        'Use Black Rice for breakfast porridge or weekend health bowls.',
        'Use Indrayani Rice with traditional Dalma, ghee, and seasonal vegetable curries.'
      ],
      chefTip: 'A complimentary printed recipe booklet featuring 4 heritage Odia grain recipes comes included inside every duo bundle!'
    },
    farmOrigin: {
      region: 'Odisha Organic Farmer Producer Collective',
      state: 'Odisha, India',
      soilType: 'Certified regenerative organic farm clusters',
      compostType: '100% Homemade cow compost & neem oil protection',
      pestCare: 'Integrated organic IPM (Neem & Marigold border crops)',
      harvestSeason: 'Fresh 2025–2026 Harvest'
    },
    nutrition: {
      servingSize: '100g combined average',
      calories: '348 kcal',
      protein: '8.0 g',
      carbs: '76 g',
      fiber: '3.5 g',
      iron: '2.6 mg',
      antioxidants: 'Broad spectrum flavonoids'
    }
  }
];
