export interface ServiceItem {
  id: string;
  number: string;
  title: string;
  shortTitle: string;
  wizardCategoryId: string;
  summary: string;
  details: string;
  workIncluded: string[];
  commonSigns: string[];
  image: string;
  imageAlt: string;
  secondaryImage?: string;
}

export interface ReviewItem {
  id: string;
  author: string;
  date: string;
  source: 'Google' | 'MyBuilder';
  rating: number;
  serviceTag: string;
  quote: string;
  highlight: string;
  verified: boolean;
}

export interface PortfolioProject {
  id: string;
  title: string;
  category:
    | 'Roof Repairs'
    | 'New Roofs'
    | 'Chimney Repairs'
    | 'Guttering & Roofline'
    | 'Slate & Tile Work'
    | 'Rendering';
  location: string;
  image: string;
  secondaryImages?: string[];
  imageAlt: string;
  problem: string;
  workCompleted: string;
  visibleResult: string;
  featuredSpan?: 'wide' | 'tall' | 'standard';
}

export interface BeforeAfterPair {
  id: string;
  title: string;
  category: string;
  location: string;
  beforeImage: string;
  beforeLabel: string;
  beforeCaption: string;
  afterImage: string;
  afterLabel: string;
  afterCaption: string;
  summary: string;
}

export interface ServiceAreaItem {
  name: string;
  postcodePrefix: string;
  status: 'Primary Base' | 'Core Coverage' | 'Surrounding Coverage';
  description: string;
  commonRoofTypes: string;
}

export const BUSINESS_INFO = {
  name: 'Hayhurst Roofing',
  contactPerson: 'Ash (Ashley Hayhurst)',
  shortPerson: 'Ash',
  phoneDisplay: '07533 137930',
  phoneHref: 'tel:07533137930',
  phoneInternational: '+44 7533 137930',
  email: 'ahayhurst68@gmail.com',
  emailHref: 'mailto:ahayhurst68@gmail.com',
  basedIn: 'Accrington, Lancashire, United Kingdom',
  postalAddress: {
    line1: '34 Hawksworth Road',
    town: 'Accrington',
    county: 'Lancashire',
    postcode: 'BB5 5AR',
    full: '34 Hawksworth Road, Accrington, Lancashire, BB5 5AR',
    notice:
      'Please note: 34 Hawksworth Road is registered for postal correspondence only. No walk-in office, showroom, or customer reception is located at this address.',
  },
  hours: [
    { days: 'Monday – Friday', time: '9:00 AM – 5:00 PM' },
    { days: 'Saturday', time: '9:00 AM – 3:00 PM' },
    { days: 'Sunday', time: 'Closed (Enquiries welcome via form or message)' },
  ],
  reputation: {
    googleRating: '5.0',
    googleReviewCount: 37,
    myBuilderStatus: 'Positively Reviewed on MyBuilder',
    coreStrengths: [
      'Before-and-after photo documentation',
      'Straightforward, honest roof assessments',
      'Fair, transparent no-obligation quotes',
      'Tidy completion with all rubbish removed',
    ],
  },
  externalLinks: {
    googleReviews:
      'https://www.google.com/maps/search/?api=1&query=Hayhurst%20Roofing%20Accrington&query_place_id=ChIJa6w8AgSZe0gRINxW9Jqvu34',
    googleMapsPlace:
      'https://www.google.com/maps/search/?api=1&query=Hayhurst%20Roofing%20Accrington&query_place_id=ChIJa6w8AgSZe0gRINxW9Jqvu34',
    myBuilder: 'https://www.mybuilder.com/profile/hayhurstroofing/reviews',
    facebook: 'https://www.facebook.com/p/Hayhurst-Roofing-100086097083806/',
    existingWebsite: 'https://www.hayhurstroofing.co.uk/',
  },
};

export const WIZARD_CATEGORIES = [
  {
    id: 'roof-leak',
    label: 'Roof Leak',
    subtitle: 'Water ingress, damp patches or storm damage',
    defaultService: 'Roof Repairs',
  },
  {
    id: 'slates-tiles',
    label: 'Missing or Broken Tiles',
    subtitle: 'Slipped Welsh slates, cracked tiles or ridge work',
    defaultService: 'Slate & Tile Roofing',
  },
  {
    id: 'guttering',
    label: 'Guttering & Roofline',
    subtitle: 'Blocked gutters, leaks, fascias, soffits or lead box gutters',
    defaultService: 'Guttering Services',
  },
  {
    id: 'chimney',
    label: 'Chimney Work',
    subtitle: 'Repointing, flaunching, cowls, rendering or lead flashing',
    defaultService: 'Chimney Repairs',
  },
  {
    id: 'full-roof',
    label: 'Full Roof Replacement',
    subtitle: 'Breathable membrane, new battens, full re-slating or tiling',
    defaultService: 'New Roofs & Re-Roofing',
  },
  {
    id: 'rendering',
    label: 'Rendering',
    subtitle: 'Exterior wall or chimney stack rendering & weatherproofing',
    defaultService: 'Rendering',
  },
  {
    id: 'other',
    label: 'Other / Not Sure',
    subtitle: 'Flat roof repair, general inspection or honest advice',
    defaultService: 'Roof Repairs',
  },
] as const;

