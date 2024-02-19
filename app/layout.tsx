import Providers from "@/providers";
import type { Metadata } from "next";
import { Roboto } from "next/font/google";
import "./globals.css";

const roboto = Roboto({
  weight: ["400", "500", "700"],
  subsets: ["latin"],
});
export const metadata: Metadata = {
  title: "Zealy Test",
  description: "Zealy Test",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body className={`${roboto.className} bg-neutral-100`}>
        <Providers>{children}</Providers>
      </body>
    </html>
  );
}
