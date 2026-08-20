import Link from 'next/link';
import { PostSummary } from '@/lib/posts';

interface PostCardProps {
  post: PostSummary;
}

export function PostCard({ post }: PostCardProps) {
  return (
    <article
      className="card-hover-effect"
      style={{
        backgroundColor: 'var(--bg-card)',
        borderRadius: 'var(--radius-lg)',
        overflow: 'hidden',
        border: '1px solid var(--slate-200)',
        display: 'flex',
        flexDirection: 'column',
        boxShadow: 'var(--shadow-sm)',
        height: '100%',
      }}
    >
      {/* Thumbnail Container */}
      <Link
        href={`/p/${post.slug}`}
        style={{
          position: 'relative',
          display: 'block',
          width: '100%',
          paddingTop: '56.25%', // 16:9 Aspect Ratio
          backgroundColor: 'var(--slate-100)',
          overflow: 'hidden',
        }}
      >
        <img
          src={post.thumbnail}
          alt={post.title}
          style={{
            position: 'absolute',
            top: 0,
            left: 0,
            width: '100%',
            height: '100%',
            objectFit: 'cover',
            transition: 'transform 0.35s ease',
          }}
          className="post-thumbnail-img"
        />
        {/* Category Badge Floating on Image */}
        <div style={{
          position: 'absolute',
          top: '0.85rem',
          left: '0.85rem',
          zIndex: 2,
        }}>
          <span style={{
            display: 'inline-block',
            padding: '0.25rem 0.65rem',
            borderRadius: 'var(--radius-full)',
            backgroundColor: 'rgba(255, 255, 255, 0.95)',
            backdropFilter: 'blur(4px)',
            color: post.category.badgeColor,
            fontWeight: 800,
            fontSize: '0.75rem',
            boxShadow: '0 2px 6px rgba(0, 0, 0, 0.1)',
            border: `1px solid ${post.category.badgeBg}`
          }}>
            {post.category.name}
          </span>
        </div>
      </Link>

      {/* Content Area */}
      <div style={{
        padding: '1.4rem',
        display: 'flex',
        flexDirection: 'column',
        flex: 1,
        justifyContent: 'space-between',
      }}>
        <div>
          {/* Metadata: Date & Reading Time */}
          <div style={{
            display: 'flex',
            alignItems: 'center',
            gap: '0.6rem',
            fontSize: '0.8rem',
            color: 'var(--slate-400)',
            marginBottom: '0.65rem',
          }}>
            <time dateTime={post.date}>{post.date}</time>
            <span>•</span>
            <span>약 {post.readingTime}분 분량</span>
          </div>

          {/* Title */}
          <Link href={`/p/${post.slug}`}>
            <h3 style={{
              fontSize: '1.15rem',
              fontWeight: 700,
              color: 'var(--slate-900)',
              lineHeight: 1.45,
              marginBottom: '0.75rem',
              display: '-webkit-box',
              WebkitLineClamp: 2,
              WebkitBoxOrient: 'vertical',
              overflow: 'hidden',
              wordBreak: 'keep-all',
            }}>
              {post.title}
            </h3>
          </Link>

          {/* Description */}
          <p style={{
            fontSize: '0.9rem',
            color: 'var(--slate-600)',
            lineHeight: 1.6,
            marginBottom: '1.25rem',
            display: '-webkit-box',
            WebkitLineClamp: 2,
            WebkitBoxOrient: 'vertical',
            overflow: 'hidden',
            wordBreak: 'keep-all',
          }}>
            {post.description}
          </p>
        </div>

        {/* Read More Link */}
        <div style={{
          paddingTop: '0.85rem',
          borderTop: '1px solid var(--slate-100)',
          display: 'flex',
          justifyContent: 'space-between',
          alignItems: 'center',
        }}>
          <Link
            href={`/p/${post.slug}`}
            style={{
              fontSize: '0.875rem',
              fontWeight: 700,
              color: 'var(--primary)',
              display: 'inline-flex',
              alignItems: 'center',
              gap: '0.3rem',
            }}
          >
            <span>자세히 보기</span>
            <span>→</span>
          </Link>
          <span style={{ fontSize: '0.75rem', color: 'var(--slate-400)' }}>후한의원 구미점</span>
        </div>
      </div>
    </article>
  );
}