export const SERVICES: ServiceItem[] = [
  {
    id: 'roof-repairs',
    number: '01',
    title: 'Roof Repairs',
    shortTitle: 'Roof Repairs',
    wizardCategoryId: 'roof-leak',
    summary:
      'Targeted repairs to slipped slates, broken tiles, roof leaks, ridge tiles, and storm-damaged roofing components across Lancashire.',
    details:
      'When a roof leaks or loses slates in bad weather, you need an honest assessment of what has actually failed—not a sales pitch for work you do not need. Ash inspects the roof, takes photographs of the problem area so you can see it clearly from the ground, explains the practical options, and completes neat, weatherproof repairs.',
    workIncluded: [
      'Locating and resolving active roof leaks and water ingress',
      'Re-bedding and repointing loose or mortar-weathered ridge tiles',
      'Replacing slipped, cracked, or missing natural slates and roof tiles',
      'Repointing around lead step flashings and valley junctions',
      'Before-and-after photographic documentation of high-level repair work',
    ],
    commonSigns: [
      'Damp patches appearing on upstairs ceilings or chimney breasts',
      'Fragments of slate, tile, or mortar found in gutters or on paths',
      'Daylight visible inside the loft space',
    ],
    image: '/images/gallery/001.jpg',
    imageAlt: 'Completed natural slate roof and newly repointed ridge tiles in Lancashire by Hayhurst Roofing',
    secondaryImage: '/images/gallery/017.jpg',
  },
  {
    id: 'new-roofs',
    number: '02',
    title: 'New Roofs & Re-Roofing',
    shortTitle: 'New Roofs',
    wizardCategoryId: 'full-roof',
    summary:
      'Complete strip-and-reslate or tile replacements using breathable membranes, treated timber battens, and dry-fix ridge systems.',
    details:
      'For roofs that have reached the end of their serviceable life, Hayhurst Roofing strips the covering back to the rafters, installs BBA-certified breathable roofing membranes (such as Cromar Vent3 Pro) with new treated timber battens, and lays natural slate or interlocking tiles with mechanically fixed dry-ridge and hip systems.',
    workIncluded: [
      'Full strip-down of aged slates, tiles, and perished underfelt',
      'Rafter inspection and installation of BBA-approved breathable membrane',
      'New graded timber battening, dressed lead valleys, and box gutters',
      'Full re-roofing in natural slate or property-matched roof tiles',
      'Mechanical dry-ridge and hip installation for long-term storm security',
    ],
    commonSigns: [
      'Perished bitumen felt causing widespread condensation or leaks in the loft',
      'Nail sickness causing repeated slate slippage across multiple slopes',
      'Roofs unmaintained for 20+ years requiring structural weatherproofing',
    ],
    image: '/images/gallery/029.jpg',
    imageAlt: 'Completed new slate roof with mechanical dry-ridge system installed by Hayhurst Roofing',
    secondaryImage: '/images/gallery/020.jpg',
  },
  {
    id: 'chimney-repairs',
    number: '03',
    title: 'Chimney Repairs & Repointing',
    shortTitle: 'Chimney Repairs',
    wizardCategoryId: 'chimney',
    summary:
      'Stone and brick chimney repointing, crown re-cementing (flaunching), ventilated cowl installation, chimney rendering, and lead flashing.',
    details:
      'Exposed Lancashire chimneys bear the brunt of wind, frost, and driving rain. Perished mortar joints and cracked cement flaunching quickly allow water to track down inside the property. We repoint stone and brick stacks, re-cement chimney crowns, fit new ventilated cowls, render weathered stacks, and dress lead flashings.',
    workIncluded: [
      'Raking out and repointing weathered stone and red-brick chimney stacks',
      'Re-cementing chimney crowns (flaunching) and seating new chimney cowls',
      'Full chimney stack rendering and weatherproof masonry protection',
      'Repointing and dressing lead step and back-gutter flashings',
      'High-level photo inspection of long-term chimney condition',
    ],
    commonSigns: [
      'Damp staining on chimney breast plasterwork in bedrooms or living rooms',
      'Eroded mortar joints, vegetation growth, or loose pots on the stack',
      'Cracked cement flaunching around chimney pots',
    ],
    image: '/images/gallery/010.jpg',
    imageAlt: 'Repointed red brick chimney stack with new cement flaunching and cowls in Accrington',
    secondaryImage: '/images/gallery/018.jpg',
  },
  {
    id: 'guttering',
    number: '04',
    title: 'Guttering & Lead Box Gutters',
    shortTitle: 'Guttering',
    wizardCategoryId: 'guttering',
    summary:
      'Gutter clearing, joint repairs, full uPVC replacements, and traditional hand-dressed lead box guttering for stone properties.',
    details:
      'Blocked or leaking gutters can saturate stonework and worsen roof extensions during heavy Lancashire downpours. Whether your home needs a routine gutter clear-out, a full replacement uPVC rainwater system, or traditional hand-dressed lead box gutter linings on a stone terrace, we ensure rainwater drains cleanly away from your walls.',
    workIncluded: [
      'Full gutter replacement for terraced, semi-detached, and detached homes',
      'Traditional hand-dressed lead box guttering and valley linings',
      'Clearing moss, silt, and storm debris from blocked gutters and downpipes',
      'Repairing leaking gutter joints, brackets, and rainwater outlets',
    ],
    commonSigns: [
      'Rainwater overflowing down stonework or brickwork during heavy rain',
      'Damp internal walls near extensions or eaves lines',
      'Sagging gutter runs or plants growing in roofline channels',
    ],
    image: '/images/gallery/021.jpg',
    imageAlt: 'Hand-dressed lead box gutter installation on a stone property by Hayhurst Roofing',
    secondaryImage: '/images/gallery/024.jpg',
  },
  {
    id: 'slate-tile',
    number: '05',
    title: 'Slate & Tile Roofing',
    shortTitle: 'Slate & Tile Work',
    wizardCategoryId: 'slates-tiles',
    summary:
      'Specialist maintenance, matching, and replacement of traditional Welsh and Cumbrian natural roof slates and clay or concrete tiles.',
    details:
      'Traditional terraced and period homes across Accrington and Burnley rely on properly lapped natural slate and ridge work. We source matching slates and tiles, replace broken or slipped units while on the roof, and reset ridge tiles with clean mortar or dry-fix systems.',
    workIncluded: [
      'Individual and batch replacement of loose, missing, or broken slates',
      'Full slope re-slating and valley leadwork renewal',
      'Ridge tile re-bedding, repointing, and mechanical dry-ridge upgrades',
      'Roof tile replacement on modern and mid-century extensions',
    ],
    commonSigns: [
      'Single slipped slates resting in the gutter or visible gaps on the pitch',
      'Cracked or delaminating slates after winter frosts',
      'Loose mortar along the main ridge or hip lines',
    ],
    image: '/images/gallery/027.jpg',
    imageAlt: 'Newly slated valley roof and ridge line completed by Hayhurst Roofing',
    secondaryImage: '/images/gallery/007.jpg',
  },
  {
    id: 'fascias-soffits',
    number: '06',
    title: 'Fascias & Soffits',
    shortTitle: 'Fascias & Soffits',
    wizardCategoryId: 'guttering',
    summary:
      'Maintenance, repair, and low-maintenance replacement of roofline fascias, soffits, and eaves protection.',
    details:
      'The roofline supports your entire guttering system and seals the junction where rafters meet external walls. We repair and replace weathered timber or uPVC fascias and soffits, combining roofline renewal with eaves felt support trays and breathable membrane detailing.',
    workIncluded: [
      'Replacing rotten or weathered roofline fascia and soffit boards',
      'Installing eaves protection trays and over-fascia ventilation',
      'Aligning new fascia installations with replacement guttering',
      'Sealing roofline junctions against wind-driven rain and birds',
    ],
    commonSigns: [
      'Peeling paint or soft, decaying timber along the eaves',
      'Gutters pulling away from the fascia board fixings',
      'Draughts or water tracking behind the gutter line',
    ],
    image: '/images/gallery/024.jpg',
    imageAlt: 'New roofline fascia, guttering, and eaves preparation during re-roofing work',
    secondaryImage: '/images/gallery/030.jpg',
  },
  {
    id: 'rendering',
    number: '07',
    title: 'Rendering & Masonry Repointing',
    shortTitle: 'Rendering',
    wizardCategoryId: 'rendering',
    summary:
      'Clean, weatherproof rendering for rear elevations, extensions, and chimney stacks, alongside traditional brick and stone repointing.',
    details:
      'Weathered external walls and porous brickwork can let damp into a property just as easily as a damaged roof. Hayhurst Roofing carries out exterior wall rendering, chimney stack rendering, and brick or stone repointing with proper scaffolding access and tidy site protection.',
    workIncluded: [
      'Rear elevation and gable wall sand-and-cement or weatherproof rendering',
      'Chimney stack rendering to seal porous masonry',
      'Brickwork and stonework raking out and full repointing',
      'Full scaffolding access and clean-up upon completion',
    ],
    commonSigns: [
      'Cracked, hollow, or blown render allowing rain behind the surface',
      'Crumbling mortar joints on exposed brick or stone elevations',
      'Internal damp on external walls despite a sound roof covering',
    ],
    image: '/images/gallery/009.jpg',
    imageAlt: 'Freshly rendered rear wall and immaculate flat roof completed by Hayhurst Roofing',
    secondaryImage: '/images/gallery/012.jpg',
  },
  {
    id: 'flat-roofs',
    number: '08',
    title: 'Flat Roofs & Extension Roofing',
    shortTitle: 'Flat & Extension Roofs',
    wizardCategoryId: 'roof-leak',
    summary:
      'Weatherproof flat roof installations, felt roofing, and pitched extension roof repairs where extensions meet main house walls.',
    details:
      'Kitchen extensions, dormers, and bay roofs require careful detailing where the roof meets the main house wall and guttering. We install and repair flat felt roofs and low-pitch extension roofs, including lead flashing repointing and drainage improvements.',
    workIncluded: [
      'Torch-on mineral felt flat roof installations and repairs',
      'Leaky extension roof repairs, slate replacement, and flashing repointing',
      'Upstand, parapet, and abutment leadwork detailing',
      'Clearing and re-aligning adjacent gutter runs that flood extension roofs',
    ],
    commonSigns: [
      'Water pooling or blistering on flat extension coverings',
      'Leaks where an extension roof joins the main house brickwork',
      'Storm overflow from upper gutters saturating lower extension roofs',
    ],
    image: '/images/gallery/009.jpg',
    imageAlt: 'Completed mineral felt flat roof and rear elevation rendering by Hayhurst Roofing',
    secondaryImage: '/images/gallery/015.jpg',
  },
];

