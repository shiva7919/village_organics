export type Category = 'Vegetables' | 'Fruits' | 'Dairy' | 'Spices' | 'Oils' | 'Grains';

export interface Product {
  id: string;
  name: string;
  description: string;
  price: number;
  unit: string;
  category: Category;
  image: string;
  isOrganic: boolean;
  rating: number;
  stock: number;
  benefits: string[];
}

export interface CartItem extends Product {
  quantity: number;
  isSubscription: boolean; // Weekly/Monthly box
}

export interface User {
  id: string;
  name: string;
  email: string;
  role: 'customer' | 'admin';
}

export interface Order {
  id: string;
  userId: string;
  items: CartItem[];
  total: number;
  status: 'pending' | 'processing' | 'shipped' | 'delivered';
  date: string;
}

export type ViewState = 'HOME' | 'CATALOG' | 'PRODUCT_DETAIL' | 'CART' | 'PROFILE' | 'ADMIN';
