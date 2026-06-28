# 기여 가이드 (CONTRIBUTING)

모든 작업은 PR(Pull Request)로 진행하며, `main`에는 직접 push하지 않는다.

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

### 브랜치 보호 (`main`, 적용됨)
레포가 public이라 보호 규칙이 **실제로 켜져 있다**. 현재 설정:

- PR 필수 (직접 push 금지) · 승인 **≥1**
- 새 커밋 push 시 기존 승인 자동 해제(stale 리뷰 무효화)
- linear history 강제 → 머지는 **Squash**(또는 Rebase)만, merge 커밋 금지
- force-push·브랜치 삭제 금지

아직 **안 켠 것** (필요해지면 추가):
- **CI 통과 필수(required status check)** — 지금은 CI가 빨개도 머지가 막히지 않는다. CI(아래 8번)가 안정되면 `build` 잡을 required로 지정 권장.
- 관리자에게도 강제(enforce admins) / 대화(conversation) 해결 필수 / CODEOWNERS 리뷰.

> 설정 위치: GitHub → Settings → Branches → `main` rule (또는 Rulesets).

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

---

## 8. CI / 자동 배포

PR을 열거나 `main`에 push하면 자동으로 돈다.

- **CI** (GitHub Actions, `.github/workflows/ci.yml`): `npm ci → typecheck → build`. PR마다 자동 실행. 로컬에서 `npm run typecheck && npm run build`로 미리 재현 가능.
- **CD** (Vercel): PR마다 **프리뷰 배포**, `main` 머지 시 **production 배포** 자동. 스택·도메인·함정은 [docs/DEPLOYMENT.md](./docs/DEPLOYMENT.md).

> CI는 아직 머지 차단(required) 설정이 아니다(§2 참고). 빨간 CI는 머지 전 직접 확인할 것.
