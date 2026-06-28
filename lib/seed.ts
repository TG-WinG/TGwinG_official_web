// ponytail: 정적 seed 데이터 — DB 붙이기 전까지 페이지가 비지 않게 하는 가짜 콘텐츠.
// 실제 데이터는 멤버 PR로 채우거나, 스캐폴딩 '중간' 범위로 갈 때 Postgres로 옮긴다 (DECISIONS §17).
// slug는 향후 상세 페이지용 — 지금은 목록만 렌더하고 링크는 없음.

export type Project = {
  slug: string;
  title: string;
  summary: string;
  generation: string; // 기수
  stack: string[];
  award?: string;
};

export type BlogPost = {
  slug: string;
  title: string;
  excerpt: string;
  author: string;
  date: string; // YYYY-MM-DD
  tags: string[];
};

export const projects: Project[] = [
  {
    slug: "tgwing-web",
    title: "T.G.winG 공식 웹",
    summary: "동아리 공식 사이트. Next.js 단일레포, 오픈소스로 멤버가 PR로 키운다.",
    generation: "2026",
    stack: ["Next.js", "TypeScript", "Tailwind"],
    award: "진행 중",
  },
  {
    slug: "algo-visualizer",
    title: "알고리즘 비주얼라이저",
    summary: "정렬·그래프 탐색을 단계별로 시각화하는 학습 도구.",
    generation: "2025",
    stack: ["React", "D3"],
  },
  {
    slug: "ddong-ban",
    title: "동방 예약 봇",
    summary: "동아리방 좌석·장비 예약을 Slack에서 처리하는 봇.",
    generation: "2024",
    stack: ["Python", "Slack API"],
  },
];

export const blogPosts: BlogPost[] = [
  {
    slug: "why-monorepo",
    title: "왜 Spring 분리 대신 Next.js 단일레포인가",
    excerpt: "동접 월 10명 규모에서 프론트/백 분리는 과한 선택이었다는 회고.",
    author: "운영진",
    date: "2026-06-26",
    tags: ["아키텍처", "회고"],
  },
  {
    slug: "first-pr",
    title: "처음 PR 올려보기 — 비밀키 0개로 시작하기",
    excerpt: "clone 하고 npm run dev 만으로 기여를 시작하는 법.",
    author: "교육부",
    date: "2026-06-20",
    tags: ["온보딩", "기여가이드"],
  },
];
