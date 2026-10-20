import React from 'react';
import {
  ShieldCheck,
  Layers,
  CheckCircle2,
  ArrowRight,
  Wrench,
  Home,
} from 'lucide-react';
import { ServicesSection } from '../components/ServicesSection';
import { ServiceItem } from '../data/hayhurstData';
import { PageRoute } from '../utils/quoteValidation';

interface ServicesPageProps {
  onSelectServiceForQuote: (service: ServiceItem) => void;
  onNavigate: (page: PageRoute) => void;
}

const MATERIALS_SPECS = [
  {
    code: 'MAT // 01',
    name: 'Cromar Vent3 Pro BBA-Certified Breathable Membrane',
    category: 'Under-Roof Protection',
    description:
      'Used on Hayhurst Roofing strip-and-reslate projects (visible in our rooftop preparation gallery). Allows moisture vapour to escape from the loft space while forming a secondary barrier against wind-driven rain and snow.',
    photo: '/images/gallery/020.jpg',
  },
  {
    code: 'MAT // 02',
    name: 'Natural Welsh & Cumbrian Roof Slates',
    category: 'Primary Roof Covering',
    description:
      'Sourced and matched to suit traditional Accrington and Burnley terraces as well as hipped residential roofs—providing a century-grade weather barrier that ages gracefully.',
    photo: '/images/gallery/027.jpg',
  },
  {
    code: 'MAT // 03',
    name: 'Mechanically Fixed Dry-Ridge & Hip Systems',
    category: 'Storm-Resistant Ridge Line',
    description:
      'Unlike traditional mortar-only ridges that can crack after years of freeze-thaw cycles, mechanical dry-fix ridge and hip systems secure every ridge tile against high Pennine winds while providing continuous roof ventilation.',
    photo: '/images/gallery/029.jpg',
  },
  {
    code: 'MAT // 04',
    name: 'Hand-Dressed Code Lead Box Gutters & Flashings',
    category: 'Leadwork & Valleys',
    description:
      'Traditional hand-dressed leadwork for wide parapet box gutters, chimney step flashings, and valley linings—dressed neatly with traditional wooden tools for thermal movement and longevity.',
    photo: '/images/gallery/021.jpg',
  },
] as const;

