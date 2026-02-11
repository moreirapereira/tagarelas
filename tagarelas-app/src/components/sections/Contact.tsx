import { useLanguage } from '../../context/LanguageContext';
import { useContent } from '../../hooks/useContent';
import { getSettingsContent } from '../../api/content';
import './Contact.css';

export default function Contact() {
  const { lang, t } = useLanguage();
  const { data } = useContent(getSettingsContent);

  if (!data) return null;

  return (
      <section id="contactos">
        <div className="section-header">
          <span className="section-label">
            {lang === 'en' ? 'Get In Touch' : 'Fale Connosco'}
          </span>
          <h2 className="section-title">
            {lang === 'en' ? 'Contact' : 'Contactos'}
          </h2>
        </div>

        <div className="contact-grid">
          <div className="contact-info">
            <div className="contact-item">
              <div className="contact-icon">
                <i className="fas fa-location-dot" />
              </div>
              <div>
                <div className="contact-label">
                  {lang === 'en' ? 'Address' : 'Morada'}
                </div>
                <div className="contact-value">{data.address}</div>
              </div>
            </div>

            <div className="contact-item">
              <div className="contact-icon">
                <i className="fas fa-phone" />
              </div>
              <div>
                <div className="contact-label">
                  {lang === 'en' ? 'Phone' : 'Telefone'}
                </div>
                <div className="contact-value">
                  <a href={`tel:${data.phone.replace(/\s/g, '')}`}>
                    {data.phone}
                  </a>
                </div>
              </div>
            </div>

            <div className="contact-item">
              <div className="contact-icon">
                <i className="fas fa-clock" />
              </div>
              <div>
                <div className="contact-label">
                  {lang === 'en' ? 'Hours' : 'Horário'}
                </div>
                <div className="contact-value">{t(data.hours)}</div>
              </div>
            </div>

            <div className="contact-item">
              <div className="contact-icon">
                <i className="fas fa-envelope" />
              </div>
              <div>
                <div className="contact-label">Email</div>
                <div className="contact-value">
                  <a href={`mailto:${data.email}`}>{data.email}</a>
                </div>
              </div>
            </div>

            <div className="social-links">
              <a
                href={data.social.facebook}
                target="_blank"
                rel="noopener noreferrer"
                aria-label="Facebook"
              >
                <i className="fab fa-facebook-f" />
              </a>
              <a
                href={data.social.instagram}
                target="_blank"
                rel="noopener noreferrer"
                aria-label="Instagram"
              >
                <i className="fab fa-instagram" />
              </a>
            </div>
          </div>

          <div className="map-wrapper">
            <iframe
              src={data.mapEmbed}
              width="600"
              height="450"
              style={{ border: 0 }}
              allowFullScreen
              loading="lazy"
              referrerPolicy="no-referrer-when-downgrade"
              title="Google Maps"
            />
          </div>
        </div>
      </section>
  );
}
