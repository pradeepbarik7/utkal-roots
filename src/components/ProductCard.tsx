import React, { useState } from 'react';
import { Product } from '../types';
import { ProductPouchMockup } from './ProductPouchMockup';
import { Plus, Minus, ShoppingBag, Eye, Star, Check, Sparkles, Flame } from 'lucide-react';

interface ProductCardProps {
  product: Product;
  onSelectProduct: (product: Product) => void;
  onAddToCart: (product: Product, selectedWeight: string, quantity: number) => void;
}

export const ProductCard: React.FC<ProductCardProps> = ({
  product,
  onSelectProduct,
  onAddToCart,
}) => {
  const [selectedWeightIndex, setSelectedWeightIndex] = useState(0);
  const [quantity, setQuantity] = useState(1);
  const [justAdded, setJustAdded] = useState(false);

  const currentWeightOpt = product.weightOptions[selectedWeightIndex];
  const unitPrice = Math.round(product.pricePerKg * currentWeightOpt.multiplier);
  const totalPrice = unitPrice * quantity;
  const maxAvailable = product.stockQuantity > 0 ? product.stockQuantity : 20;

  const handleIncrement = () => setQuantity((q) => Math.min(q + 1, maxAvailable));
  const handleDecrement = () => setQuantity((q) => Math.max(q - 1, 1));

  const handleAdd = () => {
    onAddToCart(product, currentWeightOpt.weight, quantity);
    setJustAdded(true);
    setTimeout(() => setJustAdded(false), 1800);
  };

  const mockupType =
    product.id === 'organic-black-rice'
      ? 'black-rice'
      : product.id === 'indrayani-white-rice'
      ? 'white-rice'
      : 'duo';

  return (
    <div
      className="group bg-white rounded-3xl border border-[#E6D7BD] shadow-sm hover:shadow-xl transition-all duration-300 flex flex-col overflow-hidden text-left"
      id={`product-card-${product.id}`}
    >
      {/* Visual Header / Pouch Presentation */}
      <div className="relative p-3 pb-0">
        <div
          onClick={() => onSelectProduct(product)}
          className="cursor-pointer overflow-hidden rounded-2xl relative"
        >
          <ProductPouchMockup
            type={mockupType}
            imageSrc={product.image}
            productName={product.name}
          />

          {/* Badge */}
          {product.badge && (
            <div className="absolute top-3 left-3 bg-[#1B4332]/95 backdrop-blur-xs text-white text-[11px] font-semibold px-3 py-1 rounded-full shadow-sm flex items-center gap-1.5 border border-[#3E6F56]">
              <Sparkles className="w-3 h-3 text-[#74C69D]" />
              <span>{product.badge}</span>
            </div>
          )}

          {/* Low Stock Badge */}
          {product.stockQuantity < 5 && (
            <div
              id={`low-stock-badge-${product.id}`}
              className="absolute top-3 right-3 z-20 bg-[#9E2A2B] text-white text-[10.5px] font-bold px-2.5 py-1 rounded-full shadow-md flex items-center gap-1 border border-white/25 tracking-tight"
            >
              <Flame className="w-3 h-3 text-[#FFD166] fill-[#FFD166]" />
              <span>Low Stock: Only {product.stockQuantity} Left</span>
            </div>
          )}

          {/* Quick View Button overlay on hover */}
          <button
            onClick={(e) => {
              e.stopPropagation();
              onSelectProduct(product);
            }}
            id={`quick-view-btn-${product.id}`}
            className="absolute bottom-3 right-3 bg-white/90 hover:bg-white text-[#1B4332] text-xs font-semibold px-3 py-1.5 rounded-xl shadow-md backdrop-blur-xs transition-all flex items-center gap-1.5 cursor-pointer opacity-90 group-hover:opacity-100"
          >
            <Eye className="w-3.5 h-3.5 text-[#2D6A4F]" />
            <span>Farm Details</span>
          </button>
        </div>
      </div>

      {/* Product Information */}
      <div className="p-5 sm:p-6 flex-1 flex flex-col justify-between space-y-4">
        <div className="space-y-2">
          <div className="flex items-center justify-between">
            <span className="text-xs font-semibold tracking-wider uppercase text-[#8C411E]">
              {product.category}
            </span>
            <div className="flex items-center gap-1 text-xs font-bold text-[#1B4332]">
              <Star className="w-3.5 h-3.5 fill-[#E5A93C] text-[#E5A93C]" />
              <span>{product.rating}</span>
              <span className="text-[#78887E] font-normal">({product.reviewsCount})</span>
            </div>
          </div>

          <h3
            onClick={() => onSelectProduct(product)}
            className="font-serif font-bold text-xl text-[#1B4332] hover:text-[#2D6A4F] cursor-pointer transition-colors leading-snug"
          >
            {product.name}
          </h3>

          <p className="text-xs text-[#5C6B61] line-clamp-2 leading-relaxed">
            {product.description}
          </p>

          {/* Low Stock Notification */}
          {product.stockQuantity < 5 && (
            <div
              id={`low-stock-alert-${product.id}`}
              className="mt-2.5 flex items-center justify-between px-2.5 py-1.5 rounded-xl bg-[#FFF3F1] border border-[#FCD5CF] text-[11px]"
            >
              <div className="flex items-center gap-1.5 text-[#9E2A2B] font-semibold">
                <span className="relative flex h-2 w-2">
                  <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-[#E63946] opacity-75" />
                  <span className="relative inline-flex rounded-full h-2 w-2 bg-[#D62828]" />
                </span>
                <span>Hurry! Only {product.stockQuantity} {product.stockQuantity === 1 ? 'pack' : 'packs'} left in this batch</span>
              </div>
              <span className="text-[9.5px] font-bold uppercase tracking-wider text-[#9E2A2B] bg-[#FFE0DC] px-1.5 py-0.5 rounded border border-[#F8B4AB]">
                Selling Fast
              </span>
            </div>
          )}
        </div>

        {/* Weight Selector */}
        <div className="space-y-1.5 pt-1">
          <div className="flex items-center justify-between text-xs">
            <span className="font-semibold text-[#1B4332]">Select Package:</span>
            {currentWeightOpt.savings && (
              <span className="text-[11px] font-bold text-[#2D6A4F] bg-[#EBF5ED] px-2 py-0.5 rounded-full">
                {currentWeightOpt.savings}
              </span>
            )}
          </div>
          <div className={`grid gap-2 ${product.weightOptions.length === 2 ? 'grid-cols-2' : 'grid-cols-3'}`}>
            {product.weightOptions.map((opt, idx) => (
              <button
                key={opt.weight}
                onClick={() => setSelectedWeightIndex(idx)}
                id={`weight-btn-${product.id}-${idx}`}
                className={`py-1.5 px-2 rounded-xl text-xs font-medium border transition-all cursor-pointer text-center ${
                  selectedWeightIndex === idx
                    ? 'border-[#2D6A4F] bg-[#EBF5ED] text-[#1B4332] font-bold shadow-2xs'
                    : 'border-[#E2D4BD] bg-[#FAF6EE] text-[#556358] hover:border-[#2D6A4F]'
                }`}
              >
                {opt.weight}
              </button>
            ))}
          </div>
        </div>

        {/* Pricing & Quantity Row */}
        <div className="pt-2 border-t border-[#EFE5D3] flex items-center justify-between">
          <div>
            <span className="text-[11px] text-[#697A70] block">Price</span>
            <div className="flex items-baseline gap-1.5">
              <span className="text-2xl font-bold font-serif text-[#1B4332]">
                ₹{totalPrice}
              </span>
              {quantity > 1 && (
                <span className="text-xs text-[#697A70]">
                  (₹{unitPrice} ea)
                </span>
              )}
            </div>
          </div>

          {/* Quantity Selector (+ / -) */}
          <div className="flex items-center border border-[#D5C2A5] rounded-xl bg-[#FAF6EE] p-1">
            <button
              onClick={handleDecrement}
              disabled={quantity <= 1}
              id={`qty-minus-${product.id}`}
              aria-label="Decrease quantity"
              className="w-7 h-7 flex items-center justify-center rounded-lg hover:bg-white text-[#1B4332] disabled:opacity-30 disabled:hover:bg-transparent transition-colors cursor-pointer"
            >
              <Minus className="w-3.5 h-3.5" />
            </button>
            <span className="w-7 text-center text-xs font-bold text-[#1B4332]">
              {quantity}
            </span>
            <button
              onClick={handleIncrement}
              disabled={quantity >= maxAvailable}
              id={`qty-plus-${product.id}`}
              aria-label="Increase quantity"
              className="w-7 h-7 flex items-center justify-center rounded-lg hover:bg-white text-[#1B4332] disabled:opacity-30 disabled:hover:bg-transparent transition-colors cursor-pointer"
            >
              <Plus className="w-3.5 h-3.5" />
            </button>
          </div>
        </div>

        {/* Add to Cart & Action */}
        <div className="pt-1">
          <button
            onClick={handleAdd}
            id={`add-to-cart-${product.id}`}
            className={`w-full py-3 px-4 rounded-xl font-semibold text-sm transition-all flex items-center justify-center gap-2 cursor-pointer shadow-sm ${
              justAdded
                ? 'bg-[#2D6A4F] text-white shadow-md'
                : 'bg-[#1B4332] hover:bg-[#2D6A4F] text-white'
            }`}
          >
            {justAdded ? (
              <>
                <Check className="w-4 h-4 text-[#74C69D]" />
                <span>Added to Basket!</span>
              </>
            ) : (
              <>
                <ShoppingBag className="w-4 h-4" />
                <span>Add to Cart • ₹{totalPrice}</span>
              </>
            )}
          </button>
        </div>
      </div>
    </div>
  );
};
