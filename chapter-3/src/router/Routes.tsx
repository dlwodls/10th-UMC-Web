import { Children, cloneElement, isValidElement, useMemo } from 'react';
import type { FC, ReactElement } from 'react';
import type { RoutesProps, RouteProps } from './types';
import { useCurrentPath } from './hooks';

// 현재 경로와 일치하는 Route를 찾아 렌더링하는 컴포넌트
// 일치하는 Route가 없으면 null 반환
export const Routes: FC<RoutesProps> = ({ children }) => {
  const currentPath = useCurrentPath();

  // children 중에서 현재 경로와 path가 일치하는 Route 찾기
  const activeRoute = useMemo(() => {
    return Children
      .toArray(children)
      .filter((child): child is ReactElement<RouteProps> => isValidElement(child))
      .find((child) => child.props.path === currentPath);
  }, [children, currentPath]);

  if (!activeRoute) return null;
  return cloneElement(activeRoute);
};