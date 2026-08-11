import Link from "next/link";

const nav = [
  { href: "/", label: "홈" },
  { href: "/projects", label: "프로젝트" },
  { href: "/blog", label: "기술블로그" },
];

export function SiteHeader() {
  return (
    <header className="border-b border-border">
      <div className="mx-auto flex h-16 max-w-5xl items-center justify-between px-6">
        <Link href="/" className="relative text-lg font-bold tracking-tight">
          {/* 형광펜 밑줄 — 피그마 페이지 제목의 시그니처 */}
          <span
            aria-hidden
            className="absolute inset-x-0 bottom-0.5 h-2 bg-accent shadow-marker"
          />
          <span className="relative">
            T.G.win<span className="text-brand">G</span>
          </span>
        </Link>
        <nav className="flex gap-6 text-sm">
          {nav.map((n) => (
            <Link
              key={n.href}
              href={n.href}
              className="transition-colors hover:text-brand"
            >
              {n.label}
            </Link>
          ))}
        </nav>
      </div>
    </header>
  );
}
