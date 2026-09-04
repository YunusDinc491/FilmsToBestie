import { useState, useEffect } from 'react'
import { getWatchList } from '../services/api.js'

function WatchedList({ isLoggedIn }) {
  const [movies, setMovies] = useState([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState(null)

  useEffect(() => {
    if (!isLoggedIn) {
      setLoading(false)
      return
    }

    getWatchList({ watched: true })
      .then((data) => setMovies(data))
      .catch((err) => setError(err.message))
      .finally(() => setLoading(false))
  }, [isLoggedIn])

  if (!isLoggedIn) {
    return <p style={{ textAlign: 'center', padding: '40px' }}>Please log in to see your watched movies.</p>
  }

  if (loading) return <p>Loading...</p>
  if (error) return <p>Error: {error}</p>

  return (
    <div className="movie-grid">
      {movies.length === 0 && <p>You haven't marked any movies as watched yet.</p>}
      {movies.map((movie) => (
        <div className="movie-card" key={movie.id}>
          <div className="poster-wrapper">
            {movie.posterUrl && <img src={movie.posterUrl} alt={movie.title} />}
            {movie.userRating != null && (
              <span className="rating-badge">
                {((movie.rating + movie.userRating) / 2).toFixed(1)}/10
              </span>
            )}
          </div>
          <h3>{movie.title}</h3>
          <p>{movie.releaseYear} • {movie.genres?.join(', ')}</p>
        </div>
      ))}
    </div>
  )
}

export default WatchedList