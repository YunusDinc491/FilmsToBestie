import LoginForm from './LoginForm.jsx'
import RegisterForm from './RegisterForm.jsx'

function AuthModal({ showRegister, setShowRegister, onLoginSuccess, onClose }) {
  return (
    <div className="modal-overlay" onClick={onClose}>
      <div className="modal-content" onClick={(e) => e.stopPropagation()}>
        <button className="modal-close" onClick={onClose}>×</button>
        {showRegister ? (
          <>
            <RegisterForm onRegisterSuccess={() => setShowRegister(false)} />
            <p style={{ textAlign: 'center' }}>
              Already have an account?{' '}
              <button onClick={() => setShowRegister(false)}>Login</button>
            </p>
          </>
        ) : (
          <>
            <LoginForm onLoginSuccess={onLoginSuccess} />
            <p style={{ textAlign: 'center' }}>
              No account?{' '}
              <button onClick={() => setShowRegister(true)}>Register</button>
            </p>
          </>
        )}
      </div>
    </div>
  )
}

export default AuthModal