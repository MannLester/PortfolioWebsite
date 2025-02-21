import type { Metadata } from "next";
import { Inter, Playfair_Display, Roboto } from "next/font/google";
import "./globals.css";

const inter = Inter({
  subsets: ['latin'],
  display: 'swap',
  variable: '--font-inter',
});

const playfair = Playfair_Display({
  subsets: ['latin'],
  display: 'swap',
  variable: '--font-playfair',
});

const roboto = Roboto({
  subsets: ['latin'],
  weight: ['400', '500', '700'],
  display: 'swap',
  variable: '--font-roboto',
});

export const metadata: Metadata = {
  title: "Mann Lee - Portfolio",
  description: "Full Stack Developer Portfolio showcasing creative, professional, and simple design variations",
  keywords: ["portfolio", "developer", "full stack", "react", "next.js", "typescript"],
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className="scroll-smooth" suppressHydrationWarning>
      <body
        className={`${inter.variable} ${playfair.variable} ${roboto.variable} antialiased min-h-screen transition-colors duration-300`}
      >
        {children}
      </body>
    </html>
  );
}
