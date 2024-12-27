import type { Metadata } from "next";
import Head from "next/head";
import localFont from "next/font/local";
import "./globals.css";

//Bulk
const merriweather = localFont({
  src: "./assets/fonts/merriweather-regular.woff",
  // variable: "--font-geist-sans",
  weight: "100 900",
});
//Headers
const playfair = localFont({
  src: "./assets/fonts/playfair-display-latin-400.woff",
  // variable: "--font-geist-mono",
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
        <Head>
        <link rel="icon" type="image/png" href=".assets/icons/logo.png" />
      </Head>
      <body
        className={`${merriweather} ${playfair} antialiased`}
      >
        {children}
      </body>
    </html>
  );
}
