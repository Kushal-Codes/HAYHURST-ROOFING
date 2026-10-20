import React, { useState } from 'react';
import {
  ArrowRight,
  ArrowUpRight,
  Camera,
  Star,
  Stethoscope,
  CheckCircle2,
  ShieldCheck,
  MapPin,
} from 'lucide-react';
import { HeroSection } from '../components/HeroSection';
import { UrgentRepairBanner } from '../components/UrgentRepairBanner';
import {
  SERVICES,
  VERIFIED_REVIEWS,
  PORTFOLIO_PROJECTS,
  WORKFLOW_STAGES,
} from '../data/hayhurstData';
import { PageRoute } from '../utils/quoteValidation';

interface HomePageProps {
  onNavigate: (page: PageRoute) => void;
  onRequestQuote: (categoryId?: string) => void;
  onRequestUrgentQuote: () => void;
}

const ROOF_SYMPTOMS = [
  {
    id: 'slipped-slate',
    symptom: 'Loose, missing, or slipped slate in the gutter',
    likelyCause:
      'High winds or localized nail fatigue allowing individual slates to slide out of course.',
    ashApproach:
      'Ash climbs up, photographs the surrounding slates to check if any neighbours are loose, and replaces them on the spot for a fair price.',
    recommendedService: 'Slate & Tile Roofing',
    wizardCategory: 'slates-tiles',
    urgencyBadge: 'Targeted Repair (1–3 Hours)',
    photo: '/images/gallery/001.jpg',
  },
  {
    id: 'chimney-damp',
    symptom: 'Damp patches on chimney breast or crumbling mortar joints',
    likelyCause:
      'Perished brick/stone mortar joints, cracked cement crown flaunching, or loose lead step flashing around the stack.',
    ashApproach:
      'Full rooftop photo inspection of the chimney crown, pots, and flashing—followed by raking out, repointing, re-cementing the crown, or fitting cowls.',
    recommendedService: 'Chimney Repairs & Repointing',
    wizardCategory: 'chimney',
    urgencyBadge: 'Weatherproofing Priority',
    photo: '/images/gallery/010.jpg',
  },
  {
    id: 'gutter-overflow',
    symptom: 'Rainwater overflowing down stonework or leaking extension',
    likelyCause:
      'Blocked gutter outlets, failed joint seals, decaying fascia boards, or worn lead box gutter linings.',
    ashApproach:
      'Clearing storm debris, repairing or replacing uPVC gutter runs, or hand-dressing new lead box guttering and repointing adjacent flashing.',
    recommendedService: 'Guttering & Lead Box Gutters',
    wizardCategory: 'guttering',
    urgencyBadge: 'Prevents Wall Damp',
    photo: '/images/gallery/021.jpg',
  },
  {
    id: 'aging-roof',
    symptom: 'Roof unmaintained for 20+ years or perished loft underfelt',
    likelyCause:
      'Original bitumen felt has perished and widespread nail sickness is causing repeated leaks across multiple slopes.',
    ashApproach:
      'Full strip-back to rafters, installing BBA-approved Cromar Vent3 Pro breathable membrane, new treated battens, natural slate, and dry-ridge system.',
    recommendedService: 'New Roofs & Re-Roofing',
    wizardCategory: 'full-roof',
    urgencyBadge: 'Full Roof Overhaul',
    photo: '/images/gallery/029.jpg',
  },
  {
    id: 'cracked-render',
    symptom: 'Cracked, hollow exterior wall render or exposed rear masonry',
    likelyCause:
      'Frost and driving Pennine rain penetrating porous brickwork, stone elevations, or old blown render.',
    ashApproach:
      'Full scaffolding access, surface preparation, smooth weatherproof rendering, and clean flat-roof or roofline detailing.',
    recommendedService: 'Rendering & Masonry Repointing',
    wizardCategory: 'rendering',
    urgencyBadge: 'Exterior Protection',
    photo: '/images/gallery/009.jpg',
  },
] as const;

