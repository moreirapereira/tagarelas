import { LanguageProvider } from './context/LanguageContext';
import Layout from './components/layout/Layout';
import Hero from './components/sections/Hero';
import About from './components/sections/About';
import Values from './components/sections/Values';
import Testimonials from './components/sections/Testimonials';
import Gallery from './components/sections/Gallery';
import Contact from './components/sections/Contact';
import CTA from './components/sections/CTA';
import { SECTION_ORDER } from './config/site';
import type { SectionId } from './config/site';
import type { JSX } from 'react';
import './styles/global.css';

/**
 * Section registry — maps section IDs to their components.
 * To add a new section: create the component, register it here,
 * and add it to SECTION_ORDER in config/site.ts.
 */
const SECTION_MAP: Record<SectionId, () => JSX.Element | null> = {
  hero: Hero,
  about: About,
  values: Values,
  testimonials: Testimonials,
  gallery: Gallery,
  contact: Contact,
  cta: CTA,
};

export default function App() {
  return (
    <LanguageProvider>
      <Layout>
        {SECTION_ORDER.map((id) => {
          const Section = SECTION_MAP[id];
          return <Section key={id} />;
        })}
      </Layout>
    </LanguageProvider>
  );
}
