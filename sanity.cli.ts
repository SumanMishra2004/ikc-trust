import { defineCliConfig } from "sanity/cli";

export default defineCliConfig({
  api: {
    projectId: process.env.NEXT_PUBLIC_SANITY_PROJECT_ID,
    dataset: process.env.NEXT_PUBLIC_SANITY_DATASET,
  },
  /**
   * The Sanity Studio lives inside the Next.js app at /studio.
   * "studioHost" sets the subdomain on sanity.studio when you run `sanity deploy`.
   */
  studioHost: "ikc-trust",
});
