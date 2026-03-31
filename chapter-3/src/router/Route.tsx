import type { RouteProps } from './types';

// path에 맞는 컴포넌트를 렌더링하는 컴포넌트
// <Route path="/about" component={AboutPage} />
export const Route = ({ component: Component }: RouteProps) => {
  return <Component />;
};