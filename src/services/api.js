const apiBaseUrl = import.meta.env.VITE_API_URL || ''

async function requestWithTimeout(url, options = {}) {
  const controller = new AbortController()
  const timeout = window.setTimeout(() => controller.abort(), 10000)
  try {
    return await fetch(url, { ...options, signal: controller.signal })
  } catch (error) {
    if (error.name === 'AbortError') throw new Error('The server did not respond. Please start the backend and MongoDB, then try again.')
    throw error
  } finally {
    window.clearTimeout(timeout)
  }
}

export async function authRequest(path, payload) {
  const response = await requestWithTimeout(`${apiBaseUrl}/api/auth/${path}`, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(payload),
  })
  const data = await response.json().catch(() => ({}))
  if (!response.ok) throw new Error(data.message || 'Request failed.')
  return data
}

export async function getCurrentUser(token) {
  const response = await requestWithTimeout(`${apiBaseUrl}/api/auth/me`, {
    headers: { Authorization: `Bearer ${token}` },
  })
  const data = await response.json().catch(() => ({}))
  if (!response.ok) throw new Error(data.message || 'Session expired.')
  return data.user
}

export async function adminRequest(path, options = {}) {
  const token = localStorage.getItem('estatepro_token')
  const response = await requestWithTimeout(`${apiBaseUrl}/api/admin/${path}`, {
    ...options,
    headers: { 'Content-Type': 'application/json', Authorization: `Bearer ${token}`, ...(options.headers || {}) },
  })
  const data = await response.json().catch(() => ({}))
  if (!response.ok) throw new Error(data.message || 'Admin request failed.')
  return data
}

export async function publicRequest(path) {
  const response = await fetch(`${apiBaseUrl}/api/public/${path}`)
  const data = await response.json().catch(() => ({}))
  if (!response.ok) throw new Error(data.message || 'Public request failed.')
  return data
}
