import type { Metadata } from "next";
import localFont from "next/font/local";
import "./globals.css";
import Nav from "@/components/nav";
import Footer from "@/components/footer";

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
        className={`${merriweather} ${playfair} antialiased bg-gradient-to-b from-rose-50/30 via-white to-rose-50/20 min-h-screen flex flex-col`}
      >
        <Nav />
        <div id="__next" className="flex-1">
          {children}
        </div>
        <Footer />
      </body>
    </html>
  );
}
