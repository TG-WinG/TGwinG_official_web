export function SiteFooter() {
  return (
    <footer className="border-t border-border">
      <div className="mx-auto flex max-w-5xl flex-col gap-1 px-6 py-8 text-sm text-muted-foreground">
        <p className="font-semibold text-foreground">T.G.winG</p>
        <p>컴퓨터공학 동아리 · 코드에 날개를 달다</p>
        <a
          href="https://github.com/TG-WinG"
          className="w-fit transition-colors hover:text-foreground"
        >
          github.com/TG-WinG
        </a>
      </div>
    </footer>
  );
}
