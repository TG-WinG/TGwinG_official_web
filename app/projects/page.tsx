import type { Metadata } from "next";

export const metadata: Metadata = { title: "프로젝트" };
export default function ProjectsPage() {
  const cards: { title: string; col: number; row: number }[] = [];

  const columns = [
    { col: 1, title: "project2", count: 2, direction: "top" },
    { col: 3, title: "project4", count: 4, direction: "top" },
    { col: 5, title: "project6", count: 6, direction: "top" },
    { col: 7, title: "project8", count: 8, direction: "top" },
    { col: 9, title: "project6", count: 6, direction: "bottom" },
    { col: 11, title: "project4", count: 4, direction: "bottom" },
    { col: 13, title: "project2", count: 2, direction: "bottom" },
  ] as const;

  columns.forEach((column) => {
    if (column.direction === "top") {
      for (let row = 1; row <= column.count; row++) {
        cards.push({ title: column.title, col: column.col, row });
      }
    } else {
      for (let index = 0; index < column.count; index++) {
        cards.push({ title: column.title, col: column.col, row: 8 - index });
      }
    }
  });

  return (
    <section className="bg-[#c9f4ff] mx-auto px-6 pb-8 pt-[210px] relative" style={{ width: "1920px", height: "1080px" }}>
      <div className="absolute inset-0 pointer-events-none">
        {Array.from({ length: 8 }).map((_, i) => (
          <div
            key={i}
            className="absolute top-0 h-full border-l border-dashed border-slate-900"
            style={{ left: 492 + i * 201.428571 }}
          />
        ))}
      </div>

      <div className="flex items-start gap-6 h-full">
        <div className="flex-shrink-0 absolute left-[23px] top-[203px]">
          <button className="flex items-center justify-between bg-[#FFF7CC] border border-[#EEE19A] text-slate-900 rounded-md"
            style={{ width: 409, height: 100, padding: "0 12px" }}>
            <span style={{ fontFamily: "Dotum, sans-serif", fontSize: 40, lineHeight: 1 }}>
              GET /
            </span>
            <svg className="w-4 h-4 text-slate-700" viewBox="0 0 20 20" fill="none" aria-hidden>
              <path d="M6 7l4 4 4-4" stroke="currentColor" strokeWidth={1.6} strokeLinecap="round" strokeLinejoin="round" />
            </svg>
          </button>
        </div>

        <div className="flex-1 h-full" style={{ marginLeft: 468 }}>
          <div className="rounded-md relative h-full">
            <div className="h-full relative">
              {/* labels above the grid */}
              <div className="absolute left-0 top-[-114px] w-[1410px] grid grid-cols-7 gap-0 pointer-events-none z-10" style={{ fontFamily: "Dotum, sans-serif" }}>
                {[
                  "t2",
                  "t4",
                  "t6",
                  "t8",
                  "t10",
                  "t12",
                  "t14",
                ].map((label, index) => (
                  <div
                    key={index}
                    className="flex items-center text-slate-900 justify-center text-center px-[6px]"
                    style={{ lineHeight: 1, height: 40, width: "100%" }}
                  >
                    <span className="flex-1 h-px border-t border-slate-900" />
                    <span className="mx-[6px]" style={{ fontSize: 40 }}>{label}</span>
                    <span className="flex-1 h-px border-t border-slate-900" />
                  </div>
                ))}
              </div>

              {/* cards placed on grid */}
              <div className="absolute left-0 top-0">
                <div className="grid grid-cols-14 gap-0" style={{ width: 1410, height: 793, gridAutoRows: 99.125 }}>
                  {cards.map((c, idx) => (
                    <button
                      key={idx}
                      className="bg-white border border-slate-300 text-slate-800 rounded-none"
                      style={{
                        gridColumn: `${c.col} / span 2`,
                        gridRow: `${c.row}`,
                        width: "100%",
                        height: "100%",
                        padding: 0,
                        display: "flex",
                        alignItems: "center",
                        justifyContent: "center",
                        boxSizing: "border-box",
                        fontFamily: "Dotum, sans-serif",
                        fontSize: 40,
                        lineHeight: 1,
                      }}
                    >
                      {c.title}
                    </button>
                  ))}
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
