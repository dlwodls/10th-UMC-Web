import { useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import type { Movie, MovieResponse } from '../types/movie';
import { LoadingSpinner } from '../components/LoadingSpinner';
import { useCustomFetch } from '../hooks/useCustomFetch';
import MovieCard from '../components/MovieCard';


export default function MoviePage() {
    const navigate = useNavigate();



    const [page, setPage] = useState(1);     // 페이지 처리
    const { category } = useParams<{
        category: string;
    }>();

    // useCustomFetch 훅으로 데이터, 로딩, 에러 상태를 한번에 관리
    // page나 category가 바뀌면 URL이 바뀌므로 훅이 자동으로 재요청
    const { data, isPending, isError } = useCustomFetch<MovieResponse>(
        `https://api.themoviedb.org/3/movie/${category}?language=ko-KR&page=${page}`
    );

    // data가 null인 경우(초기 상태) 빈 배열로 초기화
    const movies: Movie[] = data?.results ?? [];


    // API 에러 발생 시 에러 UI 표시
    if (isError) {
        return (
            <div className="flex flex-col items-center justify-center h-dvh gap-4">
                <span className="text-yellow-400 text-6xl">⚠️</span>
                <p className="text-white text-xl font-semibold">에러가 발생했습니다. 이용에 불편을 드려 죄송합니다.</p>
                <button
                    className="mt-2 px-6 py-3 bg-[#dda5e3] text-white rounded-lg hover:bg-[#b2dab1] transition-all duration-200 cursor-pointer"
                    onClick={() => navigate('/')}
                >
                    홈으로 돌아가기
                </button>
            </div>
        );
    }

    return (
        <>
            <div className='flex items-center justify-center gap-6 mt-5'>
                <button 
                    className='bg-[#dda5e3] text-white px-6 py-3 rounded-lg shadow-md
                    hover:bg-[#b2dab1] transition-all duration-200 disabled:bg-gray-300
                    cursor-pointer disabled:cursor-not-allowed'
                    disabled={page === 1} 
                    onClick={() => setPage((prev) => prev - 1)}>
                    {'<'}</button>
                <span>{page} 페이지</span>
                <button 
                    className='bg-[#dda5e3] text-white px-6 py-3 rounded-lg shadow-md
                    hover:bg-[#b2dab1] transition-all duration-200 disabled:bg-gray-300
                    cursor-pointer disabled:cursor-not-allowed'
                    onClick={() => setPage((prev) => prev + 1)}>
                    {'>'}</button>
            </div>

            {isPending && (
                <div className='flex items-center justify-center h-dvh'>
                    <LoadingSpinner />
                </div>
            )}

            {!isPending && (
                <div className='p-10 grid gap-4 grid-cols-2 sm:grid-cols-3 md:grid-cols-4
                lg:grid-cols-5 xl:grid-cols-6'>
                    {movies.map((movie) => (
                        <MovieCard key={movie.id} movie={movie} />
                    ))}
                </div>
            )}
        </>
    );
}