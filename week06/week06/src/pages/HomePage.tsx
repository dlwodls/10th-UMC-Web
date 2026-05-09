import { useState } from "react";
import { Link } from "react-router-dom";
import { useAuth } from "../context/AuthContext";
import useGetLpList from "../hooks/queries/useGetLpList";
import { PAGINATION_ORDER } from "../enums/common";

const HomePage = () => {
  const { isAuthenticated } = useAuth();
  const [search, setSearch] = useState("");
  const [order, setOrder] = useState<PAGINATION_ORDER>(PAGINATION_ORDER.desc);

  const { data, isPending, isError } = useGetLpList({
    search,
    order,
    limit: 10,
  });
  const lpList = data ?? [];

  return (
    <div className="flex flex-col min-h-full bg-gray-50">
      {/* 헤더 영역 */}
      <div className="bg-white border-b border-gray-200 px-6 py-8 text-center">
        <h1 className="text-3xl font-bold text-gray-900 mb-4">환영합니다</h1>
        <p className="text-gray-500 mb-6">
          로그인하고 나만의 서비스를 이용해보세요.
        </p>

        {isAuthenticated ? (
          <p></p>
        ) : (
          <div className="flex justify-center gap-3">
            <Link
              to="/login"
              className="border border-blue-500 text-blue-500 px-6 py-2.5 rounded-md text-sm font-medium hover:bg-blue-50 transition-colors"
            >
              로그인
            </Link>
            <Link
              to="/signup"
              className="bg-blue-500 text-white px-6 py-2.5 rounded-md text-sm font-medium hover:bg-blue-600 transition-colors"
            >
              회원가입
            </Link>
          </div>
        )}
      </div>

      {/* 검색 + 목록 영역 */}
      <div className="flex-1 px-6 py-6 max-w-5xl mx-auto w-full">
        <div className="flex items-center gap-3 mb-6">
          <input
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            placeholder="LP 검색..."
            className="flex-1 border border-gray-300 rounded-md px-4 py-2.5 text-sm focus:outline-none focus:border-blue-400"
          />
          <div className="flex shrink-0 border border-gray-300 rounded-md overflow-hidden text-sm">
            <button
              onClick={() => setOrder(PAGINATION_ORDER.desc)}
              className={`px-3 py-2.5 transition-colors cursor-pointer ${
                order === PAGINATION_ORDER.desc
                  ? "bg-blue-500 text-white"
                  : "text-gray-600 hover:bg-gray-100"
              }`}
            >
              최신순
            </button>
            <button
              onClick={() => setOrder(PAGINATION_ORDER.asc)}
              className={`px-3 py-2.5 border-l border-gray-300 transition-colors cursor-pointer ${
                order === PAGINATION_ORDER.asc
                  ? "bg-blue-500 text-white"
                  : "text-gray-600 hover:bg-gray-100"
              }`}
            >
              오래된순
            </button>
          </div>
        </div>

        {isPending && (
          <div className="flex justify-center py-16">
            <div className="w-8 h-8 border-4 border-blue-200 border-t-blue-500 rounded-full animate-spin" />
          </div>
        )}

        {isError && (
          <p className="text-center text-red-400 text-sm py-16">
            목록을 불러오지 못했습니다.
          </p>
        )}

        {!isPending && !isError && lpList.length === 0 && (
          <p className="text-center text-gray-400 text-sm py-16">
            검색 결과가 없습니다.
          </p>
        )}

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5">
          {lpList.map((lp) => (
            <Link
              key={lp.id}
              to={`/lp/${lp.id}`}
              className="relative group block overflow-hidden rounded-sm aspect-square"
            >
              {lp.thumbnail ? (
                <img
                  src={lp.thumbnail}
                  alt={lp.title}
                  className="w-full h-full object-cover transform group-hover:scale-105 transition-transform duration-300"
                />
              ) : (
                <div className="w-full h-full bg-gray-100 flex items-center justify-center text-gray-300 text-sm">
                  No Image
                </div>
              )}

              <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-black/20 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex flex-col justify-end p-4">
                <h2 className="text-white font-semibold text-sm line-clamp-1">
                  {lp.title}
                </h2>
                <p className="text-gray-300 text-xs mt-1">
                  {new Date(lp.createdAt).toLocaleDateString("ko-KR")}
                </p>
                <div className="flex items-center gap-1 text-gray-300 text-xs mt-1">
                  <span>♥</span>
                  <span>{lp.likes.length}</span>
                </div>
              </div>
            </Link>
          ))}
        </div>
      </div>
    </div>
  );
};

export default HomePage;
