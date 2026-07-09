import type { Metadata } from "next";
import "./globals.css";
import { SiteHeader } from "@/components/site-header";
import { SiteFooter } from "@/components/site-footer";
import { getSession } from "@/lib/auth";

export const metadata: Metadata = {
  title: { default: "T.G.winG", template: "%s · T.G.winG" },
  description: "컴퓨터공학 동아리 T.G.winG 공식 웹사이트",
};

export default async function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  // 세션은 서버에서 읽어 헤더로 내려준다 (dev bypass면 가짜 멤버 세션).
  const session = await getSession();
  return (
    <html lang="ko" className="h-full antialiased">
      <body className="flex min-h-full flex-col font-sans">
        <SiteHeader user={session?.user} />
        <main className="flex-1">{children}</main>
        <SiteFooter />
      </body>
    </html>
  );
}
