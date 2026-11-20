/**
 * Sanity project constants — loaded from environment variables.
 *
 * IMPORTANT: Next.js only inlines NEXT_PUBLIC_ variables into the browser
 * bundle when they are accessed as LITERAL expressions:
 *   ✅  process.env.NEXT_PUBLIC_SANITY_PROJECT_ID
 *   ❌  process.env[dynamicName]   ← Next.js cannot statically inline this
 *
 * Required in .env:
 *   NEXT_PUBLIC_SANITY_PROJECT_ID   — found in sanity.io/manage
 *   NEXT_PUBLIC_SANITY_DATASET      — usually "production"
 *   NEXT_PUBLIC_SANITY_API_VERSION  — use "2025-02-19" (latest stable)
 */

const projectIdRaw = process.env.NEXT_PUBLIC_SANITY_PROJECT_ID;
const datasetRaw = process.env.NEXT_PUBLIC_SANITY_DATASET;
const apiVersionRaw = process.env.NEXT_PUBLIC_SANITY_API_VERSION;

if (!projectIdRaw) throw new Error("Missing env: NEXT_PUBLIC_SANITY_PROJECT_ID");
if (!datasetRaw) throw new Error("Missing env: NEXT_PUBLIC_SANITY_DATASET");
if (!apiVersionRaw) throw new Error("Missing env: NEXT_PUBLIC_SANITY_API_VERSION");

export const projectId = projectIdRaw;
export const dataset = datasetRaw;
export const apiVersion = apiVersionRaw;
