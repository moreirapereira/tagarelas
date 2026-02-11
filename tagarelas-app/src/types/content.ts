// ===== Internationalized text (PT/EN) =====
export interface I18nText {
  pt: string;
  en: string;
}

// ===== Hero Section =====
export interface HeroContent {
  badge: I18nText;
  chips: I18nText[];
  title: I18nText;
  description: I18nText;
  cta: I18nText & { href: string };
}

// ===== About Section =====
export interface AboutFeature {
  icon: string;
  pt: string;
  en: string;
}

export interface AboutContent {
  label: I18nText;
  title: I18nText;
  text: I18nText;
  features: AboutFeature[];
  images: string[];
}

// ===== Values Section =====
export interface ValueItem {
  icon: string;
  title: I18nText;
  description: I18nText;
}

export interface ValuesContent {
  label: I18nText;
  title: I18nText;
  items: ValueItem[];
}

// ===== CTA Section =====
export interface CTAContent {
  title: I18nText;
  description: I18nText;
  button: I18nText & { href: string };
}

// ===== Settings (Contact / Site Info) =====
export interface SettingsContent {
  address: string;
  phone: string;
  email: string;
  hours: I18nText;
  social: {
    facebook: string;
    instagram: string;
  };
  mapEmbed: string;
}

// ===== Gallery =====
export interface GalleryItem {
  title: string;
  image: string;
  order: number;
  visible: boolean;
}

// ===== Testimonials =====
export interface TestimonialItem {
  name: string;
  order: number;
  stars: number;
  text: I18nText;
  avatar: string;
  source: {
    platform: string;
    icon: string;
  };
  reviewsUrl?: string;
}

// ===== Language =====
export type Language = 'pt' | 'en';
