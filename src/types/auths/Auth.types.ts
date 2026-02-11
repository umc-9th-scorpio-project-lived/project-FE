export type SocialProvider = 'KAKAO' | 'GOOGLE';
export type LivingPeriod = 'PRE' | '1-3Y' | '3-5Y' | 'OVER5Y';
export type GenderEnum = 'MALE' | 'FEMALE' | 'NONE';

export type SignupRequest = {
  socialId: string;
  provider: SocialProvider;
  name: string;
  email: string;

  livingPeriod: LivingPeriod;
  gender: GenderEnum;
  birth: string;

  concernIds: number[];
  routineIds?: number[];
  notificationStatus: 1 | 2;
};

export type SignupResult = {
  memberId: number;
  createdAt: string;
  accessToken: string;
  refreshToken: string;
};

export type LogoutResult = {
  message: string;
};

export type WithdrawResult = {
  message: string;
};

export type ReissueResult = {
  accessToken: string;
};
