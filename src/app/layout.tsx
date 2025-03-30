import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";
import { Header} from "@/components/core";
import { ThemeProvider } from "@/components/theme/ThemeProvider";
import { ModalProvider } from '@/context/ModalContext';

const inter = Inter({ 
  subsets: ["latin"],
});

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
}: {
  children: React.ReactNode
}) {
  return (
    <html 
      lang="en" 
      suppressHydrationWarning
      className="dark scroll-smooth"
    >
      <body className={`${inter.className} antialiased`}>
        <ThemeProvider
          defaultTheme="dark"
          storageKey="theme"
        >
          <ModalProvider>
            <div className="relative flex min-h-screen flex-col">
              <Header />
              <main className="flex-1">
                {children}
              </main>
            </div>
          </ModalProvider>
        </ThemeProvider>
      </body>
    </html>
  );
}
