/**
 * TypeScript types for initiative videos and media coverage items.
 * Mirrors the initiativeVideo and mediaCoverageItem Sanity object schemas.
 */

export interface SanityFileAsset {
  _ref: string;
  _type: "reference";
  url?: string;
}

export interface SanityFile {
  asset: SanityFileAsset;
}

export interface SanityImageRef {
  _ref: string;
  _type: string;
}

export interface SanityCoverageImage {
  asset: SanityImageRef;
  lqip?: string;
}

// ── Initiative Video ─────────────────────────────────────────────────────────

export interface InitiativeVideo {
  _key: string;
  asset: SanityFileAsset;
  /** Direct CDN URL — resolved by GROQ projection `asset->url` */
  url: string;
  title?: string;
  caption?: string;
  poster?: SanityCoverageImage;
  posterUrl?: string;
  posterLqip?: string;
}

// ── Media Coverage ───────────────────────────────────────────────────────────

export type MediaCoverageType = "image" | "youtube";

export interface MediaCoverageItem {
  _key: string;
  type: MediaCoverageType;
  title: string;
  description?: string;
  // image branch
  image?: SanityCoverageImage;
  imageUrl?: string;
  imageAlt?: string;
  imageLqip?: string;
  // youtube branch
  youtubeUrl?: string;
  /** Extracted 11-char YouTube video ID, resolved at query time */
  youtubeId?: string;
  // shared
  source?: string;
  coverageDate?: string;
}
