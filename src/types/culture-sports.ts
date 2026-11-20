/**
 * TypeScript types for the Culture & Sports initiative.
 * Mirrors the Sanity `cultureSportsEvent` document schema.
 */

export type EventMode = "Offline" | "Online" | "Hybrid";

export type CultureSportsEventType =
  | "Cultural Program"
  | "Sports Tournament"
  | "Arts Exhibition"
  | "Festival"
  | "Workshop"
  | "Competition"
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

export interface CultureSportsEvent {
  _id: string;
  title: string;
  eventType: CultureSportsEventType;
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

export interface CultureSportsEventsResult {
  events: CultureSportsEvent[];
  hasMore: boolean;
  cursor: PaginationCursor | null;
}
