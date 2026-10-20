/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import { useState, useEffect } from 'react';
import { Navbar } from './components/Navbar';
import { SiteFooter } from './components/SiteFooter';
import { HomePage } from './pages/HomePage';
import { ServicesPage } from './pages/ServicesPage';
import { PortfolioPage } from './pages/PortfolioPage';
import { ReviewsPage } from './pages/ReviewsPage';
import { AreasPage } from './pages/AreasPage';
import { ContactQuotePage } from './pages/ContactQuotePage';
import { ServiceItem, PortfolioProject } from './data/hayhurstData';
import {
  mapServiceToWizardCategory,
  normalizeRoutePath,
  PageRoute,
} from './utils/quoteValidation';

const PAGE_TITLES: Record<PageRoute, string> = {
  '/': 'Hayhurst Roofing — Roof Repairs & New Roofs in Accrington & Lancashire',
  '/services': 'Roofing, Chimney, Guttering & Rendering Services | Hayhurst Roofing Accrington',
  '/portfolio': 'Project Portfolio & 33+ Rooftop Photos | Hayhurst Roofing Lancashire',
  '/reviews': '5.0★ Verified Customer Reviews (Google & MyBuilder) | Hayhurst Roofing',
  '/areas': 'Areas Covered: Accrington, Burnley & Lancashire | Hayhurst Roofing',
  '/quote': 'Request Your Free Roofing Quote | Hayhurst Roofing Accrington',
  '/contact': 'Contact Ash (07533 137930) & Operating Hours | Hayhurst Roofing',
};

export default function App() {
  const [currentPage, setCurrentPage] = useState<PageRoute>(() =>
    normalizeRoutePath(window.location.pathname)
  );

  const [preselectedCategory, setPreselectedCategory] = useState<string | undefined>(
    undefined
  );
  const [preselectedPostcode, setPreselectedPostcode] = useState<string | undefined>(
    undefined
  );
  const [preselectedUrgency, setPreselectedUrgency] = useState<string | undefined>(
    undefined
  );

  useEffect(() => {
    const handlePopState = () => {
      setCurrentPage(normalizeRoutePath(window.location.pathname));
      window.scrollTo({ top: 0, behavior: 'instant' as ScrollBehavior });
    };
    window.addEventListener('popstate', handlePopState);
    return () => window.removeEventListener('popstate', handlePopState);
  }, []);

  useEffect(() => {
    document.title = PAGE_TITLES[currentPage] || PAGE_TITLES['/'];
  }, [currentPage]);

  const navigateTo = (page: PageRoute) => {
    if (window.location.pathname !== page) {
      window.history.pushState({}, '', page);
    }
    setCurrentPage(page);
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const handleRequestQuote = (categoryId?: string) => {
    if (categoryId) {
      setPreselectedCategory(categoryId);
    }
    navigateTo('/quote');
  };

  const handleSelectServiceForQuote = (service: ServiceItem) => {
    const mappedCategory = mapServiceToWizardCategory(service.id);
    setPreselectedCategory(mappedCategory);
    navigateTo('/quote');
  };

  const handleRequestQuoteForProject = (project: PortfolioProject) => {
    const categoryMap: Record<PortfolioProject['category'], string> = {
      'Roof Repairs': 'roof-leak',
      'New Roofs': 'full-roof',
      'Chimney Repairs': 'chimney',
      'Guttering & Roofline': 'guttering',
      'Slate & Tile Work': 'slates-tiles',
      Rendering: 'rendering',
    };
    setPreselectedCategory(categoryMap[project.category] || 'roof-leak');
    navigateTo('/quote');
  };

  const handleRequestUrgentQuote = () => {
    setPreselectedCategory('roof-leak');
    setPreselectedUrgency('Urgent — Active leak or storm damage');
    navigateTo('/quote');
  };

  const handleSelectPostcodeForQuote = (postcode: string) => {
    setPreselectedPostcode(postcode);
    navigateTo('/quote');
  };

  return (
    <div className="min-h-screen flex flex-col bg-[#151B1F] text-[#151B1F] selection:bg-[#C17A52] selection:text-[#151B1F]">
      <Navbar
        currentPage={currentPage}
        onNavigate={navigateTo}
        onRequestQuote={handleRequestQuote}
      />

      <main className="flex-1">
        {currentPage === '/' && (
          <HomePage
            onNavigate={navigateTo}
            onRequestQuote={handleRequestQuote}
            onRequestUrgentQuote={handleRequestUrgentQuote}
          />
        )}

        {currentPage === '/services' && (
          <ServicesPage
            onSelectServiceForQuote={handleSelectServiceForQuote}
            onNavigate={navigateTo}
          />
        )}

        {currentPage === '/portfolio' && (
          <PortfolioPage
            onRequestQuoteForProject={handleRequestQuoteForProject}
            onRequestQuote={handleRequestQuote}
          />
        )}

        {currentPage === '/reviews' && (
          <ReviewsPage onRequestQuote={handleRequestQuote} />
        )}

        {currentPage === '/areas' && (
          <AreasPage
            onSelectPostcodeForQuote={handleSelectPostcodeForQuote}
            onRequestQuote={handleRequestQuote}
          />
        )}

        {(currentPage === '/quote' || currentPage === '/contact') && (
          <ContactQuotePage
            activeRoute={currentPage}
            onNavigate={navigateTo}
            preselectedCategory={preselectedCategory}
            preselectedPostcode={preselectedPostcode}
            preselectedUrgency={preselectedUrgency}
          />
        )}
      </main>

      <SiteFooter
        onNavigate={navigateTo}
        onRequestQuote={handleRequestQuote}
      />
    </div>
  );
}
