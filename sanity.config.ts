// Re-export the Sanity studio config so the Sanity CLI can find it at the
// project root. The actual config lives in src/sanity/config.ts.
export { sanityConfig as default } from "./src/sanity/config";
