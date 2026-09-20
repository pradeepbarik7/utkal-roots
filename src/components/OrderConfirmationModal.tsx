import React from 'react';
import { Order } from '../types';
import { CheckCircle2, PackageCheck, Printer, Calendar, MapPin, Truck, Sparkles, X } from 'lucide-react';
import { BrandLogo } from './BrandLogo';

interface OrderConfirmationModalProps {
  order: Order | null;
  onClose: () => void;
}

export const OrderConfirmationModal: React.FC<OrderConfirmationModalProps> = ({ order, onClose }) => {
  if (!order) return null;

  const handlePrint = () => {
    window.print();
  };

  return (
    <div
      className="fixed inset-0 z-50 flex items-center justify-center p-3 sm:p-6 bg-black/65 backdrop-blur-xs animate-in fade-in duration-200"
      id="order-confirmation-modal"
    >
      <div
        className="bg-[#FBF8F3] w-full max-w-2xl max-h-[92vh] rounded-3xl shadow-2xl border border-[#E6D7BD] flex flex-col overflow-hidden text-left"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Header */}
        <div className="px-6 py-4 border-b border-[#E6D7BD] bg-[#EBF5ED] flex items-center justify-between">
          <div className="flex items-center gap-2">
            <CheckCircle2 className="w-5 h-5 text-[#2D6A4F]" />
            <h3 className="font-serif font-bold text-lg text-[#1B4332]">
              Order Confirmed & Farm Reserved!
            </h3>
          </div>
          <button
            onClick={onClose}
            aria-label="Close receipt"
            className="p-1.5 rounded-full hover:bg-stone-200 text-[#1B4332] transition-colors cursor-pointer"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Invoice / Receipt Body */}
        <div className="flex-1 overflow-y-auto p-6 sm:p-8 space-y-6 print:p-0">
          {/* Success Banner */}
          <div className="text-center space-y-2 pb-2">
            <div className="w-14 h-14 rounded-full bg-[#E1EFE4] text-[#2D6A4F] flex items-center justify-center mx-auto shadow-inner">
              <PackageCheck className="w-8 h-8" />
            </div>
            <h2 className="font-serif text-2xl font-bold text-[#1B4332]">
              Thank You, {order.customer.fullName}!
            </h2>
            <p className="text-xs sm:text-sm text-[#4E5D52] max-w-md mx-auto">
              Your harvest has been assigned to our local Odisha farmers. A confirmation and tracking receipt has been sent to <strong>{order.customer.email}</strong>.
            </p>
          </div>

          {/* Key Reference Stats */}
          <div className="grid grid-cols-2 sm:grid-cols-3 gap-3 p-4 bg-white rounded-2xl border border-[#E6D7BD] text-xs">
            <div>
              <span className="text-[#6D7D72] block">Order Number</span>
              <span className="font-mono font-bold text-sm text-[#1B4332]">{order.orderId}</span>
            </div>
            <div>
              <span className="text-[#6D7D72] block">Payment Reference</span>
              <span className="font-mono font-bold text-xs text-[#2D6A4F]">{order.paymentId}</span>
            </div>
            <div className="col-span-2 sm:col-span-1">
              <span className="text-[#6D7D72] block">Estimated Delivery</span>
              <span className="font-semibold text-xs text-[#8C411E]">{order.estimatedDelivery}</span>
            </div>
          </div>

          {/* Destination & Farm Origin */}
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 text-xs">
            <div className="p-4 rounded-xl bg-[#F4ECE1] border border-[#E3D4BC] space-y-1">
              <span className="font-bold text-[#1B4332] flex items-center gap-1.5">
                <MapPin className="w-3.5 h-3.5 text-[#2D6A4F]" />
                Shipping Destination
              </span>
              <p className="text-[#3E4E43] font-medium">{order.customer.fullName}</p>
              <p className="text-[#596A5F]">{order.customer.address}</p>
              <p className="text-[#596A5F]">{order.customer.city}, {order.customer.state} - {order.customer.pincode}</p>
              <p className="text-[#596A5F]">Phone: {order.customer.phone}</p>
            </div>

            <div className="p-4 rounded-xl bg-[#F4ECE1] border border-[#E3D4BC] space-y-1">
              <span className="font-bold text-[#1B4332] flex items-center gap-1.5">
                <Truck className="w-3.5 h-3.5 text-[#2D6A4F]" />
                Farm Dispatch Route
              </span>
              <p className="text-[#3E4E43] font-medium">Utkal Roots Farm Hub</p>
              <p className="text-[#596A5F]">Bargarh & Sambalpur District, Odisha</p>
              <p className="text-[#596A5F]">Packaging: Biodegradable moisture barrier seal</p>
              <p className="text-[#2D6A4F] font-semibold mt-1">Status: Packed with fresh harvest</p>
            </div>
          </div>

          {/* Itemized Order Table */}
          <div className="border border-[#E6D7BD] rounded-2xl overflow-hidden bg-white text-xs">
            <div className="bg-[#F4ECE1] px-4 py-2.5 font-bold text-[#1B4332] grid grid-cols-12">
              <span className="col-span-6">Harvest Item</span>
              <span className="col-span-2 text-center">Pack</span>
              <span className="col-span-2 text-center">Qty</span>
              <span className="col-span-2 text-right">Price</span>
            </div>
            <div className="divide-y divide-[#EFE5D4] p-2">
              {order.items.map((it) => (
                <div key={it.id} className="px-2 py-2 grid grid-cols-12 items-center">
                  <span className="col-span-6 font-medium text-[#1B4332]">{it.name}</span>
                  <span className="col-span-2 text-center text-[#556358]">{it.weight}</span>
                  <span className="col-span-2 text-center text-[#556358]">{it.quantity}</span>
                  <span className="col-span-2 text-right font-bold text-[#1B4332]">₹{it.price * it.quantity}</span>
                </div>
              ))}
            </div>

            <div className="bg-[#FAF6EE] p-4 border-t border-[#E6D7BD] space-y-1.5">
              <div className="flex justify-between text-[#5C6B60]">
                <span>Subtotal</span>
                <span>₹{order.subtotal}</span>
              </div>
              {order.discount > 0 && (
                <div className="flex justify-between text-[#2D6A4F]">
                  <span>Applied Farm Discount</span>
                  <span>-₹{order.discount}</span>
                </div>
              )}
              <div className="flex justify-between text-[#5C6B60]">
                <span>Express Farm Courier</span>
                <span>{order.shipping === 0 ? 'FREE' : `₹${order.shipping}`}</span>
              </div>
              <div className="flex justify-between text-base font-bold text-[#1B4332] pt-2 border-t border-[#E6D7BD]">
                <span>Paid via Razorpay</span>
                <span className="font-serif">₹{order.total}</span>
              </div>
            </div>
          </div>

          {/* Farmer support note */}
          <div className="p-3.5 rounded-xl bg-[#EAF4ED] border border-[#C6E2CB] flex items-center gap-3 text-xs text-[#1B4332]">
            <Sparkles className="w-4 h-4 text-[#2D6A4F] shrink-0" />
            <p>
              Your order directly supports fair compensation for our network of 48 indigenous farming families in Odisha practicing chemical-free agriculture.
            </p>
          </div>
        </div>

        {/* Footer Actions */}
        <div className="px-6 py-4 border-t border-[#E6D7BD] bg-[#F4ECE1] flex flex-wrap items-center justify-between gap-3">
          <button
            onClick={handlePrint}
            className="px-4 py-2.5 rounded-xl bg-white hover:bg-stone-100 text-[#1B4332] font-semibold text-xs border border-[#D5C2A5] transition-colors flex items-center gap-2 cursor-pointer shadow-2xs"
          >
            <Printer className="w-4 h-4 text-[#2D6A4F]" />
            <span>Print / Save Farm Invoice</span>
          </button>

          <button
            onClick={onClose}
            className="px-6 py-2.5 rounded-xl bg-[#1B4332] hover:bg-[#2D6A4F] text-white font-semibold text-xs transition-colors cursor-pointer"
          >
            Continue Shopping
          </button>
        </div>
      </div>
    </div>
  );
};
