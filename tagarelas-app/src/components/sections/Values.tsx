import { useLanguage } from '../../context/LanguageContext';
import { useContent } from '../../hooks/useContent';
import { getValuesContent } from '../../api/content';
import SectionHeader from '../ui/SectionHeader';
import './Values.css';

export default function Values() {
  const { t } = useLanguage();
  const { data } = useContent(getValuesContent);

  if (!data) return null;

  return (
      <section id="valores">
        <SectionHeader label={data.label} title={data.title} />

        <div className="values-grid">
          {data.items.map((item, i) => (
            <div className="value-card" key={i}>
              <div className="value-icon">
                <i className={item.icon} />
              </div>
              <h3>{t(item.title)}</h3>
              <p>{t(item.description)}</p>
            </div>
          ))}
        </div>
      </section>
  );
}
