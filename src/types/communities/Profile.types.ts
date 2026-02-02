export type ProfileFruites = {
  fruitId: number;
  fruitType: string;
};

export type CommunityProfileResult = {
  nickname: string;
  profileImageUrl?: string | null;
  livingPeriod: string;
  fruits: ProfileFruites[];
};

export type EditCommunityProfileRequest = {
  request: {
    nickname: string;
    profileImageUrl?: string | null;
  };
  image?: File;
};
