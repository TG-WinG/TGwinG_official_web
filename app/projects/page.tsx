import type { Metadata } from "next";
import { Card } from "@/components/ui/card";
import { projects } from "@/lib/seed";

export const metadata: Metadata = { title: "프로젝트" };

export default function ProjectsPage() {
  return (
    <section className="mx-auto max-w-5xl px-6 py-16">
      <h1 className="text-2xl font-bold tracking-tight">프로젝트 아카이브</h1>
      <p className="mt-2 text-muted-foreground">
        T.G.winG 멤버들이 만든 프로젝트 기록. (현재는 예시 데이터 — 멤버 PR로 채웁니다)
      </p>
      <div className="mt-8 grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
        {projects.map((p) => (
          <Card key={p.slug}>
            <h2 className="font-semibold">{p.title}</h2>
            <p className="mt-1 text-sm text-muted-foreground">{p.summary}</p>
            <div className="mt-3 flex flex-wrap gap-1.5">
              {p.stack.map((s) => (
                <span
                  key={s}
                  className="rounded-full bg-muted px-2 py-0.5 text-xs text-muted-foreground"
                >
                  {s}
                </span>
              ))}
            </div>
            <p className="mt-3 text-xs text-muted-foreground">
              {p.generation}
              {p.award ? ` · 🏆 ${p.award}` : ""}
            </p>
          </Card>
        ))}
      </div>
    </section>
  );
}
