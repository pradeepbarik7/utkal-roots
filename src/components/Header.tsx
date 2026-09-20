import React, { useState, useEffect } from 'react';
import { BrandLogo } from './BrandLogo';
import { ShoppingBag, Phone, Mail, Menu, X, Leaf, Award } from 'lucide-react';

interface HeaderProps {
  cartCount: number;
  onOpenCart: () => void;
  activeSection: string;
  onNavigate: (sectionId: string) => void;
  onOpenPolicy: (type: 'privacy' | 'refund' | 'shipping' | 'terms') => void;
}

export const Header: React.FC<HeaderProps> = ({
  cartCount,
  onOpenCart,
  activeSection,
  onNavigate,
}) => {
  const [isScrolled, setIsScrolled] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 20);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const navLinks = [
    { id: 'home', label: 'Home' },
    { id: 'products', label: 'Our Products' },
    { id: 'story', label: 'Our Story (Compost & Neem)' },
    { id: 'sustainability', label: 'Sustainability' },
    { id: 'reviews', label: 'Reviews' },
    { id: 'contact', label: 'Contact' },
  ];

  const handleLinkClick = (id: string) => {
    setMobileMenuOpen(false);
    onNavigate(id);
  };

  return (
    <header className="sticky top-0 z-40 w-full transition-all duration-300" id="main-header">
      {/* Top Farm Announcement Bar */}
      <div className="bg-[#1B4332] text-[#D8F3DC] text-[11px] sm:text-xs py-1.5 px-4 border-b border-[#2D6A4F]/40">
        <div className="max-w-7xl mx-auto flex flex-wrap items-center justify-between gap-2">
          <div className="flex items-center gap-2 font-medium">
            <span className="flex items-center gap-1 text-[#52B788] font-semibold">
              <Leaf className="w-3.5 h-3.5" />
              100% Chemical-Free
            </span>
            <span className="hidden md:inline text-[#74C69D]">•</span>
            <span className="hidden md:inline">Traditional Odia Heirloom Grains Grown with Neem & Homemade Compost</span>
          </div>

          <div className="flex items-center gap-4 text-[11px]">
            <a
              href="tel:+918390155321"
              className="flex items-center gap-1.5 hover:text-white transition-colors"
              id="header-phone-link"
            >
              <Phone className="w-3 h-3 text-[#52B788]" />
              <span>+91 8390155321</span>
            </a>
            <span className="text-[#2D6A4F]">•</span>
            <a
              href="mailto:utkalroots@gmail.com"
              className="flex items-center gap-1.5 hover:text-white transition-colors"
              id="header-email-link"
            >
              <Mail className="w-3 h-3 text-[#52B788]" />
              <span className="hidden sm:inline">utkalroots@gmail.com</span>
              <span className="sm:hidden">Email</span>
            </a>
          </div>
        </div>
      </div>

      {/* Main Navbar */}
      <div
        className={`w-full transition-all duration-300 ${
          isScrolled
            ? 'bg-[#FBF8F3]/95 backdrop-blur-md shadow-md py-2.5 border-b border-[#E6D7BD]'
            : 'bg-[#FBF8F3] py-3.5 border-b border-[#EFE7D8]'
        }`}
      >
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 flex items-center justify-between">
          {/* Logo */}
          <BrandLogo
            size="md"
            onClick={() => handleLinkClick('home')}
          />

          {/* Desktop Navigation */}
          <nav className="hidden lg:flex items-center gap-7" id="desktop-nav">
            {navLinks.map((link) => {
              const isActive = activeSection === link.id;
              return (
                <button
                  key={link.id}
                  onClick={() => handleLinkClick(link.id)}
                  id={`nav-link-${link.id}`}
                  className={`text-sm font-medium transition-colors relative py-1 cursor-pointer ${
                    isActive
                      ? 'text-[#1B4332] font-semibold'
                      : 'text-[#4A554E] hover:text-[#1B4332]'
                  }`}
                >
                  {link.label}
                  {isActive && (
                    <span className="absolute bottom-0 left-0 right-0 h-0.5 bg-[#2D6A4F] rounded-full" />
                  )}
                </button>
              );
            })}
          </nav>

          {/* Right Action Icons: Cart & Mobile Menu */}
          <div className="flex items-center gap-3">
            {/* Direct Farm Order Badge (desktop) */}
            <div className="hidden xl:flex items-center gap-1.5 px-3 py-1 rounded-full bg-[#EBF5ED] text-[#1B4332] text-xs font-medium border border-[#CDE5D3]">
              <Award className="w-3.5 h-3.5 text-[#2D6A4F]" />
              <span>Odisha Certified Organic</span>
            </div>

            {/* Interactive Cart Button */}
            <button
              onClick={onOpenCart}
              id="header-cart-btn"
              aria-label="Open Shopping Cart"
              className="relative p-2.5 rounded-full bg-[#F4ECE1] hover:bg-[#E6D7BD] text-[#1B4332] transition-colors flex items-center justify-center cursor-pointer border border-[#DAC9AE]"
            >
              <ShoppingBag className="w-5 h-5 text-[#1B4332]" />
              {cartCount > 0 && (
                <span
                  id="cart-badge-count"
                  className="absolute -top-1 -right-1 bg-[#B85D34] text-white text-[11px] font-bold w-5 h-5 rounded-full flex items-center justify-center shadow-sm animate-pulse"
                >
                  {cartCount}
                </span>
              )}
            </button>

            {/* Mobile Menu Toggle Button */}
            <button
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              id="mobile-menu-toggle-btn"
              aria-label="Toggle navigation menu"
              className="lg:hidden p-2.5 rounded-full text-[#1B4332] hover:bg-[#F4ECE1] cursor-pointer"
            >
              {mobileMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
            </button>
          </div>
        </div>
      </div>

      {/* Mobile Navigation Drawer */}
      {mobileMenuOpen && (
        <div
          id="mobile-nav-drawer"
          className="lg:hidden fixed inset-x-0 top-[96px] bg-[#FBF8F3] border-b border-[#E6D7BD] shadow-xl p-5 space-y-3 z-50 animate-in slide-in-from-top-4 duration-200"
        >
          <div className="flex flex-col space-y-2">
            {navLinks.map((link) => (
              <button
                key={link.id}
                onClick={() => handleLinkClick(link.id)}
                id={`mobile-nav-${link.id}`}
                className={`text-left px-3 py-2.5 rounded-lg text-base font-medium transition-colors cursor-pointer ${
                  activeSection === link.id
                    ? 'bg-[#EBF5ED] text-[#1B4332] font-semibold'
                    : 'text-[#2D3748] hover:bg-[#F4ECE1]'
                }`}
              >
                {link.label}
              </button>
            ))}
          </div>

          <div className="pt-3 border-t border-[#E6D7BD] flex flex-col gap-2 text-sm text-[#4A554E]">
            <div className="flex items-center gap-2">
              <Phone className="w-4 h-4 text-[#2D6A4F]" />
              <a href="tel:+918390155321" className="font-medium text-[#1B4332]">
                +91 8390155321
              </a>
            </div>
            <div className="flex items-center gap-2">
              <Mail className="w-4 h-4 text-[#2D6A4F]" />
              <a href="mailto:utkalroots@gmail.com" className="font-medium text-[#1B4332]">
                utkalroots@gmail.com
              </a>
            </div>
          </div>
        </div>
      )}
    </header>
  );
};
