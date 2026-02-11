import { useLanguage } from '../../context/LanguageContext';
import { useContent } from '../../hooks/useContent';
import { getCTAContent } from '../../api/content';
import './CTA.css';

export default function CTA() {
  const { t } = useLanguage();
  const { data } = useContent(getCTAContent);

  if (!data) return null;

  return (
      <section className="cta">
        <h2>{t(data.title)}</h2>
        <p>{t(data.description)}</p>
        <a href={data.button.href}>
          {t(data.button)} <i className="fas fa-arrow-right" />
        </a>
      </section>
  );
}
