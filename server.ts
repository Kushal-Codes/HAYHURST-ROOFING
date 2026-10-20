import express from 'express';
import fs from 'node:fs';
import path from 'node:path';
import { fileURLToPath } from 'node:url';
import {
  validateStep1,
  validateStep2,
  validateRoofPhoto,
  validateStep4,
} from './src/utils/quoteValidation.ts';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const app = express();
const PORT = Number(process.env.PORT) || 3000;

app.use(express.json({ limit: '8mb' }));

interface StoredEnquiry {
  reference: string;
  type: 'quote' | 'contact';
  createdAt: string;
  category?: string;
  postcode?: string;
  propertyType?: string;
  description: string;
  urgency?: string;
  hasPhoto: boolean;
  photoMeta?: {
    name: string;
    size: number;
    type: string;
  } | null;
  name: string;
  phone: string;
  email: string;
  preferredContact: string;
  deliveryMode: 'webhook_forwarded' | 'logged_awaiting_smtp_setup';
}

const DATA_DIR = path.join(__dirname, '.data');
const ENQUIRIES_FILE = path.join(DATA_DIR, 'enquiries.json');

function loadEnquiries(): StoredEnquiry[] {
  try {
    if (fs.existsSync(ENQUIRIES_FILE)) {
      const raw = fs.readFileSync(ENQUIRIES_FILE, 'utf-8');
      return JSON.parse(raw);
    }
  } catch {
    // Fallback to empty array if file does not exist or is invalid
  }
  return [];
}

function saveEnquiry(entry: StoredEnquiry): void {
  try {
    fs.mkdirSync(DATA_DIR, { recursive: true });
    const current = loadEnquiries();
    current.unshift(entry);
    fs.writeFileSync(ENQUIRIES_FILE, JSON.stringify(current.slice(0, 100), null, 2), 'utf-8');
  } catch {
    // Non-fatal in read-only environments
  }
}

const memoryEnquiries: StoredEnquiry[] = loadEnquiries();

app.get('/api/status', (_req, res) => {
  const emailConfigured = Boolean(process.env.EMAIL_WEBHOOK_URL || process.env.SMTP_HOST);
  res.json({
    ok: true,
    businessInbox: 'ahayhurst68@gmail.com',
    emailForwardingConfigured: emailConfigured,
    enquiriesCount: memoryEnquiries.length,
  });
});

app.post('/api/quote', async (req, res) => {
  try {
    const {
      category,
      postcode,
      propertyType,
      description,
      urgency,
      photo,
      name,
      phone,
      email,
      preferredContact,
      humanCheckAnswer,
      expectedHumanAnswer,
      honeypot,
    } = req.body || {};

    // Anti-spam honeypot check
    if (honeypot) {
      res.status(400).json({ ok: false, error: 'Spam submission blocked.' });
      return;
    }

    const s1 = validateStep1(category);
    const s2 = validateStep2({ postcode, propertyType, description, urgency });
    const s3 = validateRoofPhoto(photo);
    const s4 = validateStep4({
      name,
      phone,
      email,
      preferredContact,
      humanCheckAnswer: String(humanCheckAnswer ?? ''),
      expectedHumanAnswer: String(expectedHumanAnswer ?? '7'),
    });

    const allErrors = {
      ...s1.errors,
      ...s2.errors,
      ...s3.errors,
      ...s4.errors,
    };

    if (Object.keys(allErrors).length > 0) {
      res.status(400).json({
        ok: false,
        error: 'Please check the highlighted fields and try again.',
        fieldErrors: allErrors,
      });
      return;
    }

    const reference = `HR-${new Date().getFullYear()}-${Math.floor(1000 + Math.random() * 9000)}`;
    const emailConfigured = Boolean(process.env.EMAIL_WEBHOOK_URL);
    let deliveryMode: 'webhook_forwarded' | 'logged_awaiting_smtp_setup' =
      'logged_awaiting_smtp_setup';

    if (process.env.EMAIL_WEBHOOK_URL) {
      try {
        const webhookRes = await fetch(process.env.EMAIL_WEBHOOK_URL, {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({
            to: 'ahayhurst68@gmail.com',
            reference,
            category,
            postcode,
            propertyType,
            description,
            urgency,
            name,
            phone,
            email,
            preferredContact,
          }),
        });
        if (webhookRes.ok) {
          deliveryMode = 'webhook_forwarded';
        }
      } catch {
        deliveryMode = 'logged_awaiting_smtp_setup';
      }
    }

    const record: StoredEnquiry = {
      reference,
      type: 'quote',
      createdAt: new Date().toISOString(),
      category: String(category).trim(),
      postcode: String(postcode).trim().toUpperCase(),
      propertyType: String(propertyType).trim(),
      description: String(description).trim(),
      urgency: String(urgency).trim(),
      hasPhoto: Boolean(photo && photo.name),
      photoMeta:
        photo && photo.name
          ? {
              name: String(photo.name).slice(0, 120),
              size: Number(photo.size) || 0,
              type: String(photo.type),
            }
          : null,
      name: String(name).trim(),
      phone: String(phone).trim(),
      email: String(email).trim(),
      preferredContact: String(preferredContact).trim(),
      deliveryMode,
    };

    memoryEnquiries.unshift(record);
    saveEnquiry(record);

    res.status(201).json({
      ok: true,
      reference,
      createdAt: record.createdAt,
      targetInbox: 'ahayhurst68@gmail.com',
      emailForwardingConfigured: emailConfigured && deliveryMode === 'webhook_forwarded',
      deliveryNotice:
        deliveryMode === 'webhook_forwarded'
          ? 'Your quote request has been validated and forwarded to ahayhurst68@gmail.com.'
          : 'Your quote request has been validated and recorded on this preview server (Reference ' +
            reference +
            '). Live SMTP/email credentials are not yet connected on this staging preview—use the one-click Email or Call buttons below to send directly to Ash right now.',
      summary: {
        category: record.category,
        postcode: record.postcode,
        propertyType: record.propertyType,
        urgency: record.urgency,
        hasPhoto: record.hasPhoto,
        photoName: record.photoMeta?.name || null,
        name: record.name,
        phone: record.phone,
        email: record.email,
        preferredContact: record.preferredContact,
      },
    });
  } catch (err) {
    console.error('Error handling /api/quote:', err);
    res.status(500).json({
      ok: false,
      error: 'An unexpected server error occurred. Please call Ash directly on 07533 137930.',
    });
  }
});

