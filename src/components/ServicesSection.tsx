import React, { useState } from 'react';
import { ArrowUpRight, Check, AlertCircle, Camera, Phone } from 'lucide-react';
import { SERVICES, BUSINESS_INFO, ServiceItem } from '../data/hayhurstData';

interface ServicesSectionProps {
  onSelectServiceForQuote: (service: ServiceItem) => void;
}

export const ServicesSection: React.FC<ServicesSectionProps> = ({
  onSelectServiceForQuote,
}) => {
  const [selectedServiceId, setSelectedServiceId] = useState<string>(SERVICES[0].id);
  const [showSecondaryPhoto, setShowSecondaryPhoto] = useState<boolean>(false);

  const activeService =
    SERVICES.find((s) => s.id === selectedServiceId) || SERVICES[0];

  const handleSelectService = (serviceId: string) => {
    setSelectedServiceId(serviceId);
    setShowSecondaryPhoto(false);
  };

  const displayedImage =
    showSecondaryPhoto && activeService.secondaryImage
      ? activeService.secondaryImage
      : activeService.image;

  return (
    <section
      id="services"
      className="py-20 lg:py-28 bg-[#F6F4EF] text-[#151B1F] border-b border-[#151B1F]/10"
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section Header */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 items-end pb-12 border-b border-[#151B1F]/15">
          <div className="lg:col-span-7">
            <span className="text-xs font-display font-bold uppercase tracking-[0.2em] text-[#C17A52] block mb-3">
              01 / ROOFING &amp; EXTERIOR SERVICES
            </span>
            <h2 className="font-display text-3xl sm:text-4xl lg:text-5xl font-bold tracking-tight text-[#151B1F] leading-[1.1]">
              Complete Roofing Craftsmanship, From Single Slates to Full Roofs.
            </h2>
          </div>
          <div className="lg:col-span-5">
            <p className="text-base text-[#27343C] leading-relaxed">
              Every roof in East Lancashire faces driving Pennine rain and winter frosts. Select a
              service below to inspect what is included, common warning signs to watch for, and
              genuine photographs of Hayhurst Roofing work.
            </p>
          </div>
        </div>

        {/* Interactive Split-Screen Architectural Service Explorer */}
        <div className="mt-12 grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-10 items-start">
          {/* Left Column: Numbered Architectural Service Index */}
          <div
            className="lg:col-span-5 divide-y divide-[#151B1F]/12 border-y border-[#151B1F]/15 bg-white"
            role="tablist"
            aria-label="Roofing Services"
          >
            {SERVICES.map((service) => {
              const isSelected = service.id === activeService.id;
              return (
                <button
                  key={service.id}
                  type="button"
                  role="tab"
                  aria-selected={isSelected}
                  onClick={() => handleSelectService(service.id)}
                  className={`w-full text-left px-5 py-4 sm:py-5 transition-all flex items-start justify-between gap-4 cursor-pointer ${
                    isSelected
                      ? 'bg-[#151B1F] text-white border-l-4 border-l-[#C17A52]'
                      : 'bg-white hover:bg-stone-100/80 text-[#151B1F]'
                  }`}
                >
                  <div className="flex items-start gap-4">
                    <span
                      className={`font-mono text-xs sm:text-sm font-semibold mt-0.5 ${
                        isSelected ? 'text-[#C17A52]' : 'text-[#778087]'
                      }`}
                    >
                      {service.number}
                    </span>
                    <div>
                      <h3 className="font-display font-bold text-base sm:text-lg leading-snug">
                        {service.title}
                      </h3>
                      <p
                        className={`text-xs sm:text-sm mt-1 line-clamp-2 ${
                          isSelected ? 'text-stone-300' : 'text-[#778087]'
                        }`}
                      >
                        {service.summary}
                      </p>
                    </div>
                  </div>
                  <ArrowUpRight
                    className={`w-4 h-4 shrink-0 mt-1 transition-transform ${
                      isSelected ? 'text-[#C17A52] translate-x-0.5 -translate-y-0.5' : 'text-[#778087]'
                    }`}
                  />
                </button>
              );
            })}
          </div>

          {/* Right Column: Active Service Specification Panel */}
          <div className="lg:col-span-7 bg-white border border-[#151B1F]/15 shadow-sm overflow-hidden">
            {/* Genuine Project Image Header */}
            <div className="relative aspect-[16/10] bg-[#151B1F] overflow-hidden">
              <img
                src={displayedImage}
                alt={activeService.imageAlt}
                className="w-full h-full object-cover transition-all duration-500"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-[#151B1F]/90 via-[#151B1F]/20 to-transparent" />

              <div className="absolute top-4 left-4 bg-[#151B1F]/90 backdrop-blur-sm border border-white/15 px-3 py-1.5 flex items-center gap-2">
                <Camera className="w-3.5 h-3.5 text-[#C17A52]" />
                <span className="text-[11px] font-display uppercase tracking-wider text-white font-semibold">
                  Genuine Hayhurst Roofing Site Photo
                </span>
              </div>

              {activeService.secondaryImage && (
                <div className="absolute top-4 right-4 flex items-center gap-1.5">
                  <button
                    type="button"
                    onClick={() => setShowSecondaryPhoto(false)}
                    className={`px-2.5 py-1 text-xs font-mono uppercase transition-colors cursor-pointer ${
                      !showSecondaryPhoto
                        ? 'bg-[#C17A52] text-[#151B1F] font-bold'
                        : 'bg-[#151B1F]/85 text-white hover:bg-[#151B1F]'
                    }`}
                  >
                    Photo 1
                  </button>
                  <button
                    type="button"
                    onClick={() => setShowSecondaryPhoto(true)}
                    className={`px-2.5 py-1 text-xs font-mono uppercase transition-colors cursor-pointer ${
                      showSecondaryPhoto
                        ? 'bg-[#C17A52] text-[#151B1F] font-bold'
                        : 'bg-[#151B1F]/85 text-white hover:bg-[#151B1F]'
                    }`}
                  >
                    Photo 2
                  </button>
                </div>
              )}

              <div className="absolute bottom-4 left-5 right-5 flex flex-wrap items-end justify-between gap-4">
                <div>
                  <span className="font-mono text-xs text-[#C17A52] uppercase tracking-widest block">
                    SERVICE SPECIFICATION // {activeService.number}
                  </span>
                  <h3 className="font-display text-2xl sm:text-3xl font-bold text-white mt-0.5">
                    {activeService.title}
                  </h3>
                </div>
              </div>
            </div>

            {/* Detailed Service Breakdown */}
            <div className="p-6 sm:p-8 space-y-6">
              <p className="text-base text-[#27343C] leading-relaxed">
                {activeService.details}
              </p>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-6 pt-2 border-t border-[#151B1F]/10">
                {/* Work Included */}
                <div>
                  <h4 className="font-display text-xs font-bold uppercase tracking-[0.15em] text-[#151B1F] mb-3 flex items-center gap-2">
                    <Check className="w-4 h-4 text-[#C17A52]" />
                    What This Service Covers
                  </h4>
                  <ul className="space-y-2.5">
                    {activeService.workIncluded.map((item, idx) => (
                      <li
                        key={idx}
                        className="text-sm text-[#27343C] flex items-start gap-2.5 leading-snug"
                      >
                        <span className="w-1.5 h-1.5 bg-[#C17A52] mt-2 shrink-0" />
                        <span>{item}</span>
                      </li>
                    ))}
                  </ul>
                </div>

                {/* Common Warning Signs */}
                <div className="bg-[#F6F4EF] p-4 sm:p-5 border border-[#151B1F]/10">
                  <h4 className="font-display text-xs font-bold uppercase tracking-[0.15em] text-[#151B1F] mb-3 flex items-center gap-2">
                    <AlertCircle className="w-4 h-4 text-[#C17A52]" />
                    Common Signs to Watch For
                  </h4>
                  <ul className="space-y-2.5">
                    {activeService.commonSigns.map((sign, idx) => (
                      <li
                        key={idx}
                        className="text-sm text-[#27343C] flex items-start gap-2 leading-snug"
                      >
                        <span className="font-mono text-xs text-[#C17A52] font-bold">0{idx + 1}.</span>
                        <span>{sign}</span>
                      </li>
                    ))}
                  </ul>
                </div>
              </div>

              {/* Direct Service-Specific Action Bar */}
              <div className="pt-4 border-t border-[#151B1F]/10 flex flex-col sm:flex-row items-stretch sm:items-center justify-between gap-4">
                <button
                  type="button"
                  onClick={() => onSelectServiceForQuote(activeService)}
                  className="inline-flex items-center justify-center gap-2.5 px-6 py-3.5 bg-[#151B1F] hover:bg-[#27343C] text-white font-display font-semibold text-sm uppercase tracking-wider transition-colors cursor-pointer"
                >
                  <span>Request a Quote for {activeService.shortTitle}</span>
                  <ArrowUpRight className="w-4 h-4 text-[#C17A52]" />
                </button>

                <a
                  href={BUSINESS_INFO.phoneHref}
                  className="inline-flex items-center justify-center gap-2 px-4 py-3 text-sm font-display font-semibold text-[#151B1F] border border-[#151B1F]/20 hover:border-[#C17A52] transition-colors"
                >
                  <Phone className="w-4 h-4 text-[#C17A52]" />
                  <span>Speak to Ash: {BUSINESS_INFO.phoneDisplay}</span>
                </a>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};
