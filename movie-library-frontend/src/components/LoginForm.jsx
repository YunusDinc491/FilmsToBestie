import { useState } from 'react'
import { login } from '../services/api.js'

function LoginForm({ onLoginSuccess }) {
    const [username, setUsername] = useState('')
    const [password, setPassword] = useState('')
    const [error, setError] = useState(null)
    const [submitting, setSubmitting] = useState(false)

    async function handleSubmit(e) {
        e.preventDefault()
        setError(null)
        setSubmitting(true)

        try {
            const data = await login(username, password)
            localStorage.setItem('token', data.token)
            onLoginSuccess()
        } catch (err) {
            setError(err.message)
        } finally {
            setSubmitting(false)
        }
    }
    return (
        <form onSubmit={handleSubmit}>
            <h2>Login</h2>
            <input
                type="text"
                placeholder="Username"
                value={username}
                onChange={(e) => setUsername(e.target.value)}
                required
            />
            <input
                type="password"
                placeholder="Password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                required
                minLength={6}
            />
            <button type="submit" disabled={submitting}>
                {submitting ? 'Logging in...' : 'Login'}
            </button>
            {error && <p className="error-text">{error}</p>}
        </form>
    )
}

export default LoginForm