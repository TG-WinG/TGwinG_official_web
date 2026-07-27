import { Card } from "@/components/ui/card";
import type { Project } from "@/lib/seed";
import { cn } from "@/lib/utils";

type ProjectCardProps = {
  project: Project;
  displayNumber: number;
  isActive?: boolean;
  className?: string;
  onClick?: () => void;
  onMouseEnter?: () => void;
  onMouseLeave?: () => void;
};

export function ProjectCard({
  project,
  displayNumber,
  isActive = false,
  className,
  onClick,
  onMouseEnter,
  onMouseLeave,
}: ProjectCardProps) {
  return (
    <button
      type="button"
      className="h-full w-full"
      aria-pressed={isActive}
      onClick={onClick}
      onMouseEnter={onMouseEnter}
      onMouseLeave={onMouseLeave}
    >
      <Card
        className={cn(
          "flex h-full w-full items-start justify-start",
          "rounded-none border-slate-300 bg-white p-[15px] shadow-none",
          "cursor-pointer hover:bg-[#FFFEC9] hover:shadow-none",
          className,
          isActive && "bg-[#FFFEC9]",
        )}
      >
        <span
          className="overflow-hidden text-ellipsis whitespace-nowrap"
          style={{
            fontFamily: '"Anonymous Pro", monospace',
            fontSize: 20,
            fontStyle: "normal",
            fontWeight: 700,
            lineHeight: 1,
          }}
        >
          {displayNumber} {project.slug}
        </span>
      </Card>
    </button>
  );
}
