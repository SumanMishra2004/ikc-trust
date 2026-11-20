import { createClient } from "next-sanity";
import { projectId, dataset, apiVersion } from "./env";

/**
 * Public read client — used in Server Components and ISR pages.
 *
 * No token required. Sanity's Content Lake allows unauthenticated reads of
 * published documents. The projectId in the URL is the only credential needed.
 *
 * - useCdn: true        → serves cached published content from Sanity's CDN
 * - perspective: "published" → never returns draft documents
 * - stega: disabled     → no visual-editing overlays in public content
 */
export const sanityClient = createClient({
  projectId,
  dataset,
  apiVersion,
  useCdn: true,
  perspective: "published",
  stega: { enabled: false },
});
