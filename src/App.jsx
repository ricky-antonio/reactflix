import { useState, useEffect } from "react";
import Search from "./components/Search";

const API_BASE_URL = "https://api.themoviedb.org/3";
const API_KEY = import.meta.env.VITE_TMDB_API_KEY;

const API_OPTIONS = {
    method: "get",
    headers: {
        accept: "application/json",
        authorization: `Bearer ${API_KEY}`,
    },
};

const App = () => {
    const [searchTerm, setSearchTerm] = useState("");
    const [errorMessage, setErrorMessage] = useState("");
    const [movieList, setMovieList] = useState([]);
    const [isLoading, setIsLoading] = useState(false);

    const fetchMovies = async () => {
        setIsLoading(true);
        try {
            const endpoint = `${API_BASE_URL}/discover/movie?include_adult=false&include_video=false&language=en-US&page=1&sort_by=popularity.desc`;
            const res = await fetch(endpoint, API_OPTIONS);

            if (!res.ok) throw new Error("Failed to fetch movies");

            const data = await res.json();
            console.log(data);

            if (data.Response === "false")
                setErrorMessage(data.Error || "Failed to fetch movies");

            setMovieList(data.results || []);
        } catch (err) {
            console.log(`Error fetching movies: ${err}`);
            setErrorMessage("Error fetching movies, please try again later.");
        } finally {
            setIsLoading(false);
        }
    };

    useEffect(() => {
        fetchMovies();
        // fetch(`${API_BASE_URL}/discover/movie?include_adult=false&include_video=false&language=en-US&page=1&sort_by=popularity.desc`, API_OPTIONS)
        // .then(res => res.json())
        // .then(res => console.log(res))
        // .catch(err => console.log(err))
    }, []);

    return (
        <main>
            <div className="pattern"></div>

            <div className="wrapper">
                <header>
                    <img src="./hero.png" alt="hero banner" />
                    <h1>
                        Find <span className="text-gradient">Movies</span>{" "}
                        You'll Enjoy Without the Hassle
                    </h1>
                    <Search
                        searchTerm={searchTerm}
                        setSearchTerm={setSearchTerm}
                    />
                </header>
                <section className="all-movies">
                    <h2>All Movies</h2>
                    {isLoading && <p className="text-white">Loading....</p>}
                    {errorMessage && (
                        <p className="text-red-500">{errorMessage}</p>
                    )}
                    <ul>
                        {movieList.map((movie) => (
                            <li className="text-white" key={movie.id}>{movie.title}</li>
                        ))}
                    </ul>
                </section>
            </div>
        </main>
    );
};

export default App;
