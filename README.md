# T.G.winG 공식 웹

T.G.winG 동아리의 공식 웹사이트. 'winG(날개)' 브랜딩과 컴퓨터공학 컨셉을 녹인 홈페이지.

🔗 **배포**: https://tgwing.dpdns.org

**동아리원이 함께 만들어가는 웹사이트입니다.** 필요한 기능이나 고치고 싶은 이슈가 보이면
직접 코드를 고치고 PR을 올리세요. 학교 동아리 안에서 **오픈소스 기여를 그대로 체험**하는 게 목표입니다 —
이슈 잡기 → 브랜치 → PR → 리뷰 → 머지 → 실제 배포까지.

개발 방식: MVP 골격을 먼저 구축한 뒤 브랜치 → PR로 기능을 채운다.
협업 규칙은 [CONTRIBUTING.md](./CONTRIBUTING.md), 기술·운영 결정의 근거와 대안은 [docs/DECISIONS.md](./docs/DECISIONS.md) 참고.

## 기술 스택

| 영역 | 스택 |
|------|------|
| 프레임워크 | **Next.js** (App Router) + **TypeScript** — 프론트 + API 단일 |
| DB | **PostgreSQL** + ORM (Drizzle 또는 Prisma) |
| 인증 | **Auth.js** (NextAuth) + GitHub OAuth — GitHub Org 멤버십으로 멤버 판정 |
| 파일 저장 | **Cloudflare R2** (S3 호환 SDK) — 스터디 자료 등 |
| 개발 단계 배포 | **Vercel** (Hobby, 무료) |
| 도메인 | **`tgwing.dpdns.org`** (임시·무료) → 추후 **`tgwing.kr`** · DNS는 **Cloudflare** |
| 최종 호스팅 | **쿠러그(KU LUG) 자체 서버** (Docker) — 다음 학기 이전 |

별도 백엔드 없이 **Next.js 하나로** 운영하고, 특정 클라우드에 종속되지 않게 짭니다
(순수 Postgres · S3 호환 SDK · 설정은 전부 `.env`, **비밀키 커밋 금지**).
이렇게 한 이유와 대안 비교는 [docs/DECISIONS.md](./docs/DECISIONS.md) 참고.

## 프로젝트 구조

```
TGwinG_official_web/
├── app/          # Next.js App Router (페이지 + API Routes)
├── components/   # 공용 컴포넌트
├── lib/          # DB · 인증 · 스토리지 클라이언트
├── db/           # 스키마 · 마이그레이션 (ORM)
├── public/       # 정적 에셋
└── .github/      # PR / 이슈 템플릿
```

## 배포 & 도메인

지금 사이트는 **임시 무료 도메인 `tgwing.dpdns.org`**으로 떠 있다. 정식 `tgwing.kr`이 준비되면 갈아탄다.

구조: **등록처(DigitalPlat) → DNS(Cloudflare, 무료) → 호스팅(Vercel, 무료)** 3단.
DigitalPlat이 DNS 레코드 편집을 안 줘서 네임서버를 Cloudflare로 위임하고, 거기서 A/TXT 레코드를 관리한다.
`main` 브랜치에 push되면 Vercel이 자동으로 production 배포한다.

> 셋업 단계·함정(프록시 OFF 등)·확인 명령·`tgwing.kr` 전환 절차까지 **초보자용 전체 가이드는
> [docs/DEPLOYMENT.md](./docs/DEPLOYMENT.md)** 참고. 도메인 선택 근거는 [docs/DECISIONS.md](./docs/DECISIONS.md) 7번.

## 가용성 / failover

쿠러그 이전 후에도 Vercel 배포를 살려둬 **수동 failover** 대기소로 쓴다. 쿠러그 다운 시 DNS만 Vercel로 돌리면 복구.
자동 failover는 만들지 않는다(유지보수 부담). 즉시 failover가 필요하면 DB·파일을 매니지드(Supabase/Neon + R2)로 유지해 양쪽이 같은 데이터를 보게 한다. 근거는 [docs/DECISIONS.md](./docs/DECISIONS.md) 15번.

## 주요 페이지

**Public (누구나)**
- 홈 / 랜딩 (스크롤형, winG 날개 애니메이션)
- 프로젝트 아카이브 (카드형, 기수·스택·수상 필터)
- 기술 블로그 아카이브 (외부 아티클 링크 + OG 썸네일)

**Private (멤버만 — GitHub Org 멤버십 기반)**
- 스터디 자료 공유 (파일 업로드)
- 스터디 / 팀 모집
- 공지 / 일정
- 관리자 페이지

## 로컬 실행 (비밀키 0개)

```bash
git clone <repo>
npm install
npm run dev          # → http://localhost:3000
```

비밀키·DB·OAuth 세팅 **없이** 바로 뜹니다(신입의 첫 PR 진입장벽 제거).
현재는 **린 랜딩 단계**로 홈 / 프로젝트 / 기술블로그가 `lib/seed.ts`의 예시 데이터로 렌더되며,
실제 Postgres·R2·GitHub OAuth는 *배포 단계*에서 `.env.example`을 복사해 채웁니다.

## 작업 관리

세부 작업은 **GitHub Issues + Projects(칸반 보드)**로 관리합니다.
기술·운영 결정은 [docs/DECISIONS.md](./docs/DECISIONS.md) 단일 문서로 관리합니다.

## 기여하기

이 프로젝트는 PR 기반으로 협업합니다. **처음이라면 [CONTRIBUTING.md](./CONTRIBUTING.md)를 반드시 확인하세요.**

기여는 거창할 필요 없습니다 — 오타 수정, 문구 다듬기, CSS 한 줄도 환영합니다.
[Issues](https://github.com/TG-WinG/TGwinG_official_web/issues)에서 할 일을 고르거나, 직접 이슈를 열어 제안하세요.
로컬 실행에 비밀키가 필요 없으니(위 "로컬 실행" 참고) 클론하고 `npm run dev`만 하면 바로 시작할 수 있습니다.
