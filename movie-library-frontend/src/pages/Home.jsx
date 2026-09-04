import { useState, useEffect } from 'react'
import MovieCard from '../components/MovieCard.jsx'
import CategorySidebar from '../components/CategorySidebar.jsx'
import AddMovieForm from '../components/AddMovieForm.jsx'
import { isAdmin } from '../utils/auth.js'
import { getMovies, addToWatchList, removeFromWatchList, markAsWatched, deleteMovie } from '../services/api.js'

function Home({ isLoggedIn, watchList, loadWatchList, mediaFilter }) {
  const [movies, setMovies] = useState([])
  const [totalCount, setTotalCount] = useState(0)
  const [page, setPage] = useState(1)
  const [category, setCategory] = useState(null)
  const [search, setSearch] = useState('')
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState(null)

  const pageSize = 50

  function fetchMovies() {
    setLoading(true)
    getMovies({ category, isSeries: mediaFilter, search, page, pageSize })
      .then((data) => {
        setMovies(data.items)
        setTotalCount(data.totalCount)
      })
      .catch((err) => setError(err.message))
      .finally(() => setLoading(false))
  }

  useEffect(() => {
    fetchMovies()
  }, [category, page, mediaFilter, search])

  function handleCategorySelect(selected) {
    setCategory(selected)
    setPage(1)
  }

  function handleSearchChange(value) {
    setSearch(value)
    setPage(1)
  }

  async function handleToggleWatchList(movieId, isInList) {
    try {
      if (isInList) {
        await removeFromWatchList(movieId)
      } else {
        await addToWatchList(movieId)
      }
      loadWatchList()
    } catch (err) {
      setError(err.message)
    }
  }
  async function handleMarkWatched(movieId, data) {
    try {
      await markAsWatched(movieId, data)
      loadWatchList()
    } catch (err) {
      setError(err.message)
    }
  }

  async function handleDeleteMovie(movieId) {
    try {
      await deleteMovie(movieId)
      fetchMovies()
    } catch (err) {
      setError(err.message)
    }
  }

  const totalPages = Math.ceil(totalCount / pageSize)

  return (
    <div className="layout">
      <div className="main-content">

        {isLoggedIn && isAdmin() && mediaFilter === undefined && (
          <AddMovieForm onMovieAdded={fetchMovies} />
        )}

        <input
          type="text"
          className="search-input"
          placeholder="Film ara..."
          value={search}
          onChange={(e) => handleSearchChange(e.target.value)}
        />

        {loading && <p>Loading...</p>}
        {error && <p>Error: {error}</p>}

        {!loading && !error && (
          <>
            <div className="movie-grid">
              {movies.map((movie) => (
                <MovieCard
                  key={movie.id}
                  movie={movie}
                  isLoggedIn={isLoggedIn}
                  isInWatchList={watchList.some((m) => m.id === movie.id)}
                  onToggleWatchList={handleToggleWatchList}
                  onMarkWatched={handleMarkWatched}
                  onDeleteMovie={handleDeleteMovie}
                />
              ))}
            </div>

            {totalPages > 1 && (
              <div className="pagination">
                <button disabled={page === 1} onClick={() => setPage((p) => p - 1)}>
                  Previous
                </button>
                <span>Page {page} / {totalPages}</span>
                <button disabled={page === totalPages} onClick={() => setPage((p) => p + 1)}>
                  Next
                </button>
              </div>
            )}
          </>
        )}
      </div>

      <CategorySidebar selectedCategory={category} onSelectCategory={handleCategorySelect} />
    </div>
  )
}

export default Home