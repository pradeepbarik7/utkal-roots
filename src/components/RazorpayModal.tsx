import React, { useState, useEffect } from 'react';
import { X, CheckCircle2, ShieldCheck, QrCode, CreditCard, Landmark, Smartphone, Loader2 } from 'lucide-react';
import { CheckoutFormData } from '../types';

interface RazorpayModalProps {
  isOpen: boolean;
  onClose: () => void;
  amount: number;
  customerData: CheckoutFormData | null;
  onPaymentSuccess: (paymentId: string) => void;
}

export const RazorpayModal: React.FC<RazorpayModalProps> = ({
  isOpen,
  onClose,
  amount,
  customerData,
  onPaymentSuccess,
}) => {
  const [activeMethod, setActiveMethod] = useState<'upi' | 'card' | 'netbanking'>('upi');
  const [selectedUpiApp, setSelectedUpiApp] = useState<'gpay' | 'phonepe' | 'paytm' | 'qr'>('gpay');
  const [upiIdInput, setUpiIdInput] = useState('');
  
  // Card states
  const [cardNumber, setCardNumber] = useState('');
  const [cardExpiry, setCardExpiry] = useState('');
  const [cardCvv, setCardCvv] = useState('');
  const [cardName, setCardName] = useState(customerData?.fullName || '');

  // Bank state
  const [selectedBank, setSelectedBank] = useState('SBI');

  // Processing state
  const [isProcessing, setIsProcessing] = useState(false);
  const [processStep, setProcessStep] = useState<'idle' | 'authorizing' | 'capturing' | 'success'>('idle');

  useEffect(() => {
    if (customerData?.fullName) {
      setCardName(customerData.fullName);
    }
  }, [customerData]);

  if (!isOpen) return null;

  const handleExecutePayment = () => {
    setIsProcessing(true);
    setProcessStep('authorizing');

    setTimeout(() => {
      setProcessStep('capturing');
      setTimeout(() => {
        setProcessStep('success');
        setTimeout(() => {
          setIsProcessing(false);
          const mockPaymentId = `pay_razor_${Math.random().toString(36).substring(2, 9).toUpperCase()}`;
          onPaymentSuccess(mockPaymentId);
        }, 800);
      }, 900);
    }, 900);
  };

  const formatCardNumber = (val: string) => {
    const clean = val.replace(/\D/g, '').substring(0, 16);
    const groups = clean.match(/.{1,4}/g);
    return groups ? groups.join(' ') : clean;
  };

  const formatExpiry = (val: string) => {
    const clean = val.replace(/\D/g, '').substring(0, 4);
    if (clean.length >= 2) {
      return `${clean.substring(0, 2)}/${clean.substring(2)}`;
    }
    return clean;
  };

  return (
    <div
      className="fixed inset-0 z-50 flex items-center justify-center p-3 sm:p-6 bg-black/70 backdrop-blur-xs animate-in fade-in duration-200"
      id="razorpay-modal-overlay"
    >
      <div
        className="bg-white w-full max-w-md rounded-2xl shadow-2xl overflow-hidden border border-stone-200 flex flex-col text-left"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Razorpay Brand Header */}
        <div className="bg-[#0C2340] text-white p-4 sm:p-5 flex items-center justify-between relative">
          <div className="flex items-center gap-3">
            <div className="w-9 h-9 rounded-lg bg-[#0C2340] border border-blue-400/30 flex items-center justify-center shadow-inner">
              <span className="font-bold text-blue-400 text-lg italic tracking-tighter">R</span>
            </div>
            <div>
              <div className="flex items-center gap-1.5">
                <span className="font-bold text-sm text-white tracking-wide">Razorpay</span>
                <span className="text-[10px] bg-blue-500/30 text-blue-200 px-1.5 py-0.2 rounded font-mono">
                  TRUSTED
                </span>
              </div>
              <p className="text-xs text-blue-200/90 font-medium truncate max-w-[200px]">
                Utkal Roots Organic Food
              </p>
            </div>
          </div>

          <div className="text-right">
            <span className="text-[10px] text-blue-200 uppercase tracking-wider block">Payable</span>
            <span className="font-bold text-xl text-white font-sans">₹{amount}</span>
          </div>

          {!isProcessing && (
            <button
              onClick={onClose}
              id="close-razorpay-btn"
              className="absolute top-2 right-2 p-1 text-blue-200 hover:text-white rounded-full transition-colors cursor-pointer"
            >
              <X className="w-4 h-4" />
            </button>
          )}
        </div>

        {/* Processing State Animation */}
        {isProcessing ? (
          <div className="p-8 py-14 flex flex-col items-center justify-center text-center space-y-4">
            {processStep !== 'success' ? (
              <div className="relative">
                <Loader2 className="w-12 h-12 text-[#2D6A4F] animate-spin" />
                <div className="absolute inset-0 flex items-center justify-center text-xs font-bold text-[#1B4332]">
                  ₹
                </div>
              </div>
            ) : (
              <div className="w-12 h-12 rounded-full bg-emerald-100 text-emerald-600 flex items-center justify-center animate-bounce">
                <CheckCircle2 className="w-8 h-8" />
              </div>
            )}

            <div className="space-y-1">
              <h4 className="font-bold text-base text-[#1B4332]">
                {processStep === 'authorizing' && 'Connecting to Payment Network...'}
                {processStep === 'capturing' && 'Verifying & Securing Transfer...'}
                {processStep === 'success' && 'Payment Authenticated Successfully!'}
              </h4>
              <p className="text-xs text-[#637267]">
                Do not press back or close this window
              </p>
            </div>
          </div>
        ) : (
          /* Payment Method Tabs & Forms */
          <div className="p-4 sm:p-5 space-y-4">
            {/* Method selection tabs */}
            <div className="grid grid-cols-3 gap-1.5 p-1 bg-stone-100 rounded-xl">
              <button
                type="button"
                onClick={() => setActiveMethod('upi')}
                id="razorpay-tab-upi"
                className={`flex items-center justify-center gap-1.5 py-2 px-2 rounded-lg text-xs font-semibold transition-all cursor-pointer ${
                  activeMethod === 'upi'
                    ? 'bg-white text-[#0C2340] shadow-xs'
                    : 'text-stone-600 hover:text-stone-900'
                }`}
              >
                <Smartphone className="w-3.5 h-3.5 text-blue-600" />
                <span>UPI / QR</span>
              </button>

              <button
                type="button"
                onClick={() => setActiveMethod('card')}
                id="razorpay-tab-card"
                className={`flex items-center justify-center gap-1.5 py-2 px-2 rounded-lg text-xs font-semibold transition-all cursor-pointer ${
                  activeMethod === 'card'
                    ? 'bg-white text-[#0C2340] shadow-xs'
                    : 'text-stone-600 hover:text-stone-900'
                }`}
              >
                <CreditCard className="w-3.5 h-3.5 text-blue-600" />
                <span>Cards</span>
              </button>

              <button
                type="button"
                onClick={() => setActiveMethod('netbanking')}
                id="razorpay-tab-nb"
                className={`flex items-center justify-center gap-1.5 py-2 px-2 rounded-lg text-xs font-semibold transition-all cursor-pointer ${
                  activeMethod === 'netbanking'
                    ? 'bg-white text-[#0C2340] shadow-xs'
                    : 'text-stone-600 hover:text-stone-900'
                }`}
              >
                <Landmark className="w-3.5 h-3.5 text-blue-600" />
                <span>NetBanking</span>
              </button>
            </div>

            {/* TAB 1: UPI */}
            {activeMethod === 'upi' && (
              <div className="space-y-4 animate-in fade-in duration-150">
                <div className="grid grid-cols-4 gap-2">
                  {[
                    { id: 'gpay', label: 'Google Pay', icon: '🟢 GPay' },
                    { id: 'phonepe', label: 'PhonePe', icon: '🟣 PhonePe' },
                    { id: 'paytm', label: 'Paytm UPI', icon: '🔵 Paytm' },
                    { id: 'qr', label: 'Scan QR', icon: '🔳 QR' },
                  ].map((app) => (
                    <button
                      key={app.id}
                      type="button"
                      onClick={() => setSelectedUpiApp(app.id as any)}
                      className={`p-2 rounded-xl border text-center transition-all cursor-pointer ${
                        selectedUpiApp === app.id
                          ? 'border-blue-600 bg-blue-50/50 text-blue-900 font-bold'
                          : 'border-stone-200 hover:border-stone-300 text-stone-700'
                      }`}
                    >
                      <div className="text-xs font-semibold">{app.icon}</div>
                    </button>
                  ))}
                </div>

                {selectedUpiApp === 'qr' ? (
                  <div className="p-4 bg-stone-50 rounded-xl border border-stone-200 flex flex-col items-center justify-center space-y-2">
                    <div className="w-36 h-36 bg-white p-2 border border-stone-300 rounded-lg flex items-center justify-center shadow-inner">
                      <QrCode className="w-32 h-32 text-stone-900" />
                    </div>
                    <span className="text-[11px] text-stone-500 font-medium">
                      Scan with any UPI App (GPay / PhonePe / Paytm / BHIM)
                    </span>
                  </div>
                ) : (
                  <div className="space-y-1.5">
                    <label className="text-xs font-medium text-stone-700 block">
                      Enter UPI ID / VPA
                    </label>
                    <input
                      type="text"
                      value={upiIdInput}
                      onChange={(e) => setUpiIdInput(e.target.value)}
                      placeholder="mobile-number@upi or username@okhdfcbank"
                      className="w-full px-3 py-2 text-xs rounded-xl border border-stone-300 focus:outline-hidden focus:border-blue-600"
                    />
                    <span className="text-[10px] text-stone-400 block">
                      A payment collect request will be simulated instantly.
                    </span>
                  </div>
                )}
              </div>
            )}

            {/* TAB 2: Cards */}
            {activeMethod === 'card' && (
              <div className="space-y-3 animate-in fade-in duration-150 text-xs">
                <div>
                  <label className="font-medium text-stone-700 block mb-1">
                    Card Number
                  </label>
                  <input
                    type="text"
                    value={cardNumber}
                    onChange={(e) => setCardNumber(formatCardNumber(e.target.value))}
                    placeholder="4532 •••• •••• 8890"
                    className="w-full px-3 py-2 rounded-xl border border-stone-300 focus:outline-hidden focus:border-blue-600 font-mono"
                  />
                </div>

                <div className="grid grid-cols-2 gap-3">
                  <div>
                    <label className="font-medium text-stone-700 block mb-1">
                      Expiry (MM/YY)
                    </label>
                    <input
                      type="text"
                      value={cardExpiry}
                      onChange={(e) => setCardExpiry(formatExpiry(e.target.value))}
                      placeholder="08/29"
                      className="w-full px-3 py-2 rounded-xl border border-stone-300 focus:outline-hidden focus:border-blue-600"
                    />
                  </div>
                  <div>
                    <label className="font-medium text-stone-700 block mb-1">
                      CVV / CVC
                    </label>
                    <input
                      type="password"
                      maxLength={4}
                      value={cardCvv}
                      onChange={(e) => setCardCvv(e.target.value.replace(/\D/g, ''))}
                      placeholder="•••"
                      className="w-full px-3 py-2 rounded-xl border border-stone-300 focus:outline-hidden focus:border-blue-600"
                    />
                  </div>
                </div>

                <div>
                  <label className="font-medium text-stone-700 block mb-1">
                    Name on Card
                  </label>
                  <input
                    type="text"
                    value={cardName}
                    onChange={(e) => setCardName(e.target.value)}
                    placeholder="Name as on Card"
                    className="w-full px-3 py-2 rounded-xl border border-stone-300 focus:outline-hidden focus:border-blue-600"
                  />
                </div>
              </div>
            )}

            {/* TAB 3: NetBanking */}
            {activeMethod === 'netbanking' && (
              <div className="space-y-3 animate-in fade-in duration-150">
                <label className="text-xs font-medium text-stone-700 block">
                  Select Bank:
                </label>
                <div className="grid grid-cols-2 gap-2">
                  {[
                    { id: 'SBI', name: 'State Bank of India' },
                    { id: 'HDFC', name: 'HDFC Bank' },
                    { id: 'ICICI', name: 'ICICI Bank' },
                    { id: 'AXIS', name: 'Axis Bank' },
                  ].map((bank) => (
                    <button
                      key={bank.id}
                      type="button"
                      onClick={() => setSelectedBank(bank.id)}
                      className={`p-2.5 rounded-xl border text-left text-xs transition-all cursor-pointer ${
                        selectedBank === bank.id
                          ? 'border-blue-600 bg-blue-50 text-blue-900 font-bold'
                          : 'border-stone-200 text-stone-700 hover:border-stone-300'
                      }`}
                    >
                      <div className="font-semibold">{bank.id}</div>
                      <div className="text-[10px] opacity-75 truncate">{bank.name}</div>
                    </button>
                  ))}
                </div>
              </div>
            )}

            {/* Pay Button */}
            <div className="pt-2">
              <button
                type="button"
                onClick={handleExecutePayment}
                id="execute-razorpay-payment-btn"
                className="w-full py-3.5 px-4 rounded-xl bg-blue-600 hover:bg-blue-700 text-white font-bold text-sm shadow-md transition-all flex items-center justify-center gap-2 cursor-pointer"
              >
                <span>Pay ₹{amount}</span>
              </button>

              <div className="mt-2.5 flex items-center justify-center gap-1.5 text-[10px] text-stone-500">
                <ShieldCheck className="w-3.5 h-3.5 text-emerald-600" />
                <span>Secured by Razorpay • Verified Merchant Utkal Roots</span>
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};
