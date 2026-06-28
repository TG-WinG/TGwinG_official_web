import { cn } from "@/lib/utils";

// 최소 Card 프리미티브 (shadcn 스타일). 본격 컴포넌트는 shadcn add로 확장.
export function Card({ className, ...props }: React.ComponentProps<"div">) {
  return (
    <div
      className={cn(
        "rounded-lg border border-border bg-card p-5 transition-shadow hover:shadow-md",
        className,
      )}
      {...props}
    />
  );
}
