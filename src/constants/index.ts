import CommunityIcon from '@/icons/CommunityIcon';
import HomeIcon from '@/icons/HomeIcon';
import TreeIcon from '@/icons/TreeIcon';
import UserIcon from '@/icons/UserIcon';

export const ICON_URL_MAP = [
  { name: '홈', component: HomeIcon, router: 'lived' },
  {
    name: '루틴 나무',
    component: TreeIcon,
    url: '/icons/tree.svg',
    router: 'lived/tree',
  },
  {
    name: '커뮤니티',
    component: CommunityIcon,
    url: '/icons/community.svg',
    router: 'lived/community',
  },
  {
    name: '마이',
    component: UserIcon,
    url: '/icons/user.svg',
    router: 'lived/my',
  },
];

export const WEEK_LABELS = ['일', '월', '화', '수', '목', '금', '토'];

export const ROUTINE_ERROR_CODE = {
  FUTURE_DATE_CHECK: 'ROUTINE400_1',
} as const;
