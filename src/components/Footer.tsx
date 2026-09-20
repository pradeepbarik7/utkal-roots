import React, { useState } from 'react';
import { BrandLogo } from './BrandLogo';
import { PolicyType } from '../types';
import { Mail, Phone, MapPin, Send, CheckCircle2, ShieldCheck, Heart } from 'lucide-react';

interface FooterProps {
  onNavigate: (sectionId: string) => void;
  onOpenPolicy: (type: PolicyType) => void;
}

export const Footer: React.FC<FooterProps> = ({ onNavigate, onOpenPolicy }) => {
  const [newsletterEmail, setNewsletterEmail] = useState('');
  const [newsletterSubscribed, setNewsletterSubscribed] = useState(false);

  const handleSubscribe = (e: React.FormEvent) => {
    e.preventDefault();
    if (!newsletterEmail.trim() || !newsletterEmail.includes('@')) return;
    setNewsletterSubscribed(true);
    setTimeout(() => {
      setNewsletterEmail('');
      setNewsletterSubscribed(false);
    }, 3500);
  };

  return (
    <footer className="bg-[#12231A] text-[#D8E2DC] pt-16 pb-12 border-t border-[#233A2D] text-left" id="main-footer">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-12 gap-10 pb-12 border-b border-[#233A2D]">
          {/* Brand & Mission column */}
          <div className="lg:col-span-4 space-y-4">
            <BrandLogo variant="light" />
            <p className="text-xs text-[#9BB1A4] leading-relaxed max-w-sm pt-2">
              Utkal Roots brings genuine chemical-free harvest from the sacred red and alluvial soils of Odisha directly to your kitchen. Nurtured exclusively with homemade Vedic Jeevamrut and natural neem pest care since 1998.
            </p>
            <div className="flex items-center gap-2 pt-2 text-[11px] text-[#74C69D] font-medium">
              <ShieldCheck className="w-4 h-4 text-[#52B788]" />
              <span>Certified Organic Cultivation • Non-GMO Heritage Seeds</span>
            </div>
          </div>

          {/* Quick Links */}
          <div className="lg:col-span-2 space-y-3">
            <h4 className="font-serif font-bold text-sm text-white uppercase tracking-wider">
              Explore
            </h4>
            <ul className="space-y-2 text-xs text-[#B2C5BA]">
              <li>
                <button
                  onClick={() => onNavigate('hero-section')}
                  className="hover:text-white transition-colors cursor-pointer"
                >
                  Home
                </button>
              </li>
              <li>
                <button
                  onClick={() => onNavigate('products-catalogue')}
                  className="hover:text-white transition-colors cursor-pointer"
                >
                  Our Products
                </button>
              </li>
              <li>
                <button
                  onClick={() => onNavigate('our-story-section')}
                  className="hover:text-white transition-colors cursor-pointer"
                >
                  Our Story (Compost & Neem)
                </button>
              </li>
              <li>
                <button
                  onClick={() => onNavigate('sustainability-section')}
                  className="hover:text-white transition-colors cursor-pointer"
                >
                  Sustainability
                </button>
              </li>
              <li>
                <button
                  onClick={() => onNavigate('reviews-section')}
                  className="hover:text-white transition-colors cursor-pointer"
                >
                  Customer Reviews
                </button>
              </li>
              <li>
                <button
                  onClick={() => onNavigate('contact-section')}
                  className="hover:text-white transition-colors cursor-pointer"
                >
                  Contact Farm
                </button>
              </li>
            </ul>
          </div>

          {/* Trust & Policies */}
          <div className="lg:col-span-3 space-y-3">
            <h4 className="font-serif font-bold text-sm text-white uppercase tracking-wider">
              Trust & Policies
            </h4>
            <ul className="space-y-2 text-xs text-[#B2C5BA]">
              <li>
                <button
                  onClick={() => onOpenPolicy('privacy')}
                  id="footer-policy-privacy"
                  className="hover:text-white transition-colors cursor-pointer"
                >
                  Privacy Policy (DPDP Act)
                </button>
              </li>
              <li>
                <button
                  onClick={() => onOpenPolicy('refund')}
                  id="footer-policy-refund"
                  className="hover:text-white transition-colors cursor-pointer"
                >
                  Return & Refund Policy
                </button>
              </li>
              <li>
                <button
                  onClick={() => onOpenPolicy('shipping')}
                  id="footer-policy-shipping"
                  className="hover:text-white transition-colors cursor-pointer"
                >
                  Shipping & Delivery Timelines
                </button>
              </li>
              <li>
                <button
                  onClick={() => onOpenPolicy('terms')}
                  id="footer-policy-terms"
                  className="hover:text-white transition-colors cursor-pointer"
                >
                  Terms of Service
                </button>
              </li>
            </ul>

            <div className="pt-2 text-[11px] text-[#8EA397] space-y-1">
              <div>
                <strong className="text-white">Farm Helpline:</strong>{' '}
                <a href="tel:+918390155321" className="text-[#74C69D] hover:underline">
                  +91 8390155321
                </a>
              </div>
              <div>
                <strong className="text-white">Email:</strong>{' '}
                <a href="mailto:utkalroots@gmail.com" className="text-[#74C69D] hover:underline">
                  utkalroots@gmail.com
                </a>
              </div>
            </div>
          </div>

          {/* Newsletter Box */}
          <div className="lg:col-span-3 space-y-3">
            <h4 className="font-serif font-bold text-sm text-white uppercase tracking-wider">
              Odisha Harvest Dispatch
            </h4>
            <p className="text-xs text-[#9BB1A4]">
              Subscribe for seasonal harvest notifications, grandmother’s Odia rice recipes, and 10% off your next organic order.
            </p>

            {newsletterSubscribed ? (
              <div className="p-3 rounded-xl bg-[#1E3E2D] border border-[#2D6A4F] text-xs text-[#95D5B2] flex items-center gap-2">
                <CheckCircle2 className="w-4 h-4 text-[#52B788] shrink-0" />
                <span>Subscribed! Use code <strong>UTKAL10</strong> for 10% off.</span>
              </div>
            ) : (
              <form onSubmit={handleSubscribe} className="space-y-2">
                <div className="relative">
                  <input
                    type="email"
                    required
                    value={newsletterEmail}
                    onChange={(e) => setNewsletterEmail(e.target.value)}
                    placeholder="Enter your email..."
                    className="w-full pl-3.5 pr-10 py-2.5 rounded-xl bg-[#1D3226] border border-[#2D4D3A] text-xs text-white placeholder-[#6C8375] focus:outline-hidden focus:border-[#52B788]"
                  />
                  <button
                    type="submit"
                    aria-label="Subscribe"
                    className="absolute right-1.5 top-1.5 p-1.5 bg-[#2D6A4F] hover:bg-[#40916C] text-white rounded-lg transition-colors cursor-pointer"
                  >
                    <Send className="w-3.5 h-3.5" />
                  </button>
                </div>
                <span className="text-[10.5px] text-[#697E72] block">
                  Zero spam. Only pure harvest updates from Odisha.
                </span>
              </form>
            )}
          </div>
        </div>

        {/* Bottom Bar */}
        <div className="pt-8 flex flex-col sm:flex-row items-center justify-between gap-4 text-xs text-[#7B9285]">
          <p>© {new Date().getFullYear()} Utkal Roots Organic Foods. All rights reserved. Cultivated with pride in Odisha, India.</p>
          <div className="flex items-center gap-1">
            <span>Rooted in soil, nurtured with</span>
            <Heart className="w-3.5 h-3.5 fill-[#D97706] text-[#D97706] inline mx-0.5" />
            <span>in Odisha</span>
          </div>
        </div>
      </div>
    </footer>
  );
};
