# 기여 가이드 (CONTRIBUTING)

모든 작업은 PR(Pull Request)로 진행하며, `main`에는 직접 push하지 않는다.
모든 참여자는 [행동 강령](./CODE_OF_CONDUCT.md)을 따른다.

---

## 0. 처음이신가요?

- **첫 기여**라면 [`good first issue`](https://github.com/TG-WinG/TGwinG_official_web/labels/good%20first%20issue) 라벨이 붙은 이슈부터 집어보세요. 인프라 세팅 없이(비밀키 0개) 바로 시작할 수 있는 작은 작업들입니다.
- **막히면 동아리 단톡방에 물어보거나, 회장·교육부장에게 개인적으로 연락하세요.** 또는 이슈에 코멘트.
- 로컬 실행은 `npm install && npm run dev`면 끝 — 자세한 건 [README](./README.md) "로컬 실행" 참고.

---

## 1. 시작하기

```bash
git clone <repo-url>
cd TGwinG_official_web
git switch main && git pull origin main
git switch -c feat/home-landing

npm install
cp .env.example .env.local   # DB·GitHub OAuth·R2 값 채우기
npm run dev
```

Org 멤버는 직접 클론, 외부 기여자는 fork 후 진행.

---

## 2. 브랜치 전략

GitHub Flow 기준. `main`이 곧 배포본이다.

- **main** — production. 항상 배포 가능 상태. 직접 push 금지, PR로만 머지.
- **feature** — `<type>/<설명>`으로 main에서 분기 → PR → main. PR마다 Vercel 프리뷰가 자동 생성되므로 별도 스테이징 불필요.
- **dev (선택)** — 통합 테스트 버퍼가 필요하면 추가. 그땐 `feature → dev → main`, dev는 Vercel에 상시 배포(스테이징 겸 failover 대기소).

| type | 용도 | 예시 |
|------|------|------|
| `feat` | 새 기능 | `feat/project-archive` |
| `fix` | 버그 수정 | `fix/login-redirect` |
| `design` | 디자인/스타일 | `design/landing-animation` |
| `refactor` | 리팩터링 | `refactor/api-client` |
| `docs` | 문서 | `docs/readme-update` |
| `chore` | 설정/빌드 | `chore/eslint-config` |

### 브랜치 보호
현재 무료 + private이라 보호 규칙을 켤 수 없다. GitHub Education Team 또는 public 전환 후 적용:
`main` 직접 push 금지 / PR 필수 / 승인 ≥1 / CI(lint·build) 통과 / squash·linear history / force-push·삭제 금지. 그 전까지는 이 문서를 컨벤션으로 운영.

---

## 3. 커밋 메시지

```
<type>: <변경 요약>

(선택) 본문 — 왜 바꿨는지
```

- 한 커밋은 하나의 논리적 변경.
- 제목 50자 내외, 명령형.

---

## 4. PR 규칙

1. 브랜치 push 후 `main ← feature`로 PR 생성.
2. PR 템플릿 작성 (무엇을·왜·어떻게 테스트했는지).
3. 최소 1명 승인 후 머지.
4. 리뷰 코멘트는 반영하거나, 안 하면 이유를 답변.
5. 머지는 Squash and merge 기본.

### 작업 경계 (충돌 최소화)
- 페이지/기능 단위로 브랜치를 나눈다 (`app/` 하위 라우트 단위).
- 공용 컴포넌트(`components/`)·공통 설정(`lib/`, `db/`)을 건드릴 땐 미리 공유.
- 작업 전 항상 main 최신화 후 분기.

---

## 5. 이슈 & 작업 관리

- 작업은 GitHub Issues + Projects(칸반)로 관리.
- 새 작업은 이슈 먼저 생성, 본인 assignee 지정 후 칸반 `In Progress`로.
- PR 설명에 `Closes #번호` → 머지 시 이슈 자동 종료.

---

## 6. 코드 스타일

- TypeScript / ESLint + Prettier (`npm run lint`). 커밋 전 포맷.
- 비밀키·토큰 커밋 금지. `.env.local`에만 두고, 새 키는 `.env.example`에 이름만 추가.

---

## 7. 포터빌리티 규칙

최종 호스팅은 쿠러그 자체 서버. 락인되면 이전 시 재작성이 된다.

| 항목 | 금지 | 사용 |
|------|------|------|
| DB | Supabase Auth/RLS | 순수 Postgres + ORM |
| 인증 | Supabase Auth | Auth.js GitHub provider |
| 파일 | R2 전용 API | S3 호환 SDK |
| 설정 | 하드코딩 | 전부 `.env` |
