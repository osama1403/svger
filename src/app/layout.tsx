import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";
import Head from "next/head";
import { Analytics } from "@vercel/analytics/react"

export const metadata: Metadata = {
  title: "SVGER ✨",
  description: "Generate unique SVGs, (Dividers, Backgrounds and more) ",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <Head>
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <body className={``}>
        {children}
        <Analytics/>
      </body>
    </html>
  );
}
