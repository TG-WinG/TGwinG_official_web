"use client";

import { useLayoutEffect, useRef, useState } from "react";

import { ProjectCard } from "@/components/projects/project-card";
import { projects, type Project } from "@/lib/seed";

const GRID_COLUMN_COUNT = 7;
const GRID_ROW_COUNT = 8;
const PROJECT_SLOT_COLUMNS = [
  { colSlot: 0, label: "project2", count: 2, direction: "top" },
  { colSlot: 1, label: "project4", count: 4, direction: "top" },
  { colSlot: 2, label: "project6", count: 6, direction: "top" },
  { colSlot: 3, label: "project8", count: 8, direction: "top" },
  { colSlot: 4, label: "project6", count: 6, direction: "bottom" },
  { colSlot: 5, label: "project4", count: 4, direction: "bottom" },
  { colSlot: 6, label: "project2", count: 2, direction: "bottom" },
] as const;
const SECTION_WIDTH = 1920;
const SECTION_HEIGHT = 1080;
const SITE_HEADER_HEIGHT = 65;
const SECTION_HORIZONTAL_PADDING = 24;
const LEFT_PANEL_X = 23;
const LEFT_PANEL_TOP = 203;
const LEFT_PANEL_WIDTH = 409;
const LEFT_PANEL_TO_GRID_GAP = 36;
const GRID_AREA_LEFT =
  LEFT_PANEL_X + LEFT_PANEL_WIDTH + LEFT_PANEL_TO_GRID_GAP;
const GRID_GUIDE_START_X = SECTION_HORIZONTAL_PADDING + GRID_AREA_LEFT;
const GRID_WIDTH = 1410;
const GRID_HEIGHT = 793;
const GRID_COLUMN_WIDTH = GRID_WIDTH / GRID_COLUMN_COUNT;
const GRID_ROW_HEIGHT = GRID_HEIGHT / GRID_ROW_COUNT;
const TIMELINE_LABEL_TOP = -114;
const PROJECT_TITLE_BASE_HEIGHT = 57;
const PROJECT_TITLE_LINE_HEIGHT = 40;
const PROJECT_SUMMARY_BASE_HEIGHT = 162;
const PROJECT_SUMMARY_MIN_HEIGHT = 40;

