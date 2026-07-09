import Link from "next/link";
import type { SessionUser } from "@/types/session";

const nav = [
  { href: "/", label: "홈" },
  { href: "/projects", label: "프로젝트" },
  { href: "/blog", label: "기술블로그" },
];

// 세션은 서버(app/layout.tsx)에서 읽어 prop으로 내려준다.
// 컴포넌트가 lib/auth를 직접 import하면 서버 코드가 클라이언트 번들로 샐 수 있어 금지 (#6).
export function SiteHeader({ user }: { user?: SessionUser | null }) {
  return (
    <header className="border-b border-border">
      <div className="mx-auto flex h-16 max-w-5xl items-center justify-between px-6">
        <Link href="/" className="text-lg font-bold tracking-tight">
          T.G.win<span className="text-brand">G</span>
        </Link>
        <div className="flex items-center gap-6">
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
          {/* 로그인/로그아웃 UI는 #30. 지금은 세션이 굽혔는지만 표시. */}
          {user ? (
            <span className="text-sm font-medium text-foreground">
              {user.name}님
            </span>
          ) : null}
        </div>
      </div>
    </header>
  );
}
