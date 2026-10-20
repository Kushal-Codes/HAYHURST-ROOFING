import React, { useState, useEffect } from 'react';
import {
  CheckCircle2,
  ArrowRight,
  ArrowLeft,
  Upload,
  Camera,
  Phone,
  Mail,
  AlertCircle,
  ShieldCheck,
  Trash2,
} from 'lucide-react';
import { WIZARD_CATEGORIES, BUSINESS_INFO } from '../data/hayhurstData';
import {
  validateStep1,
  validateStep2,
  validateRoofPhoto,
  validateStep4,
} from '../utils/quoteValidation';

interface QuoteWizardProps {
  preselectedCategory?: string;
  preselectedPostcode?: string;
  preselectedUrgency?: string;
}

interface SubmissionSuccess {
  reference: string;
  createdAt: string;
  targetInbox: string;
  emailForwardingConfigured: boolean;
  deliveryNotice: string;
  summary: {
    category: string;
    postcode: string;
    propertyType: string;
    urgency: string;
    hasPhoto: boolean;
    photoName: string | null;
    name: string;
    phone: string;
    email: string;
    preferredContact: string;
  };
}

const PROPERTY_TYPES = [
  'Terraced House',
  'Semi-Detached House',
  'Detached House',
  'Bungalow',
  'Cottage / Stone Property',
  'Commercial Property',
  'Other',
];

const URGENCY_OPTIONS = [
  {
    value: 'Urgent — Active leak or storm damage',
    label: 'Urgent — Active leak or storm damage',
    sub: 'Water coming in or slates loose after bad weather',
  },
  {
    value: 'Soon — Within the next 1–2 weeks',
    label: 'Soon — Within the next 1–2 weeks',
    sub: 'Needs repairing promptly on a dry day',
  },
  {
    value: 'Flexible — Planning ahead or general quote',
    label: 'Flexible — Planning ahead or general quote',
    sub: 'Routine maintenance, chimney repointing, or new roof quote',
  },
];

