import { Outlet, Link, useNavigate } from "react-router-dom";
import { useAuth } from "../context/AuthContext";

const HomeLayout = () => {
  const { isAuthenticated, isAuthLoading, logout } = useAuth();
  const navigate = useNavigate();

  const handleLogout = async () => {
    await logout();
    navigate("/");
  };

  return (
    <div className="h-dvh flex flex-col">
      <nav className="bg-white border-b border-gray-200 px-6 py-3 flex items-center justify-between shadow-sm">
        <Link to="/" className="text-xl font-bold text-blue-500 tracking-tight">
          MyApp
        </Link>
        {!isAuthLoading && (
          <div className="flex items-center gap-3">
            {isAuthenticated ? (
              <>
                <Link
                  to="/my"
                  className="text-sm text-gray-600 hover:text-blue-500 font-medium transition-colors"
                >
                  마이페이지
                </Link>
                <button
                  onClick={handleLogout}
                  className="text-sm bg-blue-500 text-white px-4 py-2 rounded-md hover:bg-blue-600 transition-colors cursor-pointer"
                >
                  로그아웃
                </button>
              </>
            ) : (
              <>
                <Link
                  to="/login"
                  className="text-sm text-gray-600 hover:text-blue-500 font-medium transition-colors"
                >
                  로그인
                </Link>
                <Link
                  to="/signup"
                  className="text-sm bg-blue-500 text-white px-4 py-2 rounded-md hover:bg-blue-600 transition-colors"
                >
                  회원가입
                </Link>
              </>
            )}
          </div>
        )}
      </nav>
      <main className="flex-1">
        <Outlet />
      </main>
      <footer className="bg-white border-t border-gray-200 py-4 text-center text-sm text-gray-400">
        © 2025 MyApp. All rights reserved.
      </footer>
    </div>
  );
};

export default HomeLayout;
