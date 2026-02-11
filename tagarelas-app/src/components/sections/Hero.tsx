import { useLanguage } from '../../context/LanguageContext';
import { useContent } from '../../hooks/useContent';
import { getHeroContent } from '../../api/content';
import './Hero.css';

export default function Hero() {
  const { t } = useLanguage();
  const { data } = useContent(getHeroContent);

  return (
    <header id="inicio">
      <div className="hero-content">
        {data && (
          <>
            <div className="hero-info">
              <span className="hero-badge">
                <i className="fas fa-seedling" /> {t(data.badge)}
              </span>
              {data.chips.map((chip, i) => (
                <span key={i} className="hero-chip">
                  {t(chip)}
                </span>
              ))}
            </div>

            <h1>{t(data.title)}</h1>
            <p>{t(data.description)}</p>

            <a href={data.cta.href} className="hero-cta">
              {t(data.cta)} <i className="fas fa-arrow-right" />
            </a>
          </>
        )}
      </div>
    </header>
  );
}