export const VERIFIED_REVIEWS: ReviewItem[] = [
  {
    id: 'peter-h',
    author: 'Peter H',
    date: 'May 2025',
    source: 'Google',
    rating: 5,
    serviceTag: 'Slate Repairs & Chimney Inspection',
    highlight: 'Turned up the following morning, took photos on the roof & sorted extra slates for a good price.',
    quote:
      'Spoke to Ash over the phone about a loose slate I had. The following morning he turned up, went up, took pictures, explained there was a couple of other issues he could solve whilst he was up there, (another missing slate and a couple more broken). He sorted it no problem and for a good price. He also took some other pictures whilst he was on the roof and informed me of a couple of other longer term issues that I have with the chimney and provided a very reasonable quote! Ash was really efficient, knowledgeable, and friendly. I would definitely recommend him!',
    verified: true,
  },
  {
    id: 'heather-stevens',
    author: 'Heather Stevens',
    date: 'May 2025',
    source: 'Google',
    rating: 5,
    serviceTag: 'Ridge Tiles, Chimney Stack & Cowls',
    highlight: 'Re-bedded ridge tiles, re-cemented chimney stack and fitted new cowls — tidy job and rubbish removed.',
    quote:
      'Re-bedding ridge tiles, re-cementing a chimney stack and installing new cowls. Great job, reasonable price, tidy job and rubbish removed.',
    verified: true,
  },
  {
    id: 'denis-shorrock',
    author: 'Denis Shorrock',
    date: 'March 2025',
    source: 'Google',
    rating: 5,
    serviceTag: 'Chimney Rendering, Ridge Tiles & Slates',
    highlight: 'Took pictures beforehand, explained what was required and quoted a fair price.',
    quote:
      'Just had a job completed by Hayhurst Roofing. Chimney stack rendered, ridge tiles reset and repointed, 3 slates replaced and gutterings cleared. Happy with the way Ash went about the job, took pictures beforehand, explained what was required and quoted a fair price for the work. This company came recommended to us, and I would be confident in passing on a recommendation.',
    verified: true,
  },
  {
    id: 'liz-reid',
    author: 'Liz Reid',
    date: 'December 2024',
    source: 'Google',
    rating: 5,
    serviceTag: 'Extension Leak, Flashing & Gutters',
    highlight: 'Quick response to view problem and quote — neat professional job and no mess to clear up.',
    quote:
      'Had a problem with a leaky extension, made worse by a blocked gutter during the storm. Repointed around flashing and broken slates replaced and gutters cleared. Quick response to view problem and quote as it wasn’t an emergency could wait for a non windy, dry day to repair. Very pleased with result, looks a neat professional job and no mess to clear up. Will definitely use again if required. Will be recommending to friends too.',
    verified: true,
  },
  {
    id: 'kim-wah-to',
    author: 'KIM WAH TO',
    date: 'July 2024',
    source: 'Google',
    rating: 5,
    serviceTag: 'Full Roof Overhaul (20-Year Unmaintained Roof)',
    highlight: 'Kept me informed of the entire process and completed the work at an extraordinary pace.',
    quote:
      "Got Ash to sort out my roof, which hasn't been maintained for nearly 20 years. He did a very remarkable job from start to finish. Kept me informed of the entire process. Despite setbacks (Weather, Nature and Parking etc.) he completed the work at an extraordinary pace. Highly recommend for reasonably priced, a commendable work rate and an easy to get along and very reliable individual. Would use his services again in the near future. Completely satisfied with the end result. Thanks, Ash.",
    verified: true,
  },
  {
    id: 'gutter-replacement-client',
    author: 'Verified Homeowner',
    date: 'Verified Review',
    source: 'Google',
    rating: 5,
    serviceTag: 'Full Guttering Replacement',
    highlight: 'Pleasant and professional throughout, keen price, turned up when they said they would.',
    quote:
      "Ashley and his team did a great job replacing my mum's guttering. Pleasant and professional throughout, keen price, turned up when they said they would, excellent quality of workmanship.",
    verified: true,
  },
  {
    id: 'chimney-repair-client',
    author: 'Verified Homeowner',
    date: 'Verified Review',
    source: 'Google',
    rating: 5,
    serviceTag: 'Chimney Repair',
    highlight: 'Professional, reliable, and great quality work.',
    quote:
      'Really pleased with the chimney repair Ash carried out. Professional, reliable, and great quality work. Highly recommend!',
    verified: true,
  },
];

