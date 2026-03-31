import { useEffect, useState } from 'react';
import type { Movie, MovieResponse } from '../types/movie';
import MovieCard from '../components/MovieCard';

export default function MoviePage() {
    const [movies, setMovies] = useState<Movie[]>([]);
    const [isLoading, setIsLoading] = useState(true);
    const [error, setError] = useState<string | null>(null);

    useEffect(() => {
        const fetchMovies = async () => {
            try {
                const res = await fetch(
                    'https://api.themoviedb.org/3/movie/popular?language=ko-KR&page=1',
                    {
                        headers: {
                            Authorization: `Bearer eyJhbGciOiJIUzI1NiJ9.eyJhdWQiOiJmODQ2ZDIwMmIwMDQ5MzcyYzkxYTlmODFjMjZlYTU5YSIsIm5iZiI6MTc3NDk4MDk3OS4wNjQsInN1YiI6IjY5Y2MwZjczY2IyYjRhMzA5OWNhNDE5NSIsInNjb3BlcyI6WyJhcGlfcmVhZCJdLCJ2ZXJzaW9uIjoxfQ.qOvZ8YutakIzebPTpbjZHWTvV3u8cnXy_ZKt3yQSb88`,
                            'Content-Type': 'application/json',
                        },
                    }
                );
                if (!res.ok) throw new Error('영화 데이터를 불러오지 못했습니다.');
                const data: MovieResponse = await res.json();
                setMovies(data.results);
            } catch (err) {
                setError((err as Error).message);
            } finally {
                setIsLoading(false);
            }
        };

        fetchMovies();
    }, []);

    if (isLoading) {
        return (
            <div className='flex justify-center items-center min-h-screen'>
                <p className='text-gray-500 text-lg'>로딩 중...</p>
            </div>
        );
    }

    if (error) {
        return (
            <div className='flex justify-center items-center min-h-screen'>
                <p className='text-red-500 text-lg'>{error}</p>
            </div>
        );
    }

    return (
        <div className='p-8'>
            <h1 className='text-2xl font-bold mb-6'>인기 영화</h1>
            <div className='flex flex-wrap gap-4'>
                {movies.map((movie) => (
                    <MovieCard key={movie.id} movie={movie} />
                ))}
            </div>
        </div>
    );
}