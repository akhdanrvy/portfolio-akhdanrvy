import type { Metadata } from "next";
import { Noto_Serif_JP, Syne } from "next/font/google";
import { I18nProvider } from "@/context/i18nContext";
import Navbar from "@/components/Navbar";
import "./globals.css";

/* ─── Google Fonts ────────────────────────────────────────────── */
const notoSerifJP = Noto_Serif_JP({
  variable: "--font-noto-serif-jp",
  subsets: ["latin"],
  weight: ["300", "400", "700"],
  display: "swap",
  preload: false, // large font — load on demand
});

const syne = Syne({
  variable: "--font-syne",
  subsets: ["latin"],
  weight: ["400", "600", "700"],
  display: "swap",
});

/* ─── SEO Metadata ────────────────────────────────────────────── */
export const metadata: Metadata = {
  metadataBase: new URL("https://akhdanravi.dev"),
  title: {
    default: "Akhdan Ravi Andaman — Mobile & Fullstack Developer",
    template: "%s — Akhdan Ravi Andaman",
  },
  description:
    "Portfolio of Akhdan Ravi Andaman — Mobile & Fullstack Developer crafting elegant, performant web experiences with a passion for Japanese-inspired aesthetics.",
  keywords: [
    "Akhdan Ravi Andaman",
    "mobile developer",
    "fullstack developer",
    "Next.js",
    "React",
    "portfolio",
    "web development",
    "glassmorphism",
    "Japanese design",
  ],
  authors: [{ name: "Akhdan Ravi Andaman", url: "https://akhdanravi.dev" }],
  creator: "Akhdan Ravi Andaman",
  openGraph: {
    type: "website",
    locale: "en_US",
    url: "https://akhdanravi.dev",
    siteName: "Akhdan Ravi Andaman",
    title: "Akhdan Ravi Andaman — Mobile & Fullstack Developer",
    description:
      "Portfolio of Akhdan Ravi Andaman — Mobile & Fullstack Developer crafting elegant, performant mobile & web experiences.",
    images: [
      {
        url: "/og-image.png",
        width: 1200,
        height: 630,
        alt: "Akhdan Ravi Andaman — Portfolio",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "Akhdan Ravi Andaman — Mobile & Fullstack Developer",
    description:
      "Portfolio of Akhdan Ravi Andaman — Mobile & Fullstack Developer crafting elegant, performant web experiences.",
    images: ["/og-image.png"],
    creator: "@akhdanravi",
  },
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      "max-video-preview": -1,
      "max-image-preview": "large",
      "max-snippet": -1,
    },
  },
  icons: {
    icon: "/favicon.ico",
    shortcut: "/favicon-16x16.png",
    apple: "/apple-touch-icon.png",
  },
};

/* ─── Root Layout ────────────────────────────────────────────── */
export default function RootLayout({
  children,
}: Readonly<{ children: React.ReactNode }>) {
  return (
    <html
      lang="en"
      className={`${notoSerifJP.variable} ${syne.variable}`}
    >
      <body className="min-h-dvh antialiased">
        <I18nProvider>
          <Navbar />
          {children}
        </I18nProvider>
      </body>
    </html>
  );
}