export const BEFORE_AFTER_TRANSFORMATIONS: BeforeAfterPair[] = [
  {
    id: 'valley-slate-reroof',
    title: 'Valley Slate Roof & Dry-Ridge Transformation',
    category: 'New Roofs',
    location: 'Lancashire',
    beforeImage: '/images/gallery/028.jpg',
    beforeLabel: 'Stage 1: Membrane & Batten Preparation',
    beforeCaption:
      'Old covering stripped back; Cromar Vent3 Pro BBA breathable membrane and new treated timber battens installed.',
    afterImage: '/images/gallery/027.jpg',
    afterLabel: 'Stage 2: Completed Natural Slate & Valley',
    afterCaption:
      'Fully slated pitch, dressed lead valley gutter, mechanical dry-ridge system, and new roofline guttering.',
    summary:
      'Captured from the exact same rooftop vantage point: a complete valley re-roof progressing from breathable membrane and batten preparation to finished natural slate and lead valley detailing.',
  },
  {
    id: 'hipped-slate-reroof',
    title: 'Hipped Slate Roof & Mechanical Hip System',
    category: 'Slate & Tile Work',
    location: 'Lancashire',
    beforeImage: '/images/gallery/033.jpg',
    beforeLabel: 'During: Breathable Underlay & Hip Batten Line',
    beforeCaption:
      'Roof slope prepared with high-performance breathable membrane and graded battens up to the hip timber.',
    afterImage: '/images/gallery/029.jpg',
    afterLabel: 'Completed: Natural Slate & Dry-Fix Hip',
    afterCaption:
      'Precision-cut natural slates along the hip line with a weatherproof mechanically fixed dry-hip ridge system.',
    summary:
      'Photographed from the same scaffolding corner before and after final slating—demonstrating clean hip cuts, breathable underlay protection, and secure dry-fix ridge detailing.',
  },
  {
    id: 'rear-wall-rendering',
    title: 'Rear Elevation Rendering & Flat Roof Renewal',
    category: 'Rendering',
    location: 'Lancashire',
    beforeImage: '/images/gallery/003.jpg',
    beforeLabel: 'Before: Exposed Stone Rear Infill Wall',
    beforeCaption:
      'Scaffolding erected around weathered, unrendered rear stonework prior to weatherproofing.',
    afterImage: '/images/gallery/009.jpg',
    afterLabel: 'After: Smooth Render & Mineral Flat Roof',
    afterCaption:
      'Rear elevation cleanly rendered with new mineral felt flat roof covering below.',
    summary:
      'Weatherproofing an awkward rear elevation recess: full scaffolding access, smooth protective rendering, and a clean mineral felt flat roof below.',
  },
];

