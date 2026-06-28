# AGENTS.md

T.G.winG 웹 — 에이전트·기여자 공통 규칙.

## Git

- **fork 모델**: `origin` = 내 포크, `upstream` = 동아리 본 레포(`TG-WinG/TGwinG_official_web`).
- **로컬을 믿지 말 것.** 작업/PR 전 항상 `git fetch upstream` 후 **`upstream/main`에서 브랜치를 딴다.** 로컬 `main`·기존 브랜치는 stale일 수 있다.
- **stale 로컬에서 push/PR 금지.** squash 머지된 브랜치는 로컬에 옛 커밋이 남아도 내용은 이미 `upstream/main`에 있다 — PR 만들기 전 `git diff upstream/main..HEAD`로 실제 차이를 확인한다.
- **PR**: 포크 브랜치 → `upstream/main`, **작은 포커스 단위**로 하나씩.
- **비밀키 커밋 금지** — `.env.example`에 이름만 올린다.

## 가드레일

- **포터빌리티**: 클라우드 lock-in 금지(순수 Postgres·S3 호환 SDK·설정은 전부 `.env`). 새 의존성 추가 전 확인. 근거 → `docs/DECISIONS.md`
- **비밀키 0개 부팅 유지**: 기능을 추가해도 `npm run dev`가 시크릿 없이 떠야 한다(seed·dev bypass). 신입 첫 PR 진입장벽 원칙.

## 문서 지도 (중복 금지)

- 협업 절차·브랜치·커밋 규칙 → `CONTRIBUTING.md`
- 기술·운영 결정 근거·대안 → `docs/DECISIONS.md`
- 개요·스택·구조 → `README.md`

이 파일은 **짧게** 유지하고 상세는 위 문서로 링크한다.
