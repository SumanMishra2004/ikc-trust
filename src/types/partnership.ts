export interface PartnershipImage {
  _key: string;
  alt: string;
  caption?: string;
  asset: { _ref: string; _type: string };
  lqip?: string;
  dimensions?: { width: number; height: number; aspectRatio: number };
}

export interface PartnershipMediaCoverage {
  _key: string;
  type: "image" | "youtube";
  title: string;
  description?: string;
  imageUrl?: string;
  imageAlt?: string;
  imageLqip?: string;
  youtubeUrl?: string;
  source?: string;
  coverageDate?: string;
}

export interface PartnershipEvent {
  _id: string;
  title: string;
  partnershipType: string;
  date: string;
  objective: string;
  venue?: string;
  partnerName: string;
  description: string;
  images?: PartnershipImage[];
  mediaCoverage?: PartnershipMediaCoverage[];
  order?: number;
}

export interface PaginationCursor {
  lastDate: string;
  lastId: string;
}

export interface PartnershipEventsResult {
  events: PartnershipEvent[];
  hasMore: boolean;
  cursor: PaginationCursor | null;
}
