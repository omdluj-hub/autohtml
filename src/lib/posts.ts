import fs from 'fs';
import path from 'path';
import matter from 'gray-matter';
import MarkdownIt from 'markdown-it';

const contentDirectory = path.join(process.cwd(), 'content');
const md = new MarkdownIt({
  html: true,
  linkify: true,
  typographer: true,
});

export interface PostData {
  slug: string;
  title: string;
  date: string;
  description: string;
  content: string;
}

export async function getAllPosts(): Promise<Omit<PostData, 'content'>[]> {
  if (!fs.existsSync(contentDirectory)) {
    return [];
  }

  const fileNames = fs.readdirSync(contentDirectory);
  const posts = fileNames
    .filter((fileName) => fileName.endsWith('.md'))
    .map((fileName) => {
      const slug = fileName.replace(/\.md$/, '');
      const fullPath = path.join(contentDirectory, fileName);
      const fileContents = fs.readFileSync(fullPath, 'utf8');
      const { data } = matter(fileContents);

      return {
        slug,
        title: data.title || 'No Title',
        date: data.date || '',
        description: data.description || '',
      };
    })
    .sort((a, b) => (a.date < b.date ? 1 : -1));

  return posts;
}

export async function getPostBySlug(slug: string): Promise<PostData | null> {
  const fullPath = path.join(contentDirectory, `${slug}.md`);
  
  if (!fs.existsSync(fullPath)) {
    return null;
  }

  const fileContents = fs.readFileSync(fullPath, 'utf8');
  const { data, content } = matter(fileContents);
  const htmlContent = md.render(content);

  return {
    slug,
    title: data.title || 'No Title',
    date: data.date || '',
    description: data.description || '',
    content: htmlContent,
  };
}
