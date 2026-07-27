"use client";

import { useLayoutEffect, useRef, useState } from "react";

import { ProjectCard } from "@/components/projects/project-card";
import { PageTitleLogo } from "@/lib/page-title-logo";
import { projects, type Project } from "@/lib/seed";

const GRID_COLUMN_COUNT = 7;
const GRID_ROW_COUNT = 8;
const PROJECT_SLOT_COLUMNS = [
  { colSlot: 0, count: 2, direction: "top" },
  { colSlot: 1, count: 4, direction: "top" },
  { colSlot: 2, count: 6, direction: "top" },
  { colSlot: 3, count: 8, direction: "top" },
  { colSlot: 4, count: 6, direction: "bottom" },
  { colSlot: 5, count: 4, direction: "bottom" },
  { colSlot: 6, count: 2, direction: "bottom" },
] as const;
const PROJECT_CATEGORIES = [
  "khuthon",
  "khuthon(new)",
  "yeso",
  "tgthon",
  "design thinking",
  "sw festival",
  "lokhuthon",
  "jolup project",
] as const;

type ProjectCategory = (typeof PROJECT_CATEGORIES)[number];
type ProjectSlot = {
  colSlot: number;
  row: number;
};

const PROJECTS_BY_CATEGORY: Record<ProjectCategory, Project[]> = {
  khuthon: [],
  "khuthon(new)": projects,
  yeso: [],
  tgthon: [],
  "design thinking": [],
  "sw festival": [],
  lokhuthon: [],
  "jolup project": [],
};

const PROJECT_SLOTS: ProjectSlot[] = PROJECT_SLOT_COLUMNS.flatMap((slot) =>
  Array.from({ length: slot.count }, (_, index) => ({
    colSlot: slot.colSlot,
    row:
      slot.direction === "top"
        ? index + 1
        : GRID_ROW_COUNT - slot.count + index + 1,
  })),
);
const PROJECT_SLOT_KEYS = new Set(
  PROJECT_SLOTS.map((slot) => `${slot.colSlot}-${slot.row}`),
);

const SECTION_WIDTH = 1920;
const SECTION_HEIGHT = 1080;
const SITE_HEADER_HEIGHT = 65;
const LEFT_PANEL_X = 24;
const LEFT_PANEL_TOP = 40;
const LEFT_PANEL_WIDTH = 239;
const LEFT_PANEL_TO_GRID_GAP = 214;
const GRID_AREA_LEFT = LEFT_PANEL_X + LEFT_PANEL_WIDTH + LEFT_PANEL_TO_GRID_GAP;
const GRID_GUIDE_START_X = GRID_AREA_LEFT;
const GRID_WIDTH = 1410;
const GRID_HEIGHT = 793;
const GRID_COLUMN_WIDTH = GRID_WIDTH / GRID_COLUMN_COUNT;
const GRID_ROW_HEIGHT = GRID_HEIGHT / GRID_ROW_COUNT;
const TIMELINE_LABEL_TOP = -114;
const ACCENT = "#ff2d2d";
const PROJECT_SLOT_BORDER_WIDTH = 2;
const SHARED_PROJECT_SLOT_BORDER_WIDTH = 1;
const PROJECT_PREVIEW_WIDTH = 871;
const PROJECT_PREVIEW_HEIGHT = 566;
const PROJECT_PREVIEW_IMAGE_HEIGHT = 466;
const PROJECT_PREVIEW_OFFSET_X = 33;
const PROJECT_PREVIEW_OFFSET_Y = 24;
const PROJECT_PREVIEW_CONTENT_PADDING = 15;
const PROJECT_PREVIEW_TEXT_SIZE = 20;
const PROJECT_PREVIEW_DETAILS_LEFT = 223;
const PROJECT_PREVIEW_DETAILS_WIDTH =
  PROJECT_PREVIEW_WIDTH -
  PROJECT_PREVIEW_DETAILS_LEFT -
  PROJECT_PREVIEW_CONTENT_PADDING;
const PROJECT_PREVIEW_META_WIDTH =
  PROJECT_PREVIEW_DETAILS_LEFT - PROJECT_PREVIEW_CONTENT_PADDING * 2;

