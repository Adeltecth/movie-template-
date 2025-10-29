import MovieCard from "../component/MovieCard";
import '../css/Home.css';

import { useEffect, useState } from "react"
import { searchMovies, getPopularMovies } from "../Services/api";

function Home() {

    const [searchQuery, setSearchQuery] = useState("");
    const [movies, setMovies] = useState([])
    const [error, setError] = useState(null)
    const [loading, setLoading] = useState(true)

    useEffect(() => {
        const loadPopularMovies = async () => {
            try {
                const popularMovies = await getPopularMovies()
                setMovies(popularMovies)
            } catch (err) {
                console.log(err)
                setError("failed to load movies...")
            }
            finally {
                setLoading(false)
            }
        }
        loadPopularMovies()
    }, [])


    const handleSearch = async (e) => {
        e.preventDefault();

        if (!searchQuery.trim()) return
        if (loading) return

        setLoading(true)
        try {
            const searchResults = await searchMovies(searchQuery)
            setMovies(searchResults)
            setError(null)
        } catch (err) {
            setError("Failed to search movies...")
        }

        finally{
            setLoading(false)
        }
    };

    return (
        <div className="home">

            <form onSubmit={handleSearch} className="search-form">
                <input
                    type="text"
                    placeholder="Search for movies..."
                    className="search-input"
                    value={searchQuery}
                    onChange={(e) => { setSearchQuery(e.target.value) }} />
                <button type="submit" className="search-btn">Search</button>
            </form>

            {error && <div className="error-message">{error}</div>}

            {!loading && movies.length === 0 && !error && (
  <div className="no-results">No movies found.</div>
)}


            {loading ? (<div className="loading">Loading ...</div>) :
                (<div className="movies-grid">
                    {movies.map(
                        (movie) => (
                            <MovieCard movie={movie} key={movie.id} />
                        )
                    )}
                </div>)
            }

        </div>

    )

}

export default Home;