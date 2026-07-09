import { Card } from "@/components/ui/card";

type Project = {
  title: string;
  slug: string;
  summary: string;
  stack: string[];
  generation?: string;
  award?: string;
};

export function ProjectCard({ project }: { project: Project }) {
  return (
    <Card className="p-4">
      <h3 className="text-lg font-semibold">{project.title}</h3>
      <p className="mt-1 text-sm text-muted-foreground">{project.summary}</p>
      <div className="mt-3 flex flex-wrap gap-1.5">
        {project.stack.map((s) => (
          <span
            key={s}
            className="rounded-full bg-muted px-2 py-0.5 text-xs text-muted-foreground"
          >
            {s}
          </span>
        ))}
      </div>
      <p className="mt-3 text-xs text-muted-foreground">
        {project.generation}
        {project.award ? ` · 🏆 ${project.award}` : ""}
      </p>
    </Card>
  );
}
