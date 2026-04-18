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
    <article style={{ maxWidth: '800px', margin: '0 auto', padding: '2rem', fontFamily: 'sans-serif' }}>
      <header style={{ marginBottom: '2rem', borderBottom: '1px solid #eee', paddingBottom: '1rem' }}>
        <h1 style={{ fontSize: '2.5rem', marginBottom: '0.5rem', color: '#333' }}>{post.title}</h1>
        <time style={{ color: '#666', fontSize: '0.9rem' }}>{post.date}</time>
      </header>
      <div 
        style={{ lineHeight: '1.8', fontSize: '1.1rem', color: '#444' }}
        dangerouslySetInnerHTML={{ __html: post.content }} 
      />
      <footer style={{ marginTop: '3rem', paddingTop: '1rem', borderTop: '1px solid #eee' }}>
        <p style={{ fontWeight: 'bold' }}>후한의원 구미점</p>
        <p>경상북도 구미시 인동가산로 9-3 노블레스타워 4층</p>
        <p>전화: 054-474-1075</p>
      </footer>
    </article>
  );
}
