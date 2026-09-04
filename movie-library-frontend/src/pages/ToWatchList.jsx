import { useState, useEffect } from 'react'
import MovieCard from '../components/MovieCard.jsx'
import { getWatchList, addToWatchList, removeFromWatchList, markAsWatched } from '../services/api.js'

function ToWatchList({ isLoggedIn }) {
  const [movies, setMovies] = useState([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState(null)

  function fetchToWatch() {
    setLoading(true)
    getWatchList({ watched: false })
      .then((data) => setMovies(data))
      .catch((err) => setError(err.message))
      .finally(() => setLoading(false))
  }

  useEffect(() => {
    if (!isLoggedIn) {
      setLoading(false)
      return
    }
    fetchToWatch()
  }, [isLoggedIn])

  async function handleToggleWatchList(movieId) {
    try {
      await removeFromWatchList(movieId)
      fetchToWatch()
    } catch (err) {
      setError(err.message)
    }
  }

  async function handleMarkWatched(movieId, data) {
    try {
      await markAsWatched(movieId, data)
      fetchToWatch()
    } catch (err) {
      setError(err.message)
    }
  }

  if (!isLoggedIn) {
    return <p style={{ textAlign: 'center', padding: '40px' }}>Please log in to see your watch list.</p>
  }

  if (loading) return <p>Loading...</p>
  if (error) return <p>Error: {error}</p>

  return (
    <div className="movie-grid">
      {movies.length === 0 && <p>Watchlistinize henüz film eklemediniz.</p>}
      {movies.map((movie) => (
        <MovieCard
          key={movie.id}
          movie={movie}
          isLoggedIn={isLoggedIn}
          isInWatchList={true}
          onToggleWatchList={handleToggleWatchList}
          onMarkWatched={handleMarkWatched}
        />
      ))}
    </div>
  )
}

export default ToWatchList