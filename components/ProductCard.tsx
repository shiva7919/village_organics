import React from 'react';
import { Plus, Check, Star } from 'lucide-react';
import { Product } from '../types';

interface ProductCardProps {
  product: Product;
  onAddToCart: (product: Product) => void;
}

const ProductCard: React.FC<ProductCardProps> = ({ product, onAddToCart }) => {
  return (
    <div className="bg-white rounded-2xl shadow-sm hover:shadow-xl transition-all duration-300 border border-stone-100 overflow-hidden flex flex-col h-full group">
      <div className="relative aspect-square overflow-hidden bg-stone-100">
        <img
          src={product.image}
          alt={product.name}
          className="w-full h-full object-cover object-center group-hover:scale-105 transition-transform duration-500"
          loading="lazy"
        />
        {product.isOrganic && (
          <div className="absolute top-3 left-3 bg-green-600/90 backdrop-blur text-white text-xs font-bold px-2 py-1 rounded-full shadow-sm flex items-center">
            <Check size={12} className="mr-1" /> Organic
          </div>
        )}
      </div>
      
      <div className="p-5 flex flex-col flex-grow">
        <div className="flex justify-between items-start mb-2">
          <div className="text-xs font-semibold text-green-600 uppercase tracking-wide">
            {product.category}
          </div>
          <div className="flex items-center text-amber-500 text-xs font-medium">
            <Star size={12} className="fill-current mr-1" />
            {product.rating}
          </div>
        </div>

        <h3 className="font-serif text-lg font-bold text-stone-800 mb-1 line-clamp-1">
          {product.name}
        </h3>
        
        <p className="text-stone-500 text-sm mb-4 line-clamp-2 flex-grow">
          {product.description}
        </p>

        <div className="flex items-center justify-between mt-auto pt-4 border-t border-stone-100">
          <div>
            <span className="text-lg font-bold text-green-800">₹{product.price}</span>
            <span className="text-sm text-stone-400"> / {product.unit}</span>
          </div>
          
          <button
            onClick={(e) => {
              e.stopPropagation();
              onAddToCart(product);
            }}
            className="bg-stone-900 hover:bg-green-600 text-white p-2.5 rounded-full shadow-sm transition-colors duration-200 flex items-center justify-center"
            aria-label="Add to cart"
          >
            <Plus size={20} />
          </button>
        </div>
      </div>
    </div>
  );
};

export default ProductCard;
