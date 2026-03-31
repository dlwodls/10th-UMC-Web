import type { ComponentType } from 'react';

export interface LinkProps {
  to: string;
  children: React.ReactNode;
}

export interface RouteProps {
  path: string;
  component: ComponentType;
}

export interface RoutesProps {
  children: React.ReactNode;
}