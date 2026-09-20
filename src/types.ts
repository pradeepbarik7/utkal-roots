export interface Product {
  id: string;
  name: string;
  tagline: string;
  category: string;
  pricePerKg: number;
  weightOptions: { weight: string; multiplier: number; label: string; savings?: string }[];
  rating: number;
  reviewsCount: number;
  inStock: boolean;
  stockQuantity: number;
  image: string;
  secondaryImage?: string;
  badge?: string;
  accentColor: string;
  description: string;
  tastingNotes: string[];
  healthBenefits: string[];
  cookingInstructions: {
    prepTime: string;
    cookTime: string;
    waterRatio: string;
    steps: string[];
    chefTip: string;
  };
  farmOrigin: {
    region: string;
    state: string;
    soilType: string;
    compostType: string;
    pestCare: string;
    harvestSeason: string;
  };
  nutrition: {
    servingSize: string;
    calories: string;
    protein: string;
    carbs: string;
    fiber: string;
    iron: string;
    antioxidants: string;
  };
}

export interface CartItem {
  id: string; // product id + weight
  productId: string;
  name: string;
  price: number;
  weight: string;
  quantity: number;
  image: string;
}

export interface CheckoutFormData {
  fullName: string;
  email: string;
  phone: string;
  address: string;
  city: string;
  state: string;
  pincode: string;
  deliveryNotes?: string;
  paymentMethod: 'razorpay_upi' | 'razorpay_card' | 'razorpay_netbanking' | 'cod';
}

export interface Order {
  orderId: string;
  date: string;
  items: CartItem[];
  subtotal: number;
  shipping: number;
  discount: number;
  total: number;
  customer: CheckoutFormData;
  paymentId: string;
  status: 'confirmed' | 'processing' | 'shipped' | 'delivered';
  estimatedDelivery: string;
}

export interface CustomerReview {
  id: string;
  name: string;
  city: string;
  state: string;
  rating: number;
  date: string;
  productName: string;
  comment: string;
  verified: boolean;
}

export type PolicyType = 'privacy' | 'refund' | 'shipping' | 'terms';
