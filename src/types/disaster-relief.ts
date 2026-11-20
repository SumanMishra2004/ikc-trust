/**
 * TypeScript types for the Disaster Relief initiative.
 * Mirrors the Sanity `disasterReliefEvent` document schema.
 */

export type EventMode = "Offline" | "Online" | "Hybrid";

export type DisasterReliefEventType =
  | "Relief Camp"
  | "Aid Distribution"
  | "Rescue Operation"
  | "Rehabilitation"
  | "Awareness Program"
  | "Preparedness Training"
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

export interface DisasterReliefEvent {
  _id: string;
  title: string;
  eventType: DisasterReliefEventType;
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

export interface DisasterReliefEventsResult {
  events: DisasterReliefEvent[];
  hasMore: boolean;
  cursor: PaginationCursor | null;
}
