/**
 * TypeScript types for the Environment initiative.
 * Mirrors the Sanity `environmentEvent` document schema.
 */

export type EventMode = "Offline" | "Online" | "Hybrid";

export type EnvironmentEventType =
  | "Tree Plantation"
  | "Clean-up Drive"
  | "Awareness Campaign"
  | "Workshop"
  | "Seminar"
  | "Conservation Project"
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

export interface EnvironmentEvent {
  _id: string;
  title: string;
  eventType: EnvironmentEventType;
  date: string;
  objective: string;
  venue?: string;
  mode?: EventMode;
  description: string;
  images?: InitiativeEventImage[];
}

export interface PaginationCursor {
  lastDate: string;
  lastId: string;
}

export interface EnvironmentEventsResult {
  events: EnvironmentEvent[];
  hasMore: boolean;
  cursor: PaginationCursor | null;
}
