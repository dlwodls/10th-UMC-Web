import { useParams } from 'react-router-dom';
import type { MovieDetail, Credits } from '../types/movie';
import { LoadingSpinner } from '../components/LoadingSpinner';
import { useCustomFetch } from '../hooks/useCustomFetch';

const BASE_URL = 'https://api.themoviedb.org/3';
const IMG_BASE  = 'https://image.tmdb.org/t/p';

export default function MovieDetailPage() {
    const { movieId } = useParams<{ movieId: string }>();

    // 영화 상세 정보 요청
    // useCustomFetch 훅 사용
    const {
        data: movie,
        isPending: moviePending,
        isError: movieError,
    } = useCustomFetch<MovieDetail>(
        `${BASE_URL}/movie/${movieId}?language=ko-KR`
    );

    // 감독/출연진 정보 요청
    // useCustomFetch 훅 사용
    const {
        data: credits,
        isPending: creditsPending,
        isError: creditsError,
    } = useCustomFetch<Credits>(
        `${BASE_URL}/movie/${movieId}/credits?language=ko-KR`
    );

    // 두 요청 중 하나라도 로딩 중이면 스피너 표시
    const isPending = moviePending || creditsPending;

    // 두 요청 중 하나라도 에러면 에러 표시
    const isError = movieError || creditsError;

    if (isPending) {
        return (
            <div className="flex items-center justify-center h-dvh">
                <LoadingSpinner />
            </div>
        );
    }

    if (isError || !movie) {
        return (
            <div className="flex items-center justify-center h-dvh">
                <span className="text-red-500 text-2xl">에러가 발생했습니다.</span>
            </div>
        );
    }

    // 감독 필터링 + 출연진 상위 20명 추출 후 합치기
    const directors = credits?.crew.filter((c) => c.job === 'Director') ?? [];
    const cast      = credits?.cast.slice(0, 20) ?? [];
    const people    = [...directors, ...cast];

    return (
        <div className="text-white bg-black min-h-screen p-6">

            {/* 영화 정보 + 이미지 */}
            <div className="flex flex-col md:flex-row gap-6 mb-10">

                {/* 텍스트 정보 (왼쪽) */}
                <div className="flex-1 flex flex-col justify-center">
                    <h1 className="text-3xl font-bold mb-3">{movie.title}</h1>
                    <p className="text-gray-300">평균 {movie.vote_average.toFixed(1)}</p>
                    <p className="text-gray-300">{movie.release_date?.slice(0, 4)}</p>
                    <p className="text-gray-300 mb-4">{movie.runtime}분</p>
                    {movie.tagline && (
                        <p className="text-yellow-400 italic mb-4">{movie.tagline}</p>
                    )}
                    <p className="text-gray-300 leading-relaxed">
                        {movie.overview || '줄거리 정보가 없습니다.'}
                    </p>
                </div>

                {/* 배경 이미지 (오른쪽) */}
                <div className="flex-1">
                    <img
                        src={`${IMG_BASE}/w780${movie.backdrop_path}`}
                        alt={movie.title}
                        className="w-full rounded-2xl object-cover"
                    />
                </div>
            </div>

            {/* 구분선 */}
            <hr className="border-gray-700 mb-8" />

            {/* 감독/출연 */}
            <div>
                <h2 className="text-xl font-bold mb-6">감독/출연</h2>
                <div className="flex gap-6 overflow-x-auto pb-4">
                    {people.map((person, index) => (
                        <div
                            key={`${person.id}-${index}`}
                            className="flex-shrink-0 w-24 text-center"
                        >
                            <img
                                src={
                                    person.profile_path
                                        ? `${IMG_BASE}/w185${person.profile_path}`
                                        : undefined
                                }
                                alt={person.name}
                                className="w-20 h-20 rounded-full object-cover mx-auto mb-2 bg-gray-700"
                            />
                            <p className="text-sm font-semibold">{person.name}</p>
                            {/* 감독이면 job, 배우면 character 표시 */}
                            <p className="text-xs text-gray-400 mt-1">
                                {'character' in person ? person.character : person.job}
                            </p>
                        </div>
                    ))}
                </div>
            </div>

        </div>
    );
}
