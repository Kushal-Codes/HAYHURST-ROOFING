import React from 'react';
import { Building2, CloudRain, CheckCircle2, ArrowRight } from 'lucide-react';
import { AreasSection } from '../components/AreasSection';

interface AreasPageProps {
  onSelectPostcodeForQuote: (postcode: string) => void;
  onRequestQuote: (categoryId?: string) => void;
}

const LOCAL_ARCHITECTURE_STYLES = [
  {
    title: 'Victorian & Edwardian Stone Terraces (Accrington & Oswaldtwistle)',
    era: '1880s – 1915',
    commonIssues:
      'Original natural Welsh slates suffering nail fatigue, weathered stone or brick shared chimney stacks, and traditional lead box gutters.',
    solution:
      'Individual slate matching and replacement, chimney crown flaunching & repointing, or hand-dressed lead box gutter renewals.',
    photo: '/images/gallery/010.jpg',
  },
  {
    title: 'Hipped Slate & Interlocking Tile Semi-Detached Homes (Burnley & Hyndburn)',
    era: '1920s – 1970s',
    commonIssues:
      'Mortar cracking along exposed hip and ridge lines, perished bitumen underfelt in the loft, and ageing uPVC fascia/gutter joints.',
    solution:
      'Mechanical dry-ridge and dry-hip upgrades or full strip-and-reslate with Cromar Vent3 Pro BBA breathable membranes.',
    photo: '/images/gallery/029.jpg',
  },
  {
    title: 'Exposed Pennine Stone Properties (Rossendale, Clitheroe & Ribble Valley)',
    era: 'Period & Rural Stone',
    commonIssues:
      'Severe wind-driven rain exposure, porous rear stone elevations, and valley gutter wear.',
    solution:
      'Full valley leadwork renewal, stone chimney repointing with ventilated cowls, and protective exterior wall rendering.',
    photo: '/images/gallery/018.jpg',
  },
  {
    title: 'Kitchen Extensions, Dormers & Flat Roofs (All Lancashire)',
    era: 'Modern & Mid-Century',
    commonIssues:
      'Leaks where lower extension roofs abut main house brickwork, often worsened by overflowing upper gutters during storms.',
    solution:
      'Torch-on mineral felt flat roofing, lead step-flashing repointing, and upper gutter clearing or replacement.',
    photo: '/images/gallery/009.jpg',
  },
] as const;

export const AreasPage: React.FC<AreasPageProps> = ({
  onSelectPostcodeForQuote,
  onRequestQuote,
}) => {
  return (
    <div className="pt-20">
      {/* Dedicated Page Header */}
      <section className="bg-[#151B1F] text-white py-16 lg:py-20 border-b border-white/10">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="max-w-3xl">
            <span className="text-xs font-display font-bold uppercase tracking-[0.2em] text-[#C17A52] block mb-3">
              PAGE // LOCAL COVERAGE &amp; LANCASHIRE ROOF GUIDE
            </span>
            <h1 className="font-display text-4xl sm:text-5xl font-bold tracking-tight text-white leading-[1.08]">
              Accrington Base. Covering Burnley, Hyndburn &amp; All of Lancashire.
            </h1>
            <p className="text-base sm:text-lg text-stone-300 mt-4 leading-relaxed">
              Use our instant postcode checker below to verify coverage for your property and
              explore how we maintain East Lancashire&rsquo;s traditional stone and slate roofs.
            </p>
          </div>
        </div>
      </section>

      {/* Postcode Checker & 6 Town Coverage Profiles */}
      <AreasSection onSelectPostcodeForQuote={onSelectPostcodeForQuote} />

      {/* Bespoke Feature: East Lancashire Property & Roof Architecture Guide */}
      <section className="py-20 bg-[#151B1F] text-white border-b border-white/10">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 items-end pb-12 border-b border-white/15">
            <div className="lg:col-span-7">
              <div className="inline-flex items-center gap-2 text-xs font-display font-bold uppercase tracking-[0.2em] text-[#C17A52] mb-2">
                <Building2 className="w-4 h-4" />
                <span>EAST LANCASHIRE ARCHITECTURAL GUIDE</span>
              </div>
              <h2 className="font-display text-3xl sm:text-4xl font-bold text-white">
                Roofing Built for Pennine Weather &amp; Local Property Styles.
              </h2>
            </div>
            <div className="lg:col-span-5">
              <p className="text-sm sm:text-base text-stone-300 leading-relaxed flex items-start gap-2.5">
                <CloudRain className="w-5 h-5 text-[#C17A52] shrink-0 mt-0.5" />
                <span>
                  East Lancashire receives some of the highest rainfall and wind exposure in the
                  North West. Every property type has distinct roofing points that need attention.
                </span>
              </p>
            </div>
          </div>

          <div className="mt-12 grid grid-cols-1 md:grid-cols-2 gap-8">
            {LOCAL_ARCHITECTURE_STYLES.map((style) => (
              <div
                key={style.title}
                className="bg-[#27343C]/45 border border-white/15 overflow-hidden flex flex-col justify-between"
              >
                <div>
                  <div className="aspect-[16/9] bg-[#151B1F] relative">
                    <img
                      src={style.photo}
                      alt={style.title}
                      className="w-full h-full object-cover"
                      loading="lazy"
                    />
                    <span className="absolute top-3 left-3 bg-[#151B1F]/90 px-3 py-1 font-mono text-xs text-[#C17A52]">
                      {style.era}
                    </span>
                  </div>
                  <div className="p-6 space-y-3">
                    <h3 className="font-display text-xl font-bold text-white">
                      {style.title}
                    </h3>
                    <p className="text-xs sm:text-sm text-stone-300 leading-relaxed">
                      <strong className="text-white">Common Weather Issues: </strong>
                      {style.commonIssues}
                    </p>
                    <p className="text-xs sm:text-sm text-stone-200 leading-relaxed flex items-start gap-2 pt-2 border-t border-white/10">
                      <CheckCircle2 className="w-4 h-4 text-[#C17A52] shrink-0 mt-0.5" />
                      <span>
                        <strong className="text-[#C17A52]">Hayhurst Solution: </strong>
                        {style.solution}
                      </span>
                    </p>
                  </div>
                </div>
                <div className="px-6 py-4 bg-[#151B1F]/60 border-t border-white/10">
                  <button
                    type="button"
                    onClick={() => onRequestQuote()}
                    className="inline-flex items-center gap-2 text-xs font-display font-bold uppercase tracking-wider text-[#C17A52] hover:text-white cursor-pointer"
                  >
                    <span>Book an Inspection for Your Property</span>
                    <ArrowRight className="w-4 h-4" />
                  </button>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>
    </div>
  );
};
