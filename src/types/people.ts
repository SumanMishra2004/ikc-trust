/**
 * TypeScript types for Team Members and Advisory Board Members.
 * Mirrors the teamMember and advisoryBoardMember Sanity document schemas.
 */

export interface SanityPhotoAsset {
  _ref: string;
  _type: string;
}

export interface SanityPhoto {
  asset: SanityPhotoAsset;
  hotspot?: { x: number; y: number; height: number; width: number };
  lqip?: string;
}

export interface TeamMember {
  _id: string;
  name: string;
  position: string;
  affiliation: string;
  photo: SanityPhoto;
  linkedin?: string;
  email?: string;
  order: number;
}

export interface AdvisoryBoardMember {
  _id: string;
  name: string;
  affiliation: string;
  expertise?: string;
  photo: SanityPhoto;
  description: string;
  isFeatured: boolean;
  order: number;
}
