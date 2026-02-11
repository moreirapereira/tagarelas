import { useLanguage } from '../../context/LanguageContext';
import { useContent } from '../../hooks/useContent';
import { getSettingsContent } from '../../api/content';
import { SITE } from '../../config/site';
import './Footer.css';

export default function Footer() {
  const { lang } = useLanguage();
  const { data: settings } = useContent(getSettingsContent);

  const fbUrl = settings?.social.facebook || '#';
  const igUrl = settings?.social.instagram || '#';

  return (
    <footer>
      <div className="footer-brand">
        <img src={SITE.logo} alt={`${SITE.name} logotipo`} />
        <span>{SITE.name}</span>
      </div>

      <div className="footer-social">
        <a href={fbUrl} target="_blank" rel="noopener noreferrer" aria-label="Facebook">
          <i className="fab fa-facebook-f" />
        </a>
        <a href={igUrl} target="_blank" rel="noopener noreferrer" aria-label="Instagram">
          <i className="fab fa-instagram" />
        </a>
      </div>

      <p>
        {lang === 'en'
          ? `© ${new Date().getFullYear()} ${SITE.name} · Private Kindergarten`
          : `© ${new Date().getFullYear()} ${SITE.name} · Jardim de Infância Privado (Creche em breve)`}
      </p>
    </footer>
  );
}
