import type { I18nText } from '../../types/content';
import { useLanguage } from '../../context/LanguageContext';
import './SectionHeader.css';

interface SectionHeaderProps {
  label: I18nText;
  title: I18nText;
}

export default function SectionHeader({ label, title }: SectionHeaderProps) {
  const { t } = useLanguage();

  return (
    <div className="section-header">
      <span className="section-label">{t(label)}</span>
      <h2 className="section-title">{t(title)}</h2>
    </div>
  );
}
