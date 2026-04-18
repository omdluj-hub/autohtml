import { GoogleGenerativeAI } from "@google/generative-ai";
import fs from "fs";
import path from "path";

// Configuration
const API_KEY = process.env.GEMINI_API_KEY;
const genAI = new GoogleGenerativeAI(API_KEY);
const model = genAI.getGenerativeModel({ model: "gemini-1.5-flash" });

const HOSPITAL_INFO = `
병원 이름: 후한의원 구미점
대표 원장: 이언호 (직접 압출 및 시술 진행)
위치: 경상북도 구미시 인동가산로 9-3 노블레스타워 4층 (인동 황상동)
전화: 054-474-1075
주요 진료 과목:
1. 여드름 및 여드름 흉터 (화농성, 좁쌀, 성인 여드름, 자국, 패인 흉터 복원)
2. 다이어트 (체질 맞춤 한약: 미감탕, 비움탕, 다요스틱 등)
3. 피부 질환 (지루성 피부염, 안면홍조, 아토피, 건선, 편평사마귀 제거)
4. 교통사고 후유증 및 입원실 운영 (365일 진료, 1인실 위주 쾌적한 입원 환경)
특징: 20년 이상 노하우의 전국 네트워크 한의원, 365일 연중무휴 진료.
`;

async function generatePost(topic) {
  const prompt = `
    당신은 전문적인 병원 홍보 마케터입니다. 위 제공된 병원 정보를 바탕으로 블로그 형식의 홍보글을 작성해주세요.
    병원 정보: ${HOSPITAL_INFO}
    오늘의 주제: ${topic}
    
    요구사항:
    1. 제목(Title)은 클릭을 유도하는 흥미로운 제목으로 작성하세요.
    2. 본문은 풍부한 정보와 친절한 어조로 작성하세요. (최소 1000자 이상)
    3. Markdown 형식을 사용하세요.
    4. 글의 맨 앞부분에 반드시 아래 형식의 Frontmatter를 포함하세요:
    ---
    title: "글 제목"
    date: "YYYY-MM-DD"
    description: "글에 대한 짧은 요약(1~2문장)"
    ---
    
    작성된 내용은 마크다운 본문만 출력하세요.
  `;

  const result = await model.generateContent(prompt);
  const response = await result.response;
  return response.text();
}

async function main() {
  if (!API_KEY) {
    console.error("GEMINI_API_KEY is not set.");
    process.exit(1);
  }

  const topics = [
    "구미 여드름 흉터 치료, 왜 후한의원인가?",
    "겨울철 효과적인 다이어트 한약, 미감탕의 비밀",
    "구미 교통사고 입원실 찾으시나요? 1인실 중심의 편안한 회복",
  ];

  const contentDir = path.join(process.cwd(), "content");
  if (!fs.existsSync(contentDir)) {
    fs.mkdirSync(contentDir);
  }

  const today = new Date().toISOString().split("T")[0];

  for (let i = 0; i < topics.length; i++) {
    console.log(`Generating post ${i + 1}/${topics.length}: ${topics[i]}`);
    try {
      const content = await generatePost(topics[i]);
      const slug = `${today}-post-${i + 1}`;
      const fileName = `${slug}.md`;
      fs.writeFileSync(path.join(contentDir, fileName), content);
      console.log(`Saved ${fileName}`);
    } catch (error) {
      console.error(`Error generating post ${i + 1}:`, error);
    }
  }
}

main();
