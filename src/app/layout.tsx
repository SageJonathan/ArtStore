import type { Metadata } from "next";
import localFont from "next/font/local";
import "./globals.css";
import Nav from "@/components/nav";

//Bulk
const merriweather = localFont({
  src: "./assets/fonts/merriweather-regular.woff",
  variable: "--font-merriweather",
  weight: "100 900",
});
//Headers
const playfair = localFont({
  src: "./assets/fonts/playfair-display-latin-400.woff",
  variable: "--font-playfair",
  weight: "100 900",
});

export const metadata: Metadata = {
  title: "Louise Guay",
  description: "Discover Louise Guay's Art",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  
  return (
    <html lang="en">
        <link rel="icon" href="/favicon.ico" />
      <body
        className={`${merriweather} ${playfair} antialiased`}
      >
        <Nav />
        <div id="__next">
          {children}
        </div>
      </body>
    </html>
  );
}
