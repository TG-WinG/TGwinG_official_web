import { Card } from "@/components/ui/card";
import type { Project } from "@/lib/seed";
import { cn } from "@/lib/utils";

type ProjectCardProps = {
  project: Project;
  isActive?: boolean;
  className?: string;
  onClick?: () => void;
};

export function ProjectCard({
  project,
  isActive = false,
  className,
  onClick,
}: ProjectCardProps) {
  return (
    <button
      type="button"
      className="h-full w-full"
      aria-pressed={isActive}
      onClick={onClick}
    >
      <Card
        className={cn(
          "flex h-full w-full items-center justify-center",
          "rounded-none border-slate-300 bg-white p-0 shadow-none",
          "cursor-pointer hover:shadow-none",
          isActive && "border-slate-900 bg-[#FFF7CC]",
          className,
        )}
      >
        <span
          className="overflow-hidden text-ellipsis whitespace-nowrap px-2"
          style={{
            fontFamily: "Dotum, sans-serif",
            fontSize: 18,
            lineHeight: 1.25,
          }}
        >
          {project.title}
        </span>
      </Card>
    </button>
  );
}
