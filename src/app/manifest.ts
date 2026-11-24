import type { MetadataRoute } from "next";

export default function manifest(): MetadataRoute.Manifest {
  return {
    name: "IKC Trust — Integrated Knowledge & Care",
    short_name: "IKC Trust",
    description:
      "Empowering communities across West Bengal through education, healthcare, social welfare, and sustainable development.",
    start_url: "/",
    display: "standalone",
    background_color: "#F8F5ED",
    theme_color: "#1B3A2D",
    orientation: "portrait-primary",
    icons: [
      {
        src: "/logo.png",
        sizes: "192x192",
        type: "image/png",
        purpose: "maskable",
      },
      {
        src: "/logo.png",
        sizes: "512x512",
        type: "image/png",
        purpose: "any",
      },
    ],
  };
}
