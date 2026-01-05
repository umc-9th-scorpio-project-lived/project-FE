import CommunityIcon from "@/icons/CommunityIcon";
import HomeIcon from "@/icons/HomeIcon";
import TreeIcon from "@/icons/TreeIcon";
import UserIcon from "@/icons/UserIcon";

export const ICON_URL_MAP = [
  { name: "홈", component: HomeIcon, router: "" },
  {
    name: "루틴 나무",
    component: TreeIcon,
    url: "/icons/tree.svg",
    router: "tree",
  },
  {
    name: "커뮤니티",
    component: CommunityIcon,
    url: "/icons/community.svg",
    router: "community",
  },
  {
    name: "마이",
    component: UserIcon,
    url: "/icons/user.svg",
    router: "my",
  },
];
