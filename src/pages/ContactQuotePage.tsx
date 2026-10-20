import React, { useState } from 'react';
import {
  Phone,
  Mail,
  Clock,
  MapPin,
  AlertCircle,
  ChevronDown,
  CheckCircle2,
  Send,
  ClipboardCheck,
  MessageSquare,
} from 'lucide-react';
import { QuoteWizard } from '../components/QuoteWizard';
import { BUSINESS_INFO, FAQS, SERVICES } from '../data/hayhurstData';
import { PageRoute } from '../utils/quoteValidation';

interface ContactQuotePageProps {
  activeRoute: '/quote' | '/contact';
  onNavigate: (page: PageRoute) => void;
  preselectedCategory?: string;
  preselectedPostcode?: string;
  preselectedUrgency?: string;
}

export const ContactQuotePage: React.FC<ContactQuotePageProps> = ({
  activeRoute,
  onNavigate,
  preselectedCategory,
  preselectedPostcode,
  preselectedUrgency,
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
        setContactErrors(
          data.fieldErrors || { form: data.error || 'Please check your inputs.' }
        );
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
    <div className="pt-20">
      {/* Page Mode Header & Switcher */}
      <section className="bg-[#151B1F] text-white pt-14 pb-10 border-b border-white/10">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex flex-col lg:flex-row lg:items-end justify-between gap-6">
            <div>
              <span className="text-xs font-display font-bold uppercase tracking-[0.2em] text-[#C17A52] block mb-2">
                {activeRoute === '/quote'
                  ? 'PAGE // 4-STEP FREE QUOTE BUILDER'
                  : 'PAGE // DIRECT CONTACT, HOURS & ENQUIRIES'}
              </span>
              <h1 className="font-display text-3xl sm:text-5xl font-bold tracking-tight text-white">
                {activeRoute === '/quote'
                  ? 'Request Your Free Roofing Quote'
                  : 'Speak Directly with Ash'}
              </h1>
            </div>

            {/* Clean Route Mode Switcher */}
            <div className="flex flex-wrap gap-2">
              <button
                type="button"
                onClick={() => onNavigate('/quote')}
                aria-pressed={activeRoute === '/quote'}
                className={`inline-flex items-center gap-2 px-5 py-3 text-xs font-display font-bold uppercase tracking-wider border transition-colors cursor-pointer ${
                  activeRoute === '/quote'
                    ? 'bg-[#C17A52] text-[#151B1F] border-[#C17A52]'
                    : 'bg-[#27343C] text-stone-200 border-white/15 hover:border-white/40'
                }`}
              >
                <ClipboardCheck className="w-4 h-4" />
                <span>4-Step Quote Wizard</span>
              </button>
              <button
                type="button"
                onClick={() => onNavigate('/contact')}
                aria-pressed={activeRoute === '/contact'}
                className={`inline-flex items-center gap-2 px-5 py-3 text-xs font-display font-bold uppercase tracking-wider border transition-colors cursor-pointer ${
                  activeRoute === '/contact'
                    ? 'bg-[#C17A52] text-[#151B1F] border-[#C17A52]'
                    : 'bg-[#27343C] text-stone-200 border-white/15 hover:border-white/40'
                }`}
              >
                <MessageSquare className="w-4 h-4" />
                <span>Direct Contact &amp; Hours</span>
              </button>
            </div>
          </div>
        </div>
      </section>

      {/* If /quote is active, show the 4-Step Quote Wizard prominently at the top */}
      {activeRoute === '/quote' && (
        <QuoteWizard
          preselectedCategory={preselectedCategory}
          preselectedPostcode={preselectedPostcode}
          preselectedUrgency={preselectedUrgency}
        />
      )}

      {/* Direct Contact Details, Operating Hours, Postal Correspondence Notice & Quick Message Form */}
      <section
        id="contact"
        className="py-20 bg-[#F6F4EF] text-[#151B1F] border-b border-[#151B1F]/15"
      >
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-12">
            {/* Left Column: Direct Contact Cards, Hours & Explicit Postal Notice */}
            <div className="lg:col-span-6 space-y-8">
              <div>
                <span className="text-xs font-display font-bold uppercase tracking-[0.2em] text-[#C17A52] block mb-3">
                  DIRECT CONTACT &amp; OPERATING HOURS
                </span>
                <h2 className="font-display text-3xl sm:text-4xl font-bold tracking-tight text-[#151B1F] leading-[1.1]">
                  Get in Touch with Hayhurst Roofing.
                </h2>
                <p className="text-base text-[#27343C] mt-3 leading-relaxed">
                  Whether you have a single loose slate after windy weather or want an honest quote
                  on a chimney or full re-roof, contact Ash directly by phone, email, or the
                  message form.
                </p>
              </div>

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
                  Have a general question or want to leave your number for a callback? Fill in your
                  details below.
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
                        {contactSubmitting
                          ? 'Sending Enquiry...'
                          : 'Send Message to Hayhurst Roofing'}
                      </span>
                    </button>
                  </form>
                )}
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* If /contact is active, also render the 4-Step Quote Wizard below so users can switch or scroll to it */}
      {activeRoute === '/contact' && (
        <QuoteWizard
          preselectedCategory={preselectedCategory}
          preselectedPostcode={preselectedPostcode}
          preselectedUrgency={preselectedUrgency}
        />
      )}
    </div>
  );
};
