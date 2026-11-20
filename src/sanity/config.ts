import { defineConfig } from "sanity";
import { structureTool } from "sanity/structure";
import { visionTool } from "@sanity/vision";
import { projectId, dataset, apiVersion } from "./env";
import { structure } from "./structure";
import { schemaTypes } from "./schemaTypes";

/**
 * Sanity Studio configuration.
 *
 * The studio is embedded inside the Next.js app at /studio via
 * src/app/studio/[[...tool]]/page.tsx. This same config is re-exported
 * from the project root (sanity.config.ts) so the Sanity CLI can find it.
 *
 * Production checklist:
 *   1. Set NEXT_PUBLIC_SANITY_PROJECT_ID + NEXT_PUBLIC_SANITY_DATASET in
 *      your hosting environment (Vercel → Settings → Environment Variables).
 *   2. Add SANITY_API_READ_TOKEN (Viewer role) for draft preview support.
 *   3. Update the CORS origins in sanity.io/manage → API → CORS Origins:
 *      add your production domain (e.g. https://ikctrust.org) with credentials.
 *   4. Remove visionTool from the production build if you don't want the
 *      GROQ playground exposed publicly (guard it behind authentication or
 *      only include it when NODE_ENV !== "production").
 */
export const sanityConfig = defineConfig({
  name: "ikc-trust",
  title: "IKC Trust",

  projectId,
  dataset,
  apiVersion,

  // Where the embedded studio is served in the Next.js app.
  // Must match the route in src/app/studio/[[...tool]]/page.tsx.
  basePath: "/studio",

  plugins: [
    structureTool({ structure }),

    // Vision is a GROQ playground — useful for development, unnecessary in
    // production. Guard behind an env check if needed:
    //   ...(process.env.NODE_ENV !== "production" ? [visionTool({ defaultApiVersion: apiVersion })] : []),
    visionTool({ defaultApiVersion: apiVersion }),
  ],

  schema: {
    types: schemaTypes,
  },

  document: {
    // Prevent editors from accidentally publishing multiple revisions of the
    // same event. The productionUrl hook can be added here later for live preview.
    actions: (prev) => prev,
  },
});
