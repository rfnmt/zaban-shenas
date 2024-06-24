export interface MyProfileData {
  profileData: ProfileData;
  profilePageCustomMessages: any[];
  pendingVerification: any[];
}

export interface ProfileData {
  id: number;
  checksum: number;
  data: Data;
}

export interface Data {
  id: number;
  createdAt: Date;
  profilePic: string;
  username: string;
  email: null;
  phone: string;
  isDirectPurchaseSafe: boolean;
  isStaff: boolean;
  name: string;
}
