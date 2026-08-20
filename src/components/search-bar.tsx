'use client';

import { useRouter, useSearchParams } from 'next/navigation';
import { useState, useTransition } from 'react';

interface SearchBarProps {
  initialQuery?: string;
  activeCategory?: string;
}

export function SearchBar({ initialQuery = '', activeCategory = 'all' }: SearchBarProps) {
  const router = useRouter();
  const searchParams = useSearchParams();
  const [query, setQuery] = useState(initialQuery);
  const [isPending, startTransition] = useTransition();

  const handleSearch = (e: React.FormEvent) => {
    e.preventDefault();
    const params = new URLSearchParams(searchParams ? searchParams.toString() : '');
    
    if (query.trim()) {
      params.set('q', query.trim());
      params.delete('page'); // Reset to page 1 on new search
    } else {
      params.delete('q');
    }

    startTransition(() => {
      router.push(`/?${params.toString()}`);
    });
  };

  const handleClear = () => {
    setQuery('');
    const params = new URLSearchParams(searchParams ? searchParams.toString() : '');
    params.delete('q');
    params.delete('page');
    startTransition(() => {
      router.push(`/?${params.toString()}`);
    });
  };

  return (
    <form onSubmit={handleSearch} style={{ position: 'relative', width: '100%', maxWidth: '340px' }}>
      <div style={{
        display: 'flex',
        alignItems: 'center',
        backgroundColor: '#fff',
        borderRadius: 'var(--radius-full)',
        border: '1.5px solid var(--slate-200)',
        padding: '0.35rem 0.5rem 0.35rem 1rem',
        boxShadow: 'var(--shadow-sm)',
        transition: 'border-color 0.2s ease',
      }}>
        <span style={{ color: 'var(--slate-400)', marginRight: '0.5rem', fontSize: '1rem' }}>🔍</span>
        <input
          type="text"
          value={query}
          onChange={(e) => setQuery(e.target.value)}
          placeholder="건강 정보 및 질환 검색..."
          style={{
            border: 'none',
            outline: 'none',
            fontSize: '0.9rem',
            width: '100%',
            color: 'var(--slate-800)',
            backgroundColor: 'transparent'
          }}
        />
        {query && (
          <button
            type="button"
            onClick={handleClear}
            style={{
              color: 'var(--slate-400)',
              padding: '0.2rem 0.4rem',
              fontSize: '0.8rem',
              marginRight: '0.25rem'
            }}
          >
            ✕
          </button>
        )}
        <button
          type="submit"
          disabled={isPending}
          style={{
            backgroundColor: 'var(--primary)',
            color: '#fff',
            padding: '0.4rem 0.85rem',
            borderRadius: 'var(--radius-full)',
            fontSize: '0.825rem',
            fontWeight: 700,
            whiteSpace: 'nowrap',
          }}
        >
          {isPending ? '검색중' : '검색'}
        </button>
      </div>
    </form>
  );
}
