import { clsx, type ClassValue } from "clsx";
import { twMerge } from "tailwind-merge";

// shadcn 호환 className 머지 헬퍼. 컴포넌트는 `npx shadcn@latest add ...`로 추가 가능.
export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}
