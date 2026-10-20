import React, { useState } from 'react';
import {
  Phone,
  ArrowRight,
  Star,
  Camera,
  MapPin,
  CheckCircle2,
  ExternalLink,
  Shield,
} from 'lucide-react';
import { BUSINESS_INFO } from '../data/hayhurstData';

interface HeroSectionProps {
  onRequestQuote: (categoryId?: string) => void;
}

const HERO_ROOFTOP_VIEWS = [
  {
    id: 'hipped-slate',
    image: '/images/gallery/029.jpg',
    label: 'Completed Natural Slate & Dry-Ridge Roof',
    location: 'Lancashire Residential Project',
    detail: 'Full strip-and-reslate with Cromar Vent3 Pro BBA membrane & mechanical dry-hip system',
  },
  {
    id: 'ridge-rebedding',
    image: '/images/gallery/001.jpg',
    label: 'Ridge Tile Re-Bedding & Welsh Slate Roof',
    location: 'Pennine & East Lancashire Views',
    detail: 'Repointed ridge & hip tiles with replacement natural slates documented on the roof',
  },
  {
    id: 'accrington-chimney',
    image: '/images/gallery/010.jpg',
    label: 'Chimney Stack Repointing & New Cowls',
    location: 'Accrington (Overlooking Peel Tower)',
    detail: 'Weathered red-brick stack repointed, flaunched in fresh mortar & fitted with cowls',
  },
] as const;

