# T.G.winG 공식 웹

T.G.winG 동아리의 공식 웹사이트입니다. 'winG(날개)' 브랜딩과 컴퓨터공학 컨셉을 녹인,
동아리의 정체성이 되는 홈페이지를 목표로 합니다.

> 개발 방식: **MVP 골격을 먼저 구축**한 뒤, 참여자들이 **브랜치 → PR**로 기능을 채워 나갑니다.
> 자세한 협업 규칙은 [CONTRIBUTING.md](./CONTRIBUTING.md)를 먼저 읽어 주세요.

## 기술 스택

| 영역 | 스택 |
|------|------|
| Frontend | React + Vite + **TypeScript** |
| Backend | Spring Boot |
| 협업 | Git / GitHub (PR 기반) |

## 프로젝트 구조

```
tgwing-web/
├── frontend/   # React (Vite + TS)
├── backend/    # Spring Boot
└── .github/    # PR / 이슈 템플릿
```

## 주요 페이지

**Public (누구나)**
- 홈 / 랜딩 (스크롤형, winG 날개 애니메이션)
- 프로젝트 아카이브 (카드형, 기수·스택·수상 필터)
- 기술 블로그 아카이브 (외부 아티클 링크 + OG 썸네일)

**Private (멤버만 — 학번·이름 기반 접근)**
- 족보 공유 (파일 업로드)
- 스터디 / 팀 모집
- 공지 / 일정
- 관리자 페이지

## 로컬 실행

### Frontend

```bash
cd frontend
npm install
npm run dev
```

### Backend

```bash
cd backend
./gradlew bootRun
```

> 아직 골격 구축 단계입니다. 위 명령은 각 디렉터리 세팅 완료 후 동작합니다.

## 기여하기

이 프로젝트는 PR 기반으로 협업합니다. 처음 참여한다면 [CONTRIBUTING.md](./CONTRIBUTING.md)를 반드시 확인하세요.