export const QuoteWizard: React.FC<QuoteWizardProps> = ({
  preselectedCategory,
  preselectedPostcode,
  preselectedUrgency,
}) => {
  const [step, setStep] = useState<number>(1);
  const [category, setCategory] = useState<string>(preselectedCategory || 'roof-leak');
  const [postcode, setPostcode] = useState<string>(preselectedPostcode || '');
  const [propertyType, setPropertyType] = useState<string>('Terraced House');
  const [description, setDescription] = useState<string>('');
  const [urgency, setUrgency] = useState<string>(
    preselectedUrgency || 'Soon — Within the next 1–2 weeks'
  );

  const [photoFile, setPhotoFile] = useState<{
    name: string;
    size: number;
    type: string;
    previewUrl: string;
  } | null>(null);

  const [name, setName] = useState<string>('');
  const [phone, setPhone] = useState<string>('');
  const [email, setEmail] = useState<string>('');
  const [preferredContact, setPreferredContact] = useState<'Phone' | 'Email' | 'WhatsApp / Text'>(
    'Phone'
  );
  const [humanCheckAnswer, setHumanCheckAnswer] = useState<string>('');
  const [honeypot, setHoneypot] = useState<string>('');

  const [errors, setErrors] = useState<Record<string, string>>({});
  const [submitting, setSubmitting] = useState<boolean>(false);
  const [submissionResult, setSubmissionResult] = useState<SubmissionSuccess | null>(null);

  useEffect(() => {
    if (preselectedCategory) {
      setCategory(preselectedCategory);
      setSubmissionResult(null);
    }
  }, [preselectedCategory]);

  useEffect(() => {
    if (preselectedPostcode) {
      setPostcode(preselectedPostcode);
      setStep(2);
      setSubmissionResult(null);
    }
  }, [preselectedPostcode]);

  useEffect(() => {
    if (preselectedUrgency) {
      setUrgency(preselectedUrgency);
      setCategory('roof-leak');
      setStep(2);
      setSubmissionResult(null);
    }
  }, [preselectedUrgency]);

  const selectedCategoryObj =
    WIZARD_CATEGORIES.find((c) => c.id === category) || WIZARD_CATEGORIES[0];

  const handleNextFromStep1 = () => {
    const res = validateStep1(category);
    if (!res.valid) {
      setErrors(res.errors);
      return;
    }
    setErrors({});
    setStep(2);
  };

  const handleNextFromStep2 = () => {
    const res = validateStep2({ postcode, propertyType, description, urgency });
    if (!res.valid) {
      setErrors(res.errors);
      return;
    }
    setErrors({});
    setStep(3);
  };

  const handlePhotoChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;

    const validation = validateRoofPhoto({
      name: file.name,
      size: file.size,
      type: file.type,
    });

    if (!validation.valid) {
      setErrors(validation.errors);
      return;
    }

    setErrors({});
    const reader = new FileReader();
    reader.onload = () => {
      setPhotoFile({
        name: file.name,
        size: file.size,
        type: file.type,
        previewUrl: typeof reader.result === 'string' ? reader.result : '',
      });
    };
    reader.readAsDataURL(file);
  };

  const handleNextFromStep3 = () => {
    if (photoFile) {
      const validation = validateRoofPhoto(photoFile);
      if (!validation.valid) {
        setErrors(validation.errors);
        return;
      }
    }
    setErrors({});
    setStep(4);
  };

  const handleSubmitQuote = async (e: React.FormEvent) => {
    e.preventDefault();
    const s4 = validateStep4({
      name,
      phone,
      email,
      preferredContact,
      humanCheckAnswer,
      expectedHumanAnswer: '7',
    });

    if (!s4.valid) {
      setErrors(s4.errors);
      return;
    }

    setErrors({});
    setSubmitting(true);

    try {
      const response = await fetch('/api/quote', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          category: selectedCategoryObj.label,
          postcode,
          propertyType,
          description,
          urgency,
          photo: photoFile
            ? {
                name: photoFile.name,
                size: photoFile.size,
                type: photoFile.type,
              }
            : null,
          name,
          phone,
          email,
          preferredContact,
          humanCheckAnswer,
          expectedHumanAnswer: '7',
          honeypot,
        }),
      });

      const data = await response.json();
      if (!response.ok || !data.ok) {
        setErrors(data.fieldErrors || { form: data.error || 'Please check your inputs.' });
        setSubmitting(false);
        return;
      }

      setSubmissionResult(data);
    } catch {
      setErrors({
        form: 'Unable to reach the server right now. Please call Ash directly on 07533 137930.',
      });
    } finally {
      setSubmitting(false);
    }
  };

  const buildMailtoLink = () => {
    if (!submissionResult) return BUSINESS_INFO.emailHref;
    const subject = encodeURIComponent(
      `Roofing Quote Request [${submissionResult.reference}] - ${submissionResult.summary.category} (${submissionResult.summary.postcode})`
    );
    const body = encodeURIComponent(
      `Hi Ash,\n\nI have just completed a quote request (${submissionResult.reference}):\n\n` +
        `• Service Required: ${submissionResult.summary.category}\n` +
        `• Postcode: ${submissionResult.summary.postcode}\n` +
        `• Property Type: ${submissionResult.summary.propertyType}\n` +
        `• Urgency: ${submissionResult.summary.urgency}\n` +
        `• Details: ${description}\n` +
        `• Name: ${submissionResult.summary.name}\n` +
        `• Phone: ${submissionResult.summary.phone}\n` +
        `• Preferred Contact: ${submissionResult.summary.preferredContact}\n\n` +
        `Many thanks,\n${submissionResult.summary.name}`
    );
    return `mailto:${BUSINESS_INFO.email}?subject=${subject}&body=${body}`;
  };

  return (
    <section
      id="quote-wizard"
      className="py-20 lg:py-28 bg-[#151B1F] text-white border-b border-white/10"
    >
      <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <div className="text-center max-w-3xl mx-auto mb-12">
          <span className="text-xs font-display font-bold uppercase tracking-[0.2em] text-[#C17A52] block mb-3">
            06 / REQUEST YOUR FREE, NO-OBLIGATION QUOTE
          </span>
          <h2 className="font-display text-3xl sm:text-4xl lg:text-5xl font-bold tracking-tight text-white leading-[1.1]">
            Tell Ash About Your Roof in 60 Seconds.
          </h2>
          <p className="text-base text-stone-300 mt-3 leading-relaxed">
            No call centres or pushy salespeople. Your enquiry is prepared directly for Ash at
            Hayhurst Roofing, or you can call <strong className="text-white">07533 137930</strong>{' '}
            immediately.
          </p>
        </div>

        {/* Wizard Container */}
        <div className="bg-[#27343C]/60 border border-white/15 shadow-2xl overflow-hidden">
          {/* Progress Header Bar */}
          {!submissionResult && (
            <div className="bg-[#151B1F] border-b border-white/15 px-6 py-4">
              <div className="grid grid-cols-4 gap-2 sm:gap-4">
                {[
                  { num: 1, label: '1. Roof Issue' },
                  { num: 2, label: '2. Job Details' },
                  { num: 3, label: '3. Roof Photo' },
                  { num: 4, label: '4. Your Details' },
                ].map((item) => {
                  const isCurrent = step === item.num;
                  const isCompleted = step > item.num;
                  return (
                    <div
                      key={item.num}
                      className={`py-2 px-3 border-b-2 transition-colors ${
                        isCurrent
                          ? 'border-[#C17A52] text-white'
                          : isCompleted
                          ? 'border-emerald-500 text-stone-200'
                          : 'border-white/15 text-stone-400'
                      }`}
                    >
                      <span className="text-xs sm:text-sm font-display font-bold block truncate">
                        {item.label}
                      </span>
                    </div>
                  );
                })}
              </div>
            </div>
          )}

          {/* Wizard Content Body */}
          <div className="p-6 sm:p-10">
            {submissionResult ? (
              /* CONFIRMATION STATE */
              <div
                data-testid="quote-confirmation"
                className="space-y-6 bg-[#151B1F] border border-[#C17A52] p-6 sm:p-8"
              >
                <div className="flex flex-wrap items-center justify-between gap-4 pb-6 border-b border-white/15">
                  <div className="flex items-center gap-3.5">
                    <div className="w-12 h-12 bg-[#C17A52] text-[#151B1F] flex items-center justify-center shrink-0">
                      <CheckCircle2 className="w-7 h-7" />
                    </div>
                    <div>
                      <span className="text-xs font-mono uppercase tracking-widest text-[#C17A52]">
                        ENQUIRY REFERENCE // {submissionResult.reference}
                      </span>
                      <h3 className="font-display text-2xl font-bold text-white">
                        Quote Request Ready for Ash
                      </h3>
                    </div>
                  </div>

                  <span className="px-3 py-1 bg-[#27343C] border border-white/15 text-xs font-mono text-stone-200">
                    Target Inbox: {submissionResult.targetInbox}
                  </span>
                </div>

                {/* Transparent Delivery Notice */}
                <div className="p-4 bg-[#27343C]/80 border-l-4 border-l-[#C17A52] text-sm text-stone-200 leading-relaxed">
                  {submissionResult.deliveryNotice}
                </div>

                {/* Summary Grid */}
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 text-sm bg-[#27343C]/40 p-5 border border-white/10">
                  <div>
                    <span className="text-xs font-mono uppercase text-stone-400 block">
                      Service Category
                    </span>
                    <span className="font-display font-bold text-white">
                      {submissionResult.summary.category}
                    </span>
                  </div>
                  <div>
                    <span className="text-xs font-mono uppercase text-stone-400 block">
                      Postcode &amp; Property
                    </span>
                    <span className="font-display font-bold text-white">
                      {submissionResult.summary.postcode} · {submissionResult.summary.propertyType}
                    </span>
                  </div>
                  <div>
                    <span className="text-xs font-mono uppercase text-stone-400 block">
                      Urgency
                    </span>
                    <span className="font-display font-bold text-[#C17A52]">
                      {submissionResult.summary.urgency}
                    </span>
                  </div>
                  <div>
                    <span className="text-xs font-mono uppercase text-stone-400 block">
                      Contact Details
                    </span>
                    <span className="font-display font-bold text-white">
                      {submissionResult.summary.name} ({submissionResult.summary.phone})
                    </span>
                  </div>
                </div>

                {/* Direct Action Buttons */}
                <div className="pt-2 flex flex-col sm:flex-row items-stretch sm:items-center gap-3.5">
                  <a
                    href={buildMailtoLink()}
                    className="flex-1 py-4 px-5 bg-[#C17A52] hover:bg-[#d1875d] text-[#151B1F] font-display font-bold text-xs sm:text-sm uppercase tracking-wider flex items-center justify-center gap-2 text-center"
                  >
                    <Mail className="w-4 h-4" />
                    <span>Open in Email App ({BUSINESS_INFO.email})</span>
                  </a>

                  <a
                    href={BUSINESS_INFO.phoneHref}
                    className="flex-1 py-4 px-5 bg-[#27343C] hover:bg-[#32434d] text-white border border-white/20 font-display font-bold text-xs sm:text-sm uppercase tracking-wider flex items-center justify-center gap-2 text-center"
                  >
                    <Phone className="w-4 h-4 text-[#C17A52]" />
                    <span>Call Ash Now: {BUSINESS_INFO.phoneDisplay}</span>
                  </a>
                </div>

                <div className="pt-4 border-t border-white/10 flex justify-between items-center text-xs text-stone-400">
                  <span>Thank you for contacting Hayhurst Roofing, Accrington.</span>
                  <button
                    type="button"
                    onClick={() => {
                      setSubmissionResult(null);
                      setStep(1);
                      setDescription('');
                      setHumanCheckAnswer('');
                    }}
                    className="text-[#C17A52] hover:underline font-semibold cursor-pointer"
                  >
                    Start Another Quote Request
                  </button>
                </div>
              </div>
            ) : (
              /* STEPS 1 TO 4 */
              <div>
                {/* STEP 1: SELECT CATEGORY */}
                {step === 1 && (
                  <div className="space-y-6">
                    <div>
                      <span className="text-xs font-mono uppercase text-[#C17A52]">
                        STEP 01 OF 04
                      </span>
                      <h3 className="font-display text-2xl font-bold text-white mt-1">
                        What do you need help with?
                      </h3>
                      <p className="text-sm text-stone-300 mt-1">
                        Select the option that best matches your roofing or exterior work.
                      </p>
                    </div>

                    <div
                      className="grid grid-cols-1 sm:grid-cols-2 gap-3.5"
                      role="radiogroup"
                      aria-label="What do you need help with?"
                    >
                      {WIZARD_CATEGORIES.map((item) => {
                        const isSelected = category === item.id;
                        return (
                          <button
                            key={item.id}
                            type="button"
                            role="radio"
                            aria-checked={isSelected}
                            onClick={() => {
                              setCategory(item.id);
                              setErrors({});
                            }}
                            className={`p-4 sm:p-5 text-left border transition-all flex items-start justify-between gap-3 cursor-pointer ${
                              isSelected
                                ? 'bg-[#151B1F] border-[#C17A52] text-white shadow-md'
                                : 'bg-[#151B1F]/50 border-white/15 text-stone-200 hover:border-white/40'
                            }`}
                          >
                            <div>
                              <span className="font-display font-bold text-base block text-white">
                                {item.label}
                              </span>
                              <span className="text-xs text-stone-300 mt-1 block">
                                {item.subtitle}
                              </span>
                            </div>
                            <div
                              className={`w-5 h-5 border flex items-center justify-center shrink-0 mt-0.5 ${
                                isSelected
                                  ? 'border-[#C17A52] bg-[#C17A52] text-[#151B1F]'
                                  : 'border-white/30'
                              }`}
                            >
                              {isSelected && <CheckCircle2 className="w-3.5 h-3.5" />}
                            </div>
                          </button>
                        );
                      })}
                    </div>

                    {errors.category && (
                      <p role="alert" className="text-xs text-amber-400 flex items-center gap-1.5">
                        <AlertCircle className="w-4 h-4" />
                        <span>{errors.category}</span>
                      </p>
                    )}

                    <div className="pt-4 border-t border-white/15 flex items-center justify-between gap-4">
                      <span className="text-xs text-stone-300">
                        Selected: <strong className="text-white">{selectedCategoryObj.label}</strong>
                      </span>
                      <button
                        type="button"
                        onClick={handleNextFromStep1}
                        className="px-7 py-3.5 bg-[#C17A52] hover:bg-[#d1875d] text-[#151B1F] font-display font-bold text-xs sm:text-sm uppercase tracking-wider inline-flex items-center gap-2 cursor-pointer"
                      >
                        <span>Continue to Job Details</span>
                        <ArrowRight className="w-4 h-4" />
                      </button>
                    </div>
                  </div>
                )}

                {/* STEP 2: JOB DETAILS */}
                {step === 2 && (
                  <div className="space-y-6">
                    <div>
                      <span className="text-xs font-mono uppercase text-[#C17A52]">
                        STEP 02 OF 04 · {selectedCategoryObj.label.toUpperCase()}
                      </span>
                      <h3 className="font-display text-2xl font-bold text-white mt-1">
                        Tell us about the job &amp; property
                      </h3>
                    </div>

                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
                      <div>
                        <label
                          htmlFor="wizard-postcode"
                          className="block text-xs font-display font-bold uppercase tracking-wider text-stone-200 mb-2"
                        >
                          Property Postcode *
                        </label>
                        <input
                          id="wizard-postcode"
                          type="text"
                          value={postcode}
                          onChange={(e) => setPostcode(e.target.value)}
                          placeholder="e.g. BB5 5AR or BB10"
                          className="w-full px-4 py-3 bg-[#151B1F] border border-white/20 text-white placeholder-stone-400 text-sm focus:outline-none focus:border-[#C17A52]"
                        />
                        {errors.postcode && (
                          <p role="alert" className="text-xs text-amber-400 mt-1.5">
                            {errors.postcode}
                          </p>
                        )}
                      </div>

                      <div>
                        <label
                          htmlFor="wizard-property-type"
                          className="block text-xs font-display font-bold uppercase tracking-wider text-stone-200 mb-2"
                        >
                          Property Type *
                        </label>
                        <select
                          id="wizard-property-type"
                          value={propertyType}
                          onChange={(e) => setPropertyType(e.target.value)}
                          className="w-full px-4 py-3 bg-[#151B1F] border border-white/20 text-white text-sm focus:outline-none focus:border-[#C17A52]"
                        >
                          {PROPERTY_TYPES.map((type) => (
                            <option key={type} value={type}>
                              {type}
                            </option>
                          ))}
                        </select>
                        {errors.propertyType && (
                          <p role="alert" className="text-xs text-amber-400 mt-1.5">
                            {errors.propertyType}
                          </p>
                        )}
                      </div>
                    </div>

                    <div>
                      <label
                        htmlFor="wizard-description"
                        className="block text-xs font-display font-bold uppercase tracking-wider text-stone-200 mb-2"
                      >
                        Brief Description of the Roof Issue or Work Needed *
                      </label>
                      <textarea
                        id="wizard-description"
                        rows={3}
                        value={description}
                        onChange={(e) => setDescription(e.target.value)}
                        placeholder="e.g. Notice a slipped slate near the chimney stack and damp patch on bedroom ceiling after heavy rain..."
                        className="w-full px-4 py-3 bg-[#151B1F] border border-white/20 text-white placeholder-stone-400 text-sm focus:outline-none focus:border-[#C17A52]"
                      />
                      {errors.description && (
                        <p role="alert" className="text-xs text-amber-400 mt-1.5">
                          {errors.description}
                        </p>
                      )}
                    </div>

                    <div>
                      <span className="block text-xs font-display font-bold uppercase tracking-wider text-stone-200 mb-2">
                        How Urgent Is the Work? *
                      </span>
                      <div className="grid grid-cols-1 md:grid-cols-3 gap-3">
                        {URGENCY_OPTIONS.map((opt) => {
                          const isSelected = urgency === opt.value;
                          return (
                            <button
                              key={opt.value}
                              type="button"
                              onClick={() => setUrgency(opt.value)}
                              aria-pressed={isSelected}
                              className={`p-3.5 text-left border transition-colors cursor-pointer ${
                                isSelected
                                  ? 'bg-[#151B1F] border-[#C17A52] text-white'
                                  : 'bg-[#151B1F]/50 border-white/15 text-stone-300 hover:border-white/35'
                              }`}
                            >
                              <span className="font-display font-bold text-xs sm:text-sm block text-white">
                                {opt.label}
                              </span>
                              <span className="text-[11px] text-stone-300 mt-1 block">
                                {opt.sub}
                              </span>
                            </button>
                          );
                        })}
                      </div>
                      {errors.urgency && (
                        <p role="alert" className="text-xs text-amber-400 mt-1.5">
                          {errors.urgency}
                        </p>
                      )}
                    </div>

                    <div className="pt-4 border-t border-white/15 flex items-center justify-between gap-4">
                      <button
                        type="button"
                        onClick={() => setStep(1)}
                        className="px-5 py-3 bg-[#151B1F] text-stone-200 hover:text-white border border-white/15 font-display font-semibold text-xs uppercase tracking-wider inline-flex items-center gap-2 cursor-pointer"
                      >
                        <ArrowLeft className="w-4 h-4" />
                        <span>Back</span>
                      </button>

                      <button
                        type="button"
                        onClick={handleNextFromStep2}
                        className="px-7 py-3.5 bg-[#C17A52] hover:bg-[#d1875d] text-[#151B1F] font-display font-bold text-xs sm:text-sm uppercase tracking-wider inline-flex items-center gap-2 cursor-pointer"
                      >
                        <span>Continue to Photo Option</span>
                        <ArrowRight className="w-4 h-4" />
                      </button>
                    </div>
                  </div>
                )}

                {/* STEP 3: OPTIONAL PHOTO UPLOAD */}
                {step === 3 && (
                  <div className="space-y-6">
                    <div>
                      <span className="text-xs font-mono uppercase text-[#C17A52]">
                        STEP 03 OF 04 · OPTIONAL PHOTOGRAPH
                      </span>
                      <h3 className="font-display text-2xl font-bold text-white mt-1">
                        Have a Photo of the Roof or Problem Area? (Optional)
                      </h3>
                      <p className="text-sm text-stone-300 mt-1">
                        If you have snapped a picture from the ground, garden, or loft, attach it
                        below. Don&rsquo;t worry if not—Ash always climbs up and takes clear
                        photographs during his inspection.
                      </p>
                    </div>

                    <div className="bg-[#151B1F] border-2 border-dashed border-white/20 p-6 sm:p-8 text-center">
                      {photoFile ? (
                        <div className="space-y-4">
                          {photoFile.previewUrl && (
                            <img
                              src={photoFile.previewUrl}
                              alt="Uploaded roof preview"
                              className="max-h-48 mx-auto object-contain border border-white/15"
                            />
                          )}
                          <div className="flex items-center justify-center gap-3 text-sm text-white">
                            <Camera className="w-4 h-4 text-[#C17A52]" />
                            <span className="font-medium">{photoFile.name}</span>
                            <span className="text-xs text-stone-400">
                              ({Math.round(photoFile.size / 1024)} KB)
                            </span>
                            <button
                              type="button"
                              onClick={() => setPhotoFile(null)}
                              aria-label="Remove uploaded photograph"
                              className="p-1.5 text-amber-400 hover:text-amber-300 cursor-pointer"
                            >
                              <Trash2 className="w-4 h-4" />
                            </button>
                          </div>
                        </div>
                      ) : (
                        <div className="space-y-3">
                          <Upload className="w-8 h-8 text-[#C17A52] mx-auto" />
                          <div>
                            <label
                              htmlFor="wizard-photo-upload"
                              className="inline-block px-5 py-2.5 bg-[#27343C] hover:bg-[#32434d] text-white border border-white/20 font-display font-semibold text-xs uppercase tracking-wider cursor-pointer"
                            >
                              Choose Roof Photo (JPG, PNG, WebP · Max 5MB)
                            </label>
                            <input
                              id="wizard-photo-upload"
                              type="file"
                              accept="image/jpeg,image/png,image/webp"
                              onChange={handlePhotoChange}
                              className="sr-only"
                            />
                          </div>
                          <p className="text-xs text-stone-400">
                            Never climb onto a ladder or roof to take a photo—ground-level shots are
                            plenty.
                          </p>
                        </div>
                      )}
                    </div>

                    {errors.photo && (
                      <p role="alert" className="text-xs text-amber-400 flex items-center gap-1.5">
                        <AlertCircle className="w-4 h-4" />
                        <span>{errors.photo}</span>
                      </p>
                    )}

                    <div className="pt-4 border-t border-white/15 flex flex-wrap items-center justify-between gap-4">
                      <button
                        type="button"
                        onClick={() => setStep(2)}
                        className="px-5 py-3 bg-[#151B1F] text-stone-200 hover:text-white border border-white/15 font-display font-semibold text-xs uppercase tracking-wider inline-flex items-center gap-2 cursor-pointer"
                      >
                        <ArrowLeft className="w-4 h-4" />
                        <span>Back</span>
                      </button>

                      <button
                        type="button"
                        onClick={handleNextFromStep3}
                        className="px-7 py-3.5 bg-[#C17A52] hover:bg-[#d1875d] text-[#151B1F] font-display font-bold text-xs sm:text-sm uppercase tracking-wider inline-flex items-center gap-2 cursor-pointer"
                      >
                        <span>
                          {photoFile ? 'Continue with Photo' : 'Skip Photo & Continue'}
                        </span>
                        <ArrowRight className="w-4 h-4" />
                      </button>
                    </div>
                  </div>
                )}

                {/* STEP 4: CONTACT DETAILS */}
                {step === 4 && (
                  <form onSubmit={handleSubmitQuote} className="space-y-6" noValidate>
                    <div>
                      <span className="text-xs font-mono uppercase text-[#C17A52]">
                        STEP 04 OF 04 · YOUR CONTACT DETAILS
                      </span>
                      <h3 className="font-display text-2xl font-bold text-white mt-1">
                        Where should Ash send your quote?
                      </h3>
                    </div>

                    {/* Honeypot field hidden from screen readers and visual users */}
                    <div className="hidden" aria-hidden="true">
                      <label htmlFor="wizard-company-website">Company Website</label>
                      <input
                        id="wizard-company-website"
                        type="text"
                        tabIndex={-1}
                        autoComplete="off"
                        value={honeypot}
                        onChange={(e) => setHoneypot(e.target.value)}
                      />
                    </div>

                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
                      <div>
                        <label
                          htmlFor="wizard-name"
                          className="block text-xs font-display font-bold uppercase tracking-wider text-stone-200 mb-2"
                        >
                          Your Full Name *
                        </label>
                        <input
                          id="wizard-name"
                          type="text"
                          value={name}
                          onChange={(e) => setName(e.target.value)}
                          placeholder="e.g. Sarah Jenkins"
                          className="w-full px-4 py-3 bg-[#151B1F] border border-white/20 text-white placeholder-stone-400 text-sm focus:outline-none focus:border-[#C17A52]"
                        />
                        {errors.name && (
                          <p role="alert" className="text-xs text-amber-400 mt-1.5">
                            {errors.name}
                          </p>
                        )}
                      </div>

                      <div>
                        <label
                          htmlFor="wizard-phone"
                          className="block text-xs font-display font-bold uppercase tracking-wider text-stone-200 mb-2"
                        >
                          Phone Number *
                        </label>
                        <input
                          id="wizard-phone"
                          type="tel"
                          value={phone}
                          onChange={(e) => setPhone(e.target.value)}
                          placeholder="e.g. 07533 137930"
                          className="w-full px-4 py-3 bg-[#151B1F] border border-white/20 text-white placeholder-stone-400 text-sm focus:outline-none focus:border-[#C17A52]"
                        />
                        {errors.phone && (
                          <p role="alert" className="text-xs text-amber-400 mt-1.5">
                            {errors.phone}
                          </p>
                        )}
                      </div>
                    </div>

                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
                      <div>
                        <label
                          htmlFor="wizard-email"
                          className="block text-xs font-display font-bold uppercase tracking-wider text-stone-200 mb-2"
                        >
                          Email Address *
                        </label>
                        <input
                          id="wizard-email"
                          type="email"
                          value={email}
                          onChange={(e) => setEmail(e.target.value)}
                          placeholder="you@example.co.uk"
                          className="w-full px-4 py-3 bg-[#151B1F] border border-white/20 text-white placeholder-stone-400 text-sm focus:outline-none focus:border-[#C17A52]"
                        />
                        {errors.email && (
                          <p role="alert" className="text-xs text-amber-400 mt-1.5">
                            {errors.email}
                          </p>
                        )}
                      </div>

                      <div>
                        <label
                          htmlFor="wizard-preferred-contact"
                          className="block text-xs font-display font-bold uppercase tracking-wider text-stone-200 mb-2"
                        >
                          Preferred Contact Method *
                        </label>
                        <select
                          id="wizard-preferred-contact"
                          value={preferredContact}
                          onChange={(e) =>
                            setPreferredContact(
                              e.target.value as 'Phone' | 'Email' | 'WhatsApp / Text'
                            )
                          }
                          className="w-full px-4 py-3 bg-[#151B1F] border border-white/20 text-white text-sm focus:outline-none focus:border-[#C17A52]"
                        >
                          <option value="Phone">Phone Call</option>
                          <option value="WhatsApp / Text">Text / Mobile Message</option>
                          <option value="Email">Email</option>
                        </select>
                      </div>
                    </div>

                    {/* Simple Human Security Verification */}
                    <div className="bg-[#151B1F] p-4 border border-white/15 flex flex-col sm:flex-row sm:items-center justify-between gap-4">
                      <div>
                        <label
                          htmlFor="wizard-human-check"
                          className="text-xs font-display font-bold uppercase tracking-wider text-[#C17A52] block"
                        >
                          Quick Spam Protection Check *
                        </label>
                        <span className="text-xs text-stone-300">
                          To keep spam bots away from Ash&rsquo;s inbox, what is{' '}
                          <strong className="text-white">4 + 3</strong>?
                        </span>
                      </div>
                      <div className="sm:w-36">
                        <input
                          id="wizard-human-check"
                          type="text"
                          inputMode="numeric"
                          value={humanCheckAnswer}
                          onChange={(e) => setHumanCheckAnswer(e.target.value)}
                          placeholder="Answer (7)"
                          className="w-full px-3.5 py-2.5 bg-[#27343C] border border-white/25 text-white text-sm focus:outline-none focus:border-[#C17A52]"
                        />
                      </div>
                    </div>
                    {errors.humanCheck && (
                      <p role="alert" className="text-xs text-amber-400">
                        {errors.humanCheck}
                      </p>
                    )}

                    {errors.form && (
                      <p role="alert" className="text-xs text-amber-400">
                        {errors.form}
                      </p>
                    )}

                    <div className="pt-4 border-t border-white/15 flex flex-wrap items-center justify-between gap-4">
                      <button
                        type="button"
                        onClick={() => setStep(3)}
                        className="px-5 py-3 bg-[#151B1F] text-stone-200 hover:text-white border border-white/15 font-display font-semibold text-xs uppercase tracking-wider inline-flex items-center gap-2 cursor-pointer"
                      >
                        <ArrowLeft className="w-4 h-4" />
                        <span>Back</span>
                      </button>

                      <button
                        type="submit"
                        disabled={submitting}
                        className="px-8 py-4 bg-[#C17A52] hover:bg-[#d1875d] disabled:opacity-60 text-[#151B1F] font-display font-bold text-xs sm:text-sm uppercase tracking-wider inline-flex items-center gap-2 cursor-pointer shadow-lg"
                      >
                        <ShieldCheck className="w-4 h-4" />
                        <span>
                          {submitting ? 'Validating Quote Request...' : 'Submit Free Quote Request'}
                        </span>
                      </button>
                    </div>
                  </form>
                )}
              </div>
            )}
          </div>
        </div>
      </div>
    </section>
  );
};
