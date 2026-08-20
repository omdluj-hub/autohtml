import Link from 'next/link';
import { getAllPosts, getCategoryCounts, CATEGORIES } from '@/lib/posts';
import { HeroSection } from '@/components/hero-section';
import { CategoryTabs } from '@/components/category-tabs';
import { SearchBar } from '@/components/search-bar';
import { PostCard } from '@/components/post-card';

const POSTS_PER_PAGE = 12; // 3x4 grid for optimal visual balance

type Props = {
  searchParams: Promise<{ [key: string]: string | string[] | undefined }>;
};

export default async function Home({ searchParams }: Props) {
  const resolvedSearchParams = await searchParams;
  const activeCategory = (typeof resolvedSearchParams.category === 'string' ? resolvedSearchParams.category : 'all');
  const searchQuery = (typeof resolvedSearchParams.q === 'string' ? resolvedSearchParams.q : '');
  const currentPage = Number(resolvedSearchParams.page) || 1;

  const allPosts = await getAllPosts();
  const categoryCounts = await getCategoryCounts();

  // 1. Filter by category
  let filteredPosts = allPosts;
  if (activeCategory !== 'all') {
    filteredPosts = filteredPosts.filter((post) => post.category.id === activeCategory);
  }

  // 2. Filter by search query
  if (searchQuery.trim()) {
    const query = searchQuery.trim().toLowerCase();
    filteredPosts = filteredPosts.filter((post) =>
      post.title.toLowerCase().includes(query) ||
      post.description.toLowerCase().includes(query)
    );
  }

  // 3. Pagination
  const totalPosts = filteredPosts.length;
  const totalPages = Math.ceil(totalPosts / POSTS_PER_PAGE);
  const displayedPosts = filteredPosts.slice(
    (currentPage - 1) * POSTS_PER_PAGE,
    currentPage * POSTS_PER_PAGE
  );

  const getCategoryTitle = () => {
    if (activeCategory !== 'all' && CATEGORIES[activeCategory]) {
      return CATEGORIES[activeCategory].name;
    }
    return '전체 건강 소식';
  };

  const getCategoryDescription = () => {
    if (activeCategory !== 'all' && CATEGORIES[activeCategory]) {
      return CATEGORIES[activeCategory].description;
    }
    return '후한의원 구미점에서 전해드리는 최신 한방 의학 칼럼 및 치료 안내입니다.';
  };

  const createPaginationUrl = (pageNumber: number) => {
    const params = new URLSearchParams();
    if (activeCategory !== 'all') params.set('category', activeCategory);
    if (searchQuery) params.set('q', searchQuery);
    if (pageNumber > 1) params.set('page', pageNumber.toString());
    return `/${params.toString() ? `?${params.toString()}` : ''}`;
  };

  return (
    <div>
      {/* Hero Section */}
      <HeroSection activeCategory={activeCategory} categoryCounts={categoryCounts} />

      {/* Main Content Area */}
      <div className="container" style={{ paddingBottom: '4rem' }}>
        {/* Filter & Search Bar Header */}
        <div style={{
          display: 'flex',
          justifyContent: 'space-between',
          alignItems: 'center',
          flexWrap: 'wrap',
          gap: '1.25rem',
          marginBottom: '2rem',
          paddingBottom: '1.25rem',
          borderBottom: '1px solid var(--slate-200)'
        }}>
          {/* Category Tabs */}
          <div style={{ flex: 1, minWidth: '280px' }}>
            <CategoryTabs
              activeCategory={activeCategory}
              categoryCounts={categoryCounts}
              searchQuery={searchQuery}
            />
          </div>

          {/* Search Bar */}
          <div>
            <SearchBar initialQuery={searchQuery} activeCategory={activeCategory} />
          </div>
        </div>

        {/* Section Heading & Result Info */}
        <div style={{
          display: 'flex',
          justifyContent: 'space-between',
          alignItems: 'flex-end',
          flexWrap: 'wrap',
          gap: '1rem',
          marginBottom: '2rem'
        }}>
          <div>
            <h2 style={{ fontSize: '1.75rem', fontWeight: 800, color: 'var(--slate-900)', letterSpacing: '-0.02em', marginBottom: '0.35rem' }}>
              {getCategoryTitle()}
            </h2>
            <p style={{ color: 'var(--slate-500)', fontSize: '0.95rem' }}>
              {getCategoryDescription()}
            </p>
          </div>

          <div style={{ fontSize: '0.9rem', color: 'var(--slate-600)', fontWeight: 600 }}>
            {searchQuery && (
              <span style={{ color: 'var(--primary)', marginRight: '0.5rem' }}>
                "{searchQuery}" 검색 결과:
              </span>
            )}
            총 <strong style={{ color: 'var(--slate-900)' }}>{totalPosts}</strong>개의 글
          </div>
        </div>

        {/* Posts Grid */}
        {displayedPosts.length === 0 ? (
          <div style={{
            textAlign: 'center',
            padding: '5rem 2rem',
            backgroundColor: '#fff',
            borderRadius: 'var(--radius-xl)',
            border: '1px dashed var(--slate-300)',
            margin: '2rem 0',
          }}>
            <div style={{ fontSize: '3rem', marginBottom: '1rem' }}>🔍</div>
            <h3 style={{ fontSize: '1.3rem', fontWeight: 700, color: 'var(--slate-800)', marginBottom: '0.5rem' }}>
              검색 결과가 없습니다
            </h3>
            <p style={{ color: 'var(--slate-500)', fontSize: '0.95rem', marginBottom: '1.5rem' }}>
              다른 검색어를 입력하시거나 카테고리 필터를 변경해 보세요.
            </p>
            <Link
              href="/"
              style={{
                display: 'inline-block',
                padding: '0.65rem 1.3rem',
                backgroundColor: 'var(--primary)',
                color: '#fff',
                borderRadius: 'var(--radius-full)',
                fontWeight: 700,
                fontSize: '0.9rem'
              }}
            >
              전체 글 목록으로 돌아가기
            </Link>
          </div>
        ) : (
          <div style={{
            display: 'grid',
            gridTemplateColumns: 'repeat(auto-fill, minmax(320px, 1fr))',
            gap: '1.75rem',
          }}>
            {displayedPosts.map((post) => (
              <PostCard key={post.slug} post={post} />
            ))}
          </div>
        )}

        {/* Pagination UI */}
        {totalPages > 1 && (
          <nav
            aria-label="페이지 네비게이션"
            style={{
              marginTop: '4.5rem',
              display: 'flex',
              justifyContent: 'center',
              alignItems: 'center',
              gap: '0.5rem',
              flexWrap: 'wrap'
            }}
          >
            {/* Prev Button */}
            {currentPage > 1 ? (
              <Link
                href={createPaginationUrl(currentPage - 1)}
                style={{
                  padding: '0.6rem 1.1rem',
                  border: '1px solid var(--slate-300)',
                  borderRadius: 'var(--radius-md)',
                  color: 'var(--slate-700)',
                  backgroundColor: '#fff',
                  fontSize: '0.875rem',
                  fontWeight: 600,
                  display: 'flex',
                  alignItems: 'center',
                  gap: '0.25rem',
                  boxShadow: 'var(--shadow-sm)'
                }}
              >
                ← 이전
              </Link>
            ) : (
              <span
                style={{
                  padding: '0.6rem 1.1rem',
                  border: '1px solid var(--slate-200)',
                  borderRadius: 'var(--radius-md)',
                  color: 'var(--slate-300)',
                  backgroundColor: 'var(--slate-50)',
                  fontSize: '0.875rem',
                  fontWeight: 600,
                  cursor: 'not-allowed',
                }}
              >
                ← 이전
              </span>
            )}

            {/* Page Number Buttons */}
            <div style={{ display: 'flex', gap: '0.35rem', flexWrap: 'wrap' }}>
              {Array.from({ length: Math.min(totalPages, 10) }, (_, i) => {
                // Show sliding window if totalPages > 10
                let pageNum = i + 1;
                if (totalPages > 10) {
                  if (currentPage > 5) {
                    pageNum = currentPage - 5 + i;
                    if (pageNum > totalPages) pageNum = totalPages - (9 - i);
                  }
                }

                const isCurrent = currentPage === pageNum;

                return (
                  <Link
                    key={pageNum}
                    href={createPaginationUrl(pageNum)}
                    style={{
                      width: '38px',
                      height: '38px',
                      display: 'flex',
                      alignItems: 'center',
                      justifyContent: 'center',
                      borderRadius: 'var(--radius-md)',
                      backgroundColor: isCurrent ? 'var(--primary)' : '#fff',
                      color: isCurrent ? '#fff' : 'var(--slate-700)',
                      border: isCurrent ? '1px solid var(--primary)' : '1px solid var(--slate-200)',
                      fontWeight: isCurrent ? 800 : 500,
                      fontSize: '0.9rem',
                      boxShadow: isCurrent ? '0 2px 6px rgba(15, 118, 110, 0.3)' : 'var(--shadow-sm)',
                    }}
                  >
                    {pageNum}
                  </Link>
                );
              })}
            </div>

            {/* Next Button */}
            {currentPage < totalPages ? (
              <Link
                href={createPaginationUrl(currentPage + 1)}
                style={{
                  padding: '0.6rem 1.1rem',
                  border: '1px solid var(--slate-300)',
                  borderRadius: 'var(--radius-md)',
                  color: 'var(--slate-700)',
                  backgroundColor: '#fff',
                  fontSize: '0.875rem',
                  fontWeight: 600,
                  display: 'flex',
                  alignItems: 'center',
                  gap: '0.25rem',
                  boxShadow: 'var(--shadow-sm)'
                }}
              >
                다음 →
              </Link>
            ) : (
              <span
                style={{
                  padding: '0.6rem 1.1rem',
                  border: '1px solid var(--slate-200)',
                  borderRadius: 'var(--radius-md)',
                  color: 'var(--slate-300)',
                  backgroundColor: 'var(--slate-50)',
                  fontSize: '0.875rem',
                  fontWeight: 600,
                  cursor: 'not-allowed',
                }}
              >
                다음 →
              </span>
            )}
          </nav>
        )}
      </div>
    </div>
  );
}
