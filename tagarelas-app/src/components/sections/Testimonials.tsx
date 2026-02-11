import { useLanguage } from '../../context/LanguageContext';
import { useContent } from '../../hooks/useContent';
import { getTestimonials } from '../../api/content';
import './Testimonials.css';

export default function Testimonials() {
  const { t, lang } = useLanguage();
  const { data: testimonials } = useContent(getTestimonials);

  if (!testimonials || testimonials.length === 0) return null;

  // Get review link from first testimonial that has one
  const reviewsUrl = testimonials.find((t) => t.reviewsUrl)?.reviewsUrl;

  return (
      <section id="testemunhos">
        <div className="section-header">
          <span className="section-label">
            {lang === 'en' ? 'What They Say About Us' : 'O Que Dizem de Nós'}
          </span>
          <h2 className="section-title">
            {lang === 'en' ? 'Testimonials' : 'Testemunhos'}
          </h2>
        </div>

        <div className="testimonials-grid">
          {testimonials.map((item, i) => (
            <div className="testimonial-card" key={i}>
              <div className="testimonial-stars">
                {Array.from({ length: item.stars }, (_, j) => (
                  <i key={j} className="fas fa-star" />
                ))}
              </div>
              <p className="testimonial-text">{t(item.text)}</p>
              <div className="testimonial-author">
                <div className="testimonial-avatar">{item.avatar}</div>
                <div>
                  <div className="testimonial-name">{item.name}</div>
                  <div className="testimonial-source">
                    <i className={item.source.icon} /> {item.source.platform}
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>

        {reviewsUrl && (
          <div className="testimonials-cta">
            <a href={reviewsUrl} target="_blank" rel="noopener noreferrer">
              {lang === 'en' ? 'See more on Google' : 'Ver mais no Google'}{' '}
              <i className="fab fa-google" />
            </a>
          </div>
        )}
      </section>
  );
}