export const HomePage: React.FC<HomePageProps> = ({
  onNavigate,
  onRequestQuote,
  onRequestUrgentQuote,
}) => {
  const [selectedSymptomIndex, setSelectedSymptomIndex] = useState(0);
  const activeSymptom = ROOF_SYMPTOMS[selectedSymptomIndex];

  return (
    <div>
      {/* 1. Cinematic Hero & Immediate Credibility Bar */}
      <HeroSection onRequestQuote={onRequestQuote} />

      {/* 2. Bespoke Home Feature: Interactive Roof Symptom Diagnostic Finder */}
      <section className="py-20 lg:py-24 bg-[#F6F4EF] text-[#151B1F] border-b border-[#151B1F]/10">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 items-end pb-10 border-b border-[#151B1F]/15">
            <div className="lg:col-span-7">
              <div className="inline-flex items-center gap-2 text-xs font-display font-bold uppercase tracking-[0.2em] text-[#C17A52] mb-2">
                <Stethoscope className="w-4 h-4" />
                <span>INTERACTIVE ROOF ISSUE DIAGNOSTIC</span>
              </div>
              <h2 className="font-display text-3xl sm:text-4xl font-bold tracking-tight text-[#151B1F] leading-[1.1]">
                What Are You Noticing on Your Roof?
              </h2>
            </div>
            <div className="lg:col-span-5">
              <p className="text-sm sm:text-base text-[#27343C] leading-relaxed">
                Select a common symptom below to see what usually causes it on East Lancashire
                properties and how Ash diagnoses and repairs it.
              </p>
            </div>
          </div>

          <div className="mt-10 grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
            {/* Symptom Selector Buttons */}
            <div
              className="lg:col-span-5 space-y-2.5"
              role="tablist"
              aria-label="Select a roof symptom"
            >
              {ROOF_SYMPTOMS.map((item, idx) => {
                const isSelected = idx === selectedSymptomIndex;
                return (
                  <button
                    key={item.id}
                    type="button"
                    role="tab"
                    aria-selected={isSelected}
                    onClick={() => setSelectedSymptomIndex(idx)}
                    className={`w-full text-left p-4 border transition-all flex items-start justify-between gap-3 cursor-pointer ${
                      isSelected
                        ? 'bg-[#151B1F] text-white border-[#151B1F] border-l-4 border-l-[#C17A52] shadow-md'
                        : 'bg-white text-[#151B1F] border-[#151B1F]/15 hover:border-[#C17A52]'
                    }`}
                  >
                    <div>
                      <span
                        className={`text-[11px] font-mono uppercase block ${
                          isSelected ? 'text-[#C17A52]' : 'text-[#778087]'
                        }`}
                      >
                        SYMPTOM 0{idx + 1} · {item.urgencyBadge}
                      </span>
                      <span className="font-display font-bold text-sm sm:text-base block mt-0.5">
                        {item.symptom}
                      </span>
                    </div>
                    <ArrowRight
                      className={`w-4 h-4 shrink-0 mt-1 ${
                        isSelected ? 'text-[#C17A52]' : 'text-[#778087]'
                      }`}
                    />
                  </button>
                );
              })}
            </div>

            {/* Diagnosis Result Panel */}
            <div className="lg:col-span-7 bg-white border border-[#151B1F]/15 p-6 sm:p-8 shadow-sm">
              <div className="grid grid-cols-1 md:grid-cols-12 gap-6 items-center pb-6 border-b border-[#151B1F]/10">
                <div className="md:col-span-5 aspect-[4/3] bg-[#151B1F] overflow-hidden border border-[#151B1F]/10 relative">
                  <img
                    src={activeSymptom.photo}
                    alt={activeSymptom.recommendedService}
                    className="w-full h-full object-cover"
                  />
                  <div className="absolute bottom-2 left-2 bg-[#151B1F]/90 px-2.5 py-1 text-[10px] font-mono text-[#C17A52] uppercase">
                    Documented Repair
                  </div>
                </div>

                <div className="md:col-span-7 space-y-3">
                  <span className="inline-block px-2.5 py-1 bg-[#F6F4EF] border border-[#151B1F]/15 text-xs font-mono text-[#C17A52] font-bold">
                    Recommended: {activeSymptom.recommendedService}
                  </span>
                  <h3 className="font-display text-xl sm:text-2xl font-bold text-[#151B1F]">
                    {activeSymptom.symptom}
                  </h3>
                  <p className="text-sm text-[#27343C] leading-relaxed">
                    <strong className="text-[#151B1F]">Likely Cause: </strong>
                    {activeSymptom.likelyCause}
                  </p>
                </div>
              </div>

              <div className="py-5 space-y-3">
                <h4 className="text-xs font-display font-bold uppercase tracking-wider text-[#151B1F] flex items-center gap-2">
                  <Camera className="w-4 h-4 text-[#C17A52]" />
                  <span>How Ash Handles This</span>
                </h4>
                <p className="text-sm sm:text-base text-[#27343C] leading-relaxed">
                  {activeSymptom.ashApproach}
                </p>
              </div>

              <div className="pt-4 border-t border-[#151B1F]/10 flex flex-col sm:flex-row items-stretch sm:items-center gap-3">
                <button
                  type="button"
                  onClick={() => onRequestQuote(activeSymptom.wizardCategory)}
                  className="flex-1 py-3.5 px-5 bg-[#C17A52] hover:bg-[#d1875d] text-[#151B1F] font-display font-bold text-xs uppercase tracking-wider flex items-center justify-center gap-2 cursor-pointer"
                >
                  <span>Get a Free Quote for This Issue</span>
                  <ArrowUpRight className="w-4 h-4" />
                </button>
                <button
                  type="button"
                  onClick={() => onNavigate('/services')}
                  className="py-3.5 px-5 bg-[#151B1F] hover:bg-[#27343C] text-white font-display font-semibold text-xs uppercase tracking-wider flex items-center justify-center gap-2 cursor-pointer"
                >
                  <span>View All 8 Services</span>
                  <ArrowRight className="w-4 h-4 text-[#C17A52]" />
                </button>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* 3. Curated Services Overview (Links to /services page) */}
      <section className="py-20 bg-[#151B1F] text-white border-b border-white/10">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex flex-col md:flex-row md:items-end justify-between gap-6 pb-10 border-b border-white/15">
            <div>
              <span className="text-xs font-display font-bold uppercase tracking-[0.2em] text-[#C17A52] block mb-2">
                CORE ROOFING CAPABILITIES
              </span>
              <h2 className="font-display text-3xl sm:text-4xl font-bold text-white">
                Specialist Roofing &amp; Exterior Services
              </h2>
            </div>
            <button
              type="button"
              onClick={() => onNavigate('/services')}
              className="self-start md:self-auto inline-flex items-center gap-2 px-5 py-3 bg-[#27343C] hover:bg-[#32434d] text-white border border-white/20 font-display font-semibold text-xs uppercase tracking-wider cursor-pointer"
            >
              <span>Explore All 8 Services &amp; Specs</span>
              <ArrowRight className="w-4 h-4 text-[#C17A52]" />
            </button>
          </div>

          <div className="mt-10 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            {SERVICES.slice(0, 4).map((service) => (
              <div
                key={service.id}
                className="bg-[#27343C]/45 border border-white/12 hover:border-[#C17A52] transition-all flex flex-col justify-between group"
              >
                <div>
                  <div className="aspect-[16/10] overflow-hidden bg-[#151B1F] border-b border-white/10 relative">
                    <img
                      src={service.image}
                      alt={service.imageAlt}
                      className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-700"
                      loading="lazy"
                    />
                    <span className="absolute top-3 left-3 bg-[#151B1F]/90 border border-white/15 px-2.5 py-1 font-mono text-xs text-[#C17A52]">
                      {service.number}
                    </span>
                  </div>
                  <div className="p-5">
                    <h3 className="font-display text-lg font-bold text-white">
                      {service.title}
                    </h3>
                    <p className="text-xs sm:text-sm text-stone-300 mt-2 leading-relaxed line-clamp-3">
                      {service.summary}
                    </p>
                  </div>
                </div>
                <div className="px-5 py-3.5 bg-[#151B1F]/60 border-t border-white/10 flex items-center justify-between">
                  <button
                    type="button"
                    onClick={() => onNavigate('/services')}
                    className="text-xs font-display font-bold uppercase tracking-wider text-[#C17A52] hover:text-white inline-flex items-center gap-1.5 cursor-pointer"
                  >
                    <span>Full Specification</span>
                    <ArrowUpRight className="w-3.5 h-3.5" />
                  </button>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* 4. Featured Portfolio & Photo-Documented Process Preview (Links to /portfolio) */}
      <section className="py-20 bg-[#F6F4EF] text-[#151B1F] border-b border-[#151B1F]/10">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex flex-col md:flex-row md:items-end justify-between gap-6 pb-10 border-b border-[#151B1F]/15">
            <div>
              <span className="text-xs font-display font-bold uppercase tracking-[0.2em] text-[#C17A52] block mb-2">
                GENUINE ROOFTOP PHOTOGRAPHY
              </span>
              <h2 className="font-display text-3xl sm:text-4xl font-bold text-[#151B1F]">
                Every Job Photographed Before &amp; After
              </h2>
            </div>
            <button
              type="button"
              onClick={() => onNavigate('/portfolio')}
              className="self-start md:self-auto inline-flex items-center gap-2 px-5 py-3 bg-[#151B1F] hover:bg-[#27343C] text-white font-display font-semibold text-xs uppercase tracking-wider cursor-pointer"
            >
              <span>Open Full Portfolio &amp; Before/After Slider (33 Photos)</span>
              <ArrowRight className="w-4 h-4 text-[#C17A52]" />
            </button>
          </div>

          {/* 3-Stage Summary Strip */}
          <div className="mt-10 grid grid-cols-1 md:grid-cols-3 gap-6">
            {WORKFLOW_STAGES.map((stage) => (
              <div
                key={stage.step}
                className="bg-white border border-[#151B1F]/15 p-6 flex flex-col justify-between"
              >
                <div>
                  <span className="font-mono text-xs font-bold text-[#C17A52]">
                    STAGE {stage.step}
                  </span>
                  <h3 className="font-display text-xl font-bold text-[#151B1F] mt-1">
                    {stage.title}
                  </h3>
                  <p className="text-sm text-[#27343C] mt-2 leading-relaxed">
                    {stage.description}
                  </p>
                </div>
                <div className="mt-4 pt-3 border-t border-[#151B1F]/10 flex items-center gap-2 text-xs text-[#778087]">
                  <CheckCircle2 className="w-3.5 h-3.5 text-[#C17A52]" />
                  <span>{stage.subtitle}</span>
                </div>
              </div>
            ))}
          </div>

          {/* Featured 3 Case Study Cards */}
          <div className="mt-8 grid grid-cols-1 md:grid-cols-3 gap-6">
            {PORTFOLIO_PROJECTS.slice(0, 3).map((proj) => (
              <div
                key={proj.id}
                className="bg-[#151B1F] text-white border border-[#151B1F] overflow-hidden group flex flex-col justify-between"
              >
                <div>
                  <div className="aspect-[4/3] overflow-hidden relative">
                    <img
                      src={proj.image}
                      alt={proj.imageAlt}
                      className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-700"
                      loading="lazy"
                    />
                    <span className="absolute top-3 left-3 bg-[#151B1F]/90 px-2.5 py-1 text-[11px] font-mono text-[#C17A52] uppercase">
                      {proj.category}
                    </span>
                  </div>
                  <div className="p-5">
                    <div className="flex items-center gap-1.5 text-xs text-stone-400 mb-1">
                      <MapPin className="w-3.5 h-3.5 text-[#C17A52]" />
                      <span>{proj.location}</span>
                    </div>
                    <h3 className="font-display text-lg font-bold text-white">
                      {proj.title}
                    </h3>
                    <p className="text-xs text-stone-300 mt-2 line-clamp-2">
                      {proj.visibleResult}
                    </p>
                  </div>
                </div>
                <div className="px-5 py-3.5 bg-[#27343C]/60 border-t border-white/10">
                  <button
                    type="button"
                    onClick={() => onNavigate('/portfolio')}
                    className="text-xs font-display font-bold uppercase tracking-wider text-[#C17A52] hover:text-white inline-flex items-center gap-1.5 cursor-pointer"
                  >
                    <span>Inspect Project Photos</span>
                    <ArrowRight className="w-3.5 h-3.5" />
                  </button>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* 5. Featured Reviews Strip (Links to /reviews) */}
      <section className="py-20 bg-[#151B1F] text-white border-b border-white/10">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex flex-col md:flex-row md:items-end justify-between gap-6 pb-10 border-b border-white/15">
            <div>
              <div className="inline-flex items-center gap-2 text-xs font-display font-bold uppercase tracking-[0.2em] text-[#C17A52] mb-2">
                <ShieldCheck className="w-4 h-4" />
                <span>5.0-STAR GOOGLE RATING (37 REVIEWS)</span>
              </div>
              <h2 className="font-display text-3xl sm:text-4xl font-bold text-white">
                Trusted by Local Homeowners
              </h2>
            </div>
            <button
              type="button"
              onClick={() => onNavigate('/reviews')}
              className="self-start md:self-auto inline-flex items-center gap-2 px-5 py-3 bg-[#C17A52] hover:bg-[#d1875d] text-[#151B1F] font-display font-bold text-xs uppercase tracking-wider cursor-pointer"
            >
              <span>Read All Verified Customer Reviews</span>
              <ArrowRight className="w-4 h-4" />
            </button>
          </div>

          <div className="mt-10 grid grid-cols-1 md:grid-cols-3 gap-6">
            {VERIFIED_REVIEWS.slice(0, 3).map((review) => (
              <blockquote
                key={review.id}
                className="bg-[#27343C]/50 border border-white/12 p-6 flex flex-col justify-between"
              >
                <div>
                  <div className="flex items-center justify-between gap-2 mb-3">
                    <div className="flex text-[#C17A52]">
                      {[...Array(5)].map((_, i) => (
                        <Star key={i} className="w-3.5 h-3.5 fill-current" />
                      ))}
                    </div>
                    <span className="text-[11px] font-mono text-stone-300">
                      {review.serviceTag}
                    </span>
                  </div>
                  <p className="font-display font-bold text-sm text-[#C17A52] mb-2">
                    &ldquo;{review.highlight}&rdquo;
                  </p>
                  <p className="text-xs sm:text-sm text-stone-300 leading-relaxed line-clamp-4">
                    &ldquo;{review.quote}&rdquo;
                  </p>
                </div>
                <footer className="mt-4 pt-3 border-t border-white/10 flex items-center justify-between text-xs text-stone-400">
                  <strong className="text-white">{review.author}</strong>
                  <span>{review.date} · Google</span>
                </footer>
              </blockquote>
            ))}
          </div>
        </div>
      </section>

      {/* 6. Urgent Roof Leak Banner */}
      <UrgentRepairBanner onRequestUrgentQuote={onRequestUrgentQuote} />
    </div>
  );
};
