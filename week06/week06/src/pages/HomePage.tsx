import { Link } from "react-router-dom";
import { useAuth } from "../context/AuthContext";

const HomePage = () => {
  const { isAuthenticated } = useAuth();

  return (
    <div className="flex flex-col items-center justify-center h-full gap-6 text-center px-4">
      <h1 className="text-4xl font-bold text-gray-900">
        환영합니다
      </h1>
      <p className="text-gray-500 text-lg max-w-md">
        로그인하고 나만의 서비스를 이용해보세요.
      </p>
      {isAuthenticated ? (
        <Link
          to="/my"
          className="bg-blue-500 text-white px-8 py-3 rounded-md text-base font-medium hover:bg-blue-600 transition-colors"
        >
          마이페이지로 이동
        </Link>
      ) : (
        <div className="flex gap-3">
          <Link
            to="/login"
            className="border border-blue-500 text-blue-500 px-8 py-3 rounded-md text-base font-medium hover:bg-blue-50 transition-colors"
          >
            로그인
          </Link>
          <Link
            to="/signup"
            className="bg-blue-500 text-white px-8 py-3 rounded-md text-base font-medium hover:bg-blue-600 transition-colors"
          >
            회원가입
          </Link>
        </div>
      )}
    </div>
  );
};

export default HomePage;
