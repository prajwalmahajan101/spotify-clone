import "./globals.css";
import { ReactNode } from "react";
import type { Metadata } from "next";
import { Figtree } from "next/font/google";
import SideBar from "@/components/Sidebar/Sidebar";
import SupabaseProvider from "@/providers/SupabaseProvider";
import UserProvider from "@/providers/UserProvider";
import ModalProvider from "@/providers/UI/ModalProvider";
import ToasterProvider from "@/providers/UI/ToasterProvider";
import getSongsByUserId from "@/action/getSongsByUserId";
import Player from "@/components/Player/Player";
import getActiveProductsWithPrices from "@/action/getActiveProductsWithPrices";

const font = Figtree({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: "Spotify Clone",
  description: "Listen to music!!!",
};

export const revalidate = 0;

export default async function RootLayout({
  children,
}: {
  children: ReactNode;
}) {
  const userSongs = await getSongsByUserId();
  const products = await getActiveProductsWithPrices();
  return (
    <html lang="en">
      <body className={font.className}>
        <ToasterProvider />
        <SupabaseProvider>
          <UserProvider>
            <ModalProvider products={products} />
            <SideBar songs={userSongs}>{children}</SideBar>
            <Player />
          </UserProvider>
        </SupabaseProvider>
      </body>
    </html>
  );
}
