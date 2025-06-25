import { useState, useEffect } from "react";
import { useDebounce } from "react-use";
import { fetchMovies, loadTrendingMovies } from "./tmdb";
import Header from "./components/Header";
import TrendingMovies from "./components/TrendingMovies";
import MovieList from "./components/MovieList";

const App = () => {
    const [searchTerm, setSearchTerm] = useState("");
    const [errorMessage, setErrorMessage] = useState("");
    const [movieList, setMovieList] = useState([]);
    const [trendingMovies, setTrendingMovies] = useState([]);
    const [isLoading, setIsLoading] = useState(false);
    const [debouncedSearchTem, setDebouncedSearchTerm] = useState("");

    useDebounce(() => setDebouncedSearchTerm(searchTerm), 500, [searchTerm]);

    useEffect(() => {
        fetchMovies(
            debouncedSearchTem,
            setIsLoading,
            setErrorMessage,
            setMovieList
        );
    }, [debouncedSearchTem]);

    useEffect(() => {
        loadTrendingMovies(setTrendingMovies);
    }, []);

    return (
        <main>
            <div className="pattern" />

            <div className="wrapper">
                <Header searchTerm={searchTerm} setSearchTerm={setSearchTerm} />

                <TrendingMovies trendingMovies={trendingMovies} />

                <MovieList
                    movieList={movieList}
                    errorMessage={errorMessage}
                    isLoading={isLoading}
                />
            </div>
        </main>
    );
};

export default App;
