/**
 * TypeScript types for the Education & Knowledge section.
 * Mirrors the Sanity `educationEvent` document schema.
 */

import type { InitiativeVideo, MediaCoverageItem } from "./media";

export type EventMode = "Offline" | "Online" | "Hybrid";

export type EventType =
  | "Internship"
  | "Examination"
  | "Seminar"
  | "Workshop"
  | "Symposium"
  | "Conference"
  | "Other";

export interface SanityImageAsset {
  /** Asset reference — required by @sanity/image-url to build CDN URLs */
  _ref: string;
  _type: string;
}

export interface EducationEventImage {
  _key: string;
  alt: string;
  caption?: string;
  /** Asset reference object — passed directly to urlFor() */
  asset: SanityImageAsset;
  /** Base64 low-quality placeholder for progressive loading */
  lqip?: string;
  dimensions?: {
    width: number;
    height: number;
    aspectRatio: number;
  };
}

export interface EducationEvent {
  _id: string;
  title: string;
  eventType: EventType;
  date: string; // ISO date string "YYYY-MM-DD"
  objective: string;
  venue?: string;
  mode?: EventMode;
  description: string; // Markdown source text
  images?: EducationEventImage[];
  videos?: InitiativeVideo[];
  mediaCoverage?: MediaCoverageItem[];
}

/**
 * Pagination cursor — derived from the last event in a fetched batch.
 */
export interface PaginationCursor {
  lastDate: string;
  lastId: string;
}

/**
 * Result shape returned by fetchEducationEvents.
 */
export interface EducationEventsResult {
  events: EducationEvent[];
  hasMore: boolean;
  cursor: PaginationCursor | null;
}
