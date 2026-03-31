import type { MouseEvent } from 'react';
import type { LinkProps } from './types';
import { getCurrentPath, navigateTo } from './utils';

export const Link = ({ to, children }: LinkProps) => {
  const handleClick = (e: MouseEvent<HTMLAnchorElement>) => {
    // e.preventDefault()
    e.preventDefault();                    // → 새로고침 막기

    // getCurrentPath() === to 면
    if (getCurrentPath() === to) return;   // → 같은 경로면 이동 안 함

    // navigateTo(to)
    navigateTo(to);                        // → URL 변경 + 이벤트 발생
  };

  return (
    <a href={to} onClick={handleClick}>
      {children}
    </a>
  );
};