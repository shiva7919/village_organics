import { Product } from './types';

export const MOCK_PRODUCTS: Product[] = [
  {
    id: '1',
    name: 'Organic Avocados',
    description: 'Creamy, rich, and freshly harvested Hass avocados. Perfect for toast or salads.',
    price: 180,
    unit: 'kg',
    category: 'Vegetables',
    image: 'https://picsum.photos/seed/avo/400/400',
    isOrganic: true,
    rating: 4.8,
    stock: 50,
    benefits: ['High in healthy fats', 'Source of potassium', 'Fiber-rich']
  },
  {
    id: '2',
    name: 'Raw Forest Honey',
    description: 'Unprocessed, pure honey collected from wild hives in the Nilgiris.',
    price: 450,
    unit: '500g',
    category: 'Spices',
    image: 'https://picsum.photos/seed/honey/400/400',
    isOrganic: true,
    rating: 4.9,
    stock: 20,
    benefits: ['Natural antioxidant', 'Boosts immunity', 'Soothes throat']
  },
  {
    id: '3',
    name: 'A2 Desi Cow Milk',
    description: 'Fresh raw milk from free-grazing Gir cows. Delivered in glass bottles.',
    price: 90,
    unit: 'liter',
    category: 'Dairy',
    image: 'https://picsum.photos/seed/milk/400/400',
    isOrganic: true,
    rating: 4.7,
    stock: 100,
    benefits: ['Easier to digest', 'Rich in calcium', 'No hormones']
  },
  {
    id: '4',
    name: 'Cold Pressed Coconut Oil',
    description: 'Wood-pressed oil keeping all nutrients intact. Great for cooking and hair.',
    price: 320,
    unit: 'liter',
    category: 'Oils',
    image: 'https://picsum.photos/seed/oil/400/400',
    isOrganic: true,
    rating: 4.6,
    stock: 35,
    benefits: ['Good cholesterol', 'Skin health', 'High smoke point']
  },
  {
    id: '5',
    name: 'Red Quinoa',
    description: 'Protein-packed ancient grain. Nutty flavor and great texture.',
    price: 550,
    unit: 'kg',
    category: 'Grains',
    image: 'https://picsum.photos/seed/quinoa/400/400',
    isOrganic: true,
    rating: 4.5,
    stock: 15,
    benefits: ['Complete protein', 'Gluten-free', 'High fiber']
  },
  {
    id: '6',
    name: 'Farm Fresh Strawberries',
    description: 'Sweet, juicy, and pesticide-free strawberries from Mahabaleshwar.',
    price: 300,
    unit: 'box',
    category: 'Fruits',
    image: 'https://picsum.photos/seed/berry/400/400',
    isOrganic: true,
    rating: 4.9,
    stock: 10,
    benefits: ['Vitamin C', 'Antioxidants', 'Heart health']
  },
  {
    id: '7',
    name: 'Turmeric Powder',
    description: 'High curcumin content, ground from sun-dried turmeric roots.',
    price: 220,
    unit: '250g',
    category: 'Spices',
    image: 'https://picsum.photos/seed/turmeric/400/400',
    isOrganic: true,
    rating: 4.8,
    stock: 60,
    benefits: ['Anti-inflammatory', 'Boosts immunity', 'Natural antiseptic']
  },
  {
    id: '8',
    name: 'Brown Basmati Rice',
    description: 'Unpolished, aromatic long-grain rice.',
    price: 140,
    unit: 'kg',
    category: 'Grains',
    image: 'https://picsum.photos/seed/rice/400/400',
    isOrganic: true,
    rating: 4.4,
    stock: 80,
    benefits: ['Low GI', 'Fiber-rich', 'Nutritious']
  }
];

export const CATEGORIES = ['Vegetables', 'Fruits', 'Dairy', 'Spices', 'Oils', 'Grains'];
