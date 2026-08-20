import { Metadata } from 'next';
import { notFound } from 'next/navigation';
import Link from 'next/link';
import { getPostBySlug, getAllPosts, getRelatedPosts } from '@/lib/posts';
import { PostCard } from '@/components/post-card';

interface PostPageProps {
  params: Promise<{ slug: string }>;
}

export async function generateStaticParams() {
  const posts = await getAllPosts();
  return posts.map((post) => ({
    slug: post.slug,
  }));
}

export async function generateMetadata({ params }: PostPageProps): Promise<Metadata> {
  const { slug } = await params;
  const post = await getPostBySlug(slug);

  if (!post) {
    return {
      title: '페이지를 찾을 수 없습니다 | 후한의원 구미점',
    };
  }

  return {
    title: post.title,
    description: post.description,
    openGraph: {
      title: post.title,
      description: post.description,
      type: 'article',
      publishedTime: post.date,
      authors: ['후한의원 구미점 이언호 원장'],
      images: [
        {
          url: post.thumbnail,
          alt: post.title,
        },
      ],
    },
  };
}

export default async function PostPage({ params }: PostPageProps) {
  const { slug } = await params;
  const post = await getPostBySlug(slug);

  if (!post) {
    notFound();
  }

  const relatedPosts = await getRelatedPosts(slug, post.category.id, 3);

  return (
    <div style={{ backgroundColor: '#fff', paddingBottom: '6rem' }}>
      {/* Breadcrumb Header */}
      <div style={{
        backgroundColor: 'var(--slate-50)',
        borderBottom: '1px solid var(--slate-200)',
        padding: '1.25rem 0'
      }}>
        <div className="container-narrow" style={{
          display: 'flex',
          alignItems: 'center',
          gap: '0.5rem',
          fontSize: '0.85rem',
          color: 'var(--slate-500)',
          flexWrap: 'wrap'
        }}>
          <Link href="/" style={{ color: 'var(--slate-600)', fontWeight: 500 }}>홈</Link>
          <span>›</span>
          <Link href={`/?category=${post.category.id}`} style={{ color: post.category.badgeColor, fontWeight: 700 }}>
            {post.category.name}
          </Link>
          <span>›</span>
          <span style={{ color: 'var(--slate-400)', whiteSpace: 'nowrap', overflow: 'hidden', textOverflow: 'ellipsis', maxWidth: '300px' }}>
            {post.title}
          </span>
        </div>
      </div>

      <article className="container-narrow" style={{ paddingTop: '3.5rem' }}>
        {/* Article Header */}
        <header style={{
          marginBottom: '3.5rem',
          paddingBottom: '2.5rem',
          borderBottom: '1px solid var(--slate-200)'
        }}>
          {/* Category & Metadata */}
          <div style={{
            display: 'flex',
            alignItems: 'center',
            gap: '0.75rem',
            marginBottom: '1.25rem',
            flexWrap: 'wrap'
          }}>
            <span style={{
              display: 'inline-block',
              padding: '0.3rem 0.8rem',
              borderRadius: 'var(--radius-full)',
              backgroundColor: post.category.badgeBg,
              color: post.category.badgeColor,
              fontWeight: 800,
              fontSize: '0.825rem'
            }}>
              {post.category.name}
            </span>

            <time dateTime={post.date} style={{ color: 'var(--slate-500)', fontSize: '0.9rem' }}>
              {post.date}
            </time>

            <span style={{ color: 'var(--slate-300)' }}>•</span>

            <span style={{ color: 'var(--slate-500)', fontSize: '0.9rem' }}>
              약 {post.readingTime}분 분량
            </span>
          </div>

          {/* Main Title */}
          <h1 style={{
            fontSize: 'clamp(1.85rem, 3.5vw, 2.5rem)',
            fontWeight: 800,
            lineHeight: 1.3,
            color: 'var(--slate-900)',
            letterSpacing: '-0.025em',
            wordBreak: 'keep-all',
            marginBottom: '1.5rem'
          }}>
            {post.title}
          </h1>

          {/* Author / Clinic Profile Bar */}
          <div style={{
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'space-between',
            flexWrap: 'wrap',
            gap: '1rem',
            padding: '1rem 1.25rem',
            backgroundColor: 'var(--slate-50)',
            borderRadius: 'var(--radius-md)',
            border: '1px solid var(--slate-200)'
          }}>
            <div style={{ display: 'flex', alignItems: 'center', gap: '0.85rem' }}>
              <div style={{
                width: '44px',
                height: '44px',
                borderRadius: '50%',
                backgroundColor: 'var(--primary)',
                color: '#fff',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                fontWeight: 800,
                fontSize: '1.1rem'
              }}>
                후
              </div>
              <div>
                <div style={{ fontWeight: 700, color: 'var(--slate-900)', fontSize: '0.95rem' }}>
                  이언호 대표원장 <span style={{ fontWeight: 400, color: 'var(--slate-500)', fontSize: '0.85rem' }}>| 직접 시술 및 1:1 책임진료</span>
                </div>
                <div style={{ fontSize: '0.8rem', color: 'var(--slate-500)' }}>
                  후한의원 구미점 (경북 구미시 인동가산로 9-3)
                </div>
              </div>
            </div>

            <a
              href="https://m.booking.naver.com/booking/6/bizes/449323"
              target="_blank"
              rel="noopener noreferrer"
              style={{
                padding: '0.45rem 0.95rem',
                backgroundColor: '#03C75A',
                color: '#fff',
                borderRadius: 'var(--radius-full)',
                fontSize: '0.825rem',
                fontWeight: 700,
                boxShadow: '0 2px 6px rgba(3, 199, 90, 0.3)'
              }}
            >
              N 네이버 예약하기
            </a>
          </div>
        </header>

        {/* Markdown Rendered Content */}
        <div
          className="blog-content"
          dangerouslySetInnerHTML={{ __html: post.content }}
        />

        {/* Doctor Consultation CTA Callout Card */}
        <section style={{
          marginTop: '5rem',
          padding: '2.5rem',
          backgroundColor: 'var(--primary-light)',
          borderRadius: 'var(--radius-xl)',
          border: '1.5px solid var(--primary-border)',
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'center',
          textAlign: 'center',
          boxShadow: 'var(--shadow-sm)'
        }}>
          <div style={{
            width: '56px',
            height: '56px',
            borderRadius: '50%',
            backgroundColor: 'var(--primary)',
            color: '#fff',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            fontSize: '1.75rem',
            marginBottom: '1.25rem'
          }}>
            🌿
          </div>
          <h3 style={{ fontSize: '1.5rem', fontWeight: 800, color: 'var(--primary-hover)', marginBottom: '0.75rem' }}>
            후한의원 구미점에서 내 몸에 맞는 맞춤 치료를 시작하세요
          </h3>
          <p style={{ color: 'var(--slate-600)', fontSize: '1rem', maxWidth: '600px', lineHeight: 1.6, marginBottom: '1.75rem', wordBreak: 'keep-all' }}>
            여드름, 흉터, 다이어트, 난치성 피부 질환, 교통사고 후유증까지 20년 노하우로 이언호 대표원장이 직접 상담하고 치료합니다.
          </p>
          <div style={{ display: 'flex', gap: '0.75rem', flexWrap: 'wrap', justifyContent: 'center' }}>
            <a
              href="tel:054-474-1075"
              style={{
                padding: '0.75rem 1.6rem',
                backgroundColor: 'var(--primary)',
                color: '#fff',
                borderRadius: 'var(--radius-full)',
                fontWeight: 700,
                fontSize: '0.95rem',
                boxShadow: 'var(--shadow-md)',
                display: 'inline-flex',
                alignItems: 'center',
                gap: '0.4rem'
              }}
            >
              <span>📞</span>
              <span>전화 상담하기 (054-474-1075)</span>
            </a>
            <a
              href="https://m.booking.naver.com/booking/6/bizes/449323"
              target="_blank"
              rel="noopener noreferrer"
              style={{
                padding: '0.75rem 1.6rem',
                backgroundColor: '#03C75A',
                color: '#fff',
                borderRadius: 'var(--radius-full)',
                fontWeight: 700,
                fontSize: '0.95rem',
                boxShadow: '0 4px 12px rgba(3, 199, 90, 0.35)',
                display: 'inline-flex',
                alignItems: 'center',
                gap: '0.4rem'
              }}
            >
              <span style={{ fontWeight: 900 }}>N</span>
              <span>네이버 플레이스 바로예약</span>
            </a>
          </div>
        </section>

        {/* Location & Clinic Information Section */}
        <section style={{ marginTop: '5rem' }}>
          <div style={{ textAlign: 'center', marginBottom: '2rem' }}>
            <h2 style={{ fontSize: '1.6rem', fontWeight: 800, color: 'var(--slate-900)', borderBottom: 'none', padding: 0, margin: 0, justifyContent: 'center' }}>
              📍 후한의원 구미점 오시는 길
            </h2>
            <p style={{ color: 'var(--slate-500)', fontSize: '0.925rem', marginTop: '0.4rem' }}>
              구미 인동 중심지 노블레스타워 4층에 위치하고 있습니다.
            </p>
          </div>

          {/* Quick Map Action Buttons */}
          <div style={{
            display: 'flex',
            justifyContent: 'center',
            gap: '0.75rem',
            marginBottom: '1rem',
            flexWrap: 'wrap'
          }}>
            <a
              href="https://map.naver.com/p/search/%EA%B2%BD%EC%83%81%EB%B6%81%EB%8F%84%20%EA%B5%AC%EB%AF%B8%EC%8B%9C%20%EC%9D%B8%EB%8F%99%EA%B0%80%EC%82%B0%EB%A1%9C%209-3"
              target="_blank"
              rel="noopener noreferrer"
              style={{
                padding: '0.5rem 1.1rem',
                backgroundColor: '#03C75A',
                color: '#fff',
                borderRadius: 'var(--radius-full)',
                fontSize: '0.85rem',
                fontWeight: 700,
                display: 'inline-flex',
                alignItems: 'center',
                gap: '0.35rem',
                boxShadow: 'var(--shadow-sm)'
              }}
            >
              <span>N</span>
              <span>네이버 지도로 보기</span>
            </a>
            <a
              href="https://map.kakao.com/link/search/%EA%B2%BD%EC%83%81%EB%B6%81%EB%8F%84%20%EA%B5%AC%EB%AF%B8%EC%8B%9C%20%EC%9D%B8%EB%8F%99%EA%B0%80%EC%82%B0%EB%A1%9C%209-3"
              target="_blank"
              rel="noopener noreferrer"
              style={{
                padding: '0.5rem 1.1rem',
                backgroundColor: '#FEE500',
                color: '#191919',
                borderRadius: 'var(--radius-full)',
                fontSize: '0.85rem',
                fontWeight: 700,
                display: 'inline-flex',
                alignItems: 'center',
                gap: '0.35rem',
                boxShadow: 'var(--shadow-sm)'
              }}
            >
              <span>📍</span>
              <span>카카오맵으로 보기</span>
            </a>
          </div>

          {/* Official Google Maps Embed with Place ID */}
          <div style={{
            width: '100%',
            height: '420px',
            backgroundColor: 'var(--slate-100)',
            borderRadius: 'var(--radius-lg)',
            overflow: 'hidden',
            marginBottom: '1.5rem',
            border: '1px solid var(--slate-200)',
            boxShadow: 'var(--shadow-md)'
          }}>
            <iframe
              title="후한의원 구미점 지도"
              src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3227.289475984752!2d128.40441207632646!3d36.11584300560032!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x3565c4124f92d7c1%3A0xf358296c2e9f65f2!2z7ZuE7ZWc7J2Y7JuQ!5e0!3m2!1sko!2skr!4v1787215836735!5m2!1sko!2skr"
              width="100%"
              height="100%"
              style={{ border: 0 }}
              allowFullScreen={true}
              loading="lazy"
              referrerPolicy="no-referrer-when-downgrade"
            ></iframe>
          </div>

          {/* Clinic Details Grid */}
          <div style={{
            padding: '2rem',
            backgroundColor: 'var(--slate-900)',
            color: '#fff',
            borderRadius: 'var(--radius-lg)',
            display: 'grid',
            gridTemplateColumns: 'repeat(auto-fit, minmax(220px, 1fr))',
            gap: '1.75rem',
            boxShadow: 'var(--shadow-lg)'
          }}>
            <div>
              <h4 style={{ margin: '0 0 0.75rem 0', color: 'var(--primary-light)', fontSize: '1.05rem', fontWeight: 700 }}>
                📞 대표 전화 & 예약
              </h4>
              <p style={{ margin: '0.2rem 0', color: '#fff', fontSize: '1.25rem', fontWeight: 800 }}>
                054-474-1075
              </p>
              <p style={{ margin: '0.4rem 0 0 0', color: 'var(--slate-400)', fontSize: '0.85rem' }}>
                전화 예약 및 문의가 가능합니다.
              </p>
            </div>

            <div>
              <h4 style={{ margin: '0 0 0.75rem 0', color: 'var(--primary-light)', fontSize: '1.05rem', fontWeight: 700 }}>
                📍 병원 주소
              </h4>
              <p style={{ margin: '0.2rem 0', color: '#fff', fontSize: '0.95rem', fontWeight: 600 }}>
                경상북도 구미시 인동가산로 9-3
              </p>
              <p style={{ margin: '0.2rem 0', color: 'var(--slate-300)', fontSize: '0.875rem' }}>
                노블레스타워 4층 (인동 황상동)
              </p>
            </div>

            <div>
              <h4 style={{ margin: '0 0 0.75rem 0', color: 'var(--accent)', fontSize: '1.05rem', fontWeight: 700 }}>
                ⏰ 야간진료 안내
              </h4>
              <p style={{ margin: '0.2rem 0', color: '#fff', fontSize: '0.9rem' }}>
                월·화·수·금: 10:30 ~ 20:30
              </p>
              <p style={{ margin: '0.2rem 0', color: '#fff', fontSize: '0.9rem' }}>
                토요일: 10:00 ~ 14:00 (점심無)
              </p>
              <p style={{ margin: '0.4rem 0 0 0', color: 'var(--accent)', fontSize: '0.8rem', fontWeight: 700 }}>
                ✨ 1인실 입원실 365일 연중무휴
              </p>
            </div>
          </div>
        </section>

        {/* Back to List Navigation */}
        <div style={{
          marginTop: '4rem',
          paddingTop: '2rem',
          borderTop: '1px solid var(--slate-200)',
          display: 'flex',
          justifyContent: 'center'
        }}>
          <Link
            href={`/?category=${post.category.id}`}
            style={{
              padding: '0.75rem 1.75rem',
              backgroundColor: 'var(--slate-100)',
              color: 'var(--slate-800)',
              borderRadius: 'var(--radius-full)',
              fontWeight: 700,
              fontSize: '0.95rem',
              border: '1px solid var(--slate-200)',
              display: 'inline-flex',
              alignItems: 'center',
              gap: '0.5rem'
            }}
          >
            <span>←</span>
            <span>{post.category.name} 전체 글 목록으로</span>
          </Link>
        </div>

        {/* Related Posts Section */}
        {relatedPosts.length > 0 && (
          <section style={{ marginTop: '5rem' }}>
            <div style={{
              display: 'flex',
              justifyContent: 'space-between',
              alignItems: 'flex-end',
              marginBottom: '1.75rem'
            }}>
              <div>
                <h3 style={{ fontSize: '1.4rem', fontWeight: 800, color: 'var(--slate-900)' }}>
                  '{post.category.name}' 관련 다른 글
                </h3>
                <p style={{ fontSize: '0.9rem', color: 'var(--slate-500)', marginTop: '0.25rem' }}>
                  함께 읽어보시면 좋은 후한의원 구미점의 추천 칼럼입니다.
                </p>
              </div>
              <Link
                href={`/?category=${post.category.id}`}
                style={{ fontSize: '0.875rem', fontWeight: 700, color: 'var(--primary)' }}
              >
                더보기 →
              </Link>
            </div>

            <div style={{
              display: 'grid',
              gridTemplateColumns: 'repeat(auto-fit, minmax(250px, 1fr))',
              gap: '1.5rem',
            }}>
              {relatedPosts.map((relatedPost) => (
                <PostCard key={relatedPost.slug} post={relatedPost} />
              ))}
            </div>
          </section>
        )}
      </article>
    </div>
  );
}
