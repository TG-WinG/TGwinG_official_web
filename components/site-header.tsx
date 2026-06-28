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
        <Link href="/" className="text-lg font-bold tracking-tight">
          T.G.win<span className="text-brand">G</span>
        </Link>
        <nav className="flex gap-6 text-sm text-muted-foreground">
          {nav.map((n) => (
            <Link
              key={n.href}
              href={n.href}
              className="transition-colors hover:text-foreground"
            >
              {n.label}
            </Link>
          ))}
        </nav>
      </div>
    </header>
  );
}
