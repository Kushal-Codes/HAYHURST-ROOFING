import React, { useState } from 'react';
import {
  Phone,
  Mail,
  Clock,
  MapPin,
  AlertCircle,
  ExternalLink,
  ChevronDown,
  CheckCircle2,
  Send,
  ArrowUpRight,
} from 'lucide-react';
import { BUSINESS_INFO, FAQS, SERVICES } from '../data/hayhurstData';

interface ContactAndFooterProps {
  onRequestQuote: (categoryId?: string) => void;
}

export const ContactAndFooter: React.FC<ContactAndFooterProps> = ({
  onRequestQuote,
}) => {
  const [openFaqIndex, setOpenFaqIndex] = useState<number | null>(0);

  // Quick Contact Form state
  const [contactName, setContactName] = useState('');
  const [contactPhone, setContactPhone] = useState('');
  const [contactEmail, setContactEmail] = useState('');
  const [contactService, setContactService] = useState('General Roofing Enquiry');
  const [contactMessage, setContactMessage] = useState('');
  const [contactErrors, setContactErrors] = useState<Record<string, string>>({});
  const [contactSubmitting, setContactSubmitting] = useState(false);
  const [contactSuccess, setContactSuccess] = useState<{
    reference: string;
    deliveryNotice: string;
  } | null>(null);

  const handleQuickContactSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setContactErrors({});
    setContactSubmitting(true);

    try {
      const res = await fetch('/api/contact', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          name: contactName,
          phone: contactPhone,
          email: contactEmail,
          service: contactService,
          message: contactMessage,
        }),
      });
      const data = await res.json();
      if (!res.ok || !data.ok) {
        setContactErrors(data.fieldErrors || { form: data.error || 'Please check your inputs.' });
        setContactSubmitting(false);
        return;
      }
      setContactSuccess({
        reference: data.reference,
        deliveryNotice: data.deliveryNotice,
      });
      setContactName('');
      setContactPhone('');
      setContactEmail('');
      setContactMessage('');
    } catch {
      setContactErrors({
        form: 'Unable to send right now. Please call Ash on 07533 137930.',
      });
    } finally {
      setContactSubmitting(false);
    }
  };

  return (
    <>
      {/* CONTACT & FAQ SECTION */}
      <section
        id="contact"
        className="py-20 lg:py-28 bg-[#F6F4EF] text-[#151B1F] border-b border-[#151B1F]/15"
      >
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-12">
            {/* Left Column: Direct Contact Details, Hours & Explicit Postal Notice */}
            <div className="lg:col-span-6 space-y-8">
              <div>
                <span className="text-xs font-display font-bold uppercase tracking-[0.2em] text-[#C17A52] block mb-3">
                  07 / DIRECT CONTACT &amp; OPERATING HOURS
                </span>
                <h2 className="font-display text-3xl sm:text-4xl font-bold tracking-tight text-[#151B1F] leading-[1.1]">
                  Speak Directly with Ash at Hayhurst Roofing.
                </h2>
                <p className="text-base text-[#27343C] mt-3 leading-relaxed">
                  Whether you have a single loose slate after windy weather or want an honest quote
                  on a chimney or full re-roof, get in touch directly by phone, email, or the
                  message form.
                </p>
              </div>

              {/* Direct Contact Cards */}
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <a
                  href={BUSINESS_INFO.phoneHref}
                  className="bg-[#151B1F] text-white p-5 border border-[#151B1F] hover:border-[#C17A52] transition-colors group"
                >
                  <div className="flex items-center justify-between">
                    <span className="text-xs font-mono uppercase text-[#C17A52]">
                      Direct Mobile
                    </span>
                    <Phone className="w-4 h-4 text-[#C17A52]" />
                  </div>
                  <span className="font-display text-xl sm:text-2xl font-bold block mt-2 group-hover:text-[#C17A52] transition-colors">
                    {BUSINESS_INFO.phoneDisplay}
                  </span>
                  <span className="text-xs text-stone-300 mt-1 block">
                    Tap to call Ash directly
                  </span>
                </a>

                <a
                  href={BUSINESS_INFO.emailHref}
                  className="bg-white text-[#151B1F] p-5 border border-[#151B1F]/15 hover:border-[#C17A52] transition-colors group"
                >
                  <div className="flex items-center justify-between">
                    <span className="text-xs font-mono uppercase text-[#C17A52]">
                      Direct Email
                    </span>
                    <Mail className="w-4 h-4 text-[#C17A52]" />
                  </div>
                  <span className="font-display text-base sm:text-lg font-bold block mt-2 break-all group-hover:text-[#C17A52] transition-colors">
                    {BUSINESS_INFO.email}
                  </span>
                  <span className="text-xs text-[#778087] mt-1 block">
                    Send photos or quote enquiries
                  </span>
                </a>
              </div>

              {/* Operating Hours */}
              <div className="bg-white border border-[#151B1F]/15 p-6">
                <div className="flex items-center gap-2 text-xs font-display font-bold uppercase tracking-wider text-[#151B1F] pb-3 mb-3 border-b border-[#151B1F]/10">
                  <Clock className="w-4 h-4 text-[#C17A52]" />
                  <span>Verified Operating Hours</span>
                </div>
                <dl className="space-y-2 text-sm">
                  {BUSINESS_INFO.hours.map((item) => (
                    <div key={item.days} className="flex justify-between gap-4">
                      <dt className="font-semibold text-[#151B1F]">{item.days}</dt>
                      <dd className="text-[#27343C] text-right">{item.time}</dd>
                    </div>
                  ))}
                </dl>
              </div>

              {/* IMPORTANT: Postal Correspondence Notice */}
              <div className="bg-white border-l-4 border-l-[#C17A52] border border-[#151B1F]/15 p-5 space-y-2">
                <div className="flex items-center gap-2 text-xs font-display font-bold uppercase tracking-wider text-[#151B1F]">
                  <MapPin className="w-4 h-4 text-[#C17A52] shrink-0" />
                  <span>Postal Correspondence Address Only</span>
                </div>
                <p className="font-display font-semibold text-sm text-[#151B1F]">
                  {BUSINESS_INFO.postalAddress.full}
                </p>
                <p className="text-xs text-[#27343C] leading-relaxed flex items-start gap-2">
                  <AlertCircle className="w-4 h-4 text-[#C17A52] shrink-0 mt-0.5" />
                  <span>{BUSINESS_INFO.postalAddress.notice}</span>
                </p>
              </div>

              {/* FAQ Accordion */}
              <div className="pt-2">
                <h3 className="font-display text-lg font-bold text-[#151B1F] mb-4">
                  Common Questions
                </h3>
                <div className="divide-y divide-[#151B1F]/15 border-y border-[#151B1F]/15 bg-white">
                  {FAQS.map((faq, idx) => {
                    const isOpen = openFaqIndex === idx;
                    return (
                      <div key={faq.question}>
                        <button
                          type="button"
                          onClick={() => setOpenFaqIndex(isOpen ? null : idx)}
                          aria-expanded={isOpen}
                          className="w-full py-4 px-5 text-left flex items-center justify-between gap-4 font-display font-bold text-sm text-[#151B1F] hover:text-[#C17A52] cursor-pointer"
                        >
                          <span>{faq.question}</span>
                          <ChevronDown
                            className={`w-4 h-4 text-[#C17A52] shrink-0 transition-transform ${
                              isOpen ? 'rotate-180' : ''
                            }`}
                          />
                        </button>
                        {isOpen && (
                          <div className="px-5 pb-4 text-sm text-[#27343C] leading-relaxed">
                            {faq.answer}
                          </div>
                        )}
                      </div>
                    );
                  })}
                </div>
              </div>
            </div>

            {/* Right Column: Direct Quick Enquiry Form */}
            <div className="lg:col-span-6">
              <div className="bg-white border border-[#151B1F]/15 p-6 sm:p-8 lg:p-10 shadow-sm">
                <span className="text-xs font-mono uppercase text-[#C17A52] block">
                  DIRECT MESSAGE FORM
                </span>
                <h3 className="font-display text-2xl font-bold text-[#151B1F] mt-1">
                  Send a Quick Question to Ash
                </h3>
                <p className="text-sm text-[#27343C] mt-1 mb-6">
                  Prefer a simple message instead of the 4-step quote builder? Fill in your details
                  below.
                </p>

                {contactSuccess ? (
                  <div className="p-6 bg-[#151B1F] text-white border-l-4 border-l-[#C17A52] space-y-4">
                    <div className="flex items-center gap-2.5 text-[#C17A52]">
                      <CheckCircle2 className="w-5 h-5" />
                      <span className="font-mono text-xs uppercase">
                        Reference: {contactSuccess.reference}
                      </span>
                    </div>
                    <h4 className="font-display text-xl font-bold">
                      Message Logged for Hayhurst Roofing
                    </h4>
                    <p className="text-xs sm:text-sm text-stone-300 leading-relaxed">
                      {contactSuccess.deliveryNotice}
                    </p>
                    <div className="pt-2 flex flex-wrap gap-3">
                      <a
                        href={BUSINESS_INFO.phoneHref}
                        className="px-4 py-2.5 bg-[#C17A52] text-[#151B1F] font-display font-bold text-xs uppercase tracking-wider"
                      >
                        Call {BUSINESS_INFO.phoneDisplay}
                      </a>
                      <button
                        type="button"
                        onClick={() => setContactSuccess(null)}
                        className="px-4 py-2.5 border border-white/20 text-white text-xs font-display uppercase tracking-wider cursor-pointer"
                      >
                        Send Another Message
                      </button>
                    </div>
                  </div>
                ) : (
                  <form onSubmit={handleQuickContactSubmit} className="space-y-4" noValidate>
                    <div>
                      <label
                        htmlFor="contact-name"
                        className="block text-xs font-display font-bold uppercase tracking-wider text-[#151B1F] mb-1.5"
                      >
                        Full Name *
                      </label>
                      <input
                        id="contact-name"
                        type="text"
                        value={contactName}
                        onChange={(e) => setContactName(e.target.value)}
                        placeholder="Your name"
                        className="w-full px-4 py-3 bg-[#F6F4EF] border border-[#151B1F]/20 text-[#151B1F] text-sm focus:outline-none focus:border-[#C17A52]"
                      />
                      {contactErrors.name && (
                        <p role="alert" className="text-xs text-red-700 mt-1">
                          {contactErrors.name}
                        </p>
                      )}
                    </div>

                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                      <div>
                        <label
                          htmlFor="contact-phone"
                          className="block text-xs font-display font-bold uppercase tracking-wider text-[#151B1F] mb-1.5"
                        >
                          Phone Number *
                        </label>
                        <input
                          id="contact-phone"
                          type="tel"
                          value={contactPhone}
                          onChange={(e) => setContactPhone(e.target.value)}
                          placeholder="07533 137930"
                          className="w-full px-4 py-3 bg-[#F6F4EF] border border-[#151B1F]/20 text-[#151B1F] text-sm focus:outline-none focus:border-[#C17A52]"
                        />
                        {contactErrors.phone && (
                          <p role="alert" className="text-xs text-red-700 mt-1">
                            {contactErrors.phone}
                          </p>
                        )}
                      </div>

                      <div>
                        <label
                          htmlFor="contact-email"
                          className="block text-xs font-display font-bold uppercase tracking-wider text-[#151B1F] mb-1.5"
                        >
                          Email Address *
                        </label>
                        <input
                          id="contact-email"
                          type="email"
                          value={contactEmail}
                          onChange={(e) => setContactEmail(e.target.value)}
                          placeholder="you@example.co.uk"
                          className="w-full px-4 py-3 bg-[#F6F4EF] border border-[#151B1F]/20 text-[#151B1F] text-sm focus:outline-none focus:border-[#C17A52]"
                        />
                        {contactErrors.email && (
                          <p role="alert" className="text-xs text-red-700 mt-1">
                            {contactErrors.email}
                          </p>
                        )}
                      </div>
                    </div>

                    <div>
                      <label
                        htmlFor="contact-service"
                        className="block text-xs font-display font-bold uppercase tracking-wider text-[#151B1F] mb-1.5"
                      >
                        Service of Interest
                      </label>
                      <select
                        id="contact-service"
                        value={contactService}
                        onChange={(e) => setContactService(e.target.value)}
                        className="w-full px-4 py-3 bg-[#F6F4EF] border border-[#151B1F]/20 text-[#151B1F] text-sm focus:outline-none focus:border-[#C17A52]"
                      >
                        <option value="General Roofing Enquiry">General Roofing Enquiry</option>
                        {SERVICES.map((s) => (
                          <option key={s.id} value={s.title}>
                            {s.title}
                          </option>
                        ))}
                      </select>
                    </div>

                    <div>
                      <label
                        htmlFor="contact-message"
                        className="block text-xs font-display font-bold uppercase tracking-wider text-[#151B1F] mb-1.5"
                      >
                        How Can Ash Help? *
                      </label>
                      <textarea
                        id="contact-message"
                        rows={4}
                        value={contactMessage}
                        onChange={(e) => setContactMessage(e.target.value)}
                        placeholder="Include your postcode and a short note about your roof, chimney, or guttering..."
                        className="w-full px-4 py-3 bg-[#F6F4EF] border border-[#151B1F]/20 text-[#151B1F] text-sm focus:outline-none focus:border-[#C17A52]"
                      />
                      {contactErrors.message && (
                        <p role="alert" className="text-xs text-red-700 mt-1">
                          {contactErrors.message}
                        </p>
                      )}
                    </div>

                    {contactErrors.form && (
                      <p role="alert" className="text-xs text-red-700">
                        {contactErrors.form}
                      </p>
                    )}

                    <button
                      type="submit"
                      disabled={contactSubmitting}
                      className="w-full py-4 px-6 bg-[#151B1F] hover:bg-[#27343C] text-white font-display font-bold text-xs sm:text-sm uppercase tracking-wider flex items-center justify-center gap-2 transition-colors cursor-pointer"
                    >
                      <Send className="w-4 h-4 text-[#C17A52]" />
                      <span>
                        {contactSubmitting ? 'Sending Enquiry...' : 'Send Message to Hayhurst Roofing'}
                      </span>
                    </button>
                  </form>
                )}
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* ARCHITECTURAL FOOTER */}
      <footer className="bg-[#151B1F] text-stone-300 pt-16 pb-24 md:pb-16 border-t border-white/10">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-12 gap-10 pb-12 border-b border-white/10">
            {/* Col 1: Brand &Ethos */}
            <div className="lg:col-span-4 space-y-4">
              <div className="flex items-center gap-3">
                <div className="w-9 h-9 bg-[#27343C] border border-[#C17A52]/50 flex items-center justify-center">
                  <svg
                    viewBox="0 0 36 36"
                    className="w-5 h-5 text-[#C17A52]"
                    fill="none"
                    stroke="currentColor"
                    strokeWidth="2.2"
                  >
                    <path d="M4 22L18 9L32 22" strokeLinecap="square" />
                    <path d="M10 22L18 14.5L26 22" strokeLinecap="square" opacity="0.65" />
                  </svg>
                </div>
                <span className="font-display text-lg font-bold text-white tracking-tight">
                  HAYHURST ROOFING
                </span>
              </div>
              <p className="text-sm text-stone-400 leading-relaxed">
                Good roofs. Honest work. Built to last. Trusted roofing repairs, new slate &amp;
                tile roofs, chimney repointing, guttering, fascias, soffits, and rendering across
                Accrington, Burnley, and Lancashire.
              </p>
              <div className="pt-1 flex flex-wrap gap-3 text-xs">
                <a
                  href={BUSINESS_INFO.externalLinks.googleReviews}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center gap-1 text-[#C17A52] hover:underline font-semibold"
                >
                  <span>Google Reviews (5.0★)</span>
                  <ExternalLink className="w-3 h-3" />
                </a>
                <a
                  href={BUSINESS_INFO.externalLinks.myBuilder}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center gap-1 text-[#C17A52] hover:underline font-semibold"
                >
                  <span>MyBuilder</span>
                  <ExternalLink className="w-3 h-3" />
                </a>
                <a
                  href={BUSINESS_INFO.externalLinks.facebook}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center gap-1 text-[#C17A52] hover:underline font-semibold"
                >
                  <span>Facebook</span>
                  <ExternalLink className="w-3 h-3" />
                </a>
              </div>
            </div>

            {/* Col 2: Services Links */}
            <div className="lg:col-span-3 space-y-3">
              <h3 className="font-display text-xs font-bold uppercase tracking-[0.18em] text-white">
                Roofing Services
              </h3>
              <ul className="space-y-2 text-sm">
                {SERVICES.map((service) => (
                  <li key={service.id}>
                    <button
                      type="button"
                      onClick={() => onRequestQuote(service.wizardCategoryId)}
                      className="text-stone-400 hover:text-[#C17A52] transition-colors text-left cursor-pointer"
                    >
                      {service.title}
                    </button>
                  </li>
                ))}
              </ul>
            </div>

            {/* Col 3: Coverage Areas */}
            <div className="lg:col-span-2 space-y-3">
              <h3 className="font-display text-xs font-bold uppercase tracking-[0.18em] text-white">
                Core Areas
              </h3>
              <ul className="space-y-2 text-sm text-stone-400">
                <li>Accrington (BB5)</li>
                <li>Burnley (BB10–BB12)</li>
                <li>Oswaldtwistle &amp; Church</li>
                <li>Great Harwood &amp; Rishton</li>
                <li>Clayton-le-Moors</li>
                <li>Blackburn &amp; Darwen</li>
                <li>Ribble Valley &amp; Rossendale</li>
              </ul>
            </div>

            {/* Col 4: Direct Contact & Postal Note */}
            <div className="lg:col-span-3 space-y-3">
              <h3 className="font-display text-xs font-bold uppercase tracking-[0.18em] text-white">
                Contact Details
              </h3>
              <p className="text-sm">
                <a
                  href={BUSINESS_INFO.phoneHref}
                  className="font-display font-bold text-white hover:text-[#C17A52] block text-base"
                >
                  {BUSINESS_INFO.phoneDisplay}
                </a>
                <a
                  href={BUSINESS_INFO.emailHref}
                  className="text-stone-300 hover:text-[#C17A52] block mt-1"
                >
                  {BUSINESS_INFO.email}
                </a>
              </p>
              <div className="pt-2 border-t border-white/10 text-xs text-stone-400 leading-relaxed">
                <strong className="text-stone-200 block">Postal Address Only:</strong>
                {BUSINESS_INFO.postalAddress.full}
                <span className="block mt-1 text-[11px] text-stone-400">
                  (For postal correspondence only — not a walk-in office or showroom.)
                </span>
              </div>
            </div>
          </div>

          <div className="pt-8 flex flex-col sm:flex-row items-center justify-between gap-4 text-xs text-stone-400">
            <p>© {new Date().getFullYear()} Hayhurst Roofing. All rights reserved.</p>
            <p>Accrington, Burnley &amp; Lancashire Roofing Specialist</p>
          </div>
        </div>
      </footer>

      {/* STICKY MOBILE CALL & QUOTE CONVERSION BAR */}
      <div
        aria-label="Quick Mobile Contact Bar"
        className="fixed bottom-0 left-0 right-0 z-40 md:hidden bg-[#151B1F]/95 backdrop-blur-md border-t border-white/20 p-2.5 grid grid-cols-2 gap-2.5 shadow-2xl"
      >
        <a
          href={BUSINESS_INFO.phoneHref}
          className="whitespace-nowrap py-3 px-2.5 bg-[#27343C] text-white border border-white/20 font-display font-bold text-xs uppercase tracking-wide flex items-center justify-center gap-1.5"
        >
          <Phone className="w-3.5 h-3.5 text-[#C17A52] shrink-0" />
          <span>{BUSINESS_INFO.phoneDisplay}</span>
        </a>
        <button
          type="button"
          onClick={() => onRequestQuote()}
          className="whitespace-nowrap py-3 px-2.5 bg-[#C17A52] text-[#151B1F] font-display font-bold text-xs uppercase tracking-wider flex items-center justify-center gap-1.5 cursor-pointer"
        >
          <span>Free Quote</span>
          <ArrowUpRight className="w-3.5 h-3.5 shrink-0" />
        </button>
      </div>
    </>
  );
};
