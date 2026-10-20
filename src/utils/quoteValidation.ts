export interface QuoteFormState {
  category: string;
  postcode: string;
  propertyType: string;
  description: string;
  urgency: string;
  photoName?: string;
  photoSize?: number;
  photoMimeType?: string;
  photoDataUrl?: string;
  name: string;
  phone: string;
  email: string;
  preferredContact: 'Phone' | 'Email' | 'WhatsApp / Text';
  humanCheckAnswer: string;
}

export interface StepValidationResult {
  valid: boolean;
  errors: Record<string, string>;
}

const UK_POSTCODE_REGEX = /^[A-Z]{1,2}\d[A-Z\d]?\s*\d[A-Z]{2}$/i;
const UK_PARTIAL_POSTCODE_REGEX = /^[A-Z]{1,2}\d[A-Z\d]?(\s*\d[A-Z]{2})?$/i;
const UK_PHONE_REGEX = /^(\+44\s?7\d{3}|\(?07\d{3}\)?|\+44\s?\d{2,4}|\(?0\d{2,4}\)?)\s?\d{3}\s?\d{3,4}$/;
const EMAIL_REGEX = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

const ALLOWED_IMAGE_TYPES = ['image/jpeg', 'image/png', 'image/webp'];
const MAX_IMAGE_SIZE_BYTES = 5 * 1024 * 1024; // 5MB

export function validateStep1(category: string): StepValidationResult {
  const errors: Record<string, string> = {};
  if (!category || !category.trim()) {
    errors.category = 'Please select what you need help with to continue.';
  }
  return {
    valid: Object.keys(errors).length === 0,
    errors,
  };
}

export function validateStep2(input: {
  postcode: string;
  propertyType: string;
  description: string;
  urgency: string;
}): StepValidationResult {
  const errors: Record<string, string> = {};
  const trimmedPostcode = (input.postcode || '').trim();

  if (!trimmedPostcode) {
    errors.postcode = 'Please enter your property postcode (e.g. BB5 5AR).';
  } else if (!UK_PARTIAL_POSTCODE_REGEX.test(trimmedPostcode) && !UK_POSTCODE_REGEX.test(trimmedPostcode)) {
    errors.postcode = 'Please enter a valid UK postcode or postcode prefix (e.g. BB5 5AR or BB10).';
  }

  if (!input.propertyType || !input.propertyType.trim()) {
    errors.propertyType = 'Please select your property type.';
  }

  if (!input.description || input.description.trim().length < 10) {
    errors.description = 'Please provide a brief description of the issue (at least 10 characters).';
  }

  if (!input.urgency || !input.urgency.trim()) {
    errors.urgency = 'Please let us know how urgent the work is.';
  }

  return {
    valid: Object.keys(errors).length === 0,
    errors,
  };
}

export function validateRoofPhoto(file?: {
  name?: string;
  size?: number;
  type?: string;
} | null): StepValidationResult {
  const errors: Record<string, string> = {};
  if (!file || (!file.name && !file.size && !file.type)) {
    // Photo upload is optional
    return { valid: true, errors };
  }

  if (!file.type || !ALLOWED_IMAGE_TYPES.includes(file.type)) {
    errors.photo = 'Please upload a valid JPG, PNG, or WebP photograph.';
  }

  if (typeof file.size === 'number' && file.size > MAX_IMAGE_SIZE_BYTES) {
    errors.photo = 'Photograph must be 5MB or smaller.';
  }

  return {
    valid: Object.keys(errors).length === 0,
    errors,
  };
}

export function validateStep4(input: {
  name: string;
  phone: string;
  email: string;
  preferredContact: string;
  humanCheckAnswer?: string;
  expectedHumanAnswer?: string;
}): StepValidationResult {
  const errors: Record<string, string> = {};

  if (!input.name || input.name.trim().length < 2) {
    errors.name = 'Please enter your full name.';
  }

  const cleanedPhone = (input.phone || '').replace(/[\s()-]/g, '');
  if (!cleanedPhone) {
    errors.phone = 'Please enter a contact phone number.';
  } else if (!UK_PHONE_REGEX.test(input.phone.trim()) && !/^\+?[\d]{10,13}$/.test(cleanedPhone)) {
    errors.phone = 'Please enter a valid UK mobile or landline number (e.g. 07533 137930).';
  }

  if (!input.email || !input.email.trim()) {
    errors.email = 'Please enter your email address.';
  } else if (!EMAIL_REGEX.test(input.email.trim())) {
    errors.email = 'Please enter a valid email address.';
  }

  if (!input.preferredContact) {
    errors.preferredContact = 'Please select your preferred contact method.';
  }

  if (
    input.expectedHumanAnswer !== undefined &&
    (input.humanCheckAnswer || '').trim() !== input.expectedHumanAnswer
  ) {
    errors.humanCheck = 'Please answer the anti-spam security check correctly.';
  }

  return {
    valid: Object.keys(errors).length === 0,
    errors,
  };
}

export function mapServiceToWizardCategory(serviceId: string): string {
  const mapping: Record<string, string> = {
    'roof-repairs': 'roof-leak',
    'new-roofs': 'full-roof',
    'chimney-repairs': 'chimney',
    guttering: 'guttering',
    'slate-tile': 'slates-tiles',
    'fascias-soffits': 'guttering',
    rendering: 'rendering',
    'flat-roofs': 'roof-leak',
  };
  return mapping[serviceId] || 'other';
}

export function filterPortfolioByCategory<T extends { category: string }>(
  projects: T[],
  selectedCategory: string
): T[] {
  if (!selectedCategory || selectedCategory === 'All') {
    return projects;
  }
  return projects.filter((p) => p.category === selectedCategory);
}

export type PageRoute =
  | '/'
  | '/services'
  | '/portfolio'
  | '/reviews'
  | '/areas'
  | '/quote'
  | '/contact';

export function normalizeRoutePath(rawPath: string): PageRoute {
  const cleaned = (rawPath || '/').split('?')[0].split('#')[0].replace(/\/+$/, '') || '/';
  const validRoutes: PageRoute[] = [
    '/',
    '/services',
    '/portfolio',
    '/reviews',
    '/areas',
    '/quote',
    '/contact',
  ];
  if (validRoutes.includes(cleaned as PageRoute)) {
    return cleaned as PageRoute;
  }
  return '/';
}

