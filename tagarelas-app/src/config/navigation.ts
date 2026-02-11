import type { I18nText } from '../types/content';

export interface NavItem {
  id: string;
  href: string;
  label: I18nText;
}

/**
 * Navigation items — change order here to re-order the menu,
 * add new items to add new sections to the nav.
 */
export const NAV_ITEMS: NavItem[] = [
  { id: 'inicio', href: '#inicio', label: { pt: 'Início', en: 'Home' } },
  { id: 'sobre', href: '#sobre', label: { pt: 'Sobre', en: 'About' } },
  { id: 'valores', href: '#valores', label: { pt: 'Valores', en: 'Values' } },
  { id: 'testemunhos', href: '#testemunhos', label: { pt: 'Testemunhos', en: 'Testimonials' } },
  { id: 'galeria', href: '#galeria', label: { pt: 'Galeria', en: 'Gallery' } },
  { id: 'contactos', href: '#contactos', label: { pt: 'Contactos', en: 'Contact' } },
];
