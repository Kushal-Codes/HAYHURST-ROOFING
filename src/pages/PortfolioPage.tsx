import React, { useState } from 'react';
import {
  Camera,
  SlidersHorizontal,
  ArrowRight,
  X,
  ChevronLeft,
  ChevronRight,
  Grid,
} from 'lucide-react';
import { PortfolioSection } from '../components/PortfolioSection';
import {
  BEFORE_AFTER_TRANSFORMATIONS,
  PortfolioProject,
} from '../data/hayhurstData';

interface PortfolioPageProps {
  onRequestQuoteForProject: (project: PortfolioProject) => void;
  onRequestQuote: (categoryId?: string) => void;
}

const ARCHIVE_PHOTOS = Array.from({ length: 33 }, (_, i) => {
  const num = String(i + 1).padStart(3, '0');
  return {
    id: num,
    src: `/images/gallery/${num}.jpg`,
    label: `Hayhurst Roofing Site Record #${num}`,
  };
});

export const PortfolioPage: React.FC<PortfolioPageProps> = ({
  onRequestQuoteForProject,
  onRequestQuote,
}) => {
  const [selectedPairIndex, setSelectedPairIndex] = useState(0);
  const [sliderPosition, setSliderPosition] = useState(50);
  const [lightboxIndex, setLightboxIndex] = useState<number | null>(null);

  const activePair = BEFORE_AFTER_TRANSFORMATIONS[selectedPairIndex];

  return (
    <div className="pt-20">
      {/* Dedicated Page Header */}
      <section className="bg-[#151B1F] text-white py-16 lg:py-20 border-b border-white/10">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="max-w-3xl">
            <span className="text-xs font-display font-bold uppercase tracking-[0.2em] text-[#C17A52] block mb-3">
              PAGE // DOCUMENTED PROJECT PORTFOLIO
            </span>
            <h1 className="font-display text-4xl sm:text-5xl font-bold tracking-tight text-white leading-[1.08]">
              33+ Genuine Rooftop Photographs Across Lancashire.
            </h1>
            <p className="text-base sm:text-lg text-stone-300 mt-4 leading-relaxed">
              Every photograph on this page was captured directly on Hayhurst Roofing jobs—showing
              breathable membrane preparation, hand-dressed leadwork, repointed chimneys, and
              completed natural slate roofs.
            </p>
          </div>
        </div>
      </section>

      {/* Feature 1: Interactive Before / Preparation / Completed Roof Comparator */}
      <section className="py-16 lg:py-20 bg-[#27343C]/35 text-white border-b border-white/10">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="bg-[#27343C]/50 border border-white/15 p-6 sm:p-8 lg:p-10">
            <div className="flex flex-col lg:flex-row lg:items-end justify-between gap-6 pb-8 border-b border-white/10">
              <div>
                <div className="inline-flex items-center gap-2 text-xs font-display font-bold uppercase tracking-[0.2em] text-[#C17A52] mb-2">
                  <SlidersHorizontal className="w-3.5 h-3.5" />
                  <span>INTERACTIVE ROOFTOP TRANSFORMATION SLIDER</span>
                </div>
                <h2 className="font-display text-2xl sm:text-3xl font-bold text-white">
                  Compare Preparation &amp; Completed Stages Side-by-Side
                </h2>
                <p className="text-sm sm:text-base text-stone-300 mt-1 max-w-2xl">
                  Drag the slider across the photograph to compare identical rooftop angles before
                  and after slating or rendering.
                </p>
              </div>

              <div
                className="flex flex-wrap gap-2"
                role="group"
                aria-label="Select transformation project"
              >
                {BEFORE_AFTER_TRANSFORMATIONS.map((pair, idx) => (
                  <button
                    key={pair.id}
                    type="button"
                    onClick={() => {
                      setSelectedPairIndex(idx);
                      setSliderPosition(50);
                    }}
                    aria-pressed={selectedPairIndex === idx}
                    className={`px-3.5 py-2 text-xs font-display font-semibold uppercase tracking-wider border transition-colors cursor-pointer ${
                      selectedPairIndex === idx
                        ? 'bg-[#C17A52] text-[#151B1F] border-[#C17A52]'
                        : 'bg-[#151B1F] text-stone-300 border-white/15 hover:border-white/40'
                    }`}
                  >
                    0{idx + 1}. {pair.category}
                  </button>
                ))}
              </div>
            </div>

            <div className="mt-8 grid grid-cols-1 lg:grid-cols-12 gap-8 items-center">
              <div className="lg:col-span-8">
                <div className="relative aspect-[16/10] w-full overflow-hidden bg-[#151B1F] border border-white/15 select-none">
                  <img
                    src={activePair.afterImage}
                    alt={activePair.afterCaption}
                    className="absolute inset-0 w-full h-full object-cover"
                  />
                  <div
                    className="absolute inset-0 overflow-hidden"
                    style={{ clipPath: `inset(0 ${100 - sliderPosition}% 0 0)` }}
                  >
                    <img
                      src={activePair.beforeImage}
                      alt={activePair.beforeCaption}
                      className="absolute inset-0 w-full h-full object-cover"
                    />
                  </div>

                  <div className="absolute top-3 left-3 bg-[#151B1F]/90 border border-white/20 px-3 py-1.5 text-xs font-display font-semibold text-stone-200 pointer-events-none">
                    {activePair.beforeLabel}
                  </div>
                  <div className="absolute top-3 right-3 bg-[#C17A52] px-3 py-1.5 text-xs font-display font-bold text-[#151B1F] pointer-events-none">
                    {activePair.afterLabel}
                  </div>

                  <div
                    className="absolute top-0 bottom-0 w-0.5 bg-[#C17A52] shadow-[0_0_12px_rgba(0,0,0,0.8)] pointer-events-none"
                    style={{ left: `${sliderPosition}%` }}
                  >
                    <div className="absolute top-1/2 -translate-y-1/2 -translate-x-1/2 w-9 h-9 bg-[#C17A52] text-[#151B1F] border-2 border-[#151B1F] flex items-center justify-center shadow-lg">
                      <SlidersHorizontal className="w-4 h-4" />
                    </div>
                  </div>

                  <input
                    type="range"
                    min={0}
                    max={100}
                    value={sliderPosition}
                    onChange={(e) => setSliderPosition(Number(e.target.value))}
                    aria-label={`Compare ${activePair.title} before and after`}
                    className="absolute inset-0 w-full h-full opacity-0 cursor-ew-resize z-20"
                  />
                </div>

                <div className="mt-3 flex flex-wrap items-center justify-between gap-2 text-xs text-stone-400">
                  <span>Quick view presets:</span>
                  <div className="flex items-center gap-2">
                    <button
                      type="button"
                      onClick={() => setSliderPosition(92)}
                      className="px-2.5 py-1 bg-[#151B1F] border border-white/15 hover:border-[#C17A52] text-stone-200 cursor-pointer"
                    >
                      Show Preparation
                    </button>
                    <button
                      type="button"
                      onClick={() => setSliderPosition(50)}
                      className="px-2.5 py-1 bg-[#151B1F] border border-white/15 hover:border-[#C17A52] text-stone-200 cursor-pointer"
                    >
                      50 / 50 Split
                    </button>
                    <button
                      type="button"
                      onClick={() => setSliderPosition(8)}
                      className="px-2.5 py-1 bg-[#151B1F] border border-white/15 hover:border-[#C17A52] text-stone-200 cursor-pointer"
                    >
                      Show Completed Roof
                    </button>
                  </div>
                </div>
              </div>

              <div className="lg:col-span-4 space-y-5">
                <div className="inline-block px-2.5 py-1 bg-[#151B1F] border border-[#C17A52]/40 text-xs font-mono text-[#C17A52]">
                  {activePair.location} · {activePair.category}
                </div>
                <h3 className="font-display text-xl sm:text-2xl font-bold text-white">
                  {activePair.title}
                </h3>
                <p className="text-sm text-stone-300 leading-relaxed">{activePair.summary}</p>
                <button
                  type="button"
                  onClick={() => onRequestQuote()}
                  className="w-full py-3.5 px-5 bg-[#C17A52] hover:bg-[#d1875d] text-[#151B1F] font-display font-bold text-xs uppercase tracking-wider flex items-center justify-center gap-2 transition-colors cursor-pointer"
                >
                  <span>Request a Quote for Similar Work</span>
                  <ArrowRight className="w-4 h-4" />
                </button>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Feature 2: Curated Case Study Grid with Multi-Photo Modal */}
      <PortfolioSection onRequestQuoteForProject={onRequestQuoteForProject} />

      {/* Feature 3: Complete 33-Photo Authentic Site Archive */}
      <section className="py-20 bg-[#F6F4EF] text-[#151B1F] border-b border-[#151B1F]/10">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex flex-col md:flex-row md:items-end justify-between gap-6 pb-10 border-b border-[#151B1F]/15">
            <div>
              <div className="inline-flex items-center gap-2 text-xs font-display font-bold uppercase tracking-[0.2em] text-[#C17A52] mb-2">
                <Grid className="w-4 h-4" />
                <span>COMPLETE SITE ARCHIVE // 001 – 033</span>
              </div>
              <h2 className="font-display text-3xl sm:text-4xl font-bold text-[#151B1F]">
                Full Rooftop Photograph Archive
              </h2>
            </div>
            <p className="text-sm text-[#27343C] max-w-md">
              Click any photograph in our 33-image site archive to inspect the full-resolution
              rooftop record.
            </p>
          </div>

          <div className="mt-10 grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-6 gap-3">
            {ARCHIVE_PHOTOS.map((photo, idx) => (
              <button
                key={photo.id}
                type="button"
                onClick={() => setLightboxIndex(idx)}
                aria-label={`Open ${photo.label}`}
                className="group relative aspect-square bg-[#151B1F] overflow-hidden border border-[#151B1F]/15 hover:border-[#C17A52] cursor-pointer"
              >
                <img
                  src={photo.src}
                  alt={photo.label}
                  className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                  loading="lazy"
                />
                <div className="absolute bottom-1.5 left-1.5 bg-[#151B1F]/85 px-2 py-0.5 text-[10px] font-mono text-[#C17A52]">
                  #{photo.id}
                </div>
              </button>
            ))}
          </div>
        </div>

        {/* Full-Resolution Archive Lightbox */}
        {lightboxIndex !== null && (
          <div
            role="dialog"
            aria-modal="true"
            aria-label="Full-resolution site photograph viewer"
            className="fixed inset-0 z-50 bg-black/90 backdrop-blur-sm flex items-center justify-center p-4"
          >
            <div className="max-w-4xl w-full bg-[#151B1F] border border-white/20 overflow-hidden">
              <div className="px-5 py-3.5 bg-[#27343C] border-b border-white/15 flex items-center justify-between text-white">
                <div className="flex items-center gap-2 text-xs font-mono text-[#C17A52]">
                  <Camera className="w-4 h-4" />
                  <span>{ARCHIVE_PHOTOS[lightboxIndex].label}</span>
                </div>
                <button
                  type="button"
                  onClick={() => setLightboxIndex(null)}
                  aria-label="Close photo archive viewer"
                  className="p-1.5 text-stone-300 hover:text-white bg-[#151B1F] border border-white/15 cursor-pointer"
                >
                  <X className="w-4 h-4" />
                </button>
              </div>
              <div className="relative aspect-[4/3] bg-black flex items-center justify-center">
                <img
                  src={ARCHIVE_PHOTOS[lightboxIndex].src}
                  alt={ARCHIVE_PHOTOS[lightboxIndex].label}
                  className="max-h-full max-w-full object-contain"
                />
                <button
                  type="button"
                  onClick={() =>
                    setLightboxIndex((prev) =>
                      prev === null || prev === 0 ? ARCHIVE_PHOTOS.length - 1 : prev - 1
                    )
                  }
                  aria-label="Previous archive photo"
                  className="absolute left-3 top-1/2 -translate-y-1/2 p-2.5 bg-[#151B1F]/90 text-white border border-white/20 hover:border-[#C17A52] cursor-pointer"
                >
                  <ChevronLeft className="w-5 h-5" />
                </button>
                <button
                  type="button"
                  onClick={() =>
                    setLightboxIndex((prev) =>
                      prev === null || prev === ARCHIVE_PHOTOS.length - 1 ? 0 : prev + 1
                    )
                  }
                  aria-label="Next archive photo"
                  className="absolute right-3 top-1/2 -translate-y-1/2 p-2.5 bg-[#151B1F]/90 text-white border border-white/20 hover:border-[#C17A52] cursor-pointer"
                >
                  <ChevronRight className="w-5 h-5" />
                </button>
              </div>
            </div>
          </div>
        )}
      </section>
    </div>
  );
};