export const PORTFOLIO_PROJECTS: PortfolioProject[] = [
  {
    id: 'proj-hipped-slate-roof',
    title: 'Full Hipped Natural Slate Roof & Dry-Fix Ridge',
    category: 'New Roofs',
    location: 'Lancashire',
    image: '/images/gallery/029.jpg',
    secondaryImages: ['/images/gallery/030.jpg', '/images/gallery/033.jpg', '/images/gallery/020.jpg'],
    imageAlt: 'Completed natural slate hipped roof with mechanical dry-ridge system in Lancashire',
    problem:
      'Aged slate roof requiring a complete strip-back to rafters to resolve nail fatigue and perished underfelt.',
    workCompleted:
      'Stripped existing roof covering, installed Cromar Vent3 Pro BBA-certified breathable membrane, fixed new treated timber battens, relaid natural slate, and installed a mechanically fixed dry-ridge and hip system.',
    visibleResult:
      'Crisp, uniform slate courses, maintenance-free mechanical hip and ridge line, and full modern breathable under-roof protection.',
    featuredSpan: 'wide',
  },
  {
    id: 'proj-accrington-chimney-repoint',
    title: 'Red-Brick Chimney Stack Repointing, Flaunching & Cowls',
    category: 'Chimney Repairs',
    location: 'Accrington, Lancashire',
    image: '/images/gallery/010.jpg',
    secondaryImages: ['/images/gallery/005.jpg'],
    imageAlt: 'Repointed red brick chimney stack with new flaunching and cowls overlooking Accrington and Peel Tower',
    problem:
      'Weathered mortar joints, moss growth, and perished crown flaunching on a multi-flue red-brick chimney stack in Accrington.',
    workCompleted:
      'Raked out decayed mortar joints across the brickwork, repointed with fresh mortar, re-cemented the chimney crown flaunching, and fitted ventilated aluminium cowls.',
    visibleResult:
      'Watertight brickwork, clean mortar lines, secure chimney pots, and protected flues.',
    featuredSpan: 'tall',
  },
  {
    id: 'proj-valley-slate-restoration',
    title: 'Valley Roof Strip, Re-Slate & Lead Valley Renewal',
    category: 'Slate & Tile Work',
    location: 'Lancashire',
    image: '/images/gallery/027.jpg',
    secondaryImages: ['/images/gallery/031.jpg', '/images/gallery/028.jpg', '/images/gallery/032.jpg'],
    imageAlt: 'Completed slate valley roof and lead valley flashing in Lancashire',
    problem:
      'Deteriorated valley junction and aged roof slates allowing water ingress into the underlying roof structure.',
    workCompleted:
      'Stripped rafters clean, installed new breathable membrane and battens, formed a clean dressed valley, and re-slated both intersecting pitches with new guttering at the eaves.',
    visibleResult:
      'Sharp valley alignment, clean water run-off into new guttering, and weatherproof ridge detailing.',
    featuredSpan: 'standard',
  },
  {
    id: 'proj-lead-box-gutter',
    title: 'Traditional Hand-Dressed Lead Box Guttering',
    category: 'Guttering & Roofline',
    location: 'Lancashire',
    image: '/images/gallery/021.jpg',
    secondaryImages: ['/images/gallery/024.jpg'],
    imageAlt: 'Hand-dressed lead box guttering on a traditional Lancashire stone property',
    problem:
      'Parapet/eaves gutter channel requiring wide-gauge lead lining to prevent water tracking into traditional stone walls.',
    workCompleted:
      'Laid and hand-dressed continuous lead box guttering along the eaves line, dressed upstands neatly beneath the lower slate course and breathable membrane.',
    visibleResult:
      'Durable, wide-capacity lead drainage channel built to handle heavy Pennine rainfall.',
    featuredSpan: 'standard',
  },
  {
    id: 'proj-stone-chimney-parkview',
    title: 'Stone Chimney Repointing, Crown Re-Cementing & Cowls',
    category: 'Chimney Repairs',
    location: 'Lancashire',
    image: '/images/gallery/018.jpg',
    secondaryImages: ['/images/gallery/004.jpg', '/images/gallery/006.jpg', '/images/gallery/025.jpg'],
    imageAlt: 'Repointed sandstone chimney stack with four new ventilated cowls and mortar crown',
    problem:
      'Eroded mortar beds and cracked cement crown on a traditional coursed stone chimney stack.',
    workCompleted:
      'Full stone repointing, new weatherproof cement flaunching across the top bed, four new louvred chimney cowls, and ridge mortar repointing below.',
    visibleResult:
      'Solid structural masonry and complete protection against rain entry and nesting birds.',
    featuredSpan: 'wide',
  },
  {
    id: 'proj-ridge-rebedding-slate',
    title: 'Ridge Tile Re-Bedding & Natural Slate Repairs',
    category: 'Roof Repairs',
    location: 'Lancashire',
    image: '/images/gallery/001.jpg',
    secondaryImages: ['/images/gallery/002.jpg', '/images/gallery/007.jpg', '/images/gallery/017.jpg'],
    imageAlt: 'Newly repointed ridge and hip tiles on a natural slate roof in Lancashire',
    problem:
      'Loose, mortar-weathered ridge and hip tiles alongside slipped and broken natural slates.',
    workCompleted:
      'Replaced missing and damaged slates across the pitch and re-bedded/repointed the ridge and hip tiles with clean, weather-resistant mortar.',
    visibleResult:
      'Secured ridge line and restored slate integrity documented with rooftop photographs for the homeowner.',
    featuredSpan: 'standard',
  },
  {
    id: 'proj-rear-rendering-flat-roof',
    title: 'Rear Elevation Rendering & Mineral Felt Flat Roof',
    category: 'Rendering',
    location: 'Lancashire',
    image: '/images/gallery/009.jpg',
    secondaryImages: ['/images/gallery/003.jpg', '/images/gallery/012.jpg', '/images/gallery/014.jpg'],
    imageAlt: 'Freshly rendered rear wall and flat felt roof in Lancashire',
    problem:
      'Unrendered, porous rear stone elevation and ageing extension roof surface.',
    workCompleted:
      'Erected access scaffolding, prepared and rendered the upper rear elevation, and completed a clean torch-on mineral felt flat roof deck.',
    visibleResult:
      'Clean, weatherproof rear facade and watertight flat roof extension.',
    featuredSpan: 'standard',
  },
  {
    id: 'proj-fascias-eaves-renewal',
    title: 'Eaves Rafter Preparation, Fascias & Ogee Guttering',
    category: 'Guttering & Roofline',
    location: 'Lancashire',
    image: '/images/gallery/024.jpg',
    secondaryImages: ['/images/gallery/022.jpg', '/images/gallery/023.jpg'],
    imageAlt: 'New fascia board and guttering installation at roof eaves during re-roofing',
    problem:
      'Deteriorated eaves detailing and old rainwater goods requiring renewal during roof overhaul.',
    workCompleted:
      'Stripped lower courses to inspect rafters, installed new fascia and high-capacity guttering prior to laying breathable membrane and battens.',
    visibleResult:
      'Straight, free-flowing roofline drainage properly integrated with the roof underlay.',
    featuredSpan: 'standard',
  },
];

