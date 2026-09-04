import { Link } from 'react-router-dom'

function Navbar({ isLoggedIn, onLogout, onAuthClick }) {
  return (
    <div className="navbar">
      <h1>FilmsToBestie</h1>
      <nav className="nav-links">
        <Link to="/">Anasayfa</Link>
        <Link to="/diziler">Diziler</Link>
        <Link to="/filmler">Filmler</Link>
        <Link to="/kesfet">Keşfet</Link>
        {isLoggedIn && <Link to="/izlenecekler">İzlenecekler</Link>}
        <Link to="/watched">En Son İzlediklerim</Link>
        <Link to="/recommend">Bana Film Öner</Link>
      </nav>
      {isLoggedIn ? (
        <button onClick={onLogout}>Logout</button>
      ) : (
        <button className="auth-button" onClick={onAuthClick}>Giriş Yap / Kayıt Ol</button>
      )}
    </div>
  )
}

export default Navbar