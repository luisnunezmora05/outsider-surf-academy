// SEO configuration for Outsider Surf Academy (Tamarindo, Costa Rica).
// One canonical keyword intent per route to avoid cannibalization:
// - "surf lessons tamarindo" + "surf school tamarindo" live on the home page.
// - each lesson type gets its own semantic URL for long-tail intent.

export interface PageSEO {
  title: string
  description: string
  keyfocus: string
  synonyms: string[]
  related: string[]
  ogImage?: string
}

export interface PageSEOWithRoute extends PageSEO {
  slug: string
  image?: string
}

export const SEO: Record<string, PageSEO> = {
  '/': {
    title: 'Surf School in Tamarindo, Costa Rica | Outsider Surf Academy',
    description:
      'Learn to surf in Tamarindo with bilingual local instructors. Private, semi-private & group lessons, all equipment included. Book online in two minutes.',
    keyfocus: 'surf school tamarindo',
    synonyms: [
      'surf lessons tamarindo',
      'surf lessons tamarindo costa rica',
      'learn to surf tamarindo',
      'tamarindo surf school',
      'surfing lessons tamarindo',
    ],
    related: [
      'best surf school tamarindo',
      'beginner surf lessons tamarindo',
      'surf lessons guanacaste',
    ],
    ogImage: '/images/hero-home.jpg',
  },

  '/surf-lessons-tamarindo': {
    title: 'Surf Lessons in Tamarindo, Costa Rica | Outsider Surf Academy',
    description:
      'Book surf lessons in Tamarindo, Costa Rica with Outsider Surf Academy. Private, semi-private, group & kids lessons from $50 — all equipment included. Stand up on your first lesson.',
    keyfocus: 'surf lessons tamarindo costa rica',
    synonyms: [
      'surf lessons tamarindo prices',
      'best surf lessons tamarindo',
      'learn to surf tamarindo costa rica',
    ],
    related: [
      'surf school tamarindo',
      'private surf lessons tamarindo',
      'group surf lessons tamarindo',
    ],
    ogImage: '/images/hero-home.jpg',
  },

  '/private-surf-lessons-tamarindo': {
    title: 'Private Surf Lessons in Tamarindo | Outsider Surf Academy',
    description:
      '1-on-1 private surf lessons in Tamarindo with a dedicated bilingual instructor. Fastest way to learn, all equipment included. Check availability.',
    keyfocus: 'private surf lessons tamarindo',
    synonyms: ['1 on 1 surf lessons tamarindo', 'private surf instructor tamarindo'],
    related: ['couples surf lessons tamarindo', 'beginner surf lessons tamarindo'],
    ogImage: '/images/hero-home.jpg',
  },

  '/semi-private-surf-lessons-tamarindo': {
    title: 'Semi-Private Surf Lessons in Tamarindo (2–3 people) | Outsider',
    description:
      'Semi-private surf lessons in Tamarindo for couples and friends. Share one instructor, keep individual corrections, at a lower price per person.',
    keyfocus: 'semi private surf lessons tamarindo',
    synonyms: ['couples surf lessons tamarindo', 'surf lessons for two tamarindo'],
    related: ['private surf lessons tamarindo', 'group surf lessons tamarindo'],
    ogImage: '/images/hero-home.jpg',
  },

  '/group-surf-lessons-tamarindo': {
    title: 'Group Surf Lessons in Tamarindo | Outsider Surf Academy',
    description:
      'Fun group surf lessons in Tamarindo — never more than 4 students per instructor. All equipment included. Great for friends and solo travelers.',
    keyfocus: 'group surf lessons tamarindo',
    synonyms: ['beginner group surf lessons tamarindo', 'cheap surf lessons tamarindo'],
    related: ['surf lessons for friends tamarindo', 'solo traveler surf lessons tamarindo'],
    ogImage: '/images/hero-home.jpg',
  },

  '/kids-surf-lessons-tamarindo': {
    title: 'Kids & Family Surf Lessons in Tamarindo | Outsider Surf Academy',
    description:
      'Safe kids surf lessons in Tamarindo from age 6, in shallow water with an instructor within arm’s reach. Parents can join the same lesson.',
    keyfocus: 'kids surf lessons tamarindo',
    synonyms: ['family surf lessons tamarindo', 'surf lessons for kids tamarindo'],
    related: ['beginner surf lessons tamarindo', 'private surf lessons tamarindo'],
    ogImage: '/images/hero-home.jpg',
  },

  '/surfboard-rentals-tamarindo': {
    title: 'Surfboard Rentals in Tamarindo | Outsider Surf Academy',
    description:
      'Quality surfboard rentals in Tamarindo — softtops, funboards and shortboards by the hour, day or week, right on Tamarindo Beach.',
    keyfocus: 'surfboard rentals tamarindo',
    synonyms: ['surf board rental tamarindo', 'rent a surfboard tamarindo'],
    related: ['surf lessons tamarindo', 'surf school tamarindo'],
    ogImage: '/images/hero-home.jpg',
  },

  '/about-outsider-surf-academy': {
    title: 'About Outsider Surf Academy | Surf School in Tamarindo',
    description:
      'Outsider Surf Academy is a small, local surf school on Tamarindo Beach. Bilingual instructors, groups capped at 4, lessons timed to the tide. Meet the team.',
    keyfocus: 'best surf school tamarindo',
    synonyms: ['surf schools tamarindo', 'top surf school tamarindo'],
    related: ['surf instructors tamarindo', 'bilingual surf instructors costa rica'],
    ogImage: '/images/hero-home.jpg',
  },

  '/book-now': {
    title: 'Book Surf Lessons in Tamarindo | Outsider Surf Academy',
    description:
      'Book your surf lesson in Tamarindo online. Pick your date and time and secure your spot in seconds. All equipment included.',
    keyfocus: 'book surf lessons tamarindo',
    synonyms: ['surf lesson booking tamarindo'],
    related: ['surf lesson prices tamarindo', 'private surf lessons tamarindo'],
    ogImage: '/images/hero-home.jpg',
  },
}

