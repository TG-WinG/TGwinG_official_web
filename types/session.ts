// 세션 형태 계약 (DECISIONS §5).
//
// 핵심: dev bypass(#7)와 실제 Auth.js + GitHub OAuth(#14)가 **똑같은 형태**를 반환한다.
// 그래야 UI·서버 코드가 "어떻게 로그인했는지" 몰라도 동일하게 동작한다.
//
// 멤버 판정 = TGwinG GitHub Org 멤버십. 매 요청 실시간 조회하지 않고
// 로그인 시 1회 확인해 세션에 굽는다(isMember) — GitHub 장애·rate limit가
// 로그인 장애로 번지는 것을 차단 (DECISIONS §5, #29에서 실제 판정 로직).

export type SessionUser = {
  /** GitHub 로그인 핸들 (예: guhyun9454) */
  githubLogin: string;
  /** 표시 이름 */
  name: string;
  /** 아바타 URL (없으면 UI에서 이니셜 폴백) */
  avatarUrl?: string;
  /** TGwinG Org 멤버 여부 — 로그인 시 1회 조회해 굽는다 (DECISIONS §5). */
  isMember: boolean;
};

export type Session = {
  user: SessionUser;
};
