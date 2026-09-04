import { useState } from 'react'
import { addMovie, uploadImage } from '../services/api.js'
import { CATEGORIES } from '../constants/categories.js'

function AddMovieForm({ onMovieAdded }) {
  const [title, setTitle] = useState('')
  const [genres, setGenres] = useState([])
  const [releaseYear, setReleaseYear] = useState('')
  const [isSeries, setIsSeries] = useState(false)
  const [rating, setRating] = useState('')
  const [posterFile, setPosterFile] = useState(null)
  const [error, setError] = useState(null)
  const [submitting, setSubmitting] = useState(false)

  function toggleGenre(cat) {
    setGenres((prev) =>
      prev.includes(cat) ? prev.filter((g) => g !== cat) : [...prev, cat]
    )
  }

  async function handleSubmit(e) {
    e.preventDefault()
    setError(null)

    if (genres.length === 0) {
      setError('En az bir kategori seçmelisin.')
      return
    }

    setSubmitting(true)

    try {
      let posterUrl = ''

      if (posterFile) {
        const uploadResult = await uploadImage(posterFile)
        posterUrl = uploadResult.url
      }

      await addMovie({
        title,
        description: '',
        genres,
        releaseYear: Number(releaseYear),
        posterUrl,
        rating: Number(rating),
        isSeries,
      })

      setTitle('')
      setGenres([])
      setReleaseYear('')
      setIsSeries(false)
      setRating('')
      setPosterFile(null)
      onMovieAdded()
    } catch (err) {
      setError(err.message)
    } finally {
      setSubmitting(false)
    }
  }

  return (
    <form className="add-movie-form" onSubmit={handleSubmit}>
      <h3>Yeni Film / Dizi Ekle</h3>

      <input
        type="text"
        placeholder="Başlık"
        value={title}
        onChange={(e) => setTitle(e.target.value)}
        required
      />

      <div className="genre-picker">
        {CATEGORIES.map((cat) => (
          <button
            type="button"
            key={cat}
            className={`genre-chip ${genres.includes(cat) ? 'selected' : ''}`}
            onClick={() => toggleGenre(cat)}
          >
            {cat}
          </button>
        ))}
      </div>

      <input
        type="number"
        placeholder="Yapım Yılı"
        value={releaseYear}
        onChange={(e) => setReleaseYear(e.target.value)}
        required
      />

      <div className="type-toggle">
        <button
          type="button"
          className={!isSeries ? 'selected' : ''}
          onClick={() => setIsSeries(false)}
        >
          🎬 Film
        </button>
        <button
          type="button"
          className={isSeries ? 'selected' : ''}
          onClick={() => setIsSeries(true)}
        >
          📺 Dizi
        </button>
      </div>

      <input
        type="number"
        placeholder="Senin Puanın (1-10)"
        min="1"
        max="10"
        value={rating}
        onChange={(e) => setRating(e.target.value)}
        required
      />

      <input
        type="file"
        accept="image/*"
        onChange={(e) => setPosterFile(e.target.files[0])}
      />

      <button type="submit" disabled={submitting}>
        {submitting ? 'Ekleniyor...' : 'Ekle'}
      </button>
      {error && <p className="error-text">{error}</p>}
    </form>
  )
}

export default AddMovieForm