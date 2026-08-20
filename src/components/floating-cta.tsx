'use client';

import { useState, useEffect } from 'react';

export function FloatingCTA() {
  const [showScrollTop, setShowScrollTop] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      if (window.scrollY > 400) {
        setShowScrollTop(true);
      } else {
        setShowScrollTop(false);
      }
    };

    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  return (
    <>
      {/* Floating Action Container */}
      <aside
        aria-label="빠른 진료 예약 및 문의"
        style={{
          position: 'fixed',
          bottom: '1.5rem',
          right: '1.5rem',
          zIndex: 40,
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'flex-end',
          gap: '0.75rem',
        }}
      >
        {/* Scroll To Top Button */}
        {showScrollTop && (
          <button
            onClick={scrollToTop}
            aria-label="맨 위로 이동"
            style={{
              width: '44px',
              height: '44px',
              borderRadius: 'var(--radius-full)',
              backgroundColor: '#fff',
              color: 'var(--slate-700)',
              boxShadow: 'var(--shadow-lg)',
              border: '1px solid var(--slate-200)',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              fontSize: '1.1rem',
              fontWeight: 800,
              cursor: 'pointer',
              transition: 'transform 0.2s ease',
            }}
          >
            ↑
          </button>
        )}

        {/* Quick Call & Naver Booking Pills */}
        <div style={{
          display: 'flex',
          gap: '0.5rem',
          backgroundColor: 'rgba(255, 255, 255, 0.95)',
          padding: '0.4rem',
          borderRadius: 'var(--radius-full)',
          boxShadow: 'var(--shadow-xl)',
          border: '1px solid var(--slate-200)',
          backdropFilter: 'blur(8px)',
        }}>
          <a
            href="tel:054-474-1075"
            style={{
              display: 'flex',
              alignItems: 'center',
              gap: '0.4rem',
              padding: '0.55rem 1.1rem',
              borderRadius: 'var(--radius-full)',
              backgroundColor: 'var(--primary)',
              color: '#fff',
              fontSize: '0.875rem',
              fontWeight: 700,
              boxShadow: 'var(--shadow-sm)',
            }}
          >
            <span>📞</span>
            <span>전화상담</span>
          </a>

          <a
            href="https://m.booking.naver.com/booking/6/bizes/449323"
            target="_blank"
            rel="noopener noreferrer"
            style={{
              display: 'flex',
              alignItems: 'center',
              gap: '0.4rem',
              padding: '0.55rem 1.1rem',
              borderRadius: 'var(--radius-full)',
              backgroundColor: '#03C75A',
              color: '#fff',
              fontSize: '0.875rem',
              fontWeight: 700,
              boxShadow: '0 2px 8px rgba(3, 199, 90, 0.35)',
            }}
          >
            <span style={{ fontWeight: 900 }}>N</span>
            <span>네이버 예약</span>
          </a>
        </div>
      </aside>
    </>
  );
}
