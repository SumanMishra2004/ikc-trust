/**
 * Sanity Studio embedded at /studio
 *
 * This is a Next.js App Router catch-all route that renders the full
 * Sanity Studio inside the Next.js app. It is a client component because
 * the Studio requires browser APIs.
 *
 * Access at: http://localhost:3000/studio
 */
"use client";

import { NextStudio } from "next-sanity/studio";
import { sanityConfig } from "@/sanity/config";

export default function StudioPage() {
  return <NextStudio config={sanityConfig} />;
}