export const WORKFLOW_STAGES = [
  {
    step: '01',
    title: 'Inspect & Photograph',
    subtitle: 'See what is happening on your roof without climbing a ladder',
    description:
      'Customers frequently note how Ash goes up onto the roof, takes clear photographs of the problem area—whether a slipped slate, perished chimney mortar, or blocked flashing—and explains in plain English what genuinely needs attention.',
    image: '/images/gallery/031.jpg',
    imageCaption: 'High-level inspection & structural assessment before work begins',
  },
  {
    step: '02',
    title: 'Agree Scope & Repair Properly',
    subtitle: 'Fair, transparent quotes with zero pressure',
    description:
      'Before any work starts, you receive a clear, reasonable quote covering the agreed scope. From a quick slate replacement while already up on the roof to a full breathable-membrane re-roof, work is carried out methodically using proven materials.',
    image: '/images/gallery/020.jpg',
    imageCaption: 'BBA-approved Cromar Vent3 Pro membrane and treated timber battens',
  },
  {
    step: '03',
    title: 'Show the Finished Result',
    subtitle: 'Photographic proof and a spotless cleanup',
    description:
      'Because you cannot easily inspect a chimney crown or ridge line from the pavement, Ash documents completed repairs with photographs so you can see the neat finish for yourself—leaving your patio, drive, and gutters tidy with all rubbish removed.',
    image: '/images/gallery/029.jpg',
    imageCaption: 'Completed slate & dry-ridge roof documented from the rooftop',
  },
];

