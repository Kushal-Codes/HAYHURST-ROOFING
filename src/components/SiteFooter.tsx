import React from 'react';
import { Phone, ExternalLink, ArrowUpRight } from 'lucide-react';
import { BUSINESS_INFO, SERVICES } from '../data/hayhurstData';
import { PageRoute } from '../utils/quoteValidation';

interface SiteFooterProps {
  onNavigate: (page: PageRoute) => void;
  onRequestQuote: (categoryId?: string) => void;
}

export const SiteFooter: React.FC<SiteFooterProps> = ({
  onNavigate,
  onRequestQuote,
}) => {
  const pageLinks: { label: string; path: PageRoute }[] = [
    { label: 'Home Overview', path: '/' },
    { label: 'All Services & Materials', path: '/services' },
    { label: 'Project Portfolio (33 Photos)', path: '/portfolio' },
    { label: 'Verified Customer Reviews', path: '/reviews' },
    { label: 'Lancashire Coverage Areas', path: '/areas' },
    { label: '4-Step Free Quote Builder', path: '/quote' },
    { label: 'Direct Contact & FAQs', path: '/contact' },
  ];

  return (
    <>
      <footer className="bg-[#151B1F] text-stone-300 pt-16 pb-24 md:pb-16 border-t border-white/10">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-12 gap-10 pb-12 border-b border-white/10">
            {/* Col 1: Brand & Ethos */}
            <div className="lg:col-span-4 space-y-4">
              <div className="flex items-center gap-3">
                <div className="w-9 h-9 bg-[#27343C] border border-[#C17A52]/50 flex items-center justify-center">
                  <svg
                    viewBox="0 0 36 36"
                    className="w-5 h-5 text-[#C17A52]"
                    fill="none"
                    stroke="currentColor"
                    strokeWidth="2.2"
                  >
                    <path d="M4 22L18 9L32 22" strokeLinecap="square" />
                    <path d="M10 22L18 14.5L26 22" strokeLinecap="square" opacity="0.65" />
                  </svg>
                </div>
                <span className="font-display text-lg font-bold text-white tracking-tight">
                  HAYHURST ROOFING
                </span>
              </div>
              <p className="text-sm text-stone-400 leading-relaxed">
                Good roofs. Honest work. Built to last. Trusted roofing repairs, new slate &amp;
                tile roofs, chimney repointing, guttering, fascias, soffits, and rendering across
                Accrington, Burnley, and Lancashire.
              </p>
              <div className="pt-1 flex flex-wrap gap-3 text-xs">
                <a
                  href={BUSINESS_INFO.externalLinks.googleReviews}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center gap-1 text-[#C17A52] hover:underline font-semibold"
                >
                  <span>Google Reviews (5.0-Star)</span>
                  <ExternalLink className="w-3 h-3" />
                </a>
                <a
                  href={BUSINESS_INFO.externalLinks.myBuilder}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center gap-1 text-[#C17A52] hover:underline font-semibold"
                >
                  <span>MyBuilder</span>
                  <ExternalLink className="w-3 h-3" />
                </a>
                <a
                  href={BUSINESS_INFO.externalLinks.facebook}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center gap-1 text-[#C17A52] hover:underline font-semibold"
                >
                  <span>Facebook</span>
                  <ExternalLink className="w-3 h-3" />
                </a>
              </div>
            </div>

            {/* Col 2: Website Pages */}
            <div className="lg:col-span-3 space-y-3">
              <h3 className="font-display text-xs font-bold uppercase tracking-[0.18em] text-white">
                Website Pages
              </h3>
              <ul className="space-y-2 text-sm">
                {pageLinks.map((item) => (
                  <li key={item.path}>
                    <a
                      href={item.path}
                      onClick={(e) => {
                        e.preventDefault();
                        onNavigate(item.path);
                      }}
                      className="text-stone-400 hover:text-[#C17A52] transition-colors"
                    >
                      {item.label}
                    </a>
                  </li>
                ))}
              </ul>
            </div>

            {/* Col 3: Services Quick Quote */}
            <div className="lg:col-span-2 space-y-3">
              <h3 className="font-display text-xs font-bold uppercase tracking-[0.18em] text-white">
                Roofing Services
              </h3>
              <ul className="space-y-2 text-sm">
                {SERVICES.slice(0, 6).map((service) => (
                  <li key={service.id}>
                    <button
                      type="button"
                      onClick={() => onRequestQuote(service.wizardCategoryId)}
                      className="text-stone-400 hover:text-[#C17A52] transition-colors text-left cursor-pointer"
                    >
                      {service.shortTitle}
                    </button>
                  </li>
                ))}
              </ul>
            </div>

            {/* Col 4: Direct Contact & Postal Note */}
            <div className="lg:col-span-3 space-y-3">
              <h3 className="font-display text-xs font-bold uppercase tracking-[0.18em] text-white">
                Contact Details
              </h3>
              <p className="text-sm">
                <a
                  href={BUSINESS_INFO.phoneHref}
                  className="font-display font-bold text-white hover:text-[#C17A52] block text-base"
                >
                  {BUSINESS_INFO.phoneDisplay}
                </a>
                <a
                  href={BUSINESS_INFO.emailHref}
                  className="text-stone-300 hover:text-[#C17A52] block mt-1"
                >
                  {BUSINESS_INFO.email}
                </a>
              </p>
              <div className="pt-2 border-t border-white/10 text-xs text-stone-400 leading-relaxed">
                <strong className="text-stone-200 block">Postal Address Only:</strong>
                {BUSINESS_INFO.postalAddress.full}
                <span className="block mt-1 text-[11px] text-stone-400">
                  (For postal correspondence only — not a walk-in office or showroom.)
                </span>
              </div>
            </div>
          </div>

          <div className="pt-8 flex flex-col sm:flex-row items-center justify-between gap-4 text-xs text-stone-400">
            <p>© {new Date().getFullYear()} Hayhurst Roofing. All rights reserved.</p>
            <p>Accrington, Burnley &amp; Lancashire Roofing Specialist</p>
          </div>
        </div>
      </footer>

      {/* STICKY MOBILE CALL & QUOTE CONVERSION BAR */}
      <div
        aria-label="Quick Mobile Contact Bar"
        className="fixed bottom-0 left-0 right-0 z-40 md:hidden bg-[#151B1F]/95 backdrop-blur-md border-t border-white/20 p-2.5 grid grid-cols-2 gap-2.5 shadow-2xl"
      >
        <a
          href={BUSINESS_INFO.phoneHref}
          className="whitespace-nowrap py-3 px-2.5 bg-[#27343C] text-white border border-white/20 font-display font-bold text-xs uppercase tracking-wide flex items-center justify-center gap-1.5"
        >
          <Phone className="w-3.5 h-3.5 text-[#C17A52] shrink-0" />
          <span>{BUSINESS_INFO.phoneDisplay}</span>
        </a>
        <button
          type="button"
          onClick={() => onRequestQuote()}
          className="whitespace-nowrap py-3 px-2.5 bg-[#C17A52] text-[#151B1F] font-display font-bold text-xs uppercase tracking-wider flex items-center justify-center gap-1.5 cursor-pointer"
        >
          <span>Free Quote</span>
          <ArrowUpRight className="w-3.5 h-3.5 shrink-0" />
        </button>
      </div>
    </>
  );
};
