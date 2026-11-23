export interface Contributor {
  _id: string;
  name: string;
  location?: string;
  category: "Patron" | "Benefactor" | "Supporter" | "Community";
  anonymous: boolean;
  order?: number;
}
