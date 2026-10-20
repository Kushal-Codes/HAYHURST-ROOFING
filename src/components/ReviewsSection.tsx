import React, { useState } from 'react';
import { Star, ExternalLink, Quote, CheckCircle2, ShieldCheck } from 'lucide-react';
import { VERIFIED_REVIEWS, BUSINESS_INFO } from '../data/hayhurstData';

const REVIEW_FILTERS = [
  'All Verified Reviews',
  'Chimney & Ridge Work',
  'Slates & Leaks',
  'Full Roof Overhaul',
  'Guttering',
] as const;

export const ReviewsSection: React.FC = () => {
  const [selectedFilter, setSelectedFilter] = useState<string>('All Verified Reviews');

  const filteredReviews = VERIFIED_REVIEWS.filter((review) => {
    if (selectedFilter === 'All Verified Reviews') return true;
    if (selectedFilter === 'Chimney & Ridge Work') {
      return (
        review.serviceTag.toLowerCase().includes('chimney') ||
        review.serviceTag.toLowerCase().includes('ridge')
      );
    }
    if (selectedFilter === 'Slates & Leaks') {
      return (
        review.serviceTag.toLowerCase().includes('slate') ||
        review.serviceTag.toLowerCase().includes('leak')
      );
    }
    if (selectedFilter === 'Full Roof Overhaul') {
      return review.serviceTag.toLowerCase().includes('overhaul');
    }
    if (selectedFilter === 'Guttering') {
      return review.serviceTag.toLowerCase().includes('gutter');
    }
    return true;
  });

  return (
    <section
      id="reviews"
      className="py-20 lg:py-28 bg-[#F6F4EF] text-[#151B1F] border-b border-[#151B1F]/10"
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header & Verified Reputation Summary */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-end pb-12 border-b border-[#151B1F]/15">
          <div className="lg:col-span-7">
            <span className="text-xs font-display font-bold uppercase tracking-[0.2em] text-[#C17A52] block mb-3">
              03 / VERIFIED CUSTOMER FEEDBACK
            </span>
            <h2 className="font-display text-3xl sm:text-4xl lg:text-5xl font-bold tracking-tight text-[#151B1F] leading-[1.1]">
              Real Words from Homeowners Across Accrington &amp; Lancashire.
            </h2>
          </div>

          <div className="lg:col-span-5 bg-white border border-[#151B1F]/15 p-5 sm:p-6">
            <div className="flex items-center justify-between gap-4 pb-4 border-b border-[#151B1F]/10">
              <div>
                <div className="flex items-center gap-2">
                  <span className="font-display text-3xl font-bold text-[#151B1F]">5.0</span>
                  <div className="flex items-center text-[#C17A52]" aria-label="5 out of 5 stars">
                    {[...Array(5)].map((_, i) => (
                      <Star key={i} className="w-4 h-4 fill-current" />
                    ))}
                  </div>
                </div>
                <p className="text-xs text-[#27343C] mt-1 font-medium">
                  Based on 37 verified Google reviews &amp; positive MyBuilder feedback
                </p>
              </div>
              <ShieldCheck className="w-8 h-8 text-[#C17A52] shrink-0" />
            </div>

            <div className="pt-4 flex flex-wrap items-center gap-3">
              <a
                href={BUSINESS_INFO.externalLinks.googleReviews}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-1.5 text-xs font-display font-bold uppercase tracking-wider px-3.5 py-2 bg-[#151B1F] text-white hover:bg-[#27343C] transition-colors"
              >
                <span>View on Google Maps</span>
                <ExternalLink className="w-3.5 h-3.5 text-[#C17A52]" />
              </a>

              <a
                href={BUSINESS_INFO.externalLinks.myBuilder}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-1.5 text-xs font-display font-bold uppercase tracking-wider px-3.5 py-2 border border-[#151B1F]/25 text-[#151B1F] hover:border-[#C17A52] transition-colors"
              >
                <span>MyBuilder Profile</span>
                <ExternalLink className="w-3.5 h-3.5 text-[#C17A52]" />
              </a>
            </div>
          </div>
        </div>

        {/* Filter Bar */}
        <div className="mt-8 flex flex-wrap items-center justify-between gap-4">
          <div className="flex flex-wrap gap-2" role="group" aria-label="Filter customer reviews by work type">
            {REVIEW_FILTERS.map((filter) => (
              <button
                key={filter}
                type="button"
                onClick={() => setSelectedFilter(filter)}
                aria-pressed={selectedFilter === filter}
                className={`px-4 py-2 text-xs font-display font-semibold uppercase tracking-wider border transition-colors cursor-pointer ${
                  selectedFilter === filter
                    ? 'bg-[#151B1F] text-white border-[#151B1F]'
                    : 'bg-white text-[#27343C] border-[#151B1F]/15 hover:border-[#C17A52]'
                }`}
              >
                {filter}
              </button>
            ))}
          </div>
          <span className="text-xs font-mono text-[#778087]">
            Showing {filteredReviews.length} of {VERIFIED_REVIEWS.length} verbatim reviews
          </span>
        </div>

        {/* Editorial Review Cards Grid */}
        <div className="mt-8 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {filteredReviews.map((review, index) => (
            <article
              key={review.id}
              className={`bg-white border border-[#151B1F]/15 p-6 sm:p-7 flex flex-col justify-between transition-all hover:border-[#C17A52] ${
                index === 0 && selectedFilter === 'All Verified Reviews'
                  ? 'md:col-span-2 lg:col-span-2 bg-[#151B1F] text-white border-[#151B1F]'
                  : ''
              }`}
            >
              <div>
                <div className="flex items-center justify-between gap-2 mb-4">
                  <div className="flex items-center gap-1 text-[#C17A52]" aria-label="5 stars">
                    {[...Array(review.rating)].map((_, i) => (
                      <Star key={i} className="w-4 h-4 fill-current" />
                    ))}
                  </div>
                  <span
                    className={`text-[11px] font-mono uppercase px-2.5 py-0.5 border ${
                      index === 0 && selectedFilter === 'All Verified Reviews'
                        ? 'border-white/20 text-stone-300 bg-white/5'
                        : 'border-[#151B1F]/15 text-[#27343C] bg-[#F6F4EF]'
                    }`}
                  >
                    {review.serviceTag}
                  </span>
                </div>

                {/* Highlight Pull-Quote */}
                <p
                  className={`font-display font-bold text-base sm:text-lg mb-3 leading-snug ${
                    index === 0 && selectedFilter === 'All Verified Reviews'
                      ? 'text-[#C17A52]'
                      : 'text-[#151B1F]'
                  }`}
                >
                  &ldquo;{review.highlight}&rdquo;
                </p>

                {/* Full Verbatim Quote */}
                <blockquote
                  className={`text-sm leading-relaxed ${
                    index === 0 && selectedFilter === 'All Verified Reviews'
                      ? 'text-stone-200'
                      : 'text-[#27343C]'
                  }`}
                >
                  &ldquo;{review.quote}&rdquo;
                </blockquote>
              </div>

              <div
                className={`mt-6 pt-4 border-t flex items-center justify-between text-xs ${
                  index === 0 && selectedFilter === 'All Verified Reviews'
                    ? 'border-white/15 text-stone-300'
                    : 'border-[#151B1F]/10 text-[#778087]'
                }`}
              >
                <div className="flex items-center gap-2">
                  <Quote className="w-3.5 h-3.5 text-[#C17A52]" />
                  <span
                    className={`font-display font-bold ${
                      index === 0 && selectedFilter === 'All Verified Reviews'
                        ? 'text-white'
                        : 'text-[#151B1F]'
                    }`}
                  >
                    {review.author}
                  </span>
                  <span>· {review.date}</span>
                </div>
                <span className="inline-flex items-center gap-1 text-[#C17A52] font-semibold">
                  <CheckCircle2 className="w-3.5 h-3.5" />
                  Verified {review.source}
                </span>
              </div>
            </article>
          ))}
        </div>
      </div>
    </section>
  );
};
