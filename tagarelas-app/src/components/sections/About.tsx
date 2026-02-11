import { useLanguage } from '../../context/LanguageContext';
import { useContent } from '../../hooks/useContent';
import { getAboutContent } from '../../api/content';
import { normalizePath } from '../../api/client';
import SectionHeader from '../ui/SectionHeader';
import './About.css';

export default function About() {
  const { tf, t } = useLanguage();
  const { data } = useContent(getAboutContent);

  if (!data) return null;

  return (
      <section id="sobre">
        <SectionHeader label={data.label} title={data.title} />

        <div className="about-content">
          <div className="about-text">
            <p>{t(data.text)}</p>

            <div className="about-features">
              {data.features.map((feat, i) => (
                <div className="about-feature" key={i}>
                  <i className={feat.icon} />
                  <span>{tf(feat)}</span>
                </div>
              ))}
            </div>
          </div>

          <div className="about-visual">
            <div className="about-image-grid">
              {data.images?.map((src, i) => (
                <div className="img-wrapper" key={i}>
                  <img
                    src={normalizePath(src)}
                    alt="Tagarelas à Solta"
                    loading="lazy"
                  />
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>
  );
}
