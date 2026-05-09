import { useEffect, useState } from "react";
import { getMyInfo } from "../apis/auth";
import { type ResponseMyInfoDto } from "../types/auth.ts";
import { useNavigate } from "react-router-dom";
import { useAuth } from "../context/AuthContext";

const MyPage = () => {
  const navigate = useNavigate();
  const { logout } = useAuth();
  const [data, setData] = useState<ResponseMyInfoDto | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const getData = async () => {
      try {
        const response = await getMyInfo();
        setData(response);
      } catch (error) {
        console.error("사용자 정보 조회 실패", error);
        setError("내 정보를 불러오지 못했습니다.");
      } finally {
        setLoading(false);
      }
    };

    getData();
  }, []);

  const handleLogout = async () => {
    await logout();
    navigate("/");
  };

  if (loading) {
    return <div>내 정보를 불러오는 중입니다.</div>;
  }

  if (error) {
    return <div>{error}</div>;
  }

  return (
    <div>
      <h1>{data?.data?.name}님 환영합니다.</h1>
      {data?.data?.avatar ? (
        <img src={data.data.avatar} alt={`${data.data.name} 프로필 이미지`} />
      ) : (
        <div>프로필 이미지가 없습니다.</div>
      )}
      <h1>{data?.data?.email}</h1>
      <button
        className="cursor-pointer bg-blue-300 rounded-sm p-5 hover:scale-90"
        onClick={handleLogout}
      >
        로그아웃
      </button>
    </div>
  );
};

export default MyPage;
