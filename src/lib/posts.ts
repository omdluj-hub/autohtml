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

export interface CategoryInfo {
  id: string;
  name: string;
  description: string;
  color: string;
  badgeBg: string;
  badgeColor: string;
  keywords: string[];
  defaultImage: string;
}

export const CATEGORIES: Record<string, CategoryInfo> = {
  acne: {
    id: 'acne',
    name: '여드름·흉터',
    description: '화농성·좁쌀 여드름 치료, 붉은 자국 및 패인 흉터 복원',
    color: '#E11D48',
    badgeBg: '#FFE4E6',
    badgeColor: '#BE123C',
    keywords: ['여드름', '흉터', '자국', '압출', '패인', '새살', '피지', '모공'],
    defaultImage: '/images/skin-treatment.jpg',
  },
  diet: {
    id: 'diet',
    name: '한방 다이어트',
    description: '체질 맞춤 다이어트 한약 (미감탕, 비움탕, 다요스틱)',
    color: '#059669',
    badgeBg: '#D1FAE5',
    badgeColor: '#047857',
    keywords: ['다이어트', '미감탕', '비움탕', '다요스틱', '다요정', '체중', '체질', '비만', '요요', '감량', '식욕', '인바디', '단식'],
    defaultImage: '/images/diet-info.jpg',
  },
  skin: {
    id: 'skin',
    name: '피부 질환',
    description: '사마귀, 쥐젖, 안면홍조, 지루성피부염, 건선, 아토피, 탈모',
    color: '#7C3AED',
    badgeBg: '#EDE9FE',
    badgeColor: '#6D28D9',
    keywords: ['사마귀', '편평사마귀', '쥐젖', '홍조', '안면홍조', '지루성', '건선', '아토피', '탈모', '피부염', '가려움', '두피', '면역', '열성'],
    defaultImage: '/images/redface.jpg',
  },
  traffic: {
    id: 'traffic',
    name: '교통사고·입원',
    description: '365일 1인실 입원실 운영, 후유증 한방 치료, 자동차보험',
    color: '#D97706',
    badgeBg: '#FEF3C7',
    badgeColor: '#B45309',
    keywords: ['교통사고', '입원', '후유증', '자동차보험', '1인실', '입원실', '추나', '어혈', '통증'],
    defaultImage: '/images/car-insurance.jpg',
  },
};

export const CATEGORY_LIST = Object.values(CATEGORIES);

export interface PostData {
  slug: string;
  title: string;
  date: string;
  description: string;
  category: CategoryInfo;
  thumbnail: string;
  readingTime: number;
  content: string;
}

export type PostSummary = Omit<PostData, 'content'>;

function detectCategory(title: string, rawContent: string): CategoryInfo {
  const combinedText = `${title} ${title} ${rawContent.slice(0, 1000)}`.toLowerCase();
  
  let bestCategory = CATEGORIES.acne;
  let maxScore = -1;

  for (const cat of Object.values(CATEGORIES)) {
    let score = 0;
    for (const keyword of cat.keywords) {
      const regex = new RegExp(keyword, 'gi');
      const matches = combinedText.match(regex);
      if (matches) {
        score += matches.length;
      }
    }
    if (score > maxScore) {
      maxScore = score;
      bestCategory = cat;
    }
  }

  return bestCategory;
}

function extractFirstImage(rawContent: string, defaultImage: string): string {
  const imgRegex = /!\[.*?\]\(((\/images\/[^\)\s]+)|(https?:\/\/[^\)\s]+))\)/;
  const match = rawContent.match(imgRegex);
  if (match && match[1]) {
    return match[1];
  }
  return defaultImage;
}

function calculateReadingTime(text: string): number {
  const charCount = text.replace(/<[^>]*>?/gm, '').length;
  return Math.max(1, Math.ceil(charCount / 500));
}

export async function getAllPosts(): Promise<PostSummary[]> {
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
      const { data, content } = matter(fileContents);

      const title = data.title || '후한의원 구미점 건강 정보';
      const category = detectCategory(title, content);
      const thumbnail = extractFirstImage(content, category.defaultImage);
      const readingTime = calculateReadingTime(content);

      return {
        slug,
        title,
        date: data.date || '',
        description: data.description || '',
        category,
        thumbnail,
        readingTime,
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
  const title = data.title || '후한의원 구미점 건강 정보';
  const category = detectCategory(title, content);
  const thumbnail = extractFirstImage(content, category.defaultImage);
  const readingTime = calculateReadingTime(content);
  const htmlContent = md.render(content);

  return {
    slug,
    title,
    date: data.date || '',
    description: data.description || '',
    category,
    thumbnail,
    readingTime,
    content: htmlContent,
  };
}

export async function getRelatedPosts(currentSlug: string, categoryId: string, limit: number = 3): Promise<PostSummary[]> {
  const allPosts = await getAllPosts();
  return allPosts
    .filter((post) => post.slug !== currentSlug && post.category.id === categoryId)
    .slice(0, limit);
}

export async function getCategoryCounts(): Promise<Record<string, number>> {
  const allPosts = await getAllPosts();
  const counts: Record<string, number> = {
    all: allPosts.length,
    acne: 0,
    diet: 0,
    skin: 0,
    traffic: 0,
  };

  for (const post of allPosts) {
    if (counts[post.category.id] !== undefined) {
      counts[post.category.id]++;
    }
  }

  return counts;
}
