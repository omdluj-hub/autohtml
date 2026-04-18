import Link from 'next/link';
import { getAllPosts } from '@/lib/posts';

export default async function Home() {
  const posts = await getAllPosts();

  return (
    <main style={{ maxWidth: '800px', margin: '4rem auto', padding: '0 2rem', fontFamily: 'sans-serif' }}>
      <header style={{ marginBottom: '4rem', textAlign: 'center' }}>
        <h1 style={{ fontSize: '3rem', color: '#1a1a1a', marginBottom: '1rem' }}>후한의원 구미점</h1>
        <p style={{ fontSize: '1.2rem', color: '#666' }}>매일 업데이트되는 건강 정보와 진료 소식</p>
      </header>

      <section>
        <h2 style={{ fontSize: '1.5rem', borderBottom: '2px solid #333', paddingBottom: '0.5rem', marginBottom: '2rem' }}>최신 소식</h2>
        {posts.length === 0 ? (
          <p>아직 등록된 게시글이 없습니다. 곧 새로운 소식으로 찾아뵙겠습니다!</p>
        ) : (
          <div style={{ display: 'grid', gap: '2rem' }}>
            {posts.map((post) => (
              <article key={post.slug} style={{ borderBottom: '1px solid #eee', paddingBottom: '1.5rem' }}>
                <Link href={`/p/${post.slug}`} style={{ textDecoration: 'none', color: 'inherit' }}>
                  <h3 style={{ fontSize: '1.4rem', color: '#0070f3', marginBottom: '0.5rem' }}>{post.title}</h3>
                </Link>
                <time style={{ fontSize: '0.85rem', color: '#999', display: 'block', marginBottom: '0.5rem' }}>{post.date}</time>
                <p style={{ color: '#444', lineHeight: '1.6' }}>{post.description}</p>
                <Link href={`/p/${post.slug}`} style={{ fontSize: '0.9rem', color: '#0070f3', fontWeight: 'bold' }}>
                  더 보기 →
                </Link>
              </article>
            ))}
          </div>
        )}
      </section>

      <footer style={{ marginTop: '5rem', padding: '2rem 0', textAlign: 'center', borderTop: '1px solid #eee', color: '#666' }}>
        <p>© 2026 후한의원 구미점. All rights reserved.</p>
        <p>경상북도 구미시 인동가산로 9-3 노블레스타워 4층 | 054-474-1075</p>
      </footer>
    </main>
  );
}
