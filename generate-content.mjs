import { GoogleGenerativeAI } from "@google/generative-ai";
import fs from "fs";
import path from "path";

// Configuration
const API_KEY = process.env.GEMINI_API_KEY;
const genAI = new GoogleGenerativeAI(API_KEY);
const model = genAI.getGenerativeModel({ model: "gemini-1.5-flash-latest" });

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

const IMAGE_LIST = [
  "%EB%8B%A4%EC%9A%94%EC%8A%A4%ED%8B%B1.JPG", "%EB%8B%A4%EC%9A%94%EC%8A%A4%ED%8B%B12.JPG", "%EB%8B%A4%EC%9A%94%EC%A0%95.jpg", "%EB%8B%A4%EC%9A%94%EC%A0%952.jpg", "%EB%8B%A4%EC%9D%B4%EC%96%B4%ED%8A%B8.jpg", "%EB%AF%B8%EA%B0%90%EC%97%90%EC%8A%A42.jpg", "%EB%AF%B8%EA%B0%90%ED%83%95.JPG", "%EB%AF%B8%EA%B0%90%ED%83%952.JPG", "%EB%B9%84%EC%9B%80%ED%83%952.jpg", "%EC%9D%B8%EB%B0%94%EB%94%94%EA%B2%80%EC%82%AC.jpg", "%EC%9D%B8%ED%85%8C%EB%A6%AC%EC%96%B4%20(1).JPG", "%EC%9D%B8%ED%85%8C%EB%A6%AC%EC%96%B4%20(2).JPG", "%EC%9D%B8%ED%85%8C%EB%A6%AC%EC%96%B4%20(3).JPG", "%EC%9D%B8%ED%85%8C%EB%A6%AC%EC%96%B4%20(4).JPG", "%EC%9D%B8%ED%85%8C%EB%A6%AC%EC%96%B4%20(5).jpg", "%EC%9D%BC%EB%B0%98%EC%B9%A8.jpg", "%EC%9E%90%EB%B3%B4.jpg", "%ED%94%BC%EB%B6%80.jpg", "%ED%9B%84%ED%95%9C%EC%92%98%EC%9D%98%EC%9B%90_%EA%B5%AC%EB%AF%B8.png", "redface.jpg"
];

async function generatePost(topic) {
  const prompt = `
    당신은 10년차 전문 건강/의학 블로거이자 병원 마케터입니다. 
    제공된 병원 정보와 이미지 목록을 바탕으로, 티스토리나 네이버 블로그 형식의 전문적인 글을 작성해주세요.

    병원 정보: ${HOSPITAL_INFO}
    사용 가능한 이미지 목록: ${IMAGE_LIST.join(", ")}
    오늘의 주제: ${topic}
    
    [이미지 사용 가이드라인]
    1. 글의 맥락에 가장 잘 어울리는 이미지를 위 목록에서 **최소 3개 이상** 선택하여 본문에 삽입하세요.
    2. 마크다운 이미지 문법을 사용하세요: ![설명](/images/파일명)
    3. 이미지 앞뒤로 관련 설명을 배치하여 자연스럽게 연결되도록 하세요.

    [글 작성 가이드라인]
    1. **톤앤매너**: 친절하고 전문적인 어투(~해요, ~입니다) 사용.
    2. **서론**: 독자의 고민에 공감하며 시작 (주제와 관련된 일상적인 예시 포함).
    3. **본문 구성**: 이모지 적절히 사용, 소제목(H2, H3)으로 체계적 구성, Q&A 섹션 포함.
    4. **결론**: 따뜻한 위로와 병원 방문 권유.
    5. **최소 분량**: 본문 공백 제외 1500자 이상으로 아주 상세하게 작성.
    6. **Frontmatter**: 반드시 아래 형식 유지 (다른 텍스트 없이 마크다운의 시작에 위치해야 함).
    ---
    title: "글 제목"
    date: "${new Date().toISOString().split('T')[0]}"
    description: "글에 대한 짧은 요약(1~2문장)"
    ---
    
    [주의사항]
    - 반드시 마크다운(Markdown) 형식으로 작성하세요.
    - 의료법을 준수하여 '무조건 완치', '부작용 없음' 같은 단어는 피하고 '개인차에 따른 맞춤 치료'임을 강조하세요.
    - 작성된 내용은 마크다운 본문만 출력하세요. 다른 잡담은 하지 마세요.
  `;

  const result = await model.generateContent(prompt);
  const response = await result.response;
  const text = response.text();
  
  if (!text || text.length < 100) {
    throw new Error("Generated content is too short or empty.");
  }
  
  return text;
}

async function main() {
  if (!API_KEY) {
    console.error("GEMINI_API_KEY is not set.");
    process.exit(1);
  }

  const baseTopics = [
    "구미 여드름 흉터 치료 원리와 후한의원의 20년 노하우",
    "요요 없는 다이어트 한약, 미감탕이 몸에 미치는 영향",
    "교통사고 후유증 방치하면 안되는 이유와 1인실 입원실 안내",
  ];

  const contentDir = path.join(process.cwd(), "content");
  if (!fs.existsSync(contentDir)) {
    fs.mkdirSync(contentDir);
  }

  const now = new Date();
  const dateStr = now.toISOString().split("T")[0];
  const timestamp = Math.floor(now.getTime() / 1000);

  for (let i = 0; i < baseTopics.length; i++) {
    console.log(`Generating post ${i + 1}/${baseTopics.length}: ${baseTopics[i]}`);
    try {
      const content = await generatePost(baseTopics[i]);
      const fileName = `${dateStr}-${timestamp}-${i + 1}.md`;
      fs.writeFileSync(path.join(contentDir, fileName), content);
      console.log(`Successfully saved ${fileName}`);
    } catch (error) {
      console.error(`CRITICAL ERROR generating post ${i + 1}:`, error);
      process.exit(1); // Stop the entire process on failure
    }
  }
}

main();
