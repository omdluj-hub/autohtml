import Link from 'next/link';
import { CATEGORIES } from '@/lib/posts';

interface CategoryTabsProps {
  activeCategory: string;
  categoryCounts: Record<string, number>;
  searchQuery?: string;
}

export function CategoryTabs({ activeCategory, categoryCounts, searchQuery }: CategoryTabsProps) {
  const tabs = [
    { id: 'all', name: '전체 소식', count: categoryCounts.all || 0, icon: '📋' },
    { id: 'acne', name: CATEGORIES.acne.name, count: categoryCounts.acne || 0, icon: '✨' },
    { id: 'diet', name: CATEGORIES.diet.name, count: categoryCounts.diet || 0, icon: '🌿' },
    { id: 'skin', name: CATEGORIES.skin.name, count: categoryCounts.skin || 0, icon: '🌸' },
    { id: 'traffic', name: CATEGORIES.traffic.name, count: categoryCounts.traffic || 0, icon: '🏥' },
  ];

  return (
    <div style={{
      display: 'flex',
      alignItems: 'center',
      gap: '0.6rem',
      overflowX: 'auto',
      paddingBottom: '0.5rem',
      scrollbarWidth: 'none',
      msOverflowStyle: 'none',
      WebkitOverflowScrolling: 'touch',
    }}>
      {tabs.map((tab) => {
        const isActive = activeCategory === tab.id;
        const queryParams = new URLSearchParams();
        if (tab.id !== 'all') {
          queryParams.set('category', tab.id);
        }
        if (searchQuery) {
          queryParams.set('q', searchQuery);
        }
        const href = `/${queryParams.toString() ? `?${queryParams.toString()}` : ''}`;

        return (
          <Link
            key={tab.id}
            href={href}
            style={{
              display: 'inline-flex',
              alignItems: 'center',
              gap: '0.45rem',
              padding: '0.65rem 1.15rem',
              borderRadius: 'var(--radius-full)',
              fontSize: '0.925rem',
              fontWeight: isActive ? 700 : 500,
              whiteSpace: 'nowrap',
              backgroundColor: isActive ? 'var(--primary)' : '#fff',
              color: isActive ? '#fff' : 'var(--slate-700)',
              border: isActive ? '1px solid var(--primary)' : '1px solid var(--slate-200)',
              boxShadow: isActive ? '0 2px 8px rgba(15, 118, 110, 0.25)' : 'var(--shadow-sm)',
              transition: 'all 0.2s ease',
            }}
          >
            <span>{tab.icon}</span>
            <span>{tab.name}</span>
            <span
              style={{
                fontSize: '0.75rem',
                padding: '0.1rem 0.45rem',
                borderRadius: 'var(--radius-full)',
                backgroundColor: isActive ? 'rgba(255, 255, 255, 0.25)' : 'var(--slate-100)',
                color: isActive ? '#fff' : 'var(--slate-500)',
                fontWeight: 700,
              }}
            >
              {tab.count}
            </span>
          </Link>
        );
      })}
    </div>
  );
}
