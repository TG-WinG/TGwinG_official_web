# T.G.winG 웹 로드맵

진행 방식: MVP 골격 선구축 → 브랜치/PR로 기능 채우기.
세부 작업은 이 문서가 아니라 GitHub Issues + Projects(칸반)로 관리한다. 이 문서는 큰 흐름만.

v1 범위 = Public 전체. 족보·스터디 등 Private는 다음 기수. (근거: [DECISIONS.md](./DECISIONS.md) 11번)

---

## Phase 0 — 협업 인프라
- 초대 멤버 수락
- admin/Org Owner 권한 정리 (항상 2명 이상 — 안전장치 R1)
- 공개 여부 결정: public 전환(오픈소스) vs GitHub Education Team(무료 private+브랜치보호) vs 컨벤션 유지
  - 현재: 무료 private → 브랜치 보호 불가, CONTRIBUTING 컨벤션으로 운영
- HANDOVER.md 작성 (계정·도메인·결제일·갱신책임·비번 위치 — 안전장치 R2)

## Phase 1 — MVP 골격
- Next.js + TypeScript 초기화 (`output: 'standalone'`)
- 라우팅 + 페이지별 레이아웃 스텁 (`app/`)
- 공용 레이아웃(헤더/푸터), 디자인 토큰(컬러/폰트), winG 브랜딩 베이스
- DB 연결(Postgres + ORM) + 헬스체크 + `.env.example`
- ERD 기반 스키마 스캐폴딩 (족보 / 스터디 / 공지 / 프로젝트 / 기술블로그)
- Auth.js + GitHub OAuth + Org 멤버십 게이트
- 로컬 실행 확인 후 main에 push → 골격 완성본 공유

## Phase 2 — 이슈 분배
- 페이지/기능 단위 이슈 생성 → Projects 칸반 등록
- 담당자 배정 (Public / Private / 디자인)
- 브랜치 → PR 흐름으로 첫 기능 시작

## Phase 3 — 핵심 기능 (우선순위 순)

Public (v1):
- 랜딩 페이지 (1순위 — 날개 애니메이션, 스크롤 인트로)
- 프로젝트 아카이브 (카드 + 기수·스택·수상 필터)
- 기술 블로그 아카이브 (OG 태그 파싱 썸네일, 분야 태그 필터)

Private (다음 기수):
- 멤버 인증 (GitHub Org 멤버십. 학번·이름 단독 대조는 사칭 위험으로 폐기 — DECISIONS 5번)
- 족보 공유 (파일 업로드 → R2, 과목/교수/학기 분류, 댓글·좋아요·북마크)
- 스터디 / 팀 모집 (텍스트 기반, 상태 트래킹)
- 공지 / 일정 (운영진 공지, 동방 이용수칙 상단 고정)
- 관리자 페이지 (멤버 관리, 권한)

## Phase 4 — 배포 & 운영
- 개발 단계: Vercel (포터블 규칙 준수)
- 최종: 쿠러그 자체 서버로 Docker 이전 (다음 학기 초)
- 환경변수·시크릿 관리, DB/파일 백업 (안전장치 R3)
- 도메인 연결 (`tgwing.khlug.org` 또는 `tgwing.khu.ac.kr`)

---

## 완료
- 프로젝트 방향성/컨셉 확정 (1~4차 회의)
- 개발 방식 PR 기반 전환 (5차 회의)
- 협업 문서(README / CONTRIBUTING / PR·이슈 템플릿) 작성
- 멤버 repo 권한 부여
- 기술 스택 Next.js 단일레포로 재확정 (Spring 분리안 폐기 — DECISIONS 1·2번)
