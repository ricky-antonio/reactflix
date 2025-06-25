import { updateSearchCount, getTrendingMovies } from "./appwrite";

const API_BASE_URL = "https://api.themoviedb.org/3";
const API_KEY = import.meta.env.VITE_TMDB_API_KEY;

const API_OPTIONS = {
    method: "get",
    headers: {
        accept: "application/json",
        authorization: `Bearer ${API_KEY}`,
    },
};

export const fetchMovies = async (query = "", setIsLoading, setErrorMessage, setMovieList) => {
    setIsLoading(true);
    try {
        const endpoint = query
            ? `${API_BASE_URL}/search/movie?query=${encodeURIComponent(query)}`
            : `${API_BASE_URL}/discover/movie?include_adult=false&include_video=false&language=en-US&page=1&sort_by=popularity.desc`;
        const res = await fetch(endpoint, API_OPTIONS);

        if (!res.ok) throw new Error("Failed to fetch movies");

        const data = await res.json();
        console.log(data);

        if (data.Response === "false")
            setErrorMessage(data.Error || "Failed to fetch movies");

        setMovieList(data.results || []);

        if (query && data.results.length > 0) {
            await updateSearchCount(query, data.results[0]);
        }
    } catch (err) {
        console.log(`Error fetching movies: ${err}`);
        setErrorMessage("Error fetching movies, please try again later.");
    } finally {
        setIsLoading(false);
    }
};

export const loadTrendingMovies = async (setTrendingMovies) => {
    try {
        const movies = await getTrendingMovies();
        setTrendingMovies(movies);
        console.log(movies);
    } catch (err) {
        console.log(err);
    }
};
