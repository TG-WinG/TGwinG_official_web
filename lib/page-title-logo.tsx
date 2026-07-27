import { useId } from "react";

import { cn } from "@/lib/utils";

type PageTitleLogoProps = {
  text: string;
  className?: string;
};

const LOGO_WIDTH = 239;
const LOGO_HEIGHT = 125;
const STAR_WIDTH = 182;
const STAR_HEIGHT = 125;
const LABEL_LEFT = 101;
const LABEL_TOP = 65;
const LABEL_WIDTH = 138;
const LABEL_HEIGHT = 18;
const TEXT_SIZE = 32;
const TEXT_BOTTOM_OFFSET = 4;

export function PageTitleLogo({ text, className }: PageTitleLogoProps) {
  const starBlurId = useId();

  return (
    <div
      className={cn("relative", className)}
      style={{
        width: LOGO_WIDTH,
        height: LOGO_HEIGHT,
      }}
      aria-label={text}
    >
      <svg
        aria-hidden="true"
        className="absolute left-0 top-0"
        viewBox={`0 0 ${STAR_WIDTH} ${STAR_HEIGHT}`}
        style={{
          width: STAR_WIDTH,
          height: STAR_HEIGHT,
          overflow: "visible",
        }}
      >
        <defs>
          <filter
            id={starBlurId}
            x="-16"
            y="-16"
            width={STAR_WIDTH + 32}
            height={STAR_HEIGHT + 32}
            filterUnits="userSpaceOnUse"
          >
            <feGaussianBlur stdDeviation="4" />
          </filter>
        </defs>
        <polygon
          points="91,0 111,43.75 178.36,43.75 123.76,70 143.78,113.75 91,87.5 38.22,113.75 58.24,70 3.64,43.75 71,43.75"
          fill="#DA0F0F"
          filter={`url(#${starBlurId})`}
        />
      </svg>

      <div
        aria-hidden="true"
        className="absolute"
        style={{
          left: LABEL_LEFT,
          top: LABEL_TOP,
          width: LABEL_WIDTH,
          height: LABEL_HEIGHT,
          backgroundColor: "#FFFEC9",
          filter: "blur(4px)",
        }}
      />

      <div
        className="absolute text-center text-slate-900"
        style={{
          left: LABEL_LEFT,
          top: LABEL_TOP + LABEL_HEIGHT - TEXT_SIZE - TEXT_BOTTOM_OFFSET,
          width: LABEL_WIDTH,
          height: TEXT_SIZE,
          fontFamily: '"Anonymous Pro", monospace',
          fontSize: TEXT_SIZE,
          fontStyle: "normal",
          fontWeight: 400,
          lineHeight: 1,
        }}
      >
        {text}
      </div>
    </div>
  );
}
