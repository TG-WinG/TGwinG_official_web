# 기여 가이드 (CONTRIBUTING)

T.G.winG 웹 프로젝트에 기여하는 방법입니다. **모든 작업은 PR(Pull Request)로 진행**하며,
`main` 브랜치에는 직접 push하지 않습니다.

---

## 1. 처음 시작하기

```bash
# 1. 저장소 클론
git clone <repo-url>
cd TGwinG_official_web

# 2. 최신 main 받기
git switch main
git pull origin main

# 3. 작업용 브랜치 생성 (아래 네이밍 규칙 참고)
git switch -c feat/home-landing

# 4. 의존성 설치 + 로컬 실행
npm install
cp .env.example .env.local
npm run dev
```

> Organization 멤버라면 직접 클론, 외부 기여자라면 fork 후 진행합니다.

---

## 2. 브랜치 네이밍 규칙

`<type>/<간단한-설명>` 형식 (소문자 + 하이픈)

| type | 용도 | 예시 |
|------|------|------|
| `feat` | 새 기능 | `feat/project-archive` |
| `fix` | 버그 수정 | `fix/login-redirect` |
| `design` | 디자인/스타일 | `design/landing-animation` |
| `refactor` | 리팩터링 | `refactor/api-client` |
| `docs` | 문서 | `docs/readme-update` |
| `chore` | 설정/빌드 등 | `chore/eslint-config` |

---

## 3. 커밋 메시지 컨벤션

```
<type>: <변경 내용 요약>

(선택) 본문 — 왜 이렇게 바꿨는지
```

예시:
```
feat: 프로젝트 아카이브 카드 컴포넌트 추가
fix: 모바일에서 헤더 메뉴 겹침 수정
design: 랜딩 페이지 날개 애니메이션 적용
```

- 한 커밋은 하나의 논리적 변경만 담습니다.
- 제목은 50자 내외, 명령형/간결하게.

---

## 4. PR(Pull Request) 규칙

1. 작업이 끝나면 본인 브랜치를 push 합니다.
   ```bash
   git push origin feat/home-landing
   ```
2. GitHub에서 `main` ← `feat/home-landing` 으로 **PR을 생성**합니다.
3. PR 템플릿을 채웁니다. (무엇을, 왜, 어떻게 테스트했는지)
4. **최소 1명의 리뷰 승인(Approve)** 후에만 merge 합니다.
5. 리뷰 코멘트는 반영하거나, 반영하지 않는다면 이유를 답변합니다.
6. merge 방식은 **Squash and merge**를 기본으로 합니다. (커밋 히스토리를 깔끔하게)

### 작업 경계 (충돌 최소화)
- 가급적 **페이지/기능 단위**로 브랜치를 나눠 작업합니다. (`app/` 하위 라우트 단위)
- 공용 컴포넌트(`components/`)나 공통 설정(`lib/`, `db/`)을 건드릴 땐 미리 팀에 공유합니다.
- 작업 시작 전 항상 `main`을 최신화하고 브랜치를 만듭니다.

---

## 5. 이슈 & 작업 관리

- 작업은 **GitHub Issues + Projects(칸반 보드)**로 관리합니다.
- 새 작업은 가능하면 **이슈를 먼저 생성**하고, 본인을 assignee로 지정한 뒤 칸반의 `In Progress`로 옮깁니다.
- 중복 작업을 막고 누가 무엇을 하는지 한눈에 보기 위함입니다.
- PR 설명에 `Closes #이슈번호`를 적으면 merge 시 자동으로 이슈가 닫힙니다.

---

## 6. 코드 스타일

- **TypeScript / ESLint + Prettier** 설정을 따릅니다. (`npm run lint`)
- 포매터가 잡아주는 항목으로 리뷰 시간을 쓰지 않도록, 커밋 전 포맷을 맞춰 주세요.
- **비밀키·토큰은 절대 커밋 금지.** `.env.local`에만 두고, 새 키가 생기면 `.env.example`에 키 이름만 추가합니다.

---

## 7. 포터빌리티 규칙 (꼭 지킬 것)

최종 호스팅은 쿠러그 자체 서버입니다. 락인되면 이전 시 재작성이 되므로:

| 항목 | 하지 말 것 ❌ | 할 것 ✅ |
|------|--------------|---------|
| DB | Supabase Auth/RLS | 순수 Postgres + ORM |
| 인증 | Supabase Auth | Auth.js GitHub provider |
| 파일 | R2 전용 API | S3 호환 SDK |
| 설정 | 하드코딩 | 전부 `.env` |

---

질문은 동아리 채널 또는 이슈로 남겨 주세요. 즐거운 협업 되세요! 🪽
