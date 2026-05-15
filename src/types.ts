export interface Chapter {
  id: string;
  name: string;
  shortName: string;
  logoUrl: string;
  instagramUrl: string;
  location: [number, number]; // [longitude, latitude]
  merchFormUrl: string;
  merchItems: MerchItem[];
}

export interface MerchItem {
  id: string;
  name: string;
  price: string;
  imageUrl: string;
  description: string;
}

export interface StateData {
  id: string;
  name: string;
  chapters: Chapter[];
}
