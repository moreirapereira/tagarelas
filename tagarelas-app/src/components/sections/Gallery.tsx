import { useState } from 'react';
import { Swiper, SwiperSlide } from 'swiper/react';
import { Navigation, Pagination, Autoplay, FreeMode } from 'swiper/modules';
import 'swiper/css';
import 'swiper/css/navigation';
import 'swiper/css/pagination';
import 'swiper/css/free-mode';
import { useContent } from '../../hooks/useContent';
import { getGalleryItems } from '../../api/content';
import { normalizePath } from '../../api/client';
import { useLanguage } from '../../context/LanguageContext';
import Lightbox from '../ui/Lightbox';
import './Gallery.css';

export default function Gallery() {
  const { lang } = useLanguage();
  const { data: items } = useContent(getGalleryItems);
  const [lightboxIndex, setLightboxIndex] = useState<number | null>(null);

  if (!items || items.length === 0) return null;

  const images = items.map((item) => normalizePath(item.image));

  return (
      <section id="galeria">
        <div className="section-header">
          <span className="section-label">
            {lang === 'en' ? 'Our Moments' : 'Os Nossos Momentos'}
          </span>
          <h2 className="section-title">
            {lang === 'en' ? 'Photo Gallery' : 'Galeria de Fotos'}
          </h2>
        </div>

        <Swiper
          modules={[Navigation, Pagination, Autoplay, FreeMode]}
          spaceBetween={16}
          slidesPerView={1.2}
          centeredSlides={false}
          freeMode={{ enabled: true, sticky: false }}
          navigation
          pagination={{ clickable: true, dynamicBullets: true }}
          autoplay={{ delay: 4000, disableOnInteraction: true, pauseOnMouseEnter: true }}
          breakpoints={{
            480: { slidesPerView: 1.5, spaceBetween: 16 },
            640: { slidesPerView: 2.2, spaceBetween: 20 },
            900: { slidesPerView: 3.2, spaceBetween: 20 },
            1200: { slidesPerView: 4, spaceBetween: 24 },
          }}
          className="gallery-swiper"
        >
          {items.map((item, idx) => (
            <SwiperSlide key={idx}>
              <div
                className="gallery-slide"
                onClick={() => setLightboxIndex(idx)}
              >
                <img
                  src={normalizePath(item.image)}
                  alt={item.title || `Foto ${idx + 1}`}
                  loading="lazy"
                />
                <div className="gallery-overlay">
                  <p>{item.title || `Foto ${idx + 1}`}</p>
                </div>
              </div>
            </SwiperSlide>
          ))}
        </Swiper>

        {lightboxIndex !== null && (
          <Lightbox
            images={images}
            initialIndex={lightboxIndex}
            onClose={() => setLightboxIndex(null)}
          />
        )}
      </section>
  );
}
