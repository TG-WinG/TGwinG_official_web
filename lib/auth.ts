// 인증 진입점 (DECISIONS §5, §17).
//
// 지금 단계(#7)에서는 **dev bypass**만 구현한다: 비밀키 0개로도 로그인된 멤버
// 세션을 얻어 로컬에서 사이트가 끝까지 뜨게 한다. 실제 Auth.js + GitHub OAuth
// 연결은 #14에서 아래 `getSession()`의 non-bypass 브랜치를 채운다.
//
// ⚠️ 서버 전용 모듈. `components/`에서 import 금지 — 세션·비밀키가 클라이언트
//    번들로 새지 않게 한다. #6에서 `import 'server-only'` + ESLint 경계 규칙 추가.
//    (server-only 패키지 미설치 상태라 지금은 주석으로만 표시)
import type { Session } from "@/types/session";

// dev bypass 켜짐 조건:
// - 프로덕션 빌드에서는 **무조건 꺼짐** (실서비스에 가짜 멤버 세션 유입 차단).
// - 그 외(로컬 dev)에서는 기본 ON. 끄려면 AUTH_DEV_BYPASS=false.
//   → cp .env.example .env 없이 `npm run dev`만 해도 로그인된 화면이 뜬다.
const DEV_BYPASS =
  process.env.NODE_ENV !== "production" &&
  process.env.AUTH_DEV_BYPASS !== "false";

// 로컬 개발용 가짜 멤버 세션. (#14 실제 세션과 동일한 형태 — types/session.ts)
const DEV_SESSION: Session = {
  user: {
    githubLogin: "dev-member",
    name: "개발 멤버",
    isMember: true,
  },
};

/** 현재 세션을 반환한다. 비로그인이면 null. */
export async function getSession(): Promise<Session | null> {
  if (DEV_BYPASS) return DEV_SESSION;
  // TODO(#14): Auth.js 세션 조회. OAuth 미설정 상태에서는 비로그인으로 취급.
  return null;
}
