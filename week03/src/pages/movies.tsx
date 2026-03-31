import { useState, useEffect } from 'react';
import type { Movie, MovieResponse } from '../types/movie';
import axios from 'axios';

const MoviesPage = () => {
    const [movies, setMovies] = useState<Movie[]>([]);

    console.log(movies);

    useEffect(() => {
        const fetchMovies = async () => {
            const { data } = await axios.get<MovieResponse>(
                'https://api.themoviedb.org/3/movie/popular?language=ko-KR&page=1',
                {
                    headers: {
                        Authorization: 'Bearer eyJhbGciOiJIUzI1NiJ9.eyJhdWQiOiJmODQ2ZDIwMmIwMDQ5MzcyYzkxYTlmODFjMjZlYTU5YSIsIm5iZiI6MTc3NDk4MDk3OS4wNjQsInN1YiI6IjY5Y2MwZjczY2IyYjRhMzA5OWNhNDE5NSIsInNjb3BlcyI6WyJhcGlfcmVhZCJdLCJ2ZXJzaW9uIjoxfQ.qOvZ8YutakIzebPTpbjZHWTvV3u8cnXy_ZKt3yQSb88',
                    },
                }
            );
            setMovies(data.results);
        };

        fetchMovies();
        //console.log(movies);
    }, []);

    return (
        <ul>
            {movies.map((movie) => (
                <li key={movie.id}>
                    <h2>{movie.title}</h2>
                    <p>{movie.release_date}</p>
                </li>
            ))}
        </ul>
    );
};

export default MoviesPage;