export const ServicesPage: React.FC<ServicesPageProps> = ({
  onSelectServiceForQuote,
  onNavigate,
}) => {
  return (
    <div className="pt-20">
      {/* Dedicated Page Hero Header */}
      <section className="bg-[#151B1F] text-white py-16 lg:py-20 border-b border-white/10">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="max-w-3xl">
            <span className="text-xs font-display font-bold uppercase tracking-[0.2em] text-[#C17A52] block mb-3">
              PAGE // SERVICES &amp; TECHNICAL SPECIFICATIONS
            </span>
            <h1 className="font-display text-4xl sm:text-5xl font-bold tracking-tight text-white leading-[1.08]">
              Complete Roofing, Chimney &amp; Exterior Services.
            </h1>
            <p className="text-base sm:text-lg text-stone-300 mt-4 leading-relaxed">
              From replacing a single loose slate the following morning to stripping and re-slating
              a complete residential roof with BBA-certified breathable membranes, explore our full
              service specifications below.
            </p>
          </div>
        </div>
      </section>

      {/* Main 8-Service Interactive Directory */}
      <ServicesSection onSelectServiceForQuote={onSelectServiceForQuote} />

      {/* Bespoke Feature 1: Materials & Craftsmanship Standards */}
      <section className="py-20 bg-[#151B1F] text-white border-b border-white/10">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 items-end pb-12 border-b border-white/15">
            <div className="lg:col-span-7">
              <div className="inline-flex items-center gap-2 text-xs font-display font-bold uppercase tracking-[0.2em] text-[#C17A52] mb-2">
                <Layers className="w-4 h-4" />
                <span>PROVEN ROOFING MATERIALS</span>
              </div>
              <h2 className="font-display text-3xl sm:text-4xl font-bold text-white">
                What Goes Under Your Slates Matters Just as Much.
              </h2>
            </div>
            <div className="lg:col-span-5">
              <p className="text-sm sm:text-base text-stone-300 leading-relaxed">
                A roof is a complete weatherproofing system. Here are the exact materials documented
                across Hayhurst Roofing&rsquo;s Lancashire installations.
              </p>
            </div>
          </div>

          <div className="mt-12 grid grid-cols-1 md:grid-cols-2 gap-8">
            {MATERIALS_SPECS.map((mat) => (
              <div
                key={mat.code}
                className="bg-[#27343C]/45 border border-white/15 grid grid-cols-1 sm:grid-cols-12 overflow-hidden"
              >
                <div className="sm:col-span-5 aspect-[4/3] sm:aspect-auto bg-[#151B1F]">
                  <img
                    src={mat.photo}
                    alt={mat.name}
                    className="w-full h-full object-cover"
                    loading="lazy"
                  />
                </div>
                <div className="sm:col-span-7 p-6 flex flex-col justify-between">
                  <div>
                    <span className="font-mono text-xs text-[#C17A52] block">
                      {mat.code} · {mat.category}
                    </span>
                    <h3 className="font-display text-lg font-bold text-white mt-1">
                      {mat.name}
                    </h3>
                    <p className="text-xs sm:text-sm text-stone-300 mt-2.5 leading-relaxed">
                      {mat.description}
                    </p>
                  </div>
                  <div className="mt-4 pt-3 border-t border-white/10 flex items-center gap-2 text-xs text-[#C17A52]">
                    <ShieldCheck className="w-4 h-4" />
                    <span>Documented in Hayhurst Roofing site gallery</span>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Bespoke Feature 2: Repair vs. Full Replacement Honest Guide */}
      <section className="py-20 bg-[#F6F4EF] text-[#151B1F] border-b border-[#151B1F]/10">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="max-w-3xl mb-12">
            <span className="text-xs font-display font-bold uppercase tracking-[0.2em] text-[#C17A52] block mb-2">
              HONEST ROOF ASSESSMENTS
            </span>
            <h2 className="font-display text-3xl sm:text-4xl font-bold text-[#151B1F]">
              Do You Need a Targeted Repair or a New Roof?
            </h2>
            <p className="text-base text-[#27343C] mt-3 leading-relaxed">
              Customers consistently praise Ash for giving practical, honest advice—fixing minor
              slate or flashing issues without pushing unnecessary work, while providing clear
              guidance when a roof has genuinely reached the end of its life.
            </p>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
            {/* Targeted Repair Card */}
            <div className="bg-white border border-[#151B1F]/15 p-6 sm:p-8 flex flex-col justify-between">
              <div>
                <div className="inline-flex items-center gap-2 px-3 py-1 bg-[#F6F4EF] border border-[#151B1F]/15 text-xs font-mono text-[#151B1F] font-bold mb-4">
                  <Wrench className="w-3.5 h-3.5 text-[#C17A52]" />
                  <span>OPTION A // TARGETED ROOF REPAIR</span>
                </div>
                <h3 className="font-display text-2xl font-bold text-[#151B1F]">
                  When a Repair Is All You Need
                </h3>
                <p className="text-sm text-[#27343C] mt-2 leading-relaxed">
                  Ideal when the main roof structure and underfelt remain sound, and water ingress
                  is caused by a localized storm or wear issue.
                </p>
                <ul className="mt-5 space-y-3 text-sm text-[#27343C]">
                  <li className="flex items-start gap-2.5">
                    <CheckCircle2 className="w-4 h-4 text-[#C17A52] shrink-0 mt-0.5" />
                    <span>1 to 5 slipped, cracked, or missing slates after high winds</span>
                  </li>
                  <li className="flex items-start gap-2.5">
                    <CheckCircle2 className="w-4 h-4 text-[#C17A52] shrink-0 mt-0.5" />
                    <span>Weathered mortar on ridge tiles or chimney stack joints</span>
                  </li>
                  <li className="flex items-start gap-2.5">
                    <CheckCircle2 className="w-4 h-4 text-[#C17A52] shrink-0 mt-0.5" />
                    <span>Localized leak around an extension flashing or blocked gutter</span>
                  </li>
                </ul>
              </div>
              <div className="mt-8 pt-4 border-t border-[#151B1F]/10">
                <button
                  type="button"
                  onClick={() => onNavigate('/quote')}
                  className="inline-flex items-center gap-2 text-xs font-display font-bold uppercase tracking-wider text-[#151B1F] hover:text-[#C17A52] cursor-pointer"
                >
                  <span>Book a Targeted Repair Inspection</span>
                  <ArrowRight className="w-4 h-4 text-[#C17A52]" />
                </button>
              </div>
            </div>

            {/* Full Replacement Card */}
            <div className="bg-[#151B1F] text-white border border-[#151B1F] p-6 sm:p-8 flex flex-col justify-between">
              <div>
                <div className="inline-flex items-center gap-2 px-3 py-1 bg-[#27343C] border border-white/15 text-xs font-mono text-[#C17A52] font-bold mb-4">
                  <Home className="w-3.5 h-3.5 text-[#C17A52]" />
                  <span>OPTION B // FULL RE-ROOF &amp; MEMBRANE UPGRADE</span>
                </div>
                <h3 className="font-display text-2xl font-bold text-white">
                  When a Full Re-Roof Makes Sense
                </h3>
                <p className="text-sm text-stone-300 mt-2 leading-relaxed">
                  Recommended when ongoing patch repairs become false economy due to perished
                  underlay or widespread nail corrosion.
                </p>
                <ul className="mt-5 space-y-3 text-sm text-stone-200">
                  <li className="flex items-start gap-2.5">
                    <CheckCircle2 className="w-4 h-4 text-[#C17A52] shrink-0 mt-0.5" />
                    <span>Roof unmaintained for 20+ years with widespread nail sickness</span>
                  </li>
                  <li className="flex items-start gap-2.5">
                    <CheckCircle2 className="w-4 h-4 text-[#C17A52] shrink-0 mt-0.5" />
                    <span>Rotten or tearing bitumen felt allowing condensation &amp; leaks in loft</span>
                  </li>
                  <li className="flex items-start gap-2.5">
                    <CheckCircle2 className="w-4 h-4 text-[#C17A52] shrink-0 mt-0.5" />
                    <span>Upgrading to BBA breathable membrane, new battens &amp; dry-ridge security</span>
                  </li>
                </ul>
              </div>
              <div className="mt-8 pt-4 border-t border-white/15">
                <button
                  type="button"
                  onClick={() => onNavigate('/quote')}
                  className="inline-flex items-center gap-2 text-xs font-display font-bold uppercase tracking-wider text-[#C17A52] hover:text-white cursor-pointer"
                >
                  <span>Request a Free New Roof Quotation</span>
                  <ArrowRight className="w-4 h-4" />
                </button>
              </div>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
};
