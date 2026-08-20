import Link from 'next/link';

export function Footer() {
  return (
    <footer style={{
      backgroundColor: 'var(--slate-900)',
      color: 'var(--slate-300)',
      marginTop: '6rem',
      paddingTop: '4.5rem',
      paddingBottom: '3.5rem',
      borderTop: '1px solid var(--slate-800)',
    }}>
      <div className="container">
        <div style={{
          display: 'grid',
          gridTemplateColumns: 'repeat(auto-fit, minmax(260px, 1fr))',
          gap: '3rem',
          paddingBottom: '3.5rem',
          borderBottom: '1px solid var(--slate-800)',
        }}>
          {/* Hospital Info */}
          <div>
            <div style={{ display: 'flex', alignItems: 'center', gap: '0.75rem', marginBottom: '1.25rem' }}>
              <div style={{
                width: '36px',
                height: '36px',
                borderRadius: 'var(--radius-md)',
                backgroundColor: 'var(--primary)',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                color: '#fff',
                fontWeight: 800,
                fontSize: '1.1rem'
              }}>
                후
              </div>
              <h3 style={{ color: '#fff', fontSize: '1.35rem', fontWeight: 800 }}>후한의원 구미점</h3>
            </div>
            <p style={{ fontSize: '0.925rem', color: 'var(--slate-400)', lineHeight: '1.7', marginBottom: '1.5rem' }}>
              20년 이상 노하우의 전국 네트워크 한의원.<br />
              이언호 대표원장이 직접 상담, 압출, 1:1 맞춤 치료를 책임 진행합니다.
            </p>
            <div style={{ display: 'flex', flexDirection: 'column', gap: '0.5rem', fontSize: '0.9rem' }}>
              <p>📍 경상북도 구미시 인동가산로 9-3 노블레스타워 4층</p>
              <p>📞 대표전화: <a href="tel:054-474-1075" style={{ color: '#fff', fontWeight: 700 }}>054-474-1075</a></p>
            </div>
          </div>

          {/* Clinic Hours */}
          <div>
            <h4 style={{ color: '#fff', fontSize: '1.1rem', fontWeight: 700, marginBottom: '1.25rem' }}>진료 시간 안내</h4>
            <ul style={{ listStyle: 'none', padding: 0, fontSize: '0.9rem', display: 'flex', flexDirection: 'column', gap: '0.65rem' }}>
              <li style={{ display: 'flex', justifyContent: 'space-between' }}>
                <span style={{ color: 'var(--slate-400)' }}>월 · 화 · 수 · 금 (야간진료)</span>
                <span style={{ color: '#fff', fontWeight: 600 }}>10:30 ~ 20:30</span>
              </li>
              <li style={{ display: 'flex', justifyContent: 'space-between' }}>
                <span style={{ color: 'var(--slate-400)' }}>토요일 (점심시간 없음)</span>
                <span style={{ color: '#fff', fontWeight: 600 }}>10:00 ~ 14:00</span>
              </li>
              <li style={{ display: 'flex', justifyContent: 'space-between' }}>
                <span style={{ color: 'var(--slate-400)' }}>목요일 / 일요일 / 공휴일</span>
                <span style={{ color: 'var(--accent-rose)', fontWeight: 600 }}>외래 휴진</span>
              </li>
              <li style={{ 
                marginTop: '0.5rem',
                paddingTop: '0.75rem',
                borderTop: '1px dashed var(--slate-800)',
                color: 'var(--accent)',
                fontWeight: 600
              }}>
                ✨ 1인실 입원실은 365일 연중무휴 운영
              </li>
            </ul>
          </div>

          {/* Quick Categories & External Links */}
          <div>
            <h4 style={{ color: '#fff', fontSize: '1.1rem', fontWeight: 700, marginBottom: '1.25rem' }}>주요 진료 과목</h4>
            <div style={{ display: 'flex', flexDirection: 'column', gap: '0.6rem', fontSize: '0.9rem' }}>
              <Link href="/?category=acne" style={{ color: 'var(--slate-400)' }}>• 여드름 및 패인 흉터 복원</Link>
              <Link href="/?category=diet" style={{ color: 'var(--slate-400)' }}>• 체질 맞춤 다이어트 한약 (미감탕/비움탕)</Link>
              <Link href="/?category=skin" style={{ color: 'var(--slate-400)' }}>• 사마귀 / 쥐젖 / 안면홍조 / 지루성피부염</Link>
              <Link href="/?category=traffic" style={{ color: 'var(--slate-400)' }}>• 교통사고 후유증 및 쾌적한 1인실 입원</Link>
            </div>

            <div style={{ marginTop: '1.5rem', display: 'flex', gap: '0.75rem' }}>
              <a
                href="https://m.booking.naver.com/booking/6/bizes/449323"
                target="_blank"
                rel="noopener noreferrer"
                style={{
                  padding: '0.5rem 1rem',
                  backgroundColor: '#03C75A',
                  color: '#fff',
                  borderRadius: 'var(--radius-sm)',
                  fontSize: '0.85rem',
                  fontWeight: 700,
                  display: 'inline-block'
                }}
              >
                네이버 플레이스
              </a>
              <a
                href="tel:054-474-1075"
                style={{
                  padding: '0.5rem 1rem',
                  backgroundColor: 'var(--slate-800)',
                  color: '#fff',
                  borderRadius: 'var(--radius-sm)',
                  fontSize: '0.85rem',
                  fontWeight: 600,
                  display: 'inline-block'
                }}
              >
                전화 바로연결
              </a>
            </div>
          </div>
        </div>

        {/* Legal & Copyright */}
        <div style={{
          paddingTop: '2rem',
          display: 'flex',
          justifyContent: 'space-between',
          alignItems: 'center',
          flexWrap: 'wrap',
          gap: '1rem',
          fontSize: '0.8rem',
          color: 'var(--slate-500)'
        }}>
          <p>
            © 2026 후한의원 구미점. All rights reserved. | 본 사이트의 의료 정보는 정보 제공 및 교육 목적이며, 개별 진단과 치료는 의료진 상담을 통해 진행됩니다.
          </p>
          <p>
            경상북도 구미시 인동가산로 9-3 노블레스타워 4층 | TEL: 054-474-1075
          </p>
        </div>
      </div>
    </footer>
  );
}