export const HeroSection: React.FC<HeroSectionProps> = ({ onRequestQuote }) => {
  const [activeViewIndex, setActiveViewIndex] = useState(0);
  const activeView = HERO_ROOFTOP_VIEWS[activeViewIndex];

  return (
    <section
      id="top"
      className="relative bg-[#151B1F] text-white pt-24 sm:pt-28 overflow-hidden border-b border-white/10"
    >
      {/* Background Architectural Image with High-Contrast Gradient Scrim */}
      <div className="absolute inset-0 z-0">
        <img
          src={activeView.image}
          alt={activeView.label}
          className="w-full h-full object-cover object-center opacity-35 scale-102 transition-all duration-700"
          fetchPriority="high"
        />
        <div
          className="absolute inset-0"
          style={{
            background:
              'linear-gradient(105deg, rgba(21,27,31,0.96) 0%, rgba(21,27,31,0.88) 48%, rgba(21,27,31,0.58) 100%)',
          }}
        />
        <div className="absolute inset-0 bg-gradient-to-t from-[#151B1F] via-transparent to-[#151B1F]/60" />
      </div>

      {/* Subtle Architectural Grid Lines */}
      <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pt-6 pb-14 lg:py-20">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 lg:gap-12 items-end">
          {/* Left Column: Editorial Headline & Direct Conversion */}
          <div className="lg:col-span-7 space-y-6 sm:space-y-8">
            <div className="inline-flex items-center gap-3 border-l-2 border-[#C17A52] pl-3.5 py-0.5">
              <span className="text-xs sm:text-sm font-display font-semibold uppercase tracking-[0.2em] text-[#C17A52]">
                HAYHURST ROOFING | ACCRINGTON, LANCASHIRE
              </span>
            </div>

            <h1 className="font-display text-4xl sm:text-5xl lg:text-[3.65rem] font-bold tracking-tight text-white leading-[1.06]">
              GOOD ROOFS.{' '}
              <span className="text-[#F6F4EF] block sm:inline">HONEST WORK.</span>{' '}
              <span className="text-[#C17A52] block">BUILT TO LAST.</span>
            </h1>

            <p className="text-base sm:text-lg lg:text-xl text-stone-200 max-w-2xl leading-relaxed font-normal">
              From a single slipped slate to a complete roof replacement, trusted roofing repairs
              and services across <strong className="font-semibold text-white">Accrington</strong>,{' '}
              <strong className="font-semibold text-white">Burnley</strong> and{' '}
              <strong className="font-semibold text-white">Lancashire</strong>.
            </p>

            {/* Primary & Secondary CTAs */}
            <div className="pt-2 space-y-4">
              <div className="flex flex-col sm:flex-row items-stretch sm:items-center gap-3.5">
                <button
                  type="button"
                  onClick={() => onRequestQuote()}
                  className="inline-flex items-center justify-center gap-3 px-7 py-4 bg-[#C17A52] hover:bg-[#d1875d] text-[#151B1F] font-display font-bold text-sm sm:text-base uppercase tracking-wider transition-all cursor-pointer shadow-lg"
                >
                  <span>GET YOUR FREE QUOTE</span>
                  <ArrowRight className="w-4 h-4" />
                </button>

                <a
                  href={BUSINESS_INFO.phoneHref}
                  className="inline-flex items-center justify-center gap-3 px-6 py-4 bg-[#27343C]/90 hover:bg-[#27343C] text-white border border-white/20 hover:border-[#C17A52] font-display font-semibold text-sm sm:text-base tracking-wide transition-all"
                >
                  <Phone className="w-4 h-4 text-[#C17A52]" />
                  <span>CALL ASH | {BUSINESS_INFO.phoneDisplay}</span>
                </a>
              </div>

              {/* Reassurance Line Under Primary CTA */}
              <div className="flex flex-wrap items-center gap-x-5 gap-y-2 text-xs sm:text-sm text-stone-300 pt-1">
                <span className="inline-flex items-center gap-1.5">
                  <CheckCircle2 className="w-4 h-4 text-[#C17A52] shrink-0" />
                  Free, no-obligation quotes
                </span>
                <span className="inline-flex items-center gap-1.5">
                  <CheckCircle2 className="w-4 h-4 text-[#C17A52] shrink-0" />
                  Before &amp; after photos taken on the roof
                </span>
                <span className="inline-flex items-center gap-1.5">
                  <CheckCircle2 className="w-4 h-4 text-[#C17A52] shrink-0" />
                  Tidy completion &amp; rubbish removed
                </span>
              </div>
            </div>

            {/* Featured Verbatim Customer Endorsement Snippet */}
            <div className="border-t border-white/15 pt-6 mt-4">
              <blockquote className="text-sm text-stone-300 italic leading-relaxed">
                &ldquo;Spoke to Ash over the phone about a loose slate I had. The following morning
                he turned up, went up, took pictures, explained there was a couple of other issues
                he could solve whilst he was up there... sorted it no problem and for a good
                price.&rdquo;
              </blockquote>
              <div className="mt-2.5 flex items-center gap-3 text-xs text-stone-400">
                <div className="flex items-center text-[#C17A52]" aria-label="5 out of 5 stars">
                  {[...Array(5)].map((_, i) => (
                    <Star key={i} className="w-3.5 h-3.5 fill-current" />
                  ))}
                </div>
                <span className="font-semibold text-white">Peter H</span>
                <span>· Verified Google Review (May 2025)</span>
              </div>
            </div>
          </div>

          {/* Right Column: Authentic Rooftop Documentation Showcase */}
          <div className="lg:col-span-5">
            <div className="bg-[#27343C]/85 backdrop-blur-md border border-white/15 p-3 sm:p-4 shadow-2xl">
              <div className="flex items-center justify-between pb-3 mb-3 border-b border-white/10 text-xs">
                <span className="inline-flex items-center gap-2 font-display uppercase tracking-wider text-[#C17A52] font-semibold">
                  <Camera className="w-3.5 h-3.5" />
                  Genuine Hayhurst Roofing Work
                </span>
                <span className="text-stone-300 font-mono text-[11px]">
                  0{activeViewIndex + 1} / 0{HERO_ROOFTOP_VIEWS.length}
                </span>
              </div>

              <div className="relative aspect-[4/3] overflow-hidden bg-[#151B1F] border border-white/10">
                <img
                  src={activeView.image}
                  alt={activeView.label}
                  className="w-full h-full object-cover transition-transform duration-700 hover:scale-105"
                />
                <div className="absolute bottom-0 inset-x-0 bg-gradient-to-t from-[#151B1F] via-[#151B1F]/85 to-transparent p-4 pt-10">
                  <p className="text-xs uppercase tracking-widest text-[#C17A52] font-semibold">
                    {activeView.location}
                  </p>
                  <p className="font-display text-sm sm:text-base font-bold text-white mt-0.5">
                    {activeView.label}
                  </p>
                  <p className="text-xs text-stone-300 mt-1 leading-snug">{activeView.detail}</p>
                </div>
              </div>

              {/* Interactive Rooftop Viewpoint Switcher */}
              <div className="grid grid-cols-3 gap-2 mt-3" role="group" aria-label="Select rooftop project photograph">
                {HERO_ROOFTOP_VIEWS.map((view, idx) => (
                  <button
                    key={view.id}
                    type="button"
                    onClick={() => setActiveViewIndex(idx)}
                    aria-pressed={activeViewIndex === idx}
                    className={`text-left p-2 border transition-all cursor-pointer ${
                      activeViewIndex === idx
                        ? 'border-[#C17A52] bg-[#151B1F] text-white'
                        : 'border-white/10 bg-[#151B1F]/50 text-stone-400 hover:text-white hover:border-white/25'
                    }`}
                  >
                    <span className="block font-mono text-[10px] text-[#C17A52]">
                      PROJECT 0{idx + 1}
                    </span>
                    <span className="block text-[11px] font-medium truncate mt-0.5">
                      {view.label.split('&')[0]}
                    </span>
                  </button>
                ))}
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* PHASE 4: IMMEDIATE CREDIBILITY BAR */}
      <div className="relative z-10 bg-[#27343C]/90 border-t border-white/10">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-5">
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-5 gap-4 lg:gap-6 divide-y sm:divide-y-0 lg:divide-x divide-white/10">
            {/* 1. Google Rating */}
            <a
              href={BUSINESS_INFO.externalLinks.googleReviews}
              target="_blank"
              rel="noopener noreferrer"
              className="group flex items-start gap-3 pt-2 sm:pt-0 first:pt-0"
            >
              <div className="p-2 bg-[#151B1F] border border-[#C17A52]/40 text-[#C17A52] shrink-0">
                <Star className="w-4 h-4 fill-current" />
              </div>
              <div>
                <div className="flex items-center gap-1.5">
                  <span className="font-display font-bold text-sm text-white group-hover:text-[#C17A52] transition-colors">
                    5.0-Star Google Rating
                  </span>
                  <ExternalLink className="w-3 h-3 text-stone-400" />
                </div>
                <p className="text-xs text-stone-300 mt-0.5">
                  37 verified customer reviews
                </p>
              </div>
            </a>

            {/* 2. MyBuilder Profile */}
            <a
              href={BUSINESS_INFO.externalLinks.myBuilder}
              target="_blank"
              rel="noopener noreferrer"
              className="group flex items-start gap-3 pt-3 sm:pt-0 lg:pl-5"
            >
              <div className="p-2 bg-[#151B1F] border border-[#C17A52]/40 text-[#C17A52] shrink-0">
                <Shield className="w-4 h-4" />
              </div>
              <div>
                <div className="flex items-center gap-1.5">
                  <span className="font-display font-bold text-sm text-white group-hover:text-[#C17A52] transition-colors">
                    Reviewed on MyBuilder
                  </span>
                  <ExternalLink className="w-3 h-3 text-stone-400" />
                </div>
                <p className="text-xs text-stone-300 mt-0.5">
                  Verified homeowner feedback
                </p>
              </div>
            </a>

            {/* 3. Coverage */}
            <div className="flex items-start gap-3 pt-3 sm:pt-0 lg:pl-5">
              <div className="p-2 bg-[#151B1F] border border-[#C17A52]/40 text-[#C17A52] shrink-0">
                <MapPin className="w-4 h-4" />
              </div>
              <div>
                <span className="font-display font-bold text-sm text-white block">
                  Accrington &amp; Burnley
                </span>
                <p className="text-xs text-stone-300 mt-0.5">
                  Covering Hyndburn &amp; all Lancashire
                </p>
              </div>
            </div>

            {/* 4. Photo Proof */}
            <div className="flex items-start gap-3 pt-3 sm:pt-0 lg:pl-5">
              <div className="p-2 bg-[#151B1F] border border-[#C17A52]/40 text-[#C17A52] shrink-0">
                <Camera className="w-4 h-4" />
              </div>
              <div>
                <span className="font-display font-bold text-sm text-white block">
                  Before &amp; After Photos
                </span>
                <p className="text-xs text-stone-300 mt-0.5">
                  See the problem &amp; finished repair
                </p>
              </div>
            </div>

            {/* 5. Honest Quotes */}
            <div className="flex items-start gap-3 pt-3 sm:pt-0 lg:pl-5">
              <div className="p-2 bg-[#151B1F] border border-[#C17A52]/40 text-[#C17A52] shrink-0">
                <CheckCircle2 className="w-4 h-4" />
              </div>
              <div>
                <span className="font-display font-bold text-sm text-white block">
                  Honest, Fair Quotes
                </span>
                <p className="text-xs text-stone-300 mt-0.5">
                  No-obligation advice from Ash
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};
