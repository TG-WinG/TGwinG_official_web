import React from "react";

type TimelineItem = {
  id: string;
  title: string;
  start: number; // column index
  length: number; // span across columns
};

export function ProjectTimeline({ items, columns = 12 }: { items: TimelineItem[]; columns?: number }) {
  return (
    <div className="mt-6">
      <div className="overflow-auto bg-sky-50 p-4 rounded-md">
        <div className="min-w-[800px] grid grid-cols-12 gap-2">
          {Array.from({ length: columns }).map((_, i) => (
            <div key={i} className="border-r border-dashed border-sky-200 py-8"></div>
          ))}
          {items.map((it) => (
            <div
              key={it.id}
              className={`col-start-${it.start} col-span-${it.length} bg-white p-2 text-sm border`}
              style={{ alignSelf: "start" }}
            >
              {it.title}
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
