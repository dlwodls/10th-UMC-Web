import { useState } from "react";
import { useNavigate, useParams, useLocation } from "react-router-dom";
import useGetLp from "../hooks/queries/useGetLp";
import { useAuth } from "../context/AuthContext";

const LpDetailPage = () => {
  const { lpId } = useParams<{ lpId: string }>();
  const { isAuthenticated } = useAuth();
  const navigate = useNavigate();
  const location = useLocation();
  const { data, isPending, isError } = useGetLp(Number(lpId));
  const [isLiked, setIsLiked] = useState(false);

  if (isPending) {
    return (
      <div className="flex items-center justify-center h-full">
        <div className="w-8 h-8 border-4 border-blue-200 border-t-blue-500 rounded-full animate-spin" />
      </div>
    );
  }

  if (isError || !data) {
    return (
      <div className="flex items-center justify-center h-full">
        <p className="text-red-400 text-sm">LP를 불러오지 못했습니다.</p>
      </div>
    );
  }

  const lp = data.data;
  const likeCount = lp.likes.length + (isLiked ? 1 : 0);

  return (
    <div className="flex flex-col items-center gap-6 bg-gray-50 min-h-full px-6 py-10">
      {/* 비로그인 경고 모달 */}
      {!isAuthenticated && (
        <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50">
          <div className="bg-white rounded-xl shadow-xl px-8 py-6 flex flex-col items-center gap-4 w-80">
            <h2 className="text-lg font-bold text-gray-900">
              로그인이 필요합니다
            </h2>
            <p className="text-sm text-gray-500 text-center">
              상세 페이지는 로그인 후 이용할 수 있습니다.
            </p>
            <button
              onClick={() =>
                navigate("/login", { state: { from: location.pathname } })
              }
              className="w-full bg-blue-500 hover:bg-blue-600 text-white py-2.5 rounded-md text-sm font-medium transition-colors cursor-pointer"
            >
              확인
            </button>
          </div>
        </div>
      )}

      <div className="relative bg-white rounded-xl shadow-md px-8 py-6 flex flex-col items-center gap-4 w-[1000px] h-[750px]">
        {/* 수정/삭제 버튼 */}
        <div className="absolute top-4 right-4 flex gap-2">
          <button className="text-sm text-gray-500 hover:text-blue-500 border border-gray-200 px-3 py-1.5 rounded-md hover:border-blue-400 transition-colors cursor-pointer">
            수정
          </button>
          <button className="text-sm text-gray-500 hover:text-red-500 border border-gray-200 px-3 py-1.5 rounded-md hover:border-red-400 transition-colors cursor-pointer">
            삭제
          </button>
        </div>

        {/* 비닐 레코드 */}
        <div className="relative shrink-0 flex items-center justify-center w-72 h-72 rounded-full shadow-2xl overflow-hidden animate-[spin_8s_linear_infinite]">
          {lp.thumbnail ? (
            <img
              src={lp.thumbnail}
              alt={lp.title}
              className="absolute inset-0 w-full h-full object-cover"
            />
          ) : (
            <div className="absolute inset-0 bg-gray-800" />
          )}
          <div className="absolute inset-0 bg-black/50 rounded-full" />
          <div className="absolute w-64 h-64 rounded-full border border-white/10" />
          <div className="absolute w-56 h-56 rounded-full border border-white/10" />
          <div className="absolute w-48 h-48 rounded-full border border-white/10" />
          <div className="absolute w-40 h-40 rounded-full border border-white/10" />
          <div className="absolute w-15 h-15 rounded-full bg-white z-20" />
        </div>

        {/* 제목 */}
        <h1 className="text-2xl font-bold text-gray-900 text-center">
          {lp.title}
        </h1>

        {/* 업로드일 */}
        <p className="text-sm text-gray-400">
          {new Date(lp.createdAt).toLocaleDateString("ko-KR")}
        </p>

        {/* 본문 */}
        <p className="text-sm text-gray-600 leading-relaxed whitespace-pre-wrap text-center">
          {lp.content}
        </p>

        {/* 좋아요 버튼 */}
        <button
          onClick={() => setIsLiked((prev) => !prev)}
          className="absolute bottom-6 flex flex-col items-center gap-1 cursor-pointer group"
        >
          <svg
            width="28"
            height="28"
            viewBox="0 0 24 24"
            fill={isLiked ? "#ef4444" : "none"}
            stroke={isLiked ? "#ef4444" : "#9ca3af"}
            strokeWidth="2"
            className="transition-all duration-200 group-hover:scale-110"
          >
            <path d="M20.84 4.61a5.5 5.5 0 0 0-7.78 0L12 5.67l-1.06-1.06a5.5 5.5 0 0 0-7.78 7.78l1.06 1.06L12 21.23l7.78-7.78 1.06-1.06a5.5 5.5 0 0 0 0-7.78z" />
          </svg>
          <span
            className={`text-sm font-medium ${isLiked ? "text-red-400" : "text-gray-400"}`}
          >
            {likeCount}
          </span>
        </button>
      </div>
    </div>
  );
};

export default LpDetailPage;
