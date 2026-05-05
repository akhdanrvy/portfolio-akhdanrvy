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
  preload: false,
});

const syne = Syne({
  variable: "--font-syne",
  subsets: ["latin"],
  weight: ["400", "600", "700"],
  display: "swap",
});

/* ─── SEO Metadata ────────────────────────────────────────────── */
export const metadata: Metadata = {
  metadataBase: new URL("https://portfolio-akhdanrvy.vercel.app"),
  title: {
    default: "Akhdan Ravi Andaman — App Developer & Fullstack Web Developer",
    template: "%s — Akhdan Ravi Andaman",
  },
  description:
    "Portfolio of Akhdan Ravi Andaman — App Developer & Fullstack Web Developer from Bogor, Indonesia. Specializing in mobile development with React Native, Kotlin, and Flutter, and modern web with Next.js and Vue.js.",
  keywords: [
    "Akhdan Ravi Andaman",
    "App Developer",
    "Mobile Developer",
    "Fullstack Developer",
    "React Native",
    "Flutter",
    "Kotlin",
    "Next.js",
    "Vue.js",
    "Android Developer",
    "iOS Developer",
    "Bogor",
    "Indonesia",
    "portfolio",
  ],
  authors: [{ name: "Akhdan Ravi Andaman", url: "https://portfolio-akhdanrvy.vercel.app" }],
  creator: "Akhdan Ravi Andaman",
  openGraph: {
    type: "website",
    locale: "en_US",
    url: "https://portfolio-akhdanrvy.vercel.app",
    siteName: "Akhdan Ravi Andaman",
    title: "Akhdan Ravi Andaman — App Developer & Fullstack Web Developer",
    description:
      "Portfolio of Akhdan Ravi Andaman — App Developer & Fullstack Web Developer from Bogor, Indonesia. Specializing in mobile development and modern web platforms.",
    images: [
      {
        url: "/og-image.jpg",
        width: 1200,
        height: 630,
        alt: "Akhdan Ravi Andaman — App Developer & Fullstack Web Developer",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "Akhdan Ravi Andaman — App Developer & Fullstack Web Developer",
    description:
      "Portfolio of Akhdan Ravi Andaman — App Developer & Fullstack Web Developer from Bogor, Indonesia.",
    images: ["/og-image.jpg"],
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