export const TRUST_PILLARS = [
  {
    index: '01',
    title: 'Straightforward Advice',
    description:
      'Clear explanations of what is wrong with your roof and practical recommendations on how to fix it—separating urgent leaks from longer-term maintenance so you can make an informed decision.',
    evidence: 'Grounded in customer feedback from Peter H & Denis Shorrock (Google Reviews)',
  },
  {
    index: '02',
    title: 'Workmanship That Shows',
    description:
      'From neatly dressed lead box gutters and repointed stone chimneys to full natural slate roofs, every joint, ridge, and valley is finished with care and documented with photographs.',
    evidence: '33+ documented local rooftop project photographs across Lancashire',
  },
  {
    index: '03',
    title: 'Fair, Transparent Quotes',
    description:
      'Homeowners across Accrington and Burnley consistently highlight reasonable, keen pricing with no hidden surprises—whether sorting a few loose slates or overhauling a 20-year-old roof.',
    evidence: '5.0★ average rating across 37 Google reviews',
  },
  {
    index: '04',
    title: 'Respect for Your Property',
    description:
      'Turning up when promised, protecting patios and garden furniture with dust sheets, clearing gutters, and removing all roofing rubble and waste before leaving site.',
    evidence: 'Praised by Heather Stevens, Liz Reid & Denis Shorrock for tidy completion',
  },
];

