import "./globals.css";
import { ReactNode } from "react";
import type { Metadata } from "next";
import { Figtree } from "next/font/google";
import SideBar from "@/components/Sidebar/Sidebar";
import SupabaseProvider from "@/providers/SupabaseProvider";
import UserProvider from "@/providers/UserProvider";
import ModalProvider from "@/providers/UI/ModalProvider";
import ToasterProvider from "@/providers/UI/ToasterProvider";

const font = Figtree({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: "Spotify Clone",
  description: "Listen to music!!!",
};

export default function RootLayout({ children }: { children: ReactNode }) {
  return (
    <html lang="en">
      <body className={font.className}>
        <ToasterProvider />
        <SupabaseProvider>
          <UserProvider>
            <ModalProvider />
            <SideBar>{children}</SideBar>
          </UserProvider>
        </SupabaseProvider>
      </body>
    </html>
  );
}
