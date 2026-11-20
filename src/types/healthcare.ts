/**
 * TypeScript types for the Healthcare initiative.
 * Mirrors the Sanity `healthcareEvent` document schema.
 */

export type EventMode = "Offline" | "Online" | "Hybrid";

export type HealthcareEventType =
  | "Medical Camp"
  | "Health Awareness"
  | "Vaccination Drive"
  | "Workshop"
  | "Seminar"
  | "Screening Program"
  | "Other";

export interface SanityImageAsset {
  _ref: string;
  _type: string;
}

export interface InitiativeEventImage {
  _key: string;
  alt: string;
  caption?: string;
  asset: SanityImageAsset;
  lqip?: string;
  dimensions?: {
    width: number;
    height: number;
    aspectRatio: number;
  };
}

export interface HealthcareEvent {
  _id: string;
  title: string;
  eventType: HealthcareEventType;
  date: string; // ISO date string "YYYY-MM-DD"
  objective: string;
  venue?: string;
  mode?: EventMode;
  description: string; // Markdown source text
  images?: InitiativeEventImage[];
}

export interface PaginationCursor {
  lastDate: string;
  lastId: string;
}

export interface HealthcareEventsResult {
  events: HealthcareEvent[];
  hasMore: boolean;
  cursor: PaginationCursor | null;
}
