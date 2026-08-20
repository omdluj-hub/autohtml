import Link from 'next/link';

export function Header() {
  return (
    <header style={{
      position: 'sticky',
      top: 0,
      zIndex: 50,
      backgroundColor: 'rgba(255, 255, 255, 0.95)',
      backdropFilter: 'blur(12px)',
      borderBottom: '1px solid var(--slate-200)',
      boxShadow: 'var(--shadow-sm)'
    }}>
      {/* Top Banner Bar */}
      <div style={{
        backgroundColor: 'var(--slate-900)',
        color: '#fff',
        fontSize: '0.825rem',
        padding: '0.45rem 1rem',
      }}>
        <div className="container" style={{
          display: 'flex',
          justifyContent: 'space-between',
          alignItems: 'center',
          flexWrap: 'wrap',
          gap: '0.5rem'
        }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: '0.75rem' }}>
            <span style={{
              backgroundColor: 'var(--accent)',
              color: '#000',
              padding: '0.15rem 0.5rem',
              borderRadius: 'var(--radius-sm)',
              fontWeight: 700,
              fontSize: '0.75rem'
            }}>
              야간진료
            </span>
            <span style={{ color: 'var(--slate-200)' }}>
              월·화·수·금 저녁 <strong>8시 30분</strong>까지 | 입원실 365일 운영
            </span>
          </div>

          <div style={{ display: 'flex', alignItems: 'center', gap: '1.25rem', color: 'var(--slate-300)' }}>
            <span>📍 구미 인동 노블레스타워 4층</span>
            <a 
              href="tel:054-474-1075" 
              style={{ color: '#fff', fontWeight: 600, display: 'flex', alignItems: 'center', gap: '0.25rem' }}
            >
              📞 054-474-1075
            </a>
          </div>
        </div>
      </div>

      {/* Main Navigation Bar */}
      <div className="container" style={{
        display: 'flex',
        justifyContent: 'space-between',
        alignItems: 'center',
        paddingTop: '0.85rem',
        paddingBottom: '0.85rem',
      }}>
        {/* Logo */}
        <Link href="/" style={{ display: 'flex', alignItems: 'center', gap: '0.75rem' }}>
          <div style={{
            width: '42px',
            height: '42px',
            borderRadius: 'var(--radius-md)',
            background: 'linear-gradient(135deg, var(--primary) 0%, var(--secondary) 100%)',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            color: '#fff',
            fontWeight: 800,
            fontSize: '1.3rem',
            boxShadow: 'var(--shadow-md)'
          }}>
            후
          </div>
          <div>
            <div style={{ 
              fontSize: '1.35rem', 
              fontWeight: 800, 
              color: 'var(--slate-900)', 
              letterSpacing: '-0.03em',
              lineHeight: 1.15
            }}>
              후한의원 구미점
            </div>
            <div style={{ 
              fontSize: '0.75rem', 
              color: 'var(--primary)', 
              fontWeight: 600,
              letterSpacing: '0.05em'
            }}>
              HOOCLINIC GUMI MAGAZINE
            </div>
          </div>
        </Link>

        {/* Quick Actions */}
        <div style={{ display: 'flex', alignItems: 'center', gap: '0.75rem' }}>
          <a
            href="tel:054-474-1075"
            style={{
              padding: '0.55rem 1.1rem',
              borderRadius: 'var(--radius-full)',
              border: '1.5px solid var(--primary)',
              color: 'var(--primary)',
              fontSize: '0.9rem',
              fontWeight: 700,
              display: 'inline-flex',
              alignItems: 'center',
              gap: '0.4rem',
              backgroundColor: '#fff'
            }}
          >
            <span>전화상담</span>
          </a>

          <a
            href="https://m.booking.naver.com/booking/6/bizes/449323"
            target="_blank"
            rel="noopener noreferrer"
            style={{
              padding: '0.55rem 1.15rem',
              borderRadius: 'var(--radius-full)',
              backgroundColor: '#03C75A',
              color: '#fff',
              fontSize: '0.9rem',
              fontWeight: 700,
              display: 'inline-flex',
              alignItems: 'center',
              gap: '0.4rem',
              boxShadow: '0 2px 8px rgba(3, 199, 90, 0.3)'
            }}
          >
            <span style={{ fontWeight: 900 }}>N</span>
            <span>네이버 예약</span>
          </a>
        </div>
      </div>
    </header>
  );
}
