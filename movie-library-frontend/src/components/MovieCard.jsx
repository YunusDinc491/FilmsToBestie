import { useState } from 'react'
import { isAdmin } from '../utils/auth.js'
import ConfirmModal from './ConfirmModal.jsx'

function MovieCard({ movie, isLoggedIn, isInWatchList, onToggleWatchList, onMarkWatched, onDeleteMovie }) {
  const [showWatchedForm, setShowWatchedForm] = useState(false)
  const [rating, setRating] = useState('')
  const [showDeleteConfirm, setShowDeleteConfirm] = useState(false)

  function handleConfirmWatched(e) {
    e.preventDefault()
    onMarkWatched(movie.id, {
      watchedAt: null,
      rating: Number(rating),
    })
    setShowWatchedForm(false)
    setRating('')
  }

  function handleConfirmDelete() {
    setShowDeleteConfirm(false)
    onDeleteMovie(movie.id)
  }

  return (
    <div className="movie-card">
      <div className="poster-wrapper">
        {movie.posterUrl && <img src={movie.posterUrl} alt={movie.title} />}
        {isLoggedIn && isAdmin() && onDeleteMovie && (
          <button
            className="delete-movie-btn"
            title="Filmi sil"
            onClick={(e) => {
              e.stopPropagation()
              setShowDeleteConfirm(true)
            }}
          >
            ×
          </button>
        )}
      </div>
      <h3>{movie.title}</h3>
      <p>{movie.releaseYear} • {movie.genres?.join(', ')}</p>
      {isLoggedIn && (
        <div className="card-actions">
          <button onClick={() => onToggleWatchList(movie.id, isInWatchList)}>
            {isInWatchList ? 'Remove from Watch List' : 'Add to Watch List'}
          </button>
          {isInWatchList && !showWatchedForm && (
            <button onClick={() => setShowWatchedForm(true)}>Mark as Watched</button>
          )}
          {isInWatchList && showWatchedForm && (
            <form className="watched-form" onSubmit={handleConfirmWatched}>
              <input
                type="number"
                placeholder="Puan (1-10)"
                min="1"
                max="10"
                value={rating}
                onChange={(e) => setRating(e.target.value)}
                required
              />
              <button type="submit">Kaydet</button>
              <button type="button" onClick={() => setShowWatchedForm(false)}>İptal</button>
            </form>
          )}
        </div>
      )}

      {showDeleteConfirm && (
        <ConfirmModal
          message={`"${movie.title}" silinsin mi?`}
          onConfirm={handleConfirmDelete}
          onCancel={() => setShowDeleteConfirm(false)}
        />
      )}
    </div>
  )
}

export default MovieCard