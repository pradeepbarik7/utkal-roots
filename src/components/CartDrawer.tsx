import React, { useState } from 'react';
import { CartItem } from '../types';
import { PRODUCTS } from '../data/products';
import { X, Trash2, Plus, Minus, ShoppingBag, ArrowRight, Tag, ShieldCheck, Truck, Flame } from 'lucide-react';

interface CartDrawerProps {
  isOpen: boolean;
  onClose: () => void;
  items: CartItem[];
  onUpdateQuantity: (id: string, newQty: number) => void;
  onRemoveItem: (id: string) => void;
  onProceedToCheckout: () => void;
  discount: number;
  onApplyCoupon: (code: string) => boolean;
  couponCode: string;
}

export const CartDrawer: React.FC<CartDrawerProps> = ({
  isOpen,
  onClose,
  items,
  onUpdateQuantity,
  onRemoveItem,
  onProceedToCheckout,
  discount,
  onApplyCoupon,
  couponCode,
}) => {
  const [couponInput, setCouponInput] = useState('');
  const [couponError, setCouponError] = useState('');
  const [couponSuccess, setCouponSuccess] = useState(false);

  if (!isOpen) return null;

  const subtotal = items.reduce((acc, item) => acc + item.price * item.quantity, 0);
  const freeShippingThreshold = 499;
  const rawShipping = subtotal >= freeShippingThreshold || subtotal === 0 ? 0 : 50;
  const shipping = couponCode.toLowerCase() === 'firstfarm' ? 0 : rawShipping;
  const total = Math.max(0, subtotal - discount + shipping);

  const amountNeededForFreeShipping = Math.max(0, freeShippingThreshold - subtotal);

  const handleApplyCoupon = (e: React.FormEvent) => {
    e.preventDefault();
    setCouponError('');
    if (!couponInput.trim()) return;

    const valid = onApplyCoupon(couponInput.trim());
    if (valid) {
      setCouponSuccess(true);
      setCouponInput('');
    } else {
      setCouponError('Invalid promo code. Try UTKAL10 or FIRSTFARM');
    }
  };

  return (
    <div
      className="fixed inset-0 z-50 overflow-hidden bg-black/60 backdrop-blur-xs animate-in fade-in duration-200"
      id="cart-drawer-overlay"
    >
      <div className="absolute inset-y-0 right-0 max-w-full flex pl-10">
        <div
          className="w-screen max-w-md bg-[#FBF8F3] border-l border-[#E6D7BD] shadow-2xl flex flex-col text-left animate-in slide-in-from-right duration-300"
          onClick={(e) => e.stopPropagation()}
        >
          {/* Header */}
          <div className="p-5 border-b border-[#E6D7BD] bg-[#F4ECE1] flex items-center justify-between">
            <div className="flex items-center gap-2.5">
              <ShoppingBag className="w-5 h-5 text-[#1B4332]" />
              <h3 className="font-serif font-bold text-lg text-[#1B4332]">
                Your Farm Basket ({items.reduce((sum, i) => sum + i.quantity, 0)})
              </h3>
            </div>
            <button
              onClick={onClose}
              id="close-cart-btn"
              aria-label="Close cart"
              className="p-1.5 rounded-full hover:bg-stone-200 text-[#1B4332] transition-colors cursor-pointer"
            >
              <X className="w-5 h-5" />
            </button>
          </div>

          {/* Free Shipping Progress Indicator */}
          <div className="px-5 py-2.5 bg-[#EBF5ED] border-b border-[#D1EBD7] text-xs">
            {amountNeededForFreeShipping > 0 ? (
              <div className="space-y-1">
                <div className="flex items-center justify-between text-[#1B4332] font-medium">
                  <span className="flex items-center gap-1.5">
                    <Truck className="w-3.5 h-3.5 text-[#2D6A4F]" />
                    Add ₹{amountNeededForFreeShipping} more for <strong>FREE Odisha Express Shipping</strong>
                  </span>
                </div>
                <div className="w-full h-1.5 bg-[#D1EBD7] rounded-full overflow-hidden">
                  <div
                    className="h-full bg-[#2D6A4F] rounded-full transition-all duration-300"
                    style={{ width: `${Math.min(100, (subtotal / freeShippingThreshold) * 100)}%` }}
                  />
                </div>
              </div>
            ) : (
              <div className="flex items-center gap-1.5 text-[#1B4332] font-semibold">
                <Truck className="w-3.5 h-3.5 text-[#2D6A4F]" />
                <span>🎉 Free Farm Express Shipping unlocked!</span>
              </div>
            )}
          </div>

          {/* Cart Items List */}
          <div className="flex-1 overflow-y-auto p-5 space-y-4">
            {items.length === 0 ? (
              <div className="h-full flex flex-col items-center justify-center text-center space-y-4 py-12">
                <div className="w-16 h-16 rounded-full bg-[#F4ECE1] border border-[#DFCBB0] flex items-center justify-center">
                  <ShoppingBag className="w-8 h-8 text-[#A89279]" />
                </div>
                <div className="space-y-1">
                  <h4 className="font-serif font-bold text-lg text-[#1B4332]">Your Basket is Empty</h4>
                  <p className="text-xs text-[#6B7B71] max-w-xs">
                    Explore our organic Black Rice and Indrayani-style aromatic rice harvested from Odisha soil.
                  </p>
                </div>
                <button
                  onClick={onClose}
                  className="px-5 py-2.5 rounded-xl bg-[#1B4332] text-white text-xs font-semibold hover:bg-[#2D6A4F] transition-colors cursor-pointer"
                >
                  Browse Harvest
                </button>
              </div>
            ) : (
              items.map((item) => {
                const product = PRODUCTS.find((p) => p.id === item.productId);
                const maxAvailable = product?.stockQuantity ? product.stockQuantity : 20;

                return (
                  <div
                    key={item.id}
                    className="p-3.5 rounded-2xl bg-white border border-[#E6D7BD] shadow-2xs flex gap-3.5 items-center"
                    id={`cart-item-${item.id}`}
                  >
                    <div className="w-16 h-16 rounded-xl bg-[#F4ECE1] p-1.5 shrink-0 flex items-center justify-center border border-[#E3D3BD] overflow-hidden">
                      <span className="text-[10px] font-serif font-bold text-center leading-tight text-[#1B4332]">
                        {item.name.includes('Black') ? 'Black Rice' : item.name.includes('Duo') ? 'Duo Pack' : 'Indrayani'}
                      </span>
                    </div>

                    <div className="flex-1 min-w-0">
                      <div className="flex items-start justify-between gap-1">
                        <div>
                          <h4 className="font-serif font-bold text-sm text-[#1B4332] truncate">
                            {item.name}
                          </h4>
                          <div className="flex items-center gap-1.5 flex-wrap mt-0.5">
                            <span className="text-[11px] font-medium text-[#8C411E]">
                              Pack: {item.weight}
                            </span>
                            {product && product.stockQuantity < 5 && (
                              <span className="inline-flex items-center gap-1 text-[9.5px] font-bold text-[#9E2A2B] bg-[#FFF2F0] border border-[#FCD5CF] px-1.5 py-0.2 rounded-sm">
                                <Flame className="w-2.5 h-2.5 text-[#E63946] fill-[#E63946]" />
                                Only {product.stockQuantity} left
                              </span>
                            )}
                          </div>
                        </div>
                        <button
                          onClick={() => onRemoveItem(item.id)}
                          id={`remove-item-${item.id}`}
                          aria-label="Remove item"
                          className="text-stone-400 hover:text-red-600 transition-colors p-1 cursor-pointer"
                        >
                          <Trash2 className="w-4 h-4" />
                        </button>
                      </div>

                      <div className="mt-2 flex items-center justify-between">
                        <span className="text-sm font-bold text-[#1B4332]">
                          ₹{item.price * item.quantity}
                        </span>

                        {/* Item Qty Controls */}
                        <div className="flex items-center border border-[#D8C7B0] rounded-lg bg-[#FAF6EE] p-0.5">
                          <button
                            onClick={() => onUpdateQuantity(item.id, item.quantity - 1)}
                            className="w-6 h-6 flex items-center justify-center text-[#1B4332] hover:bg-white rounded transition-colors cursor-pointer"
                            aria-label="Decrease quantity"
                          >
                            <Minus className="w-3 h-3" />
                          </button>
                          <span className="w-6 text-center text-xs font-bold text-[#1B4332]">
                            {item.quantity}
                          </span>
                          <button
                            onClick={() => onUpdateQuantity(item.id, item.quantity + 1)}
                            disabled={item.quantity >= maxAvailable}
                            className="w-6 h-6 flex items-center justify-center text-[#1B4332] hover:bg-white rounded disabled:opacity-30 transition-colors cursor-pointer"
                            aria-label="Increase quantity"
                          >
                            <Plus className="w-3 h-3" />
                          </button>
                        </div>
                      </div>
                    </div>
                  </div>
                );
              })
            )}
          </div>

          {/* Footer & Checkout Trigger */}
          {items.length > 0 && (
            <div className="p-5 border-t border-[#E6D7BD] bg-[#F4ECE1] space-y-4">
              {/* Promo code form */}
              <form onSubmit={handleApplyCoupon} className="space-y-1.5">
                <div className="flex gap-2">
                  <div className="relative flex-1">
                    <Tag className="w-3.5 h-3.5 absolute left-3 top-3 text-[#7B8B81]" />
                    <input
                      type="text"
                      value={couponInput}
                      onChange={(e) => setCouponInput(e.target.value)}
                      placeholder="Promo code (UTKAL10)"
                      className="w-full pl-8 pr-3 py-2 text-xs rounded-xl bg-white border border-[#D5C2A5] focus:outline-hidden focus:border-[#2D6A4F] uppercase tracking-wider"
                    />
                  </div>
                  <button
                    type="submit"
                    className="px-4 py-2 bg-[#1B4332] text-white text-xs font-semibold rounded-xl hover:bg-[#2D6A4F] transition-colors cursor-pointer"
                  >
                    Apply
                  </button>
                </div>
                {couponError && <p className="text-[11px] text-red-600">{couponError}</p>}
                {couponSuccess && (
                  <p className="text-[11px] text-[#2D6A4F] font-semibold">
                    Code applied successfully!
                  </p>
                )}
                {couponCode && !couponSuccess && (
                  <div className="flex items-center justify-between text-[11px] text-[#2D6A4F] font-medium bg-[#EAF5ED] px-2 py-1 rounded-lg">
                    <span>Applied: <strong>{couponCode.toUpperCase()}</strong></span>
                    <span>-₹{discount}</span>
                  </div>
                )}
              </form>

              {/* Order Calculations */}
              <div className="space-y-2 text-xs pt-1 border-t border-[#E2D1B8]">
                <div className="flex justify-between text-[#5C6B61]">
                  <span>Subtotal</span>
                  <span className="font-semibold text-[#1B4332]">₹{subtotal}</span>
                </div>

                {discount > 0 && (
                  <div className="flex justify-between text-[#2D6A4F]">
                    <span>Discount</span>
                    <span className="font-semibold">-₹{discount}</span>
                  </div>
                )}

                <div className="flex justify-between text-[#5C6B61]">
                  <span>Odisha Farm Courier</span>
                  <span className="font-semibold text-[#1B4332]">
                    {shipping === 0 ? <span className="text-[#2D6A4F] font-bold">FREE</span> : `₹${shipping}`}
                  </span>
                </div>

                <div className="flex justify-between text-base font-bold text-[#1B4332] pt-2 border-t border-[#E2D1B8]">
                  <span>Total Payable</span>
                  <span className="font-serif text-xl">₹{total}</span>
                </div>
              </div>

              {/* Urgency Notice if basket contains scarce products */}
              {items.some((it) => {
                const p = PRODUCTS.find((prod) => prod.id === it.productId);
                return p && p.stockQuantity < 5;
              }) && (
                <div className="flex items-center gap-2 p-2.5 rounded-xl bg-[#FFF4F2] border border-[#FCD5CF] text-[11px] text-[#9E2A2B]">
                  <Flame className="w-3.5 h-3.5 text-[#D62828] fill-[#D62828] shrink-0" />
                  <span className="leading-tight">
                    <strong>Limited Stock:</strong> Items in your basket are in high demand. Checkout now to reserve your harvest pack.
                  </span>
                </div>
              )}

              {/* Checkout Button */}
              <button
                onClick={onProceedToCheckout}
                id="proceed-to-checkout-btn"
                className="w-full py-3.5 px-6 rounded-xl bg-[#1B4332] hover:bg-[#2D6A4F] text-white font-bold text-sm shadow-md transition-all flex items-center justify-center gap-2 cursor-pointer group"
              >
                <span>Proceed to Checkout</span>
                <ArrowRight className="w-4 h-4 transition-transform group-hover:translate-x-1" />
              </button>

              <div className="flex items-center justify-center gap-2 text-[10.5px] text-[#69796F]">
                <ShieldCheck className="w-3.5 h-3.5 text-[#2D6A4F]" />
                <span>Secure Checkout with Razorpay UPI & Cards</span>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};
