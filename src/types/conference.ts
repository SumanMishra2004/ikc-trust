import type { InitiativeEventImage, SanityImageAsset } from "./culture-sports";
import type { InitiativeVideo } from "./media";

export type ConferenceMode = "In-Person" | "Online" | "Hybrid";

// A single Portable Text block (simplified — good enough for rendering)
export interface PortableTextBlock {
  _key: string;
  _type: string;
  style?: string;
  children?: Array<{
    _key: string;
    _type: string;
    text?: string;
    marks?: string[];
  }>;
  markDefs?: Array<{
    _key: string;
    _type: string;
    href?: string;
  }>;
  listItem?: string;
  level?: number;
  [key: string]: unknown;
}

export interface ConferenceEvent {
  _id: string;
  title: string;
  venue?: string;
  mode?: ConferenceMode;
  timing?: string;
  date?: string;
  summary?: string;
  description?: PortableTextBlock[];
  images?: InitiativeEventImage[];
  video?: InitiativeVideo;
  abstractBookUrl?: string;
  link?: string;
}

export interface ConferenceEventsResult {
  events: ConferenceEvent[];
}

// Re-export to avoid unused import warnings
export type { InitiativeEventImage, SanityImageAsset };
