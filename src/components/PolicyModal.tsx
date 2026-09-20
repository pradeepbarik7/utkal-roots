import React from 'react';
import { PolicyType } from '../types';
import { X, ShieldCheck, RefreshCw, Truck, FileText } from 'lucide-react';

interface PolicyModalProps {
  policyType: PolicyType | null;
  onClose: () => void;
}

export const PolicyModal: React.FC<PolicyModalProps> = ({ policyType, onClose }) => {
  if (!policyType) return null;

  const contentMap: Record<
    PolicyType,
    { title: string; icon: React.ReactNode; sections: { heading: string; body: string }[] }
  > = {
    privacy: {
      title: 'Privacy Policy & Data Protection',
      icon: <ShieldCheck className="w-5 h-5 text-[#2D6A4F]" />,
      sections: [
        {
          heading: '1. Commitment to User Privacy',
          body: 'Utkal Roots ("we", "our", or "us") respects your right to privacy. We strictly collect only necessary personal data (such as your delivery name, shipping address, mobile phone number, and email) required to process and fulfill your organic food orders and send delivery transit updates.'
        },
        {
          heading: '2. Zero Data Selling & Third-Party Sharing',
          body: 'We never sell, lease, rent, or trade customer contact details or purchase histories to any third-party marketing brokers or advertisers. Data is exclusively shared with licensed courier partners (such as Delhivery, BlueDart, India Post) solely to achieve home doorstep delivery.'
        },
        {
          heading: '3. Payment Information Security',
          body: 'All online financial transactions are handled securely via PCI-DSS Level-1 certified payment gateways (Razorpay). Utkal Roots never stores, views, or records your credit/debit card numbers, UPI MPINs, or NetBanking bank credentials on our systems.'
        },
        {
          heading: '4. Communications & Compliance',
          body: 'Transactional order confirmations, farm harvest receipts, and dispatch tracking details are sent via SMS, WhatsApp, and Email. You may opt out of promotional organic recipe emails at any time with a single click. Governed by the Digital Personal Data Protection (DPDP) Act of India.'
        }
      ]
    },
    refund: {
      title: 'Return, Freshness & Refund Policy',
      icon: <RefreshCw className="w-5 h-5 text-[#B85D34]" />,
      sections: [
        {
          heading: '1. Organic Farm Freshness Guarantee',
          body: 'Because our Black Rice and Indrayani-Style Aromatic Rice are 100% natural, unpolished, and completely free of chemical fumigants, preservatives, or artificial pesticides, they are classified as perishable food products. We pack them fresh in airtight protective pouches directly in Odisha.'
        },
        {
          heading: '2. Transit Damage & Defect Replacement (7-Day Policy)',
          body: 'If your package arrives with an unsealed pouch, external box tear, water damage, or incorrect grain quantity, please take a clear photo or short video and contact us via WhatsApp (+91 8390155321) or email (utkalroots@gmail.com) within 7 days of delivery. We will immediately dispatch a 100% free farm replacement or issue a full refund.'
        },
        {
          heading: '3. Hygienic Food Safety Standards',
          body: 'To prevent cross-contamination and guarantee food hygiene for all customers, pouches that have been opened or consumed for general taste preference cannot be physically returned to the farm once delivered.'
        },
        {
          heading: '4. Refund Processing Timeline',
          body: 'Approved refunds are credited directly back to the original source payment method (UPI account, card, or bank) via Razorpay within 3 to 5 business days.'
        }
      ]
    },
    shipping: {
      title: 'Shipping & Delivery Policy',
      icon: <Truck className="w-5 h-5 text-[#2D6A4F]" />,
      sections: [
        {
          heading: '1. Farm Dispatch Origin',
          body: 'All orders are freshly prepared, weighed, and sealed at our rural farmer hubs in Bargarh, Sambalpur, or our central Odisha packaging hub in Bhubaneswar. We dispatch micro-batches to guarantee peak freshness.'
        },
        {
          heading: '2. Order Processing & Dispatch Timelines',
          body: 'Orders are prepared and handed over to our express courier partners within 24 to 48 hours of confirmation (excluding Sundays and national holidays).'
        },
        {
          heading: '3. Delivery Timelines Across India',
          body: '• Within Odisha (Bhubaneswar, Cuttack, Puri, Rourkela, Sambalpur, Berhampur): 1 to 2 business days.\n• Eastern & Metro Cities (Kolkata, Bengaluru, Hyderabad, Mumbai, Delhi NCR, Chennai): 3 to 4 business days.\n• Rest of India & Tier-2/3 regions: 4 to 6 business days via Speed Post / Surface Express.'
        },
        {
          heading: '4. Shipping Charges & Free Delivery',
          body: 'We offer FREE Farm Express Shipping on all orders above ₹499. For smaller orders under ₹499, a nominal subsidized farm shipping fee of ₹50 is applied at checkout.'
        },
        {
          heading: '5. Real-Time Tracking',
          body: 'Upon courier handover, an automated SMS and email containing the AWB tracking number and live tracking link will be transmitted to you.'
        }
      ]
    },
    terms: {
      title: 'Terms of Service',
      icon: <FileText className="w-5 h-5 text-[#1B4332]" />,
      sections: [
        {
          heading: '1. Acceptance of Terms',
          body: 'By accessing or purchasing from the Utkal Roots online website, you agree to be bound by these Terms of Service, all applicable laws, and regulations governing digital commerce in India.'
        },
        {
          heading: '2. Product Descriptions & Natural Variations',
          body: 'Because our grains are heritage landraces grown organically without synthetic coloring or chemical bleaching, minor natural variations in grain length, color shade, or husk hue may occur between different harvest seasons. These natural differences attest to the genuine unpolished character of organic farming.'
        },
        {
          heading: '3. Pricing & Billing',
          body: 'All product prices listed on Utkal Roots are in Indian Rupees (₹ INR) and inclusive of all applicable Goods and Services Tax (GST). We reserve the right to correct any inadvertent typographical pricing errors.'
        },
        {
          heading: '4. Governing Law & Jurisdiction',
          body: 'Any claims or disputes arising in relation to our services or agricultural goods shall be governed by the laws of India and subject to the exclusive jurisdiction of the competent courts in Bhubaneswar, Odisha.'
        }
      ]
    }
  };

  const currentPolicy = contentMap[policyType];

  return (
    <div
      className="fixed inset-0 z-50 flex items-center justify-center p-3 sm:p-6 bg-black/65 backdrop-blur-xs animate-in fade-in duration-200"
      id="policy-modal-overlay"
    >
      <div
        className="bg-[#FBF8F3] w-full max-w-2xl max-h-[90vh] rounded-3xl shadow-2xl border border-[#E6D7BD] flex flex-col overflow-hidden text-left"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Header */}
        <div className="px-6 py-4 border-b border-[#E6D7BD] bg-[#F4ECE1] flex items-center justify-between">
          <div className="flex items-center gap-2.5">
            {currentPolicy.icon}
            <h3 className="font-serif font-bold text-lg text-[#1B4332]">
              {currentPolicy.title}
            </h3>
          </div>
          <button
            onClick={onClose}
            aria-label="Close policy"
            className="p-1.5 rounded-full hover:bg-stone-200 text-[#1B4332] transition-colors cursor-pointer"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Policy Body */}
        <div className="flex-1 overflow-y-auto p-6 sm:p-8 space-y-6 text-xs sm:text-sm text-[#3E4E43]">
          <div className="p-3 bg-[#EBF5ED] rounded-xl border border-[#CDE5D3] text-xs text-[#1B4332] font-medium">
            Official Policy for Utkal Roots Organic Food Brand • Harvesting Roots in Odisha Since 1998
          </div>

          <div className="space-y-6">
            {currentPolicy.sections.map((sec, idx) => (
              <div key={idx} className="space-y-2">
                <h4 className="font-serif font-bold text-sm sm:text-base text-[#1B4332]">
                  {sec.heading}
                </h4>
                <p className="leading-relaxed whitespace-pre-line text-[#4F5F53]">
                  {sec.body}
                </p>
              </div>
            ))}
          </div>

          <div className="pt-4 border-t border-[#E6D7BD] text-xs text-[#6B7B71]">
            For questions regarding this policy, contact our compliance desk at{' '}
            <a href="mailto:utkalroots@gmail.com" className="text-[#2D6A4F] font-bold underline">
              utkalroots@gmail.com
            </a>{' '}
            or call{' '}
            <a href="tel:+918390155321" className="text-[#2D6A4F] font-bold underline">
              +91 8390155321
            </a>.
          </div>
        </div>

        {/* Footer button */}
        <div className="px-6 py-3.5 border-t border-[#E6D7BD] bg-[#F4ECE1] flex justify-end">
          <button
            onClick={onClose}
            className="px-5 py-2 rounded-xl bg-[#1B4332] hover:bg-[#2D6A4F] text-white text-xs font-semibold cursor-pointer"
          >
            I Understand
          </button>
        </div>
      </div>
    </div>
  );
};