function getProjectSlotBorderStyle(slot: ProjectSlot) {
  const hasNeighbor = (colSlot: number, row: number) =>
    PROJECT_SLOT_KEYS.has(`${colSlot}-${row}`);

  return {
    borderColor: ACCENT,
    borderStyle: "solid",
    borderTopWidth: hasNeighbor(slot.colSlot, slot.row - 1)
      ? SHARED_PROJECT_SLOT_BORDER_WIDTH
      : PROJECT_SLOT_BORDER_WIDTH,
    borderRightWidth: hasNeighbor(slot.colSlot + 1, slot.row)
      ? SHARED_PROJECT_SLOT_BORDER_WIDTH
      : PROJECT_SLOT_BORDER_WIDTH,
    borderBottomWidth: hasNeighbor(slot.colSlot, slot.row + 1)
      ? SHARED_PROJECT_SLOT_BORDER_WIDTH
      : PROJECT_SLOT_BORDER_WIDTH,
    borderLeftWidth: hasNeighbor(slot.colSlot - 1, slot.row)
      ? SHARED_PROJECT_SLOT_BORDER_WIDTH
      : PROJECT_SLOT_BORDER_WIDTH,
  };
}

function getProjectPreviewPosition(slot: ProjectSlot) {
  const slotLeft = GRID_AREA_LEFT + slot.colSlot * GRID_COLUMN_WIDTH;
  const slotTop = 210 + (slot.row - 1) * GRID_ROW_HEIGHT;
  let left = slotLeft + GRID_COLUMN_WIDTH + PROJECT_PREVIEW_OFFSET_X;
  let top = slotTop + GRID_ROW_HEIGHT + PROJECT_PREVIEW_OFFSET_Y;

  if (left + PROJECT_PREVIEW_WIDTH > SECTION_WIDTH) {
    left = slotLeft - PROJECT_PREVIEW_WIDTH - PROJECT_PREVIEW_OFFSET_X;
  }

  if (top + PROJECT_PREVIEW_HEIGHT > SECTION_HEIGHT) {
    top = slotTop - PROJECT_PREVIEW_HEIGHT - PROJECT_PREVIEW_OFFSET_Y;
  }

  return {
    left: Math.max(0, left),
    top: Math.max(0, top),
  };
}

