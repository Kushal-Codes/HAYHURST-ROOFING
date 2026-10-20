import React, { useState } from 'react';
import { MapPin, CheckCircle2, ArrowRight, Compass, Search } from 'lucide-react';
import { SERVICE_AREAS } from '../data/hayhurstData';

interface AreasSectionProps {
  onSelectPostcodeForQuote: (postcode: string) => void;
}

export const AreasSection: React.FC<AreasSectionProps> = ({
  onSelectPostcodeForQuote,
}) => {
  const [postcodeQuery, setPostcodeQuery] = useState('');
  const [checkResult, setCheckResult] = useState<{
    matched: boolean;
    postcode: string;
    message: string;
  } | null>(null);

  const handleCheckPostcode = (e: React.FormEvent) => {
    e.preventDefault();
    const cleaned = postcodeQuery.trim().toUpperCase();
    if (!cleaned) return;

    const isLancashirePrefix = /^(BB|PR|FY|OL|LA|BL|WN)/i.test(cleaned);
    if (isLancashirePrefix) {
      setCheckResult({
        matched: true,
        postcode: cleaned,
        message: `Yes — Hayhurst Roofing covers ${cleaned} and surrounding Lancashire communities for roof repairs, chimney work, guttering, and new roofs.`,
      });
    } else {
      setCheckResult({
        matched: true,
        postcode: cleaned,
        message: `Hayhurst Roofing primarily serves Accrington (BB5), Burnley (BB10–BB12), and Lancashire. Send your enquiry with postcode ${cleaned} and Ash will confirm availability.`,
      });
    }
  };

  return (
    <section
      id="coverage"
      className="py-20 lg:py-28 bg-[#F6F4EF] text-[#151B1F] border-b border-[#151B1F]/10"
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-end pb-12 border-b border-[#151B1F]/15">
          <div className="lg:col-span-7">
            <span className="text-xs font-display font-bold uppercase tracking-[0.2em] text-[#C17A52] block mb-3">
              05 / LOCAL COVERAGE ACROSS LANCASHIRE
            </span>
            <h2 className="font-display text-3xl sm:text-4xl lg:text-5xl font-bold tracking-tight text-[#151B1F] leading-[1.1]">
              Based in Accrington. Working Across Burnley &amp; All of Lancashire.
            </h2>
          </div>
          <div className="lg:col-span-5">
            <p className="text-base text-[#27343C] leading-relaxed">
              From Victorian natural slate terraces in Accrington and Oswaldtwistle to exposed
              Pennine stone properties in Burnley, Rossendale, and the Ribble Valley, our work is
              tailored to local East Lancashire architecture and weather.
            </p>
          </div>
        </div>

        {/* Interactive Postcode Coverage Checker Bar */}
        <div className="mt-10 bg-[#151B1F] text-white p-6 sm:p-8 border border-[#151B1F]">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 items-center">
            <div className="lg:col-span-5">
              <div className="flex items-center gap-2 text-xs font-mono uppercase tracking-wider text-[#C17A52]">
                <Compass className="w-4 h-4" />
                <span>Instant Postcode Check</span>
              </div>
              <h3 className="font-display text-xl font-bold text-white mt-1">
                Check Coverage for Your Property
              </h3>
              <p className="text-xs sm:text-sm text-stone-300 mt-1">
                Enter your postcode or area prefix (e.g. BB5 5AR, BB10, BB1, PR) to start your
                quote.
              </p>
            </div>

            <div className="lg:col-span-7">
              <form
                onSubmit={handleCheckPostcode}
                className="flex flex-col sm:flex-row gap-3"
              >
                <div className="relative flex-1">
                  <label htmlFor="coverage-postcode-input" className="sr-only">
                    Enter your UK postcode
                  </label>
                  <Search className="w-4 h-4 text-stone-400 absolute left-3.5 top-1/2 -translate-y-1/2" />
                  <input
                    id="coverage-postcode-input"
                    type="text"
                    value={postcodeQuery}
                    onChange={(e) => setPostcodeQuery(e.target.value)}
                    placeholder="Enter postcode (e.g. BB5 5AR or BB10)"
                    className="w-full pl-10 pr-4 py-3.5 bg-[#27343C] border border-white/20 text-white placeholder-stone-400 text-sm focus:outline-none focus:border-[#C17A52]"
                  />
                </div>
                <button
                  type="submit"
                  className="px-6 py-3.5 bg-[#C17A52] hover:bg-[#d1875d] text-[#151B1F] font-display font-bold text-xs sm:text-sm uppercase tracking-wider transition-colors cursor-pointer shrink-0"
                >
                  Check Postcode
                </button>
              </form>

              {checkResult && (
                <div className="mt-4 p-4 bg-[#27343C] border-l-4 border-l-[#C17A52] flex flex-col sm:flex-row sm:items-center justify-between gap-4">
                  <div className="flex items-start gap-2.5 text-xs sm:text-sm text-stone-200">
                    <CheckCircle2 className="w-4 h-4 text-[#C17A52] shrink-0 mt-0.5" />
                    <span>{checkResult.message}</span>
                  </div>
                  <button
                    type="button"
                    onClick={() => onSelectPostcodeForQuote(checkResult.postcode)}
                    className="inline-flex items-center gap-1.5 px-4 py-2 bg-[#C17A52] text-[#151B1F] font-display font-bold text-xs uppercase tracking-wider shrink-0 cursor-pointer"
                  >
                    <span>Use {checkResult.postcode} in Quote</span>
                    <ArrowRight className="w-3.5 h-3.5" />
                  </button>
                </div>
              )}
            </div>
          </div>
        </div>

        {/* Service Areas Architectural Grid */}
        <div className="mt-10 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {SERVICE_AREAS.map((area) => (
            <div
              key={area.name}
              className="bg-white border border-[#151B1F]/15 p-6 flex flex-col justify-between hover:border-[#C17A52] transition-colors"
            >
              <div>
                <div className="flex items-center justify-between gap-2 pb-3 mb-3 border-b border-[#151B1F]/10">
                  <span className="inline-flex items-center gap-1.5 text-xs font-mono font-bold text-[#C17A52]">
                    <MapPin className="w-3.5 h-3.5" />
                    {area.postcodePrefix}
                  </span>
                  <span className="text-[11px] font-display uppercase tracking-wider px-2.5 py-0.5 bg-[#F6F4EF] text-[#27343C] border border-[#151B1F]/10 font-semibold">
                    {area.status}
                  </span>
                </div>

                <h3 className="font-display text-xl font-bold text-[#151B1F]">
                  {area.name}
                </h3>
                <p className="text-sm text-[#27343C] mt-2 leading-relaxed">
                  {area.description}
                </p>
              </div>

              <div className="mt-5 pt-4 border-t border-[#151B1F]/10">
                <span className="block text-[11px] font-mono uppercase text-[#778087]">
                  Typical Local Roof Work:
                </span>
                <p className="text-xs font-medium text-[#151B1F] mt-1">
                  {area.commonRoofTypes}
                </p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};
