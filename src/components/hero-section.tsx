import Link from 'next/link';
import { CATEGORIES } from '@/lib/posts';

interface HeroSectionProps {
  activeCategory: string;
  categoryCounts: Record<string, number>;
}

export function HeroSection({ activeCategory, categoryCounts }: HeroSectionProps) {
  return (
    <section style={{
      background: 'linear-gradient(180deg, #F0FDFA 0%, #F8FAFC 100%)',
      paddingTop: '3.5rem',
      paddingBottom: '3.5rem',
      borderBottom: '1px solid var(--slate-200)',
      marginBottom: '3rem'
    }}>
      <div className="container">
        {/* Main Title Banner */}
        <div style={{ textAlign: 'center', maxWidth: '820px', margin: '0 auto 3rem auto' }}>
          <div style={{
            display: 'inline-flex',
            alignItems: 'center',
            gap: '0.5rem',
            padding: '0.4rem 1rem',
            backgroundColor: '#fff',
            borderRadius: 'var(--radius-full)',
            border: '1px solid var(--primary-border)',
            boxShadow: 'var(--shadow-sm)',
            fontSize: '0.875rem',
            fontWeight: 700,
            color: 'var(--primary)',
            marginBottom: '1.25rem'
          }}>
            <span style={{ display: 'inline-block', width: '8px', height: '8px', borderRadius: '50%', backgroundColor: 'var(--primary)' }}></span>
            20년 노하우 네트워크 · 이언호 대표원장 직접 책임 진료
          </div>

          <h1 style={{
            fontSize: 'clamp(2rem, 4vw, 2.75rem)',
            fontWeight: 800,
            color: 'var(--slate-900)',
            lineHeight: 1.25,
            letterSpacing: '-0.03em',
            marginBottom: '1.25rem'
          }}>
            구미 피부 · 한방 다이어트 · 1인실 입원실<br />
            <span style={{ color: 'var(--primary)' }}>후한의원 구미점</span> 공식 건강 매거진
          </h1>

          <p style={{
            fontSize: '1.1rem',
            color: 'var(--slate-600)',
            lineHeight: 1.7,
            wordBreak: 'keep-all'
          }}>
            여드름 흉터 복원부터 체질 맞춤 다이어트 한약, 난치성 피부 질환, 교통사고 입원 치료까지<br />
            매일 업데이트되는 전문 의료진의 건강 지식과 치료 가이드를 만나보세요.
          </p>
        </div>

        {/* 4 Feature Cards */}
        <div style={{
          display: 'grid',
          gridTemplateColumns: 'repeat(auto-fit, minmax(230px, 1fr))',
          gap: '1.25rem',
        }}>
          {/* Acne */}
          <Link
            href="/?category=acne"
            className="card-hover-effect"
            style={{
              backgroundColor: '#fff',
              padding: '1.5rem',
              borderRadius: 'var(--radius-lg)',
              border: activeCategory === 'acne' ? '2px solid var(--accent-rose)' : '1px solid var(--slate-200)',
              boxShadow: 'var(--shadow-sm)',
              display: 'flex',
              flexDirection: 'column',
              justifyContent: 'space-between',
            }}
          >
            <div>
              <div style={{
                display: 'inline-flex',
                alignItems: 'center',
                justifyContent: 'center',
                width: '40px',
                height: '40px',
                borderRadius: 'var(--radius-md)',
                backgroundColor: CATEGORIES.acne.badgeBg,
                color: CATEGORIES.acne.badgeColor,
                fontSize: '1.25rem',
                marginBottom: '1rem'
              }}>
                ✨
              </div>
              <h3 style={{ fontSize: '1.15rem', fontWeight: 700, color: 'var(--slate-900)', marginBottom: '0.4rem' }}>
                여드름 · 흉터 복원
              </h3>
              <p style={{ fontSize: '0.875rem', color: 'var(--slate-600)', lineHeight: 1.5 }}>
                화농성·좁쌀 여드름 압출, 붉은 자국 및 패인 흉터 복원 치료
              </p>
            </div>
            <div style={{ marginTop: '1.25rem', fontSize: '0.8rem', fontWeight: 700, color: CATEGORIES.acne.badgeColor, display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
              <span>포스트 {categoryCounts.acne || 0}편</span>
              <span>보기 →</span>
            </div>
          </Link>

          {/* Diet */}
          <Link
            href="/?category=diet"
            className="card-hover-effect"
            style={{
              backgroundColor: '#fff',
              padding: '1.5rem',
              borderRadius: 'var(--radius-lg)',
              border: activeCategory === 'diet' ? '2px solid var(--primary)' : '1px solid var(--slate-200)',
              boxShadow: 'var(--shadow-sm)',
              display: 'flex',
              flexDirection: 'column',
              justifyContent: 'space-between',
            }}
          >
            <div>
              <div style={{
                display: 'inline-flex',
                alignItems: 'center',
                justifyContent: 'center',
                width: '40px',
                height: '40px',
                borderRadius: 'var(--radius-md)',
                backgroundColor: CATEGORIES.diet.badgeBg,
                color: CATEGORIES.diet.badgeColor,
                fontSize: '1.25rem',
                marginBottom: '1rem'
              }}>
                🌿
              </div>
              <h3 style={{ fontSize: '1.15rem', fontWeight: 700, color: 'var(--slate-900)', marginBottom: '0.4rem' }}>
                체질 맞춤 다이어트
              </h3>
              <p style={{ fontSize: '0.875rem', color: 'var(--slate-600)', lineHeight: 1.5 }}>
                요요 없는 감량, 미감탕·비움탕·다요스틱 1:1 맞춤 한약 처방
              </p>
            </div>
            <div style={{ marginTop: '1.25rem', fontSize: '0.8rem', fontWeight: 700, color: CATEGORIES.diet.badgeColor, display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
              <span>포스트 {categoryCounts.diet || 0}편</span>
              <span>보기 →</span>
            </div>
          </Link>

          {/* Skin */}
          <Link
            href="/?category=skin"
            className="card-hover-effect"
            style={{
              backgroundColor: '#fff',
              padding: '1.5rem',
              borderRadius: 'var(--radius-lg)',
              border: activeCategory === 'skin' ? '2px solid #7C3AED' : '1px solid var(--slate-200)',
              boxShadow: 'var(--shadow-sm)',
              display: 'flex',
              flexDirection: 'column',
              justifyContent: 'space-between',
            }}
          >
            <div>
              <div style={{
                display: 'inline-flex',
                alignItems: 'center',
                justifyContent: 'center',
                width: '40px',
                height: '40px',
                borderRadius: 'var(--radius-md)',
                backgroundColor: CATEGORIES.skin.badgeBg,
                color: CATEGORIES.skin.badgeColor,
                fontSize: '1.25rem',
                marginBottom: '1rem'
              }}>
                🌸
              </div>
              <h3 style={{ fontSize: '1.15rem', fontWeight: 700, color: 'var(--slate-900)', marginBottom: '0.4rem' }}>
                난치성 피부 질환
              </h3>
              <p style={{ fontSize: '0.875rem', color: 'var(--slate-600)', lineHeight: 1.5 }}>
                사마귀·쥐젖 저자극 제거, 안면홍조, 지루성피부염, 아토피
              </p>
            </div>
            <div style={{ marginTop: '1.25rem', fontSize: '0.8rem', fontWeight: 700, color: CATEGORIES.skin.badgeColor, display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
              <span>포스트 {categoryCounts.skin || 0}편</span>
              <span>보기 →</span>
            </div>
          </Link>

          {/* Traffic / Hospitalization */}
          <Link
            href="/?category=traffic"
            className="card-hover-effect"
            style={{
              backgroundColor: '#fff',
              padding: '1.5rem',
              borderRadius: 'var(--radius-lg)',
              border: activeCategory === 'traffic' ? '2px solid var(--accent)' : '1px solid var(--slate-200)',
              boxShadow: 'var(--shadow-sm)',
              display: 'flex',
              flexDirection: 'column',
              justifyContent: 'space-between',
            }}
          >
            <div>
              <div style={{
                display: 'inline-flex',
                alignItems: 'center',
                justifyContent: 'center',
                width: '40px',
                height: '40px',
                borderRadius: 'var(--radius-md)',
                backgroundColor: CATEGORIES.traffic.badgeBg,
                color: CATEGORIES.traffic.badgeColor,
                fontSize: '1.25rem',
                marginBottom: '1rem'
              }}>
                🏥
              </div>
              <h3 style={{ fontSize: '1.15rem', fontWeight: 700, color: 'var(--slate-900)', marginBottom: '0.4rem' }}>
                교통사고 · 1인실 입원
              </h3>
              <p style={{ fontSize: '0.875rem', color: 'var(--slate-600)', lineHeight: 1.5 }}>
                365일 연중무휴 입원실 운영, 후유증 집중 한방 치료
              </p>
            </div>
            <div style={{ marginTop: '1.25rem', fontSize: '0.8rem', fontWeight: 700, color: CATEGORIES.traffic.badgeColor, display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
              <span>포스트 {categoryCounts.traffic || 0}편</span>
              <span>보기 →</span>
            </div>
          </Link>
        </div>
      </div>
    </section>
  );
}
