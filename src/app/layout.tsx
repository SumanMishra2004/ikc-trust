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

export const metadata: Metadata = {
  title: "IKC TRUST | Integrated Knowledge & Care · Kolkata",
  description:
    "IKC Trust (Integrated Knowledge & Care) works towards stronger communities across West Bengal through education, healthcare, social welfare, and sustainable ecological stewardship.",
  keywords: [
    "IKC Trust",
    "Integrated Knowledge Care",
    "NGO Kolkata",
    "Rural Bengal",
    "Education Healthcare Social Welfare",
    "West Bengal charity",
  ],
  openGraph: {
    title: "IKC TRUST | Integrated Knowledge & Care · Kolkata",
    description:
      "Working towards stronger communities across West Bengal through education, healthcare, social welfare, and sustainable ecological stewardship.",
    type: "website",
    locale: "en_IN",
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
