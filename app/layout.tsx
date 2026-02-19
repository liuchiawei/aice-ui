import type { Metadata } from "next";
import { Roboto, Roboto_Mono, Noto_Sans_JP, Noto_Sans } from "next/font/google";
import { ThemeProvider } from "next-themes";
import { getLocale } from "next-intl/server";
import "./globals.css";

const roboto = Roboto({
  variable: "--font-roboto",
  subsets: ["latin"],
  weight: ["200", "300", "400", "500", "700", "900"],
});

const robotoMono = Roboto_Mono({
  variable: "--font-roboto-mono",
  subsets: ["latin"],
});

const notoSansJP = Noto_Sans_JP({
  variable: "--font-noto-sans-jp",
  subsets: ["latin"],
  weight: ["200", "300", "400", "500", "700", "900"],
});

const notoSans = Noto_Sans({
  variable: "--font-noto-sans",
  subsets: ["latin"],
  weight: ["200", "300", "400", "500", "700", "900"],
});

export const metadata: Metadata = {
  title: "AICE UI",
  description:
    "AICE UI is a collection of open-source UI built with Next.js, React, Tailwind CSS, and shadcn/ui",
};

export default async function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  const locale = await getLocale();
  return (
    <html lang={locale}>
      <body
        className={`${roboto.variable} ${robotoMono.variable} ${notoSansJP.variable} ${notoSans.variable} antialiased`}
      >
        <ThemeProvider attribute="class" defaultTheme="system" enableSystem>
          {children}
        </ThemeProvider>
      </body>
    </html>
  );
}