const FALLBACK_SEO: PageSEO = {
  title: 'Outsider Surf Academy | Surf School in Tamarindo, Costa Rica',
  description:
    'Bilingual local surf instructors in Tamarindo, Costa Rica. Small groups, all equipment included and real progression for every level.',
  keyfocus: 'surf school tamarindo',
  synonyms: [],
  related: [],
  ogImage: '/images/hero-home.jpg',
}

const withRoute = (path: string, overrides: Partial<PageSEO> = {}): PageSEOWithRoute => {
  const seo = { ...(SEO[path] ?? FALLBACK_SEO), ...overrides }
  return { ...seo, slug: path, image: seo.ogImage }
}

// Backward-compatible map consumed by existing Astro pages.
export const seoData: Record<string, PageSEOWithRoute> = {
  home: withRoute('/'),
  surfLessons: withRoute('/surf-lessons-tamarindo'),
  privateLessons: withRoute('/private-surf-lessons-tamarindo'),
  semiPrivateLessons: withRoute('/semi-private-surf-lessons-tamarindo'),
  groupLessons: withRoute('/group-surf-lessons-tamarindo'),
  kidsSurfLessons: withRoute('/kids-surf-lessons-tamarindo'),
  rentals: withRoute('/surfboard-rentals-tamarindo'),
  aboutUs: withRoute('/about-outsider-surf-academy'),
  bookNow: withRoute('/book-now'),
  contact: withRoute('/contact', {
    title: 'Contact Outsider Surf Academy | Tamarindo, Costa Rica',
    description:
      'Get in touch with Outsider Surf Academy in Tamarindo. Message us on WhatsApp or book your surf lesson online — we reply fast.',
    keyfocus: 'contact surf school tamarindo',
    synonyms: [],
    related: [],
  }),
  blog: withRoute('/blog', {
    title: 'Tamarindo Surf Blog | Outsider Surf Academy',
    description:
      'Surf tips, beginner guides and local advice for surfing in Tamarindo, Costa Rica, from the Outsider Surf Academy team.',
    keyfocus: 'tamarindo surf blog',
    synonyms: ['tamarindo surfing guide', 'surf tips tamarindo'],
    related: ['surf lessons tamarindo', 'surf school tamarindo'],
  }),

  // NOTE: the three inherited blog posts still carry Cocoa Beach content.
  // Rebrand or replace them; these keys keep the pages compiling for now.
  isCocoaBeachGoodForSurfing: withRoute('/blog/is-cocoa-beach-good-for-surfing'),
  beginnersGuideToSurfing: withRoute('/blog/beginners-guide-to-surfing', {
    title: "The Complete Beginner's Guide to Surfing",
    description:
      'Everything you need before your first surf lesson — the pop-up, gear, the mistakes beginners make, and why a lesson beats going it alone.',
    keyfocus: 'beginners guide to surfing',
    synonyms: ['how to start surfing', 'learn to surf guide'],
    related: ['surf lessons tamarindo'],
  }),
  surfingNearOrlando: withRoute('/blog/surfing-near-orlando'),
}

export const ROUTES = {
  HOME: '/',
  SURF_LESSONS: '/surf-lessons-tamarindo',
  PRIVATE: '/private-surf-lessons-tamarindo',
  SEMI_PRIVATE: '/semi-private-surf-lessons-tamarindo',
  GROUP: '/group-surf-lessons-tamarindo',
  KIDS: '/kids-surf-lessons-tamarindo',
  RENTALS: '/surfboard-rentals-tamarindo',
  ABOUT: '/about-outsider-surf-academy',
  CONTACT: '/contact',
  BOOK: '/book-now',
  BLOG: '/blog',
}

export function getSEO(path: string): PageSEO {
  return SEO[path] ?? FALLBACK_SEO
}
