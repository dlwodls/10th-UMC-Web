import { useState, useEffect } from 'react';
import { getCurrentPath } from './utils';

// useCurrentPath 훅
export const useCurrentPath = () => {
  const [currentPath, setCurrentPath] = useState(getCurrentPath());

  useEffect(() => {
    const handler = () => setCurrentPath(getCurrentPath());

    // pushstate 커스텀 이벤트 감지 → setPath
    window.addEventListener('pushstate', handler); // 링크 클릭 감지
    // popstate 이벤트 감지 → setPath
    window.addEventListener('popstate', handler);  // 뒤로가기 감지

    return () => {
      window.removeEventListener('pushstate', handler);
      window.removeEventListener('popstate', handler);
    };
  }, []);

  return currentPath;
};