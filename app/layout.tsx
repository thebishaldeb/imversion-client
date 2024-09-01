import type { Metadata } from "next";
import { Chakra_Petch } from "next/font/google";
import "./globals.css";
import Header from "@/components/Header";

const bodyfont = Chakra_Petch({
  subsets: ["latin"],
  weight: ["300", "400", "500", "600", "700"],
  variable: "--font-body",
});

export const metadata: Metadata = {
  title: "Blogs",
  description: "Created by Bishal Deb",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body className={bodyfont.variable}>
        <Header />
        {children}
      </body>
    </html>
  );
}
