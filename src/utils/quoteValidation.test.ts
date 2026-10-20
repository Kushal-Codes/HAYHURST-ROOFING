import test from 'node:test';
import assert from 'node:assert/strict';
import {
  validateStep1,
  validateStep2,
  validateRoofPhoto,
  validateStep4,
  mapServiceToWizardCategory,
  filterPortfolioByCategory,
  normalizeRoutePath,
} from './quoteValidation.ts';

test('validateStep1 requires a non-empty roofing category', () => {
  assert.equal(validateStep1('').valid, false);
  assert.equal(validateStep1('   ').valid, false);
  assert.equal(validateStep1('roof-leak').valid, true);
});

test('validateStep2 validates UK postcodes, property type, description length, and urgency', () => {
  const invalidResult = validateStep2({
    postcode: 'INVALID_POSTCODE_12345',
    propertyType: '',
    description: 'short',
    urgency: '',
  });
  assert.equal(invalidResult.valid, false);
  assert.ok(invalidResult.errors.postcode);
  assert.ok(invalidResult.errors.propertyType);
  assert.ok(invalidResult.errors.description);
  assert.ok(invalidResult.errors.urgency);

  const validResult = validateStep2({
    postcode: 'BB5 5AR',
    propertyType: 'Terraced House',
    description: 'Two slates slipped near the chimney stack after heavy wind.',
    urgency: 'Within the next few days',
  });
  assert.equal(validResult.valid, true);
  assert.deepEqual(validResult.errors, {});
});

test('validateRoofPhoto allows optional empty photo and validates MIME type and 5MB cap', () => {
  assert.equal(validateRoofPhoto(null).valid, true);
  assert.equal(
    validateRoofPhoto({ name: 'roof.jpg', size: 1024 * 500, type: 'image/jpeg' }).valid,
    true
  );
  assert.equal(
    validateRoofPhoto({ name: 'script.exe', size: 1024, type: 'application/x-msdownload' }).valid,
    false
  );
  assert.equal(
    validateRoofPhoto({ name: 'huge.png', size: 6 * 1024 * 1024, type: 'image/png' }).valid,
    false
  );
});

test('validateStep4 enforces UK phone, email, name, and anti-spam check', () => {
  const bad = validateStep4({
    name: 'A',
    phone: '123',
    email: 'not-an-email',
    preferredContact: 'Phone',
    humanCheckAnswer: '99',
    expectedHumanAnswer: '7',
  });
  assert.equal(bad.valid, false);
  assert.ok(bad.errors.name);
  assert.ok(bad.errors.phone);
  assert.ok(bad.errors.email);
  assert.ok(bad.errors.humanCheck);

  const good = validateStep4({
    name: 'Sarah Jenkins',
    phone: '07533 137930',
    email: 'sarah@example.co.uk',
    preferredContact: 'Phone',
    humanCheckAnswer: '7',
    expectedHumanAnswer: '7',
  });
  assert.equal(good.valid, true);
});

test('mapServiceToWizardCategory accurately links service cards to wizard step 1', () => {
  assert.equal(mapServiceToWizardCategory('chimney-repairs'), 'chimney');
  assert.equal(mapServiceToWizardCategory('new-roofs'), 'full-roof');
  assert.equal(mapServiceToWizardCategory('rendering'), 'rendering');
  assert.equal(mapServiceToWizardCategory('unknown-service'), 'other');
});

test('filterPortfolioByCategory returns all items for All and filters specific categories', () => {
  const sample = [
    { id: '1', category: 'Chimney Repairs' },
    { id: '2', category: 'New Roofs' },
    { id: '3', category: 'Chimney Repairs' },
  ];
  assert.equal(filterPortfolioByCategory(sample, 'All').length, 3);
  assert.equal(filterPortfolioByCategory(sample, 'Chimney Repairs').length, 2);
  assert.equal(filterPortfolioByCategory(sample, 'Rendering').length, 0);
});

test('normalizeRoutePath resolves valid multi-page paths and falls back to /', () => {
  assert.equal(normalizeRoutePath('/'), '/');
  assert.equal(normalizeRoutePath('/services/'), '/services');
  assert.equal(normalizeRoutePath('/portfolio?cat=chimney'), '/portfolio');
  assert.equal(normalizeRoutePath('/reviews'), '/reviews');
  assert.equal(normalizeRoutePath('/areas'), '/areas');
  assert.equal(normalizeRoutePath('/quote'), '/quote');
  assert.equal(normalizeRoutePath('/contact'), '/contact');
  assert.equal(normalizeRoutePath('/unknown-page'), '/');
});

