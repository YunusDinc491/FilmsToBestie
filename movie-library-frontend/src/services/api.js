const BASE_URL = 'https://localhost:7206/api'

export async function getMovies({ category, isSeries, search, page = 1, pageSize = 50 } = {}) {
  const params = new URLSearchParams()
  if (category) params.set('category', category)
  if (isSeries !== undefined) params.set('isSeries', isSeries)
  if (search) params.set('search', search)
  params.set('page', page)
  params.set('pageSize', pageSize)

  const response = await fetch(`${BASE_URL}/movies?${params.toString()}`)

  if (!response.ok) {
    throw new Error('Failed to fetch movies')
  }

  return response.json()
}

export async function login(username, password) {
  const response = await fetch(`${BASE_URL}/auth/login`, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({ username, password }),
  })

  if (!response.ok) {
    throw new Error('Invalid username or password')
  }

  return response.json()
}
export async function register(username, email, password) {
  const response = await fetch(`${BASE_URL}/auth/register`, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({ username, email, password }),
  })

  if (!response.ok) {
    throw new Error('Registration failed. Username may already exist.')
  }
}
export async function addMovie(movie) {
  const token = localStorage.getItem('token')

  const response = await fetch(`${BASE_URL}/movies`, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
      Authorization: `Bearer ${token}`,
    },
    body: JSON.stringify(movie),
  })

  if (!response.ok) {
    throw new Error('Failed to add movie. Are you logged in as Admin?')
  }

  return response.json()
}
export async function getWatchList({ watched = false } = {}) {
  const token = localStorage.getItem('token')
  const params = new URLSearchParams()
  params.set('watched', watched)

  const response = await fetch(`${BASE_URL}/watchlist?${params.toString()}`, {
    headers: { Authorization: `Bearer ${token}` },
  })

  if (!response.ok) {
    throw new Error('Failed to fetch watch list')
  }

  return response.json()
}

export async function addToWatchList(movieId) {
  const token = localStorage.getItem('token')

  const response = await fetch(`${BASE_URL}/watchlist/${movieId}`, {
    method: 'POST',
    headers: { Authorization: `Bearer ${token}` },
  })

  if (!response.ok) {
    throw new Error('Failed to add to watch list')
  }
}

export async function removeFromWatchList(movieId) {
  const token = localStorage.getItem('token')

  const response = await fetch(`${BASE_URL}/watchlist/${movieId}`, {
    method: 'DELETE',
    headers: { Authorization: `Bearer ${token}` },
  })

  if (!response.ok) {
    throw new Error('Failed to remove from watch list')
  }
}
export async function markAsWatched(movieId, { watchedAt, rating }) {
  const token = localStorage.getItem('token')

  const response = await fetch(`${BASE_URL}/watchlist/${movieId}/watched`, {
    method: 'PATCH',
    headers: {
      'Content-Type': 'application/json',
      Authorization: `Bearer ${token}`,
    },
    body: JSON.stringify({ watchedAt, rating }),
  })

  if (!response.ok) {
    throw new Error('Failed to mark movie as watched')
  }
}
export async function uploadImage(file) {
  const token = localStorage.getItem('token')
  const formData = new FormData()
  formData.append('file', file)

  const response = await fetch(`${BASE_URL}/upload/image`, {
    method: 'POST',
    headers: { Authorization: `Bearer ${token}` },
    body: formData,
  })

  if (!response.ok) {
    throw new Error('Failed to upload image')
  }

  return response.json()
}

export async function deleteMovie(movieId) {
  const token = localStorage.getItem('token')

  const response = await fetch(`${BASE_URL}/movies/${movieId}`, {
    method: 'DELETE',
    headers: { Authorization: `Bearer ${token}` },
  })

  if (!response.ok) {
    throw new Error('Failed to delete movie')
  }
}

export async function searchOmdb(query, page = 1) {
  const response = await fetch(`${BASE_URL}/omdb/search?query=${encodeURIComponent(query)}&page=${page}`)

  if (!response.ok) {
    throw new Error('OMDb araması başarısız oldu')
  }

  return response.json()
}

export async function addOmdbToWatchList(item) {
  const token = localStorage.getItem('token')

  const response = await fetch(`${BASE_URL}/watchlist/omdb`, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
      Authorization: `Bearer ${token}`,
    },
    body: JSON.stringify({
      imdbId: item.imdbId,
      title: item.title,
      year: item.year,
      poster: item.poster,
      type: item.type,
    }),
  })

  if (!response.ok) {
    throw new Error('Watch list\'e eklenemedi')
  }
}