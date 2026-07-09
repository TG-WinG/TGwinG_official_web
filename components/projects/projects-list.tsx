import { projects as seed } from "@/lib/seed";
import { ProjectCard } from "./project-card";
import { ProjectTimeline } from "./project-timeline";

export function ProjectsList() {
  // Simple timeline mock data derived from seed order
  const timelineItems = seed.map((p, idx) => ({
    id: p.slug,
    title: p.title,
    start: Math.max(1, idx + 1),
    length: 2,
  }));

  return (
    <section className="mx-auto max-w-5xl px-6 py-16">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-2xl font-bold tracking-tight">프로젝트 아카이브</h1>
          <p className="mt-2 text-muted-foreground">
            T.G.winG 멤버들이 만든 프로젝트 기록. (예시 데이터)
          </p>
        </div>
      </div>

      <div className="mt-8 grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
        {seed.map((p) => (
          <ProjectCard key={p.slug} project={p} />
        ))}
      </div>

      <ProjectTimeline items={timelineItems} columns={12} />
    </section>
  );
}
