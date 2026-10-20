import React, { useState, useEffect } from 'react';
import { Phone, Menu, X, ArrowUpRight, ShieldCheck } from 'lucide-react';
import { BUSINESS_INFO } from '../data/hayhurstData';
import { PageRoute } from '../utils/quoteValidation';

interface NavbarProps {
  currentPage: PageRoute;
  onNavigate: (page: PageRoute) => void;
  onRequestQuote: (categoryId?: string) => void;
}

export const Navbar: React.FC<NavbarProps> = ({
  currentPage,
  onNavigate,
  onRequestQuote,
}) => {
  const [scrolled, setScrolled] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 24);
    };
    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const navPages: { label: string; path: PageRoute }[] = [
    { label: 'Home', path: '/' },
    { label: 'Services', path: '/services' },
    { label: 'Portfolio', path: '/portfolio' },
    { label: 'Reviews', path: '/reviews' },
    { label: 'Coverage Areas', path: '/areas' },
    { label: 'Contact', path: '/contact' },
  ];

  const handleLinkClick = (e: React.MouseEvent<HTMLAnchorElement>, path: PageRoute) => {
    e.preventDefault();
    setMobileMenuOpen(false);
    onNavigate(path);
  };

  return (
    <header
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
        scrolled
          ? 'bg-[#151B1F]/95 backdrop-blur-md border-b border-white/10 py-3 shadow-xl'
          : 'bg-[#151B1F]/90 backdrop-blur-sm border-b border-white/10 py-4'
      }`}
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between gap-4">
          {/* Brand Identity */}
          <a
            href="/"
            onClick={(e) => handleLinkClick(e, '/')}
            className="group flex items-center gap-2.5 sm:gap-3 text-left focus:outline-none shrink-0"
            aria-label="Hayhurst Roofing Home"
          >
            <div className="w-9 h-9 sm:w-10 sm:h-10 bg-[#27343C] border border-[#C17A52]/50 flex items-center justify-center relative overflow-hidden transition-colors group-hover:border-[#C17A52] shrink-0">
              <svg
                viewBox="0 0 36 36"
                className="w-5 h-5 sm:w-6 sm:h-6 text-[#C17A52]"
                fill="none"
                stroke="currentColor"
                strokeWidth="2.2"
              >
                <path d="M4 22L18 9L32 22" strokeLinecap="square" />
                <path d="M10 22L18 14.5L26 22" strokeLinecap="square" opacity="0.65" />
                <line x1="8" y1="26" x2="28" y2="26" strokeWidth="1.5" opacity="0.4" />
              </svg>
            </div>
            <div className="whitespace-nowrap">
              <span className="block font-display text-sm sm:text-lg font-bold tracking-tight text-white leading-none">
                HAYHURST ROOFING
              </span>
              <span className="block text-[9px] sm:text-[11px] uppercase tracking-[0.14em] sm:tracking-[0.16em] text-[#C17A52] font-medium mt-1">
                Accrington · Lancashire
              </span>
            </div>
          </a>

          {/* Desktop Multi-Page Navigation */}
          <nav
            aria-label="Primary Navigation"
            className="hidden lg:flex items-center gap-6"
          >
            {navPages.map((page) => {
              const isActive =
                currentPage === page.path ||
                (page.path === '/contact' && currentPage === '/quote');
              return (
                <a
                  key={page.path}
                  href={page.path}
                  onClick={(e) => handleLinkClick(e, page.path)}
                  aria-current={isActive ? 'page' : undefined}
                  className={`whitespace-nowrap text-sm font-medium transition-colors py-1 relative after:content-[''] after:absolute after:bottom-0 after:left-0 after:h-[2px] after:bg-[#C17A52] after:transition-all ${
                    isActive
                      ? 'text-white font-semibold after:w-full'
                      : 'text-stone-300 hover:text-white after:w-0 hover:after:w-full'
                  }`}
                >
                  {page.label}
                </a>
              );
            })}
          </nav>

          {/* Desktop Call & Quote CTAs */}
          <div className="hidden md:flex items-center gap-3 shrink-0">
            <a
              href={BUSINESS_INFO.phoneHref}
              className="whitespace-nowrap inline-flex items-center gap-2 px-3.5 py-2.5 text-xs sm:text-sm font-semibold text-white border border-white/15 hover:border-[#C17A52] bg-white/[0.03] hover:bg-white/[0.07] transition-colors"
              aria-label={`Call Ash on ${BUSINESS_INFO.phoneDisplay}`}
            >
              <Phone className="w-3.5 h-3.5 text-[#C17A52] shrink-0" />
              <span className="text-stone-300 font-normal hidden xl:inline">Call Ash:</span>
              <span className="tracking-wide font-display">{BUSINESS_INFO.phoneDisplay}</span>
            </a>

            <button
              type="button"
              onClick={() => onRequestQuote()}
              className={`whitespace-nowrap inline-flex items-center gap-2 px-4 sm:px-5 py-2.5 text-xs sm:text-sm font-display font-semibold uppercase tracking-wider transition-colors cursor-pointer ${
                currentPage === '/quote'
                  ? 'bg-white text-[#151B1F]'
                  : 'bg-[#C17A52] hover:bg-[#d1875d] text-[#151B1F]'
              }`}
            >
              <span>Get Free Quote</span>
              <ArrowUpRight className="w-4 h-4 shrink-0" />
            </button>
          </div>

          {/* Mobile Call + Menu Toggle */}
          <div className="flex items-center gap-1.5 sm:gap-2 md:hidden shrink-0">
            <a
              href={BUSINESS_INFO.phoneHref}
              className="whitespace-nowrap inline-flex items-center gap-1 px-2 py-2 text-[11px] font-display font-semibold bg-[#27343C] text-white border border-[#C17A52]/40"
              aria-label={`Call Ash on ${BUSINESS_INFO.phoneDisplay}`}
            >
              <Phone className="w-3 h-3 text-[#C17A52] shrink-0" />
              <span>{BUSINESS_INFO.phoneDisplay}</span>
            </a>

            <button
              type="button"
              onClick={() => setMobileMenuOpen((prev) => !prev)}
              aria-expanded={mobileMenuOpen}
              aria-label={mobileMenuOpen ? 'Close navigation menu' : 'Open navigation menu'}
              className="p-2 text-stone-200 hover:text-white border border-white/15 bg-[#27343C]/60"
            >
              {mobileMenuOpen ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
            </button>
          </div>
        </div>
      </div>

      {/* Mobile Navigation Drawer */}
      {mobileMenuOpen && (
        <div className="lg:hidden bg-[#151B1F] border-b border-white/15 px-4 pt-4 pb-6 space-y-4">
          <nav aria-label="Mobile Navigation" className="flex flex-col divide-y divide-white/10">
            {navPages.map((page) => {
              const isActive = currentPage === page.path;
              return (
                <a
                  key={page.path}
                  href={page.path}
                  onClick={(e) => handleLinkClick(e, page.path)}
                  aria-current={isActive ? 'page' : undefined}
                  className={`py-3 text-base font-display font-medium flex items-center justify-between ${
                    isActive ? 'text-[#C17A52] font-bold' : 'text-stone-200 hover:text-[#C17A52]'
                  }`}
                >
                  <span>{page.label}</span>
                  <ArrowUpRight className="w-4 h-4 text-[#C17A52]" />
                </a>
              );
            })}
          </nav>

          <div className="pt-2 flex flex-col gap-2.5">
            <button
              type="button"
              onClick={() => {
                setMobileMenuOpen(false);
                onRequestQuote();
              }}
              className="w-full py-3.5 px-4 bg-[#C17A52] text-[#151B1F] font-display font-bold text-sm uppercase tracking-wider flex items-center justify-center gap-2"
            >
              <span>Get Free Quote</span>
              <ArrowUpRight className="w-4 h-4" />
            </button>

            <a
              href={BUSINESS_INFO.phoneHref}
              className="w-full py-3 px-4 bg-[#27343C] text-white border border-white/15 font-display font-semibold text-sm flex items-center justify-center gap-2"
            >
              <Phone className="w-4 h-4 text-[#C17A52]" />
              <span>Call Ash: {BUSINESS_INFO.phoneDisplay}</span>
            </a>

            <div className="flex items-center justify-center gap-2 text-xs text-stone-400 pt-1">
              <ShieldCheck className="w-4 h-4 text-[#C17A52]" />
              <span>5.0-Star Google Rating (37 Reviews) · Accrington &amp; Lancashire</span>
            </div>
          </div>
        </div>
      )}
    </header>
  );
};
