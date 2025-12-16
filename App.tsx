import React, { useState, useEffect } from 'react';
import Layout from './components/Layout';
import ProductCard from './components/ProductCard';
import AdminDashboard from './components/AdminDashboard';
import AIChat from './components/AIChat';
import { Product, CartItem, ViewState, Category } from './types';
import { MOCK_PRODUCTS, CATEGORIES } from './constants';
import { Search, Filter, ShoppingBag, Trash2, ArrowRight, CheckCircle } from 'lucide-react';

const App: React.FC = () => {
  const [currentView, setCurrentView] = useState<ViewState>('HOME');
  const [cart, setCart] = useState<CartItem[]>([]);
  const [selectedCategory, setSelectedCategory] = useState<Category | 'All'>('All');
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedProduct, setSelectedProduct] = useState<Product | null>(null);

  // -- Actions --
  const addToCart = (product: Product) => {
    setCart((prev) => {
      const existing = prev.find((item) => item.id === product.id);
      if (existing) {
        return prev.map((item) =>
          item.id === product.id ? { ...item, quantity: item.quantity + 1 } : item
        );
      }
      return [...prev, { ...product, quantity: 1, isSubscription: false }];
    });
  };

  const removeFromCart = (id: string) => {
    setCart((prev) => prev.filter((item) => item.id !== id));
  };

  const toggleSubscription = (id: string) => {
    setCart((prev) =>
      prev.map((item) =>
        item.id === id ? { ...item, isSubscription: !item.isSubscription } : item
      )
    );
  };

  const cartTotal = cart.reduce((sum, item) => sum + item.price * item.quantity, 0);

  // -- Views --

  const HomeView = () => (
    <div className="space-y-12 pb-12">
      {/* Hero */}
      <section className="relative h-[500px] flex items-center justify-center bg-stone-900 overflow-hidden">
        <img 
          src="https://images.unsplash.com/photo-1542838132-92c53300491e?q=80&w=2574&auto=format&fit=crop" 
          alt="Organic Farm"
          className="absolute inset-0 w-full h-full object-cover opacity-60"
        />
        <div className="relative z-10 text-center px-4 max-w-3xl">
          <span className="text-green-400 font-bold tracking-widest uppercase text-sm mb-4 block animate-fade-in">100% Certified Organic</span>
          <h2 className="text-4xl md:text-6xl font-serif font-bold text-white mb-6 leading-tight animate-slide-up">
            Pure Nature, <br/> Delivered Fresh.
          </h2>
          <p className="text-stone-200 text-lg mb-8 max-w-xl mx-auto">
            From the village soil to your kitchen table. Sustainable, pesticide-free, and ethically sourced.
          </p>
          <button 
            onClick={() => setCurrentView('CATALOG')}
            className="bg-green-600 hover:bg-green-700 text-white px-8 py-3 rounded-full font-semibold text-lg transition-all duration-300 transform hover:scale-105 shadow-lg"
          >
            Shop Now
          </button>
        </div>
      </section>

      {/* Featured Categories */}
      <section className="max-w-7xl mx-auto px-6">
        <div className="text-center mb-10">
          <h3 className="text-3xl font-serif font-bold text-stone-800">Our Harvest</h3>
          <p className="text-stone-500 mt-2">Browse by category</p>
        </div>
        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-4">
          {CATEGORIES.map((cat) => (
            <button
              key={cat}
              onClick={() => {
                setSelectedCategory(cat as Category);
                setCurrentView('CATALOG');
              }}
              className="group p-6 bg-white rounded-2xl border border-stone-100 hover:border-green-300 hover:shadow-md transition-all text-center"
            >
              <div className="w-12 h-12 bg-green-50 rounded-full mx-auto mb-3 flex items-center justify-center group-hover:bg-green-600 transition-colors">
                <span className="text-xl group-hover:text-white">🌱</span>
              </div>
              <span className="font-medium text-stone-700 group-hover:text-green-800">{cat}</span>
            </button>
          ))}
        </div>
      </section>

      {/* Featured Products */}
      <section className="max-w-7xl mx-auto px-6">
        <div className="flex justify-between items-end mb-8">
          <h3 className="text-3xl font-serif font-bold text-stone-800">Fresh Arrivals</h3>
          <button 
            onClick={() => setCurrentView('CATALOG')}
            className="text-green-700 font-medium hover:underline flex items-center"
          >
            View all <ArrowRight size={16} className="ml-1" />
          </button>
        </div>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {MOCK_PRODUCTS.slice(0, 4).map((product) => (
            <ProductCard key={product.id} product={product} onAddToCart={addToCart} />
          ))}
        </div>
      </section>
    </div>
  );

  const CatalogView = () => {
    const filteredProducts = MOCK_PRODUCTS.filter((p) => {
      const matchesCategory = selectedCategory === 'All' || p.category === selectedCategory;
      const matchesSearch = p.name.toLowerCase().includes(searchQuery.toLowerCase());
      return matchesCategory && matchesSearch;
    });

    return (
      <div className="max-w-7xl mx-auto px-6 py-8">
        {/* Filters Header */}
        <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 mb-8">
          <h2 className="text-3xl font-serif font-bold text-stone-800">Shop Organics</h2>
          
          <div className="flex flex-col md:flex-row gap-3">
            <div className="relative">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-stone-400 h-5 w-5" />
              <input
                type="text"
                placeholder="Search products..."
                className="pl-10 pr-4 py-2 bg-white border border-stone-200 rounded-full focus:outline-none focus:ring-2 focus:ring-green-500 w-full md:w-64"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
              />
            </div>
            
            <div className="flex gap-2 overflow-x-auto pb-2 md:pb-0 hide-scrollbar">
              <button
                onClick={() => setSelectedCategory('All')}
                className={`px-4 py-2 rounded-full whitespace-nowrap text-sm font-medium transition-colors ${
                  selectedCategory === 'All' ? 'bg-stone-800 text-white' : 'bg-white text-stone-600 border border-stone-200 hover:bg-stone-50'
                }`}
              >
                All
              </button>
              {CATEGORIES.map((cat) => (
                <button
                  key={cat}
                  onClick={() => setSelectedCategory(cat as Category)}
                  className={`px-4 py-2 rounded-full whitespace-nowrap text-sm font-medium transition-colors ${
                    selectedCategory === cat ? 'bg-stone-800 text-white' : 'bg-white text-stone-600 border border-stone-200 hover:bg-stone-50'
                  }`}
                >
                  {cat}
                </button>
              ))}
            </div>
          </div>
        </div>

        {/* Grid */}
        {filteredProducts.length > 0 ? (
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
            {filteredProducts.map((product) => (
              <ProductCard key={product.id} product={product} onAddToCart={addToCart} />
            ))}
          </div>
        ) : (
          <div className="text-center py-20">
            <p className="text-stone-500 text-lg">No products found matching your criteria.</p>
            <button 
              onClick={() => {setSelectedCategory('All'); setSearchQuery('');}}
              className="mt-4 text-green-600 hover:underline"
            >
              Clear Filters
            </button>
          </div>
        )}
      </div>
    );
  };

  const CartView = () => (
    <div className="max-w-4xl mx-auto px-6 py-12">
      <h2 className="text-3xl font-serif font-bold text-stone-800 mb-8">Your Cart</h2>
      
      {cart.length === 0 ? (
        <div className="text-center py-16 bg-white rounded-3xl border border-stone-100 shadow-sm">
          <ShoppingBag className="mx-auto h-16 w-16 text-stone-300 mb-4" />
          <p className="text-xl text-stone-500 mb-6">Your cart is currently empty.</p>
          <button
            onClick={() => setCurrentView('CATALOG')}
            className="bg-green-600 hover:bg-green-700 text-white px-8 py-3 rounded-full font-medium transition-colors"
          >
            Start Shopping
          </button>
        </div>
      ) : (
        <div className="flex flex-col lg:flex-row gap-8">
          {/* Cart Items */}
          <div className="flex-grow space-y-4">
            {cart.map((item) => (
              <div key={item.id} className="bg-white p-4 rounded-2xl border border-stone-100 shadow-sm flex gap-4 items-center">
                <img src={item.image} alt={item.name} className="w-20 h-20 rounded-xl object-cover bg-stone-100" />
                
                <div className="flex-grow">
                  <div className="flex justify-between items-start">
                    <h3 className="font-bold text-stone-800">{item.name}</h3>
                    <button onClick={() => removeFromCart(item.id)} className="text-stone-400 hover:text-red-500">
                      <Trash2 size={18} />
                    </button>
                  </div>
                  <p className="text-sm text-stone-500 mb-2">{item.unit} • ₹{item.price}</p>
                  
                  <div className="flex flex-wrap items-center gap-4">
                    <div className="flex items-center space-x-2 bg-stone-50 rounded-lg px-2 py-1">
                       <span className="text-xs font-bold text-stone-600">Qty: {item.quantity}</span>
                    </div>

                    <label className="flex items-center space-x-2 cursor-pointer select-none">
                      <input 
                        type="checkbox" 
                        checked={item.isSubscription}
                        onChange={() => toggleSubscription(item.id)}
                        className="w-4 h-4 text-green-600 rounded focus:ring-green-500"
                      />
                      <span className="text-xs font-medium text-stone-600">Subscribe & Save 10%</span>
                    </label>
                  </div>
                </div>
              </div>
            ))}
          </div>

          {/* Checkout Summary */}
          <div className="w-full lg:w-96">
            <div className="bg-white p-6 rounded-2xl border border-stone-100 shadow-lg sticky top-24">
              <h3 className="text-lg font-bold text-stone-800 mb-4">Order Summary</h3>
              
              <div className="space-y-3 mb-6">
                <div className="flex justify-between text-stone-600">
                  <span>Subtotal</span>
                  <span>₹{cartTotal}</span>
                </div>
                <div className="flex justify-between text-stone-600">
                  <span>Delivery</span>
                  <span>₹40</span>
                </div>
                <div className="border-t border-stone-100 pt-3 flex justify-between text-lg font-bold text-stone-900">
                  <span>Total</span>
                  <span>₹{cartTotal + 40}</span>
                </div>
              </div>

              <button className="w-full bg-stone-900 hover:bg-green-700 text-white py-4 rounded-xl font-bold transition-all shadow-md mb-3">
                Checkout
              </button>
              <p className="text-xs text-center text-stone-400">
                Secure checkout powered by PhonePe & Stripe
              </p>
            </div>
          </div>
        </div>
      )}
    </div>
  );

  const ProfileView = () => (
    <div className="max-w-5xl mx-auto px-6 py-12">
      <div className="bg-white rounded-3xl shadow-sm border border-stone-100 overflow-hidden">
        <div className="bg-green-700 h-32 relative">
          <div className="absolute -bottom-10 left-8">
            <div className="w-24 h-24 bg-white rounded-full p-1 shadow-lg">
              <img src="https://ui-avatars.com/api/?name=User&background=random" className="w-full h-full rounded-full" alt="Profile" />
            </div>
          </div>
        </div>
        
        <div className="pt-14 px-8 pb-8">
          <h2 className="text-2xl font-bold text-stone-900">Welcome back, Customer!</h2>
          <p className="text-stone-500 mb-8">Member since 2023</p>

          <div className="grid md:grid-cols-2 gap-8">
            <div>
              <h3 className="text-lg font-bold text-stone-800 mb-4 flex items-center">
                <CheckCircle className="mr-2 text-green-600" size={20} /> Active Subscriptions
              </h3>
              <div className="bg-stone-50 p-4 rounded-xl border border-stone-100">
                <p className="text-stone-600 text-sm">No active subscriptions. Go to cart to subscribe to items!</p>
              </div>
            </div>
            
            <div>
              <h3 className="text-lg font-bold text-stone-800 mb-4">Recent Orders</h3>
              <div className="space-y-3">
                <div className="flex justify-between items-center p-3 bg-white border border-stone-100 rounded-lg">
                  <div>
                    <p className="font-medium text-stone-800">#ORD-9921</p>
                    <p className="text-xs text-stone-500">Delivered on Oct 12</p>
                  </div>
                  <span className="text-green-600 font-bold">₹850</span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );

  return (
    <Layout currentView={currentView} onNavigate={setCurrentView} cartCount={cart.length}>
      <div className="animate-fade-in">
        {currentView === 'HOME' && <HomeView />}
        {currentView === 'CATALOG' && <CatalogView />}
        {currentView === 'PRODUCT_DETAIL' && <CatalogView />} {/* Simplified for demo */}
        {currentView === 'CART' && <CartView />}
        {currentView === 'PROFILE' && <ProfileView />}
        {currentView === 'ADMIN' && <AdminDashboard />}
      </div>
      <AIChat />
    </Layout>
  );
};

export default App;
