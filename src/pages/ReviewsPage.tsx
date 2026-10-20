import React from 'react';
import {
  Star,
  CheckCircle2,
  Camera,
  ExternalLink,
  ArrowRight,
} from 'lucide-react';
import { ReviewsSection } from '../components/ReviewsSection';
import {
  BUSINESS_INFO,
  TRUST_PILLARS,
  WORKFLOW_STAGES,
} from '../data/hayhurstData';

interface ReviewsPageProps {
  onRequestQuote: (categoryId?: string) => void;
}

const REVIEW_THEME_METRICS = [
  {
    title: 'Before & After Rooftop Photos',
    detail: 'Highlighted by Peter H & Denis Shorrock for full visual peace of mind',
  },
  {
    title: 'Prompt, Reliable Attendance',
    detail: 'Turning up the very next morning or on the exact agreed dry day',
  },
  {
    title: 'Fair, Reasonable Pricing',
    detail: 'Praised across every single verified review from small slate fixes to full roofs',
  },
  {
    title: 'Tidy Completion & Rubbish Removed',
    detail: 'Gutters cleared and all old mortar, slates, and debris taken away',
  },
] as const;

export const ReviewsPage: React.FC<ReviewsPageProps> = ({ onRequestQuote }) => {
  return (
    <div className="pt-20">
      {/* Dedicated Page Header */}
      <section className="bg-[#151B1F] text-white py-16 lg:py-20 border-b border-white/10">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-end">
            <div className="lg:col-span-7">
              <span className="text-xs font-display font-bold uppercase tracking-[0.2em] text-[#C17A52] block mb-3">
                PAGE // VERIFIED CUSTOMER REPUTATION
              </span>
              <h1 className="font-display text-4xl sm:text-5xl font-bold tracking-tight text-white leading-[1.08]">
                Rated 5.0-Star by Homeowners Across Accrington &amp; Lancashire.
              </h1>
              <p className="text-base sm:text-lg text-stone-300 mt-4 leading-relaxed">
                Every review below is a verbatim customer endorsement from Google Reviews and
                Hayhurst Roofing&rsquo;s verified public feedback.
              </p>
            </div>

            <div className="lg:col-span-5 bg-[#27343C]/60 border border-white/15 p-6">
              <div className="flex items-center gap-3">
                <span className="font-display text-4xl font-bold text-white">5.0</span>
                <div>
                  <div className="flex text-[#C17A52]">
                    {[...Array(5)].map((_, i) => (
                      <Star key={i} className="w-4 h-4 fill-current" />
                    ))}
                  </div>
                  <span className="text-xs text-stone-300 block mt-0.5">
                    37 Verified Google Reviews + MyBuilder Profile
                  </span>
                </div>
              </div>
              <div className="mt-4 pt-4 border-t border-white/10 flex flex-wrap gap-3">
                <a
                  href={BUSINESS_INFO.externalLinks.googleReviews}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center gap-1.5 px-3.5 py-2 bg-[#C17A52] text-[#151B1F] font-display font-bold text-xs uppercase tracking-wider"
                >
                  <span>Verify on Google Maps</span>
                  <ExternalLink className="w-3.5 h-3.5" />
                </a>
                <a
                  href={BUSINESS_INFO.externalLinks.myBuilder}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center gap-1.5 px-3.5 py-2 bg-[#151B1F] text-white border border-white/20 font-display font-semibold text-xs uppercase tracking-wider"
                >
                  <span>MyBuilder Reviews</span>
                  <ExternalLink className="w-3.5 h-3.5 text-[#C17A52]" />
                </a>
              </div>
            </div>
          </div>

          {/* Recurring Review Themes Strip */}
          <div className="mt-12 pt-8 border-t border-white/10 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {REVIEW_THEME_METRICS.map((theme) => (
              <div key={theme.title} className="flex items-start gap-3">
                <CheckCircle2 className="w-4 h-4 text-[#C17A52] shrink-0 mt-1" />
                <div>
                  <h2 className="font-display font-bold text-sm text-white">
                    {theme.title}
                  </h2>
                  <p className="text-xs text-stone-300 mt-1 leading-relaxed">
                    {theme.detail}
                  </p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Full Filterable Reviews Wall */}
      <ReviewsSection />

      {/* The 4 Trust Pillars & 3-Stage Process Behind the Reviews */}
      <section className="py-20 bg-[#151B1F] text-white border-b border-white/10">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-16">
          <div>
            <span className="text-xs font-display font-bold uppercase tracking-[0.2em] text-[#C17A52] block mb-2">
              HOW WE EARN EVERY RECOMMENDATION
            </span>
            <h2 className="font-display text-3xl sm:text-4xl font-bold text-white">
              The 3-Stage Photo-Documented Standard
            </h2>
            <div className="mt-8 grid grid-cols-1 md:grid-cols-3 gap-8">
              {WORKFLOW_STAGES.map((stage) => (
                <div
                  key={stage.step}
                  className="bg-[#27343C]/45 border border-white/12 overflow-hidden flex flex-col justify-between"
                >
                  <div>
                    <div className="aspect-[16/10] bg-[#151B1F] relative">
                      <img
                        src={stage.image}
                        alt={stage.imageCaption}
                        className="w-full h-full object-cover"
                        loading="lazy"
                      />
                      <span className="absolute top-3 left-3 bg-[#151B1F]/90 px-3 py-1 font-mono text-xs font-bold text-[#C17A52]">
                        STAGE {stage.step}
                      </span>
                    </div>
                    <div className="p-6">
                      <h3 className="font-display text-xl font-bold text-white">
                        {stage.title}
                      </h3>
                      <p className="text-sm text-stone-300 mt-2 leading-relaxed">
                        {stage.description}
                      </p>
                    </div>
                  </div>
                  <div className="px-6 py-3.5 bg-[#151B1F]/60 border-t border-white/10 flex items-center gap-2 text-xs text-stone-400">
                    <Camera className="w-3.5 h-3.5 text-[#C17A52]" />
                    <span>{stage.imageCaption}</span>
                  </div>
                </div>
              ))}
            </div>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 pt-8 border-t border-white/10">
            {TRUST_PILLARS.map((pillar) => (
              <div
                key={pillar.index}
                className="bg-[#27343C]/35 border border-white/10 p-6 flex flex-col justify-between"
              >
                <div>
                  <span className="font-mono text-xs font-bold text-[#C17A52] block mb-2">
                    PILLAR // {pillar.index}
                  </span>
                  <h3 className="font-display text-lg font-bold text-white mb-2">
                    {pillar.title}
                  </h3>
                  <p className="text-xs sm:text-sm text-stone-300 leading-relaxed">
                    {pillar.description}
                  </p>
                </div>
                <div className="mt-4 pt-3 border-t border-white/10 text-xs text-[#C17A52]">
                  {pillar.evidence}
                </div>
              </div>
            ))}
          </div>

          <div className="text-center pt-4">
            <button
              type="button"
              onClick={() => onRequestQuote()}
              className="inline-flex items-center gap-2.5 px-8 py-4 bg-[#C17A52] hover:bg-[#d1875d] text-[#151B1F] font-display font-bold text-sm uppercase tracking-wider cursor-pointer"
            >
              <span>Request Your Free, No-Obligation Quote</span>
              <ArrowRight className="w-4 h-4" />
            </button>
          </div>
        </div>
      </section>
    </div>
  );
};
