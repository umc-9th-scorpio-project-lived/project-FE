import { getCommunityProfile } from '@/services/posts/profile';
import { useAuthStore } from '@/stores/auths/auth';
import { useEffect } from 'react';
import { Outlet } from 'react-router-dom';

const CommunityLayout = () => {
  // memberId 세팅
  const setMemberId = useAuthStore((s) => s.setMemberId);
  const myMemberId = useAuthStore((s) => s.memberId);

  useEffect(() => {
    if (myMemberId !== null) return;

    const fetchMe = async () => {
      try {
        const res = await getCommunityProfile();
        setMemberId(res.memberId);
      } catch (e) {
        console.error(e);
      }
    };
    fetchMe();
  }, [myMemberId, setMemberId]);

  return <Outlet />;
};

export default CommunityLayout;
