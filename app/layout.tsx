import type { Metadata } from "next";
import { GlobalBgm } from "@/components/global-bgm";
import "./globals.css";

export const metadata: Metadata = {
  title: "齐民要术 · 活书世界",
  description: "进入古代农书里的多人对话现场，让两千年前的生活经验重新开口。"
};

export default function RootLayout({ children }: Readonly<{ children: React.ReactNode }>) {
  return <html lang="zh-CN"><body><GlobalBgm />{children}</body></html>;
}
