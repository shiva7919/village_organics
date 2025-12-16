import React, { useState } from 'react';
import { ShoppingCart, Menu, X, Leaf, User, Search, Home } from 'lucide-react';
import { ViewState } from '../types';

interface LayoutProps {
  children: React.ReactNode;
  currentView: ViewState;
  onNavigate: (view: ViewState) => void;
  cartCount: number;
}

const Layout: React.FC<LayoutProps> = ({ children, currentView, onNavigate, cartCount }) => {
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  const NavItem = ({ view, label, icon: Icon }: { view: ViewState; label: string; icon?: any }) => (
    <button
      onClick={() => {
        onNavigate(view);
        setIsMobileMenuOpen(false);
      }}
      className={`flex items-center space-x-2 px-4 py-2 rounded-full transition-all duration-200 ${
        currentView === view
          ? 'bg-green-700 text-white shadow-md'
          : 'text-stone-600 hover:bg-green-50 hover:text-green-800'
      }`}
    >
      {Icon && <Icon size={18} />}
      <span className="font-medium">{label}</span>
    </button>
  );

  return (
    <div className="min-h-screen flex flex-col bg-stone-50">
      {/* Navbar */}
      <nav className="sticky top-0 z-50 bg-white/90 backdrop-blur-md border-b border-green-100 shadow-sm">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center h-20">
            {/* Logo */}
            <div 
              className="flex items-center cursor-pointer group"
              onClick={() => onNavigate('HOME')}
            >
              <div className="bg-green-600 p-2 rounded-lg mr-3 group-hover:bg-green-700 transition-colors">
                <Leaf className="text-white h-6 w-6" />
              </div>
              <div>
                <h1 className="text-xl font-bold text-green-900 tracking-tight leading-none">Village</h1>
                <span className="text-sm font-medium text-green-600 tracking-widest uppercase">Organics</span>
              </div>
            </div>

            {/* Desktop Navigation */}
            <div className="hidden md:flex items-center space-x-2">
              <NavItem view="HOME" label="Home" icon={Home} />
              <NavItem view="CATALOG" label="Shop" icon={Search} />
              <NavItem view="PROFILE" label="Account" icon={User} />
              <NavItem view="ADMIN" label="Admin" />
            </div>

            {/* Cart & Mobile Menu Toggle */}
            <div className="flex items-center space-x-4">
              <button 
                onClick={() => onNavigate('CART')}
                className="relative p-2 text-stone-600 hover:text-green-700 transition-colors"
              >
                <ShoppingCart className="h-6 w-6" />
                {cartCount > 0 && (
                  <span className="absolute top-0 right-0 inline-flex items-center justify-center px-2 py-1 text-xs font-bold leading-none text-white transform translate-x-1/4 -translate-y-1/4 bg-red-500 rounded-full shadow-sm">
                    {cartCount}
                  </span>
                )}
              </button>
              
              <div className="md:hidden">
                <button
                  onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
                  className="p-2 text-stone-600 hover:text-green-700 transition-colors"
                >
                  {isMobileMenuOpen ? <X className="h-6 w-6" /> : <Menu className="h-6 w-6" />}
                </button>
              </div>
            </div>
          </div>
        </div>

        {/* Mobile Menu */}
        {isMobileMenuOpen && (
          <div className="md:hidden bg-white border-b border-green-100 animate-fade-in-down">
            <div className="px-4 pt-2 pb-6 space-y-2 flex flex-col">
              <NavItem view="HOME" label="Home" icon={Home} />
              <NavItem view="CATALOG" label="Shop Products" icon={Search} />
              <NavItem view="PROFILE" label="My Account" icon={User} />
              <NavItem view="ADMIN" label="Admin Dashboard" />
            </div>
          </div>
        )}
      </nav>

      {/* Main Content */}
      <main className="flex-grow">
        {children}
      </main>

      {/* Footer */}
      <footer className="bg-stone-900 text-stone-300 py-12">
        <div className="max-w-7xl mx-auto px-4 grid grid-cols-1 md:grid-cols-4 gap-8">
          <div>
            <div className="flex items-center mb-4">
              <Leaf className="text-green-500 mr-2" />
              <span className="text-xl font-bold text-white">Village Organics</span>
            </div>
            <p className="text-sm text-stone-400">
              Farm-to-table freshness delivered to your doorstep. Supporting local farmers, promoting healthy living.
            </p>
          </div>
          <div>
            <h3 className="text-white font-semibold mb-4">Shop</h3>
            <ul className="space-y-2 text-sm">
              <li>Vegetables</li>
              <li>Fruits</li>
              <li>Dairy</li>
              <li>Subscriptions</li>
            </ul>
          </div>
          <div>
            <h3 className="text-white font-semibold mb-4">Company</h3>
            <ul className="space-y-2 text-sm">
              <li>About Us</li>
              <li>Our Farmers</li>
              <li>Contact</li>
              <li>Privacy Policy</li>
            </ul>
          </div>
          <div>
            <h3 className="text-white font-semibold mb-4">Contact</h3>
            <p className="text-sm text-stone-400 mb-2">support@villageorganics.com</p>
            <p className="text-sm text-stone-400">+1 (800) 123-4567</p>
            <div className="mt-4 flex space-x-4">
              {/* Social placeholders */}
              <div className="w-8 h-8 bg-stone-700 rounded-full hover:bg-green-600 cursor-pointer"></div>
              <div className="w-8 h-8 bg-stone-700 rounded-full hover:bg-green-600 cursor-pointer"></div>
            </div>
          </div>
        </div>
      </footer>
    </div>
  );
};

export default Layout;
