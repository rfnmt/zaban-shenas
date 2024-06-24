export interface IBadgeData {
  badges: Badge[];
}

export interface Badge {
  id: number;
  checksum: number;
  data: Data;
}

export interface Data {
  id: number;
  title: string;
  description: string;
  thumbnail: string;
  created_at: Date;
}
