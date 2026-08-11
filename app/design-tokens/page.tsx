import type { Metadata } from "next";

export const metadata: Metadata = { title: "디자인 토큰" };

// 토큰 확인용 페이지. 여기 있는 모든 샘플은 globals.css의 토큰만 참조한다 —
// raw hex가 한 개도 없으므로, :root의 원시 팔레트만 바꾸면 이 페이지 전체가
// 따라 바뀐다. (이슈 #10 완료 조건 검증용)

const swatches = [
  {
    cls: "bg-background",
    name: "background",
    token: "--background ← --paper",
    use: "페이지 바탕(종이)",
  },
  {
    cls: "bg-foreground",
    name: "foreground",
    token: "--foreground ← --ink",
    use: "본문 텍스트·구조선",
  },
  {
    cls: "bg-brand",
    name: "brand",
    token: "--brand ← --red",
    use: "강조·활성 상태·구분선",
  },
  {
    cls: "bg-accent",
    name: "accent",
    token: "--accent ← --marker",
    use: "형광펜 하이라이트",
  },
  {
    cls: "bg-muted-foreground",
    name: "muted-foreground",
    token: "--muted-foreground",
    use: "보조 텍스트 (4.6:1) — 피그마 미지정, 잠정값",
  },
  {
    cls: "bg-ghost",
    name: "ghost",
    token: "--ghost",
    use: "피그마 원값 — 비활성 목록 전용 (읽는 텍스트 금지)",
  },
];

const typeScale = [
  { cls: "text-xs", label: "text-xs", px: "14px" },
  { cls: "text-sm", label: "text-sm", px: "16px" },
  { cls: "text-base", label: "text-base", px: "20px ★ 본문" },
  { cls: "text-lg", label: "text-lg", px: "24px" },
  { cls: "text-xl", label: "text-xl", px: "28px ★ 항목 제목" },
  { cls: "text-2xl", label: "text-2xl", px: "32px ★ 페이지 제목" },
  { cls: "text-3xl", label: "text-3xl", px: "40px ★ 카드 제목" },
  { cls: "text-4xl", label: "text-4xl", px: "56px" },
  { cls: "text-5xl", label: "text-5xl", px: "80px" },
];

const categories = [
  { label: "khuthon", state: "비활성" },
  { label: "khuthon(new)", state: "활성" },
  { label: "yeso", state: "비활성" },
  { label: "tgthon", state: "비활성" },
];

function Section({
  title,
  children,
}: {
  title: string;
  children: React.ReactNode;
}) {
  return (
    <section className="mt-16">
      <h2 className="border-b border-border-accent pb-2 text-xl font-bold">
        {title}
      </h2>
      <div className="mt-6">{children}</div>
    </section>
  );
}

export default function DesignTokensPage() {
  return (
    <div className="mx-auto max-w-5xl px-6 py-16">
      <h1 className="relative inline-block text-2xl font-bold">
        <span
          aria-hidden
          className="absolute inset-x-0 bottom-1 h-3 bg-accent shadow-marker"
        />
        <span className="relative">design tokens</span>
      </h1>
      <p className="mt-4 max-w-2xl text-sm text-muted-foreground">
        출처: Figma &ldquo;TGwing&rdquo;. 색·폰트를 바꿀 때는{" "}
        <code className="border border-border px-1">app/globals.css</code>의 원시
        팔레트 4개(
        <code className="border border-border px-1">
          --paper --ink --red --marker
        </code>
        )만 고친다. 이 페이지에는 raw hex가 없으므로, 그 4줄만 바꾸면 아래 전체가
        따라 바뀐다.
      </p>

      <Section title="1. 색">
        <ul className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
          {swatches.map((s) => (
            <li key={s.name} className="border border-border">
              <div className={`h-20 border-b border-border ${s.cls}`} />
              <div className="p-3">
                <p className="font-bold">{s.name}</p>
                <p className="mt-1 text-xs text-muted-foreground">{s.token}</p>
                <p className="mt-1 text-xs text-muted-foreground">{s.use}</p>
              </div>
            </li>
          ))}
        </ul>
      </Section>

      <Section title="2. 타이포">
        <p className="text-sm text-muted-foreground">
          Anonymous Pro (Regular 400 / Bold 700). 한글 글리프가 없어 한글은
          시스템 고딕으로 폴백된다 — 아래 각 줄에서 라틴/한글이 섞인 모습을
          그대로 확인할 수 있다.
        </p>
        <ul className="mt-6 divide-y divide-border">
          {typeScale.map((t) => (
            <li
              key={t.cls}
              className="flex flex-wrap items-baseline gap-x-6 gap-y-1 py-4"
            >
              <span className="w-40 shrink-0 text-xs text-muted-foreground">
                {t.label} · {t.px}
              </span>
              <span className={`${t.cls} truncate`}>
                TGwinG 날개 0123
              </span>
            </li>
          ))}
        </ul>
        <div className="mt-8 flex flex-wrap gap-8">
          <p className="text-xl">Regular — 본문 TGwinG 날개</p>
          <p className="text-xl font-bold">Bold — 제목 TGwinG 날개</p>
        </div>
      </Section>

      <Section title="3. 상태 · 형태">
        <div className="grid gap-8 sm:grid-cols-2">
          <div>
            <p className="text-xs text-muted-foreground">
              카테고리 목록 — 활성/비활성
            </p>
            <ul className="mt-3 space-y-1 text-xl font-bold">
              {categories.map((c) => (
                <li
                  key={c.label}
                  className={c.state === "활성" ? "text-brand" : "text-ghost"}
                >
                  {c.label}
                </li>
              ))}
            </ul>
          </div>

          <div>
            <p className="text-xs text-muted-foreground">테두리 · 그림자</p>
            <div className="mt-3 space-y-3">
              <div className="border border-border p-3 text-sm">
                border-border (잉크 · 구조선)
              </div>
              <div className="border border-border-accent p-3 text-sm">
                border-border-accent (빨강 · 강조선)
              </div>
              <div className="border border-border p-3 text-sm shadow-panel">
                shadow-panel
              </div>
              <div className="border border-border p-3 text-sm shadow-marker">
                shadow-marker
              </div>
            </div>
          </div>
        </div>
      </Section>

      <Section title="4. 다크모드">
        <p className="max-w-2xl text-sm text-muted-foreground">
          v1 범위 밖(이슈 #10). 켤 때는 globals.css 하단의 주석 처리된{" "}
          <code className="border border-border px-1">
            :root[data-theme=&quot;dark&quot;]
          </code>{" "}
          블록만 풀고 원시 팔레트 4개를 뒤집으면 된다. 시맨틱 토큰과 컴포넌트는
          손대지 않는다.
        </p>
      </Section>
    </div>
  );
}
