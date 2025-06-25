import MovieCard from "./MovieCard";
import Spinner from "./Spinner";

const MovieList = ({movieList, errorMessage, isLoading}) => {
    return (
        <section className="all-movies">
            <h2 className="mt-[40px]">All Movies</h2>
            {errorMessage && <p className="text-red-500">{errorMessage}</p>}
            {isLoading ? (
                <Spinner />
            ) : (
                <ul>
                    {movieList.map((movie) => (
                        <MovieCard key={movie.id} movie={movie} />
                    ))}
                </ul>
            )}
        </section>
    );
};

export default MovieList;
