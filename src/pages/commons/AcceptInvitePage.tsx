import { acceptInvite } from '@/services/friends/acceptInvite';
import { useEffect } from 'react';
import { useSearchParams } from 'react-router-dom';

const AcceptInvitePage = () => {
  const [searchParams] = useSearchParams();
  const inviterId = searchParams.get('inviterId');

  useEffect(() => {
    const handleAcceptInvite = async () => {
      // 로그인 여부 체크
      // 사용자 정보를 가져오는 API로 확인도록 수정하기: 401 에러 발생 시 미로그인, 성공하면 로그인
      const accessToken = localStorage.getItem('accessToken');

      if (!accessToken) {
        // 비로그인: 현재 URL 저장 후 로그인 페이지로
        const currentUrl = window.location.href;
        localStorage.setItem('redirectAfterLogin', currentUrl);
        window.location.href = '/login';
        return;
      }

      try {
        if (inviterId) {
          await acceptInvite(Number(inviterId));
        }
      } catch (error) {
        console.error('친구 수락 실패:', error);
        // 실패해도 트리 페이지로 이동
      } finally {
        window.location.href = '/lived/tree';
      }
    };

    if (inviterId) {
      handleAcceptInvite();
    }
  }, [inviterId]);

  return <></>;
};

export default AcceptInvitePage;