export const SERVICE_AREAS: ServiceAreaItem[] = [
  {
    name: 'Accrington',
    postcodePrefix: 'BB5',
    status: 'Primary Base',
    description:
      'Home base for Hayhurst Roofing. Rapid local response for slate repairs, chimney repointing, guttering, and full re-roofs across Accrington and Peel Park.',
    commonRoofTypes: 'Traditional Welsh slate terraced roofs, stone & red-brick chimneys, rear extensions',
  },
  {
    name: 'Burnley',
    postcodePrefix: 'BB10 – BB12',
    status: 'Core Coverage',
    description:
      'Comprehensive roofing repairs, new slate and tile roofs, leadwork, and roofline maintenance for residential and commercial properties throughout Burnley.',
    commonRoofTypes: 'Stone-built terraces, hipped slate roofs, valley gutters & chimney stacks',
  },
  {
    name: 'Oswaldtwistle & Church',
    postcodePrefix: 'BB5',
    status: 'Core Coverage',
    description:
      'Immediate neighbouring coverage for storm damage, slipped slates, ridge tile re-bedding, and blocked or leaking gutters.',
    commonRoofTypes: 'Victorian stone terraces, semi-detached tiled roofs, flat roof extensions',
  },
  {
    name: 'Great Harwood, Rishton & Clayton-le-Moors',
    postcodePrefix: 'BB5 – BB6',
    status: 'Core Coverage',
    description:
      'Regularly serving Hyndburn homeowners with honest roof inspections, chimney rendering, repointing, and full roof replacements.',
    commonRoofTypes: 'Natural slate pitches, stone gable ends, uPVC & lead box guttering',
  },
  {
    name: 'Blackburn & Darwen',
    postcodePrefix: 'BB1 – BB3',
    status: 'Surrounding Coverage',
    description:
      'Full roofing, chimney, rendering, and guttering services across Blackburn, Darwen, and surrounding East Lancashire communities.',
    commonRoofTypes: 'Terraced and detached residential roofs, commercial roof maintenance',
  },
  {
    name: 'Clitheroe, Rossendale & Wider Lancashire',
    postcodePrefix: 'BB7 / BB4 / PR / FY',
    status: 'Surrounding Coverage',
    description:
      'Covering the whole of Lancashire for roof replacements, slate restoration, and larger roofing or rendering projects.',
    commonRoofTypes: 'Exposed Pennine stone properties, rural slate roofs & period chimneys',
  },
];

export const FAQS = [
  {
    question: 'What are your operating hours?',
    answer:
      'Hayhurst Roofing operates Monday to Friday 9:00 AM – 5:00 PM and Saturday 9:00 AM – 3:00 PM (closed Sundays). You are welcome to send a quote request or message outside these hours and Ash will respond as soon as possible.',
  },
  {
    question: 'Can I visit your address on Hawksworth Road?',
    answer:
      'No—34 Hawksworth Road, Accrington (BB5 5AR) is strictly for postal correspondence only. There is no walk-in office or showroom at this address because all inspections and quotations are carried out directly at your property.',
  },
  {
    question: 'Do you take photographs of the roof problem and finished repair?',
    answer:
      'Yes. Homeowners regularly highlight that Ash takes photographs while on the roof to show the exact issue beforehand—along with any other wear worth keeping an eye on—and provides photos of the completed work so you can see the repair clearly without climbing a ladder.',
  },
  {
    question: 'Do you handle small jobs like a single loose slate as well as full new roofs?',
    answer:
      'Absolutely. From projects lasting just a couple of hours—such as replacing slipped slates, clearing a blocked gutter, or repointing flashing—through to full multi-week re-roofs and rendering projects, every job receives the same honest advice and tidy finish.',
  },
];