app.post('/api/contact', async (req, res) => {
  try {
    const { name, phone, email, service, message, honeypot } = req.body || {};

    if (honeypot) {
      res.status(400).json({ ok: false, error: 'Spam submission blocked.' });
      return;
    }

    const contactValidation = validateStep4({
      name: String(name ?? ''),
      phone: String(phone ?? ''),
      email: String(email ?? ''),
      preferredContact: 'Phone',
    });

    if (!message || String(message).trim().length < 10) {
      contactValidation.errors.message =
        'Please enter a message of at least 10 characters so Ash knows how to help.';
      contactValidation.valid = false;
    }

    if (!contactValidation.valid) {
      res.status(400).json({
        ok: false,
        error: 'Please check the highlighted fields.',
        fieldErrors: contactValidation.errors,
      });
      return;
    }

    const reference = `HR-MSG-${Math.floor(1000 + Math.random() * 9000)}`;
    const record: StoredEnquiry = {
      reference,
      type: 'contact',
      createdAt: new Date().toISOString(),
      category: String(service || 'General Enquiry').trim(),
      description: String(message).trim(),
      hasPhoto: false,
      photoMeta: null,
      name: String(name).trim(),
      phone: String(phone).trim(),
      email: String(email).trim(),
      preferredContact: 'Phone',
      deliveryMode: 'logged_awaiting_smtp_setup',
    };

    memoryEnquiries.unshift(record);
    saveEnquiry(record);

    res.status(201).json({
      ok: true,
      reference,
      targetInbox: 'ahayhurst68@gmail.com',
      emailForwardingConfigured: false,
      deliveryNotice:
        'Your enquiry has been validated and logged on the preview server (Ref: ' +
        reference +
        '). Because live SMTP credentials require owner setup prior to launch, you can also send this message directly via your email client or call 07533 137930.',
      summary: record,
    });
  } catch (err) {
    console.error('Error handling /api/contact:', err);
    res.status(500).json({
      ok: false,
      error: 'Unable to process request right now. Please call 07533 137930.',
    });
  }
});

async function startServer() {
  if (process.env.NODE_ENV !== 'production') {
    const { createServer: createViteServer } = await import('vite');
    const vite = await createViteServer({
      server: { middlewareMode: true },
      appType: 'spa',
    });
    app.use(vite.middlewares);
  } else {
    const distPath = path.join(__dirname, 'dist');
    app.use(express.static(distPath));
    app.get('*', (_req, res) => {
      res.sendFile(path.join(distPath, 'index.html'));
    });
  }

  app.listen(PORT, '0.0.0.0', () => {
    console.log(`Hayhurst Roofing server running on http://0.0.0.0:${PORT}`);
  });
}

if (!process.env.VERCEL) {
  startServer();
}

export default app;

