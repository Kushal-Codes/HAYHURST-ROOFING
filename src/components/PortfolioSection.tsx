import React, { useState } from 'react';
import {
  Camera,
  MapPin,
  ArrowUpRight,
  X,
  ChevronLeft,
  ChevronRight,
  CheckCircle2,
} from 'lucide-react';
import { PORTFOLIO_PROJECTS, PortfolioProject } from '../data/hayhurstData';
import { filterPortfolioByCategory } from '../utils/quoteValidation';

interface PortfolioSectionProps {
  onRequestQuoteForProject: (project: PortfolioProject) => void;
}

const PORTFOLIO_CATEGORIES = [
  'All',
  'New Roofs',
  'Chimney Repairs',
  'Slate & Tile Work',
  'Roof Repairs',
  'Guttering & Roofline',
  'Rendering',
] as const;

export const PortfolioSection: React.FC<PortfolioSectionProps> = ({
  onRequestQuoteForProject,
}) => {
  const [selectedCategory, setSelectedCategory] = useState<string>('All');
  const [activeProject, setActiveProject] = useState<PortfolioProject | null>(null);
  const [activePhotoIndex, setActivePhotoIndex] = useState<number>(0);

  const filteredProjects = filterPortfolioByCategory(
    PORTFOLIO_PROJECTS,
    selectedCategory
  );

  const openProjectModal = (project: PortfolioProject) => {
    setActiveProject(project);
    setActivePhotoIndex(0);
  };

  const closeProjectModal = () => {
    setActiveProject(null);
    setActivePhotoIndex(0);
  };

  const projectPhotos = activeProject
    ? [activeProject.image, ...(activeProject.secondaryImages || [])]
    : [];

  return (
    <section
      id="portfolio"
      className="py-20 lg:py-28 bg-[#151B1F] text-white border-b border-white/10"
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 items-end pb-10 border-b border-white/15">
          <div className="lg:col-span-7">
            <span className="text-xs font-display font-bold uppercase tracking-[0.2em] text-[#C17A52] block mb-3">
              04 / DOCUMENTED ROOFING PORTFOLIO
            </span>
            <h2 className="font-display text-3xl sm:text-4xl lg:text-5xl font-bold tracking-tight text-white leading-[1.1]">
              Genuine Rooftop Work Across Accrington &amp; Lancashire.
            </h2>
          </div>
          <div className="lg:col-span-5">
            <p className="text-base text-stone-300 leading-relaxed">
              Every photograph below comes directly from Hayhurst Roofing&rsquo;s completed jobs—showing
              real breathable membranes, hand-dressed leadwork, repointed chimneys, and natural
              slate roofs. Click any project to inspect multiple stage photos.
            </p>
          </div>
        </div>

        {/* Category Filter Buttons */}
        <div className="mt-8 flex flex-wrap items-center justify-between gap-4">
          <div
            className="flex flex-wrap gap-2"
            role="group"
            aria-label="Filter portfolio projects by category"
          >
            {PORTFOLIO_CATEGORIES.map((category) => (
              <button
                key={category}
                type="button"
                onClick={() => setSelectedCategory(category)}
                aria-pressed={selectedCategory === category}
                className={`px-4 py-2 text-xs font-display font-semibold uppercase tracking-wider border transition-colors cursor-pointer ${
                  selectedCategory === category
                    ? 'bg-[#C17A52] text-[#151B1F] border-[#C17A52]'
                    : 'bg-[#27343C]/60 text-stone-300 border-white/15 hover:border-white/40 hover:text-white'
                }`}
              >
                {category}
              </button>
            ))}
          </div>

          <span className="text-xs font-mono text-stone-400">
            Showing {filteredProjects.length} documented projects
          </span>
        </div>

        {/* Portfolio Grid */}
        <div
          data-testid="portfolio-grid"
          className="mt-10 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6"
        >
          {filteredProjects.map((project) => {
            const totalPhotos = 1 + (project.secondaryImages?.length || 0);
            return (
              <article
                key={project.id}
                className="bg-[#27343C]/45 border border-white/12 hover:border-[#C17A52] transition-all flex flex-col justify-between group"
              >
                <div>
                  <div className="relative aspect-[4/3] overflow-hidden bg-[#151B1F] border-b border-white/10">
                    <img
                      src={project.image}
                      alt={project.imageAlt}
                      className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-700"
                      loading="lazy"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-[#151B1F]/80 via-transparent to-transparent" />

                    <div className="absolute top-3 left-3 bg-[#151B1F]/90 border border-white/15 px-2.5 py-1 text-[11px] font-mono text-[#C17A52] uppercase">
                      {project.category}
                    </div>

                    <div className="absolute top-3 right-3 bg-[#151B1F]/90 border border-white/15 px-2.5 py-1 text-[11px] font-mono text-stone-200 flex items-center gap-1.5">
                      <Camera className="w-3 h-3 text-[#C17A52]" />
                      <span>{totalPhotos} {totalPhotos === 1 ? 'Photo' : 'Photos'}</span>
                    </div>

                    <div className="absolute bottom-3 left-3 right-3 flex items-center gap-1.5 text-xs text-stone-200">
                      <MapPin className="w-3.5 h-3.5 text-[#C17A52] shrink-0" />
                      <span>{project.location}</span>
                    </div>
                  </div>

                  <div className="p-6">
                    <h3 className="font-display text-lg sm:text-xl font-bold text-white leading-snug">
                      {project.title}
                    </h3>
                    <p className="text-xs sm:text-sm text-stone-300 mt-2.5 line-clamp-3 leading-relaxed">
                      <strong className="text-white font-semibold">Work Completed: </strong>
                      {project.workCompleted}
                    </p>
                  </div>
                </div>

                <div className="px-6 py-4 bg-[#151B1F]/60 border-t border-white/10 flex items-center justify-between gap-3">
                  <button
                    type="button"
                    onClick={() => openProjectModal(project)}
                    className="inline-flex items-center gap-1.5 text-xs font-display font-bold uppercase tracking-wider text-[#C17A52] hover:text-white transition-colors cursor-pointer"
                  >
                    <span>Inspect Case Study &amp; Photos</span>
                    <ArrowUpRight className="w-4 h-4" />
                  </button>
                </div>
              </article>
            );
          })}
        </div>
      </div>

      {/* Accessible Project Case Study Lightbox Modal */}
      {activeProject && (
        <div
          role="dialog"
          aria-modal="true"
          aria-labelledby="modal-project-title"
          className="fixed inset-0 z-50 bg-black/85 backdrop-blur-sm flex items-center justify-center p-4 sm:p-6 overflow-y-auto"
        >
          <div className="bg-[#151B1F] border border-white/20 max-w-4xl w-full overflow-hidden shadow-2xl my-auto">
            {/* Modal Header */}
            <div className="px-6 py-4 bg-[#27343C] border-b border-white/15 flex items-center justify-between gap-4">
              <div>
                <span className="text-xs font-mono text-[#C17A52] uppercase">
                  {activeProject.category} · {activeProject.location}
                </span>
                <h3
                  id="modal-project-title"
                  className="font-display text-lg sm:text-xl font-bold text-white"
                >
                  {activeProject.title}
                </h3>
              </div>
              <button
                type="button"
                onClick={closeProjectModal}
                aria-label="Close project case study"
                className="p-2 text-stone-300 hover:text-white bg-[#151B1F] border border-white/15 cursor-pointer"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            {/* Modal Body */}
            <div className="grid grid-cols-1 lg:grid-cols-12">
              {/* Left: Photo Viewer */}
              <div className="lg:col-span-7 bg-black relative flex flex-col justify-between">
                <div className="relative aspect-[4/3] w-full overflow-hidden">
                  <img
                    src={projectPhotos[activePhotoIndex]}
                    alt={`${activeProject.title} - Photograph ${activePhotoIndex + 1}`}
                    className="w-full h-full object-cover"
                  />

                  {projectPhotos.length > 1 && (
                    <>
                      <button
                        type="button"
                        onClick={() =>
                          setActivePhotoIndex((prev) =>
                            prev === 0 ? projectPhotos.length - 1 : prev - 1
                          )
                        }
                        aria-label="Previous project photograph"
                        className="absolute left-3 top-1/2 -translate-y-1/2 p-2 bg-[#151B1F]/90 text-white border border-white/20 hover:border-[#C17A52] cursor-pointer"
                      >
                        <ChevronLeft className="w-5 h-5" />
                      </button>
                      <button
                        type="button"
                        onClick={() =>
                          setActivePhotoIndex((prev) =>
                            prev === projectPhotos.length - 1 ? 0 : prev + 1
                          )
                        }
                        aria-label="Next project photograph"
                        className="absolute right-3 top-1/2 -translate-y-1/2 p-2 bg-[#151B1F]/90 text-white border border-white/20 hover:border-[#C17A52] cursor-pointer"
                      >
                        <ChevronRight className="w-5 h-5" />
                      </button>
                    </>
                  )}
                </div>

                {/* Thumbnail Strip */}
                {projectPhotos.length > 1 && (
                  <div className="p-3 bg-[#151B1F] border-t border-white/10 flex items-center gap-2 overflow-x-auto">
                    {projectPhotos.map((photoUrl, idx) => (
                      <button
                        key={photoUrl}
                        type="button"
                        onClick={() => setActivePhotoIndex(idx)}
                        aria-label={`View photo ${idx + 1}`}
                        className={`w-16 h-12 shrink-0 overflow-hidden border-2 transition-all cursor-pointer ${
                          activePhotoIndex === idx
                            ? 'border-[#C17A52] opacity-100'
                            : 'border-transparent opacity-60 hover:opacity-100'
                        }`}
                      >
                        <img
                          src={photoUrl}
                          alt=""
                          className="w-full h-full object-cover"
                        />
                      </button>
                    ))}
                  </div>
                )}
              </div>

              {/* Right: Project Case Study Details */}
              <div className="lg:col-span-5 p-6 space-y-5 flex flex-col justify-between bg-[#151B1F]">
                <div className="space-y-4">
                  <div>
                    <h4 className="text-xs font-mono uppercase tracking-wider text-[#C17A52]">
                      01 // Initial Roof Issue
                    </h4>
                    <p className="text-sm text-stone-300 mt-1 leading-relaxed">
                      {activeProject.problem}
                    </p>
                  </div>

                  <div className="pt-3 border-t border-white/10">
                    <h4 className="text-xs font-mono uppercase tracking-wider text-[#C17A52]">
                      02 // Work Carried Out
                    </h4>
                    <p className="text-sm text-stone-300 mt-1 leading-relaxed">
                      {activeProject.workCompleted}
                    </p>
                  </div>

                  <div className="pt-3 border-t border-white/10">
                    <h4 className="text-xs font-mono uppercase tracking-wider text-[#C17A52]">
                      03 // Completed Result
                    </h4>
                    <p className="text-sm text-stone-200 mt-1 leading-relaxed flex items-start gap-2">
                      <CheckCircle2 className="w-4 h-4 text-[#C17A52] shrink-0 mt-0.5" />
                      <span>{activeProject.visibleResult}</span>
                    </p>
                  </div>
                </div>

                <div className="pt-4 border-t border-white/15 space-y-2.5">
                  <button
                    type="button"
                    onClick={() => {
                      const projectToQuote = activeProject;
                      closeProjectModal();
                      onRequestQuoteForProject(projectToQuote);
                    }}
                    className="w-full py-3.5 px-4 bg-[#C17A52] hover:bg-[#d1875d] text-[#151B1F] font-display font-bold text-xs uppercase tracking-wider flex items-center justify-center gap-2 cursor-pointer"
                  >
                    <span>Request a Quote for Similar Work</span>
                    <ArrowUpRight className="w-4 h-4" />
                  </button>
                  <button
                    type="button"
                    onClick={closeProjectModal}
                    className="w-full py-2.5 px-4 bg-[#27343C] text-stone-200 hover:text-white text-xs font-display font-semibold uppercase tracking-wider cursor-pointer"
                  >
                    Close Preview
                  </button>
                </div>
              </div>
            </div>
          </div>
        </div>
      )}
    </section>
  );
};