export function ProjectsContent() {
  const [selectedCategory, setSelectedCategory] =
    useState<ProjectCategory>("khuthon(new)");
  const [hoveredProjectSlug, setHoveredProjectSlug] = useState<string | null>(
    null,
  );
  const [pinnedProjectSlug, setPinnedProjectSlug] = useState<string | null>(
    null,
  );
  const viewportRef = useRef<HTMLDivElement>(null);
  const [sectionScale, setSectionScale] = useState(1);
  const selectedProjects = PROJECTS_BY_CATEGORY[selectedCategory];
  const activeProjectSlug = hoveredProjectSlug ?? pinnedProjectSlug;
  const activeProjectIndex = selectedProjects.findIndex(
    (project) => project.slug === activeProjectSlug,
  );
  const activeProject =
    activeProjectIndex >= 0 ? selectedProjects[activeProjectIndex] : null;
  const activeProjectSlot =
    activeProjectIndex >= 0 ? PROJECT_SLOTS[activeProjectIndex] : null;
  const activeProjectPreviewPosition = activeProjectSlot
    ? getProjectPreviewPosition(activeProjectSlot)
    : null;

  useLayoutEffect(() => {
    const updateSectionScale = () => {
      const viewportElement = viewportRef.current;

      if (!viewportElement) return;

      setSectionScale(
        Math.min(
          viewportElement.clientWidth / SECTION_WIDTH,
          viewportElement.clientHeight / SECTION_HEIGHT,
          1,
        ),
      );
    };

    updateSectionScale();
    const resizeObserver = new ResizeObserver(updateSectionScale);
    if (viewportRef.current) resizeObserver.observe(viewportRef.current);
    window.addEventListener("resize", updateSectionScale);

    return () => {
      resizeObserver.disconnect();
      window.removeEventListener("resize", updateSectionScale);
    };
  }, []);

  return (
    <div
      ref={viewportRef}
      className="flex w-full justify-center overflow-hidden bg-[#f7f7f7]"
      style={{ height: `calc(100dvh - ${SITE_HEADER_HEIGHT}px)` }}
    >
      <div
        style={{
          width: SECTION_WIDTH * sectionScale,
          height: SECTION_HEIGHT * sectionScale,
        }}
      >
        <section
          className="relative bg-[#f7f7f7] pb-8 pt-[210px]"
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
                className="absolute top-0 h-full border-l border-dashed"
                style={{
                  left: GRID_GUIDE_START_X + index * GRID_COLUMN_WIDTH,
                  borderColor: ACCENT,
                }}
              />
            ))}
          </div>

          <aside
            className="absolute text-center"
            style={{
              left: LEFT_PANEL_X,
              top: LEFT_PANEL_TOP,
              width: LEFT_PANEL_WIDTH,
              fontFamily: '"Anonymous Pro", monospace',
            }}
          >
            <PageTitleLogo text="project" className="mb-[47px]" />

            <nav
              className="flex flex-col gap-2"
              aria-label="프로젝트 카테고리"
            >
              {PROJECT_CATEGORIES.map((category) => {
                const isSelected = selectedCategory === category;

                return (
                  <button
                    key={category}
                    type="button"
                    className={`block w-full text-[28px] font-bold leading-none transition-colors hover:!text-[#ff2d2d] focus-visible:!text-[#ff2d2d] focus-visible:outline-none ${
                      isSelected ? "text-[#ff2d2d]" : "text-[#d7d7d7]"
                    }`}
                    aria-pressed={isSelected}
                    onClick={() => {
                      setSelectedCategory(category);
                      setHoveredProjectSlug(null);
                      setPinnedProjectSlug(null);
                    }}
                  >
                    {category}
                  </button>
                );
              })}
            </nav>
          </aside>

          <div className="h-full flex-1" style={{ marginLeft: GRID_AREA_LEFT }}>
            <div className="relative h-full">
              <div
                className="pointer-events-none absolute left-0 z-10 grid"
                style={{
                  top: TIMELINE_LABEL_TOP,
                  width: GRID_WIDTH,
                  gridTemplateColumns: `repeat(${GRID_COLUMN_COUNT}, minmax(0, 1fr))`,
                  fontFamily: "Dotum, sans-serif",
                }}
              >
                {[2, 4, 6, 8, 10, 12, 14].map((number) => (
                  <div
                    key={number}
                    className="flex h-10 items-center justify-center px-[6px] text-center"
                    style={{ color: ACCENT }}
                  >
                    <span className="h-px flex-1 border-t" style={{ borderColor: ACCENT }} />
                    <span className="mx-[6px] text-[36px] leading-none">
                      t<sub className="text-[20px]">{number}</sub>
                    </span>
                    <span className="h-px flex-1 border-t" style={{ borderColor: ACCENT }} />
                  </div>
                ))}
              </div>

              <div
                className="absolute left-0 top-0 grid"
                style={{
                  width: GRID_WIDTH,
                  height: GRID_HEIGHT,
                  gridAutoRows: GRID_ROW_HEIGHT,
                  gridTemplateColumns: `repeat(${GRID_COLUMN_COUNT}, minmax(0, 1fr))`,
                }}
              >
                {PROJECT_SLOTS.map((slot, index) => {
                  const project = selectedProjects[index];

                  return (
                    <div
                      key={`${slot.colSlot}-${slot.row}`}
                      className="bg-[#f7f7f7]"
                      style={{
                        gridColumn: slot.colSlot + 1,
                        gridRow: slot.row,
                        ...getProjectSlotBorderStyle(slot),
                      }}
                    >
                      {project ? (
                        <ProjectCard
                          project={project}
                          displayNumber={index + 1}
                          isActive={activeProject?.slug === project.slug}
                          className="border-0 bg-transparent text-slate-900"
                          onClick={() => {
                            if (pinnedProjectSlug === project.slug) {
                              setPinnedProjectSlug(null);
                              return;
                            }

                            setPinnedProjectSlug(project.slug);
                          }}
                          onMouseEnter={() => setHoveredProjectSlug(project.slug)}
                          onMouseLeave={() => setHoveredProjectSlug(null)}
                        />
                      ) : null}
                    </div>
                  );
                })}

              </div>
            </div>
          </div>

          {activeProject && activeProjectPreviewPosition ? (
            <div
              className="absolute z-20 bg-white"
              style={{
                left: activeProjectPreviewPosition.left,
                top: activeProjectPreviewPosition.top,
                width: PROJECT_PREVIEW_WIDTH,
                height: PROJECT_PREVIEW_HEIGHT,
                border: `2px solid ${ACCENT}`,
                boxShadow: "0 0 10px rgba(0, 0, 0, 0.14)",
              }}
            >
              <div
                aria-hidden="true"
                style={{
                  width: PROJECT_PREVIEW_WIDTH,
                  height: PROJECT_PREVIEW_IMAGE_HEIGHT,
                }}
              />

              <div
                className="relative flex flex-col items-start justify-start p-[15px]"
                style={{
                  width: PROJECT_PREVIEW_WIDTH,
                  height: PROJECT_PREVIEW_HEIGHT - PROJECT_PREVIEW_IMAGE_HEIGHT,
                }}
              >
                <div
                  className="overflow-hidden text-ellipsis whitespace-nowrap text-slate-900"
                  style={{
                    width: PROJECT_PREVIEW_META_WIDTH,
                    fontFamily: '"Anonymous Pro", monospace',
                    fontSize: PROJECT_PREVIEW_TEXT_SIZE,
                    fontStyle: "normal",
                    fontWeight: 700,
                    lineHeight: 1,
                  }}
                >
                  {activeProjectIndex + 1} {activeProject.slug}
                </div>

                <div
                  className="mt-[5px] overflow-hidden text-ellipsis whitespace-nowrap text-slate-900"
                  style={{
                    width: PROJECT_PREVIEW_META_WIDTH,
                    fontFamily: '"Anonymous Pro", monospace',
                    fontSize: PROJECT_PREVIEW_TEXT_SIZE,
                    fontStyle: "normal",
                    fontWeight: 400,
                    lineHeight: 1,
                  }}
                >
                  {activeProject.stack.join(" / ")}
                </div>

                <div
                  className="absolute top-[15px] overflow-hidden text-ellipsis whitespace-nowrap text-slate-900"
                  style={{
                    left: PROJECT_PREVIEW_DETAILS_LEFT,
                    width: PROJECT_PREVIEW_DETAILS_WIDTH,
                    fontFamily: '"Anonymous Pro", monospace',
                    fontSize: PROJECT_PREVIEW_TEXT_SIZE,
                    fontStyle: "normal",
                    fontWeight: 700,
                    lineHeight: 1,
                  }}
                >
                  컴공23변민주 컴공24김서연 컴공22이광호
                </div>

                <div
                  className="absolute overflow-hidden break-words text-slate-900"
                  style={{
                    left: PROJECT_PREVIEW_DETAILS_LEFT,
                    top:
                      PROJECT_PREVIEW_CONTENT_PADDING +
                      PROJECT_PREVIEW_TEXT_SIZE +
                      5,
                    width: PROJECT_PREVIEW_DETAILS_WIDTH,
                    maxHeight:
                      PROJECT_PREVIEW_HEIGHT -
                      PROJECT_PREVIEW_IMAGE_HEIGHT -
                      PROJECT_PREVIEW_CONTENT_PADDING -
                      PROJECT_PREVIEW_TEXT_SIZE -
                      5,
                    fontFamily: '"Anonymous Pro", monospace',
                    fontSize: PROJECT_PREVIEW_TEXT_SIZE,
                    fontStyle: "normal",
                    fontWeight: 400,
                    lineHeight: 1,
                  }}
                >
                  {activeProject.summary}
                </div>
              </div>
            </div>
          ) : null}
        </section>
      </div>
    </div>
  );
}
