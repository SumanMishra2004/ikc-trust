export interface Collaborator {
  _id: string;
  title: string;
  date: string;
  image: {
    asset: { _ref: string; _type: string };
    hotspot?: { x: number; y: number; height: number; width: number };
    lqip?: string;
    dimensions?: { width: number; height: number; aspectRatio: number };
  };
  order?: number;
}
