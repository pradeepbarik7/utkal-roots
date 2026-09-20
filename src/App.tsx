/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React, { useState, useEffect } from 'react';
import { Product, CartItem, CustomerReview, CheckoutFormData, Order, PolicyType } from './types';
import { PRODUCTS } from './data/products';
import { REVIEWS } from './data/reviews';

// Components
import { Header } from './components/Header';
import { Hero } from './components/Hero';
import { ProductCard } from './components/ProductCard';
import { ProductDetailModal } from './components/ProductDetailModal';
import { CartDrawer } from './components/CartDrawer';
import { CheckoutModal } from './components/CheckoutModal';
import { RazorpayModal } from './components/RazorpayModal';
import { OrderConfirmationModal } from './components/OrderConfirmationModal';
import { OurStory } from './components/OurStory';
import { Sustainability } from './components/Sustainability';
import { ReviewsSection } from './components/ReviewsSection';
import { ContactSection } from './components/ContactSection';
import { PolicyModal } from './components/PolicyModal';
import { Footer } from './components/Footer';
import { ToastNotification } from './components/ToastNotification';

import { Sprout, Filter, ShieldCheck, Sparkles, MessageCircle, HeartHandshake } from 'lucide-react';

export default function App() {
  // Navigation active section
  const [activeSection, setActiveSection] = useState<string>('home');

  // Products & Reviews state
  const [products] = useState<Product[]>(PRODUCTS);
  const [reviews, setReviews] = useState<CustomerReview[]>(() => {
    const saved = localStorage.getItem('utkal_roots_reviews');
    return saved ? JSON.parse(saved) : REVIEWS;
  });

  // Cart state
  const [cart, setCart] = useState<CartItem[]>(() => {
    const saved = localStorage.getItem('utkal_roots_cart');
    return saved ? JSON.parse(saved) : [];
  });

  // Discounts & Coupons
  const [couponCode, setCouponCode] = useState<string>('');
  const [discountAmount, setDiscountAmount] = useState<number>(0);

  // Active Modals & Drawer States
  const [isCartOpen, setIsCartOpen] = useState(false);
  const [selectedProduct, setSelectedProduct] = useState<Product | null>(null);
  const [isCheckoutOpen, setIsCheckoutOpen] = useState(false);
  const [isRazorpayOpen, setIsRazorpayOpen] = useState(false);
  const [activePolicy, setActivePolicy] = useState<PolicyType | null>(null);
  const [pendingCustomerData, setPendingCustomerData] = useState<CheckoutFormData | null>(null);
  const [completedOrder, setCompletedOrder] = useState<Order | null>(null);

  // Filter for product catalogue
  const [activeCategory, setActiveCategory] = useState<string>('all');

  // Toast feedback
  const [toastMessage, setToastMessage] = useState<string | null>(null);

  // Save Cart & Reviews to local storage
  useEffect(() => {
    localStorage.setItem('utkal_roots_cart', JSON.stringify(cart));
  }, [cart]);

  useEffect(() => {
    localStorage.setItem('utkal_roots_reviews', JSON.stringify(reviews));
  }, [reviews]);

  // Cart Calculations
  const cartSubtotal = cart.reduce((sum, item) => sum + item.price * item.quantity, 0);
  const freeShippingThreshold = 499;
  const rawShipping = cartSubtotal >= freeShippingThreshold || cartSubtotal === 0 ? 0 : 50;
  const shippingFee = couponCode.toLowerCase() === 'firstfarm' ? 0 : rawShipping;
  const cartTotal = Math.max(0, cartSubtotal - discountAmount + shippingFee);
  const cartCount = cart.reduce((sum, item) => sum + item.quantity, 0);

  // Handlers
  const handleAddToCart = (product: Product, weight?: string, qty: number = 1) => {
    const chosenWeight = weight || product.weightOptions[0].weight;
    const weightOpt = product.weightOptions.find((w) => w.weight === chosenWeight) || product.weightOptions[0];
    const unitPrice = Math.round(product.pricePerKg * weightOpt.multiplier);
    const cartItemId = `${product.id}-${chosenWeight}`;

    setCart((prev) => {
      const existing = prev.find((item) => item.id === cartItemId);
      if (existing) {
        return prev.map((item) =>
          item.id === cartItemId
            ? { ...item, quantity: item.quantity + qty }
            : item
        );
      }
      return [
        ...prev,
        {
          id: cartItemId,
          productId: product.id,
          name: product.name,
          weight: chosenWeight,
          price: unitPrice,
          quantity: qty,
          image: product.image,
        }
      ];
    });

    setToastMessage(`Added ${qty} × ${product.name} (${chosenWeight}) to basket`);
    setTimeout(() => setToastMessage(null), 3500);
  };

  const handleUpdateCartQuantity = (id: string, newQty: number) => {
    if (newQty <= 0) {
      handleRemoveCartItem(id);
      return;
    }
    setCart((prev) =>
      prev.map((item) => (item.id === id ? { ...item, quantity: newQty } : item))
    );
  };

  const handleRemoveCartItem = (id: string) => {
    setCart((prev) => prev.filter((item) => item.id !== id));
    setToastMessage('Item removed from cart');
    setTimeout(() => setToastMessage(null), 2500);
  };

  const handleApplyCoupon = (code: string): boolean => {
    const formatted = code.trim().toUpperCase();
    if (formatted === 'UTKAL10') {
      const disc = Math.round(cartSubtotal * 0.1);
      setDiscountAmount(disc);
      setCouponCode('UTKAL10');
      setToastMessage('Coupon UTKAL10 applied: 10% Farm Discount!');
      return true;
    } else if (formatted === 'FIRSTFARM') {
      setDiscountAmount(0);
      setCouponCode('FIRSTFARM');
      setToastMessage('Coupon FIRSTFARM applied: Free Farm Courier!');
      return true;
    }
    return false;
  };

  const handleProceedToCheckout = () => {
    setIsCartOpen(false);
    setIsCheckoutOpen(true);
  };

  const handleCheckoutFormSubmit = (data: CheckoutFormData) => {
    setPendingCustomerData(data);
    setIsCheckoutOpen(false);
    setIsRazorpayOpen(true);
  };

  const handlePaymentSuccess = (paymentId: string) => {
    setIsRazorpayOpen(false);

    if (pendingCustomerData) {
      const randomOrderNum = Math.floor(10000 + Math.random() * 90000);
      const newOrder: Order = {
        orderId: `UR-OD-${randomOrderNum}`,
        customer: pendingCustomerData,
        items: [...cart],
        subtotal: cartSubtotal,
        shipping: shippingFee,
        discount: discountAmount,
        total: cartTotal,
        paymentId,
        date: new Date().toLocaleDateString('en-IN', {
          day: 'numeric',
          month: 'short',
          year: 'numeric',
        }),
        status: 'confirmed',
        estimatedDelivery: '3 - 5 Business Days',
      };

      setCompletedOrder(newOrder);
      setCart([]);
      setDiscountAmount(0);
      setCouponCode('');
      setPendingCustomerData(null);
      setToastMessage(`Payment Verified! Order ${newOrder.orderId} Confirmed`);
    }
  };

  const handleAddReview = (newRev: Omit<CustomerReview, 'id' | 'date' | 'verified'>) => {
    const fullReview: CustomerReview = {
      ...newRev,
      id: `rev-${Date.now()}`,
      date: 'Just now',
      verified: true,
    };
    setReviews([fullReview, ...reviews]);
    setToastMessage('Thank you! Your verified review has been posted.');
  };

  const handleNavigate = (sectionId: string) => {
    setActiveSection(sectionId);
    const targetMap: Record<string, string> = {
      home: 'hero-section',
      products: 'products-catalogue',
      story: 'our-story-section',
      sustainability: 'sustainability-section',
      reviews: 'reviews-section',
      contact: 'contact-section',
    };
    const elementId = targetMap[sectionId] || sectionId;
    const el = document.getElementById(elementId);
    if (el) {
      el.scrollIntoView({ behavior: 'smooth' });
    }
  };

  const filteredProducts =
    activeCategory === 'all'
      ? products
      : products.filter((p) =>
          activeCategory === 'rice'
            ? p.category.toLowerCase().includes('rice')
            : p.category.toLowerCase().includes('bundle')
        );

  return (
    <div className="min-h-screen bg-[#FBF8F3] text-[#2C3E35] flex flex-col selection:bg-[#2D6A4F] selection:text-white font-sans">
      {/* Top Banner */}
      <div className="bg-[#1B4332] text-[#E8F5E9] py-1.5 px-4 text-center text-[11px] sm:text-xs font-medium flex items-center justify-center gap-2 border-b border-[#2D6A4F]">
        <Sparkles className="w-3.5 h-3.5 text-[#52B788]" />
        <span>Fresh 2026 Harvest from Odisha • Use code <strong>UTKAL10</strong> for 10% off</span>
        <span className="hidden sm:inline text-[#74C69D]">| Free shipping on orders over ₹499</span>
      </div>

      {/* Primary Sticky Header */}
      <Header
        cartCount={cartCount}
        onOpenCart={() => setIsCartOpen(true)}
        activeSection={activeSection}
        onNavigate={handleNavigate}
        onOpenPolicy={(type) => setActivePolicy(type)}
      />

      {/* Main Content Sections */}
      <main className="flex-1">
        {/* Hero Section with Product Highlights & Trust Badges */}
        <Hero
          products={products}
          onSelectProduct={(p) => setSelectedProduct(p)}
          onAddToCart={(p, weight) => handleAddToCart(p, weight)}
          onExploreProducts={() => handleNavigate('products-catalogue')}
          onExploreStory={() => handleNavigate('our-story-section')}
        />

        {/* Product Catalogue Section */}
        <section className="py-16 lg:py-24 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8" id="products-catalogue">
          <div className="flex flex-col md:flex-row md:items-end justify-between gap-6 mb-12 text-left">
            <div className="space-y-3">
              <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-[#EBF5ED] text-[#1B4332] text-xs font-bold uppercase tracking-wider border border-[#CDE5D3]">
                <Sprout className="w-3.5 h-3.5 text-[#2D6A4F]" />
                <span>Our Heritage Grain Store</span>
              </div>
              <h2 className="font-serif text-3xl sm:text-4xl lg:text-5xl font-bold text-[#1B4332]">
                Chemical-Free Odisha Harvest
              </h2>
              <p className="text-[#516155] text-sm sm:text-base max-w-xl">
                Unpolished, pesticide-free, and packaged fresh in moisture-barrier pouches. Select your preferred quantity for farm delivery.
              </p>
            </div>

            {/* Filter Pills */}
            <div className="flex items-center gap-2 p-1 bg-[#F0E6D5] rounded-2xl border border-[#DFCBB0] self-start md:self-auto">
              {[
                { id: 'all', label: 'All Harvests' },
                { id: 'rice', label: 'Heirloom Rice' },
                { id: 'bundle', label: 'Bundles & Duos' }
              ].map((tab) => (
                <button
                  key={tab.id}
                  onClick={() => setActiveCategory(tab.id)}
                  id={`filter-tab-${tab.id}`}
                  className={`px-4 py-2 rounded-xl text-xs font-semibold transition-all cursor-pointer ${
                    activeCategory === tab.id
                      ? 'bg-[#1B4332] text-white shadow-xs'
                      : 'text-[#4E5D52] hover:text-[#1B4332]'
                  }`}
                >
                  {tab.label}
                </button>
              ))}
            </div>
          </div>

          {/* Product Cards Grid */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {filteredProducts.map((product) => (
              <ProductCard
                key={product.id}
                product={product}
                onSelectProduct={(p) => setSelectedProduct(p)}
                onAddToCart={(p, weight, qty) => handleAddToCart(p, weight, qty)}
              />
            ))}
          </div>

          {/* Custom Bulk Ordering Banner */}
          <div className="mt-14 p-6 sm:p-8 rounded-3xl bg-white border border-[#E6D7BD] shadow-xs flex flex-col sm:flex-row items-center justify-between gap-6 text-left">
            <div className="space-y-1">
              <h3 className="font-serif font-bold text-lg text-[#1B4332]">
                Need 25 kg+ for Family Events, Ayurvedic Centers, or Restaurants?
              </h3>
              <p className="text-xs sm:text-sm text-[#5C6E62]">
                We provide custom burlap sack packing and subsidized bulk farm transport direct from Odisha.
              </p>
            </div>
            <a
              href="https://wa.me/918390155321?text=Hi%20Utkal%20Roots,%20I%20am%20interested%20in%20bulk%20orders%20for%20organic%20black%20rice%20and%20indrayani%20rice."
              target="_blank"
              rel="noopener noreferrer"
              className="px-6 py-3 rounded-xl bg-[#1B4332] hover:bg-[#2D6A4F] text-white text-xs sm:text-sm font-bold transition-colors whitespace-nowrap flex items-center gap-2 cursor-pointer shrink-0"
            >
              <MessageCircle className="w-4 h-4 text-[#74C69D]" />
              <span>Inquire Bulk Pricing</span>
            </a>
          </div>
        </section>

        {/* Our Story: Compost, Jeevamrut & Neem Care */}
        <OurStory />

        {/* Sustainability & River Ecology */}
        <Sustainability />

        {/* Verified Customer Reviews */}
        <ReviewsSection
          reviews={reviews}
          onAddReview={handleAddReview}
        />

        {/* Direct Farm Contact Section */}
        <ContactSection />
      </main>

      {/* Comprehensive Footer */}
      <Footer
        onNavigate={handleNavigate}
        onOpenPolicy={(type) => setActivePolicy(type)}
      />

      {/* Slide-out Cart Drawer */}
      <CartDrawer
        isOpen={isCartOpen}
        onClose={() => setIsCartOpen(false)}
        items={cart}
        onUpdateQuantity={handleUpdateCartQuantity}
        onRemoveItem={handleRemoveCartItem}
        onProceedToCheckout={handleProceedToCheckout}
        discount={discountAmount}
        couponCode={couponCode}
        onApplyCoupon={handleApplyCoupon}
      />

      {/* Product Detail Modal */}
      <ProductDetailModal
        product={selectedProduct}
        onClose={() => setSelectedProduct(null)}
        onAddToCart={(p, weight, qty) => handleAddToCart(p, weight, qty)}
      />

      {/* Checkout Form Modal */}
      <CheckoutModal
        isOpen={isCheckoutOpen}
        onClose={() => setIsCheckoutOpen(false)}
        items={cart}
        subtotal={cartSubtotal}
        shipping={shippingFee}
        discount={discountAmount}
        total={cartTotal}
        onSubmitCheckout={handleCheckoutFormSubmit}
      />

      {/* Mock Razorpay Integration Modal */}
      <RazorpayModal
        isOpen={isRazorpayOpen}
        onClose={() => setIsRazorpayOpen(false)}
        amount={cartTotal}
        customerData={pendingCustomerData}
        onPaymentSuccess={handlePaymentSuccess}
      />

      {/* Order Confirmation Receipt Modal */}
      <OrderConfirmationModal
        order={completedOrder}
        onClose={() => setCompletedOrder(null)}
      />

      {/* Policy Documents Modal */}
      <PolicyModal
        policyType={activePolicy}
        onClose={() => setActivePolicy(null)}
      />

      {/* Toast Feedback */}
      <ToastNotification
        message={toastMessage}
        onClose={() => setToastMessage(null)}
        onOpenCart={() => setIsCartOpen(true)}
      />
    </div>
  );
}
