/**
 * TypeScript types for the Social Welfare initiative.
 * Mirrors the Sanity `socialWelfareEvent` document schema.
 */

import type { InitiativeVideo, MediaCoverageItem } from "./media";

export type EventMode = "Offline" | "Online" | "Hybrid";

export type SocialWelfareEventType =
  | "Community Outreach"
  | "Relief Distribution"
  | "Skill Development"
  | "Workshop"
  | "Awareness Campaign"
  | "Women Empowerment"
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

export interface SocialWelfareEvent {
  _id: string;
  title: string;
  eventType: SocialWelfareEventType;
  date: string;
  objective: string;
  venue?: string;
  mode?: EventMode;
  description: string;
  images?: InitiativeEventImage[];
  videos?: InitiativeVideo[];
  mediaCoverage?: MediaCoverageItem[];
}

export interface PaginationCursor {
  lastDate: string;
  lastId: string;
}

export interface SocialWelfareEventsResult {
  events: SocialWelfareEvent[];
  hasMore: boolean;
  cursor: PaginationCursor | null;
}
