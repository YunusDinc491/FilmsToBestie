export function getUserRole() {
  const token = localStorage.getItem('token')
  if (!token) return null

  const payload = token.split('.')[1]
  const decoded = JSON.parse(atob(payload))

  return decoded['http://schemas.microsoft.com/ws/2008/06/identity/claims/role'] || decoded.role
}

export function isAdmin() {
  return getUserRole() === 'Admin'
}