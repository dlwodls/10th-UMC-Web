import './App.css'
import { Link, Route, Routes } from './router/index';
import MatthewPage from './pages/MatthewPage';
import AriPage from './pages/AriPage';
import JoyPage from './pages/JoyPage';
import NotFoundPage from './pages/NotFoundPage';

// 네비게이션 바 컴포넌트
// Link 클릭 시 새로고침 없이 URL만 변경됨 (SPA 방식)
const Header = () => {
  return (
    <nav style={{ display: 'flex', gap: '10px' }}>
      <Link to='/matthew'>MATTHEW</Link>
      <Link to='/ari'>ARI</Link>
      <Link to='/joy'>JOY</Link>
      <Link to='/not-found'>NOT FOUND</Link>
    </nav>
  );
};

// 경로에 따라 다른 페이지 컴포넌트를 렌더링
function App() {
  return (
    <>
      <Header />
      <Routes>
        <Route path='/matthew' component={MatthewPage} />
        <Route path='/ari' component={AriPage} />
        <Route path='/joy' component={JoyPage} />
        <Route path='/not-found' component={NotFoundPage} />
      </Routes>
    </>
  );
}

export default App;