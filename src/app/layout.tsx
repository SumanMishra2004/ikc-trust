import type { Metadata } from "next";
import { EB_Garamond, DM_Sans } from "next/font/google";
import "./globals.css";

const ebGaramond = EB_Garamond({
  subsets: ["latin"],
  variable: "--font-eb-garamond",
  weight: ["400", "500", "600", "700", "800"],
  style: ["normal", "italic"],
  display: "swap",
});

const dmSans = DM_Sans({
  subsets: ["latin"],
  variable: "--font-dm-sans",
  weight: ["300", "400", "500", "600", "700"],
  display: "swap",
});

const BASE_URL = "https://www.ikc.org.in";

export const metadata: Metadata = {
  metadataBase: new URL(BASE_URL),

  title: {
    default: "IKC Trust | Integrated Knowledge & Care · Kolkata",
    template: "%s | IKC Trust",
  },
  description:
    "IKC Trust (Integrated Knowledge & Care) empowers communities across West Bengal through education, healthcare, social welfare, and sustainable ecological stewardship. Registered under Section 12A & 80G.",

  keywords: [
    "IKC Trust",
    "Integrated Knowledge Care",
    "NGO Kolkata",
    "NGO West Bengal",
    "Rural Bengal charity",
    "education healthcare social welfare",
    "80G donation India",
    "CSR partner Kolkata",
    "Sundarbans relief",
    "community development West Bengal",
  ],

  authors: [{ name: "IKC Trust", url: BASE_URL }],
  creator: "IKC Trust",
  publisher: "IKC Trust",

  // Favicon / icons
  icons: {
    icon: [
      { url: "/logo.png", type: "image/png" },
    ],
    apple: [
      { url: "/logo.png", type: "image/png" },
    ],
    shortcut: "/logo.png",
  },

  // Manifest
  manifest: "/manifest.webmanifest",

  // Open Graph
  openGraph: {
    type: "website",
    locale: "en_IN",
    url: BASE_URL,
    siteName: "IKC Trust",
    title: "IKC Trust | Integrated Knowledge & Care · Kolkata",
    description:
      "Empowering communities across West Bengal through education, healthcare, social welfare, and sustainable development. Section 12A & 80G certified.",
    images: [
      {
        url: "/logo.png",
        width: 512,
        height: 512,
        alt: "IKC Trust — Integrated Knowledge & Care",
      },
    ],
  },

  // Twitter / X card
  twitter: {
    card: "summary",
    title: "IKC Trust | Integrated Knowledge & Care · Kolkata",
    description:
      "Empowering communities across West Bengal through education, healthcare, and social welfare.",
    images: ["/logo.png"],
  },

  // Canonical + alternate
  alternates: {
    canonical: BASE_URL,
    languages: {
      "en-IN": BASE_URL,
    },
  },

  // Robots
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      "max-image-preview": "large",
      "max-snippet": -1,
    },
  },
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html
      lang="en"
      className={`${ebGaramond.variable} ${dmSans.variable} scroll-smooth`}
    >
      <body className="bg-ivory font-sans text-charcoal antialiased">
        {children}
      </body>
    </html>
  );
}
