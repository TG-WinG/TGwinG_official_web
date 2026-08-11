import type { Metadata } from "next";
import { Anonymous_Pro } from "next/font/google";
import "./globals.css";
import { SiteHeader } from "@/components/site-header";
import { SiteFooter } from "@/components/site-footer";

// 피그마 지정 폰트. next/font가 빌드 때 받아서 self-host 하므로 브라우저는
// 구글로 요청을 보내지 않는다. 라틴만 있고 한글은 globals.css의 폴백이 받는다.
const anonymousPro = Anonymous_Pro({
  weight: ["400", "700"],
  subsets: ["latin"],
  display: "swap",
  variable: "--font-anonymous-pro",
});

export const metadata: Metadata = {
  title: { default: "T.G.winG", template: "%s · T.G.winG" },
  description: "컴퓨터공학 동아리 T.G.winG 공식 웹사이트",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="ko" className={`${anonymousPro.variable} h-full antialiased`}>
      <body className="flex min-h-full flex-col font-sans">
        <SiteHeader />
        <main className="flex-1">{children}</main>
        <SiteFooter />
      </body>
    </html>
  );
}
