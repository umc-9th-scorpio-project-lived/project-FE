import { useEffect } from 'react';
import { useLocation } from 'react-router-dom';

// 라우터 변경 및 페이지 이동 시 웹 스크롤을 최상단으로 옮기는 컴포넌트
const ScrollToTop = () => {
  const { pathname } = useLocation();

  useEffect(() => {
    window.scrollTo({ top: 0, left: 0, behavior: 'auto' });
  }, [pathname]);

  return null;
};

export default ScrollToTop;
