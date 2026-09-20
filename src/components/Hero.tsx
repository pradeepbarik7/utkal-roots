import React from 'react';
import { ShieldCheck, Sprout, Bug, Truck, ArrowRight, Sparkles, CheckCircle2 } from 'lucide-react';
import { Product } from '../types';
import { ProductPouchMockup } from './ProductPouchMockup';

interface HeroProps {
  products: Product[];
  onSelectProduct: (product: Product) => void;
  onAddToCart: (product: Product, weight?: string) => void;
  onExploreProducts: () => void;
  onExploreStory: () => void;
}

export const Hero: React.FC<HeroProps> = ({
  products,
  onSelectProduct,
  onAddToCart,
  onExploreProducts,
  onExploreStory,
}) => {
  const blackRice = products.find((p) => p.id === 'organic-black-rice') || products[0];
  const whiteRice = products.find((p) => p.id === 'indrayani-white-rice') || products[1];
  const duoBundle = products.find((p) => p.id === 'utkal-roots-duo-bundle') || products[2];

  const trustBadges = [
    {
      icon: <ShieldCheck className="w-5 h-5 text-[#2D6A4F]" />,
      title: '100% Organic',
      desc: 'Zero chemicals, zero synthetic sprays'
    },
    {
      icon: <Sprout className="w-5 h-5 text-[#2D6A4F]" />,
      title: 'Homemade Compost',
      desc: 'Nourished with Vedic Jeevamrut'
    },
    {
      icon: <Bug className="w-5 h-5 text-[#2D6A4F]" />,
      title: 'Neem Pest Control',
      desc: 'Ancient botanical decoctions'
    },
    {
      icon: <Truck className="w-5 h-5 text-[#2D6A4F]" />,
      title: 'Farm-to-Table',
      desc: 'Direct harvest from Odisha soil'
    }
  ];

  return (
    <section className="relative overflow-hidden pt-8 pb-16 lg:pt-14 lg:pb-24" id="hero-section">
      {/* Background earthy textures and shapes */}
      <div className="absolute top-0 right-0 -z-10 w-96 h-96 rounded-full bg-[#EBF5ED] blur-3xl opacity-70 pointer-events-none" />
      <div className="absolute bottom-0 left-0 -z-10 w-80 h-80 rounded-full bg-[#F3E8D3] blur-3xl opacity-60 pointer-events-none" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-center">
          {/* Left Column: Powerful Heritage Headline & Narrative */}
          <div className="lg:col-span-7 space-y-6 text-left">
            <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-[#E6EFE8] border border-[#C6DEC9] text-[#1B4332] text-xs sm:text-sm font-semibold tracking-wide">
              <Sparkles className="w-4 h-4 text-[#2D6A4F]" />
              <span>Authentic Harvest from Odisha Soil • Since 1998</span>
            </div>

            <h1 className="font-serif text-4xl sm:text-5xl lg:text-6xl font-bold tracking-tight text-[#1B4332] leading-[1.12]">
              Pure, Chemical-Free Food Straight from{' '}
              <span className="relative inline-block text-[#B85D34]">
                Odisha Roots
                <svg
                  className="absolute -bottom-2 left-0 w-full text-[#B85D34]/30"
                  viewBox="0 0 100 20"
                  preserveAspectRatio="none"
                  height="10"
                >
                  <path d="M0,15 Q50,0 100,15" fill="none" stroke="currentColor" strokeWidth="4" />
                </svg>
              </span>
            </h1>

            <p className="text-[#404D44] text-base sm:text-lg max-w-2xl leading-relaxed">
              We cultivate heritage grains in the sacred red-alluvial soils of Odisha using ancient Vedic compost, desi cow Jeevamrut, and natural neem pest protection. No synthetic toxins, no artificial polish—just honest, nutrient-dense harvest delivered to your family.
            </p>

            {/* CTAs */}
            <div className="flex flex-wrap items-center gap-4 pt-2">
              <button
                onClick={onExploreProducts}
                id="hero-shop-harvest-btn"
                className="px-7 py-3.5 rounded-xl bg-[#1B4332] hover:bg-[#2D6A4F] text-white font-semibold text-sm sm:text-base shadow-md hover:shadow-lg transition-all flex items-center gap-2.5 cursor-pointer group"
              >
                <span>Shop Fresh Harvest</span>
                <ArrowRight className="w-4 h-4 transition-transform group-hover:translate-x-1" />
              </button>

              <button
                onClick={onExploreStory}
                id="hero-our-story-btn"
                className="px-6 py-3.5 rounded-xl bg-[#F4ECE1] hover:bg-[#E6D7BD] text-[#1B4332] font-semibold text-sm sm:text-base border border-[#D5C1A1] transition-all cursor-pointer"
              >
                Our Compost & Neem Story
              </button>
            </div>

            {/* Quick Guarantees */}
            <div className="pt-2 flex flex-wrap gap-y-2 gap-x-6 text-xs sm:text-sm text-[#4A574E] font-medium">
              <div className="flex items-center gap-1.5">
                <CheckCircle2 className="w-4 h-4 text-[#2D6A4F]" />
                <span>Zero Pesticide Residue</span>
              </div>
              <div className="flex items-center gap-1.5">
                <CheckCircle2 className="w-4 h-4 text-[#2D6A4F]" />
                <span>Lab Tested Nutrition</span>
              </div>
              <div className="flex items-center gap-1.5">
                <CheckCircle2 className="w-4 h-4 text-[#2D6A4F]" />
                <span>Direct Farmer Fair Pricing</span>
              </div>
            </div>
          </div>

          {/* Right Column: Quick highlight of our two main products */}
          <div className="lg:col-span-5">
            <div className="bg-[#F6EFE3]/80 backdrop-blur-xs rounded-3xl p-5 sm:p-7 border border-[#E3D4BC] shadow-xl space-y-5">
              <div className="flex items-center justify-between pb-3 border-b border-[#E3D4BC]">
                <div>
                  <h3 className="font-serif font-bold text-lg text-[#1B4332]">Featured Harvest Grains</h3>
                  <p className="text-xs text-[#606E64]">Directly packaged in rural Odisha</p>
                </div>
                <span className="text-[11px] font-semibold px-2.5 py-1 bg-[#E1EFE4] text-[#1B4332] rounded-full border border-[#C2DEC8]">
                  Fresh Crop 2026
                </span>
              </div>

              {/* Product 1: Organic Black Rice */}
              <div
                onClick={() => onSelectProduct(blackRice)}
                id="hero-card-black-rice"
                className="group bg-white rounded-2xl p-4 border border-[#E3D4BC] hover:border-[#2D6A4F] transition-all shadow-xs hover:shadow-md cursor-pointer flex gap-4 items-center"
              >
                <div className="w-20 h-20 shrink-0 rounded-xl overflow-hidden shadow-xs border border-[#E3D4BC]">
                  <ProductPouchMockup
                    type="black-rice"
                    imageSrc={blackRice.image}
                    productName={blackRice.name}
                    className="w-full h-full p-1"
                  />
                </div>

                <div className="flex-1 min-w-0">
                  <div className="flex items-center justify-between">
                    <div className="flex items-center gap-1.5">
                      <span className="text-[10px] font-bold uppercase tracking-wider text-[#8C411E]">Ancient Superfood</span>
                      {blackRice.stockQuantity < 5 && (
                        <span className="text-[9px] font-bold text-[#9E2A2B] bg-[#FFF0EE] border border-[#FCD5CF] px-1.5 py-0.5 rounded-full flex items-center gap-1">
                          <span className="w-1.5 h-1.5 rounded-full bg-[#D62828] animate-pulse" />
                          Low Stock: {blackRice.stockQuantity} left
                        </span>
                      )}
                    </div>
                    <span className="text-sm font-bold text-[#1B4332]">₹{blackRice.pricePerKg} <span className="text-[10px] font-normal text-[#606E64]">/ kg</span></span>
                  </div>
                  <h4 className="font-serif font-bold text-sm sm:text-base text-[#1B4332] group-hover:text-[#2D6A4F] truncate transition-colors">
                    Organic Black Rice
                  </h4>
                  <p className="text-xs text-[#59665D] line-clamp-1 mt-0.5">
                    Antioxidant-dense purple grains, low GI, fragrant nutty taste.
                  </p>
                  <div className="mt-2 flex items-center justify-between">
                    <span className="text-[11px] text-[#2D6A4F] font-semibold underline underline-offset-2">
                      View details & benefits →
                    </span>
                    <button
                      type="button"
                      onClick={(e) => {
                        e.stopPropagation();
                        onAddToCart(blackRice);
                      }}
                      id="hero-quick-add-black-rice"
                      className="px-2.5 py-1 text-xs font-semibold bg-[#1B4332] hover:bg-[#2D6A4F] text-white rounded-lg transition-colors cursor-pointer"
                    >
                      + Add
                    </button>
                  </div>
                </div>
              </div>

              {/* Product 2: Odisha Indrayani-Style Rice */}
              <div
                onClick={() => onSelectProduct(whiteRice)}
                id="hero-card-white-rice"
                className="group bg-white rounded-2xl p-4 border border-[#E3D4BC] hover:border-[#2D6A4F] transition-all shadow-xs hover:shadow-md cursor-pointer flex gap-4 items-center"
              >
                <div className="w-20 h-20 shrink-0 rounded-xl overflow-hidden shadow-xs border border-[#E3D4BC]">
                  <ProductPouchMockup
                    type="white-rice"
                    imageSrc={whiteRice.image}
                    productName={whiteRice.name}
                    className="w-full h-full p-1"
                  />
                </div>

                <div className="flex-1 min-w-0">
                  <div className="flex items-center justify-between">
                    <div className="flex items-center gap-1.5">
                      <span className="text-[10px] font-bold uppercase tracking-wider text-[#B85D34]">Fragrant Heritage</span>
                      {whiteRice.stockQuantity < 5 && (
                        <span className="text-[9px] font-bold text-[#9E2A2B] bg-[#FFF0EE] border border-[#FCD5CF] px-1.5 py-0.5 rounded-full flex items-center gap-1">
                          <span className="w-1.5 h-1.5 rounded-full bg-[#D62828] animate-pulse" />
                          Low Stock: {whiteRice.stockQuantity} left
                        </span>
                      )}
                    </div>
                    <span className="text-sm font-bold text-[#1B4332]">₹{whiteRice.pricePerKg} <span className="text-[10px] font-normal text-[#606E64]">/ kg</span></span>
                  </div>
                  <h4 className="font-serif font-bold text-sm sm:text-base text-[#1B4332] group-hover:text-[#2D6A4F] truncate transition-colors">
                    Odisha Indrayani-Style Rice
                  </h4>
                  <p className="text-xs text-[#59665D] line-clamp-1 mt-0.5">
                    Thick, plump grains with intoxicating floral aroma.
                  </p>
                  <div className="mt-2 flex items-center justify-between">
                    <span className="text-[11px] text-[#2D6A4F] font-semibold underline underline-offset-2">
                      View details & benefits →
                    </span>
                    <button
                      type="button"
                      onClick={(e) => {
                        e.stopPropagation();
                        onAddToCart(whiteRice);
                      }}
                      id="hero-quick-add-white-rice"
                      className="px-2.5 py-1 text-xs font-semibold bg-[#1B4332] hover:bg-[#2D6A4F] text-white rounded-lg transition-colors cursor-pointer"
                    >
                      + Add
                    </button>
                  </div>
                </div>
              </div>

              {/* Duo Banner mini prompt */}
              <div
                onClick={() => duoBundle && onSelectProduct(duoBundle)}
                id="hero-duo-bundle-prompt"
                className="p-3 bg-[#EAF3EC] hover:bg-[#DEEFE1] rounded-xl border border-[#C6DFC9] hover:border-[#2D6A4F] flex items-center justify-between text-xs cursor-pointer transition-all"
              >
                <div className="flex items-center gap-2">
                  <span className="text-[#1B4332] font-medium">
                    Want both? Try our <strong>Heritage Duo Bundle</strong> (2 kg)
                  </span>
                  {duoBundle && duoBundle.stockQuantity < 5 && (
                    <span className="text-[9px] font-bold text-[#9E2A2B] bg-[#FFF0EE] border border-[#FCD5CF] px-1.5 py-0.5 rounded-full flex items-center gap-1">
                      <span className="w-1.5 h-1.5 rounded-full bg-[#D62828] animate-pulse" />
                      Only {duoBundle.stockQuantity} left
                    </span>
                  )}
                </div>
                <span className="font-bold text-[#2D6A4F] bg-white px-2 py-0.5 rounded shadow-2xs border border-[#C6DFC9]">
                  ₹400
                </span>
              </div>
            </div>
          </div>
        </div>

        {/* Four Trust Badges Grid */}
        <div className="mt-14 pt-10 border-t border-[#E8DFC8] grid grid-cols-2 md:grid-cols-4 gap-4 sm:gap-6">
          {trustBadges.map((badge, idx) => (
            <div
              key={idx}
              className="bg-white/70 backdrop-blur-xs p-4 sm:p-5 rounded-2xl border border-[#EADBCC] flex items-start gap-3.5 shadow-2xs hover:shadow-xs transition-shadow"
            >
              <div className="p-2.5 rounded-xl bg-[#EBF5ED] shrink-0 border border-[#D0EADB]">
                {badge.icon}
              </div>
              <div className="text-left">
                <h4 className="font-serif font-bold text-sm sm:text-base text-[#1B4332]">
                  {badge.title}
                </h4>
                <p className="text-xs text-[#5D6B61] mt-0.5">
                  {badge.desc}
                </p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};
