import type { Metadata } from "next";

import { ProjectsContent } from "@/components/projects/projects-content";

export const metadata: Metadata = {
  title: "프로젝트",
};

export default function ProjectsPage() {
  return <ProjectsContent />;
}