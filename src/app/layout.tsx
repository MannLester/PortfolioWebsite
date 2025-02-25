import type { Metadata, Viewport } from "next";
import { Inter } from "next/font/google";
import "./globals.css";
import { Header, Footer } from "@/components/core";

const inter = Inter({ 
  subsets: ["latin"],
  display: 'swap', // Ensures text remains visible during webfont load
});

export const viewport: Viewport = {
  width: 'device-width',
  initialScale: 1,
  maximumScale: 5,
  minimumScale: 1,
  viewportFit: 'cover',
};

export const metadata: Metadata = {
  title: "Mann Lee - Full Stack Developer",
  description: "Portfolio website of Mann Lee, a Full Stack Developer specializing in modern web technologies.",
  applicationName: 'Mann Lee Portfolio',
  authors: [{ name: 'Mann Lee' }],
  keywords: ['Full Stack Developer', 'Backend Developer', 'Web Development', 'Portfolio'],
  themeColor: [
    { media: '(prefers-color-scheme: light)', color: 'white' },
    { media: '(prefers-color-scheme: dark)', color: '#000' },
  ],
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html 
      lang="en" 
      suppressHydrationWarning
      className="scroll-smooth"
    >
      <body className={`${inter.className} antialiased`}>
        <div className="relative flex min-h-screen flex-col">
          <Header />
          <main className="flex-1">
            {children}
          </main>
          <Footer />
        </div>
      </body>
    </html>
  );
}
