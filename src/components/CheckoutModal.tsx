import React, { useState } from 'react';
import { CartItem, CheckoutFormData } from '../types';
import { X, ShieldCheck, Truck, Lock, CreditCard, ArrowRight } from 'lucide-react';

interface CheckoutModalProps {
  isOpen: boolean;
  onClose: () => void;
  items: CartItem[];
  subtotal: number;
  shipping: number;
  discount: number;
  total: number;
  onSubmitCheckout: (data: CheckoutFormData) => void;
}

export const CheckoutModal: React.FC<CheckoutModalProps> = ({
  isOpen,
  onClose,
  items,
  subtotal,
  shipping,
  discount,
  total,
  onSubmitCheckout,
}) => {
  const [formData, setFormData] = useState<CheckoutFormData>({
    fullName: '',
    email: '',
    phone: '',
    address: '',
    city: '',
    state: 'Odisha',
    pincode: '',
    deliveryNotes: '',
    paymentMethod: 'razorpay_upi',
  });

  const [errors, setErrors] = useState<Partial<Record<keyof CheckoutFormData, string>>>({});

  if (!isOpen) return null;

  const validate = () => {
    const errs: Partial<Record<keyof CheckoutFormData, string>> = {};
    if (!formData.fullName.trim()) errs.fullName = 'Please enter your full name';
    if (!formData.email.trim() || !formData.email.includes('@')) errs.email = 'Valid email is required';
    if (!formData.phone.trim() || formData.phone.replace(/\D/g, '').length < 10) {
      errs.phone = 'Please provide a valid 10-digit mobile number';
    }
    if (!formData.address.trim()) errs.address = 'Street delivery address is required';
    if (!formData.city.trim()) errs.city = 'City/Town is required';
    if (!formData.pincode.trim() || formData.pincode.replace(/\D/g, '').length !== 6) {
      errs.pincode = 'Valid 6-digit postal PIN code required';
    }
    setErrors(errs);
    return Object.keys(errs).length === 0;
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (validate()) {
      onSubmitCheckout(formData);
    }
  };

  const indianStates = [
    'Odisha', 'West Bengal', 'Karnataka', 'Maharashtra', 'Delhi NCR', 'Telangana',
    'Tamil Nadu', 'Gujarat', 'Uttar Pradesh', 'Kerala', 'Bihar', 'Madhya Pradesh',
    'Rajasthan', 'Punjab', 'Haryana', 'Andhra Pradesh', 'Assam', 'Other'
  ];

  return (
    <div
      className="fixed inset-0 z-50 flex items-center justify-center p-3 sm:p-6 bg-black/65 backdrop-blur-xs animate-in fade-in duration-200"
      id="checkout-modal-overlay"
    >
      <div
        className="bg-[#FBF8F3] w-full max-w-2xl max-h-[92vh] rounded-3xl shadow-2xl border border-[#E6D7BD] flex flex-col overflow-hidden text-left"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Header */}
        <div className="px-6 py-4 border-b border-[#E6D7BD] bg-[#F4ECE1] flex items-center justify-between">
          <div className="flex items-center gap-2">
            <Lock className="w-4 h-4 text-[#2D6A4F]" />
            <h3 className="font-serif font-bold text-lg text-[#1B4332]">
              Direct Farm Delivery Checkout
            </h3>
          </div>
          <button
            onClick={onClose}
            id="close-checkout-btn"
            aria-label="Close checkout"
            className="p-1.5 rounded-full hover:bg-stone-200 text-[#1B4332] transition-colors cursor-pointer"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Body Form */}
        <form onSubmit={handleSubmit} className="flex-1 overflow-y-auto p-5 sm:p-7 space-y-6">
          {/* Order Snapshot */}
          <div className="p-4 rounded-2xl bg-[#F0E6D5] border border-[#DFCBB0] space-y-3">
            <div className="flex items-center justify-between text-xs text-[#526055]">
              <span className="font-semibold text-[#1B4332]">Items ({items.length})</span>
              <span className="text-[#8C411E] font-medium">Dispatched from Bargarh/Dhenkanal, Odisha</span>
            </div>
            <div className="space-y-1 text-xs">
              {items.map((i) => (
                <div key={i.id} className="flex justify-between">
                  <span className="text-[#333E36]">{i.name} ({i.weight}) × {i.quantity}</span>
                  <span className="font-semibold text-[#1B4332]">₹{i.price * i.quantity}</span>
                </div>
              ))}
            </div>
            <div className="pt-2 border-t border-[#DEC9AC] flex justify-between items-center text-sm font-bold text-[#1B4332]">
              <span>Total with Farm Shipping:</span>
              <span className="font-serif text-lg text-[#1B4332]">₹{total}</span>
            </div>
          </div>

          {/* Contact Details */}
          <div className="space-y-3">
            <h4 className="font-serif font-bold text-base text-[#1B4332] flex items-center gap-2">
              <span className="w-6 h-6 rounded-full bg-[#1B4332] text-white text-xs flex items-center justify-center font-sans">
                1
              </span>
              Contact Information
            </h4>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
              <div>
                <label className="text-xs font-semibold text-[#1B4332] block mb-1">
                  Full Name *
                </label>
                <input
                  type="text"
                  value={formData.fullName}
                  onChange={(e) => setFormData({ ...formData, fullName: e.target.value })}
                  placeholder="e.g. Pradeep Barik"
                  id="checkout-name-input"
                  className="w-full px-3.5 py-2.5 rounded-xl bg-white border border-[#D5C2A5] text-xs sm:text-sm focus:outline-hidden focus:border-[#2D6A4F]"
                />
                {errors.fullName && <p className="text-[11px] text-red-600 mt-1">{errors.fullName}</p>}
              </div>

              <div>
                <label className="text-xs font-semibold text-[#1B4332] block mb-1">
                  Phone Number (WhatsApp updates) *
                </label>
                <input
                  type="tel"
                  value={formData.phone}
                  onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
                  placeholder="+91 9876543210"
                  id="checkout-phone-input"
                  className="w-full px-3.5 py-2.5 rounded-xl bg-white border border-[#D5C2A5] text-xs sm:text-sm focus:outline-hidden focus:border-[#2D6A4F]"
                />
                {errors.phone && <p className="text-[11px] text-red-600 mt-1">{errors.phone}</p>}
              </div>

              <div className="sm:col-span-2">
                <label className="text-xs font-semibold text-[#1B4332] block mb-1">
                  Email Address (for invoice & tracking) *
                </label>
                <input
                  type="email"
                  value={formData.email}
                  onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                  placeholder="name@example.com"
                  id="checkout-email-input"
                  className="w-full px-3.5 py-2.5 rounded-xl bg-white border border-[#D5C2A5] text-xs sm:text-sm focus:outline-hidden focus:border-[#2D6A4F]"
                />
                {errors.email && <p className="text-[11px] text-red-600 mt-1">{errors.email}</p>}
              </div>
            </div>
          </div>

          {/* Shipping Address */}
          <div className="space-y-3">
            <h4 className="font-serif font-bold text-base text-[#1B4332] flex items-center gap-2">
              <span className="w-6 h-6 rounded-full bg-[#1B4332] text-white text-xs flex items-center justify-center font-sans">
                2
              </span>
              Delivery Address
            </h4>

            <div className="space-y-3">
              <div>
                <label className="text-xs font-semibold text-[#1B4332] block mb-1">
                  House / Flat No., Street, Landmark *
                </label>
                <input
                  type="text"
                  value={formData.address}
                  onChange={(e) => setFormData({ ...formData, address: e.target.value })}
                  placeholder="Plot 42, Green Enclave, Near Patia Square"
                  id="checkout-address-input"
                  className="w-full px-3.5 py-2.5 rounded-xl bg-white border border-[#D5C2A5] text-xs sm:text-sm focus:outline-hidden focus:border-[#2D6A4F]"
                />
                {errors.address && <p className="text-[11px] text-red-600 mt-1">{errors.address}</p>}
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
                <div>
                  <label className="text-xs font-semibold text-[#1B4332] block mb-1">
                    City / Town *
                  </label>
                  <input
                    type="text"
                    value={formData.city}
                    onChange={(e) => setFormData({ ...formData, city: e.target.value })}
                    placeholder="Bhubaneswar"
                    id="checkout-city-input"
                    className="w-full px-3.5 py-2.5 rounded-xl bg-white border border-[#D5C2A5] text-xs sm:text-sm focus:outline-hidden focus:border-[#2D6A4F]"
                  />
                  {errors.city && <p className="text-[11px] text-red-600 mt-1">{errors.city}</p>}
                </div>

                <div>
                  <label className="text-xs font-semibold text-[#1B4332] block mb-1">
                    State *
                  </label>
                  <select
                    value={formData.state}
                    onChange={(e) => setFormData({ ...formData, state: e.target.value })}
                    id="checkout-state-select"
                    className="w-full px-3.5 py-2.5 rounded-xl bg-white border border-[#D5C2A5] text-xs sm:text-sm focus:outline-hidden focus:border-[#2D6A4F]"
                  >
                    {indianStates.map((st) => (
                      <option key={st} value={st}>{st}</option>
                    ))}
                  </select>
                </div>

                <div>
                  <label className="text-xs font-semibold text-[#1B4332] block mb-1">
                    PIN Code *
                  </label>
                  <input
                    type="text"
                    maxLength={6}
                    value={formData.pincode}
                    onChange={(e) => setFormData({ ...formData, pincode: e.target.value })}
                    placeholder="751024"
                    id="checkout-pincode-input"
                    className="w-full px-3.5 py-2.5 rounded-xl bg-white border border-[#D5C2A5] text-xs sm:text-sm focus:outline-hidden focus:border-[#2D6A4F]"
                  />
                  {errors.pincode && <p className="text-[11px] text-red-600 mt-1">{errors.pincode}</p>}
                </div>
              </div>

              <div>
                <label className="text-xs font-semibold text-[#1B4332] block mb-1">
                  Delivery Notes / Farm Instructions (Optional)
                </label>
                <input
                  type="text"
                  value={formData.deliveryNotes}
                  onChange={(e) => setFormData({ ...formData, deliveryNotes: e.target.value })}
                  placeholder="Leave at doorstep / call on arrival"
                  className="w-full px-3.5 py-2 rounded-xl bg-white border border-[#D5C2A5] text-xs focus:outline-hidden focus:border-[#2D6A4F]"
                />
              </div>
            </div>
          </div>

          {/* Payment Selection preview */}
          <div className="space-y-3">
            <h4 className="font-serif font-bold text-base text-[#1B4332] flex items-center gap-2">
              <span className="w-6 h-6 rounded-full bg-[#1B4332] text-white text-xs flex items-center justify-center font-sans">
                3
              </span>
              Payment Method
            </h4>

            <div className="p-4 rounded-2xl bg-white border border-[#2D6A4F] shadow-xs flex items-center justify-between">
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 rounded-xl bg-[#EBF5ED] flex items-center justify-center text-[#2D6A4F]">
                  <CreditCard className="w-5 h-5" />
                </div>
                <div>
                  <div className="font-semibold text-sm text-[#1B4332] flex items-center gap-2">
                    <span>Razorpay Secure Gateway</span>
                    <span className="text-[10px] px-2 py-0.5 bg-[#E1EFE4] text-[#1B4332] font-bold rounded-full">
                      Zero Surcharge
                    </span>
                  </div>
                  <p className="text-xs text-[#637267]">
                    Instant UPI (GPay, PhonePe, Paytm, QR), RuPay, Visa, NetBanking
                  </p>
                </div>
              </div>
              <ShieldCheck className="w-5 h-5 text-[#2D6A4F]" />
            </div>
          </div>

          {/* Submit Action */}
          <div className="pt-2">
            <button
              type="submit"
              id="submit-to-razorpay-btn"
              className="w-full py-4 px-6 rounded-xl bg-[#1B4332] hover:bg-[#2D6A4F] text-white font-bold text-base shadow-lg transition-all flex items-center justify-center gap-2.5 cursor-pointer"
            >
              <span>Pay ₹{total} via Razorpay</span>
              <ArrowRight className="w-5 h-5" />
            </button>
            <p className="text-[11px] text-center text-[#69796F] mt-2">
              🔒 Encrypted 256-bit bank-grade simulated sandbox for Utkal Roots
            </p>
          </div>
        </form>
      </div>
    </div>
  );
};
