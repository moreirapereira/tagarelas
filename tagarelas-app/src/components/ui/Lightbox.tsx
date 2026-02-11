import { useState, useCallback, useEffect } from 'react';
import './Lightbox.css';

interface LightboxProps {
  images: string[];
  initialIndex: number;
  onClose: () => void;
}

export default function Lightbox({ images, initialIndex, onClose }: LightboxProps) {
  const [currentIndex, setCurrentIndex] = useState(initialIndex);

  const navigate = useCallback(
    (direction: number) => {
      setCurrentIndex((prev) => {
        let next = prev + direction;
        if (next < 0) next = images.length - 1;
        if (next >= images.length) next = 0;
        return next;
      });
    },
    [images.length],
  );

  useEffect(() => {
    const handleKey = (e: KeyboardEvent) => {
      if (e.key === 'Escape') onClose();
      if (e.key === 'ArrowLeft') navigate(-1);
      if (e.key === 'ArrowRight') navigate(1);
    };

    document.body.style.overflow = 'hidden';
    window.addEventListener('keydown', handleKey);

    return () => {
      document.body.style.overflow = '';
      window.removeEventListener('keydown', handleKey);
    };
  }, [onClose, navigate]);

  return (
    <div className="lightbox active" onClick={(e) => e.target === e.currentTarget && onClose()}>
      <button className="lightbox-close" onClick={onClose} aria-label="Close">
        <i className="fas fa-xmark" />
      </button>
      <button className="lightbox-nav lightbox-prev" onClick={() => navigate(-1)} aria-label="Previous">
        <i className="fas fa-chevron-left" />
      </button>
      <img src={images[currentIndex]} alt="Gallery" />
      <button className="lightbox-nav lightbox-next" onClick={() => navigate(1)} aria-label="Next">
        <i className="fas fa-chevron-right" />
      </button>
    </div>
  );
}
