import { useState, useEffect, useCallback } from 'react';
import { useLanguage } from '../../context/LanguageContext';
import { NAV_ITEMS } from '../../config/navigation';
import { SITE } from '../../config/site';
import './Navbar.css';

export default function Navbar() {
  const { lang, setLang, t } = useLanguage();
  const [scrolled, setScrolled] = useState(false);
  const [mobileOpen, setMobileOpen] = useState(false);
  const [langMenuOpen, setLangMenuOpen] = useState(false);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 50);
    window.addEventListener('scroll', onScroll, { passive: true });
    return () => window.removeEventListener('scroll', onScroll);
  }, []);

  const closeMobile = useCallback(() => {
    setMobileOpen(false);
    document.body.style.overflow = '';
  }, []);

  const toggleMobile = () => {
    setMobileOpen((prev) => {
      document.body.style.overflow = prev ? '' : 'hidden';
      return !prev;
    });
  };

  const handleLangSelect = (newLang: 'pt' | 'en') => {
    setLang(newLang);
    setLangMenuOpen(false);
  };

  return (
    <>
      <nav className={scrolled ? 'scrolled' : ''}>
        <a href="#inicio" className="nav-brand" onClick={closeMobile}>
          <img
            src={SITE.logo}
            alt={`${SITE.name} logotipo`}
            className="logo"
          />
          <span
            className="header-text"
            style={{ color: SITE.headerBrandColor }}
          >
            {SITE.name}
          </span>
        </a>

        <div className={`nav-links ${mobileOpen ? 'open' : ''}`}>
          {NAV_ITEMS.map((item) => (
            <a key={item.id} href={item.href} onClick={closeMobile}>
              {t(item.label)}
            </a>
          ))}

          {/* Language dropdown */}
          <div className="nav-lang-dropdown">
            <button
              className="nav-lang-toggle"
              onClick={(e) => {
                e.stopPropagation();
                setLangMenuOpen((v) => !v);
              }}
            >
              <i className="fas fa-globe" />
              <span>{lang === 'pt' ? 'PT' : 'EN'}</span>
              <i className="fas fa-chevron-down" />
            </button>

            {langMenuOpen && (
              <div className="nav-lang-menu open">
                <button
                  className="lang-option"
                  onClick={() => handleLangSelect('pt')}
                >
                  🇵🇹 Português
                </button>
                <button
                  className="lang-option"
                  onClick={() => handleLangSelect('en')}
                >
                  🇬🇧 English
                </button>
              </div>
            )}
          </div>
        </div>

        <button
          className={`menu-toggle ${mobileOpen ? 'active' : ''}`}
          onClick={toggleMobile}
          aria-label="Toggle menu"
        >
          <span />
          <span />
          <span />
        </button>
      </nav>

      {/* Overlay for mobile menu */}
      {mobileOpen && (
        <div className="nav-overlay active" onClick={closeMobile} />
      )}
    </>
  );
}
