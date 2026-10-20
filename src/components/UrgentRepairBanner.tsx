import React from 'react';
import { Phone, AlertTriangle, ArrowRight, ShieldAlert } from 'lucide-react';
import { BUSINESS_INFO } from '../data/hayhurstData';

interface UrgentRepairBannerProps {
  onRequestUrgentQuote: () => void;
}

export const UrgentRepairBanner: React.FC<UrgentRepairBannerProps> = ({
  onRequestUrgentQuote,
}) => {
  return (
    <section
      aria-label="Urgent Roof Leak or Storm Damage Support"
      className="bg-[#27343C] text-white border-b border-white/15 relative overflow-hidden"
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-14 lg:py-16">
        <div className="bg-[#151B1F] border-l-4 border-l-[#C17A52] border border-white/15 p-6 sm:p-10 grid grid-cols-1 lg:grid-cols-12 gap-8 items-center shadow-xl">
          <div className="lg:col-span-8 space-y-3">
            <div className="inline-flex items-center gap-2 text-xs font-display font-bold uppercase tracking-[0.2em] text-[#C17A52]">
              <AlertTriangle className="w-4 h-4" />
              <span>URGENT ROOF LEAK OR STORM DAMAGE?</span>
            </div>

            <h2 className="font-display text-2xl sm:text-3xl font-bold text-white leading-tight">
              Slipped Slate, Active Ceiling Leak, or Storm-Damaged Ridge?
            </h2>

            <p className="text-sm sm:text-base text-stone-300 leading-relaxed max-w-2xl">
              High winds and heavy East Lancashire rain can dislodge slates, loosen flashing, or
              overflow blocked gutters rapidly. Call Ash directly to discuss urgent issues—when
              safe weather conditions permit rooftop access, we prioritise active leaks and take
              photographs on the roof so you know exactly what has happened.
            </p>

            <div className="pt-1 flex items-center gap-2 text-xs text-stone-400">
              <ShieldAlert className="w-4 h-4 text-[#C17A52] shrink-0" />
              <span>
                Honest assessment first: if a quick slate replacement or flashing repoint solves it,
                we will tell you straight.
              </span>
            </div>
          </div>

          <div className="lg:col-span-4 flex flex-col sm:flex-row lg:flex-col gap-3">
            <a
              href={BUSINESS_INFO.phoneHref}
              className="w-full py-4 px-6 bg-[#C17A52] hover:bg-[#d1875d] text-[#151B1F] font-display font-bold text-sm uppercase tracking-wider flex items-center justify-center gap-2.5 transition-colors shadow-md"
            >
              <Phone className="w-4 h-4" />
              <span>Call Ash Now: {BUSINESS_INFO.phoneDisplay}</span>
            </a>

            <button
              type="button"
              onClick={onRequestUrgentQuote}
              className="w-full py-3.5 px-6 bg-[#27343C] hover:bg-[#32434d] text-white border border-white/20 font-display font-semibold text-xs sm:text-sm uppercase tracking-wider flex items-center justify-center gap-2 transition-colors cursor-pointer"
            >
              <span>Log Urgent Leak Enquiry</span>
              <ArrowRight className="w-4 h-4 text-[#C17A52]" />
            </button>
          </div>
        </div>
      </div>
    </section>
  );
};