export function ProjectsContent() {
  
  const [selectedProject, setSelectedProject] = useState<Project | null>(null);
  const viewportRef = useRef<HTMLDivElement>(null);
  const titleRef = useRef<HTMLDivElement>(null);
  const [sectionScale, setSectionScale] = useState(1);
  const [titleHeight, setTitleHeight] = useState(PROJECT_TITLE_BASE_HEIGHT);
  const summaryHeight = Math.max(
    PROJECT_SUMMARY_MIN_HEIGHT,
    PROJECT_SUMMARY_BASE_HEIGHT -
      (titleHeight - PROJECT_TITLE_BASE_HEIGHT),
  );

  const gridSlots = Array.from(
    { length: GRID_COLUMN_COUNT * GRID_ROW_COUNT },
    (_, index) => {
      const row = Math.floor(index / GRID_COLUMN_COUNT) + 1;
      const colSlot = index % GRID_COLUMN_COUNT;

      return {
        row,
        colSlot,
      };
    },
  );

  const handleProjectClick = (project: Project) => {
    setSelectedProject((currentProject) =>
      currentProject?.slug === project.slug ? null : project,
    );
  };

  useLayoutEffect(() => {
    const updateSectionScale = () => {
      const viewportElement = viewportRef.current;

      if (!viewportElement) {
        return;
      }

      const nextScale = Math.min(
        viewportElement.clientWidth / SECTION_WIDTH,
        viewportElement.clientHeight / SECTION_HEIGHT,
        1,
      );

      setSectionScale(nextScale);
    };

    updateSectionScale();

    const resizeObserver = new ResizeObserver(updateSectionScale);

    if (viewportRef.current) {
      resizeObserver.observe(viewportRef.current);
    }

    window.addEventListener("resize", updateSectionScale);

    return () => {
      resizeObserver.disconnect();
      window.removeEventListener("resize", updateSectionScale);
    };
  }, []);

  useLayoutEffect(() => {
    if (!selectedProject) {
      setTitleHeight(PROJECT_TITLE_BASE_HEIGHT);
      return;
    }

    const titleElement = titleRef.current;

    if (!titleElement) {
      return;
    }

    titleElement.style.height = "auto";

    const styles = window.getComputedStyle(titleElement);
    const paddingTop = Number.parseFloat(styles.paddingTop);
    const paddingBottom = Number.parseFloat(styles.paddingBottom);
    const contentHeight = titleElement.scrollHeight - paddingTop - paddingBottom;
    const lineCount = Math.max(
      1,
      Math.ceil(contentHeight / PROJECT_TITLE_LINE_HEIGHT),
    );
    const hiddenLineCount = lineCount - 1;
    const nextTitleHeight =
      PROJECT_TITLE_BASE_HEIGHT +
      hiddenLineCount * PROJECT_TITLE_LINE_HEIGHT;

    titleElement.style.height = `${nextTitleHeight}px`;
    setTitleHeight(nextTitleHeight);
  }, [selectedProject]);

  return (
    <div
      ref={viewportRef}
      className="flex w-full justify-center overflow-hidden bg-[#c9f4ff]"
      style={{
        height: `calc(100dvh - ${SITE_HEADER_HEIGHT}px)`,
      }}
    >
      <div
        style={{
          width: SECTION_WIDTH * sectionScale,
          height: SECTION_HEIGHT * sectionScale,
        }}
      >
        <section
          className="relative bg-[#c9f4ff] px-6 pb-8 pt-[210px]"
          style={{
            width: SECTION_WIDTH,
            height: SECTION_HEIGHT,
            transform: `scale(${sectionScale})`,
            transformOrigin: "top left",
          }}
        >
      
      <div className="pointer-events-none absolute inset-0">
        {Array.from({ length: 8 }).map((_, index) => (
          <div
            key={index}
            className="absolute top-0 h-full border-l border-dashed border-slate-900"
            style={{
              left: GRID_GUIDE_START_X + index * GRID_COLUMN_WIDTH,
            }}
          />
        ))}
      </div>

      <div className="flex h-full items-start gap-6">
        <div
          className="absolute"
          style={{
            left: LEFT_PANEL_X,
            top: LEFT_PANEL_TOP,
          }}
        >
          <button
            type="button"
            className="flex items-center justify-between rounded-md border border-[#EEE19A] bg-[#FFF7CC] text-slate-900"
            style={{
              width: 409,
              height: 100,
              padding: "0 12px",
            }}
          >
            <span
              style={{
                fontFamily: "Dotum, sans-serif",
                fontSize: 40,
                lineHeight: 1,
              }}
            >
              GET /
            </span>

            <svg
              className="h-4 w-4 text-slate-700"
              viewBox="0 0 20 20"
              fill="none"
              aria-hidden="true"
            >
              <path
                d="M6 7l4 4 4-4"
                stroke="currentColor"
                strokeWidth={1.6}
                strokeLinecap="round"
                strokeLinejoin="round"
              />
            </svg>
          </button>

          {selectedProject ? (
            <div
              className="mt-4 rounded-md bg-[#FFF7CC]"
              style={{
                width: 409,
                height: 716,
              }}
            >
              <div className="flex h-full flex-col items-center px-[12px] pt-[24px]">
                <div
                  className="shrink-0 overflow-hidden rounded-md bg-white"
                  style={{
                    width: 346,
                    height: 289,
                  }}
                />

                <div className="mt-[12px] flex min-h-0 w-full flex-col gap-[8px] overflow-hidden">
                  <div
                    ref={titleRef}
                    className="shrink-0 overflow-hidden break-words rounded-md px-3 py-3 text-slate-900"
                    style={{
                      height: titleHeight,
                      fontFamily: "Dotum, sans-serif",
                      fontSize: 40,
                      lineHeight: 1,
                      width: 289,
                    }}
                  >
                    {selectedProject.title}, {selectedProject.generation}
                  </div>

                  <div
                    className="shrink-0 overflow-hidden rounded-md px-3 py-3 text-slate-900"
                    style={{
                      width: 346,
                      height: summaryHeight,
                      fontFamily: "Dotum, sans-serif",
                      fontSize: 24,
                      lineHeight: 1,
                    }}
                  >
                    {selectedProject.summary}
                  </div>

                  <div
                    className="rounded-md px-3 py-3 text-slate-900"
                    style={{
                      fontFamily: "Dotum, sans-serif",
                      fontSize: 20,
                      lineHeight: 1,
                    }}
                  >
                    members
                  </div>

                  <div
                    className="rounded-md px-3 py-3 text-slate-900"
                    style={{
                      fontFamily: "Dotum, sans-serif",
                      fontSize: 20,
                      lineHeight: 1,
                    }}
                  >
                    {selectedProject.award ?? "awards"}
                  </div>

                  <div className="mt-2 flex gap-2">
                    <div
                      className="flex-1 whitespace-nowrap rounded-md px-3 py-3 text-slate-900"
                      style={{
                        fontFamily: "Dotum, sans-serif",
                        fontSize: 20,
                        lineHeight: 1,
                      }}
                    >
                      yyyy.mm.dd update
                    </div>

                    <div
                      className="flex-1 rounded-md px-3 py-3 text-right text-slate-900"
                      style={{
                        fontFamily: "Dotum, sans-serif",
                        fontSize: 20,
                        lineHeight: 1,
                      }}
                    >
                      build
                    </div>
                  </div>
                </div>
              </div>
            </div>
          ) : null}
        </div>

        <div className="h-full flex-1" style={{ marginLeft: GRID_AREA_LEFT }}>
          <div className="relative h-full rounded-md">
            <div className="relative h-full">
              <div
                className="pointer-events-none absolute left-0 z-10 grid gap-0"
                style={{
                  fontFamily: "Dotum, sans-serif",
                  top: TIMELINE_LABEL_TOP,
                  width: GRID_WIDTH,
                  gridTemplateColumns: `repeat(${GRID_COLUMN_COUNT}, minmax(0, 1fr))`,
                }}
              >
                {[
                  "t2",
                  "t4",
                  "t6",
                  "t8",
                  "t10",
                  "t12",
                  "t14",
                ].map((label) => (
                  <div
                    key={label}
                    className="flex h-10 items-center justify-center px-[6px] text-center text-slate-900"
                    style={{
                      lineHeight: 1,
                    }}
                  >
                    <span className="h-px flex-1 border-t border-slate-900" />

                    <span
                      className="mx-[6px]"
                      style={{
                        fontSize: 40,
                      }}
                    >
                      {label}
                    </span>

                    <span className="h-px flex-1 border-t border-slate-900" />
                  </div>
                ))}
              </div>

              <div className="absolute left-0 top-0">
                <div
                  className="grid gap-0"
                  style={{
                    width: GRID_WIDTH,
                    height: GRID_HEIGHT,
                    gridAutoRows: GRID_ROW_HEIGHT,
                    gridTemplateColumns: `repeat(${GRID_COLUMN_COUNT * 2}, minmax(0, 1fr))`,
                  }}
                >
                  {gridSlots.map(({ row, colSlot }, index) => {
                    const projectSlot = PROJECT_SLOT_COLUMNS.find(
                      (slot) => slot.colSlot === colSlot,
                    );
                    const isProjectSlot =
                      projectSlot?.direction === "top"
                        ? row <= projectSlot.count
                        : row > GRID_ROW_COUNT - (projectSlot?.count ?? 0);
                    const project =
                      isProjectSlot && row === 1 && colSlot < projects.length
                        ? projects[colSlot]
                        : undefined;

                    const gridStyle = {
                      gridColumn: `${colSlot * 2 + 1} / span 2`,
                      gridRow: row,
                    };

                    if (!projectSlot || !isProjectSlot) {
                      return null;
                    }

                    if (!project) {
                      return (
                        <div
                          key={`project-slot-${index}`}
                          className="flex h-full w-full items-center justify-center border border-slate-300 bg-white text-slate-800"
                          style={{
                            ...gridStyle,
                            fontFamily: "Dotum, sans-serif",
                            fontSize: 18,
                            lineHeight: 1.25,
                          }}
                        >
                          {projectSlot.label}
                        </div>
                      );
                    }

                    return (
                      <div key={project.slug} style={gridStyle}>
                        <ProjectCard
                          project={project}
                          isActive={selectedProject?.slug === project.slug}
                          className="h-full w-full"
                          onClick={() => handleProjectClick(project)}
                        />
                      </div>
                    );
                  })}
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
        </section>
      </div>
    </div>
  );
}
