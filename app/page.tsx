import Link from "next/link";

export default function Home() {
  return (
    <section className="mx-auto max-w-5xl px-6">
      <div className="flex flex-col items-start gap-6 py-24 sm:py-32">
        <span className="rounded-full border border-border px-3 py-1 text-xs text-muted-foreground">
          컴퓨터공학 동아리
        </span>
        <h1 className="text-4xl font-bold tracking-tight sm:text-6xl">
          코드에 <span className="text-brand">날개</span>를 달다.
        </h1>
        <p className="max-w-xl text-lg text-muted-foreground">
          T.G.winG은 함께 만들고 기록하는 컴퓨터공학 동아리입니다. 프로젝트와
          기술 블로그로 우리의 성장을 남깁니다.
        </p>
        <div className="flex gap-3">
          <Link
            href="/projects"
            className="rounded-full bg-brand px-5 py-2.5 text-sm font-medium text-brand-foreground transition-opacity hover:opacity-90"
          >
            프로젝트 보기
          </Link>
          <Link
            href="/blog"
            className="rounded-full border border-border px-5 py-2.5 text-sm font-medium transition-colors hover:bg-muted"
          >
            기술블로그
          </Link>
        </div>
      </div>
    </section>
  );
}
