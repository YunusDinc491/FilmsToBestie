import { useState, useEffect } from 'react'
import { Routes, Route } from 'react-router-dom'
import Navbar from './components/Navbar.jsx'
import Home from './pages/Home.jsx'
import Placeholder from './pages/Placeholder.jsx'
import AuthModal from './components/AuthModal.jsx'
import { getWatchList } from './services/api.js'
import './App.css'
import WatchedList from './pages/WatchedList.jsx'
import ToWatchList from './pages/ToWatchList.jsx'
import Discover from './pages/Discover.jsx'

function App() {
  const [isLoggedIn, setIsLoggedIn] = useState(!!localStorage.getItem('token'))
  const [showRegister, setShowRegister] = useState(false)
  const [showAuthModal, setShowAuthModal] = useState(false)
  const [watchList, setWatchList] = useState([])

  function loadWatchList() {
    if (!isLoggedIn) return
    getWatchList()
      .then((data) => setWatchList(data))
      .catch(() => setWatchList([]))
  }

  useEffect(() => {
    loadWatchList()
  }, [isLoggedIn])

  function handleLogout() {
    localStorage.removeItem('token')
    setIsLoggedIn(false)
  }

  return (
    <div>
      <Navbar isLoggedIn={isLoggedIn} onLogout={handleLogout} onAuthClick={() => setShowAuthModal(true)} />

      {showAuthModal && (
        <AuthModal
          showRegister={showRegister}
          setShowRegister={setShowRegister}
          onLoginSuccess={() => {
            setIsLoggedIn(true)
            setShowAuthModal(false)
          }}
          onClose={() => setShowAuthModal(false)}
        />
      )}

      <Routes>
        <Route
          path="/"
          element={
            <Home
              isLoggedIn={isLoggedIn}
              watchList={watchList}
              loadWatchList={loadWatchList}
            />
          }
        />
        <Route
          path="/diziler"
          element={
            <Home
              isLoggedIn={isLoggedIn}
              watchList={watchList}
              loadWatchList={loadWatchList}
              mediaFilter={true}
            />
          }
        />
        <Route
          path="/filmler"
          element={
            <Home
              isLoggedIn={isLoggedIn}
              watchList={watchList}
              loadWatchList={loadWatchList}
              mediaFilter={false}
            />
          }
        />
        <Route path="/kesfet" element={<Discover isLoggedIn={isLoggedIn} />} />
        <Route path="/watched" element={<WatchedList isLoggedIn={isLoggedIn} />} />
        <Route path="/izlenecekler" element={<ToWatchList isLoggedIn={isLoggedIn} />} />
        <Route path="/recommend" element={<Placeholder title="Bana Film Öner" />} />
      </Routes>
    </div>
  )
}

export default App