import { GoogleGenerativeAI } from "@google/generative-ai";
import fs from "fs";
import path from "path";

// Configuration
const API_KEY = process.env.GEMINI_API_KEY;
const genAI = new GoogleGenerativeAI(API_KEY);
const model = genAI.getGenerativeModel({ 
  model: "gemini-3-flash-preview",
  generationConfig: {
    maxOutputTokens: 4096,
    temperature: 0.8,
  }
});

const HOSPITAL_INFO = `
병원 이름: 후한의원 구미점
대표 원장: 이언호 (직접 압출 및 시술 진행)
위치: 경상북도 구미시 인동가산로 9-3 노블레스타워 4층 (인동 황상동)
전화: 054-474-1075
진료 시간:
- 월/화/수/금: 10:30 ~ 20:30 (야간진료)
- 토요일: 10:00 ~ 14:00 (점심시간 없음)
- 매주 목요일, 일요일, 공휴일은 외래 진료 휴진
- 입원실은 365일 연중무휴 운영 (교통사고 입원 등)
주요 진료 과목:
1. 여드름 및 여드름 흉터 (화농성, 좁쌀, 성인 여드름, 자국, 패인 흉터 복원)
2. 다이어트 (체질 맞춤 한약: 미감탕, 비움탕, 다요스틱 등)
3. 피부 질환 (지루성 피부염, 안면홍조, 아토피, 건선, 편평사마귀 제거)
4. 교통사고 후유증 및 입원실 운영 (365일 입원 가능, 1인실 위주 쾌적한 환경)
특징: 20년 이상 노하우의 전국 네트워크 한의원.
`;

const IMAGE_LIST = [
  "dayo-stick-1.jpg", "dayo-stick-2.jpg", "dayo-jung-1.jpg", "dayo-jung-2.jpg",
  "diet-info.jpg", "migam-s-2.jpg", "migam-tang-1.jpg", "migam-tang-2.jpg",
  "bium-tang-2.jpg", "inbody-test.jpg", "interior-1.jpg", "interior-2.jpg",
  "interior-3.jpg", "interior-4.jpg", "interior-5.jpg", "acupuncture.jpg",
  "car-insurance.jpg", "skin-treatment.jpg", "hoo-clinic-gumi-logo.png", "redface.jpg"
];

async function generatePost(topic, retryCount = 0) {
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
    4. 예: 다이어트 관련 글이라면 'migam-tang-1.jpg', 'inbody-test.jpg' 등을 사용.

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

  try {
    const result = await model.generateContent(prompt);
    const response = await result.response;
    const text = response.text();
    
    if (!text || text.length < 100) {
      throw new Error("Generated content is too short or empty.");
    }
    return text;
  } catch (error) {
    // 503 Service Unavailable or 429 Too Many Requests
    if ((error.status === 503 || error.status === 429) && retryCount < 3) {
      const waitTime = (retryCount + 1) * 5000;
      console.log(`Server busy (Status ${error.status}). Retrying in ${waitTime/1000}s... (Attempt ${retryCount + 1}/3)`);
      await new Promise(resolve => setTimeout(resolve, waitTime));
      return generatePost(topic, retryCount + 1);
    }
    throw error;
  }
}

async function main() {
  if (!API_KEY) {
    console.error("GEMINI_API_KEY is not set.");
    process.exit(1);
  }

  const allTopics = [
    "구미 여드름 흉터 치료 원리와 후한의원의 20년 노하우",
    "요요 없는 다이어트 한약, 미감탕이 몸에 미치는 영향",
    "교통사고 후유증 방치하면 안되는 이유와 1인실 입원실 안내",
    "손발 사마귀, 전염성 강한 사마귀의 한방 면역 치료법",
    "얼굴과 목 편평사마귀, 깨끗한 피부를 위한 저자극 제거와 면역 강화",
    "쥐젖 제거와 피부결 개선, 한방으로 관리하는 매끄러운 피부",
    "안면홍조 원인 치료, 열감을 내리고 혈관을 강화하는 한방 요법",
    "지루성 피부염 가려움과 염증, 피부 장벽을 회복하는 근본 치료",
    "열성 탈모 방치하지 마세요, 두피 열을 내리는 한방 탈모 관리",
    "건선 치료의 핵심, 면역 균형을 바로잡는 한방 독소 배출",
    "아토피 피부염 가려움증 완화와 면역 체계 개선 방안"
  ];

  // Randomly select 3 topics from the list
  const baseTopics = allTopics.sort(() => 0.5 - Math.random()).slice(0, 3);

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
