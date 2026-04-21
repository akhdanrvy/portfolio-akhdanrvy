import type { Metadata } from "next";
import { Noto_Serif_JP, JetBrains_Mono, Plus_Jakarta_Sans } from "next/font/google";
import "./globals.css";

const notoSerifJP = Noto_Serif_JP({
  weight: ["300", "400", "500", "700", "900"],
  subsets: ["latin"],
  variable: "--font-noto",
  display: "swap",
});

const jetBrainsMono = JetBrains_Mono({
  weight: ["300", "400", "500", "700"],
  subsets: ["latin"],
  variable: "--font-jetbrains",
  display: "swap",
});

const plusJakartaSans = Plus_Jakarta_Sans({
  weight: ["300", "400", "500", "600", "700", "800"],
  subsets: ["latin"],
  variable: "--font-jakarta",
  display: "swap",
});

export const metadata: Metadata = {
  title: "Akhdan Ravi Andaman — App & Fullstack Developer",
  description:
    "Portfolio of Akhdan Ravi Andaman, App Developer specializing in React Native, Flutter, Kotlin, and Fullstack Web Development with Next.js and Vue.js",
  keywords: [
    "React Native",
    "Flutter",
    "Kotlin",
    "Next.js",
    "Mobile Developer",
    "App Developer",
    "Fullstack Developer",
    "Vue.js",
    "TypeScript",
  ],
  authors: [{ name: "Akhdan Ravi Andaman" }],
  creator: "Akhdan Ravi Andaman",
  openGraph: {
    type: "website",
    locale: "en_US",
    title: "Akhdan Ravi Andaman — App & Fullstack Developer",
    description:
      "Building experiences across every screen — from pocket to browser.",
    siteName: "Akhdan Ravi Andaman Portfolio",
  },
  twitter: {
    card: "summary_large_image",
    title: "Akhdan Ravi Andaman — App & Fullstack Developer",
    description:
      "Building experiences across every screen — from pocket to browser.",
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html
      lang="en"
      className={`${notoSerifJP.variable} ${jetBrainsMono.variable} ${plusJakartaSans.variable} h-full antialiased`}
    >
      <body className="min-h-full flex flex-col">
        {children}
      </body>
    </html>
  );
}
