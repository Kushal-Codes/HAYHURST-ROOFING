import React, { useState } from 'react';
import {
  Camera,
  SlidersHorizontal,
  ShieldCheck,
  ArrowRight,
  CheckCircle2,
} from 'lucide-react';
import {
  WORKFLOW_STAGES,
  BEFORE_AFTER_TRANSFORMATIONS,
  TRUST_PILLARS,
} from '../data/hayhurstData';

interface ProcessSectionProps {
  onRequestQuote: (categoryId?: string) => void;
}

export const ProcessSection: React.FC<ProcessSectionProps> = ({ onRequestQuote }) => {
  const [selectedPairIndex, setSelectedPairIndex] = useState(0);
  const [sliderPosition, setSliderPosition] = useState(50);

  const activePair = BEFORE_AFTER_TRANSFORMATIONS[selectedPairIndex];

  return (
    <section
      id="process"
      className="py-20 lg:py-28 bg-[#151B1F] text-white border-b border-white/10"
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-24">
        {/* PART 1: THE HAYHURST PHOTO-DOCUMENTED PROCESS */}
        <div>
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 items-end pb-12 border-b border-white/10">
            <div className="lg:col-span-7">
              <span className="text-xs font-display font-bold uppercase tracking-[0.2em] text-[#C17A52] block mb-3">
                02 / TRANSPARENCY ON EVERY ROOF
              </span>
              <h2 className="font-display text-3xl sm:text-4xl lg:text-5xl font-bold tracking-tight text-white leading-[1.1]">
                You Can&rsquo;t Easily Climb Onto Your Roof. So Ash Brings the Proof Down to You.
              </h2>
            </div>
            <div className="lg:col-span-5">
              <p className="text-base text-stone-300 leading-relaxed">
                One detail appears again and again in Hayhurst Roofing&rsquo;s customer reviews:
                Ash photographs the roof problem before starting, explains what actually needs doing
                in plain English, and shows you photographs of the finished repair.
              </p>
            </div>
          </div>

          {/* 3-Stage Visual Workflow */}
          <div className="mt-12 grid grid-cols-1 md:grid-cols-3 gap-8">
            {WORKFLOW_STAGES.map((stage) => (
              <div
                key={stage.step}
                className="bg-[#27343C]/50 border border-white/10 flex flex-col justify-between group hover:border-[#C17A52]/60 transition-colors"
              >
                <div>
                  <div className="relative aspect-[16/10] overflow-hidden bg-[#151B1F] border-b border-white/10">
                    <img
                      src={stage.image}
                      alt={stage.imageCaption}
                      className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-700"
                      loading="lazy"
                    />
                    <div className="absolute top-3 left-3 bg-[#151B1F]/90 border border-[#C17A52]/50 px-3 py-1">
                      <span className="font-mono text-xs font-bold text-[#C17A52]">
                        STAGE {stage.step}
                      </span>
                    </div>
                  </div>

                  <div className="p-6">
                    <p className="text-xs font-display uppercase tracking-wider text-[#C17A52] font-semibold">
                      {stage.subtitle}
                    </p>
                    <h3 className="font-display text-xl font-bold text-white mt-1.5">
                      {stage.title}
                    </h3>
                    <p className="text-sm text-stone-300 mt-3 leading-relaxed">
                      {stage.description}
                    </p>
                  </div>
                </div>

                <div className="px-6 py-3.5 bg-[#151B1F]/60 border-t border-white/10 flex items-center gap-2 text-xs text-stone-400">
                  <Camera className="w-3.5 h-3.5 text-[#C17A52] shrink-0" />
                  <span>{stage.imageCaption}</span>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* PART 2: INTERACTIVE BEFORE / DURING / AFTER ROOF COMPARATOR */}
        <div className="bg-[#27343C]/40 border border-white/15 p-6 sm:p-8 lg:p-10">
          <div className="flex flex-col lg:flex-row lg:items-end justify-between gap-6 pb-8 border-b border-white/10">
            <div>
              <div className="inline-flex items-center gap-2 text-xs font-display font-bold uppercase tracking-[0.2em] text-[#C17A52] mb-2">
                <SlidersHorizontal className="w-3.5 h-3.5" />
                <span>Interactive Rooftop Comparison</span>
              </div>
              <h3 className="font-display text-2xl sm:text-3xl font-bold text-white">
                Inspect Real Before, Preparation &amp; Completed Stages
              </h3>
              <p className="text-sm sm:text-base text-stone-300 mt-1 max-w-2xl">
                Slide the divider below to compare genuine Hayhurst Roofing photographs captured
                from the same rooftop vantage point during preparation and upon completion.
              </p>
            </div>

            {/* Project Pair Selector Tabs */}
            <div className="flex flex-wrap gap-2" role="group" aria-label="Select transformation project">
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
            {/* Interactive Comparison Viewport */}
            <div className="lg:col-span-8">
              <div className="relative aspect-[16/10] w-full overflow-hidden bg-[#151B1F] border border-white/15 select-none">
                {/* Base Layer: AFTER Image */}
                <img
                  src={activePair.afterImage}
                  alt={activePair.afterCaption}
                  className="absolute inset-0 w-full h-full object-cover"
                />

                {/* Clipped Overlay Layer: BEFORE / PREPARATION Image */}
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

                {/* Labels on Top Corners */}
                <div className="absolute top-3 left-3 bg-[#151B1F]/90 border border-white/20 px-3 py-1.5 text-xs font-display font-semibold text-stone-200 pointer-events-none">
                  {activePair.beforeLabel}
                </div>
                <div className="absolute top-3 right-3 bg-[#C17A52] px-3 py-1.5 text-xs font-display font-bold text-[#151B1F] pointer-events-none">
                  {activePair.afterLabel}
                </div>

                {/* Vertical Divider Handle Line */}
                <div
                  className="absolute top-0 bottom-0 w-0.5 bg-[#C17A52] shadow-[0_0_12px_rgba(0,0,0,0.8)] pointer-events-none"
                  style={{ left: `${sliderPosition}%` }}
                >
                  <div className="absolute top-1/2 -translate-y-1/2 -translate-x-1/2 w-9 h-9 bg-[#C17A52] text-[#151B1F] border-2 border-[#151B1F] flex items-center justify-center shadow-lg">
                    <SlidersHorizontal className="w-4 h-4" />
                  </div>
                </div>

                {/* Accessible Range Input Covering Viewport */}
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

              {/* Quick Comparison Controls for Keyboard / Mobile Precision */}
              <div className="mt-3 flex flex-wrap items-center justify-between gap-2 text-xs text-stone-400">
                <span>Drag slider across image or use quick presets:</span>
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

            {/* Project Comparison Commentary */}
            <div className="lg:col-span-4 space-y-5">
              <div className="inline-block px-2.5 py-1 bg-[#151B1F] border border-[#C17A52]/40 text-xs font-mono text-[#C17A52]">
                {activePair.location} · {activePair.category}
              </div>
              <h4 className="font-display text-xl sm:text-2xl font-bold text-white">
                {activePair.title}
              </h4>
              <p className="text-sm text-stone-300 leading-relaxed">{activePair.summary}</p>

              <div className="space-y-3 pt-2 border-t border-white/10 text-xs">
                <div className="p-3 bg-[#151B1F]/80 border-l-2 border-stone-400">
                  <span className="font-display font-bold text-white block">
                    {activePair.beforeLabel}
                  </span>
                  <span className="text-stone-300 mt-0.5 block">{activePair.beforeCaption}</span>
                </div>
                <div className="p-3 bg-[#151B1F]/80 border-l-2 border-[#C17A52]">
                  <span className="font-display font-bold text-[#C17A52] block">
                    {activePair.afterLabel}
                  </span>
                  <span className="text-stone-300 mt-0.5 block">{activePair.afterCaption}</span>
                </div>
              </div>

              <button
                type="button"
                onClick={() => onRequestQuote()}
                className="w-full py-3.5 px-5 bg-[#C17A52] hover:bg-[#d1875d] text-[#151B1F] font-display font-bold text-xs uppercase tracking-wider flex items-center justify-center gap-2 transition-colors cursor-pointer"
              >
                <span>Request a Free Roof Assessment</span>
                <ArrowRight className="w-4 h-4" />
              </button>
            </div>
          </div>
        </div>

        {/* PART 3: THE 4 PILLARS OF WHY HOMEOWNERS CHOOSE HAYHURST ROOFING */}
        <div>
          <div className="mb-10">
            <span className="text-xs font-display font-bold uppercase tracking-[0.2em] text-[#C17A52] block mb-2">
              WHY LANCASHIRE HOMEOWNERS RECOMMEND ASH
            </span>
            <h3 className="font-display text-2xl sm:text-3xl font-bold text-white">
              Built on Reputation, Not Sales Pressure.
            </h3>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {TRUST_PILLARS.map((pillar) => (
              <div
                key={pillar.index}
                className="bg-[#27343C]/35 border border-white/10 p-6 flex flex-col justify-between"
              >
                <div>
                  <span className="font-mono text-xs font-bold text-[#C17A52] block mb-3">
                    PILLAR // {pillar.index}
                  </span>
                  <h4 className="font-display text-lg font-bold text-white mb-2.5">
                    {pillar.title}
                  </h4>
                  <p className="text-sm text-stone-300 leading-relaxed">{pillar.description}</p>
                </div>
                <div className="mt-6 pt-4 border-t border-white/10 flex items-start gap-2 text-xs text-stone-400">
                  <CheckCircle2 className="w-3.5 h-3.5 text-[#C17A52] shrink-0 mt-0.5" />
                  <span>{pillar.evidence}</span>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
};
