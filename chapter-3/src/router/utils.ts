// 현재 URL 경로를 반환하는 함수
export const getCurrentPath = () => window.location.pathname;

// URL을 변경하고 커스텀 이벤트를 발생시키는 함수
// pushState로 새로고침 없이 URL만 변경 + pushstate 이벤트로 앱에 알림
export const navigateTo = (path: string) => {
  history.pushState(null, '', path);
  window.dispatchEvent(new Event('pushstate'));
};