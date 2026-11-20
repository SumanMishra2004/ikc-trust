import { createImageUrlBuilder } from "@sanity/image-url";
import { projectId, dataset } from "./env";

// SanityImageSource is the union type accepted by imageUrlBuilder.image()
// We derive it from the builder directly to avoid dependency on private subpaths.
type ImageUrlBuilderInstance = ReturnType<typeof createImageUrlBuilder>;
type SanityImageSource = Parameters<ImageUrlBuilderInstance["image"]>[0];

const builder = createImageUrlBuilder({ projectId, dataset });

/**
 * Returns a Sanity image URL builder instance for a given image source.
 *
 * Usage:
 *   urlFor(image.asset).width(800).height(600).fit("crop").auto("format").url()
 */
export function urlFor(source: SanityImageSource) {
  return builder.image(source);
}

/**
 * Pre-built URL helpers for common image sizes.
 */
export const imagePresets = {
  /** Gallery primary image — 1200px wide, optimised WebP */
  gallery: (source: SanityImageSource) =>
    urlFor(source).width(1200).height(800).fit("crop").auto("format").quality(85).url(),

  /** Gallery thumbnail */
  thumb: (source: SanityImageSource) =>
    urlFor(source).width(400).height(300).fit("crop").auto("format").quality(75).url(),

  /** Lightbox full-size */
  lightbox: (source: SanityImageSource) =>
    urlFor(source).width(1600).fit("max").auto("format").quality(90).url(),

  /** Low-quality placeholder blur (for progressive loading) */
  lqip: (source: SanityImageSource) =>
    urlFor(source).width(40).quality(20).blur(10).url(),
};
