import { Metadata } from 'next';
import { notFound } from 'next/navigation';
import { getPostBySlug, getAllPosts } from '@/lib/posts';

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
      title: 'Post Not Found',
    };
  }

  return {
    title: `${post.title} | 후한의원 구미점`,
    description: post.description,
    openGraph: {
      title: post.title,
      description: post.description,
      type: 'article',
    },
  };
}

export default async function PostPage({ params }: PostPageProps) {
  const { slug } = await params;
  const post = await getPostBySlug(slug);

  if (!post) {
    notFound();
  }

  return (
    <article style={{ 
      maxWidth: '900px', 
      margin: '2rem auto', 
      padding: '3rem', 
      backgroundColor: '#fff',
      borderRadius: '12px',
      boxShadow: '0 4px 20px rgba(0,0,0,0.05)',
      fontFamily: '"Pretendard", -apple-system, BlinkMacSystemFont, system-ui, Roboto, "Helvetica Neue", "Segoe UI", "Apple SD Gothic Neo", "Noto Sans KR", "Malgun Gothic", "Apple Color Emoji", "Segoe UI Emoji", "Segoe UI Symbol", sans-serif',
      color: '#333'
    }}>
      <header style={{ 
        marginBottom: '3rem', 
        textAlign: 'center',
        borderBottom: '2px solid #f0f0f0', 
        paddingBottom: '2rem' 
      }}>
        <h1 style={{ 
          fontSize: '2.5rem', 
          lineHeight: '1.4',
          marginBottom: '1rem', 
          color: '#111',
          wordBreak: 'keep-all'
        }}>{post.title}</h1>
        <div style={{ display: 'flex', justifyContent: 'center', gap: '1rem', color: '#888', fontSize: '0.95rem' }}>
          <span>후한의원 구미점</span>
          <span>•</span>
          <time>{post.date}</time>
        </div>
      </header>
      
      <div 
        className="blog-content"
        style={{ 
          lineHeight: '2', 
          fontSize: '1.2rem', 
          color: '#444' 
        }}
        dangerouslySetInnerHTML={{ __html: post.content }} 
      />
      
      <footer style={{ 
        marginTop: '5rem', 
        padding: '2.5rem', 
        backgroundColor: '#f9f9f9',
        borderRadius: '8px',
        borderLeft: '5px solid #0070f3'
      }}>
        <h4 style={{ marginTop: 0, marginBottom: '1rem', fontSize: '1.3rem', color: '#111' }}>📍 오시는 길 & 상담 안내</h4>
        <p style={{ margin: '0.5rem 0' }}><strong>주소:</strong> 경상북도 구미시 인동가산로 9-3 노블레스타워 4층</p>
        <p style={{ margin: '0.5rem 0' }}><strong>전화문의:</strong> <span style={{ color: '#0070f3', fontWeight: 'bold' }}>054-474-1075</span></p>
        <p style={{ margin: '0.5rem 0', fontSize: '0.95rem', color: '#666' }}>※ 365일 진료 및 1인실 위주 입원실 운영 (여드름, 다이어트, 교통사고)</p>
      </footer>
    </article>
  );
}
