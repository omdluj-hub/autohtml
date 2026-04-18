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
    <article className="blog-container" style={{ 
      maxWidth: '850px', 
      margin: '4rem auto', 
      padding: '4rem', 
      backgroundColor: '#ffffff',
      color: '#1a1a1a',
      fontFamily: '"Pretendard", -apple-system, BlinkMacSystemFont, system-ui, Roboto, sans-serif',
      lineHeight: '1.6',
      letterSpacing: '-0.02em'
    }}>
      <header className="blog-header" style={{ 
        marginBottom: '5rem', 
        textAlign: 'left',
        borderLeft: '4px solid #000',
        paddingLeft: '2rem'
      }}>
        <time style={{ 
          fontSize: '0.9rem', 
          color: '#888', 
          fontWeight: '500',
          textTransform: 'uppercase',
          display: 'block',
          marginBottom: '1rem'
        }}>{post.date}</time>
        <h1 style={{ 
          fontSize: '3.2rem', 
          lineHeight: '1.2',
          fontWeight: '800',
          margin: 0,
          color: '#000',
          wordBreak: 'keep-all'
        }}>{post.title}</h1>
        <p style={{ marginTop: '1.5rem', fontSize: '1.1rem', color: '#666' }}>후한의원 구미점</p>
      </header>
      
      <div 
        className="blog-content"
        style={{ 
          lineHeight: '2.1', 
          fontSize: '1.15rem', 
          color: '#2c2c2c' 
        }}
        dangerouslySetInnerHTML={{ __html: post.content }} 
      />
      
      <section style={{ marginTop: '8rem' }}>
        <h3 style={{ 
          fontSize: '1.8rem', 
          fontWeight: '700', 
          marginBottom: '2rem',
          color: '#000',
          textAlign: 'center'
        }}>Location</h3>
        
        {/* Google Maps Embed */}
        <div style={{ 
          width: '100%', 
          height: '450px', 
          backgroundColor: '#f5f5f5',
          borderRadius: '2px',
          overflow: 'hidden',
          marginBottom: '3rem',
          border: '1px solid #eee'
        }}>
          <iframe 
            src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3228.3245468779!2d128.41257957675747!3d36.107975272421375!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x3566973bb9666667%3A0xe666666666666666!2z7ZuE7ZWc7J2Y7JuQIOq1rOuvuOydkA!5e0!3m2!1sko!2skr!4v1713400000000!5m2!1sko!2skr" 
            width="100%" 
            height="100%" 
            style={{ border: 0 }} 
            allowFullScreen={true} 
            loading="lazy" 
            referrerPolicy="no-referrer-when-downgrade"
          ></iframe>
        </div>

        <div style={{ 
          padding: '3rem', 
          backgroundColor: '#1a1a1a',
          color: '#fff',
          borderRadius: '2px',
          display: 'grid',
          gridTemplateColumns: '1fr 1fr',
          gap: '2rem'
        }}>
          <div>
            <h4 style={{ margin: '0 0 1rem 0', color: '#fff', fontSize: '1.2rem' }}>Contact</h4>
            <p style={{ margin: '0.3rem 0', color: '#ccc' }}>Tel. 054-474-1075</p>
            <a 
              href="https://naver.me/5N15Owng" 
              target="_blank" 
              rel="noopener noreferrer"
              style={{ 
                display: 'inline-block',
                marginTop: '1rem',
                padding: '0.8rem 1.5rem',
                backgroundColor: '#03C75A',
                color: '#fff',
                textDecoration: 'none',
                borderRadius: '4px',
                fontWeight: 'bold',
                fontSize: '0.9rem'
              }}
            >
              N 네이버 플레이스
            </a>
          </div>
          <div>
            <h4 style={{ margin: '0 0 1rem 0', color: '#fff', fontSize: '1.2rem' }}>Address</h4>
            <p style={{ margin: '0.3rem 0', color: '#ccc' }}>경상북도 구미시 인동가산로 9-3</p>
            <p style={{ margin: '0.3rem 0', color: '#ccc' }}>노블레스타워 4층 (인동 황상동)</p>
          </div>
          <div style={{ gridColumn: 'span 2', paddingTop: '1.5rem', borderTop: '1px solid #333', fontSize: '0.9rem', color: '#888' }}>
            © HOOCLINIC GUMI. 365 Days Clinic. Professional Skin & Diet Care.
          </div>
        </div>
      </section>
    </article>
  );
}
