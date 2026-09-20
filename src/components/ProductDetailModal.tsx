import React, { useState } from 'react';
import { Product } from '../types';
import { ProductPouchMockup } from './ProductPouchMockup';
import {
  X,
  Star,
  ShieldCheck,
  Sprout,
  Flame,
  ChefHat,
  HeartPulse,
  Plus,
  Minus,
  ShoppingBag,
  Check,
  MapPin,
  Leaf,
  Sparkles
} from 'lucide-react';

interface ProductDetailModalProps {
  product: Product | null;
  onClose: () => void;
  onAddToCart: (product: Product, weight: string, quantity: number) => void;
}

export const ProductDetailModal: React.FC<ProductDetailModalProps> = ({
  product,
  onClose,
  onAddToCart,
}) => {
  const [selectedWeightIndex, setSelectedWeightIndex] = useState(0);
  const [quantity, setQuantity] = useState(1);
  const [activeTab, setActiveTab] = useState<'benefits' | 'cooking' | 'origin' | 'nutrition'>('benefits');
  const [justAdded, setJustAdded] = useState(false);

  if (!product) return null;

  const currentWeightOpt = product.weightOptions[selectedWeightIndex];
  const unitPrice = Math.round(product.pricePerKg * currentWeightOpt.multiplier);
  const totalPrice = unitPrice * quantity;
  const maxAvailable = product.stockQuantity > 0 ? product.stockQuantity : 20;

  const handleAdd = () => {
    onAddToCart(product, currentWeightOpt.weight, quantity);
    setJustAdded(true);
    setTimeout(() => {
      setJustAdded(false);
      onClose();
    }, 1200);
  };

  const mockupType =
    product.id === 'organic-black-rice'
      ? 'black-rice'
      : product.id === 'indrayani-white-rice'
      ? 'white-rice'
      : 'duo';

  return (
    <div
      className="fixed inset-0 z-50 flex items-center justify-center p-3 sm:p-6 bg-black/60 backdrop-blur-xs animate-in fade-in duration-200"
      id="product-detail-modal"
    >
      <div
        className="bg-[#FBF8F3] w-full max-w-4xl max-h-[92vh] rounded-3xl shadow-2xl border border-[#E6D7BD] flex flex-col overflow-hidden text-left"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Modal Top Bar */}
        <div className="px-6 py-4 border-b border-[#EADCC5] flex items-center justify-between bg-[#F4ECE1]">
          <div className="flex items-center gap-2">
            <span className="text-xs font-bold uppercase tracking-widest text-[#8C411E]">
              {product.category}
            </span>
            <span className="text-stone-400">•</span>
            <span className="text-xs font-medium text-[#1B4332]">
              Direct from Odisha Farms
            </span>
          </div>

          <button
            onClick={onClose}
            id="close-product-detail-btn"
            aria-label="Close product view"
            className="p-1.5 rounded-full hover:bg-stone-200 text-[#1B4332] transition-colors cursor-pointer"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Scrollable Modal Content */}
        <div className="flex-1 overflow-y-auto p-5 sm:p-8 space-y-8">
          <div className="grid grid-cols-1 md:grid-cols-12 gap-8 items-start">
            {/* Left: Packaging & Visual Mockup */}
            <div className="md:col-span-5 space-y-4">
              <div className="relative">
                <ProductPouchMockup
                  type={mockupType}
                  imageSrc={product.image}
                  productName={product.name}
                  className="shadow-inner"
                />

                {/* Low Stock Badge on Modal Pouch */}
                {product.stockQuantity < 5 && (
                  <div
                    id={`modal-low-stock-badge-${product.id}`}
                    className="absolute top-3 right-3 z-20 bg-[#9E2A2B] text-white text-[11px] font-bold px-3 py-1 rounded-full shadow-md flex items-center gap-1.5 border border-white/25 tracking-tight"
                  >
                    <Flame className="w-3.5 h-3.5 text-[#FFD166] fill-[#FFD166]" />
                    <span>Low Stock: Only {product.stockQuantity} Left</span>
                  </div>
                )}
              </div>

              <div className="p-4 rounded-2xl bg-[#F0E6D5] border border-[#DFCBB0] text-xs text-[#425046] space-y-2">
                <div className="font-semibold text-[#1B4332] flex items-center gap-1.5">
                  <ShieldCheck className="w-4 h-4 text-[#2D6A4F]" />
                  <span>Harvest Purity Promise</span>
                </div>
                <p>
                  Zero pesticide residue, zero synthetic nitrogen, and zero talc polish. Packaged in moisture-barrier food-grade pouches to preserve natural aroma.
                </p>
              </div>
            </div>

            {/* Right: Title, Specs & Purchase Actions */}
            <div className="md:col-span-7 space-y-5">
              <div>
                <div className="flex items-center gap-1 text-sm font-bold text-[#1B4332] mb-1">
                  <Star className="w-4 h-4 fill-[#E5A93C] text-[#E5A93C]" />
                  <span>{product.rating}</span>
                  <span className="text-[#6D7D72] font-normal">
                    ({product.reviewsCount} verified farm buyers)
                  </span>
                </div>

                <h2 className="font-serif text-2xl sm:text-3xl font-bold text-[#1B4332] leading-tight">
                  {product.name}
                </h2>
                <p className="text-sm font-medium text-[#8C411E] mt-1">
                  {product.tagline}
                </p>
              </div>

              {/* Urgency / Stock Status Notification */}
              {product.stockQuantity < 5 ? (
                <div
                  id={`modal-low-stock-alert-${product.id}`}
                  className="p-3.5 rounded-2xl bg-[#FFF3F1] border border-[#FCD5CF] flex items-center justify-between text-xs"
                >
                  <div className="flex items-center gap-2.5 text-[#9E2A2B]">
                    <span className="relative flex h-2.5 w-2.5 shrink-0">
                      <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-[#E63946] opacity-75" />
                      <span className="relative inline-flex rounded-full h-2.5 w-2.5 bg-[#D62828]" />
                    </span>
                    <span className="font-semibold leading-tight">
                      <strong className="font-bold text-[#8B1E1F]">Low Stock Alert:</strong> Only {product.stockQuantity} {product.stockQuantity === 1 ? 'pack' : 'packs'} left in this fresh harvest batch!
                    </span>
                  </div>
                  <span className="text-[10px] font-bold uppercase tracking-wider text-[#9E2A2B] bg-[#FFE0DC] px-2 py-0.5 rounded-md border border-[#F8B4AB] shrink-0 ml-2">
                    Selling Fast
                  </span>
                </div>
              ) : (
                <div className="flex items-center gap-2 text-xs text-[#2D6A4F] font-semibold bg-[#EBF5ED] border border-[#D1EBD7] px-3 py-2 rounded-xl">
                  <span className="w-2 h-2 rounded-full bg-[#2D6A4F]" />
                  <span>Fresh Harvest • In Stock ({product.stockQuantity} units ready for immediate shipping)</span>
                </div>
              )}

              <p className="text-sm text-[#404F45] leading-relaxed">
                {product.description}
              </p>

              {/* Weight Selector */}
              <div className="space-y-2">
                <label className="text-xs font-bold text-[#1B4332] block">
                  Select Pack Size:
                </label>
                <div className="grid grid-cols-3 gap-2.5">
                  {product.weightOptions.map((opt, idx) => (
                    <button
                      key={opt.weight}
                      onClick={() => setSelectedWeightIndex(idx)}
                      id={`modal-weight-btn-${idx}`}
                      className={`p-2.5 rounded-xl border text-xs font-semibold text-center transition-all cursor-pointer ${
                        selectedWeightIndex === idx
                          ? 'border-[#2D6A4F] bg-[#EBF5ED] text-[#1B4332] shadow-xs ring-1 ring-[#2D6A4F]'
                          : 'border-[#DAC8AD] bg-[#FAF6EE] text-[#526056] hover:border-[#2D6A4F]'
                      }`}
                    >
                      <div>{opt.weight}</div>
                      {opt.savings && (
                        <div className="text-[10px] text-[#2D6A4F] font-normal mt-0.5">
                          {opt.savings}
                        </div>
                      )}
                    </button>
                  ))}
                </div>
              </div>

              {/* Price & Quantity Box */}
              <div className="p-4 rounded-2xl bg-[#F4ECE1] border border-[#E3D2BA] flex items-center justify-between">
                <div>
                  <span className="text-xs text-[#6B7C71] block">Total Amount</span>
                  <div className="flex items-baseline gap-2">
                    <span className="text-3xl font-bold font-serif text-[#1B4332]">
                      ₹{totalPrice}
                    </span>
                    <span className="text-xs text-[#6B7C71]">
                      (₹{unitPrice} per {currentWeightOpt.weight})
                    </span>
                  </div>
                </div>

                {/* Counter */}
                <div className="flex items-center border border-[#CBB699] rounded-xl bg-white p-1 shadow-2xs">
                  <button
                    onClick={() => setQuantity((q) => Math.max(q - 1, 1))}
                    disabled={quantity <= 1}
                    className="w-8 h-8 flex items-center justify-center rounded-lg hover:bg-[#F4ECE1] text-[#1B4332] disabled:opacity-30 cursor-pointer"
                  >
                    <Minus className="w-4 h-4" />
                  </button>
                  <span className="w-8 text-center text-sm font-bold text-[#1B4332]">
                    {quantity}
                  </span>
                  <button
                    onClick={() => setQuantity((q) => Math.min(q + 1, maxAvailable))}
                    disabled={quantity >= maxAvailable}
                    className="w-8 h-8 flex items-center justify-center rounded-lg hover:bg-[#F4ECE1] text-[#1B4332] disabled:opacity-30 cursor-pointer"
                  >
                    <Plus className="w-4 h-4" />
                  </button>
                </div>
              </div>

              {product.stockQuantity < 5 && quantity >= maxAvailable && (
                <div className="text-[11px] text-[#9E2A2B] font-medium text-right -mt-2">
                  All {maxAvailable} remaining packs in this harvest batch are selected
                </div>
              )}

              {/* Add to Basket Action */}
              <button
                onClick={handleAdd}
                id="modal-add-to-cart-btn"
                className={`w-full py-3.5 px-6 rounded-xl font-bold text-sm sm:text-base transition-all flex items-center justify-center gap-2 cursor-pointer shadow-md ${
                  justAdded
                    ? 'bg-[#2D6A4F] text-white'
                    : 'bg-[#1B4332] hover:bg-[#2D6A4F] text-white'
                }`}
              >
                {justAdded ? (
                  <>
                    <Check className="w-5 h-5 text-[#74C69D]" />
                    <span>Added to Cart!</span>
                  </>
                ) : (
                  <>
                    <ShoppingBag className="w-5 h-5" />
                    <span>Add to Cart • ₹{totalPrice}</span>
                  </>
                )}
              </button>
            </div>
          </div>

          {/* Detailed Informational Tabs */}
          <div className="pt-4 border-t border-[#E6D7BD]">
            {/* Tab navigation */}
            <div className="flex flex-wrap gap-2 border-b border-[#E6D7BD] pb-3">
              {[
                { id: 'benefits', label: 'Health & Tasting', icon: <HeartPulse className="w-4 h-4" /> },
                { id: 'cooking', label: 'Cooking & Recipes', icon: <ChefHat className="w-4 h-4" /> },
                { id: 'origin', label: 'Odisha Farm Roots', icon: <MapPin className="w-4 h-4" /> },
                { id: 'nutrition', label: 'Nutrition Facts', icon: <Flame className="w-4 h-4" /> }
              ].map((tab) => (
                <button
                  key={tab.id}
                  onClick={() => setActiveTab(tab.id as any)}
                  id={`tab-btn-${tab.id}`}
                  className={`flex items-center gap-2 px-4 py-2 rounded-xl text-xs sm:text-sm font-semibold transition-all cursor-pointer ${
                    activeTab === tab.id
                      ? 'bg-[#1B4332] text-white shadow-xs'
                      : 'bg-[#F2ECE1] text-[#4A574E] hover:bg-[#E6D7BD]'
                  }`}
                >
                  {tab.icon}
                  <span>{tab.label}</span>
                </button>
              ))}
            </div>

            {/* Tab 1: Benefits */}
            {activeTab === 'benefits' && (
              <div className="pt-5 grid grid-cols-1 md:grid-cols-2 gap-6 animate-in fade-in duration-200">
                <div className="space-y-3">
                  <h4 className="font-serif font-bold text-base text-[#1B4332] flex items-center gap-2">
                    <HeartPulse className="w-4 h-4 text-[#B85D34]" />
                    Nutritional & Wellness Benefits
                  </h4>
                  <ul className="space-y-2 text-xs sm:text-sm text-[#3E4D43]">
                    {product.healthBenefits.map((b, i) => (
                      <li key={i} className="flex items-start gap-2">
                        <span className="w-1.5 h-1.5 rounded-full bg-[#2D6A4F] mt-1.5 shrink-0" />
                        <span>{b}</span>
                      </li>
                    ))}
                  </ul>
                </div>

                <div className="space-y-3">
                  <h4 className="font-serif font-bold text-base text-[#1B4332] flex items-center gap-2">
                    <Sparkles className="w-4 h-4 text-[#2D6A4F]" />
                    Sensory & Tasting Profile
                  </h4>
                  <ul className="space-y-2 text-xs sm:text-sm text-[#3E4D43]">
                    {product.tastingNotes.map((note, i) => (
                      <li key={i} className="flex items-start gap-2">
                        <span className="w-1.5 h-1.5 rounded-full bg-[#B85D34] mt-1.5 shrink-0" />
                        <span>{note}</span>
                      </li>
                    ))}
                  </ul>
                </div>
              </div>
            )}

            {/* Tab 2: Cooking */}
            {activeTab === 'cooking' && (
              <div className="pt-5 space-y-5 animate-in fade-in duration-200">
                <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
                  <div className="p-3 bg-white rounded-xl border border-[#E6D7BD]">
                    <span className="text-[11px] text-[#6B7B71] block">Preparation</span>
                    <span className="text-xs sm:text-sm font-bold text-[#1B4332]">{product.cookingInstructions.prepTime}</span>
                  </div>
                  <div className="p-3 bg-white rounded-xl border border-[#E6D7BD]">
                    <span className="text-[11px] text-[#6B7B71] block">Cooking Time</span>
                    <span className="text-xs sm:text-sm font-bold text-[#1B4332]">{product.cookingInstructions.cookTime}</span>
                  </div>
                  <div className="p-3 bg-white rounded-xl border border-[#E6D7BD]">
                    <span className="text-[11px] text-[#6B7B71] block">Water Ratio</span>
                    <span className="text-xs sm:text-sm font-bold text-[#1B4332]">{product.cookingInstructions.waterRatio}</span>
                  </div>
                </div>

                <div className="space-y-2">
                  <h4 className="font-serif font-bold text-base text-[#1B4332]">
                    Traditional Odia Cooking Method:
                  </h4>
                  <ol className="space-y-2 text-xs sm:text-sm text-[#3E4D43] list-decimal list-inside">
                    {product.cookingInstructions.steps.map((step, i) => (
                      <li key={i} className="pl-1 leading-relaxed">{step}</li>
                    ))}
                  </ol>
                </div>

                <div className="p-3.5 rounded-xl bg-[#EBF5ED] border border-[#C4E3CC] text-xs sm:text-sm text-[#1B4332]">
                  <strong>Grandmother's Farm Tip:</strong> {product.cookingInstructions.chefTip}
                </div>
              </div>
            )}

            {/* Tab 3: Origin */}
            {activeTab === 'origin' && (
              <div className="pt-5 grid grid-cols-1 sm:grid-cols-2 gap-4 animate-in fade-in duration-200">
                <div className="p-4 bg-white rounded-xl border border-[#E6D7BD] space-y-1">
                  <span className="text-[11px] font-bold text-[#8C411E] uppercase">Harvest District</span>
                  <p className="text-sm font-semibold text-[#1B4332]">{product.farmOrigin.region}</p>
                  <p className="text-xs text-[#627368]">{product.farmOrigin.state}</p>
                </div>
                <div className="p-4 bg-white rounded-xl border border-[#E6D7BD] space-y-1">
                  <span className="text-[11px] font-bold text-[#8C411E] uppercase">Soil Character</span>
                  <p className="text-sm font-semibold text-[#1B4332]">{product.farmOrigin.soilType}</p>
                </div>
                <div className="p-4 bg-white rounded-xl border border-[#E6D7BD] space-y-1">
                  <span className="text-[11px] font-bold text-[#8C411E] uppercase flex items-center gap-1">
                    <Sprout className="w-3.5 h-3.5 text-[#2D6A4F]" /> Organic Nourishment
                  </span>
                  <p className="text-sm font-semibold text-[#1B4332]">{product.farmOrigin.compostType}</p>
                </div>
                <div className="p-4 bg-white rounded-xl border border-[#E6D7BD] space-y-1">
                  <span className="text-[11px] font-bold text-[#8C411E] uppercase flex items-center gap-1">
                    <Leaf className="w-3.5 h-3.5 text-[#2D6A4F]" /> Botanical Pest Care
                  </span>
                  <p className="text-sm font-semibold text-[#1B4332]">{product.farmOrigin.pestCare}</p>
                </div>
              </div>
            )}

            {/* Tab 4: Nutrition */}
            {activeTab === 'nutrition' && (
              <div className="pt-5 space-y-4 animate-in fade-in duration-200">
                <div className="text-xs text-[#6B7B71]">
                  Nutritional value per {product.nutrition.servingSize} (Lab verified)
                </div>
                <div className="grid grid-cols-2 sm:grid-cols-4 gap-3">
                  <div className="p-3 bg-white rounded-xl border border-[#E6D7BD] text-center">
                    <span className="text-[11px] text-[#6B7B71] block">Energy</span>
                    <span className="text-sm font-bold text-[#1B4332]">{product.nutrition.calories}</span>
                  </div>
                  <div className="p-3 bg-white rounded-xl border border-[#E6D7BD] text-center">
                    <span className="text-[11px] text-[#6B7B71] block">Protein</span>
                    <span className="text-sm font-bold text-[#1B4332]">{product.nutrition.protein}</span>
                  </div>
                  <div className="p-3 bg-white rounded-xl border border-[#E6D7BD] text-center">
                    <span className="text-[11px] text-[#6B7B71] block">Dietary Fiber</span>
                    <span className="text-sm font-bold text-[#1B4332]">{product.nutrition.fiber}</span>
                  </div>
                  <div className="p-3 bg-white rounded-xl border border-[#E6D7BD] text-center">
                    <span className="text-[11px] text-[#6B7B71] block">Natural Iron</span>
                    <span className="text-sm font-bold text-[#1B4332]">{product.nutrition.iron}</span>
                  </div>
                </div>
                <div className="p-3 bg-[#FAF6EE] rounded-xl text-xs text-[#4E5C52]">
                  <strong>Special bioactive compounds:</strong> {product.nutrition.antioxidants}
                </div>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};
