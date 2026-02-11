/**
 * Site-wide metadata & SEO defaults.
 * Centralised so you only update in one place.
 */
export const SITE = {
  name: 'Tagarelas à Solta',
  url: 'https://tagarelasasolta.pt/',
  logo: 'img/logo.png',
  background: 'img/background.jpg',
  description: {
    pt: 'Jardim de Infância de referência em Póvoa de Santa Iria, Lisboa. Educação pré-escolar dos 3 aos 6 anos com amor, segurança e alegria.',
    en: 'Leading Kindergarten in Póvoa de Santa Iria, Lisbon. Pre-school education ages 3 to 6 with love, safety and joy.',
  },
  headerBrandColor: '#059099',
};

/**
 * Controls session ordering — rearrange this array
 * to change the order of page sections.
 */
export type SectionId =
  | 'hero'
  | 'about'
  | 'values'
  | 'testimonials'
  | 'gallery'
  | 'contact'
  | 'cta';

export const SECTION_ORDER: SectionId[] = [
  'hero',
  'about',
  'values',
  'testimonials',
  'gallery',
  'contact',
  'cta',
];
