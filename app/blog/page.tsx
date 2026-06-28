import type { Metadata } from "next";
import { Card } from "@/components/ui/card";
import { blogPosts } from "@/lib/seed";

export const metadata: Metadata = { title: "기술블로그" };

export default function BlogPage() {
  return (
    <section className="mx-auto max-w-5xl px-6 py-16">
      <h1 className="text-2xl font-bold tracking-tight">기술블로그</h1>
      <p className="mt-2 text-muted-foreground">
        멤버들이 남기는 기술 기록. (현재는 예시 데이터 — 멤버 PR로 채웁니다)
      </p>
      <div className="mt-8 grid gap-4 sm:grid-cols-2">
        {blogPosts.map((post) => (
          <Card key={post.slug}>
            <div className="flex flex-wrap gap-1.5">
              {post.tags.map((t) => (
                <span
                  key={t}
                  className="rounded-full bg-muted px-2 py-0.5 text-xs text-muted-foreground"
                >
                  #{t}
                </span>
              ))}
            </div>
            <h2 className="mt-2 font-semibold">{post.title}</h2>
            <p className="mt-1 text-sm text-muted-foreground">{post.excerpt}</p>
            <p className="mt-3 text-xs text-muted-foreground">
              {post.author} · {post.date}
            </p>
          </Card>
        ))}
      </div>
    </section>
  );
}
