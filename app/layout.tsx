import type { Metadata, Viewport } from "next";
import { Noto_Serif_JP, Syne } from "next/font/google";
import { I18nProvider } from "@/context/i18nContext";
import { ThemeProvider } from "@/context/themeContext";
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

/* ─── Viewport ────────────────────────────────────────────────── */
export const viewport: Viewport = {
  themeColor: [
    { media: "(prefers-color-scheme: light)", color: "#f8f5ee" },
    { media: "(prefers-color-scheme: dark)", color: "#0a0a0c" },
  ],
  width: "device-width",
  initialScale: 1,
};

/* ─── SEO Metadata ────────────────────────────────────────────── */
const siteUrl = "https://portfolio-akhdanrvy.vercel.app";

export const metadata: Metadata = {
  metadataBase: new URL(siteUrl),
  title: {
    default: "Akhdan Ravi Andaman — Software Engineer & Business Development Specialist",
    template: "%s — Akhdan Ravi Andaman",
  },
  description:
    "Portfolio of Akhdan Ravi Andaman — Software Engineer & Business Development Specialist based in Bogor, Indonesia. Master's student at STEI ITB, TRPL IPB graduate (GPA 3.67), Bangkit Academy alumnus. Specializing in high-performance mobile apps (Kotlin, Flutter, React Native) and enterprise web platforms (Next.js, TypeScript).",
  keywords: [
    "Akhdan Ravi Andaman",
    "Akhdan Ravi",
    "Akhdan RVY",
    "Software Engineer",
    "Business Development Specialist",
    "Mobile Developer",
    "Fullstack Developer",
    "React Native",
    "Flutter",
    "Kotlin",
    "Swift",
    "Next.js",
    "TypeScript",
    "Vue.js",
    "Android Developer",
    "iOS Developer",
    "STEI ITB",
    "Institut Teknologi Bandung",
    "IPB University",
    "Bangkit Academy",
    "Altvira Technology",
    "PT Representasi Mitra Mandiri",
    "Bogor",
    "Indonesia",
    "Portfolio",
  ],
  authors: [{ name: "Akhdan Ravi Andaman", url: siteUrl }],
  creator: "Akhdan Ravi Andaman",
  alternates: {
    canonical: siteUrl,
    languages: {
      "en-US": "/?lang=en",
      "id-ID": "/?lang=id",
    },
  },
  openGraph: {
    type: "website",
    locale: "en_US",
    alternateLocale: ["id_ID"],
    url: siteUrl,
    siteName: "Akhdan Ravi Andaman",
    title: "Akhdan Ravi Andaman — Software Engineer & Business Development Specialist",
    description:
      "Portfolio of Akhdan Ravi Andaman — Software Engineer & Business Development Specialist based in Bogor, Indonesia. Architecting scalable mobile, web, and enterprise solutions.",
    images: [
      {
        url: "/og-image.jpg",
        width: 1200,
        height: 630,
        alt: "Akhdan Ravi Andaman — Software Engineer & Business Development Specialist",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "Akhdan Ravi Andaman — Software Engineer & Business Development Specialist",
    description:
      "Portfolio of Akhdan Ravi Andaman — Software Engineer & Business Development Specialist based in Bogor, Indonesia.",
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
  },
  manifest: "/manifest.webmanifest",
};

/* ─── Schema.org Structured Data (JSON-LD) ────────────────────── */
const jsonLd = {
  "@context": "https://schema.org",
  "@graph": [
    {
      "@type": "Person",
      "@id": `${siteUrl}/#person`,
      name: "Akhdan Ravi Andaman",
      alternateName: ["Akhdan RVY", "Akhdan Ravi"],
      url: siteUrl,
      image: `${siteUrl}/og-image.jpg`,
      jobTitle: "Software Engineer & Business Development Specialist",
      worksFor: [
        {
          "@type": "Organization",
          name: "Altvira Technology",
        },
        {
          "@type": "Organization",
          name: "PT Representasi Mitra Mandiri",
        },
      ],
      alumniOf: [
        {
          "@type": "EducationalOrganization",
          name: "STEI Institut Teknologi Bandung (ITB)",
        },
        {
          "@type": "EducationalOrganization",
          name: "IPB University",
        },
        {
          "@type": "EducationalOrganization",
          name: "Bangkit Academy by Google, GoTo, Traveloka",
        },
      ],
      sameAs: [
        "https://www.linkedin.com/in/akhdan-ravi-andaman/",
        "https://github.com/akhdanrvy",
        "https://instagram.com/akhdanrvy",
      ],
      knowsAbout: [
        "Software Engineering",
        "Mobile Application Development",
        "Kotlin",
        "Flutter",
        "React Native",
        "Next.js",
        "TypeScript",
        "Full-Stack Web Development",
        "Business Development",
        "System Integration",
      ],
      address: {
        "@type": "PostalAddress",
        addressLocality: "Bogor",
        addressRegion: "Jawa Barat",
        addressCountry: "ID",
      },
    },
    {
      "@type": "WebSite",
      "@id": `${siteUrl}/#website`,
      url: siteUrl,
      name: "Akhdan Ravi Andaman Portfolio",
      publisher: {
        "@id": `${siteUrl}/#person`,
      },
      inLanguage: ["en", "id"],
    },
  ],
};

/* ─── Root Layout ────────────────────────────────────────────── */
export default function RootLayout({
  children,
}: Readonly<{ children: React.ReactNode }>) {
  return (
    <html
      lang="en"
      data-theme="light"
      suppressHydrationWarning
      className={`${notoSerifJP.variable} ${syne.variable}`}
    >
      <head>
        {/* Schema.org Structured Data */}
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
        />
        {/* Prevent flash of unstyled theme (FOUC) by reading theme before React hydration */}
        <script
          dangerouslySetInnerHTML={{
            __html: `
              (function() {
                try {
                  const theme = localStorage.getItem('portfolio-theme');
                  if (theme && (theme === 'dark' || theme === 'light')) {
                    document.documentElement.setAttribute('data-theme', theme);
                  } else {
                    document.documentElement.setAttribute('data-theme', 'light');
                  }
                } catch (e) {
                  document.documentElement.setAttribute('data-theme', 'light');
                }
              })();
            `,
          }}
        />
      </head>
      <body className="min-h-dvh antialiased">
        <ThemeProvider>
          <I18nProvider>
            <Navbar />
            {children}
          </I18nProvider>
        </ThemeProvider>
      </body>
    </html>
  );
}