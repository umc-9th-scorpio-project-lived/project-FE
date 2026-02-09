type SelectedUser = {
  uuid: string;
  id?: string;
  profile_nickname?: string;
  profile_thumbnail_image?: string;
  favorite?: boolean;
};

export type FriendsPickerResponse = {
  selectedTotalCount: number;
  users: SelectedUser[];
};
