import { useState, useEffect } from 'react'
import { searchOmdb, addOmdbToWatchList } from '../services/api.js'

const DEFAULT_QUERIES = ['avengers', 'batman', 'star wars', 'harry potter', 'avatar', 'spider man', 'lord of the rings', 'matrix']

function Discover({ isLoggedIn }) {
  const [query, setQuery] = useState('')
  const [submittedQuery, setSubmittedQuery] = useState('')
  const [results, setResults] = useState([])
  const [totalCount, setTotalCount] = useState(0)
  const [page, setPage] = useState(1)
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState(null)
  const [message, setMessage] = useState(null)

    const pageSize = 50

  useEffect(() => {
    const randomQuery = DEFAULT_QUERIES[Math.floor(Math.random() * DEFAULT_QUERIES.length)]
    setSubmittedQuery(randomQuery)
  }, [])

  useEffect(() => {
    if (!submittedQuery) return

    setLoading(true)
    setError(null)
    searchOmdb(submittedQuery, page)
      .then((data) => {
        setResults(data.items)
        setTotalCount(data.totalCount)
      })
      .catch((err) => setError(err.message))
      .finally(() => setLoading(false))
  }, [submittedQuery, page])

  function handleSearch(e) {
    e.preventDefault()
    if (!query.trim()) return
    setPage(1)
    setSubmittedQuery(query.trim())
  }

  async function handleAddToWatchList(item) {
    setMessage(null)
    setError(null)
    try {
      await addOmdbToWatchList(item)
      setMessage(`"${item.title}" izlenecekler listene eklendi.`)
    } catch (err) {
      setError(err.message)
    }
  }

  const totalPages = Math.ceil(totalCount / pageSize)

  return (
    <div className="main-content" style={{ padding: '0 24px' }}>
      <h2>Keşfet</h2>
      <form onSubmit={handleSearch} className="discover-search-form">
        <input
          type="text"
          placeholder="Film veya dizi ara..."
          value={query}
          onChange={(e) => setQuery(e.target.value)}
        />
        <button type="submit">Ara</button>
      </form>

      {message && <p className="success-text">{message}</p>}
      {error && <p className="error-text">{error}</p>}
      {loading && <p>Yükleniyor...</p>}

      {!loading && results.length > 0 && (
        <>
          <div className="movie-grid">
            {results.map((item) => (
              <div className="movie-card" key={item.imdbId}>
                <div className="poster-wrapper">
                  {item.poster && item.poster !== 'N/A' && (
                    <img src={item.poster} alt={item.title} />
                  )}
                </div>
                <h3>{item.title}</h3>
                <p>{item.year} • {item.type === 'series' ? 'Dizi' : 'Film'}</p>
                {isLoggedIn ? (
                  <div className="card-actions">
                    <button onClick={() => handleAddToWatchList(item)}>
                      Add to Watch List
                    </button>
                  </div>
                ) : (
                  <p style={{ fontSize: '13px' }}>İzlenecekler listesine eklemek için giriş yap.</p>
                )}
              </div>
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
  )
}

export default Discover